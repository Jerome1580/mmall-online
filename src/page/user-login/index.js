'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// 配置逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 点击登录按钮
        $('#submit').click(function () {
            _this.submit();
        });
        // 如果回车，也提交
        $('.user-content').keyup(function (e) {
            if (e.keycode === 13) {
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        // 表单验证结果
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            // 成功
            _user.login(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            }, function (errMsg) {
                formError.show(errMsg)
            })
        } else {
            // 失败
            formError.show(validateResult.msg)
        }
    },
    // 表单验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function () {
    page.init();
});
