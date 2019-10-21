const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
    entry: `${SRC_DIR}/index.js`,
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader!css-loader']
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: DIST_DIR,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'client/src/index.html',
            filename: 'index.html'
        })
    ],
};