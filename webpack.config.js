var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量的配置，dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// 获取html-webpack-plugin 参数的方法
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

// webpack config
var config = {
    // 入口
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result': ['./src/page/result/index.js']
    },
    // 打包
    output: {
        // 存放时文件的路径
        path: './dist',
        // 访问文件时的路径
        publicPath: '/dist/',  // 访问根路径下的文件。根就是http://localhost:8088/
        filename: 'js/[name].js'
    },
    // 引入外部的变量或模块
    // webpack 中把它配置为全局即可
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
                loader: 'url-loader?limit=100&name=resource/[hash:8].[name].[ext]'
                // limit 小于100kb的都会打包成base64，超过限制的放在resource下源文件名
            },
            {
                test: /\.string$/,
                loader: 'html-loader'
            }
        ]
    },
    // 其他整合
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
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