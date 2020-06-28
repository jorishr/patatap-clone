const { series, watch, parallel, src, dest} = require('gulp');
const   autoprefixer = require('autoprefixer'),
        sass         = require('gulp-sass'),
        del          = require('del'),
        fileList     = require('gulp-filelist'),
        rename       = require('gulp-rename'),
        postcss      = require('gulp-postcss'),
        cssNano      = require('cssnano'),
        rev          = require('gulp-rev'),
        revReplace   = require('gulp-rev-replace'),
        uglify       = require('gulp-uglify'),
        htmlMin      = require('gulp-htmlmin'),
        terser       = require('gulp-terser'),
        replaceInFile= require('replace-in-file');;

sass.compiler = require('node-sass');

//  globs and paths
const   baseDir     = './app',
        assetsDir   = baseDir + '/assets',
        distDir     = './dist', 
        distAssets  = './dist/assets'
        htmlGlob    = baseDir + '/**/*.html',
        sassGlob    = assetsDir + '/styles/**/*.scss',
        jsGlob      = [assetsDir + '/scripts/**/*.js', '!' + assetsDir + '/scripts/paperScript.js'];
        paperScrptGlob  = assetsDir + '/scripts/paperScript.js';
        audioGlob       = assetsDir + '/audio/*.mp3';
function startClean(){
    return del(distDir);
}

function minifyHtml(){
    return src(htmlGlob)
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(distDir));
};

function styles(){
    return src(sassGlob)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer, cssNano]))
        .pipe(rev())
        .pipe(dest(distAssets + '/styles'))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest(distAssets + '/styles'))
};
function revReplaceCss(){
    let manifest = src('./dist/assets/styles/rev-manifest.json');
    return src('./dist/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest('./dist'));
};

function copyAudioFiles(){
    return src(audioGlob).pipe(dest(distAssets + '/audio'))
}
/*  create .json list of filenames for mp3 sound files
    the filepaths are renamd to properly load in html file  */
function listFiles(){
    return src(distAssets + '/audio/*.mp3', { base: '.'})
    .pipe(rename({ dirname: 'assets/audio' }))
    .pipe(fileList('mp3list.json'))
    .pipe(dest(distAssets + '/scripts'))
};

function jsBuild(){
    return src(baseDir + '/tmp/*.js')
        .pipe(terser())
        .pipe(rev())
        .pipe(dest('./dist/assets/scripts'))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest('./dist/assets/scripts'));
};

function updateHtmlrevJs(){
    let manifest = src('./dist/assets/scripts/rev-manifest.json');
    return src('./dist/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest('./dist'));
};

//  update path of stylesheet and js files 
async function replacePaths(){
    let options = {
        files: './dist/index.html',
        from: [/href="tmp/g, /src="tmp/g],    //regExp
        to: ['href="assets/styles', 'src="assets/scripts']
    }
    try {
        const results = await replaceInFile(options)
        console.log('Replacement results:', results);
    }
    catch (error) {
       console.error('Error occurred:', error);
    }
};
//clean up rev-manifest.json files
function endClean(){
    return del([distDir + '/**/rev-manifest.json']);
};

const build = series(
    startClean, 
    minifyHtml, 
    parallel(
        series(styles, revReplaceCss), 
        series(copyAudioFiles, listFiles), 
        series(jsBuild, updateHtmlrevJs)
    ),
    replacePaths,
    endClean
)
module.exports = build;