const bs = require('browser-sync').create();

module.exports = function localDevServer(){
    bs.init({
        server: 'dist'
    })
}