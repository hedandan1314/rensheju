(function() {
    function Login(userName, password, code) {
        this.userName = userName;
        this.password = password;
        this.code = code;
    }
    //console.log(window.location.href);

    /**
     * 用户名、密码、验证码的非空验证
     */
    Login.prototype.verificationParams = function() {
            if ($.trim(this.userName) == "") {
                layer.open({
                    title: "提示信息",
                    content: "用户名或手机号不能为空！",

                });
                return false;
            }
            if ($.trim(this.password) == "") {
                layer.open({
                    title: "提示信息",
                    content: "密码不能为空！",

                });
                return false;
            }
            if ($.trim(this.code) == "") {
                layer.open({
                    title: "提示信息",
                    content: "验证码不能为空！",

                });
                return false;
            }
            return true;
        }
        /**
         * 向后台提交参数
         * @param {*} loginInfo 
         */
    Login.prototype.submitParams = function() {
            $.ajax({
                type: "POST",
                url: "",
                data: {
                    userName: this.userName,
                    password: this.password
                },
                beforeSend: function() {
                    //请求之前的相关操作
                    $(".loginBtn").attr("disabled", true); //登录按钮失效
                },
                complete: function() {
                    //请求结束的相关操作
                    var $this = $("#rememberPassword");
                    var loginInfo = getParams();
                    if ($this.prop("checked")) {
                        loginInfo.rememberPassword();
                    } else {
                        loginInfo.noRememberPassword();
                    }
                    $(".loginBtn").attr("disabled", false);
                },
                success: function(data) {
                    //请求成功的相关操作
                },
                error: function() {

                }
            });
        }
        /** 
         * 初始化登录界面
         */
    Login.prototype.initLogin = function() {
            $("#username").val(this.userName); //用户名
            $("#password").val(this.password); //登录密码
            $("#rememberPassword").prop("checked", true);
        }
        /**
         * 记住
         */

    Login.prototype.rememberPassword = function() {
            localStorage.setItem('userInfo', JSON.stringify(this));
            // $.cookie('userInfo', JSON.stringify(loginInfo), { expires: 7 })
        }
        /**
         * 不记住
         */
    Login.prototype.noRememberPassword = function() {
            localStorage.setItem('userInfo', "");
            //$.cookie('userInfo', JSON.stringify(loginInfo), { expires: 0 });
        }
        /** 
         * 获取所填写的参数
         */
    function getParams() {
        var userName = $("#username").val(); //用户名
        var password = $("#password").val(); //登录密码
        var code = $("#code").val(); //验证码
        //用户名、密码、验证码的非空验证
        var loginInfo = new Login(userName, password, code);
        return loginInfo;
    }
    $(function() {
        var userInfoString = localStorage.getItem('userInfo');
        if (userInfoString != "" && userInfoString != null && userInfoString != undefined) {
            var userInfoTemp = JSON.parse(userInfoString);
            var userInofo = new Login(userInfoTemp.userName, userInfoTemp.password, "");
            userInofo.initLogin();
        }
        //切换登录方式
        $('.loginTab').find("li").on("click", function() {
            var $this = $(this);
            if (!$this.hasClass("active")) {
                $this.addClass('active').siblings("li").removeClass('active');
                var type = $this.attr("data-t");
                $("#loginForm").find("." + type).css('display', '').siblings(".loginType").css('display', 'none');
                $('#password').val() == '';

                $('#code').val() == ""
            }
        });
        var ferrer = document.referrer;
        //点击登录按钮
        $(".loginBtn").off("click").on("click", function() {
            var loginInfo = getParams();
            if (loginInfo.verificationParams()) {
                loginInfo.submitParams();
            }
            if ($('#username').val() == "nannan" && $('#password').val() == '123456' && $('#code').val() != "") {
                window.open('./homePage.html')
            }
        });
        var BASEPATH = $("input[type=hidden][name=BASEPATH]").val();

        function change() {
            $("[name=patchca]").attr("src", BASEPATH + "ipgs/getPatchca.do?r=" + new Date());
        }
        //验证码图片切换
        $("[name=patchca]").on('click', change);
        $("input[name=userprotocol]").click(function() {
            if ($(this).is(':checked')) {
                $(this).closest('tr').next().find('.regBtn').prop("disabled", false);
            } else {
                $(this).closest('tr').next().find('.regBtn').prop("disabled", true);
            }
        });
        //记住密码
        $("#rememberPassword").off("click").on("click", function() {
            var $this = $(this);
            var loginInfo = getParams();
            if ($this.prop("checked")) {
                loginInfo.rememberPassword();
            } else {
                loginInfo.noRememberPassword();
            }
        });
    })
})();