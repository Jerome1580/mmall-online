var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量的配置，dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
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
        // 包括common模块，和自身的name（参数）模块
    }
};

// webpack config
var config = {
    // 入口
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    // 打包
    output: {
        // 存放时文件的路径
        path: './dist',
        // 访问文件时的路径
        publicPath: '/dist',  // 访问根路径下的文件。根就是http://localhost:8088/
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
                // limit 小于100kb的都会打包成base64，放在resource下源文件名
            }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js，以便浏览器缓存，独立的模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
            //放在output中path目录下，的js/base.js -> ./dist/js/base.js
        }),
        // 把css单独打包到文件里,方便缓存到cdn中
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

// webpack-dev-server 的配置，因为common模块是每个页面都有的，所以把webpack-dev-server的配置加在config.entry.common中
// 根据环境变量
// 环境变量是在npm run dev 的脚本中传值的，默认是dev
// var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'; 这是声明的语句
// process是node中的一个对象
//  "dev-win": "set WEBPACK_ENV=dev && webpack-dev-server --inline --port 8088" ,这是npm 脚本设置的环境变量
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;