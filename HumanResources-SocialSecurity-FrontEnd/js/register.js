$(function() {
	//生成驗證碼
	function shuffle() {
		var arr = ['1', 'r', 'Q', '4', 'S', '6', 'w', 'u', 'D', 'I', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
			'q', '2', 's', 't', '8', 'v', '7', 'x', 'y', 'z', 'A', 'B', 'C', '9', 'E', 'F', 'G', 'H', '0', 'J', 'K', 'L', 'M', 'N', 'O', 'P', '3', 'R',
			'5', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];
		return arr.sort(function() {
			return(Math.random() - .5);
		});
	};
	shuffle();

	function show_code() {
		var ar1 = '';
		var code = shuffle();
		for(var i = 0; i < 5; i++) {
			ar1 += code[i];
		};
		//var ar=ar1.join('');
		$(".phoKey").text(ar1);
	};
	show_code();
	$(" .phoKey").click(function() {
		show_code();
	});

	//賬戶輸入框失去焦點

	//用户名验证
	function validateUserName(userName) {
		reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证姓名正则 
		//alert(userName)
		if(userName == "") {
			$('#userName').removeClass("checkedN");
			$('#userName').addClass("errorC");
			$('#userName').next().html("真实姓名不能为空！");
			$('#userName').next().css("display", "block");
//			alert('注册失败,真实姓名不能为空');
			show_code();
			return false;
		}
		if(!reg.test(userName)) {

			$('#userName').removeClass("checkedN");
			$('#userName').addClass("errorC");
			$('#userName').next().html("姓名输入有误，请重新输入！");
			$('#userName').next().css("display", "block");
//			alert('注册失败,姓名输入有误，请重新输入！');
			show_code();
			return false;
		}
		$('#userName').addClass("checkedN");
		// $(this).removeClass("errorC");
		$('#userName').next().empty();

		return true;
	}
	//用户手机号码的验证
	function validateUserCode(userCode) {
		reg = /^[1][3,4,5,7,8][0-9]{9}$/; //验证手机正则(输入前7位至11位)
		if(userCode == "") {
			$('#userCode').removeClass("checkedN");
			$('#userCode').addClass("errorC");
			$('#userCode').next().html("手机号码不能为空！");
			$('#userCode').next().css("display", "block");
			//alert('注册失败,手机号码不能为空');
			show_code();
			return false;
		}
		if(userCode.length != 11) {
			$('#userCode').removeClass("checkedN");
			$('#userCode').addClass("errorC");
			$('#userCode').next().html("手机号码长度有误！");
			$('#userCode').next().css("display", "block");
			//alert('注册失败,手机号码长度有误！');
			show_code();
			return false;
		}
		if(!reg.test(userCode)) {
			$('#userCode').removeClass("checkedN");
			$('#userCode').addClass("errorC");
			$('#userCode').next().html("手机号码不存在!");
			$('#userCode').next().css("display", "block");
			//alert('注册失败,手机号码不存在!');
			show_code();
			return false;
		}
		$('#userCode').addClass("checkedN");
		$('#userCode').removeClass("errorC");
		$('#userCode').next().empty();
		return true;
	}
	//用户身份证验证
	function validateUserIdentity(userIdentity) {
		reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //身份证号（18位）正则

		if(userIdentity == "") {
			$('#userIdentity').removeClass("checkedN");
			$('#userIdentity').addClass("errorC");
			$('#userIdentity').next().html("身份证不能为空！");
			$('#userIdentity').next().css("display", "block");
			//alert('注册失败,身份证不能为空！');
			show_code();
			return false;
		}
		if(!reg.test(userIdentity)) {
			$('#userIdentity').removeClass("checkedN");
			$('#userIdentity').addClass("errorC");
			$('#userIdentity').next().html("身份证号不存在!");
			$('#userIdentity').next().css("display", "block");
			//alert('注册失败,身份证号不存在!');
			show_code();
			return false;
		}
		$('#userIdentity').addClass("checkedN");
		$('#userIdentity').removeClass("errorC");
		$('#userIdentity').next().empty();
		return true;
	}
	//注册密码验证
	function validateUserPwd(userPwd) {
		reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

		if(userPwd == "") {
			$('#userPwd').removeClass("checkedN");
			$('#userPwd').addClass("errorC");
			$('#userPwd').next().html("密码不能为空！");
			$('#userPwd').next().css("display", "block");
			//alert('注册失败,密码不能为空！');
			show_code();
			return false;
		}
		if(!reg.test(userPwd)) {
			$('#userPwd').removeClass("checkedN");
			$('#userPwd').addClass("errorC");
			$('#userPwd').next().html("密码为6~12位的数字、字母或特殊字符！");
			$('#userPwd').next().css("display", "block");
			//alert('注册失败,密码为6~12位的数字、字母或特殊字符！');
			show_code();
			return false;
		}
		$('#userPwd').addClass("checkedN");
		$('#userPwd').removeClass("errorC");
		$('#userPwd').next().empty();
		return true;
	}
	//注册确认密码验证
	function validateSurePwd(surePwd) {
		if(surePwd == "") {
			$('#surePwd').removeClass("checkedN");
			$('#surePwd').addClass("errorC");
			$('#surePwd').next().html("密码不能为空！");
			$('#surePwd').next().css("display", "block");
			//alert('注册失败,密码不能为空！');
			show_code();
			return false;
		}
		if(!reg.test(surePwd)) {
			$('#surePwd').removeClass("checkedN");
			$('#surePwd').addClass("errorC");
			$('#surePwd').next().html("密码为6~12位的数字、字母或特殊字符！");
			$('#surePwd').next().css("display", "block");
			//alert('注册失败,密码为6~12位的数字、字母或特殊字符！');
			show_code();
			return false;

		}
		if($('#userPwd').val() != $('#surePwd').val()) {
			$('#surePwd').removeClass("checkedN");
			$('#surePwd').addClass("errorC");
			$('#surePwd').next().html("两次密码输入不一致，请重新输入");
			//alert('注册失败,两次密码输入不一致，请重新输入');
			show_code();
			return false;
		}
		$('#surePwd').addClass("checkedN");
		$('#surePwd').removeClass("errorC");
		$('#surePwd').next().empty();
		return true;
	}
	//验证码验证
	function validateTpyzm(tpyzm,phoKeyImg) {
		if(tpyzm == "") {
			$('#tpyzm').removeClass("checkedN");
			$('#tpyzm').addClass("errorC");
			$('#tpyzm').next().html("验证码不能为空！");
			$('#tpyzm').next().css("display", "block");
			//alert('注册失败,验证码不能为空！');
			show_code();
			return false;
		}
		if(tpyzm != phoKeyImg) {
			$('#tpyzm').removeClass("checkedN");
			$('#tpyzm').addClass("errorC");
			$('#tpyzm').next().html("验证码输入错误！");
			$('#tpyzm').next().next().css("display", "block");
			
			//alert('注册失败,验证码输入错误！');
			show_code();
			return false;
		}
		$('#tpyzm').removeClass("errorC");
		$('#tpyzm').next().empty();
		$('#tpyzm').addClass("checkedN");
		return true;

	}
	/* 用户名输入框失去焦点 */

	$('#userName').blur(function() {
		var userName = $('#userName').val();
//		if(userName != '') {
			validateUserName(userName)
//		}
	})
	/* 手机输入框失去焦点 */
	$("#userCode").blur(function() {

		var userCode = $('#userCode').val();
		//if(userCode != '') {
			validateUserCode(userCode)
		//}
	});
	/* 身份證输入框失去焦点 */
	$("#userIdentity").blur(function() {

		var userIdentity = $('#userIdentity').val();
		//if(userIdentity != '') {
			validateUserIdentity(userIdentity)
		//}
	});
	/*密码输入框失去焦点*/
	$("#userPwd").blur(function() {

		var userPwd = $('#userPwd').val();
		//if(userPwd != '') {
			validateUserPwd(userPwd)
		//}
	});
	/* 确认密码输入框 */
	$("#surePwd").blur(function() {

		var surePwd = $('#surePwd').val();
		//if(surePwd != '') {
			validateSurePwd(surePwd)
		//}
	});

	/*验证码输入框失去焦点*/
	$("#tpyzm").blur(function() {

		var tpyzm = $('#tpyzm').val().toLowerCase();
		var phoKeyImg = $("#phoKyeImg").text().toLowerCase();
		//if(tpyzm != '') {
			validateTpyzm(tpyzm,phoKeyImg)
		//}
	})

	//勾选已同意，确认按钮高亮
	$('#agreeBtn').click(function() {
		// alert('111')
		if($(this).prop('checked')) {
			$('#regBtn').removeAttr('disabled').off("click").on("click",function() {
				//收集数据
				var userName = $('#userName').val();
				var userCode = $('#userCode').val();
				var userIdentity = $('#userIdentity').val();
				var userPwd = $('#userPwd').val();
				var surePwd = $('#surePwd').val();
				var tpyzm = $('#tpyzm').val().toLowerCase();
				var phoKeyImg = $("#phoKyeImg").text().toLowerCase();
				var userType = $('#userType').val();
				if(validateUserName(userName) && validateUserCode(userCode) && validateUserIdentity(userIdentity) && validateUserPwd(userPwd) && validateSurePwd(surePwd) && validateTpyzm(tpyzm,phoKeyImg)) {
					//发送ajax请
					var tt = {
						"userName": userName,
						"userCode": userCode,
						"userIdentity": userIdentity,
						"userPwd": userPwd,
						"userType": "04"
					};
					$.ajax({
						url: ipAddress + '/usrmgr/addUser',
						type: 'post',
						async: true,
						contentType: 'application/json',
						data: JSON.stringify(tt),
						success: function(data) {
							//console.log('data=', data);
							if(data.code == 1002) { //该用户已经存在
								alert(data.message);
								$('#userName').val("");
								$('#userName').removeClass("checkedN");
								$("#userCode").val("");
								$("#userCode").removeClass("checkedN");
								$("#userIdentity").val("");
								$("#userIdentity").removeClass("checkedN");
								$("#userPwd").val("");
								$("#userPwd").removeClass("checkedN");
								$("#surePwd").val("");
								$("#surePwd").removeClass("checkedN");
								$("#tpyzm").val("");
								$("#tpyzm").removeClass("checkedN");
								$('#agreeBtn').removeAttr("checked");
								$('#regBtn').attr("disabled", 'true')
show_code();
							}
							if(data.code == 1010) {
								alert(data.message)
								show_code();
								location.href = './login.html';

							}
							if(data.code == 1011) {
								alert(data.message)
								show_code();
								$('#userName').val("");
								$('#userName').removeClass("checkedN");
								$("#userCode").val("");
								$("#userCode").removeClass("checkedN");
								$("#userIdentity").val("");
								$("#userIdentity").removeClass("checkedN");
								$("#userPwd").val("");
								$("#userPwd").removeClass("checkedN");
								$("#surePwd").val("");
								$("#surePwd").removeClass("checkedN");
								$("#tpyzm").val("");
								$("#tpyzm").removeClass("checkedN");
								$('#agreeBtn').removeAttr("checked");
								$('#regBtn').attr("disabled", 'true')
							}
						},
						error: function() {
							alert('注册失败，请重新注册')
						}
					})
				}
			})

		} else {
			$('#regBtn').attr("disabled", 'true')
		}

	})
});