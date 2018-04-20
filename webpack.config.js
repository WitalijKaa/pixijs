const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './frontend/app.es6'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'web')
    },
    devServer: { contentBase: './web' }
};

let theConfig = process.env.THE_CONFIG ? JSON.parse(process.env.THE_CONFIG) : { dev: false, chrome: false};

if (theConfig.dev) {
    module.exports.devtool = 'inline-source-map';
    module.exports.plugins = [
        new CleanWebpackPlugin(['web']),
        new HtmlWebpackPlugin({
            title: 'Pixi JS WK',
            minify: false
        })
    ];
}
else {
    module.exports.plugins = [
        new CleanWebpackPlugin(['web']),
        new HtmlWebpackPlugin({
            title: 'Pixi JS WK',
            minify: true
        })
    ];
}

if (!theConfig.chrome) {
    module.exports.module = {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    }
                }
            },
        ]
    };
}