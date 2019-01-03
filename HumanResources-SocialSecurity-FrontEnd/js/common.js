/**
 * Created by QianQi on 2016/1/5.
 */
"use strict";
if (window._GLOBAL == undefined) { window._GLOBAL = {}; } // 用于存放全局变量
if (!Array.prototype.indexOf) {
    /**
     * 从 from 位置开始，返回首次出现 elt 的索引位置，未找到返回 -1
     * @param {*} elt 要判断是否在数组中的对象
     * @param {int=} from 搜索起始索引，0 到 length-1，默认为 0
     * @returns {*}
     */
    Array.prototype.indexOf = function(elt, from) {
        var len = this.length >>> 0; // 用于确保 this.length 是可运算的数值
        from = Number(from) || 0;
        if (from < 0 || from >= len) return -1;
        for (; from < len; from++) {
            if (this[from] === elt) return from;
        }
        return -1;
    };
}
/**
 * 字符串去除首尾空格
 * @returns {string}
 */
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
/**
 * 日期格式化（原型扩展或重载）
 * @param {string} formatStr 格式模版
 *  - YYYY/yyyy/YY/yy 表示年份
 *  - MM/M 月份
 *  - W/w 星期
 *  - dd/DD/d/D 日期
 *  - hh/HH/h/H 时间
 *  - mm/m 分钟
 *  - ss/SS/s/S 秒
 * @return {string} 日期字符串
 */
Date.prototype.format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, '' + this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth() + 1);
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
};
/**
 * 日期计算（原型扩展或重载）
 * @param {string} interval 日期计算的单位
 *  - y,Y 年
 *  - M 月
 *  - q,Q 季度
 *  - w,W 周
 *  - d,D 日
 *  - h,H 时
 *  - m 分
 *  - s,S 秒
 * @param {number} number 数量
 * @returns {Date} 计算后的日期对象
 */
