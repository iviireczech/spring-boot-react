var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = process.env.PORT;
const URL = `http://localhost:${PORT}`;
const ABSOLUTE_BASE = path.normalize(path.join(__dirname, '..'));

module.exports = {
    devtool: 'eval',
    devServer: {
        hot: true,
        contentBase: 'build',
        port: PORT,
        historyApiFallback: true
    },
    hotComponents: true,
    debug: true,
    entry: [
        `webpack-dev-server/client?${URL}`,
        'webpack/hot/only-dev-server',
        path.join(ABSOLUTE_BASE, 'src', 'main.js')
    ],
    output: {
        path: path.join(ABSOLUTE_BASE, 'dist'),
        publicPath: `${URL}/`,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_HOST: JSON.stringify(process.env.API_HOST),
                API_PORT: JSON.stringify(process.env.API_PORT)
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Spring & React Starter Kit',
            template: path.join(ABSOLUTE_BASE, 'src', 'assets', 'index.ejs')
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