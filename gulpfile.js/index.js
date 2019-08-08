const { series, watch, parallel, src, dest} = require('gulp')
const   autoprefixer    = require('autoprefixer'),
        sass            = require('gulp-sass'),
        postcss         = require('gulp-postcss'),
        bs              = require('browser-sync').create(),
        webpack         = require('webpack'),
        del             = require('del'),
        fileList        = require('gulp-filelist'),
        rename          = require('gulp-rename');

sass.compiler = require('node-sass');

//  globs and paths
const   baseDir     = './app',
        tmpDir      = baseDir + '/tmp',
        assetsDir   = baseDir + '/assets',
        htmlGlob    = baseDir + '/**/*.html',
        sassGlob    = assetsDir + '/styles/**/*.scss',
        jsGlob      = [assetsDir + '/scripts/**/*.js', '!' + assetsDir + '/scripts/paperScript.js'];
        paperScrptGlob  = assetsDir + '/scripts/paperScript.js';
        audioGlob       = assetsDir + '/audio/*.mp3';

function styles(){
    return src(sassGlob)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(dest(tmpDir))
        .pipe(bs.stream());
};

function jsCompile(cb){
    webpack(require('../webpack.config.js'), function(err, stats){
        if (err){console.log(err.toString());};
        console.log(stats.toString());  
        cb();       // make gulp aware task is done
    });
};

/*  paperscript files should not be run through babel as it brakes the code, 
    on change, just del old file and copy new   */
function copy(){
    del(tmpDir + '/paperScript.js');
    return src(paperScrptGlob).pipe(dest(tmpDir))
}

/*  create .json list of filenames for mp3 sound files
    the filepaths are renamd to properly load in html file  */
function listFiles(){
    return src(audioGlob, { base: '.'})
    .pipe(rename({ dirname: 'assets/audio' }))
    .pipe(fileList('mp3list.json'))
    .pipe(dest(assetsDir + '/scripts'))
};

function bsReload(cb){
    bs.reload();
    cb();
};

function watchFiles(){
    bs.init({
        server: 'app',
        tunnel: 'patatap'
        });
    watch(sassGlob, styles);
    watch(jsGlob, series(jsCompile, bsReload));
    watch(paperScrptGlob, series(copy, bsReload));
    watch(htmlGlob, bsReload);
    watch(audioGlob, listFiles, bsReload);
};

exports.styles  = styles;
exports.js      = jsCompile;
exports.default = watchFiles;