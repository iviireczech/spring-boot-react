var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ABSOLUTE_BASE = path.normalize(path.join(__dirname, '..'));

module.exports = {
    devtool: '',
    entry: [
        path.join(ABSOLUTE_BASE, 'src', 'main.js')
    ],
    output: {
        path: path.join(ABSOLUTE_BASE, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                SERVER_HOST: JSON.stringify(process.env.SERVER_HOST),
                SERVER_PORT: JSON.stringify(process.env.SERVER_PORT)
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Spring Boot & React Starter Kit',
            template: path.join(ABSOLUTE_BASE, 'src', 'assets', 'index.ejs'),
            favicon: path.join(ABSOLUTE_BASE, 'src', 'assets', 'favicon-96x96.png')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(ABSOLUTE_BASE, 'src')
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
            },
            {
                test: /\.woff2$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
            },
            {
                test: /\.(eot|ttf|svg|gif|png)$/,
                loader: "file-loader"
            }
        ]
    }
};
