const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: ['babel-polyfill', './frontend/app.es6']
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'web')
    },
    devServer: { contentBase: './web' },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [ require('nib')() ]
                }
            }
        })
    ]
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
    module.exports.module.rules.push(
        {
            test: /\.es6$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                }
            }
        }
    );
}
