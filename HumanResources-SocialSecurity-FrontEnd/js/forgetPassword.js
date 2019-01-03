$(function() {
	//賬戶輸入框失去焦點
	(function login_validate() {
		/* 手机输入框失去焦点 */
		$("#userCode").blur(function() {
			reg = /^1[3|4|5|8][0-9]\d{4,8}$/i; //验证手机正则(输入前7位至11位)

			if($(this).val() == "") {
				$(this).addClass("errorC");
				$(this).next().html("手机号码不能为空！");
				$(this).next().css("display", "block");
			} else if($("#userCode").val().length < 11) {
				$(this).removeClass("checkedN");
				$(this).addClass("errorC");
				$(this).next().html("手机号码长度有误！");
				$(this).next().css("display", "block");
			} else if(!reg.test($("#userCode").val())) {
				$(this).removeClass("checkedN");
				$(this).addClass("errorC");
				$(this).next().html("手机号码不存在!");
				$(this).next().css("display", "block");
			} else {
				$(this).addClass("checkedN");
				$(this).removeClass("errorC");
				$(this).next().empty();
			}
		});
		/* 身份證输入框失去焦点 */
		$("#userIdentity").blur(function() {
			reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //身份证号（18位）正则

			if($(this).val() == "") {
				$(this).addClass("errorC");
				$(this).next().html("身份证不能为空！");
				$(this).next().css("display", "block");
			} else if(!reg.test($("#userIdentity").val())) {
				$(this).removeClass("checkedN");
				$(this).addClass("errorC");
				$(this).next().html("身份证号不存在!");
				$(this).next().css("display", "block");
			} else {
				$(this).addClass("checkedN");
				$(this).removeClass("errorC");
				$(this).next().empty();
			}
		});
		/*密码框失去焦点*/
		$("#newPwd").blur(function() {
			reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

			if($(this).val() == "") {
				$(this).addClass("errorC");
				$(this).next().html("密码不能为空！");
				$(this).next().css("display", "block");

			} else if(!reg.test($("#userPwd").val())) {
				$(this).removeClass("checkedN");
				$(this).addClass("errorC");
				$(this).next().html("密码为6~12位的数字、字母或特殊字符！");
				$(this).next().css("display", "block");
			} else {
				$(this).addClass("checkedN");
				$(this).removeClass("errorC");
				$(this).next().empty();
			}
		});
		/* 确认密码输入框 */
		$("#sureNewPwd").blur(function() {
			reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

			if($(this).val() == "") {
				$(this).addClass("errorC");
				$(this).next().html("密码不能为空！");
				$(this).next().css("display", "block");

			} else if(!reg.test($("#surePwd").val())) {
				$(this).removeClass("checkedN");
				$(this).addClass("errorC");
				$(this).next().html("密码为6~12位的数字、字母或特殊字符！");
				$(this).next().css("display", "block");
			} else {
				$(this).addClass("checkedN");
				$(this).removeClass("errorC");
				$(this).next().empty();
			}
			if($('#newPwd').val() != $('#sureNewPwd').val()) {
				$(this).removeClass("checkedN");
				$(this).addClass("errorC");
				$('#sureNewPwd').next().html("两次密码输入不一致，请重新输入");
			}
		});
	})();
	$('#submitBtn').click(function() {
		//收集数据
		var userCode = $('#userCode').val();
		var userIdentity = $('#userIdentity').val();
		if(userCode == '') {
			alert('提交失败,手机号码不能为空');
			return false;
		}
		if(userIdentity == '') {
			alert('提交失败,身份证号码不能为空');
			return false;
		} //else {
		//     location.href = './forgetPassword1.html';
		// }

		//发送ajax请求
		$.ajax({
			url: ipAddress + '/usrmgr/verifyUser',
			type: 'post',
			data: {
				"userCode": userCode,
				"userIdentity": userIdentity
			},
			success: function(result) {
				console.log(result);
				if(result.code == 1000) { //手机错误，身份证正确
					alert("手机号码输入错误，请重新输入")
					$('#userCode').val("");
					$('#userCode').removeClass("checkedN");
				} else if(result.code == 1005) { //该用户{0}与其身份证号{1}不匹配!手机正确，身份证错误
					alert(result.message);
					$('#userCode').val("");
					$('#userIdentity').val("");
					$('#userCode').removeClass("checkedN");
					$('#userIdentity').removeClass("checkedN");
				} else {
					location.href = './forgetPassword1.html';
					$.cookie('newPW', result);
				}
				//              if (result.code == 1001) {
				//              	alert(result.message)
				//                 // location.href = './forgetPassword1.html';
				//              }                                                  
			},
			error: function() {
				alert("系统未知错误，请联系管理员!")
			}
		})

	})
	$('#submitBtn2').off('click').click(function() {
		//收集数据
		var newPwd = $('#newPwd').val();
		var sureNewPwd = $('#sureNewPwd').val();
		if(newPwd == '') {
			alert('提交失败,新密码不能为空');
			return false;
		}
		if(sureNewPwd == '') {
			alert('提交失败,确认密码不能为空');
			return false;
		} //else {
		//     location.href = './forgetPassword1.html';
		// }
		if(newPwd!=sureNewPwd){
			alert('两次密码输入不一致，请重新输入');
			return false;
		}
		var params = {
			"token": $.cookie('newPW'),
			"newPwd": newPwd
		}

		$.ajax({
			type: "post",
			url: ipAddress + '/usrmgr/resetPwd',
			async: true,
			data:  params,
			success: function(result) {
				console.log(result);
//				if(result.code == 1003) {
//					alert(result.message)
//					$('#newPwd').val("");
//					$('#sureNewPwd').val("");
//				}
				if(result.code == 1020) {
					alert(result.message)
//					var userInfo = JSON.parse($.cookie('PHPSESSID'));
//					console.log(userInfo)
//					userInfo.userPwd = newPwd;
//					$.cookie('PHPSESSID', JSON.stringify(userInfo));
					location.href = './login.html';

				}

			},
			error: function() {
				alert("系统未知错误，请联系管理员!")
			}
		});
	})
})