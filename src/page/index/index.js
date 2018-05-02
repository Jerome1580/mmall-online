'use strict';
let hbs = require('./test.hbs');
require('util/handlebars-helper');
require('util/handlebars-partial')
let data = [
    {id:1,name:'张三'},
    {id:1,name:'张三'},
    {id:1,name:'张三'},
    {id:1,name:'张三'},
    {id:1,name:'张三'},
]
console.log(hbs(data))

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

$(function () {
    // 渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    debugger
    // 模拟请求
    $.get('/api/getUserName',{id:1}).then((ret)=>{
        console.log(ret)
    })
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });

    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});