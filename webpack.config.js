const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        vendor: './app/assets/scripts/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './app/tmp'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: [/node_modules/, /paperScript.js/],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}