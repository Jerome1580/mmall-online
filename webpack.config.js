var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html-webpack-plugin 参数的方法
var getHtmlConfig = function (name) {
    return {
        // html 原始模板
        template: './src/view/' + name + '.html',
        // 基于output中path作为相对路径
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

// webpack config
let config = {
    // 入口
    entry: {
        'common': ['./src/page/common/index.js', 'webpack-dev-server/client?http://local'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    // 打包
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    // 引入外部的变量或模块
    externals: {
        'jquery': 'window.jQuery' // 注意window.jQuery加''
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

module.exports = config;