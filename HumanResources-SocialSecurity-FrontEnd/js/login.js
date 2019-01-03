$(function() {
	/*生成验证码*/
		function shuffle() {
			var arr = ['r', 'Q', '4', 'S', '6', 'w', 'u', 'D', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p',
				'q', '2', 's', 't', '8', 'v', '7', 'x', 'y', 'z', 'A', 'B', 'C', '9', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', '3', 'R',
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
			$(".reg-box .phoKey").text(ar1);
		};
		show_code();
		$(".reg-box .phoKey").click(function() {
			show_code();
		});
	//登录页面的提示文字
	//账户输入框失去焦点
	//账号验证
	function validateUserCode(userCode){
		reg = /^1[3|4|5|8][0-9]\d{4,8}$/i; //验证手机正则(输入前7位至11位)
		reg1 = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/ //统一社会信用代码 正则验证 
		if(userCode== "") {
				$("#userCode").addClass("errorC");
				$("#userCode").next().html("账号不能为空！");
				$("#userCode").next().css("display", "block");
				show_code()
				return false;
			}
$("#userCode").addClass("checkedN");
				$("#userCode").removeClass("errorC");
				$("#userCode").next().empty();
			if(reg.test(userCode) ){
				if(userCode.length !== 11) {
					$("#userCode").addClass("errorC");
					$("#userCode").next().html("账号长度有误！");
					$("#userCode").next().css("display", "block");
					show_code()
				}
			} else if(reg1.test(userCode)) {
				if(userCode.length !== 18) {
					$("#userCode").addClass("errorC");
					$("#userCode").next().html("账号长度有误！");
					$("#userCode").next().css("display", "block");
					show_code()
				}
			} else {
				$("#userCode").addClass("errorC");
				$("#userCode").next().html("账号不存在!");
				$("#userCode").next().css("display", "block");
				show_code()
			}
			return true;
	}
	//密码验证
	function validateUserPwd(userPwd) {
		reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

		if(userPwd == "") {
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
	//验证码验证
	function validateTpyzm(photokey,phoKey) {
		if(photokey == "") {
			$('.photokey').addClass("errorC");
			$('.phoKey').next().html("验证码不能为空！");
			$('.phoKey').next().css("display", "block");
			//alert('注册失败,验证码不能为空！');
			show_code();
			return false;
		}
		if(photokey != phoKey) {
			$('.photokey').removeClass("checkedN");
			$('.photokey').addClass("errorC");
			$('.phoKey').next().html("验证码输入错误！");
			$('.phoKey').next().next().css("display", "block");
			
			//alert('注册失败,验证码输入错误！');
			show_code();
			return false;
		}
		$('.photokey').removeClass("errorC");
		$('.phoKey').next().empty();
		$('.photokey').addClass("checkedN");
		return true;

	}
		$("#userCode").blur(function() {
			var userCode = $('#userCode').val();
validateUserCode(userCode)
			
		});
		/*密码输入框失去焦点*/
		$("#userPwd").blur(function() {
			var userPwd = $('#userPwd').val();
validateUserPwd(userPwd)
			
		});

		/*验证码输入框失去焦点*/
		$(".reg-box .photokey").blur(function() {
			var photokey = $('.photokey').val().toLowerCase();
			var phoKey = $(".phoKey").text().toLowerCase();
			validateTpyzm(photokey,phoKey)
		})
	$('#loginBtn').off("click").on("click",function() {
		//1.收集数据
		var userCode = $("#userCode").val();
		var userPwd = $(".admin_pwd").val();
		var photokey = $('.photokey').val().toLowerCase();
			var phoKey = $(".phoKey").text().toLowerCase();
		
		//发送ajax请求
if(validateUserCode(userCode)&&validateUserPwd(userPwd)&&validateTpyzm(photokey,phoKey)){
			$.ajax({
			url: ipAddress + '/login',
			type: 'post',
			data: {
				"userCode": userCode,
				"userPwd": userPwd
			},
			success: function(data) {
				var result = data;
				//              var expiresDate= new Date();
				//expiresDate.setTime(expiresDate.getTime() + (1*60*1000));
				$.cookie('PHPSESSID', JSON.stringify(result));
				//console.log(result);
				if(result.userType == 04 || result.userType == 03) {
					alert('登录成功')
					location.href = './homePage.html';
					show_code();
				}
				if(result.code == 1003) {
					$(".admin_pwd").addClass("errorC");
					alert(result.message);
					$(".admin_pwd").val("");
					show_code();

				}
				if(result.code == 1001) { //该用户不存在
					alert(result.message);
					$("#userCode").val("")
					$('#userCode').removeClass("checkedN");
					$("#userPwd").val("")
					$('#userPwd').removeClass("checkedN");
					$('.reg-box input.photokey').val("")
					$('.reg-box input.photokey').removeClass("checkedN");
					show_code();

				}
			},
			error: function() {
				alert("登录失败，请输入正确的账号与密码")
			}
		})
}


	})
});