Date.prototype.add = function(interval, number) {
    switch (interval) {
        case 'S':
        case 's':
            return new Date(this.getTime() + (1000 * number));
        case 'm':
            return new Date(this.getTime() + (60000 * number));
        case 'H':
        case 'h':
            return new Date(this.getTime() + (3600000 * number));
        case 'D':
        case 'd':
            return new Date(this.getTime() + (86400000 * number));
        case 'W':
        case 'w':
            return new Date(this.getTime() + ((86400000 * 7) * number));
        case 'Q':
        case 'q':
            return new Date(this.getFullYear(), (this.getMonth()) + number * 3, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
        case 'M':
            return new Date(this.getFullYear(), (this.getMonth()) + number, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
        case 'Y':
        case 'y':
            return new Date((this.getFullYear() + number), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
    }
};
/** jquery 扩展 **/
(function($) {
    var SCROLLSIZE = 17; // 滚动条尺寸
    /**
     * AJAX请求前将CSRFToken值放入header中
     */
    var _ajaxBeforeSendFun = function(xhr) {
        var CSRFToken = $("meta[name='_csrf']").attr("content");
        xhr.setRequestHeader("CSRFToken", CSRFToken);
    };
    $.ajaxSetup({
        type: 'POST',
        beforeSend: _ajaxBeforeSendFun
    });
    // session 过期将页面转到提示页面
    $(document).ajaxComplete(function(event, xhr, settings) {
        if (xhr.getResponseHeader('session_status') == 'timeout') {
            location.href = $.getBasePath() + 'timeout.jsp'; // TODO session 过期提示页面，location.host 主机名:端口号
        }
        //        if(settings.url!='menu.json'){
        //            location.href = $.getBasePath()+'index/sessionTimeout.html';// TODO session 过期提示页面，location.host 主机名:端口号
        //        }
    });
    // 获取当前页面路径中 http://主机名:端口/项目名/
    $.getBasePath = $.getBathPath = function() {
        var prjMatch = location.pathname.match(/^\/?([^\/]+\/)/);
        return 'http://' + location.host + '/' + (prjMatch ? prjMatch[1] : '');
    };
    // 将框架页面路径指向 url，相对路径相对于调用此方法的页面
    $.resetTopUrl = function(url) {
        var _top = _getFrameWin() || top;
        _top.location.href = url;
    };
    /**
     * 获取url中的参数集合
     * @returns {Object} 以键(string)值(string)对组成的对象存储参数
     */
    $.getUrlParams = function() {
        var strArr = window.location.search.substring(1).split('&'),
            params = {};
        for (var i = 0, arr; i < strArr.length; i++) {
            arr = strArr[i].split('=');
            if (!arr[0]) continue;
            params[arr[0]] = arr.length > 1 ? decodeURIComponent(arr[1]) : '';
        }
        return params;
    };
    /**
     * @widoc $.getHideParams
     * @namespace aux
     * @des 获取 body 直接子隐藏域保存的参数集合（以 name 标识）
     * @type function
     * @return {Object} 以键(string)值(string)对组成的对象存储参数
     */
    $.getHideParams = function() {
        var params = {};
        $('body').children('input[type="hidden"]').each(function() {
            var jqCur = $(this),
                name = jqCur.attr('name');
            if (name) {
                params[name] = jqCur.val();
            }
        });
        return params;
    };
    /**
     * 请求数据
     * 返回的数据结构：
     *   - success {bool}
     *   - data 将作为 drawDomFn 的参数
     * @param {object|string=} _opts
     *   object: drawDomFn,args,showloading,argToJson 均失效。
     *   - opts.drawDomFn(data) {function|undefined=} drawDomFn 数据绘制函数(参数：数据集合)，其中 this 指向调用 request 方法的元素
     *   - opts.showloading {bool=} 请求时是否显示 loading 动画，默认不显示
     *   - opts.argToJson {bool=} 请求时是否附加如下参数 dataType:"json",contentType:"application/json"
     *   - opts.ajaxOpts {object=} 调用 $.ajax() 请求时的自定义配置
     *   - opts.errorMsg {string=} 默认的错误提示信息
     *   string: 数据源请求jsonUrl（不推荐此用法）
     * @param {function|undefined=} drawDomFn 同 opts.drawDomFn。
     * @param {object=} args  同 opts.ajaxOpts.data
     * @param {bool=} showloading 同 opts.showloading
     * @param {bool=} argToJson 设为 true 时，同 opts.argToJson
     */
    $.fn.request = function(_opts, drawDomFn, args, showloading, argToJson) {
        var _this = this,
            opts;
        /* 参数处理 */
        if (Object.prototype.toString.call(_opts) === '[object String]') {
            opts = {
                url: _opts,
                data: args
            };
        } else if (_opts) {
            showloading = _opts['showloading'];
            drawDomFn = _opts['drawDomFn'];
            argToJson = _opts['argToJson'];
            opts = _opts['ajaxOpts'] || {};
        }
        if (argToJson) {
            opts.contentType = "application/json";
        }
        _request();

        function _request() { // true
            var errorMsg = _opts['errorMsg'] || '网络异常，请稍后再试';
            var _success = opts.success,
                _error = opts.error;
            showloading && $.showLoading();
            delete opts.success;
            delete opts.error;
            $.ajax($.extend({
                success: function(result, textStatus, jqXHR) {
                    showloading && $.hideLoading();
                    if (!result.success) {
                        var msg = result.msg || errorMsg;
                        msg && $.showAlert(msg);
                    } else if (drawDomFn) {
                        drawDomFn.call(_this, result.data);
                    }
                    _success && _success(result, textStatus, jqXHR);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    showloading && $.hideLoading();
                    errorMsg && $.showAlert(errorMsg);
                    _error && _error(jqXHR, textStatus, errorThrown);
                },
                type: 'post',
                dataType: 'json'
            }, opts));
        }
        return _this;
    };
    /**
     * 分页：对象为 pageBar 容器 class="manu"
     * @param {object} _opts
     *   - opts.per {int=} 每页显示的数据条数，默认为 20，若定义了 opts.perList，opts.per 必须为其中之一，否则默认为 opts.perList[0]
     *   - opts.perList:[] 可选择的每页页码列表，若未定义则不可切换
     *   - opts.afterFlip 每次翻页后的回调函数 function(datalist,pageObj,data)
     *       datalist {Array} 请求页所有数据
     *       pageObj {object} 分页对象
     *         pageObj.totalpage 总页数
     *         pageObj.curpage 当前页码（从1开始）
     *         pageObj.percount 每页数据条数
     *         pageObj.totalcount 总数据数
     *       data {object} 后台分页时，每次分页请求到的后台数据的 data 部分。前台分页时，所有数据的集合
     *   前台分页时：
     *   - opts.data {Array=} 前台分页时的数据源
     *   后台分页时：仅当 data 未定义
     *   - opts.url {string=} 请求 url
     *   - opts.args {object=} 请求参数
     *   - opts.showloading {bool=} 后台分页请求时是否显示加载动画，默认不加载
     * @return {object|undefined} obj
     *   - obj.destroy() {function} 销毁
     *   - obj.page {object} 获得分页信息
     *       obj.page.percount 每页条数
     *       obj.page.totalpage 总页数
     *       obj.page.curpage 当前页码
     *       obj.page.totalcount 总数据条数
     */
    $.fn.initPageBar = function(_opts) {
        var CONF = {
            visiblePages: 5 // 页码数量（奇数）
        };
        var el = $(this);
        if (!_opts.data && !_opts.url) return;
        var opts = $.extend({
            per: 20 // 每页显示的数据条数
                //            ,url:''// 后台分页时请求的url
                ,
            args: {} // 后台分页时的参数
            ,
            showloading: false // 后台分页请求时是否显示加载动画
                //            ,data:[]// 前台分页时的数据源
                ,
            perList: [] // 可选择的每页页码列表，若未定义则不可切换
                //            ,afterFlip:function(datalist,pageObj,data)// 每次翻页后的回调函数，datalist:当前页数据；pageObj:当前分页信息；data
        }, _opts);
        var perList, _page = {};
        var _init = function() {
            perList = opts.perList;
            if (perList.length && perList.indexOf(opts.per) == -1 && perList[0]) { // 定义了每页显示条数列表，且 per 不在 perList 中
                opts.per = perList[0];
            }
            _page.percount = opts.per;
            goPage(1);
        };
        var _destroy = function() {
            el.find('.manu-sel').off('change.per');
            el.off('click.toPage').html('');
        };
        var _reset = function(cusOpts) {
            opts = $.extend(opts, cusOpts);
            if (cusOpts.data) {
                opts.url = undefined;
            } else if (cusOpts.url) {
                opts.data = undefined;
            }
            _init();
        };
        var _returnObj;
        /**
         * 绘制分页及触发回调
         * @param datalist {Array} 请求页所有数据
         * @param pageNum {int} 页码(从 1 开始)
         * @param totalcount {int} 数据总数
         * @param data {object=} 后台分页时，每次分页请求到的后台数据的 data 部分
         */
        var drawDOM = function(datalist, pageNum, totalcount, data) {
            var half = (CONF.visiblePages - 1) / 2,
                pStart, pEnd, totalPage = Math.ceil(totalcount / opts.per),
                toPage = pageNum;
            var bakStr, i, pageStr = ''; // 临时变量
            if (!totalPage) { // 总数据为 0，分页信息不需绘制
                pageStr += '<div class="manu-l"><div class="manu-item">共 0 页 0 条</div></div>';
            } else {
                if (toPage > totalPage || toPage < 1) { // 页码超出范围，不绘制 DOM
                    $.showAlert('页码超过范围!');
                    return;
                }
                /****** manu-l ******/
                pageStr += '<div class="manu-l">';
                pageStr += '<div class="manu-item">共 ' + totalPage + ' 页 ' + totalcount + ' 条</div>';
                if (perList && perList.length) { // 定义了每页显示条数列表
                    bakStr = '<select class="txt-min manu-sel">';
                    for (i = 0; i < perList.length; i++) {
                        bakStr += '<option' + (perList[i] == opts.per ? ' selected' : '') + '>' + perList[i] + '</option>';
                    }
                    bakStr += '</select>'
                } else {
                    bakStr = opts.per;
                }
                pageStr += '<div class="manu-item">每页 ' + bakStr + ' 条</div>' +
                    '<div class="manu-item">' +
                    '<input class="txt-min manu-txt" type="text" style="width:50px;"> 页 <input type="button" class="btn-min manu-btn" value="跳转">' +
                    '</div>';
                pageStr += '</div>'; // manu-l 结束
                /****** manu-r ******/
                pageStr += '<div class="manu-r">';
                /* 绘制分页 */
                if (toPage - half > 0 && toPage + half <= totalPage) {
                    pStart = toPage - half;
                    pEnd = toPage + half;
                } else if (toPage - half <= 0) {
                    pStart = 1;
                    pEnd = Math.min(CONF.visiblePages, totalPage);
                } else {
                    pStart = Math.max(1, totalPage - CONF.visiblePages + 1);
                    pEnd = totalPage;
                }
                pageStr += toPage == 1 ?
                    ('<span class="manu-lnk manu-lnk-0"><span class="fa fa-angle-double-left"></span></span>' +
                        '<span class="manu-lnk"><span class="fa fa-angle-left"></span></span>') :
                    ('<a href="javascript:void(0)" class="manu-lnk manu-lnk-0" data-page="1"><span class="fa fa-angle-double-left"></span></a>' +
                        '<a href="javascript:void(0)" class="manu-lnk" data-page="' + (toPage - 1) + '"><span class="fa fa-angle-left"></span></a>');
                for (i = pStart; i <= pEnd; i++) {
                    if (i == toPage) {
                        pageStr += '<span class="manu-lnk manu-lnk-i">' + i + '</span>';
                    } else {
                        pageStr += '<a class="manu-lnk" href="javascript:void(0)" data-page="' + i + '">' + i + '</a>';
                    }
                }
                pageStr += toPage >= totalPage ?
                    ('<span class="manu-lnk"><span class="fa fa-angle-right"></span></span>' +
                        '<span class="manu-lnk manu-lnk-x"><span class="fa fa-angle-double-right"></span></span>') :
                    ('<a href="javascript:void(0)" class="manu-lnk " data-page="' + (toPage + 1) + '"><span class="fa fa-angle-right"></span></a>' +
                        '<a href="javascript:void(0)" class="manu-lnk manu-lnk-x" data-page="' + totalPage + '"><span class="fa fa-angle-double-right"></span></a>');
                pageStr += '';
                pageStr += '</div>'; // manu-r 结束
            }
            _page.totalpage = totalPage;
            _page.curpage = toPage;
            _page.totalcount = totalcount;
            el.html(pageStr);
            opts.afterFlip && opts.afterFlip(datalist, _page, data); // 翻页后的回调函数
            el.find('.manu-sel')
                .off('change.per')
                .on('change.per', function() {
                    _page.percount = opts.per = parseInt($(this).val());
                    goPage(1);
                });
        };
        var goPage = function(pageNum) { // 跳转到第几页
            var _data = opts.data;
            if (_data) { // 前台分页
                var startNo = (pageNum - 1) * opts.per,
                    len = _data.length;
                drawDOM(_data.slice(startNo, Math.min(len, startNo + opts.per)), pageNum, len, _data);
            } else {
                $.fn.request({
                    drawDomFn: function(data) {
                        drawDOM(data['retlist'], pageNum, data['totalcount'], data);
                    },
                    showloading: opts.showloading,
                    ajaxOpts: {
                        url: opts.url,
                        data: $.extend({
                            curpage: pageNum // 从1开始
                                ,
                            percount: opts.per
                        }, opts.args)
                    }
                });
            }
        };
        _destroy();
        _returnObj = {
            page: _page,
            destroy: _destroy,
            reset: _reset,
            goPage: goPage
        }; // 返回的接口对象
        if (!el.hasClass('manu')) el.addClass('manu');
        el.off('click.toPage').on('click.toPage', 'a.manu-lnk,.manu-btn', function() {
            if (this.tagName.toLocaleLowerCase() == 'a') {
                goPage(parseInt($(this).attr('data-page')) || 1);
            } else if ($(this).hasClass('manu-btn')) {
                var val = parseInt(el.find('.manu-txt').val());
                if (isNaN(val)) {
                    $.showAlert('页码必须为数字!');
                } else {
                    goPage(val);
                }
            }
        });
        _init();
        return _returnObj;
    };

    /* 验证辅助方法 */
    var _formatMsg = function(src, args) {
        if (args.constructor != Array) {
            args = [args];
        }
        $.each(args, function(i, n) {
            src = src.replace(new RegExp('\\{' + i + '\\}', 'g'), n);
        });
        return src;
    };
    /**
     * 验证当前元素
     * @param rules {object}: 要验证的表单元素的验证规则，键值对
     *     rules.key: 验证规则名称
     *     rules.value: 验证规则对应的参数
     * @param messages {object=}: 自定义提示
     *     messages.key: 验证规则名称
     *     messages.value : 对应规则验证不通过时显示的自定义提示
     * @param cb {function=} 验证不通过时再次点击元素时的回调函数
     * @param bindBlur {bool=} 是否绑定失焦验证的事件，默认为 true，非特殊情况不需定义此属性
     * @returns {boolean} 是否通过验证
     */
    $.fn.validate = function(rules, messages, cb, bindBlur) { // el 要添加danger样式的元素
        var el = $(this);
        var _errCls = 'dangerI',
            _blurValEv = 'blur._validate',
            _clickValEv = 'click._valiTip';
        el.off(_blurValEv)
            .off(_clickValEv);
        if (bindBlur != false) {
            el.on(_blurValEv, function() { // 失焦时根据规则校验-暂只考虑文本框
                el.validate(rules, messages, cb);
            });
        }
        var errorRule = '';
        for (var rule in rules) { // 逐个验证 rules
            if (rules.hasOwnProperty(rule)) {
                var method = $.validator.methods[rule];
                if (method && !method(rules[rule], el)) { // 定义了该验证方法且验证结果为 false
                    errorRule || (errorRule = rule);
                    break;
                }
            }
        }
        if (errorRule == '') {
            el.removeClass(_errCls);
        } else {
            el.addClass(_errCls);
            var msg = (messages && messages[errorRule]) ?
                messages[errorRule] :
                $.validator.messages[errorRule] || '校验未通过';
            msg = _formatMsg(msg, rules[errorRule]);
            el.on(_clickValEv, (function(msg) {
                return function() {
                    if (cb) {
                        cb(el, msg);
                    } else $.showAlert(msg); // TODO 显示验证信息
                };
            })(msg));
            return false;
        }
        return true;
    };
    /**
     * 对元素子孙元素中的表单元素初始化验证条件
     * @param options
     *  - options.rules {object} 验证规则，键值对
     *      key: 要验证的表单元素的 name 属性的值
     *      value {object}: 要验证的表单元素的验证规则，键值对
     *          key: 验证规则名称
     *          value: 验证规则对应的参数
     *  - options.messages {object=} 自定义验证信息，键值对
     *      key: 要验证的表单元素的 name 属性的值
     *      value {object}: 验证不通过时显示的自定义提示
     *  - options.callback(el,msg) {function} 自定义提示方法
     *      el {string} 验证失败的元素
     *      msg {string} 该元素上的提示信息
     *  - options.autoScroll {boolean} 验证失败时，是否自动滚动到第一个验证失败的元素，默认为 true
     * @returns {object || undefined} returnObj
     *  - returnObj.validateAll() 手动触发当前元素内表单验证的方法
     *  - returnObj.removeAllRules(validate) 移除所有元素的验证规则
     *      validate {bool=} 移除部分规则后，是否立即重新验证该元素，默认为 true
     *  - returnObj.removeRules(name,rules,validate) 移除指定name的元素的验证规则
     *      name {string} 要移除验证规则的元素的 name，也对应初始化时 opts.rules 及 opts.messages 中的key
     *      rules {Array=} 要移除的规则名数组，若未定义则移除全部规则
     *      validate {bool=} 移除部分规则后，是否立即重新验证该元素，默认为 true
     *  - returnObj.addRules(addopts,validate) 移除指定name的元素的验证规则
     *      addopts {object} 同初始化时的options（但不含 callback）
     *      validate {bool=} 移除部分规则后，是否立即重新验证全部元素，默认为 true
     *  - returnObj.resetValStat() 恢复所有验证状态
     * 验证不通过时将对该表单元素的 class 添加 "dangerI"
     */
    $.fn.initValidator = function(options) {
        if (!options || !options.rules) return;
        options = $.extend({
            autoScroll: true // valiadateAll() 验证失败时，是否自动滚动到第一个验证失败的元素
        }, options);
        var rules, messages, form = $(this);
        var _errCls = 'dangerI',
            _blurValEv = 'blur._validate',
            _clickValEv = 'click._valiTip'; // 与 $.fn.validate 一致
        var _validate = function(name) {
            var rulesOnEl = rules[name];
            if (!rulesOnEl) return true; // 此元素上未定义规则，验证通过
            var messagesOnEl = messages ? messages[name] : undefined;
            var curEl = form.find('[name="' + name + '"]');
            return !curEl.length || curEl.validate(rulesOnEl, messagesOnEl, options.callback, false);
        };
        var _validateAll = function() {
            var status = true;
            for (var name in rules) {
                if (rules.hasOwnProperty(name)) {
                    if (_validate(name) == false) { // 对此元素定义了规则且验证未通过
                        status = false;
                    }
                }
            }
            if (!status && options.autoScroll) {
                form.find('.dangerI')[0].scrollIntoView(); // 将第一个验证失败的元素滚动到视图内
            }
            return status;
        };
        var _init = function() {
            form
                .off(_blurValEv)
                .on(_blurValEv, '[data-validate="true"]', function() { // 失焦时根据规则校验-暂只考虑文本框
                    _validate($(this).attr('name'));
                })
                .submit(function() {
                    return _validateAll();
                });
            _resetAllRules(options.rules, options.messages);
        };
        var _removeAllRules = function() {
            for (var name in rules) {
                if (rules.hasOwnProperty(name)) {
                    _removeRules(name);
                }
            }
        };
        var _resetAllRules = function(_rules, _msgs) {
            _removeAllRules();
            if (!_rules) return;
            rules = _rules;
            messages = _msgs;
            for (var name in rules) {
                if (rules.hasOwnProperty(name)) { // 设置需要验证的表单元素的属性
                    form.find('[name="' + name + '"]').attr('data-validate', 'true');
                }
            }
        };
        /**
         * 移除指定name的元素的验证规则
         * @param name {string} 要移除验证规则的元素的 name，也对应初始化时 opts.rules 及 opts.messages 中的key
         * @param removeRules {Array=} 要移除的规则名数组，若未定义则移除全部规则
         * @param validate {bool=} 移除部分规则后，是否立即重新验证该元素，默认为 true
         * @private
         */
        var _removeRules = function(name, removeRules, validate) {
            var el = form.find('[name="' + name + '"]');
            var rulesOnEl = rules[name];
            var hasProp = false; // 标记移除部分规则后是否还存在验证规则
            if (rulesOnEl && removeRules && removeRules.length) { // 解绑指定规则
                for (var i = 0, len = removeRules.length; i < len; i++) {
                    delete rulesOnEl[removeRules[i]];
                }
                for (var rName in rulesOnEl) {
                    hasProp = true; // 存在验证规则
                    break;
                }
            } else { // 解绑全部规则
                rulesOnEl = undefined;
            }
            el.removeClass(_errCls); // 删除原验证状态
            el.off(_clickValEv);
            if (!hasProp) {
                el.removeAttr('data-validate');
                delete rules[name];
            } else if (validate != false) { // 有规则，并定义了立即重新验证
                _validate(name);
            }
        };
        /**
         * 移除指定name的元素的验证规则
         * @param addOpts {object} 同初始化时的options（但不含 callback）
         * @param validate {bool=} 移除部分规则后，是否立即重新验证全部元素，默认为 true
         * @private
         */
        var _addRules = function(addOpts, validate) {
            var _rules = addOpts.rules,
                _messages = addOpts.messages;
            for (var name in _rules) {
                if (_rules.hasOwnProperty(name)) { // 设置需要验证的表单元素的属性
                    var el = form.find('[name="' + name + '"]');
                    el.attr('data-validate', 'true');
                    rules[name] = rules[name] ?
                        $.extend(rules[name], _rules[name]) : _rules[name];
                    if (validate == false) { // 不立即验证，取消之前的验证结果
                        el.removeClass(_errCls); // 删除原验证状态，与 $.fn.validate 中一致
                        el.off(_clickValEv); // 与 $.fn.validate 中一致
                    }
                }
            }
            if (_messages) {
                if (_messages.hasOwnProperty(name)) {
                    messages[name] = messages[name] ?
                        $.extend(messages[name], _messages[name]) : _messages[name];
                }
            }
            if (validate != false) { // 立即验证全部
                _validateAll();
            }
        };
        /**
         * 恢复所有验证状态
         * @private
         */
        var _resetValStat = function() {
            form.find('[data-validate="true"]')
                .removeClass(_errCls) // 与 $.fn.validate 中一致
                .off(_clickValEv); // 与 $.fn.validate 中一致
        };
        var _returnObj = {
            el: form,
            validateAll: _validateAll,
            resetAllRules: _resetAllRules,
            removeAllRules: _removeAllRules,
            removeRules: _removeRules,
            addRules: _addRules,
            resetValStat: _resetValStat
        };
        _init();
        return _returnObj;
    };
    /**
     * 显示 el 上验证提示信息 msg
     * @param el
     * @param msg
     * @param opts {object=}
     */
    $.showValiTip = function(el, msg, opts) {
        if (window.layer) {
            var shadeClose;
            if (opts) shadeClose = opts.shadeClose;
            var index = layer.tips(msg, el, $.extend({
                tips: [1, '#FF9901'],
                time: 1000
            }, opts));
            $(document).off('click.hideTip');
            shadeClose && $(document).on('click.hideTip', function(e) {
                if (!$(e.target).closest('#layui-layer' + index).length && !$(e.target).closest(el).length) {
                    layer.close(index);
                    $(document).off('click.hideTip');
                }
            });
        } else {
            alert(msg);
        }
    };
    /**
     * 显示 confirm 弹框
     * @param msg {string} 提示信息
     * @param cbyes {function=} 点击确认时的回调函数
     * @param cbno {function=} 点击取消时的回调函数
     * @param win {object=} 弹框时参照的 window 对象，默认为当前 window。
     */
    $.showConfirm = function(msg, cbyes, cbno, win) {
        if (!win) win = window;
        if (win.layer) {
            win.layer.confirm(msg, {
                title: false //不显示标题
                    ,
                closeBtn: 0,
                btn: ['确定', '取消']
            }, function(index) {
                cbyes && cbyes();
                win.layer.close(index);
            }, function(index) {
                cbno && cbno();
                win.layer.close(index);
            })
        } else if (confirm(msg)) {
            cbyes && cbyes();
        } else {
            cbno && cbno();
        }
    };
    /**
     * 显示 alert 弹框
     * @param msg {string} 提示信息
     * @param cb {function=} 关闭提示信息时的回调函数
     * @param win {object=} 弹框时参照的 window 对象，默认为当前 window。
     */
    $.showAlert = function(msg, cb, win) {
        if (!win) win = window;
        if (win.layer) {
            win.layer.alert(msg, {
                title: false //不显示标题
                    ,
                closeBtn: 0
            }, function(index) {
                cb && cb();
                win.layer.close(index);
            })
        } else {
            alert(msg);
            cb && cb();
        }
    };
    /**
     * 显示 msg 弹框
     * @param msg {string} 提示信息
     * @param cb {function=} 关闭时的回调函数
     * @param win {object=} 弹框时参照的 window 对象，默认为当前 window。
     */
    $.showMsg = function(msg, cb, win) {
        if (!win) win = window;
        if (win.layer) {
            win.layer.msg(msg, {
                shade: 0.3,
                time: 1000,
                end: cb
            });
        } else {
            alert(msg);
            cb && cb();
        }
    };
    /**
     * 计算包含中英文字符混合的字符串的长度
     * @param str 要计算长度的字符串
     * @returns {number}
     */
    $.getZhStrLength = function(str) {
        var totalLength = 0;
        if (!!str) {
            var list = str.split("");
            for (var i = 0; i < list.length; i++) {
                var s = list[i];
                if (s.match(/[\u0000-\u00ff]/g)) { //半角
                    totalLength += 1;
                } else if (s.match(/[\u4e00-\u9fa5]/g)) { //中文
                    totalLength += 2;
                } else if (s.match(/[\uff00-\uffff]/g)) { //全角
                    totalLength += 2;
                }
            }
        }
        return totalLength;
    };
    /* 验证规则定义 */
    $.validator = {
        messages: {
            'required': '此字段必填',
            'requiredNoTrim': '此字段必填',
            'number': '此字段必须为数字',
            'numberRange': '此字段必须为数字，范围：{0}~{1}',
            'int': '此字段必须为整数',
            'maxlength': '此字段值最多{0}个字符',
            'length': '此字段值为{0}个字符',
            'ZhStrMaxLength': '此字段最多{0}个字符（中文计为2个字符）',
            'ZhStrRangeLength': '此字段限制{0}-{1}个字符（中文计为2个字符）',
            'isPhone': '电话号码格式错误',
            'isCardNo': '身份证号格式错误',
            'regularName': '此字段只能由字母、数字、下划线组成',
            'email': '电子邮件格式不正确',
            'postalCode': '邮政编码格式不正确'
        },
        // 验证通过时返回 true，不通过时返回 false
        methods: {
            'required': function(limit, el) {
                    if (limit) {
                        var val = el.val();
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return val && val.length > 0;
                    }
                    return true;
                }
                // 必填，允许只填写空格
                ,
            'requiredNoTrim': function(limit, el) {
                if (limit) {
                    var val = el.val();
                    return val && val.length > 0;
                }
                return true;
            },
            'number': function(limit, el) {
                    if (limit) {
                        var val = el.val();
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return !val || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(val);
                    }
                    return true;
                }
                // 数字范围验证，值必须为数字
                ,
            'numberRange': function(limit, el) {
                if (limit.constructor == Array) {
                    var val = el.val(),
                        min = limit[0],
                        max = limit[1];
                    if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                        val = val.trim();
                    }
                    if (val) {
                        if (typeof min == 'undefined') {
                            limit[0] = '不限';
                        }
                        if (typeof max == 'undefined') {
                            limit[1] = '不限';
                        }
                        if (/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(val)) { // 非空，首先验证数字，同 number 的规则
                            val = Number(val); // 转换为数字
                            if (typeof min != 'undefined' && val < min || // 定义了最小值，但不符合
                                typeof max != 'undefined' && val > max) { // 定义了最大值，但不符合
                                return false;
                            }
                        } else { // 有值，但是非数字
                            return false;
                        }
                    }
                }
                return true;
            },
            'int': function(limit, el) {
                if (limit) {
                    var val = el.val();
                    if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                        val = val.trim();
                    }
                    return !val || /^-?\d+$/.test(val);
                }
                return true;
            },
            'maxlength': function(limit, el) {
                if (typeof limit == 'number') {
                    var val = el.val();
                    if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                        val = val.trim();
                    }
                    return !val || val.length <= limit;
                }
                return true;
            },
            'length': function(limit, el) {
                    if (typeof limit == 'number') {
                        var val = el.val();
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return !val || val.length == limit;
                    }
                    return true;
                }
                // 字符最大长度验证（一个中文字符长度为2）
                ,
            'ZhStrMaxLength': function(limit, el) {
                    if (typeof limit == 'number') {
                        var val = el.val();
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return !val || $.getZhStrLength(val) <= limit;
                    }
                    return true;
                }
                // 字符长度区间验证（一个中文字符长度为2）不能在用class属性定义验证规则时使用,取不到区间的值
                ,
            'ZhStrRangeLength': function(limit, el) {
                    if (limit.constructor == Array) {
                        var val = el.val(),
                            length = $.getZhStrLength(val);
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return !val || (length >= limit[0] && length <= limit[1]);
                    }
                    return true;
                }
                // 联系电话(手机/电话皆可)验证
                ,
            'isPhone': function(limit, el) {
                    if (limit) {
                        var val = el.val(),
                            mobileRex = /^1\d{10}$/,
                            telRex = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return !val || (telRex.test(val) || (val.length == 11 && mobileRex.test(val)));
                    }
                    return true;
                }
                // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                ,
            'isCardNo': function(limit, el) {
                var _cardNoVali = function(idcard) {
                    idcard = idcard.toString().toUpperCase(); // 将末位的x装换成X
                    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(idcard))) return false;
                    var paritybit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 校验位取值
                    var power_list = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子

                    var fifteenToEighteen = function(str) {
                        var s = 0;
                        var newid = str.substring(0, 6) + "19" + str.substring(6, str.length);
                        for (var i = 0; i < newid.length; i++) {
                            s += parseInt(newid.substring(i, i + 1), 10) * power_list[i];
                        }
                        return newid + paritybit[s % 11];
                    };
                    /**验证1位校验码（18位）*/
                    var checkcodeValidation = function(str) {
                        for (var i = 0, s = 0; i < str.length - 1; i++) {
                            s += parseInt(str[i], 10) * power_list[i];
                        }
                        return paritybit[s % 11] == str[17];
                    };
                    /**验证6位地址码（前6位）? 2位*/
                    var locationValidation = function(str) {
                        var provincesAndCities = ['11', '12', '13', '14', '15', '21', '22',
                            '23', '31', '32', '33', '34', '35', '36',
                            '37', '41', '42', '43', '44', '45', '46',
                            '50', '51', '52', '53', '54', '61', '62',
                            '63', '64', '65', '71', '81', '82', '91'
                        ]; /**省、直辖市代码*/
                        return provincesAndCities.indexOf(str) != -1;
                    };
                    /**验证8位生日数字（7到14位）*/
                    var birthdayValidation = function(str) {
                        var year = str.substring(0, 4);
                        var month = str.substring(4, 6);
                        var day = str.substring(6, 8);
                        var birthday = year + "/" + month + "/" + day;
                        //var date = new Date(year,parseInt(month,10)-1,day);// ie8 下 parseInt() 默认基数为8， 08,09 会变成 0
                        var date = new Date(birthday);
                        /**大于等于当前日期 或 小于1900年1月1日*/
                        if (date >= new Date() || date <= new Date(1900, 0, 1)) return false;
                        return date.format("yyyy/MM/dd") == birthday;
                    };
                    if (15 == idcard.length) { // 15位转18位
                        idcard = fifteenToEighteen(idcard);
                    }
                    return (locationValidation(idcard.substring(0, 2)) // 验证6位地址码（前6位）? 2位
                        &&
                        birthdayValidation(idcard.substring(6, 14)) // 验证8位生日数字（7到14位）
                        &&
                        checkcodeValidation(idcard)); // 验证1位校验码（18位）
                };
                if (limit) {
                    var val = el.val();
                    if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                        val = val.trim();
                    }
                    return !val || _cardNoVali(val);
                }
                return true;
            },
            'regularName': function(limit, el) {
                    if (limit) {
                        var val = el.val(),
                            cardNoRex = /(^[\da-zA-Z_]+$)/;
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return !val || cardNoRex.test(val);
                    }
                    return true;
                }
                // 电子邮件
                ,
            'email': function(limit, el) {
                    if (limit) {
                        var val = el.val(),
                            email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                        if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                            val = val.trim();
                        }
                        return !val || email.test(val);
                    }
                    return true;
                }
                // 邮政编码
                ,
            'postalCode': function(limit, el) {
                if (limit) {
                    var val = el.val(),
                        PostalCode = /^[1-9][0-9]{5}$/;
                    if (typeof el.attr('data-notrim') == 'undefined') { // 若定义了 data-notrim 属性，则前后空格参与验证
                        val = val.trim();
                    }
                    return !val || PostalCode.test(val);
                }
                return true;
            }
        },
        /**
         * 扩展验证对象
         * @param ruleName {string} 规则名
         * @param ruleMethod {function} 验证方法
         * @param msg {string} 默认提示信息
         */
        add: function(ruleName, ruleMethod, msg) {
            $.validator.messages[ruleName] = msg;
            $.validator.methods[ruleName] = ruleMethod;
        }
    };
    /**
     * 获取当前日期 TODO 扩展为从服务器获取
     * return {Date}
     */
    $.getDate = function() {
        return new Date();
    };
    /**
     * @widoc $.fn.setFormData
     * @namespace aux
     * @des 将当前元素中定义了 name 的元素根据 jsonValue 赋值
     * 支持文本框、文本域、单选框、复选框（数组或以“;”分隔的字符串）、下拉框
     * 注：jsonValue 中未指定的数据不会更改，即如需清空，需要指定所有 name 并赋空值''
     * @type function
     * @param {object} jsonValue 以 name-val 键值对形式保存的元素值，name 对应表单元素的 name
     */
    $.fn.setFormData = function(jsonValue) {
        var el = $(this),
            jqControl, type; // 表单元素，表单元素的 type
        $.each(jsonValue, function(name, ival) {
            jqControl = el.find("[name=" + name + "]");
            type = jqControl.attr("type");
            if (typeof ival != 'undefined') {
                if (type == 'checkbox') {
                    jqControl.prop('checked', false); // 取消所有选中
                    if (typeof ival == 'string') {
                        ival = ival.split(';');
                    }
                    for (var i = 0, len = ival.length; i < len; i++) {
                        jqControl.filter('[value="' + ival[i] + '"]').prop('checked', true);
                    }
                } else if (type == 'radio') {
                    jqControl.prop('checked', false);
                    jqControl.filter('[value="' + ival + '"]').prop('checked', true);
                } else {
                    jqControl.val(ival);
                }
            }
        })
    };
    /**
     * 获取元素中定义了 name 属性的元素的 value，调用此方法的元素必须为 form
     * @returns {Object} 键值对
     */
    $.fn.serializeObject = function() {
        var o = {},
            a = this.serializeArray();
        var jq, name, type, val,
            jqIpts = $(this).find('[name]'); // 只处理有 name 属性的元素
        $.each(a, function() {
            if (this.name != '' && this.name != null) {
                if (o[this.name] != undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            }
        });
        // 兼容 wiFrame 中的新功能，若文本框上未定义 data-notrim，取值时删除前后空格
        $.each(jqIpts.filter('input'), function() {
            jq = $(this);
            type = jq.attr('type');
            if (type == 'text' || typeof type == 'undefined') {
                name = jq.attr('name');
                val = jq.val();
                // 文本框 - 若定义了 data-notrim 属性，则会保留前后空格
                o[name] = typeof jq.attr('data-notrim') == 'undefined' ?
                    val.trim() :
                    val;
            }
        });
        return o;
    };
    /**
     * 显示 loading 动画
     */
    var WICONF = {};
    WICONF.loading = {
        duration: 500, // 动画最短持续时间，避免闪屏
        content: ''
            //fInRender: $.noop// function({content}) 绘制加载容器内容的函数
    };
    var nStartTime = -1, // 记录开始时间（1970 年 1 月 1 日至今的毫秒数）
        nCount = 0; // 在 hideLoading 前调用 showLoading 的次数，直到 nCount 变为 0 时，才真正移除加载条
    $.showLoading = function(opts) {
        var conf = {
            duration: 500, // 动画最短持续时间，避免闪屏
            content: ''
        };
        opts = $.extend({
            content: conf.content, // 配置项
            fInRender: conf.fInRender // function({content}) 绘制加载容器内容的函数
        }, opts);
        var fInit = function() {
            var fInRender = opts.fInRender,
                sIn;
            if (nCount < 0) { // 为避免随意调用 $.hideLoading() 导致的异常
                nCount = 0; // 归零
            }
            nCount++; // 计数加 1
            // 若不存在.loadingdata元素，则显示loading动画
            if ($('body>.loadingdata').length <= 0) {
                sIn = fInRender ?
                    fInRender({ // 根据用户绘制函数绘制内容
                        content: opts.content
                    }) :
                    '<div class="loadingdata-in">' + opts.content + '</div>';
                $('body').append('<div class="loadingdata">' + sIn + '</div>');
                nStartTime = new Date().getTime(); // 返回 1970 年 1 月 1 日至今的毫秒数。
            }
        };
        fInit();
    };
    $.hideLoading = function() {
        //若存在.loadingdata元素，则隐藏loading动画
        var jqLoading = $('body>.loadingdata'),
            nDiff; // 当前距离最早结束时间剩余的毫秒数
        var fRemove = function() {
            nStartTime = -1; // 将开始时间归零
            jqLoading.remove();
        };
        if (--nCount == 0 && jqLoading.length > 0) { // 已显示加载条，且调用 hideLoading 的次数与 showLoading 相等，允许删除
            if (nStartTime > -1) { // 记录了开始时间
                nDiff = nStartTime + WICONF.loading.duration - new Date().getTime();
                if (nDiff <= 0) { // 已经超过最早结束时间
                    fRemove();
                } else {
                    setTimeout(fRemove, nDiff);
                }
            } else {
                fRemove();
            }
        }
    };
    /**
     * 初始化 tree
     * @param {object} _opts 用户配置
     *  - opts.multi {bool=} 是否多选，默认为 false。
     *  - opts.data {Array=} 树数据源，若定义，则 opts.url 及 opts.urlArgs 失效
     *  - opts.url {string=} 树数据源请求地址，若定义了 opts.data，此属性失效
     *  - opts.urlArgs {object=} 树数据源请求时向后台传递的参数，若定义了 opts.data，此属性失效
     *  - opts.selParams {Array=} 指定加载完成后选中项条件[key,value]，复选时，value支持数组
     *  - opts.filterEl {object} 过滤文本框对象
     *  - opts.filter {object} 过滤功能配置，仅当定义了 filterEl 时生效
     *      opts.filter.fields {string|Array} 参与过滤的列的属性名，默认与 opts.key.name 相同
     *      opts.filter.pySupport {bool} 是否支持拼音首字过滤，开启过滤时，默认为 true
     *      opts.filter.hide{bool} 是否隐藏不符合过滤条件的节点，默认为 true，复选时此属性无效
     *  - opts.initSelect {bool=} 初始化时若没有选中项，是否选中第一个可选项，默认为 true，复选时失效。
     *  - opts.selector(node) {function=} 选择时的过滤条件，节点可选时返回 true。
     *  - opts.async {object=} ztree 初始化时的 setting.async
     *  - opts.check {object=} ztree 初始化时的 setting.check。默认值：
     *        enable 复选为 true，单选为 false（非特殊情况请勿覆写）
     *        chkboxType 为 { "Y": "ps", "N": "ps" }，即级联选中（可覆写）
     *  - opts.callback {object=} ztree 初始化时的 setting.callback
     *  - opts.edit {object=} ztree 初始化时的 setting.edit
     *  - opts.view {object=} ztree 初始化时的 setting.view。默认值：
     *        fontCss: function (treeId, treeNode) {// 高亮（过滤）
     *            return (!!treeNode.__hlight) ? {color: "#A60000", "font-weight": "bold"} : {color: "#333", "font-weight": "normal"};
     *        }
     *        selectedMulti: 复选为true，单选为false（非特殊情况请勿覆写）
     *  - opts.key {object=} ztree 初始化时的 setting.data.key
     *  - opts.simpleData {object=} ztree 初始化时的 setting.data.simpleData（opts.simple.enable: false 使用/不使用 简单数据模式，默认为树形结构）
     *  - opts.afterInit {function=} 完成初始化后调用的方法
     *        treeObj {object} $.fn.initZTree() 返回的接口
     *  - opts.onSelect {function=} 设置选中项后的回调函数。触发时机：初始化完成后，obj.setSel(selParams,clear)，onClick(单选)/onCheck(复选)
     *        selnodes {object|Array} 单选时为选中节点，复选时为选中节点数组
     *        treeObj {object} $.fn.initZTree() 返回的接口
     * @return {object|undefined} obj
     *  - obj.treeObj: ztree初始化完成后获得的树对象
     *  - obj.treeId: 当前树 id
     *  - obj.setting: ztree 初始化时使用的 setting
     *  - obj.setSel(selParams,clear): 设置选中项
     *        selParams {Array=} 指定要选中的项的条件[key,value]，复选时 value 支持数组
     *        clear {bool=} 是否先清空原有选中项，默认为 true
     *  - obj.reset(url,urlArgs,selParams): 重新请求数据源,若未定义参数，则使用初始化时的配置重新请求
     *        url {string=} 重新请求的地址，未定义则使用上一次指定的url
     *        urlArgs {object=} 重新请求时向后台传递的参数
     *        selParams {Array=} 重新请求时，加载完成后选中项条件[key,value]
     *  - obj.reset(data,selParams): 重置数据源，若未定义参数，则使用初始化时的配置重新初始化树
     *        data{Array=} 重置的树数据源
     *        obj.reset(undefined,selParams) 与 obj.reset(undefined,undefined,,selParams) 相当于 obj.setSel(selParams,true)
     *  - obj.getNodeById(tId): 根据 tid 获取节点
     *  - obj.getSelectedNodes(): 单选返回选中项，无则返回 undefined；复选返回选中项数组（含半选），无则返回[]
     *  - obj.getSelectedNodesNoHalf(): 单选同obj.getSelectedNodes()；复选返回选中项数组（不含半选），无则返回[]
     */
    $.fn.initZTree = function(_opts) {
        if (!_opts || (!_opts.data && !_opts.url)) return; // 未定义数据源且未定义数据源请求url
        var el = $(this);
        var treeId = el.attr('id'); // 树控件 id
        if (!treeId) {
            treeId = $.generateGuid('zTree');
            el.attr('id', treeId);
        }
        el.addClass('ztree');
        var opts = $.extend({
            multi: false // 默认单选
                //        ,data:[]
                //        ,url:''
                //        ,urlArgs:{}
                //        ,selParams:[key,val]
                ,
            initSelect: true
                //        ,filterEl
                ,
            filter: {}
            //        ,selector:function(node)
            //        ,async,check,callback,edit,view,key,simpleData
            //        ,afterInit:function(_returnObj)
            //        ,onSelect:function(selnodes,_returnObj)
        }, _opts);
        var _conf = { // 辅助参数
            filterRemains: 0 // 搜索关键字时修改节点高亮属性及展开父节点（会造成延时）的剩余操作总数
                ,
            scrollNode: undefined // 要移入视图的节点
                ,
            filtering: false,
            filterList: [] // 高亮节点列表 / 隐藏节点列表
                ,
            initing: false // 标记是否处于初始化过程，避免初始化时展开选中节点的祖先的操作进入 _afterFilterOpt 导致无法完成初始化及触发用户回调
                ,
            selChanging: false // 是否正在调整选中项，_afterFilterOpt 中触发 onSelect 事件
        };
        var _treeObj // ztree 初始化完成后返回的接口对象，在 initTree() 中赋值
            , arrayNodes // 数组型节点数据源，在 initTree() 中赋值
            , multi = _opts.multi,
            selNode; // 单选时初始化时选中的节点，若存在将在 _afterFilterOpt 中触发点击
        var _filterObj;
        var _returnObj = {
            'treeId': treeId
                // 根据用户配置初始化 zTree setting
                ,
            'setting': (function(opts, multi) {
                var setting = {
                    data: {
                        key: opts.key,
                        simpleData: opts.simpleData
                    },
                    check: $.extend({
                        enable: multi // 是否显示复选框
                            ,
                        chkboxType: { "Y": "ps", "N": "ps" } // 禁止级联
                    }, opts.check),
                    view: $.extend({ // 根据 treeNode.__hlight 设置节点样式
                        fontCss: function(treeId, treeNode) {
                            return (!!treeNode.__hlight) ? { color: "#A60000", "font-weight": "bold" } : { color: "#333", "font-weight": "normal" };
                        },
                        selectedMulti: multi
                    }, opts.view),
                    callback: opts.callback || {}
                };
                /* 封装默认的回调方法 */
                // 因为聚焦元素时会展开节点（异步），所以要加入默认操作
                setting.callback.onExpand = (function(_onExtend) {
                    return function(event, treeId, node) {
                        if (_conf.filtering) { // 过滤时展开完成，操作总数-1，不执行用户操作
                            _conf.filterRemains--;
                            _afterFilterOpt();
                        } else {
                            _onExtend(event, treeId, node);
                        }
                    }
                })(setting.callback.onCheck || $.noop);
                // 设置选中项后的回调函数
                if (opts.onSelect) {
                    if (multi) { // 复选
                        setting.callback.onCheck = (function(_onCheck) {
                            return function(event, treeId, treeNode) {
                                _onCheck(event, treeId, treeNode);
                                opts.onSelect(_getSelectedNodesNoHalf(), _returnObj);
                            }
                        })(setting.callback.onCheck || $.noop);
                    } else {
                        setting.callback.onClick = (function(_onClick) {
                            return function(event, treeId, treeNode, clickFlag) {
                                _onClick(event, treeId, treeNode, clickFlag);
                                opts.onSelect(_getSelectedNodesNoHalf(), _returnObj);
                            }
                        })(setting.callback.onClick || $.noop);
                    }
                }
                // 单选定义了选择时的过滤条件（复选在初始化时对数据源 nocheck 属性设置隐藏复选框）
                if (!multi && opts.selector) {
                    setting.callback.beforeClick = (function(_beforeClick) {
                        return _beforeClick ? function(treeId, node, flag) {
                            return opts.selector(node) && _beforeClick(treeId, node, flag);
                        } : function(treeId, node, flag) {
                            return opts.selector(node);
                        }
                    })(setting.callback.beforeClick);
                }
                return setting;
            })(opts, multi)
        };
        // 过滤完成后，显示结果
        var _filterNodes = function(selNodes, keyword) {
            if (!_filterObj) return; // 过滤组件初始化过程中，关键字为 ''，不执行过滤，否则将清空点击状态
            _conf.filtering = true;
            if (opts.filter.hide) {
                if (!_conf.initing) { // 非初始化的过滤才将原选中项取消，否则导致 _filterObj.resetData() 时将默认选中项清空
                    _treeObj.cancelSelectedNode(_getSelectedNodes());
                }
                showFilter(selNodes, keyword); // 显示过滤结果
            } else {
                highlight(_conf.filterList, false);
                if (keyword) {
                    _conf.filterList = selNodes;
                    selNodes && selNodes.length && highlight(selNodes, true);
                }
            }
        };
        // 初始化过滤支持，必须在数据加载完成后调用
        var _initFilter = function() {
            if (!opts.filterEl) return;
            if (_filterObj) { // 更新过滤组件数据源
                _filterObj.setData(arrayNodes);
            } else {
                var filter = opts.filter;
                if (!filter.fields && opts.key && opts.key.name) filter.fields = opts.key.name;
                filter.hide = !opts.multi && filter.hide != false; // 只有单选且允许隐藏时为 true，多选禁止隐藏
                var filterOpts = {
                    fields: filter.fields,
                    data: arrayNodes,
                    afterFilter: _filterNodes
                };
                if (filter.pySupport != undefined) filterOpts.pySupport = filter.pySupport;
                _filterObj = opts.filterEl.initFilter(filterOpts);
            }
        };
        var _scrollTo = function(node) {
            if (node) {
                _conf.filtering = true;
                _conf.filterRemains++;
                _conf.scrollNode = node;
                _expandAncestors(node);
            } else if (_conf.scrollNode) { // 不定义滚动项时默认滚动到 _conf.scrollNode
                var nodeId = _conf.scrollNode.tId.replace(/\s/g, '_');
                var _treeDom = document.getElementById(treeId);
                var _treeBCR = _treeDom.getBoundingClientRect(),
                    _nodeBCR = document.getElementById(nodeId).getBoundingClientRect();
                if (_nodeBCR.top + 20 > _treeBCR.bottom) {
                    _treeDom.scrollTop += _nodeBCR.top + 20 - _treeBCR.bottom;
                } else if (_nodeBCR.top < _treeBCR.top) {
                    _treeDom.scrollTop += _nodeBCR.top - _treeBCR.top;
                }
                _conf.scrollNode = undefined;
            }
        };
        /**
         * 搜索到的所有节点的祖先节点及属性修改完成后，将 _conf.scrollNode 对应的节点滚入视图
         */
        var _afterFilterOpt = function() {
            if (_conf.filtering && _conf.filterRemains == 0) { // 所有节点操作完成，使第一个高亮节点进入视图
                if (_conf.initing) { // 在初始化过程中
                    _initFilter();
                    _conf.initing = false; // 必须在 _initFilter 之后，否则会被清空选中项
                    opts.afterInit && opts.afterInit(_returnObj);
                }
                if (_conf.selChanging) { // 正在修改选中项
                    _conf.selChanging = false;
                    if (selNode) { // selNode 存在：单选且有选中项
                        $('#' + selNode.tId + '_a').click(); // 点击要选中的项，onClick 事件中会触发 onSelect
                        selNode = undefined;
                    } else {
                        opts.onSelect && opts.onSelect(_getSelectedNodesNoHalf(), _returnObj);
                    }
                }
                _scrollTo();
                _conf.filtering = false;
            }
        };
        /**
         * 选中指定项
         * @param selParams {Array=} 指定加载完成后选中项条件[key,value]，复选时，value支持数组
         * @param clear {bool=} 是否要清除原有选中项，默认为 true，初始化时失效
         * @private
         */
        var _setSel = function(selParams, clear) {
            clear = clear != false;
            var len = arrayNodes.length;
            _conf.scrollNode = undefined;
            _conf.filtering = true;
            _conf.selChanging = true; // 正在改变选中值
            if (len > 0) {
                var key, val;
                if (selParams) { // 默认选中项
                    key = selParams[0];
                    val = selParams[1];
                }
                var firstEnableNode; // 第一个可选节点
                var i, node; // 循环临时变量
                var selectedNodes = _getSelectedNodes(); // 原来选中的项
                if (multi) {
                    if (key && Object.prototype.toString.call(val) !== '[object Array]') { // 复选时，将 val 统一为数组
                        val = [val];
                    }
                    if (clear) { // 清除原有选中项
                        for (i = 0; i < selectedNodes.length; i++) {
                            _treeObj.checkNode(selectedNodes[i], false);
                        }
                    }
                    if (_conf.initing) {
                        for (i = 0; i < len; i++) { // 根据 selParams 及 selector 勾选，并隐藏不可选的节点的勾选框
                            node = arrayNodes[i];
                            if (!opts.selector || opts.selector(node)) { // 未定义 selector，或符合 selector
                                if (!firstEnableNode) firstEnableNode = node;
                                if (key && val.indexOf(node[key]) > -1) { // 符合 selParams
                                    _treeObj.checkNode(node, true, false); // 因为可能存在由数据源决定的选中状态，故最后统一处理级联
                                }
                            } else { // 不可选的节点隐藏复选框
                                node['nocheck'] = true;
                                _treeObj.updateNode(node);
                            }
                        }
                        // 统一处理级联，根据选中的项设置级联父子节点
                        if (_returnObj.setting.check.chkboxType['Y']) { // 允许级联，手动选中各项，以触发级联选中
                            selectedNodes = _returnObj.getSelectedNodes(); // 获取当前勾选项集合（初始化时均未级联）
                            for (i = 0, len = selectedNodes.length; i < len; i++) {
                                _treeObj.checkNode(selectedNodes[i], true, true);
                            }
                        }
                    } else {
                        for (i = 0; i < len; i++) { // 根据 selParams 及 selector 勾选，并隐藏不可选的节点的勾选框
                            node = arrayNodes[i];
                            if (!opts.selector || opts.selector(node)) { // 未定义 selector，或符合 selector
                                if (key && val.indexOf(node[key]) > -1) { // 符合 selParams
                                    _treeObj.checkNode(node, true, true);
                                }
                            }
                        }
                    }
                    selectedNodes = _getSelectedNodesNoHalf(); // 获取最终的选中集合（不含半选项）
                    len = selectedNodes.length;
                    if (len) { // 有选中项
                        _conf.filterRemains += len;
                        for (i = 0; i < len; i++) { // 展开所有选中项
                            node = selectedNodes[i];
                            !_conf.scrollNode && (_conf.scrollNode = node); // 记录第一项过滤层级的节点（非半选项）
                            _expandAncestors(node);
                        }
                    } else if (_conf.initing && firstEnableNode) { // 展开第一个可选项
                        _conf.filterRemains++;
                        _conf.scrollNode = firstEnableNode;
                        _expandAncestors(firstEnableNode);
                    }
                } else {
                    if (clear && selectedNodes) { // 清除原有选中项
                        _treeObj.cancelSelectedNode(selectedNodes);
                    }
                    for (i = 0; i < len; i++) { // 根据 selParams 及 selector 勾选
                        node = arrayNodes[i];
                        if (!opts.selector || opts.selector(node)) { // 未定义 selector，或符合 selector
                            if (!firstEnableNode) firstEnableNode = node;
                            if (key && val == node[key]) { // 符合 selParams
                                selNode = node;
                                break;
                            }
                        }
                    }
                    if (_conf.initing && !selNode) { // 初始化且没有选中项，将第一个可选项滚入视图
                        _conf.scrollNode = firstEnableNode;
                        if (opts.initSelect) { // 选中第一个可选项，在 _afterFilterOpt 中触发点击。
                            selNode = firstEnableNode;
                        }
                    } else {
                        _conf.scrollNode = selNode;
                    }
                    if (_conf.scrollNode) {
                        _conf.filterRemains++;
                        _expandAncestors(_conf.scrollNode);
                    }
                }
            }
            _afterFilterOpt();
        };
        var _initTree = function(data) {
            if (typeof(data) == 'string') data = JSON.parse(data);
            _treeObj && _treeObj.destroy(treeId);
            _conf.filterList.length = 0;
            _treeObj = _returnObj.treeObj = $.fn.zTree.init($("#" + treeId), _returnObj.setting, data);
            arrayNodes = _treeObj.transformToArray(_treeObj.getNodes());
            _conf.initing = true; // 标识正在进行初始化，完成后在 _afterFilterOpt() 中处理初始化回调
            _setSel(opts.selParams, false);
        };
        var _init = function() {
            if (opts.data) {
                opts.url = undefined;
                _initTree(opts.data);
            } else {
                $.ajax({ // 请求数据初始化树
                    type: "post",
                    dataType: "json",
                    url: opts.url,
                    data: opts.urlArgs || {},
                    success: function(result) {
                        if (!result.success) {
                            result.msg && $.showAlert(result['msg']);
                            return;
                        }
                        _initTree(result.data);
                    }
                });
            }
        };
        /**
         * 展开指定节点的所有祖先
         * @param node {object} 树中的节点对象
         * @private
         */
        function _expandAncestors(node) {
            var level = node['level'],
                pnode = node;
            while (level > 0) {
                pnode = pnode.getParentNode();
                if (pnode.open == false) {
                    _conf.filterRemains++; // 新增一个父节点操作
                    /* 展开父节点，完成后触发 onExpand */
                    _treeObj.expandNode(pnode, true, false, false, true);
                    break; // expandNode 操作会展开父级节点
                }
                level--;
            }
            _conf.filterRemains--;
            _afterFilterOpt();
        }

        function showFilter(nodeList, keyword) {
            _conf.filtering = true;
            var nodes = _treeObj.getNodes();
            var childrenField = _treeObj.setting.data.key.children;
            /**
             * @return {boolean} nodes 中是否存在需要显示的节点
             */
            var chargeNodes = function(nodes) {
                if (!nodes || !nodes.length) return false;
                var show = false;
                for (var i = 0, node, children, nodeShow = false; i < nodes.length; i++) {
                    node = nodes[i];
                    children = node[childrenField];
                    nodeShow = chargeNodes(children); // 先判断子孙中是否有匹配的节点
                    if (!keyword) {
                        node.__hlight = false;
                        nodeShow = true;
                    } else if (nodeList.indexOf(node) > -1) { // 当前节点匹配
                        node.__hlight = true;
                        nodeShow = true;
                    } else {
                        node.__hlight = false;
                    }
                    if (nodeShow) {
                        _treeObj.showNode(node);
                    } else {
                        _treeObj.hideNode(node);
                        _conf.filterList.push(node);
                    }
                    _treeObj.updateNode(node); // 更新节点状态
                    show = show || nodeShow;
                }
                return show; // 没有匹配的子节点
            };
            _conf.filterList.length = 0;
            chargeNodes(nodes);
            if (keyword) _treeObj.expandAll(true); // 搜索结果全部展开
        }

        function highlight(nodeList, highlight) {
            if (!nodeList) return;
            var i, node; // 循环临时变量
            if (highlight) { // 开启高亮
                var scrollNode;
                _conf.filterRemains = nodeList.length; // 等待完成的节点操作总数，初始时为搜索到的节点总数（展开节点会产生延迟）
                for (i = 0; i < nodeList.length; i++) {
                    node = nodeList[i];
                    !scrollNode && (!multi || !node.getCheckStatus.half) && (scrollNode = _conf.scrollNode = node); // 记录第一项过滤层级的节点（非半选项）
                    node.__hlight = true;
                    _treeObj.updateNode(node);
                    _expandAncestors(node); // 展开所有高亮节点的祖先
                }
            } else { // 取消高亮
                for (i = 0; i < nodeList.length; i++) {
                    node = nodeList[i];
                    node.__hlight = false;
                    _treeObj.updateNode(node);
                }
            }
        }
        /**
         * 更新数据源，重新初始化树 reset(url,urlArgs,selParams);reset(data,selParams)
         * @param url {string|Array=}
         * @param urlArgs {object|Array=}
         * @param selParams {Array=} 默认选中项条件 [key,value]
         */
        var _reset = function(url, urlArgs, selParams) {
            var _data, _url, _urlArgs, _selParams;
            if (typeof url == 'string') {
                _url = url;
                opts.urlArgs = undefined; // 重置数据源，原默认选中项置空
                opts.selParams = undefined; // 重置数据源，原默认选中项置空
            } else if (Object.prototype.toString.call(url) === '[object Array]') {
                _data = url;
                opts.selParams = undefined; // 重置数据源，原默认选中项置空
            }
            if (Object.prototype.toString.call(urlArgs) === '[object Array]') {
                _selParams = urlArgs;
            } else if (urlArgs) {
                _urlArgs = urlArgs
            }
            if (selParams) _selParams = selParams;
            if (_urlArgs) opts.urlArgs = _urlArgs;
            if (_selParams) opts.selParams = _selParams;
            if (_data) {
                opts.data = _data;
                opts.url = undefined;
            } else if (_url) {
                opts.url = _url;
                opts.data = undefined;
            }
            _data || _url || _urlArgs ? _init() : _setSel(opts.selParams, true);
        };
        var _getSelectedNodes = function() {
            return multi ? _treeObj.getCheckedNodes(true) : _treeObj.getSelectedNodes(true)[0];
        };
        var _getSelectedNodesNoHalf = function() {
            var selNodes = _getSelectedNodes();
            if (multi) {
                var result = [];
                for (var i = 0, len = selNodes.length, node; i < len; i++) {
                    node = selNodes[i];
                    !node.getCheckStatus().half && result.push(node); // 只保留非半选的节点
                }
                return result;
            }
            return selNodes;
        };
        _returnObj.setSel = _setSel;
        _returnObj.reset = _reset; // 更新数据源
        _returnObj.getNodeById = function(tId) { // _treeObj 直接获取可能还未完成初始化
            return _treeObj.getNodeByTId(tId);
        };
        _returnObj.getSelectedNodes = _getSelectedNodes; // 复选时，含半选项
        _returnObj.getSelectedNodesNoHalf = _getSelectedNodesNoHalf; // 复选时，不含半选项
        _init();
        return _returnObj;
    };
    /**
     * 初始化弹出控件
     * @param callback {function} 弹框中的页面可调用的回调函数（不再关闭弹框，关闭需调用 parent.closeLayer['..']()）
     *  - callback(args)
     *    args: {object|undefined} 弹框页面传回主页面的值
     * @param apiName {string} 当前组件对应的选中事件方法名，供弹出的 iframe 页面中调用，避免多个 layer 组件冲突
     * 开放 window.cusLayer 接口供 iframe 调用
     *  - window.cusLayer[apiName](args,w)
     *    args: {object|undefined} 弹框页面传回主页面的值
     *    w: 是否用弹框中的值覆盖原始值，仅当其为 true 时，会调用 callback(args)
     * - window.closeLayer[apiName]() 关闭当前弹窗
     * @param win {object=} 弹框时参照的 window对象，默认为当前 window。
     *    注：win指向的页面依赖外部组件1.2.3 layer，且以同一个win为弹框参照的cusLayer的apiName不得相同
     * @return {object|undefined} obj
     *  - obj.show(opts) 显示弹框
     *    - opts.content {string} 必须项，弹框页面 url
     *    - opts.title {string=} 弹框标题，默认不显示标题
     *    - opts.area {Array=} 弹框大小，默认为：['400px', '90%']
     */
    $.initCusLayer = function(callback, apiName, win) {
        if (!win) win = window;
        if (!win.layer) return;
        var curLayerIdx; // 记录当前弹窗索引，用于关闭
        if (!win.cusLayer) win.cusLayer = {};
        if (!win.closeLayer) win.closeLayer = {};
        win.cusLayer[apiName] = function(arg) {
            callback && callback(arg);
        };
        win.closeLayer[apiName] = function() {
            win.layer.close(curLayerIdx);
        };
        return {
            show: function(options) {
                curLayerIdx = win.layer.open($.extend({
                    type: 2,
                    title: false,
                    //                shadeClose: true,// 允许点遮罩层关闭
                    shade: 0.5, // 遮罩层透明度
                    area: ['400px', '90%'],
                    cancel: win.closeLayer[apiName]
                }, options));
            }
        };
    };
    /**
     * @widoc $.initWiLayer
     * @namespace comp
     * @des 初始化弹出框
     * 注意：弹出页面中必须定义 window.initPage=function(name,data)
     * @type function
     * @param opts
     * @param {string} opts.name 弹出框的名称，必须保证当前页面中所有弹框名称的唯一性
     * @param {object} opts.layerOpts layer 的配置属性
     * @param {function=} opts.callback 关闭弹框时的操作
     * @return {object} obj
     * - obj.show {function} obj.show({data:..});
     */
    $.initWiLayer = function(opts) {
        opts = $.extend({
            name: '',
            //layerOpts:{content,title,area}
            callback: $.noop
        }, opts);
        var oLayer, api;
        var layerOpts = opts.layerOpts;
        var win = opts.win || /*$.getTopFrameWin() || */ window, // 实际弹框的窗口
            fromWin = window; // 触发弹框的窗口，不一定是弹窗的父窗口
        if (!layerOpts || !win.layer) return; // 必须定义 layer 配置

        var show = function(showOpts) {
            if (!showOpts) showOpts = {};
            if (showOpts.callback) { // 弹框前可以修改回调方法
                opts.callback = showOpts.callback;
            }
            // 弹框后调用弹出页面的 initPage 方法
            layerOpts.success = (function(userSuccess) {
                return function(layero, index) {
                    win.frames['layui-layer-iframe' + index].window.initPage(opts.name, $.extend(undefined, showOpts.data), fromWin); // 弹出子窗口后，初始化子窗口页面
                    userSuccess && userSuccess(layero, index);
                };
            })(showOpts.success);
            if (showOpts.content) { // 弹框前可以修改url
                layerOpts.content = showOpts.content;
            }
            oLayer.show(layerOpts);
        };
        var init = function() {
            // 初始化
            var curLayerIdx; // 记录当前弹窗索引，用于关闭
            var sApiName = opts.name; // 弹框标识
            if (!fromWin.cusLayer) { //不存在 fromWin.cusLayer,则创建此对象
                fromWin.cusLayer = {};
            }
            if (!fromWin.closeLayer) { //不存在 fromWin.closeLayer,则创建此对象
                fromWin.closeLayer = {};
            }
            fromWin.cusLayer[sApiName] = function(data) {
                return opts.callback(data);
            };
            fromWin.closeLayer[sApiName] = function() {
                win.layer.close(curLayerIdx);
            };
            oLayer = {
                show: function(showOpts) {
                    curLayerIdx = win.layer.open($.extend({ // 扩展 layer.open 属性
                        type: 2,
                        title: false,
                        //shadeClose: true,// 允许点遮罩层关闭
                        shade: 0.5, // 遮罩层透明度
                        //area: ['400px', '90%'],
                        cancel: fromWin.closeLayer[sApiName]
                    }, showOpts));
                }
            };
        };
        api = {
            show: show
        };
        init();
        return api;
    };
    /**
     * 初始化表格，当前元素中必须包含 .listtableDiv
     * @param _opts {object}
     *  - opts.url {string} 请求路径
     *  - opts.args {object=} 请求参数的键值对
     *  - opts.showHead {bool=} 是否显示表头，默认为 true
     *  - opts.showno {bool=} 是否显示序号，默认为 false
     *  - opts.chkField {bool|string=} 若定义此属性，则显示复选框列。若值为 string，则根据 chkField 对应的值初始化选中状态。
     *  - opts.singleChk {bool=} 若定义为 true，则只能进行单选，默认为 false（多选时必须定义 opts.chkField）
     *  - opts.page {object} 分页数据
     *      opts.page.percount {int} 默认每页数据条数
     *      opts.page.perList {Array} 分页数据列表
     *  - opts.filterEl {object} 过滤文本框对象
     *  - opts.filter {object=} 过滤功能配置，仅当定义了 filterEl 时生效
     *      opts.filter.fields {string|Array=} 参与过滤的列的属性名，对应 cols[i].field
     *      opts.filter.pySupport {bool=} 是否支持拼音首字过滤，开启过滤时，默认为 true
     *      opts.filter.hide {bool=} 是否隐藏不符合过滤条件的行，默认为 true，复选时此属性无效
     *  - opts.prompt {bool=} 无数据时是否显示提示，默认为 true
     *  - opts.cols {Array=} 列定义 [{field,...}]
     *      opts.cols[i].field {string} 该列对应的属性名
     *      opts.cols[i].name {string=} 该列的标识，默认与 field 相同
     *      opts.cols[i].title {string} 该列显示的标题文本
     *      opts.cols[i].showTip {bool=} 该列是否显示 title，默认为 false
     *      opts.cols[i].type {string} 该列显示的数据类型，默认为：'string'，可选值：'number','string'
     *      opts.cols[i].width {string} 该列宽度，需带单位
     *      opts.cols[i].align {string} 对齐方式，可选值：'center','left','right'。不指定时，type='string'时为'left'，type='number'时为'right'
     *      opts.cols[i].sort {bool} 该列是否允许排序，默认 false TODO
     *      opts.cols[i].render {function} 该列的渲染函数 render(val,row,i,grid) val 单元格值，row 行数据，i 当前行索引（相对当前页），grid 接口对象；返回 dom 字符串
     *      opts.cols[i].hrender {function} 该列标题部分的渲染函数 hrender(name,title) 当前列的 name 及 title
     *  - opts.rowClser {function=} 行自定义class函数。function(row,i){...} 参数参考 opts.cols[i].render
     *  - opts.callback {object=} 回调函数定义
     *      opts.callback.cell {object=} 单元格事件
     *          cell:{
     *              'ctrl':{     // 对应 cols 中定义的 opts.cols[i].name
     *                  'click':function(e,val,row,i){...}    // this 指向当前单元格 dom 对象，参数参考 opts.cols[i].render，e 为触发事件的 event 对象
     *              }
     *          }
     *      opts.callback.row {object=} 行事件
     *          row:{
     *              'click':function(e,row,i){...}    // this 指向当前行 dom 对象，参数参考 opts.callback.cell
     *          }
     *      opts.callback.afterShowData {function=} 显示完数据的回调函数
     *          function(grid){...}
     *      opts.callback.onCheckRow{function=} 选中行时的回调函数
     *          function(row,i,el){...} 参数依次是：行数据，行索引，行对应的tr对象
     *      opts.callback.onUnCheckRow{function=} 取消行选中时的回调函数
     *          function(row,i,el){...} 参数依次是：行数据，行索引，行对应的tr对象
     * ========================
     * @return {object|undefined} obj 接口对象
     *   - obj.el 获取当前 grid 对应的 el
     *   - obj.findCol(key,name) 根据条件查找所有符合的 cols[i].key=val 的列定义对象集合，未找到则为 []
     *   - obj.findRow(field,val) 根据条件查找所有符合的 data[i].field=val 的行对象集合，未找到则为 []
     *   - obj.getCheckedIdx() 获取当前列表所有选中行索引
     *   - obj.getCheckedRows() 获取当前列表所有选中行
     *   - obj.checkRow(row,chk) 改变指定行的选中状态
     *       row {object|Array} 要选中的行对应的数据，支持多条数据组成的数组
     *       chk {bool} true 时改为选中，false 改为不选中
     *   - obj.setData(data) 重置当前显示的数据列表
     *       data 新的列表数据
     *   - obj.getData() 返回当前显示的数据列表
     *   - obj.getPage() 返回当前的分页信息，返回值 {percount,totalpage,curpage,totalcount}
     *   - obj.getPageObj() 返回当前的分页对象
     *   - obj.resetData(cusOpts) 扩展初始化时的配置，重新请求数据（分页），不重绘整个 Grid
     *   - obj.merge(merges) 合并单元格
     *       merges {Array} 要合并的单元格信息
     *           merges[i].rowI {int} 要合并的单元格在当前页的索引
     *           merges[i].name {string} 要合并的单元格所在列对应的 name
     *           merges[i].rowspan {int} 合并几行
     *           merges[i].colspan {int} 合并几列
     *   - obj.destroy() 销毁 grid
     */
    $.fn.initGrid = function(_opts) {
        var el = $(this);
        var opts = $.extend({
            showHead: true,
            showno: false,
            showloading: false
                //            ,url:''
                //            ,data:[]
                //            ,args:{}
                ,
            chkField: false,
            singleChk: false,
            page: false
                //            ,filterEl
                ,
            filter: {},
            prompt: true,
            cols: []
                //            ,rowClser:function
                //            ,callback:{}
        }, _opts);
        if (!el.hasClass('listtableDiv')) el.addClass('listtableDiv');
        var _page = opts.page,
            _chkField = opts.chkField,
            _cols = opts.cols,
            _cb = opts.callback,
            _data, _curData; // 记录当前页数据
        var _manuObj, _pageObj // initPageBar 中绘制分页信息时回传的 _manuObj.page 更实时
            , _filterObj, _returnObj;
        /**
         * 根据条件查找所有符合的 cols[i].key=val 的列
         * @param key
         * @param val
         * @return {Array} 所有符合的列定义对象集合，未找到则为 []
         * @private
         */
        var _findCol = function(key, val) {
            var idxArr = [];
            for (var i = 0; i < _cols.length; i++) {
                var col = _cols[i];
                if (col[key] == val) {
                    idxArr.push(col);
                }
            }
            return idxArr;
        };
        /**
         * 根据条件查找所有符合的 data[i].field=val 的行
         * @param field
         * @param val
         * @return {Array} 所有符合的行对象集合，未找到则为 []
         * @private
         */
        var _findRow = function(field, val) {
            var rows = [];
            for (var i = 0; i < _data.length; i++) {
                var row = _data[i];
                if (row[field] == val) {
                    rows.push(row);
                }
            }
            return rows;
        };
        /**
         * 改变指定行的选中状态
         * @param row {object|Array} 要选中的行对应的数据，必须为当前 grid 中的数据对象
         * @param chk {bool} true 时改为选中，false 改为不选中
         */
        var _checkRow = function(row, chk) {
            if (!_chkField) return; // 未定义可选中
            var applyRow = function(r, rChk) {
                var oldChk = !!r[_chkField]; // 修改前的选中状态
                if (oldChk != rChk) {
                    r[_chkField] = rChk;
                    var i = parseInt(_curData.indexOf(r)); // 当前页中的索引
                    if (i != -1) {
                        var rowEl = el.find('tbody>tr[data-i="' + i + '"]');
                        rChk ? rowEl.addClass('trchk') : rowEl.removeClass('trchk');
                        !opts.singleChk && rowEl.find('>td[data-name="' + _chkField + '"]>input').prop('checked', rChk);
                    }
                    if (_cb) {
                        _cb.onCheckRow && rChk && _cb.onCheckRow(r, i, rowEl, _returnObj); // 选中回调
                        _cb.onUnCheckRow && !rChk && _cb.onUnCheckRow(r, i, rowEl, _returnObj); // 取消选中回调
                    }
                }
            };
            var chkStats = !!chk,
                i;
            // 单选情况下选中，先取消其他行选中
            if (opts.singleChk && chkStats == true) {
                var idxs = _getCheckedIdx();
                for (i = 0; i < idxs.length; i++) {
                    applyRow(_data[idxs[i]], false);
                }
            }
            if (Object.prototype.toString.call(row) === '[object Array]') { // 修改数组中的行的选中状态
                for (i = 0; i < row.length; i++) {
                    applyRow(row[i], chkStats);
                }
            } else {
                applyRow(row, chkStats);
            }
        };
        /**
         * 根据请求获取的数据绘制表格内容
         * @param {object} datalist 数据列表
         * @param {object|undefined=} pageObj 分页对象
         * @param {object|Array=} data 后台分页时，每次分页请求到的后台数据的 data 部分;前台分页时，所有数据的集合
         * @private
         */
        var _drawFn = function(datalist, pageObj, data) {
            var startNo = 1;
            _curData = datalist;
            _pageObj = pageObj;
            if (pageObj) startNo = (_pageObj.curpage - 1) * _pageObj.percount + 1 || 1; // 根据分页对象获得第一条的序号
            var dataStr = '';
            if (datalist && datalist.length > 0) {
                for (var i = 0; i < datalist.length; i++) {
                    var data = datalist[i];
                    var rowCls = '';
                    if (opts.rowClser) {
                        rowCls = opts.rowClser(data, i) || '';
                    }
                    if (_chkField && data[_chkField]) { // 当前行选中
                        dataStr += '<tr data-i="' + i + '" class="trchk ' + rowCls + '">';
                    } else {
                        dataStr += '<tr data-i="' + i + '" class="' + rowCls + '">';
                    }
                    if (opts.showno) {
                        dataStr += '<td class="ctrltd">' + (startNo + i) + '</td>';
                    }
                    if (_chkField && !opts.singleChk) {
                        dataStr += '<td style="text-align:center;" data-name="' + _chkField + '"><input type="checkbox"' + (data[_chkField] ? ' checked' : '') + ' /></td>';
                    }
                    for (var j = 0, col, cssStr; j < _cols.length; j++) {
                        col = _cols[j];
                        cssStr = '';
                        if (col.align) cssStr += 'text-align:' + col.align + ';'; // 对齐方式
                        if (cssStr) cssStr = ' style="' + cssStr + '"'; // 需要定义 style
                        dataStr += '<td data-name="' + col.name + '"' + cssStr + (col.showTip ? ' title="' + (data[col.field] == undefined ? '' : data[col.field]) + '"' : '') + '>' +
                            (col.render ? col.render(data[col.field], data, i, _returnObj) : (data[col.field] == undefined ? '' : $.HtmlEncode(data[col.field]))) +
                            '</td>';
                    }
                    dataStr += '</tr>';
                }
            } else if (opts.prompt != false) {
                var colspan = _cols.length;
                opts.showno && colspan++;
                _chkField && !opts.singleChk && colspan++;
                dataStr = '<tr><td class="nodata" colspan="' + colspan + '">未查询到符合条件的数据!</td></tr>'
            }
            el.find('tbody').html(dataStr);
            if (opts.url) { // 后台分页/后台不分页，当前数据就是全部可操作数据，前台分页/不分页在设置数据源时记录
                _data = datalist;
            }
            _cb && _cb.afterShowData && _cb.afterShowData(_returnObj);
            if (opts.url) {
                _filterObj && !_filterObj.getData() && _filterObj.setData(_data);
            }
        };
        /**
         * 获取当前列表所有选中行索引
         * @return {Array}
         * @private
         */
        var _getCheckedIdx = function() {
            var sels = [];
            if (_chkField) {
                for (var i = 0; i < _data.length; i++) {
                    if (_data[i][_chkField]) sels.push(i);
                }
            }
            return sels;
        };
        var _initBindEvent = function() {
            if (_cb) {
                var name, eType; // 临时变量
                // 行事件
                var cbRow = _cb.row;
                if (typeof cbRow == 'object') {
                    var cbRowHandle = function(handle) {
                        return function(e) {
                            var el = $(this),
                                i = parseInt(el.attr('data-i'));
                            handle.call(this, e, _curData[i], i, _returnObj);
                        };
                    };
                    for (eType in cbRow) {
                        if (cbRow.hasOwnProperty(eType))
                            el.on(eType + '.row', 'tbody>tr', cbRowHandle(cbRow[eType]));
                    }
                }
                // 单元格事件
                var cbCell = _cb.cell;
                if (typeof cbCell == 'object') {
                    var cbCellHandle = function(handle, name) {
                        var col = _findCol('name', name)[0];
                        return function(e) {
                            var el = $(this),
                                i = parseInt(el.parent().attr('data-i'));
                            handle.call(this, e, _curData[i][col.field], _curData[i], i, _returnObj);
                        };
                    };
                    for (name in cbCell) {
                        if (cbCell.hasOwnProperty(name))
                            for (eType in cbCell[name]) {
                                if (cbCell[name].hasOwnProperty(eType)) {
                                    el.on(eType + '.cell_' + name, 'tbody>*>td[data-name="' + name + '"]', cbCellHandle(cbCell[name][eType], name));
                                }
                            }
                    }
                }
            }
            // 默认行点击变色事件
            if (!opts.singleChk) { // 单选时点击行即选中行
                el.on('click._row', 'tbody>tr[data-i]', function() {
                    var tr = $(this);
                    if (tr.hasClass('now')) return;
                    tr.siblings('.now').removeClass('now');
                    tr.addClass('now');
                });
            }
            // 行选中事件
            if (_chkField) {
                if (opts.singleChk) { // 单选
                    el.on('click.chk', 'tbody>tr[data-i]', function() {
                        var tr = $(this),
                            rowI = parseInt(tr.attr('data-i')),
                            stat = _curData[rowI][_chkField];
                        _checkRow(_curData[rowI], true); // 选中点击行
                    });
                } else { // 复选
                    el.on('click.chk', 'tbody>tr>td[data-name="' + _chkField + '"]', function() {
                        var td = $(this),
                            rowI = parseInt(td.parent().attr('data-i')),
                            stat = _curData[rowI][_chkField];
                        _checkRow(_curData[rowI], !stat);
                    });
                    el.on('click.chkAll', 'thead>tr>[data-name="' + _chkField + '"]', function(e) {
                        var stat, input;
                        input = $(this).children('input');
                        if (e.target.tagName.toLocaleLowerCase() == 'input') { // 事件源是 input
                            stat = input.prop('checked');
                        } else {
                            stat = !input.prop('checked');
                        }
                        input.prop('checked', stat);
                        _checkRow(_curData, stat);
                    });
                }
            }
        };
        /**
         * 绘制表格，确定表头，并完成事件绑定
         * @private
         */
        var _initTable = function() {
            // 未定义选中状态字段名，且允许单选或多选
            if (typeof _chkField != 'string' && (opts.singleChk || _chkField == true)) {
                _chkField = '__checked';
            }
            var colAlignArr = ['center', 'left', 'right']; // col.align 合法值
            var tableStr = '<table class="listtable" cellspacing="0" cellpadding="0">';
            var showHead = opts.showHead;

            /* header 部分 start */
            tableStr += showHead ? '<thead><tr>' : '<colgroup>';
            if (opts.showno) {
                tableStr += showHead ? '<th style="width:50px;">序号</th>' : '<col style="width:50px;" />';
            }
            if (_chkField && !opts.singleChk) { // 复选
                tableStr += showHead ? '<th style="width:30px;" data-name="' + _chkField + '"><input type="checkbox" /></th>' :
                    '<col style="width:30px;" />';
            }
            for (var i = 0, w, col; i < _cols.length; i++) {
                col = _cols[i];
                // name
                if (!col.name) col.name = col.field;
                // 水平对齐方式
                if (col.align && colAlignArr.indexOf(col.align) != -1) { // 指定了合法的 align
                    if (col.align == 'left') delete col.align; // 此列为默认对齐方式
                } else if (col.type == 'number') { // 未指定 align，且为数字，居右显示
                    col.align = 'right';
                } else {
                    delete col.align;
                }
                var colStr = col.hrender ? col.hrender() : col.title;
                w = col.width ? 'width:' + col.width : '';
                tableStr += showHead ? '<th style="' + w + '" data-name="' + col.name + '">' + (colStr || '&nbsp;') + '</th>' :
                    '<col style="' + w + '" />';
            }
            tableStr += showHead ? '</tr></thead>' : '</colgroup>';
            /* header 部分 end */
            tableStr += '<tbody></tbody>' +
                '</table>';
            el.append(tableStr); // 将表格添加到 DOM
            if (opts.filterEl) { // 后台分页时不支持过滤
                var filter = opts.filter;
                filter.hide = opts.singleChk && filter.hide != false; // 只有单选且允许隐藏时为 true，多选禁止隐藏
                var filterOpts = {
                    fields: filter.fields,
                    afterFilter: function(newData, keyword) {
                        if (opts.url && _page) return; // 后台分页时不支持过滤
                        if (opts.data && _page) { // 前台分页
                            _manuObj && _manuObj.reset({
                                data: newData
                            })
                        } else {
                            _drawFn(newData);
                        }
                    }
                };
                if (filter.pySupport != undefined) filterOpts.pySupport = filter.pySupport;
                _filterObj = opts.filterEl.initFilter(filterOpts);
            }
            /* 创建回调监听 */
            _initBindEvent();
        };
        /**
         * 请求数据（分页）并绘制到 DOM
         * @private
         */
        var _bindData = function() {
            _data = opts.data;
            if (!_data && !opts.url) return; // 没有定义数据源时不进行数据部分绘制，用于支持初始化时不带入数据
            if (_page) { // 前台分页/后台分页
                var manu = el.next('.manu');
                if (!manu.length) {
                    manu = $('<div class="manu"></div>');
                    el.after(manu);
                }
                _manuObj = manu.initPageBar({
                    per: _page.percount // 每页显示的数据条数
                        ,
                    url: opts.url // 后台分页时请求的url
                        ,
                    args: opts.args,
                    data: _data,
                    showloading: opts.showloading,
                    perList: _page.perList // 可选择的每页页码列表，若未定义则不可切换
                        ,
                    afterFlip: _drawFn // 每次翻页后的回调函数，datalist:当前页数据；pageObj:当前分页信息
                });
            } else if (!_data) { // 后台不分页
                el.request({
                    drawDomFn: _drawFn,
                    showloading: opts.showloading,
                    ajaxOpts: {
                        url: opts.url,
                        data: opts.args
                    }
                });
            } else { // 前台不分页
                _manuObj && _manuObj.destroy();
                _manuObj = undefined;
                _drawFn(_data);
            }
            if (_data && _filterObj) { // 前台过滤
                _filterObj.setData(_data);
            }
        };
        /**
         * 合并指定单元格
         * @param merges {Array} 要合并的单元格信息
         *   merges[i].rowI {int} 要合并的单元格在当前页的索引
         *   merges[i].name {string} 要合并的单元格所在列对应的 name
         *   merges[i].rowspan {int} 合并几行
         *   merges[i].colspan {int} 合并几列
         * @private
         */
        var _merge = function(merges) {
            if (!merges || !merges.length) return;
            var _adjustMerge = function(mergeItem) {
                var rowI = mergeItem['rowI'],
                    colI = -1,
                    name = mergeItem['name'],
                    rowspan = mergeItem['rowspan'],
                    colspan = mergeItem['colspan'];
                var cellEl = el.find('tbody>tr[data-i="' + rowI + '"]>td[data-name="' + name + '"]'),
                    rowEl;
                if (!cellEl) return;
                for (var i = 0, len = _cols.length; i < len; i++) { // 获取当前列定义索引，由于判断过 cellEl，所以 colI 必有意义
                    if (name == _cols[i]['name']) {
                        colI = i;
                        break;
                    }
                }
                rowspan && cellEl.attr('rowspan', rowspan);
                colspan && cellEl.attr('colspan', colspan);
                /* 调整受影响的单元格 */
                rowspan = parseInt(cellEl.attr('rowspan')) || 1;
                colspan = parseInt(cellEl.attr('colspan')) || 1;
                for (var j = 0; j < rowspan; j++) {
                    rowEl = el.find('tbody>tr[data-i="' + (rowI + j) + '"]');
                    for (var k = 0; k < colspan; k++) {
                        if (j == 0 && k == 0) continue; // 保留当前单元格
                        rowEl.find('>td[data-name="' + _cols[colI + k]['name'] + '"]').remove();
                    }
                }
            };
            for (var i = 0, len = merges.length; i < len; i++) {
                _adjustMerge(merges[i]);
            }
        };
        /**
         * 销毁 grid
         * @private
         */
        var _destroy = function() {
            if (!el || !el.children().length) return;
            /* 解绑事件监听 */
            if (_cb) {
                var name, eType; // 临时变量
                // 行事件
                var cbRow = _cb.row;
                if (typeof cbRow == 'object') {
                    for (eType in cbRow) {
                        if (cbRow.hasOwnProperty(eType))
                            el.off(eType + '.row');
                    }
                }
                // 单元格事件
                var cbCell = _cb.cell;
                if (typeof cbCell == 'object') {
                    for (name in cbCell) {
                        if (cbCell.hasOwnProperty(name))
                            for (eType in cbCell[name]) {
                                if (cbCell[name].hasOwnProperty(eType)) {
                                    el.off(eType + '.cell_' + name);
                                }
                            }
                    }
                }
            }
            el.off('click.chk')
                .off('click.chkAll')
                .off('click._row');
            /* 解绑分页 */
            _manuObj && _manuObj.destroy();
            el.next('.manu').remove();
            // 清空 DOM
            el.html('');
        };
        _returnObj = {
            el: el
                /**
                 * 根据条件查找所有符合的 cols[i].key=val 的列
                 */
                ,
            findCol: _findCol
                /**
                 * 根据条件查找所有符合的 data[i].field=val 的行
                 */
                ,
            findRow: _findRow
                /**
                 * 获取当前列表所有选中行索引
                 */
                ,
            getCheckedIdx: _getCheckedIdx
                /**
                 * 获取当前列表所有选中行
                 */
                ,
            getCheckedRows: function() {
                    var chks = _getCheckedIdx();
                    var rows = [];
                    for (var i = 0; i < chks.length; i++) {
                        rows.push(_data[chks[i]]);
                    }
                    return rows;
                }
                /**
                 * 返回当前显示的数据列表
                 * @returns {object}
                 */
                ,
            getData: function() {
                return $.extend([], _data);
            },
            getCurData: function() {
                    return $.extend([], _curData);
                }
                /**
                 * 改变指定行的选中状态
                 * @param row {object} 要选中的行对应的数据
                 * @param chk {bool} true 时改为选中，false 改为不选中
                 */
                ,
            checkRow: function(row, chk) {
                    if (chk === undefined) chk = true;
                    _checkRow(row, chk);
                }
                /**
                 * 重置当前显示的数据列表
                 * @param {object} data 新的列表数据
                 */
                ,
            setData: function(data) {
                    _drawFn(data);
                }
                /**
                 * 返回当前的分页信息
                 * @returns {object}
                 */
                ,
            getPage: function() {
                return _pageObj;
            },
            getPageObj: function() {
                    return _manuObj;
                }
                /**
                 * 扩展初始化时的配置，重新请求数据（分页），不重绘整个 Grid
                 * @param cusOpts {object=} 若不定义则直接以原始配置请求数据
                 *  - cusOpts.url {string=} 请求路径
                 *  - cusOpts.args {object=} 请求参数的键值对
                 *  - cusOpts.page {object=} 分页数据
                 *      cusOpts.page.percount {int} 默认每页数据条数
                 *      cusOpts.page.perList {Array} 分页数据列表
                 */
                ,
            resetData: function(cusOpts) {
                if (cusOpts) {
                    if (cusOpts.url) {
                        opts.url = cusOpts.url;
                        opts.data = undefined;
                    } else if (cusOpts.data) {
                        opts.data = cusOpts.data;
                        opts.url = undefined;
                    }
                    if (cusOpts.args) opts.args = $.extend(opts.args, cusOpts.args);
                    if (cusOpts.page == false) {
                        _page = false;
                    } else if (cusOpts.page) {
                        _page = $.extend(_page, cusOpts.page);
                    }
                }
                _bindData();
            },
            merge: _merge
                /**
                 * 销毁 grid
                 */
                ,
            destroy: _destroy
        };
        _destroy();
        _initTable();
        _bindData();
        return _returnObj;
    };
    /**
     * 将 .tab-box 元素初始化为 tab 容器
     * @param _opts {object=}
     *   - opts.tabs {Array}
     *       opts.tabs[i].val {string} tab 页标识
     *       opts.tabs[i].txt {string=} tab 页标题，默认与 val 一致
     *       opts.tabs[i].remove {bool=} 是否可关闭，默认为 false
     *       opts.tabs[i].width {string=} 头部宽度，默认 '120px'，scroll=false 且 tab 页显示超出范围，会引起此属性失效
     *       opts.tabs[i].cont {string=} 对应内容部分 DOM 字符串
     *       opts.tabs[i].url {string=} 对应内容部分 url
     *   - opts.headAlign {string=} 若设为 ‘right’ 则将 tab 头部居右显示，，此时 opts.scroll 失效，不可滚动
     *   - opts.context {bool=} 是否显示右键菜单，默认为 false
     *   - opts.scroll 是否支持头部超出滚动，默认为 false
     *   - opts.noAdjust 是否禁止监听容器尺寸变化以自动调整尺寸，默认为 false，容器尺寸不会变化时，可设为 true 以提高效率
     *   - opts.showAdd {bool=} 是否显示添加按钮，默认为 false
     *   - opts.addHandler() {function=} 添加按钮的事件
     *   - opts.onChange(val) {function=} 切换tab时触发事件，参数为要选中的 tab.val
     *   - opts.onRemove(val) {function=} 删除tab时触发事件，参数为要删除的 tab.val
     * @return {object|undefined} obj
     *   - obj.refreshTab() 刷新指定val的tab页，若是由cont设置的内容，则此方法无作用
     *   - obj.addTab(tab,noToggle)
     *       tab {object} tab 页对象，结构同 opts.head
     *       noToggle {bool=} 添加后是否禁止切换，默认为 false，即，添加即切换
     *   - obj.getTabs(key,value) 选中所有符合条件的 tab 列表，无条件则选择全部，未找到则返回 []
     *       key {string} tab 页对象中的键：val,txt,remove
     *       value {string=}
     *   - obj.removeTab(tab) 删除指定的 tab
     *   - obj.selectTab(tab) 切换到指定的 tab
     *   - obj.adjust() 手动计算绘制头部尺寸
     *   - obj.getContEl(tab) 获取内容部分的 jquery 元素对象
     */
    $.fn.initTabsBox = function(_opts) {
        var el = $(this);
        if (!el.hasClass('tab-box')) return;
        var CONF = {
            scrollCtrlW: 20 // 左右滚动按钮宽度各为 20
                ,
            addW: 30,
            liBefore: 0
        };
        var _returnObj;
        var contBoxEl = el.children('.tab-cont-box');
        var headBoxEl = el.children('.tab-head-box');
        var opts = $.extend({
            tabs: []
                //            ,headAlign:'right'
                ,
            context: false,
            scroll: false,
            noAdjust: false,
            showAdd: false
        }, _opts);
        var _tabs = [];
        var tabGuid = opts.noAdjust ? undefined : $.generateGuid('tab'); // 用于标识 window 的 resize 事件

        var _destroy = function() {
            if (headBoxEl.length) {
                _tabs.length = 0;
                tabGuid && $(window).off('resize.tab_' + tabGuid);
                headBoxEl.off('click.changeTab')
                    .off('click.addTab')
                    .off('click.scroll');
                headBoxEl.remove();
            }
        };
        var tabSizes = []; // 支持滚动的状态记录 tab 头部尺寸
        var tabTotalSize = 0;
        var ulWidth = 0; // ul 可显示的尺寸
        /**
         * 重新计算 tab 头部尺寸
         * @param index {int=} 要重计算的 tab 的索引，未指定则重计算全部 tab
         * @private
         */
        var _calulateSizes = function(index) {
            var lis = headBoxEl.find('.tab-head'),
                li, liBCR, item, curW;
            if (index == undefined) { // 重新计算全部
                tabSizes.length = 0;
                tabTotalSize = 0;
                var len = _tabs.length;
                for (index = 0; index < len; index++) {
                    item = _tabs[index];
                    li = lis.eq(index);
                    li.css('width', item['width'] || '');
                    liBCR = li[0].getBoundingClientRect();
                    curW = liBCR.right - liBCR.left;
                    tabSizes.push(curW);
                    tabTotalSize += curW;
                }
            } else {
                item = _tabs[index];
                li = lis.eq(index);
                li.css('width', item['width'] || '');
                liBCR = li[0].getBoundingClientRect();
                curW = tabSizes[index];
                if (curW != undefined) tabTotalSize -= curW;
                curW = liBCR.right - liBCR.left;
                tabTotalSize += curW;
                tabSizes[index] = curW;
            }
        };
        /**
         * 根据指定项或选中项滚动
         * @param index {int=} 要滚动到视图内的 tab 索引，未定义则为当前选中项索引
         * @private
         */
        var _scrollToSeL = function(index) {
            if (!headBoxEl.hasClass('tab-scroll')) return;
            var headUl = headBoxEl.find('>ul'),
                lis = headUl.children('.tab-head');
            var curLeft = 0,
                curRight = 0; // 选中项边界
            if (index == undefined) index = lis.index(lis.filter('.now'));
            for (var i = 0; i < tabSizes.length; i++) {
                if (i == index) { // 选中项
                    curRight = curLeft + tabSizes[i];
                    break;
                }
                curLeft += tabSizes[i];
            }
            if (headUl.is(':animated')) headUl.stop(true);
            if (curRight == 0) {
                //                headUl.css({'left':CONF.scrollCtrlW+'px'});
                headUl.animate({ 'left': CONF.scrollCtrlW + 'px' });
            } else {
                var hideL = CONF.scrollCtrlW - headUl.position().left; // 左侧已被隐藏的部分的尺寸
                if (hideL > curLeft) {
                    //                    headUl.css({'left':-curLeft+CONF.scrollCtrlW+'px'});
                    headUl.animate({ 'left': -curLeft + CONF.scrollCtrlW + 'px' });
                } else if (ulWidth + hideL - CONF.scrollCtrlW < curRight) {
                    //                    headUl.css({'left':ulWidth-curRight-CONF.scrollCtrlW+'px'});
                    headUl.animate({ 'left': ulWidth - curRight - CONF.scrollCtrlW + 'px' });
                }
            }
        };
        /**
         * 滚动头部
         * @param toNext {bool=} 向后滚动
         * @private
         */
        var _scrollHead = function(toNext) {
            if (!headBoxEl.hasClass('tab-scroll')) return;
            var headUl = headBoxEl.find('>ul');
            var hideL = CONF.scrollCtrlW - headUl.position().left // 左侧已被隐藏的部分的尺寸
                ,
                hideR = hideL + ulWidth - CONF.scrollCtrlW; // 右侧被隐藏部分前的尺寸
            var curW = 0,
                i, index;
            if (toNext) { // 向后
                for (i = 0; i < tabSizes.length; i++) {
                    curW += tabSizes[i];
                    if (curW > hideR) {
                        index = i;
                        break;
                    }
                }
            } else { // 向前
                for (i = 0; i < tabSizes.length; i++) {
                    curW += tabSizes[i];
                    if (curW >= hideL) {
                        index = i;
                        break;
                    }
                }
            }
            if (index != undefined) _scrollToSeL(index);
        };
        var _adjust = function() {
            var headUl = headBoxEl.find('>ul');
            _calulateSizes(); // 复原尺寸
            // 计算 ul 尺寸
            var headBCR = headBoxEl.eq(0)[0].getBoundingClientRect();
            ulWidth = headBCR.right - headBCR.left;
            if (opts.showAdd) { // 显示添加
                ulWidth -= CONF.addW;
            }
            if (tabTotalSize != 0 && ulWidth != 0 && tabTotalSize > ulWidth) { // 超出
                if (opts.scroll) {
                    headBoxEl.addClass('tab-scroll');
                    headUl.css('width', tabTotalSize + 'px');
                    var left = headUl.position().left;
                    if (left > CONF.scrollCtrlW) { // 左侧有留白
                        headUl.css({ 'left': CONF.scrollCtrlW + 'px' });
                    } else if (tabTotalSize + left < ulWidth - CONF.scrollCtrlW) { // 右侧有留白
                        headUl.css({ 'left': ulWidth - tabTotalSize - CONF.scrollCtrlW + 'px' });
                    }
                } else {
                    tabSizes.length && headUl.children('.tab-head').css('width', 100 / tabSizes.length + '%');
                }
            } else {
                if (opts.scroll) {
                    if (headUl.is(':animated')) headUl.stop(true);
                    headUl.css('width', '');
                    headBoxEl.removeClass('tab-scroll');
                    headUl.css('left', 0);
                }
            }
        };
        /**
         * 添加 tab 页
         * @param tab {object} tab 页对象，结构同 opts.tabs[i]
         * @param noToggle {bool=} 添加后是否不立即切换，默认为 false，即，添加即切换
         * @private
         */
        var _addTab = function(tab, noToggle) {
            if (!headBoxEl || !tab) return;
            var val = tab.val;
            var sameTab = _getTab('val', val);
            if (sameTab) {
                _selectTab(sameTab); // 选中已有项
            } else {
                !tab.txt && (tab.txt = tab.val);
                var txt = tab.txt,
                    remove = tab.remove || false;
                var cssStr = '';
                if (remove) {
                    cssStr += 'padding-right:20px;';
                }
                if (tab.width) cssStr += 'width:' + tab.width + ';';
                var li = $('<li title="' + txt + '" class="tab-head" data-val="' + val + '" style="' + cssStr + '">' +
                    txt +
                    (remove ? '<span class="fa fa-remove"></span>' : '') +
                    '</li>');
                if (opts.headAlign == 'right') {
                    headBoxEl.children('ul').prepend(li);
                } else {
                    headBoxEl.children('ul').append(li);
                }
                /* 内容部分 */
                var contStr = tab.url ?
                    '<iframe width="100%" height="100%" data-name="' + tab.val + '" frameborder="0" scrolling="0" src="' + tab.url + '"></iframe>' :
                    tab.cont;
                var contEl = contBoxEl.find('>.tab-cont[data-val="' + tab.val + '"]');
                if (contStr) {
                    if (contEl.length) {
                        contEl.html(contStr);
                    } else {
                        contBoxEl.append('<div class="tab-cont" data-val="' + val + '">' + contStr + '</div>');
                    }
                }
                _tabs.push(tab);
                _calulateSizes(_tabs.length - 1);
                _adjust();
                !noToggle && headBoxEl.find('>ul>li.tab-head[data-val="' + val + '"]').click();
            }
        };
        var _getTabs = function(key, value) {
            var tabs = [],
                i, tab;
            if (key) {
                for (i = 0; i < _tabs.length; i++) {
                    tab = _tabs[i];
                    if (tab[key] == value) {
                        tabs.push(tab);
                    }
                }
            } else {
                $.extend(tabs, _tabs);
            }
            return tabs;
        };
        var _getTab = function(key, value) {
            var i, tab;
            if (key) {
                for (i = 0; i < _tabs.length; i++) {
                    tab = _tabs[i];
                    if (tab[key] == value) {
                        return tab;
                    }
                }
            }
        };
        var _refreshTab = function(val) {
            var contFrame = contBoxEl.find('>.tab-cont[data-val="' + val + '"]>iframe');
            if (contFrame.length) contFrame[0].contentWindow.location.reload();
        };
        var _selectTab = function(tab, val) {
            if (typeof tab == 'string' && val != undefined) { // 根据键值查找 tab
                tab = _getTab(tab, val);
                if (!tab) return;
            }
            if (!tab) return;
            var headEl = headBoxEl.find('>ul>li.tab-head[data-val="' + tab.val + '"]');
            if (!headEl.hasClass('now')) { // tab 未选中
                headBoxEl.find('>ul>li.tab-head.now').removeClass('now');
                contBoxEl.find('>.tab-cont.now').removeClass('now');
                headEl.addClass('now');
                contBoxEl.find('>.tab-cont[data-val="' + tab.val + '"]').addClass('now');
                opts.onChange && opts.onChange(tab.val);
            }
            _scrollToSeL();
        };
        /**
         * 删除指定的 tab
         * @param tab {object|string}
         * @param val {string=}
         * @private
         */
        var _removeTab = function(tab, val) {
            if (typeof tab == 'string' && val != undefined) { // 根据键值查找 tab
                tab = _getTab(tab, val);
                if (!tab) return;
            }
            var headEl = headBoxEl.find('>ul>li.tab-head[data-val="' + tab.val + '"]');
            if (headEl.hasClass('now') && _tabs.length > 1) { // 当前项为选中项，且还有其他标签页
                var i = _tabs.indexOf(tab);
                if (i != _tabs.length - 1) { // 不是最后一项，选中后一项
                    _selectTab(_tabs[i + 1]);
                } else {
                    _selectTab(_tabs[i - 1]);
                }
            }
            var index = _tabs.indexOf(tab);
            _tabs.splice(index, 1); // 移除
            tabSizes.splice(index, 1); // 移除尺寸记录
            headEl.remove(); // 移除标题
            contBoxEl.find('>.tab-cont[data-val="' + tab.val + '"]').remove();
            opts.onRemove && opts.onRemove(tab.val);
            _adjust();
        };
        /**
         * 删除全部 tab
         * @private
         */
        var _removeAll = function() {
            for (var i = _tabs.length - 1; i >= 0; i--) {
                _removeTab(_tabs[i]);
            }
        };
        var contextVal;
        var _initContext = function() {
            var contEl = $('<div class="context"><ul>' +
                '<li data-val="closeThis"><span class="context-item">关闭当前页</span></li>' +
                '<li data-val="closeElse"><span class="context-item">关闭其他</span></li>' +
                '<li data-val="closeAll"><span class="context-item">关闭所有</span></li>' +
                '<li data-val="refresh"><span class="context-item">刷新</span></li>' +
                '</ul></div>');
            // 右键菜单
            contEl.on('click', 'li', function() {
                var type = $(this).attr('data-val');
                var tab, i, removeTabs = [];
                if (type == 'closeThis') {
                    removeTabs.push(_getTab('val', contextVal));
                } else if (type == 'closeElse') {
                    for (i = 0; i < _tabs.length; i++) {
                        tab = _tabs[i];
                        if (tab.val != contextVal && tab.remove) { // 不是当前项，且允许关闭
                            removeTabs.push(tab);
                        }
                    }
                } else if (type == 'closeAll') {
                    for (i = 0; i < _tabs.length; i++) {
                        tab = _tabs[i];
                        if (tab.remove) { // 允许关闭的项
                            removeTabs.push(tab);
                        }
                    }
                } else if (type == 'refresh') {
                    _refreshTab(contextVal);
                }
                for (i = 0; i < removeTabs.length; i++) {
                    _removeTab(removeTabs[i]);
                }
                contextMenu.close();
            });
            var contextMenu = headBoxEl.dropdown({
                cont: contEl,
                context: true,
                beforeShow: function(e) {
                    var headLi = $(e.target).closest('li');
                    contEl.find('li').css('display', '');
                    if (headLi.length && headBoxEl.find(headLi).length > 0) {
                        contextVal = headLi.attr('data-val');
                        if (!_getTab('val', contextVal).remove) { // 禁止关闭的tab页
                            contEl.find('li[data-val="closeThis"]').css('display', 'none');
                        }
                    } else { // 不在tab页上，只显示关闭全部
                        contextVal = undefined;
                        contEl.find('li:not([data-val="closeAll"])').css('display', 'none');
                    }
                }
            });
        };
        var _init = function() {
            if (!headBoxEl.length) {
                headBoxEl = $('<div class="tab-head-box"><ul></ul>' +
                    (opts.scroll ? '<div class="tab-prev"></div><div class="tab-next"></div>' : '') +
                    '</div>');
            }
            if (!contBoxEl.length) {
                contBoxEl = $('<div class="tab-cont-box"></div>');
            }
            headBoxEl
                .on('click.changeTab', '>ul>li.tab-head', function() {
                    var head = $(this);
                    var val = head.attr('data-val');
                    _selectTab('val', val);
                })
                .on('click.removeTab', '>ul>li.tab-head>.fa-remove', function(e) {
                    var tab = _getTab('val', $(this).parent().attr('data-val'));
                    _removeTab(tab);
                    e.stopPropagation();
                });
            if (opts.context) { // 显示右键菜单
                _initContext();
            }
            tabGuid && $(window).on('resize.tab_' + tabGuid, _adjust); // 监听窗口 resize 事件
            el.prepend(headBoxEl); // 添加 head-box
            el.append(contBoxEl); // 添加 cont-box
            // 居右显示
            if (opts.headAlign == 'right') {
                opts.scroll = false; // TODO 居右时暂不支持滚动
                headBoxEl.children('ul').addClass('tab-heads-r');
            }
            /* 根据 opts.tabs，添加 tab 页 */
            for (var i = 0; i < opts.tabs.length; i++) {
                _addTab(opts.tabs[i], true);
            }
            // 显示添加
            if (opts.showAdd) {
                headBoxEl.addClass('tab-withAdd');
                headBoxEl.append('<div class="tab-add" title="新增"><span class="fa fa-plus-circle"></span></div>');
                opts.addHandler && headBoxEl.on('click.addTab', '>.tab-add', function() {
                    opts.addHandler();
                })
            }
            if (opts.scroll) {
                headBoxEl.on('click.scroll', '.tab-prev,.tab-next', function() {
                    _scrollHead($(this).hasClass('tab-next'));
                });
            }
            headBoxEl.find('li.tab-head').eq(0).click(); // 默认选中第一项
        };
        _returnObj = {
            refreshTab: _refreshTab,
            addTab: _addTab,
            getTabs: _getTabs,
            getTab: _getTab,
            removeTab: _removeTab,
            removeAll: _removeAll,
            selectTab: _selectTab,
            adjust: _adjust,
            getSelect: function() {
                return _getTab('val', headBoxEl.find('>ul>li.now').attr('data-val'));
            },
            getContEl: function(tab) {
                return contBoxEl.find('>.tab-cont[data-val="' + tab.val + '"]');
            }
        };
        _destroy();
        _init();
        return _returnObj;
    };

    /**
     * 将 .tab-box 元素初始化为 tab 容器
     * @param _opts {object=}
     *   - opts.tabs {Array}
     *       opts.tabs[i].val {string} tab 页标识
     *       opts.tabs[i].txt {string=} tab 页标题，默认与 val 一致
     *       opts.tabs[i].remove {bool=} 是否可关闭，默认为 false
     *       opts.tabs[i].width {string=} 头部宽度，默认 '120px'，scroll=false 且 tab 页显示超出范围，会引起此属性失效
     *       opts.tabs[i].cont {string=} 对应内容部分 DOM 字符串
     *       opts.tabs[i].url {string=} 对应内容部分 url
     *   - opts.headAlign {string=} 若设为 ‘right’ 则将 tab 头部居右显示
     *   - opts.scroll 是否支持头部超出滚动，默认为 true
     *   - opts.noAdjust 是否禁止监听容器尺寸变化以自动调整尺寸，默认为 false，容器尺寸不会变化时，可设为 true 以提高效率
     *   - opts.showAdd {bool=} 是否显示添加按钮，默认为 false
     *   - opts.addHandler() {function=} 添加按钮的事件
     *   - opts.onChange(val) {function=} 切换tab时触发事件，参数为要选中的 tab.val
     *   - opts.onRemove(val) {function=} 删除tab时触发事件，参数为要删除的 tab.val
     * @return {object|undefined} obj
     *   - obj.addTab(tab,noToggle)
     *     tab {object} tab 页对象，结构同 opts.head
     *     noToggle {bool=} 添加后是否禁止切换，默认为 false，即，添加即切换
     *   - obj.getTabs(key,value) 选中所有符合条件的 tab 列表，无条件则选择全部，未找到则返回 []
     *     key {string} tab 页对象中的键：val,txt,remove
     *     value {string=}
     *   - obj.removeTab(tab) 删除指定的 tab
     *   - obj.selectTab(tab) 切换到指定的 tab
     *   - obj.adjust() 手动计算绘制头部尺寸
     *   - obj.getContEl(tab) 获取内容部分的 jquery 元素对象
     */
    $.fn.initScrollTabBox = function(_opts) {
        var el = $(this);
        return el.initTabsBox($.extend({
            scroll: true,
            context: true
        }, _opts));
    };

    $.fn.initTabBox = function(_opts) {
        var el = $(this);
        if (!el.hasClass('tab-box')) return;
        var _returnObj;
        var opts = {};
        if (_opts.head) {
            opts.tabs = _opts.head;
            delete _opts.head;
        }
        $.extend(opts, _opts);
        _returnObj = el.initTabsBox(opts);
        var _addTab = _returnObj.addTab;
        _returnObj.addTab = function(tab, cont, noToggle) {
            if (cont) tab.cont = cont;
            _addTab(tab, noToggle);
        };
        return _returnObj;
    };

    /**
     * 弹出位置计算
     * @param elBCR {object} 参照元素的 BCR
     * @param targetElWidth {int} 弹出项的宽
     * @param targetElHeight {int} 弹出项的高
     * @param viewW {int} 视图范围的宽
     * @param viewH {int} 视图范围的高
     * @param positionStr {string} 定位方向: 'p-p'，可能的值：top,left,right,bottom,center。
     * @param adjust {bool=} 是否允许调整弹出方向
     * @param appendToEl {object=} 以参照元素计算定位，未定义则以窗口为参照(.overlay)
     */
    $.adaptElement = function(elBCR, viewW, viewH, targetElWidth, targetElHeight, positionStr, adjust, appendToEl) {
        var elTop = elBCR.top,
            elLeft = elBCR.left,
            elBot = elBCR.bottom,
            elRight = elBCR.right;
        var positionStrParts = typeof positionStr == 'string' ? positionStr.split('-') : [];
        var pos0 = positionStrParts[0] || 'bottom',
            pos1 = positionStrParts[1] || 'left';
        var cssObj = {};
        if (adjust) { // 允许调整方向
            /**
             * 返回是否需要反向
             * @param nowS - 当前空间尺寸
             * @param otherS - 备选空间尺寸
             * @param targetS - 需要的空间尺寸
             */
            var shouldChange = function(nowS, otherS, targetS) {
                var nowLess = nowS < targetS,
                    targetLess = otherS < targetS;
                return nowLess && (!targetLess || targetLess && otherS > nowS); //当前空间不足时，反向空间足够，或反向虽然不够，但比当前大，返回 true，即需要反向
            };
            // 确定 pos0，若当前空间不足且备选空间足够，或都不足但备选空间较大，则反向
            switch (pos0) {
                case 'left':
                    shouldChange(elLeft, viewW - elRight, targetElWidth) && (pos0 = 'right');
                    break;
                case 'right':
                    shouldChange(viewW - elRight, elLeft, targetElWidth) && (pos0 = 'left');
                    break;
                case 'top':
                    shouldChange(elTop, viewH - elBot, targetElHeight) && (pos0 = 'bottom');
                    break;
                default:
                    pos0 = 'bottom';
                    shouldChange(viewH - elBot, elTop, targetElHeight) && (pos0 = 'top');
            }
            // 确定 pos1
            switch (pos1) {
                case 'center':
                    break;
                case 'top':
                    shouldChange(viewH - elTop, elBot, targetElHeight) && (pos1 = 'bottom');
                    break;
                case 'bottom':
                    shouldChange(elBot, viewH - elTop, targetElHeight) && (pos1 = 'top');
                    break;
                case 'right':
                    shouldChange(elRight, viewW - elLeft, targetElWidth) && (pos1 = 'left');
                    break;
                default:
                    pos1 = 'left';
                    shouldChange(viewW - elLeft, elRight, targetElWidth) && (pos1 = 'right');
            }
        }
        if (appendToEl) {
            // 一级位置已确定，通过返回方向由 class 名控制，不需计算
            // 二级方向位置确定，单向空间不足时，向右/下贴边
            switch (pos1) {
                case 'center':
                    if (['left', 'right'].indexOf(pos0) >= 0) {
                        cssObj.top = Math.floor((elBot - elTop - targetElHeight) / 2) + 'px';
                    } else {
                        cssObj.left = Math.floor((elRight - elLeft - targetElWidth) / 2) + 'px';
                    }
                    break;
                case 'top':
                    if (adjust != false && viewH - elTop < targetElHeight)
                        cssObj.top = viewH - elTop - targetElHeight + 'px';
                    break;
                case 'bottom':
                    if (adjust != false && elBot < targetElHeight)
                        cssObj.bottom = elBot - viewH + 'px';
                    break;
                case 'right':
                    if (adjust != false && elRight < targetElWidth)
                        cssObj.right = elRight - viewW + 'px';
                    break;
                default:
                    pos1 = 'left';
                    if (adjust != false && viewW - elLeft < targetElWidth)
                        cssObj.left = viewW - elLeft - targetElWidth + 'px';
            }
        } else {
            // 根据参照元素的文档位置，计算弹出项的文档位置
            switch (pos0) {
                case 'left':
                    cssObj.left = elLeft - targetElWidth + 'px';
                    break;
                case 'right':
                    cssObj.left = elRight + 'px';
                    break;
                case 'top':
                    cssObj.top = elTop - targetElHeight + 'px';
                    break;
                default:
                    pos0 = 'bottom';
                    cssObj.top = elBot + 'px';
            }
            // 二级方向位置确定，单向空间不足时，向右/下贴边
            switch (pos1) {
                case 'center':
                    if (['left', 'right'].indexOf(pos0) >= 0) {
                        cssObj.top = elTop + Math.floor((elBot - elTop - targetElHeight) / 2) + 'px';
                    } else {
                        cssObj.left = elLeft + Math.floor((elRight - elLeft - targetElWidth) / 2) + 'px';
                    }
                    break;
                case 'top':
                    if (adjust && viewH - elTop < targetElHeight)
                        cssObj.top = viewH - targetElHeight + 'px'; // 贴边
                    else
                        cssObj.top = elTop + 'px';
                    break;
                case 'bottom':
                    if (adjust && elBot < targetElHeight)
                        cssObj.top = viewH - targetElHeight + 'px'; // 贴边
                    else
                        cssObj.top = elBot - targetElHeight + 'px';
                    break;
                case 'right':
                    if (adjust && elRight < targetElWidth)
                        cssObj.left = elLeft - elLeft + viewW - targetElWidth + 'px';
                    else
                        cssObj.left = elRight - targetElWidth + 'px';
                    break;
                default:
                    pos1 = 'left';
                    if (adjust && viewW - elLeft < targetElWidth)
                        cssObj.left = elLeft - elLeft + viewW - targetElWidth + 'px';
                    else
                        cssObj.left = elLeft + 'px';
            }
        }
        return [{
            'top': cssObj.top ? cssObj.top : '',
            'bottom': cssObj.bottom ? cssObj.bottom : '',
            'left': cssObj.left ? cssObj.left : '',
            'right': cssObj.right ? cssObj.right : ''
        }, pos0 + '-' + pos1];
    };

    /**
     * 显示下拉弹出层
     * @param _opts {object}
     *   - opts.cont {object} 弹出层的 dom 字符串或 jquery 对象
     *   - opts.pos {string=} 优先选择的弹出方向，默认为 'bottom-left'（贴下边和左边）
     *   - opts.adjust {bool=} 是否允许弹出方向自适应，默认为 true
     *   - opts.noDestroy {bool=} 关闭时是否仅隐藏，默认为 true，即关闭时不销毁弹窗
     *   - opts.show {bool=} 初始化时是否直接打开，默认为 true
     *   - opts.modal {bool=} 是否为模态遮罩层，默认为 true
     *   - opts.context {bool=} 是否为右键触发弹出，默认为 false。当设置为 true 时，右键点击时显示
     *   - opts.beforeClose {function()=} 关闭下拉框前的回调函数
     *   - opts.beforeShow {function()=} 显示下拉框前的回调函数，右键菜单显示时，传入参数 event
     * @returns {object|undefined} obj
     *   - obj.show() {function} 显示弹出框
     *   - obj.close() {function} 关闭弹出层
     *   - obj.isShown() {function} 是否已经打开
     */
    $.fn.dropdown = function(_opts) {
        var el = $(this) // 弹出参照元素
            ,
            overlayEl // 弹出遮罩层
            , dropdownEl; // 弹出内容主体
        var opts = $.extend({
            cont: '',
            pos: 'bottom-left',
            adjust: true,
            noDestroy: true,
            show: true,
            modal: true,
            context: false
        }, _opts);
        if (opts.context) { // 右键弹出
            opts.show = false;
            opts.adjust = true;
            opts.modal = true;
            opts.pos = 'bottom-left';
        }
        var _returnObj = {};
        var _doc = $(document);
        var dpGuid = $.generateGuid('dp');
        var bScrolling = false, // 标记是否已经在滚动（为避免mousewheel及onscroll事件重复触发）
            oElBCR; // 记录触发滚动前参照元素原始位置，若滚动引起位置变化将关闭弹出层
        var fOnDocWheel = function(e) {
            bScrolling = true;
            var oNewElBCR = el[0].getBoundingClientRect();
            if (oNewElBCR.left != oElBCR.left || oNewElBCR.top != oElBCR.top) { // 参照元素位置发生了变化
                oElBCR = oNewElBCR;
                _close();
            }
        };
        var _addScrollListener = function() {
            bScrolling = false;
            oElBCR = el[0].getBoundingClientRect(); // 记录参照元素的初始位置
            _doc.on('scroll.dp' + dpGuid, function(e) { // 支持鼠标拖拽滚动条触发回调
                var oNewElBCR;
                if (bScrolling) {
                    bScrolling = false;
                } else {
                    oNewElBCR = el[0].getBoundingClientRect();
                    if (oNewElBCR.left != oElBCR.left || oNewElBCR.top != oElBCR.top) { // 参照元素位置发生了变化
                        oElBCR = oNewElBCR;
                        _close();
                    }
                }
            });
            if (navigator.userAgent.indexOf("Firefox") > 0) { // 火狐浏览器
                _doc[0].addEventListener('DOMMouseScroll', fOnDocWheel, false);
            } else { // 其他浏览器
                _doc.on('mousewheel.dp' + dpGuid, fOnDocWheel);
            }
            // 点击关闭弹出层
            _doc.on('click.dpout' + dpGuid, function(e) {
                var tarEl = $(e.target);
                if (e.type == 'click') { // 点击在其他元素上
                    if (tarEl.closest(el).length == 0 && tarEl.closest('.overlay').length == 0) {
                        _close();
                    }
                }
            });
        };
        var _removeScrollListener = function() {
            oElBCR = undefined;
            if (navigator.userAgent.indexOf("Firefox") > 0) { // 火狐浏览器
                _doc[0].removeEventListener('DOMMouseScroll', fOnDocWheel);
            } else { // 其他浏览器
                _doc.off('mousewheel.dp' + dpGuid);
            }
            _doc.off('click.dpout' + dpGuid)
                .off('scroll.dp' + dpGuid);
        };
        var _close = function() {
            if (!overlayEl) return;
            opts.beforeClose && opts.beforeClose();
            overlayEl.css('visibility', 'hidden');
            dropdownEl.css('visibility', 'hidden');
            if (!opts.noDestroy) {
                _destroy();
            }
            _removeScrollListener();
        };
        var _destroy = function() {
            if (!overlayEl) return;
            overlayEl.remove();
            overlayEl.off('click.dropdown');
            $(window).off('resize.dp' + dpGuid);
            _removeScrollListener();
        };
        var _show = function(e) {
            if (!overlayEl || _isShown()) return;
            var elBCR, cssObj,
                winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            opts.beforeShow && opts.beforeShow(e);
            overlayEl.css('visibility', 'hidden');
            if (!opts.context) {
                dropdownEl.css('minWidth', el.outerWidth() + 'px'); // 先设置最小宽度，避免尺寸变化导致计算误差
            }
            if (e == undefined) {
                elBCR = el[0].getBoundingClientRect();
            } else {
                elBCR = { left: e.clientX, right: e.clientX, top: e.clientY, bottom: e.clientY };
            }
            cssObj = $.adaptElement(elBCR,
                winW - SCROLLSIZE, winH - SCROLLSIZE, // 考虑页面可能出现滚动条，以可视区域大小为参照
                dropdownEl.outerWidth(), dropdownEl.outerHeight(),
                opts.pos, opts.adjust)[0];
            cssObj['visibility'] = '';
            dropdownEl.css(cssObj);
            overlayEl.css('visibility', '');
            _addScrollListener();
        };
        var _init = function() {
            overlayEl = $('<div class="overlay' + (opts.modal ? ' overlay-modal' : '') + '" style="visibility:hidden;"></div>'); // 是否是模态弹出层
            dropdownEl = $('<div class="dropdown-box" style="visibility:hidden;"></div>'); // 调节位置后显示
            dropdownEl.append(opts.cont);
            overlayEl.append(dropdownEl);
            if (opts.context) { // 右键菜单
                el.on('contextmenu', function(e) {
                    e.preventDefault(); // 禁用浏览器右键菜单
                    _show(e);
                });
            }
            opts.modal && overlayEl.on('click.dropdown', function(e) { // 模态弹出层点击遮罩层关闭
                if ($(e.target).parent('body').length > 0) {
                    _close();
                }
            });
            $(window).on('resize.dp' + dpGuid, _close); // 窗体发生 resize 时关闭弹出层
            if (!overlayEl.parent('body').length) $('body').append(overlayEl);
            opts.show != false && _show();
        };
        var _isShown = function() {
            return dropdownEl.css('visibility') != 'hidden';
        };
        _returnObj.show = _show;
        _returnObj.close = _close;
        _returnObj.destroy = _destroy;
        _returnObj.isShown = _isShown;
        _destroy();
        _init();
        return _returnObj;
    };
    /**
     * 根据源对象深度拷贝数据，并删除 __ 开头的组件属性
     * @param src 拷贝参照的对象
     * @returns {*}
     */
    $.pureClone = function(src) {
        // 基本类型及 function
        if (typeof src !== 'object' || src === null) return src;
        var dst = Object.prototype.toString.call(src) === '[object Array]' ? [] : {}; //判断参数的类型,定义要拷贝的对象的数据类型
        for (var i in src) {
            if (src.hasOwnProperty(i) && !/^__/.test(i)) {
                dst[i] = typeof src[i] === 'object' && src ? $.pureClone(src[i]) : src[i];
            }
        }
        return dst;
    };
    $.generateGuid = function(key) {
        //return key + (new Date()).getTime();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return key + guid;
    };
    /**
     * 初始化 numbox
     * @param option
     *   - option.maxVal {int} 控件支持的最大值 TODO 小数的支持
     *   - option.minVal {int} 控件支持的最小值 TODO 小数的支持
     *   - option.name {string} 控件中文本框的 name 值
     *   - option.value {int} 初始化时的值
     *   - option.enable {int} 初始化时是否启用，默认为 true
     *   - option.onChange {function(val)} 值变化时的回调方法
     * @return {object} returnObj
     *   - obj.setVal(val) 为文本框赋值（val {int}）
     *   - obj.setEnable(enable) 禁用/启用（enable {bool}）
     */
    $.fn.initSelNum = function(option) {
        var $this = this;
        var settings = {
            maxVal: 0 //最大值
                ,
            minVal: 0 //最小值
                ,
            name: '' //其中文本框对应的 name
                ,
            enable: true
                //                ,value //初始化时的值，默认为最小值
                //                ,step:1 //TODO 每次上下增减的数值
        };
        option = $.extend(settings, option || {});
        var iCurVal; //保存当前值
        var returnObj = {};
        returnObj.setVal = _setVal;
        returnObj.getVal = _getVal;
        returnObj.setEnable = _setEnable;

        // 初始化方法
        function _init() {
            $this.addClass('txt numbox');
            var str = '<input type="text" class="iptVal"' + (option.name ? ' name="' + option.name + '"' : '') + '/>' +
                '<div class="arrowWrap"><span class="arrowUp"></span><span class="arrowDown"></span></div>';
            $this.append(str);
            $this.find('.arrowUp,.arrowDown').on('click', clickFn);
            $this.find('.iptVal').on({
                keydown: keydownFn,
                change: changeFn
            });
            _setVal(option.value); // 赋初始值
            _setEnable(option.enable);
        }

        function _setEnable(enable) {
            option.enable = enable;
            if (enable) { // 启用
                $this.removeClass('disabled');
            } else {
                $this.addClass('disabled');
            }
        }

        function _getVal() {
            return iCurVal;
        }
        // 为文本框赋值（先判断值是否合法）
        function _setVal(val) {
            if (isNaN(val) || val < option.minVal) {
                val = option.minVal;
            } else if (val > option.maxVal) {
                val = option.maxVal;
            }
            if (val != parseInt($this.find('.iptVal').val())) {
                $this.find('.iptVal').val(val);
            }
            if (val != iCurVal) { // 值发生变化
                iCurVal = val;
                option.onChange && option.onChange(parseInt(iCurVal));
            }
        }
        //上下箭头点击函数
        function clickFn(event) {
            if (!option.enable) return;
            _setVal($(this).hasClass('arrowUp') ? iCurVal + 1 : iCurVal - 1);
        }
        // 键盘抬起事件 - 将当前文本框内容值更新到组件
        function changeFn(event) {
            if (!option.enable) return;
            _setVal(parseInt($this.find('.iptVal').val()));
        }
        //键盘按下事件
        function keydownFn(event) {
            if (!option.enable) return;
            var code = event.which;
            if (code == 38) { // 加1
                _setVal(iCurVal + 1);
            } else if (code == 40) { // 减1
                _setVal(iCurVal - 1);
            } else if (!(code >= 96 && code <= 105 ||
                    code >= 48 && code <= 57 ||
                    code == 37 || code == 39 // 左右键
                    ||
                    code == 8 // 退格
                    /* ||code == 110 ||  code == 190小数点*/
                )) { // TODO 小数点、负数
                return false;
            }
            // 数字按键引起的数据变化在 keyup 中执行
        }
        /* 初始化开始 */
        _init();
        return returnObj;
    };

    /**
     * 初始化下拉复选框（禁止输入），调用此方法的文本框不需定义 name，即使定义也不可与 opts.name 相同
     * @param _opts
     *   - opts.name {string} 必须，下拉框中复选/单选元素的 name 属性值，初始化完成后，会在 el 后生成 <input type="hidden" name="name" />，以便表单取值
     *   - opts.data {Array} 必须，选项数据源
     *   - opts.txtField {string=} data 中每个数据显示的字段名称，默认为 'name'
     *   - opts.valField {string=} data 中每个数据值的字段名称，默认为 'val'
     *   - opts.filter {object} 过滤功能配置，仅当定义了 filterEl 时生效
     *       opts.filter.fields {string|Array} 参与过滤的列的属性名，对应 cols[i].field
     *       opts.filter.pySupport {bool} 是否支持拼音首字过滤，开启过滤时，默认为 true
     *   - opts.height {int=} 默认最大高度为 120，单位：px
     *   - opts.mulChk {bool=} 是否为复选，默认为 true
     *   - opts.selParams {Array=} 默认选中项条件 [key,value]，其中 value 支持 Array
     *   - opts.callback {function(selData)=} 值改变时的回调方法
     *       selData 单选时为选中项的数据对象，无选中则为 undefined；多选时为选中对象数组，无选中则为 []
     * @returns {object} obj
     *   - obj.setData(data,selParams) 重置数据源及默认选中项
     *   - obj.getSelect() 获取选中项，返回值：selData 单选时为选中项的数据对象，无选中则为 undefined；多选时为选中对象数组，无选中则为 []
     *   - obj.check(key,val,check) 改变符合条件的数据源的选中状态，并更新到 dom 和 selIdx
     *       key {string=} 键
     *       val {string|Array|undefined=} 值
     *       check {bool=} 选中 true / 取消选中 false，默认为 true
     */
    $.fn.initDropSel = function(_opts) {
        var CONF = { emptyH: 32 }; // 没有选项时的高度
        var el = $(this); // 触发下拉的元素
        var opts = $.extend({
            height: 150 // 默认高度为 150px
                ,
            mulChk: true // 默认为复选
                //            ,name:'' // 必须，下拉框中复选/单选元素的 name 属性值，初始化完成后，会在 el 后生成 <input type="hidden" name="name" />，以便表单取值
                ,
            data: [] // 数据源
                ,
            txtField: 'name' // data 中每个数据显示的字段名称
                ,
            valField: 'val' // data 中每个数据值的字段名称
                //        ,selParams: [key,value] // 第一次弹出的选中项条件[key,value]，value 支持数组
                //        ,callback: function(selData) // 确定按钮的回调，单选时为选中项的数据对象，无选中则为 undefined；多选时为选中对象数组，无选中则为 []
        }, _opts);
        var guid = $.generateGuid('dropSel');
        !opts.name && (opts.name = guid);
        var hideEl; // 隐藏元素，用于表单取值
        var _data = opts.data,
            returnObj = {}; // 返回对象
        var dpObj // dropdown 返回接口
            , _filterObj // 过滤组件返回接口对象
            , dpEl // 下拉弹出层 jquery 对象
            , selIdx = []; // 选中的项的索引
        // 根据 dom 选中状态获取选中项
        var _refreshSelIdx = function() {
            selIdx.length = 0;
            var chkEls = dpEl.find('[name="' + opts.name + '"]:checked');
            var txtField = opts.txtField,
                valField = opts.valField;
            var txtArr = [],
                valArr = [],
                dataArr = []; // 选中项文本，值，数据
            var len = opts.mulChk ? chkEls.length : Math.min(chkEls.length, 1);
            for (var i = 0, dataI; i < len; i++) {
                dataI = parseInt(chkEls.eq(i).val());
                selIdx.push(dataI);
                txtArr.push(_data[dataI][txtField]);
                valArr.push(_data[dataI][valField]);
                dataArr.push(_data[dataI]);
            }
            el.val(txtArr.join(';'));
            el.attr('title', txtArr.join(';'));
            hideEl.val(valArr.join(';'));
            opts.callback && opts.callback(opts.mulChk ? dataArr : dataArr[0]); // 修改选中项时的回调
        };
        var _getSelect = function() {
            var selData = [];
            for (var i = 0; i < selIdx.length; i++) {
                selData.push(_data[selIdx[i]]);
            }
            return opts.mulChk ? selData : selData[0];
        };
        // 根据 selIdx 选中 dom
        var _checkDom = function() {
            var chkEls = dpEl.find('[name="' + opts.name + '"]');
            chkEls.prop('checked', false);
            for (var i = 0, dataI; i < selIdx.length; i++) {
                dataI = selIdx[i];
                chkEls.filter('[value="' + dataI + '"]').prop('checked', true);
            }
        };
        /**
         * 改变符合条件的数据源的选中状态，并更新到 dom 和 selIdx
         * @param key {string=} 键
         * @param val {string|Array|undefined=} 值
         * @param check {bool=} 选中 true / 取消选中 false，默认为 true
         * @private
         */
        var _check = function(key, val, check) {
            var chkEls = dpEl.find('[name="' + opts.name + '"]');
            if (check == undefined) check = true;
            var valIsArr = (Object.prototype.toString.call(val) === '[object Array]'); // 是否是数组
            for (var i = 0, item; i < _data.length; i++) {
                item = _data[i];
                if (!valIsArr && item[key] == val || valIsArr && val.indexOf(item[key]) != -1) {
                    chkEls.filter('[value="' + i + '"]').prop('checked', check);
                }
            }
            _refreshSelIdx();
        };
        // 复选时的按钮操作：全选 true / 全不选 false - 只供组件内按钮操作，不刷新选中项索引列表（点取消时不保存）
        var _checkAll = function(check) {
            if (!opts.mulChk) return;
            var chkEls = dpEl.find('[name="' + opts.name + '"]');
            chkEls.prop('checked', check);
        };
        // 修改数据源并根据 selParams 重置默认选中值
        var _setData = function(data, selParams) {
            if (data) _data = data;
            var str = '';
            var inputType = opts.mulChk ? 'checkbox' : 'radio',
                name = opts.name,
                txtField = opts.txtField;
            for (var i = 0, opt; i < _data.length; i++) {
                opt = _data[i];
                str += '<li><input type="' + inputType + '" name="' + name + '" value="' + i + '" />' + opt[txtField] + '</li>';
            }
            dpEl.find('ul.chkdp-box').html('').html(str);
            if (_filterObj) { // 更新过滤组件数据源
                _filterObj.setData(_data);
            }
            if (selParams) {
                _check(selParams[0], selParams[1], true);
            } else {
                _refreshSelIdx(); // 直接刷新 selIdx
            }
        };
        var _init = function() {
            // 下拉框内容主体字符串
            var getDropStr = function() {
                var str = '<div class="dropdown dropSel">';
                var boxH = opts.height - CONF.emptyH;
                if (opts.filter) {
                    boxH -= 30;
                    str += '<input class="txt-mid txt-search dropSel-filter" value="" />';
                }
                str += '<div class="dropSel-box" style="height: ' + boxH + 'px;"><ul class="chkdp-box"></ul></div>' +
                    '<div class="dropSel-tool clearf">';
                if (opts.mulChk) {
                    str += '<button class="btn-min" style="float:left;" data-val="all">全选</button>' +
                        '<button class="btn-min" style="float:left;margin-left:2px;" data-val="allno">清空</button>';
                }
                str += '<button class="btn-min" style="margin-left:2px;" data-val="close">取消</button>' +
                    '<button class="btn-min btn-success" data-val="enter">确定</button>' +
                    '</div></div>';
                return str;
            };
            // 下拉框中的内容部分
            dpEl = $(getDropStr());
            if (opts.filter) {
                !opts.filter.fields && (opts.filter.fields = opts.txtField);
                _filterObj = dpEl.find('.dropSel-filter').initFilter($.extend({
                    data: _data,
                    afterFilter: function(newData, keyword) { // 高亮
                        dpEl.find('li').removeClass('dropSel-high');
                        if (keyword != '') {
                            for (var i = 0; i < newData.length; i++) {
                                dpEl.find('[value="' + _data.indexOf(newData[i]) + '"]').parent().addClass('dropSel-high');
                            }
                        }
                    }
                }, opts.filter));
            }
            hideEl = $('<input type="hidden" name="' + opts.name + '" />');
            el.prop('readonly', true) // 禁止输入
                .attr('autocomplete', 'off')
                .after(hideEl); // 添加隐藏域
            _setData(undefined, opts.selParams);
            dpEl.on('click.dpSel', '[data-val]', function() { // 操作按钮
                if (!dpObj) return;
                var ctrlVal = $(this).attr('data-val');
                if (ctrlVal == 'enter') { // 确定 - 获取选中值，然后关闭
                    _refreshSelIdx();
                    dpObj.close();
                } else if (ctrlVal == 'close') { // 取消 - 还原选中状态，然后关闭
                    dpObj.close();
                } else if (ctrlVal == 'all') { // 全选
                    _checkAll(true);
                } else if (ctrlVal == 'allno') { // 不选
                    _checkAll(false);
                }
            });
            dpObj = el.dropdown({
                cont: dpEl,
                noDestroy: true,
                modal: false,
                show: false,
                beforeClose: function() {
                    _checkDom();
                }
            });
            el.off('click.showDp').on('click.showDp', function() {
                if (dpObj && !dpObj.isShown()) dpObj.show();
            });
        };
        returnObj.getSelect = _getSelect; // 获取选中值，单选时返回对象，多选时返回数组
        returnObj.check = _check; // 改变符合条件的数据源的选中状态，并更新到 dom 和 selIdx
        returnObj.setData = _setData; // 重置数据源
        _init();
        return returnObj;
    };

    /**
     * 初始化单选下拉列表，调用此方法的文本框不需定义 name，即使定义也不可与 opts.name 相同
     * @param _opts
     *   - opts.name {string} 必须，下拉框中复选/单选元素的 name 属性值，初始化完成后，会在 el 后生成 <input type="hidden" name="name" />，以便表单取值
     *   - opts.filter {object}
     *       opts.filter.fields {string|Array} 要检索的键
     *       opts.filter.pySupport {bool} 是否支持拼音首字过滤，开启过滤时，默认为 true
     *   - opts.data {Array} 必须，选项数据源
     *   - opts.txtField {string=} data 中每个数据显示的字段名称，默认为 'name'
     *   - opts.valField {string=} data 中每个数据值的字段名称，默认为 'val'
     *   - opts.maxCount {int=} 最多显示几条记录，默认为 5
     *   - opts.selParams {Array=} 默认选中项条件 [key,value]
     *   - opts.callback {function(selData)=} 值改变时的回调方法
     *       selData 选中项的数据对象，无选中则为 undefined
     * @returns {object} obj
     *   - obj.setData(data,selParams) 重置数据源及默认选中项
     *   - obj.getSelect() 获取选中项，返回值：selData 选中项的数据对象，无选中则为 undefined
     *   - obj.check(key,val) 选中符合条件的数据
     *       key {string=} 键
     *       val {string|undefined=} 值
     */
    $.fn.initDropList = function(_opts) {
        var CONF = {
            dplistLiH: 25
        };
        var el = $(this); // 触发下拉的元素
        var opts = $.extend({
            //            filter:{} // 显示检索框，其他接口后续开放
            //            ,name:'' // 必须，下拉框中复选/单选元素的 name 属性值，初始化完成后，会在 el 后生成 <input type="hidden" name="name" />，以便表单取值
            maxCount: 5 // 最多显示 5 条记录
                ,
            data: [] // 数据源
                ,
            txtField: 'name' // data 中每个数据显示的字段名称
                ,
            valField: 'val' // data 中每个数据值的字段名称
                //        ,selParams: [key,value] // 第一次弹出的选中项条件[key,value]，value 支持数组
                //        ,callback: function(selData) // 确定按钮的回调，单选时为选中项的数据对象，无选中则为 undefined；多选时为选中对象数组，无选中则为 []
        }, _opts);
        var guid = $.generateGuid('dropSel');
        !opts.name && (opts.name = guid);
        var hideEl; // 隐藏元素，用于表单取值
        var _data = opts.data,
            returnObj = {}; // 返回对象
        var dpObj // dropdown 返回接口
            , dpEl // 下拉弹出层 jquery 对象
            , _filterObj, selData; // 选中的项
        //        var keyword;// 记录当前关键字
        var _getSelect = function() {
            return selData;
        };
        // 只改变选中项，不修改文本框
        var _setSelData = function(item) {
            selData = item;
            if (!item) {
                hideEl.val('');
            } else {
                hideEl.val(item[opts.valField]);
            }
        };
        // 选中指定对象
        var _checkItem = function(item) {
            _setSelData(item);
            if (!item) {
                el.val('');
            } else {
                el.val(item[opts.txtField]);
            }
            opts.callback && opts.callback(item);
            if (opts.filter && _filterObj) {
                _filterObj.filter(selData && selData[opts.txtField] ? selData[opts.txtField] : '');
            }
        };
        /**
         * 改变符合条件的数据源的选中状态，并更新到 dom 和 selIdx
         * @param key {string=} 键
         * @param val {string|undefined=} 值
         * @private
         */
        var _check = function(key, val) {
            if (key) {
                for (var i = 0, item; i < _data.length; i++) {
                    item = _data[i];
                    if (item[key] == val) {
                        _checkItem(item);
                        return;
                    }
                }
            }
            _checkItem(); // 默认清空选项
        };
        var visibleData; // 要显示的所有数据
        var curPage // 当前显示数据位于第几页（visibleData 中 0 开始）
            , curIndex; // 当前高亮数据索引（visibleData 中 0 开始）
        var _setVisibleData = function(data) {
            var toolEl = dpEl.find('.dropSel-tool');
            visibleData = data;
            if (visibleData.length > opts.maxCount) { // 一页无法显示，启用翻页，不能隐藏，否则弹出后过滤可能造成高度变化
                toolEl.find('button').prop('disabled', false);
            } else {
                toolEl.find('button').prop('disabled', true);
            }
            _chargeList();
        };
        // 修改数据源并根据 selParams 重置默认选中值
        var _setData = function(data, selParams) {
            if (data) _data = data;
            var str = '';
            var txtField = opts.txtField;
            var valField = opts.valField;
            for (var i = 0, item; i < _data.length; i++) {
                item = _data[i];
                str += '<li data-i="' + item[valField] + '">' + item[txtField] + '</li>';
            }
            dpEl.find('ul.dplist-box').html('').html(str);
            if (_filterObj) { // 更新过滤组件数据源
                _filterObj.setData(_data);
            }
            if (data) { // 重置数据源，需要同步更新选中项
                if (selParams) {
                    _check(selParams[0], selParams[1]);
                } else {
                    _check();
                }
            }
        };
        // 根据 curPage 刷新当前显示的数据列表
        // selI 若未定义，则选中当页第一项
        var _chargeList = function(pageI, selI) {
            dpEl.find('li').removeClass('now active');
            if (visibleData.length) {
                var count = opts.maxCount;
                var valField = opts.valField;
                if (pageI == undefined) { // 未定义页码
                    pageI = selI != undefined ? // 定义了高亮行则据此计算页码，否则为 0
                        Math.floor(selI / count) : 0;
                }
                curPage = pageI;
                var start = pageI * opts.maxCount // 开始索引
                    ,
                    end = Math.min(start + count, visibleData.length); // 结束索引
                if (selI == undefined || selI < start || selI > end) {
                    selI = start;
                }
                // 开始翻页及高亮处理
                for (var i = start, item; i < end; i++) {
                    item = visibleData[i];
                    dpEl.find('li[data-i="' + item[valField] + '"]').addClass('now');
                }
            } else {
                curPage = undefined;
                selI = undefined;
            }
            _setActiveItem(selI);
        };
        var _setActiveItem = function(i) {
            curIndex = i;
            if (curIndex != undefined) {
                dpEl.find('li[data-i="' + visibleData[curIndex][opts.valField] + '"]').addClass('active');
            }
            el.focus();
        };
        // 向前翻页
        var _flipPrev = function() {
            _chargeList(curPage > 0 ? curPage - 1 : Math.ceil(visibleData.length / opts.maxCount) - 1);
        };
        // 向后翻页
        var _flipNext = function() {
            _chargeList(curPage < Math.ceil(visibleData.length / opts.maxCount) - 1 ? curPage + 1 : 0);
        };
        var _initDp = function() {
            var str = '<div class="dropdown dropSel dropList">';
            str += '<div class="dropSel-box" style="height:' + (opts.maxCount * CONF.dplistLiH) + 'px"><ul class="dplist-box"></ul></div>' +
                '<div class="dropSel-tool clearf">' +
                '<button class="btn-min" style="float:left;" data-val="prev">上页</button>' +
                '<button class="btn-min" data-val="next">下页</button>' +
                '</div></div>';
            // 下拉框中的内容部分
            dpEl = $(str);
            dpEl
                .on('click.dpSel', '.dropSel-tool [data-val]', function() { // 操作按钮
                    if (!dpObj) return;
                    var ctrlVal = $(this).attr('data-val');
                    if (ctrlVal == 'prev') { // 上一页
                        _flipPrev();
                    } else if (ctrlVal == 'next') { // 下一页
                        _flipNext();
                    }
                })
                .on('click.choose', 'li', function() { // 点选数据
                    _check(opts.valField, $(this).attr('data-i'));
                    dpObj.close();
                });
            dpObj = el.dropdown({
                cont: dpEl,
                noDestroy: true,
                modal: false,
                show: false,
                beforeShow: function() {
                    opts.filter && _setVisibleData(_data);
                },
                beforeClose: function() {
                    if (!selData || el.val() != selData[opts.txtField]) _checkItem(); // 值与当前选中项不匹配，置空
                }
            });
        };
        var _init = function() {
            hideEl = $('<input type="hidden" name="' + opts.name + '" />');
            el.attr('autocomplete', 'off')
                .after(hideEl); // 添加隐藏域
            _initDp();
            _setData();
            el.prop('readonly', !opts.filter); // 支持过滤时允许写入
            if (opts.filter) {
                !opts.filter.fields && (opts.filter.fields = opts.txtField);
                _filterObj = el.initFilter($.extend({ // 打开前需手动过滤
                    data: _data,
                    afterFilter: function(newData, keyword) {
                        if (selData && selData[opts.txtField].toLocaleUpperCase() != keyword) {
                            _setSelData(); // 置空
                        }
                        _setVisibleData(newData);
                    }
                }, opts.filter));
            } else {
                _setVisibleData(_data);
            }
            var selParams = opts.selParams;
            if (selParams) {
                _check(selParams[0], selParams[1]);
            } else {
                _check();
            }
            el.off('click.showDp').on('click.showDp', function() {
                if (!dpObj) return;
                if (opts.filter) { // 点击显示列表
                    !dpObj.isShown() && dpObj.show();
                } else { // 不支持过滤时，点击切换显示状态
                    dpObj.isShown() ? dpObj.close() : dpObj.show();
                }
            });
            el.off('keydown.dpList').on('keydown.dpList', function(e) { // 文本框的键盘监听
                var which = e.which;
                if (!dpObj) return;
                if (which == 13) { // 回车
                    if (dpObj.isShown()) {
                        _checkItem(visibleData[curIndex]);
                        dpObj.close();
                    } else {
                        dpObj.show();
                    }
                } else if (which == 9) { // 失焦关闭
                    if (dpObj.isShown()) {
                        dpObj.close();
                    }
                } else {
                    if (!dpObj.isShown()) {
                        dpObj.show();
                    } else {
                        if (which == 38) { // 上
                            _chargeList(undefined, curIndex == 0 ? visibleData.length - 1 : curIndex - 1);
                            e.preventDefault();
                        } else if (which == 40) { // 下
                            _chargeList(undefined, curIndex == visibleData.length - 1 ? 0 : curIndex + 1);
                            e.preventDefault();
                        }
                    }
                }
            });
        };
        returnObj.getSelect = _getSelect; // 获取选中值，单选时返回对象，多选时返回数组
        returnObj.check = _check; // 改变符合条件的数据源的选中状态，并更新到 dom 和 selIdx
        returnObj.setData = _setData; // 重置数据源
        _init();
        return returnObj;
    };
    /**
     * 初始化下拉树组件，调用此方法的文本框不需定义 name，即使定义也不可与 opts.name 相同
     * @param _opts
     *   - opts.name {string} 必须，初始化完成后，会在 el 后生成 <input type="hidden" name="name" />，以便表单取值
     *   - opts.txtField {string=} 数据显示在文本框中的字段名称，同时作为下拉树中的显示字段，默认为 'name'
     *   - opts.valField {string=} 数据值的字段名称，用于表单取值，默认为 'val'
     *   - opts.height {int=} 默认最大高度为 150，单位：px
     *   - opts.mulChk {bool=} 是否为复选，默认为 false
     *   - opts.filter {object} 过滤功能配置，仅当定义了 filterEl 时生效
     *       opts.filter.fields {string|Array} 参与过滤的属性名，默认为 opts.txtField
     *       opts.filter.pySupport {bool} 是否支持拼音首字过滤，开启过滤时，默认为 true
     *       opts.filter.hide {bool} 是否隐藏不符合过滤条件的节点，默认为 false，复选时此属性无效
     *   - opts.selParams {Array=} 默认选中项条件 [key,value]，其中 value 支持 Array
     *   - opts.treeOpts {object} 下拉弹出的树的初始化参数，参考 $.fn.initZTree(opts)
     *       其中部分参数默认值不同：
     *         opts.treeOpts.initSelect 默认值为 false，即单选时若无匹配选中项，不默认选中
     *       其中部分参数失效：
     *         opts.treeOpts.filterEl（若定义了 opts.treeOpts.filter，则自动指向下拉弹出的搜索框）
     *         opts.treeOpts.filter 由 opts.treeOpts.filter 决定
     *         opts.treeOpts.multi 由 opts.mulChk 决定
     *         opts.treeOpts.selParams 由 opts.selParams 决定
     *         opts.treeOpts.key.name 由 opts.txtField 决定
     *   - opts.callback {function(selData)=} 值改变时的回调方法
     *       selData 单选时为选中项的数据对象，无选中则为 undefined；多选时为选中对象数组，无选中则为 []
     * @returns {object} obj
     *   - obj.resetTree(url,urlArgs,selParams): 重置数据源，同 initZTree 方法中的 reset(url,urlArgs,selParams)
     *   - obj.resetTree(data,selParams): 重置数据源，同 2.3.11 initZTree 方法中的 reset(data,selParams)
     *   - obj.getTreeObj {function} 获取当前下拉树的对象，返回值即为 2.3.11 initZTree 的返回值 obj
     */
    $.fn.initDropTree = function(_opts) {
        var CONF = { emptyH: 2 }; // 没有选项时的高度
        var el = $(this); // 触发下拉的元素
        var opts = $.extend({
            txtField: 'name' // data 中每个数据显示的字段名称
                ,
            valField: 'val' // data 中每个数据值的字段名称
                //        ,name:'' // 必须，下拉框中复选/单选元素的 name 属性值，初始化完成后，会在 el 后生成 <input type="hidden" name="name" />，以便表单取值
                ,
            height: 150 // 默认高度为 150px
                ,
            mulChk: false // 默认为单选
                //        ,filter: {}
                //        ,selParams: [key,value] // 第一次弹出的选中项条件[key,value]，value 支持数组
                ,
            treeOpts: {}
            //        ,callback: function(selData) // 确定按钮的回调，单选时为选中项的数据对象，无选中则为 undefined；多选时为选中对象数组，无选中则为 []
        }, _opts);
        var guid = $.generateGuid('dropTree');
        !opts.name && (opts.name = guid);
        var hideEl; // 隐藏元素，用于表单取值
        var returnObj = {}; // 返回对象
        var dpObj // dropdown 返回接口
            , dpEl // 下拉弹出层 jquery 对象
            , _treeObj; // 树对象
        var _setInputVal = function() {
            if (!_treeObj) return;
            var selData = _treeObj.getSelectedNodesNoHalf();
            var txtField = opts.txtField,
                valField = opts.valField;
            var txtStr = '',
                valStr = '';
            if (selData) {
                var selDatas = opts.mulChk ? selData : [selData];
                for (var i = 0, node, len = selDatas.length; i < len; i++) {
                    node = selDatas[i];
                    if (valStr) {
                        txtStr += ';';
                        valStr += ';';
                    }
                    txtStr += node[txtField];
                    valStr += node[valField];
                }
            }
            hideEl.val(valStr);
            el.val(txtStr);
            el.attr('title', txtStr);
            opts.callback && opts.callback(selData); // 修改选中项时的回调
        };
        var _initTree = function() {
            _treeObj = dpEl.find('#' + guid).initZTree(opts.treeOpts);
        };
        var _init = function() {
            // 下拉框内容主体字符串
            var getDropStr = function() {
                var str = '<div class="dropdown dropSel">';
                var boxH = opts.height - CONF.emptyH;
                if (opts.filter) {
                    boxH -= 30;
                    str += '<input class="txt-mid txt-search dropSel-filter" value="" />';
                }
                str += '<ul class="dropSel-box ztree" style="height: ' + boxH + 'px;" id="' + guid + '"></ul>' +
                    '</div>';
                return str;
            };
            // 下拉框中的内容部分
            dpEl = $(getDropStr());
            $('#form').after(dpEl);
            // 处理树初始化参数
            var treeOpts = opts.treeOpts;
            treeOpts = $.extend(treeOpts, {
                multi: opts.mulChk,
                initSelect: treeOpts.initSelect || false,
                selParams: opts.selParams,
                key: $.extend(treeOpts.key || {}, { name: opts.txtField })
            });
            if (opts.filter) {
                treeOpts.filterEl = dpEl.find('.dropSel-filter');
                treeOpts.filter = opts.filter;
            }
            treeOpts.onSelect = opts.mulChk ? _setInputVal :
                function() {
                    _setInputVal();
                    dpObj.isShown() && dpObj.close(); // 单选设置选中项后关闭
                };
            // 隐藏域
            hideEl = $('<input type="hidden" name="' + opts.name + '" />');
            el.prop('readonly', true) // 禁止输入
                .attr('autocomplete', 'off')
                .after(hideEl); // 添加隐藏域
            dpObj = el.dropdown({
                cont: dpEl,
                modal: false,
                show: false
            });
            _initTree();
            el.off('click.showDp').on('click.showDp', function() {
                if (dpObj && !dpObj.isShown()) {
                    dpObj.show();
                    if (!_treeObj) {
                        _initTree();
                    }
                }
            });
        };
        _init();
        /**
         * 更新树数据源，重新初始化树 reset(url,urlArgs,selParams);reset(data,selParams)
         * @param url {string|Array=}
         * @param urlArgs {object|Array=}
         * @param selParams {Array=} 默认选中项条件 [key,value]
         */
        returnObj.resetTree = function(url, urlArgs, selParams) {
            _treeObj && _treeObj.reset(url, urlArgs, selParams);
        };
        returnObj.setSel = function(selParams, clear) {
            _treeObj && _treeObj.setSel(selParams, clear);
        };
        returnObj.getTreeObj = function() {
            return _treeObj;
        };
        return returnObj;
    };
    /**
     * 根据 zhStr 的拼音首字母是否包含 keyword
     * @param zhStr {string} 中文字符串
     */
    $.makePyArr = function(zhStr) {
        var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
        //此处收了375个多音字
        var oMultiDiff = { "19969": "DZ", "19975": "WM", "19988": "QJ", "20048": "YL", "20056": "SC", "20060": "NM", "20094": "QG", "20127": "QJ", "20167": "QC", "20193": "YG", "20250": "KH", "20256": "ZC", "20282": "SC", "20285": "QJG", "20291": "TD", "20314": "YD", "20340": "NE", "20375": "TD", "20389": "YJ", "20391": "CZ", "20415": "PB", "20446": "YS", "20447": "SQ", "20504": "TC", "20608": "KG", "20854": "QJ", "20857": "ZC", "20911": "PF", "20985": "AW", "21032": "PB", "21048": "XQ", "21049": "SC", "21089": "YS", "21119": "JC", "21242": "SB", "21273": "SC", "21305": "YP", "21306": "QO", "21330": "ZC", "21333": "SDC", "21345": "QK", "21378": "CA", "21397": "SC", "21414": "XS", "21442": "SC", "21477": "JG", "21480": "TD", "21484": "ZS", "21494": "YX", "21505": "YX", "21512": "HG", "21523": "XH", "21537": "PB", "21542": "PF", "21549": "KH", "21571": "E", "21574": "DA", "21588": "TD", "21589": "O", "21618": "ZC", "21621": "KHA", "21632": "ZJ", "21654": "KG", "21679": "LKG", "21683": "KH", "21710": "A", "21719": "YH", "21734": "WOE", "21769": "A", "21780": "WN", "21804": "XH", "21834": "A", "21899": "ZD", "21903": "RN", "21908": "WO", "21939": "ZC", "21956": "SA", "21964": "YA", "21970": "TD", "22003": "A", "22031": "JG", "22040": "XS", "22060": "ZC", "22066": "ZC", "22079": "MH", "22129": "XJ", "22179": "XA", "22237": "NJ", "22244": "TD", "22280": "JQ", "22300": "YH", "22313": "XW", "22331": "YQ", "22343": "YJ", "22351": "PH", "22395": "DC", "22412": "TD", "22484": "PB", "22500": "PB", "22534": "ZD", "22549": "DH", "22561": "PB", "22612": "TD", "22771": "KQ", "22831": "HB", "22841": "JG", "22855": "QJ", "22865": "XQ", "23013": "ML", "23081": "WM", "23487": "SX", "23558": "QJ", "23561": "YW", "23586": "YW", "23614": "YW", "23615": "SN", "23631": "PB", "23646": "ZS", "23663": "ZT", "23673": "YG", "23762": "TD", "23769": "ZS", "23780": "QJ", "23884": "QK", "24055": "XH", "24113": "DC", "24162": "ZC", "24191": "GA", "24273": "QJ", "24324": "NL", "24377": "TD", "24378": "QJ", "24439": "PF", "24554": "ZS", "24683": "TD", "24694": "WE", "24733": "LK", "24925": "TN", "25094": "ZG", "25100": "XQ", "25103": "XH", "25153": "PB", "25170": "PB", "25179": "KG", "25203": "PB", "25240": "ZS", "25282": "FB", "25303": "NA", "25324": "KG", "25341": "ZY", "25373": "WZ", "25375": "XJ", "25384": "A", "25457": "A", "25528": "SD", "25530": "SC", "25552": "TD", "25774": "ZC", "25874": "ZC", "26044": "YW", "26080": "WM", "26292": "PB", "26333": "PB", "26355": "ZY", "26366": "CZ", "26397": "ZC", "26399": "QJ", "26415": "ZS", "26451": "SB", "26526": "ZC", "26552": "JG", "26561": "TD", "26588": "JG", "26597": "CZ", "26629": "ZS", "26638": "YL", "26646": "XQ", "26653": "KG", "26657": "XJ", "26727": "HG", "26894": "ZC", "26937": "ZS", "26946": "ZC", "26999": "KJ", "27099": "KJ", "27449": "YQ", "27481": "XS", "27542": "ZS", "27663": "ZS", "27748": "TS", "27784": "SC", "27788": "ZD", "27795": "TD", "27812": "O", "27850": "PB", "27852": "MB", "27895": "SL", "27898": "PL", "27973": "QJ", "27981": "KH", "27986": "HX", "27994": "XJ", "28044": "YC", "28065": "WG", "28177": "SM", "28267": "QJ", "28291": "KH", "28337": "ZQ", "28463": "TL", "28548": "DC", "28601": "TD", "28689": "PB", "28805": "JG", "28820": "QG", "28846": "PB", "28952": "TD", "28975": "ZC", "29100": "A", "29325": "QJ", "29575": "SL", "29602": "FB", "30010": "TD", "30044": "CX", "30058": "PF", "30091": "YSP", "30111": "YN", "30229": "XJ", "30427": "SC", "30465": "SX", "30631": "YQ", "30655": "QJ", "30684": "QJG", "30707": "SD", "30729": "XH", "30796": "LG", "30917": "PB", "31074": "NM", "31085": "JZ", "31109": "SC", "31181": "ZC", "31192": "MLB", "31293": "JQ", "31400": "YX", "31584": "YJ", "31896": "ZN", "31909": "ZY", "31995": "XJ", "32321": "PF", "32327": "ZY", "32418": "HG", "32420": "XQ", "32421": "HG", "32438": "LG", "32473": "GJ", "32488": "TD", "32521": "QJ", "32527": "PB", "32562": "ZSQ", "32564": "JZ", "32735": "ZD", "32793": "PB", "33071": "PF", "33098": "XL", "33100": "YA", "33152": "PB", "33261": "CX", "33324": "BP", "33333": "TD", "33406": "YA", "33426": "WM", "33432": "PB", "33445": "JG", "33486": "ZN", "33493": "TS", "33507": "QJ", "33540": "QJ", "33544": "ZC", "33564": "XQ", "33617": "YT", "33632": "QJ", "33636": "XH", "33637": "YX", "33694": "WG", "33705": "PF", "33728": "YW", "33882": "SR", "34067": "WM", "34074": "YW", "34121": "QJ", "34255": "ZC", "34259": "XL", "34425": "JH", "34430": "XH", "34485": "KH", "34503": "YS", "34532": "HG", "34552": "XS", "34558": "YE", "34593": "ZL", "34660": "YQ", "34892": "XH", "34928": "SC", "34999": "QJ", "35048": "PB", "35059": "SC", "35098": "ZC", "35203": "TQ", "35265": "JX", "35299": "JX", "35782": "SZ", "35828": "YS", "35830": "E", "35843": "TD", "35895": "YG", "35977": "MH", "36158": "JG", "36228": "QJ", "36426": "XQ", "36466": "DC", "36710": "JC", "36711": "ZYG", "36767": "PB", "36866": "SK", "36951": "YW", "37034": "YX", "37063": "XH", "37218": "ZC", "37325": "ZC", "38063": "PB", "38079": "TD", "38085": "QY", "38107": "DC", "38116": "TD", "38123": "YD", "38224": "HG", "38241": "XTC", "38271": "ZC", "38415": "YE", "38426": "KH", "38461": "YD", "38463": "AE", "38466": "PB", "38477": "XJ", "38518": "YT", "38551": "WK", "38585": "ZC", "38704": "XS", "38739": "LJ", "38761": "GJ", "38808": "SQ", "39048": "JG", "39049": "XJ", "39052": "HG", "39076": "CZ", "39271": "XT", "39534": "TD", "39552": "TD", "39584": "PB", "39647": "SB", "39730": "LG", "39748": "TPB", "40109": "ZQ", "40479": "ND", "40516": "HG", "40536": "HG", "40583": "QJ", "40765": "YQ", "40784": "QJ", "40840": "YK", "40863": "QJG" };
        /**
         * 获取当前字符的拼音首字母
         * @param ch {string} 字符串
         * @returns {*}
         */
        var checkCh = function(ch) {
            var uni = ch.charCodeAt(0);
            if (uni > 40869 || uni < 19968) return ch; // 不在汉字范围内,返回原字符
            return (oMultiDiff[uni] ? oMultiDiff[uni] : strChineseFirstPY.charAt(uni - 19968)); // 多音字处理,否则在 strChineseFirstPY 字符串中找对应的首字母
        };
        /**
         * @param arr 逐个字符处理的结果数组
         * @returns {string[]} 返回所有可能的拼音首字母串数组
         */
        var mkRslt = function(arr) {
            var arrRslt = [''];
            for (var i = 0, len = arr.length; i < len; i++) {
                var str = arr[i];
                var strlen = str.length;
                if (strlen == 1) {
                    for (var k = 0; k < arrRslt.length; k++) {
                        arrRslt[k] += str;
                    }
                } else {
                    var tmpArr = arrRslt.slice(0);
                    arrRslt = [];
                    for (k = 0; k < strlen; k++) {
                        var tmp = tmpArr.slice(0); // 复制一个相同的arrRslt
                        //把当前字符str[k]添加到每个元素末尾
                        for (var j = 0; j < tmp.length; j++) {
                            tmp[j] += str.charAt(k);
                        }
                        //把复制并修改后的数组连接到arrRslt上
                        arrRslt = arrRslt.concat(tmp);
                    }
                }
            }
            return arrRslt;
        };
        var arrResult = []; //保存中间结果的数组
        for (var i = 0, len = zhStr.length; i < len; i++) {
            var ch = zhStr.charAt(i); //获得unicode码
            // 检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
            arrResult.push(checkCh(ch));
        }
        //处理arrResult,返回所有可能的拼音首字母串数组
        return mkRslt(arrResult);
    };

    /**
     * 初始化关键字过滤元素
     * @param _opts
     *   - opts.fields {string|Array} 要过滤的字段的属性名
     *   - opts.pySupport {bool} 是否支持拼音首字过滤
     *   - opts.data {Array=} 要进行过滤的数据源
     *   - opts.afterFilter {function(newData,keyword)=} 过滤完成后的回调方法，newData:过滤后的数据；keyword:过滤关键字
     * @returns {object} obj
     *   - obj.filter(val) 手动过滤，val {string} 关键字
     *   - obj.setData(data,keyword) 重置过滤源数据，data {Array} 过滤数据源，keyword {string} 默认关键字
     *   - {Array} obj.getFilterData() 获取当前关键字过滤后的数据
     */
    $.fn.initFilter = function(_opts) {
        var el = $(this);
        var opts = $.extend({
            fields: 'name',
            pySupport: true // 拼音首字支持
                //            ,data:[]// 要搜索的数据源
                //            ,afterFilter:function(newData,keyword)// 过滤完成后的回调函数，newData:过滤后的数据
        }, _opts);
        var _returnObj = {};
        var _data // 过滤数据源
            , _filterData = [] // 根据数据源生成的过滤字段字典
            ,
            keyword = '' // 过滤关键字
            ,
            filterData; // 过滤后的数据
        el.val(keyword);
        var _destroy = function() {
            el.off('keyup.search');
        };
        // 根据关键字搜索数据源
        var _filter = function(val, doCb) {
            if (!_data) return; // 没有数据源
            if (el.val() != val) el.val(val); // 更新搜索框文本
            keyword = val.toLocaleUpperCase();
            if (keyword == '') { // 关键字为空，返回全部
                filterData = _data;
            } else {
                filterData = [];
                for (var i = 0, vals; i < _data.length; i++) {
                    vals = _filterData[i];
                    for (var j = 0; j < vals.length; j++) {
                        if (vals[j].toLocaleUpperCase().indexOf(keyword) != -1) {
                            filterData.push(_data[i]);
                            break;
                        }
                    }
                }
            }
            doCb && opts.afterFilter && opts.afterFilter(filterData, keyword);
        };
        var _initFilterData = function() {
            if (!_data) return;
            _filterData.length = 0;
            // 生成过滤字段字典
            var fields = opts.fields,
                pySupport = opts.pySupport;
            var len = _data.length,
                i, item, val, filterVals;
            if (Object.prototype.toString.call(fields) === '[object Array]') {
                for (i = 0; i < len; i++) {
                    filterVals = [];
                    item = _data[i];
                    for (var f = 0; f < fields.length; f++) {
                        val = item[fields[f]];
                        var vType = typeof val;
                        if (vType == 'boolean' || vType == 'string' || vType == 'number') {
                            val = String(item[fields[f]]).toLocaleUpperCase();
                            filterVals.push(val);
                            if (pySupport && /[\u4e00-\u9fa5]+/.test(val)) {
                                filterVals = filterVals.concat($.makePyArr(val));
                            }
                        }
                    }
                    _filterData.push(filterVals);
                }
            } else {
                for (i = 0; i < len; i++) {
                    filterVals = [];
                    val = _data[i][fields].toLocaleUpperCase();
                    filterVals.push(val);
                    if (pySupport && /[\u4e00-\u9fa5]+/.test(val)) {
                        filterVals = filterVals.concat($.makePyArr(val));
                    }
                    _filterData.push(filterVals);
                }
            }
        };
        var _setData = function(data, val, doCb) {
            _data = data;
            filterData = _data;
            _initFilterData();
            _filter(val || '', doCb);
        };
        var _init = function() {
            _setData(opts.data); // 初始化时不自动过滤
            el.on('keyup.search', function() {
                var val = el.val();
                if (val != keyword) _filter(val, true);
            });
        };
        _returnObj.filter = _filter;
        _returnObj.setData = _setData; // 更新数据源
        _returnObj.getData = function() { // 获取数据源
            return _data;
        };
        _returnObj.getFilterData = function() { // 获取当前关键字过滤后的数据
            return filterData;
        };
        _destroy();
        _init();
        return _returnObj;
    };
    /**
     * 初始化时间控件，依赖 WdatePicker
     * return {object}
     * - curStart {Date}:开始日期对象
     * - curEnd {Date}:结束日期对象
     */
    $.fn.initDateLine = function() {
        if (!window.WdatePicker) return;
        var dateline = $(this);
        !dateline.hasClass('dateline') && dateline.addClass('dateline');
        var dtGuid = $.generateGuid('dateline');
        // dateline 主要元素：上个月、下个月、弹出、主体
        var prevEl, nextEl, triggerEl, layerEl;
        var _triggering; // 是否正通过 .dateline-c 切换，传递到 document 以判断是否需要继续执行，通过 e.stopPropagation() 可能造成 document 上的其他事件被拦截
        var dateData = { // 要返回的数据对象
            curStart: undefined // dateline 中显示的开始日期对象
                ,
            curEnd: undefined // dateline 中显示的开始日期对象
                /**
                 * 设置 dateline 起始时间
                 * @param startDate {Date=} 开始时间，未定义时，根据当前时间设为本月第一天
                 * @param endDate {Date=} 结束时间，未定义时，根据开始时间设为当月最后一天
                 */
                ,
            setDateData: function(startDate, endDate) {
                var spans = triggerEl.children('span');
                if (!startDate) { // 根据当前时间设为本月第一天
                    startDate = new Date($.getDate().format('yyyy/MM/01'));
                }
                if (!endDate) { // 根据开始时间设为当月最后一天
                    endDate = new Date(startDate.add('M', 1).add('d', -1));
                }
                // 同步到页面
                spans.eq(0).html(startDate.format('yyyy年MM月dd日'));
                spans.eq(2).html(endDate.format('yyyy年MM月dd日'));
                dateData.curStart = new Date(startDate);
                dateData.curEnd = new Date(endDate);
            }
        };
        var hideLayer = function() { // 隐藏主体
                triggerEl.removeClass('now');
                layerEl.removeClass('now');
                $(document).off('click.hide' + dtGuid);
            },
            showLayer = function() { // 显示主体
                triggerEl.addClass('now');
                var triggerBCR = triggerEl[0].getBoundingClientRect();
                layerEl
                    .addClass('now')
                    .css({
                        'left': triggerEl.position().left + 'px',
                        'top': (triggerEl.position().top + triggerBCR.bottom - triggerBCR.top) + 'px'
                    });
                // 点击其他部位隐藏
                $(document).on('click.hide' + dtGuid, function() {
                    !_triggering && hideLayer();
                    _triggering = false;
                });
                initBody(layerEl);
            };
        /* custom 快捷切换 */
        var initCustom = function(customEl) {
            var inputs = customEl.find('input.date-trigger');
            /**
             * 设置 custom 起始时间
             * @param startDate {Date=} 开始时间，未定义时，根据当前时间设为本月第一天
             * @param endDate {Date=} 结束时间，未定义时，根据开始时间设为当月最后一天
             */
            var setDtCustom = function(startDate, endDate) {
                if (!startDate) { // 根据当前时间设为本月第一天
                    startDate = new Date($.getDate().format('yyyy/MM/01'));
                }
                if (!endDate) { // 根据开始时间设为当月最后一天
                    endDate = new Date(startDate.add('M', 1).add('d', -1));
                }
                // 同步到页面
                inputs.eq(0).val(startDate.format('yyyy-MM-dd'));
                inputs.eq(1).val(endDate.format('yyyy-MM-dd'));
            };
            var hideCustom = function(el) { // 隐藏 custom 下拉
                    el.find('.dateline-layer').removeClass('now');
                },
                showCustom = function(el) { // 显示 custom 下拉
                    var custom = el.find('.dateline-layer');
                    var triggerBCR = el[0].getBoundingClientRect();
                    custom
                        .addClass('now')
                        .css({
                            'left': (el.position().left + 5) + 'px' // 含有 5px 外边距
                                ,
                            'top': (el.position().top + triggerBCR.bottom - triggerBCR.top - 1) + 'px'
                        });
                };
            //            inputs.eq(0).click(function(){
            //                WdatePicker({ dateFmt:'yyyy-MM-dd' ,readOnly:true});
            //            });
            //            inputs.eq(1).click(function(){
            //                WdatePicker({ dateFmt:'yyyy-MM-dd',readOnly:true});
            //            });
            setDtCustom(dateData.curStart, dateData.curEnd);
            // 显示/隐藏快捷选择弹框
            customEl.find('.date-custom-trigger').click(function() {
                var el = $(this);
                el.find('.dateline-layer').hasClass('now') ? hideCustom(el) : showCustom(el);
            });
            customEl.find('.date-custom-select')
                .append(
                    '<li data-opt="thisMonth">本月</li>' +
                    '<li data-opt="lastMonth">上月</li>' +
                    '<li data-opt="thisWeek">本周</li>' +
                    '<li data-opt="lastWeek">上周</li>' +
                    '<li data-opt="thisQ">本季</li>' +
                    '<li data-opt="lastQ">上季</li>' +
                    '<li data-opt="thisYear">今年</li>' +
                    '<li data-opt="lastYear">去年</li>' +
                    '<li data-opt="last7Days">近7天</li>' +
                    '<li data-opt="last30Days">近30天</li>')
                // 快速选择弹框选中事件
                .on('click', 'li', function() { // custom 快捷切换
                    var opt = $(this),
                        val = opt.attr('data-opt'),
                        txt = opt.html();
                    opt.closest('.dateline-layer').prev().html(txt);
                    var today = $.getDate();
                    switch (val) {
                        case 'thisMonth': // 本月
                            setDtCustom();
                            break;
                        case 'lastMonth': // 上月
                            setDtCustom(new Date(today.format('yyyy-MM-01')).add('M', -1));
                            break;
                        case 'thisWeek': // 本周 - 周一为第一天
                            var w = (today.getDay() || 7) - 1;
                            var start = today.add('d', -w);
                            setDtCustom(start, start.add('d', 6));
                            break;
                        case 'lastWeek': // 上周
                            var w = (today.getDay() || 7) - 1;
                            var start = today.add('d', -w - 7);
                            setDtCustom(start, start.add('d', 6));
                            break;
                        case 'thisQ': // 本季
                            var start = new Date(today.getFullYear() + '/' + (Math.floor(today.getMonth() / 3) * 3 + 1) + '/01');
                            setDtCustom(start, start.add('M', 3).add('d', -1));
                            break;
                        case 'lastQ': // 上季
                            var start = new Date(today.getFullYear() + '/' + (Math.floor(today.getMonth() / 3) * 3 + 1) + '/01');
                            setDtCustom(start.add('M', -3), start.add('d', -1));
                            break;
                        case 'thisYear': // 今年
                            var y = today.getFullYear();
                            setDtCustom(new Date(y + '/01/01'), new Date(y + '/12/31'));
                            break;
                        case 'lastYear': // 去年
                            var y = today.getFullYear() - 1;
                            setDtCustom(new Date(y + '/01/01'), new Date(y + '/12/31'));
                            break;
                        case 'last7Days': // 近7天
                            setDtCustom(today.add('d', -6), today);
                            break;
                        case 'last30Days': // 近30天
                            setDtCustom(today.add('d', -29), today);
                            break;
                    }
                });
            // custom 确定按钮事件
            customEl.find('.date-btn').click(function() {
                hideLayer();
                dateData.setDateData(new Date(inputs.eq(0).val().replace(/-/g, '/')), new Date(inputs.eq(1).val().replace(/-/g, '/')));
            });
        };
        /* month 快捷切换 */
        var _monYear; // month 中显示的年份
        var initMonth = function(monthEl) {
            /**
             * 设置 month 年份，并根据年份设置月份状态
             * @param year {int=} 年份，未定义时为今年
             */
            var setMonthYear = function(year) {
                var today = $.getDate(),
                    thisYear = today.getFullYear(),
                    thisMonth = today.getMonth() + 1;
                if (!year) year = thisYear;
                _monYear = year;
                monthEl.find('.date-month-head>div').eq(1).html(year + '年');
                var monthStr = '';
                for (var i = 1, clsStr; i <= 12; i++) {
                    clsStr = '';
                    if (year == thisYear && i == thisMonth) { // 当前月
                        clsStr = ' class="currentMonth"';
                    } else if (year == thisYear && i > thisMonth || year > thisYear) { // 不可选的月份
                        clsStr = ' class="cannotSelect"';
                    }
                    monthStr += '<li data-month="' + i + '"' + clsStr +
                        (i == 1 || i == 7 ? ' style="margin-left:1px;"' : '') + '>' + i + '月</li>';
                }
                monthEl.children('.date-month-body').html(monthStr);
            };
            setMonthYear();
            monthEl.children('.date-month-head').on('click.month', '>div', function() {
                if ($(this).hasClass('dateline-l')) { // 上一年
                    setMonthYear(_monYear - 1);
                } else if ($(this).hasClass('dateline-r')) { // 下一年
                    setMonthYear(_monYear + 1);
                }
            });
            monthEl.children('.date-month-body').on('click.month', 'li', function() {
                if ($(this).hasClass('cannotSelect')) return; // 不可选的月份
                hideLayer();
                dateData.setDateData(new Date($(this).parent().prev().text().replace('年', '/') + $(this).attr('data-month') + '/01'));
            });
        };
        var initBody = function(bodyEl, init) {
            if (init) { // 初始化弹出主体中切换 body 的事件
                bodyEl.children('.date-select')
                    .off('click.datebody' + dtGuid)
                    .on('click.datebody' + dtGuid, '.date-option', function() {
                        bodyEl.find('.dateline-layer').removeClass('now'); // 切换时将 date-body 中的弹出层隐藏
                        var trigger = $(this);
                        if (trigger.hasClass('now')) return;
                        layerEl.find('.date-select>.now').removeClass('now');
                        trigger.addClass('now');
                        bodyEl.children('.now').removeClass('now');
                        bodyEl.children('[data-type="' + trigger.attr('data-type') + '"]').addClass('now');
                    });
            }
            bodyEl.children('.date-select').find('.date-option').eq(0).trigger('click.datebody');
        };
        var initDateLine = function() {
            // 初始化el元素
            (function initEl() {
                prevEl = $('<div class="dateline-l"></div>');
                triggerEl = $('<div class="dateline-c date-trigger">' +
                    '<span></span>' +
                    '<span style="padding:0 5px;">-</span>' +
                    '<span></span>' +
                    '</div>');
                nextEl = $('<div class="dateline-r"></div>');
                layerEl = $('<div class="dateline-layer date-body">' +
                    '<div class="date-select">' +
                    '<div data-type="custom" class="date-option now">自定义选择</div>' +
                    '<div data-type="month" class="date-option">按月选择</div>' +
                    '</div>' +
                    '<div data-type="custom" class="date-container now">' +
                    '<div class="date-line">' +
                    '<div class="date-trigger date-custom-trigger"><span>本月</span>' +
                    '<div class="dateline-layer"><ul class="date-custom-select"></ul></div>' +
                    '</div>' +
                    '<input class="date-trigger" onclick="WdatePicker({ dateFmt:\'yyyy-MM-dd\',readOnly:true});" /><span>-</span><input class="date-trigger" onclick="WdatePicker({ dateFmt:\'yyyy-MM-dd\',readOnly:true});" />' +
                    '</div>' +
                    '<div class="date-line">' +
                    '<div class="date-btn">确认</div>' +
                    '</div>' +
                    '</div>' +
                    '<div data-type="month" class="date-container">' +
                    '<div class="date-line date-month-head">' +
                    '<div class="dateline-l"></div>' +
                    '<div style="width:80px;text-align: center;"></div>' +
                    '<div class="dateline-r"></div>' +
                    '</div>' +
                    '<ul class="date-line date-month-body"></ul>' +
                    '</div>' +
                    '</div>');
            })();
            dateData.setDateData(); // 初始化 dateline 时间范围
            dateline.on('click.dateline', '>div', function(e) {
                var el = $(this);
                if (el.hasClass('dateline-l')) { // 切换到上个月
                    dateData.setDateData(new Date(dateData.curStart.format('yyyy/MM/01')).add('M', -1));
                } else if (el.hasClass('dateline-r')) { // 切换到下个月
                    dateData.setDateData(new Date(dateData.curStart.format('yyyy/MM/01')).add('M', 1));
                } else if (el.hasClass('dateline-c')) { // 显示/隐藏主体
                    _triggering = true; // 避免关闭主体
                    if (triggerEl.hasClass('now')) {
                        hideLayer();
                    } else {
                        showLayer();
                    }
                } else if (el.hasClass('dateline-layer')) { // 主体框中的点击
                    _triggering = true; // 避免关闭主体
                }
            });

            initCustom(layerEl.find('.date-container[data-type="custom"]'));
            initMonth(layerEl.find('.date-container[data-type="month"]'));
            initBody(layerEl, true);
            dateline.append(prevEl, triggerEl, nextEl, layerEl);
        };
        initDateLine();
        return dateData;
    };
    /**
     * 在祖先窗口打开 tab 页，若祖先窗口不支持，则打开新窗口
     * @param tab
     */
    $.openTab = function(tab) {
        var win = _getFrameWin();
        if (win) {
            win.frameTab.add(tab);
        } else if (tab.url) {
            window.open(tab.url, '_blank');
        }
    };
    /**
     * 刷新祖先窗口中的指定 tab 页
     * @param val {string}
     */
    $.refreshTab = function(val) {
        var win = window;
        while (win && !win.frameTab) {
            win = win.parent;
        }
        win.frameTab && win.frameTab.refresh(val);
    };
    //    /**
    //     * 关闭当前 tab 页
    //     */
    //    $.closeTab=function(){
    //        var pWin=window.parent;
    //        var frameEl=window.frameElement;
    //        var pEl=$(frameEl).parent('.tab-cont');
    //        if(pWin && frameEl && pEl.length){
    //            pWin.frameTab && pWin.frameTab.close(pEl.attr('data-val'));
    //        }
    //    };
    function _getFrameWin() {
        var win = window,
            topWin = window.top;
        while (win != topWin && !win.frameTab) {
            win = win.parent;
        }
        return win.frameTab ? win : undefined;
    }
    $.getFrameWin = _getFrameWin;

    // 十六进制数组
    var _hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    /**
     * 预防XSS，输出到事件或脚本时使用
     *
     * 使用"\"对特殊字符进行转义，
     * 除数字字母之外，小于127使用16进制"\xHH"的方式进行编码，
     * 大于127使用unicode
     *
     * 参考：http://www.cnblogs.com/lovesong/p/5211667.html
     */
    $.JavaScriptEncode = function(str) {
        // 非字符串不处理
        if ('string' != typeof(str)) return str;
        var preEscape = str; // 处理前
        var escaped = ""; // 处理后
        for (var i = 0; i < preEscape.length; i++) {
            escaped = escaped + encodeCharx(preEscape.charAt(i));
        }
        return escaped;

        // 字符编码
        function encodeCharx(original) {
            var theChar = original.charAt(0); // 字符
            var theUnicode = original.charCodeAt(0); // 字符的unicode值
            // 特殊字符转义
            switch (theChar) {
                case '\n':
                    return "\\n";
                case '\r':
                    return "\\r";
                case '\'':
                    return "\\'";
                case '"':
                    return "\\\"";
                case '\&':
                    return "\\&";
                case '\\':
                    return "\\\\";
                case '\t':
                    return "\\t";
                case '\b':
                    return "\\b";
                case '\f':
                    return "\\f";
                case '/':
                    return "\\x2F";
                case '<':
                    return "\\x3C";
                case '>':
                    return "\\x3E";
                default:
                    return normalChar();
            }
            // 其它字符处理
            function normalChar() {
                if ((theUnicode > 47 && theUnicode < 58) // 数字
                    ||
                    (theUnicode > 64 && theUnicode < 91) // 大写字母
                    ||
                    (theUnicode > 96 && theUnicode < 123)) { // 小写字母
                    return original;
                }
                if (theUnicode > 127) { // 大于127使用unicode
                    var c = theUnicode;
                    var a4 = c % 16;
                    c = Math.floor(c / 16);
                    var a3 = c % 16;
                    c = Math.floor(c / 16);
                    var a2 = c % 16;
                    c = Math.floor(c / 16);
                    var a1 = c % 16;
                    return "\\u" + _hexArray[a1] + _hexArray[a2] + _hexArray[a3] + _hexArray[a4] + "";
                }
                // 16进制
                return "\\x" + original.charCodeAt(0).toString(16);
            }
        }
    };
    /**
     * 预防XSS，输出到HTML内容或者属性
     *
     * 将字符转换成HTMLEntites
     *
     * 参考：http://www.cnblogs.com/lovesong/p/5211667.html
     *
     */
    $.HtmlEncode = function(str) {
        // 非字符串不处理
        if ('string' != typeof(str)) return str;
        var preEscape = str; // 处理前
        var escaped = ""; // 处理后
        for (var i = 0; i < preEscape.length; i++) {
            var p = preEscape.charAt(i);
            escaped = escaped + encodeCharx(p);
        }
        return escaped;

        // 字符编码
        function encodeCharx(original) {
            var thechar = original.charCodeAt(0); // 字符
            switch (thechar) {
                case 10:
                    return "<br/>"; //newline
                case 32:
                    return "&nbsp;"; //space
                case 34:
                    return "&quot;"; //"
                case 38:
                    return "&amp;"; //&
                case 39:
                    return "&#x27;"; //'
                case 47:
                    return "&#x2F;"; // /
                case 60:
                    return "&lt;"; //<
                case 62:
                    return "&gt;"; //>
                case 198:
                    return "&AElig;";
                case 193:
                    return "&Aacute;";
                case 194:
                    return "&Acirc;";
                case 192:
                    return "&Agrave;";
                case 197:
                    return "&Aring;";
                case 195:
                    return "&Atilde;";
                case 196:
                    return "&Auml;";
                case 199:
                    return "&Ccedil;";
                case 208:
                    return "&ETH;";
                case 201:
                    return "&Eacute;";
                case 202:
                    return "&Ecirc;";
                case 200:
                    return "&Egrave;";
                case 203:
                    return "&Euml;";
                case 205:
                    return "&Iacute;";
                case 206:
                    return "&Icirc;";
                case 204:
                    return "&Igrave;";
                case 207:
                    return "&Iuml;";
                case 209:
                    return "&Ntilde;";
                case 211:
                    return "&Oacute;";
                case 212:
                    return "&Ocirc;";
                case 210:
                    return "&Ograve;";
                case 216:
                    return "&Oslash;";
                case 213:
                    return "&Otilde;";
                case 214:
                    return "&Ouml;";
                case 222:
                    return "&THORN;";
                case 218:
                    return "&Uacute;";
                case 219:
                    return "&Ucirc;";
                case 217:
                    return "&Ugrave;";
                case 220:
                    return "&Uuml;";
                case 221:
                    return "&Yacute;";
                case 225:
                    return "&aacute;";
                case 226:
                    return "&acirc;";
                case 230:
                    return "&aelig;";
                case 224:
                    return "&agrave;";
                case 229:
                    return "&aring;";
                case 227:
                    return "&atilde;";
                case 228:
                    return "&auml;";
                case 231:
                    return "&ccedil;";
                case 233:
                    return "&eacute;";
                case 234:
                    return "&ecirc;";
                case 232:
                    return "&egrave;";
                case 240:
                    return "&eth;";
                case 235:
                    return "&euml;";
                case 237:
                    return "&iacute;";
                case 238:
                    return "&icirc;";
                case 236:
                    return "&igrave;";
                case 239:
                    return "&iuml;";
                case 241:
                    return "&ntilde;";
                case 243:
                    return "&oacute;";
                case 244:
                    return "&ocirc;";
                case 242:
                    return "&ograve;";
                case 248:
                    return "&oslash;";
                case 245:
                    return "&otilde;";
                case 246:
                    return "&ouml;";
                case 223:
                    return "&szlig;";
                case 254:
                    return "&thorn;";
                case 250:
                    return "&uacute;";
                case 251:
                    return "&ucirc;";
                case 249:
                    return "&ugrave;";
                case 252:
                    return "&uuml;";
                case 253:
                    return "&yacute;";
                case 255:
                    return "&yuml;";
                case 162:
                    return "&cent;";
                case '\r':
                    break;
                default:
                    return normalChar();
            }
            // 其它字符处理
            function normalChar() {
                if (thechar > 127) {
                    var c = thechar;
                    var a4 = c % 16;
                    c = Math.floor(c / 16);
                    var a3 = c % 16;
                    c = Math.floor(c / 16);
                    var a2 = c % 16;
                    c = Math.floor(c / 16);
                    var a1 = c % 16;
                    return "&#x" + _hexArray[a1] + _hexArray[a2] + _hexArray[a3] + _hexArray[a4] + ";";
                } else return original;
            }
        }
    }
})(jQuery);