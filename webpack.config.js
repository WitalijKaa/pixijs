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
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './web'
    },
    plugins: [
        new CleanWebpackPlugin(['web']),
        new HtmlWebpackPlugin({
            title: 'Pixi JS WK',
            minify: false
        })
    ]
};