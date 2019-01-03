/*
 * 手机号正则表达式
 */
function isPhoneNo(phone) {
	var pattern = /^1[34578]\d{9}$/;
	return pattern.test(phone);
}
/*
 * 邮箱正则表达式
 */
function isEmailNo(email) {
	var pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	return pattern.test(email);
}
/*
 * QQ正则表达式
 */
function isQqNo(qq) {
	var pattern = /[1-9][0-9]{4,14}/;
	return pattern.test(qq);
}

/*
 *身份证正则 
 */
function isValidID(num) {
	num = num.toUpperCase();
	if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		return false;
	}
	//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	var len, re;
	len = num.length;
	if(len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);
		//检查生日日期是否正确
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if(!bGoodDay) {
			return false;
		} else {
			//将15位身份证转成18位
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for(i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return num;
		}
	}
	if(len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);
		//检查生日日期是否正确
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if(!bGoodDay) {
			return false;
		} else {
			//检验18位身份证的校验码是否正确。
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			for(i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if(valnum != num.substr(17, 1)) {
				return false;
			}
			return num;
		}
	}
	return false;
}
/*
 * 验证省份证
 */
function checkName() {
	if($.trim($('#nameNumber').val()).length == 0) {
		$('#numberError').html('身份证没有输入');
		
		return false;
	} else {
		$('#numberError').html('');
		if(isValidID($('#nameNumber').val()) == false) {
			$('#numberError').html('请输入正确的身份证');
		
			return false;
		}else {
		return true;
		}
	}
}
/*
 * 验证手机号
 */
function checkPhone() {
	if($.trim($('#telephone').val()).length == 0) {
		$('#telephoneError').html('请输入手机号码');
		
		return false;
	} else {
		$('#telephoneError').html('');
		if(isPhoneNo($('#telephone').val()) == false) {
			$('#telephoneError').html('请输入正确的手机号码');
			
			return false;
		} else {
			return true;
		}
	}
}
/*
 * 验证密码
 */
function checkPassword() {
	if($.trim($('#password').val()).length == 0) {
		$('#passwordError').html('请输入密码');
	
		return false;
	} else {
		$('#passwordError').html('');
		var rePass = $.trim($('#rePassword').val());
		var pass = $.trim($('#password').val());
		if(rePass.length != 0) {
			if(rePass != pass) {
				$('#rePasswordError').html('两次密码不一致');
				return false;
			} else {
				$('#rePasswordError').html('');
				return true;
			}
		}
	}
}
/*
 * 重复密码
 */
function checkrePassword() {
	var rePass = $.trim($('#rePassword').val());
	if(rePass.length == 0) {
		$('#rePasswordError').html('请再次输入密码');
		
		return false;
	} else {
		$('#rePasswordError').html('');
		var pass = $.trim($('#password').val());
		if(pass.length == 0) {
			$('#rePassword').val('');
			$('#passwordError').html('请再次输入密码');
		
			return false;
		} else if(rePass != pass) {
			$('#rePasswordError').html('两次密码不一致');
			return false;
		} else {
			$('#rePasswordError').html('');
			return true;
		}
	}
}

/*
 * 验证邮箱
 */
function checkEmail() {
	if($.trim($('#email').val()).length == 0) {
		$('#emailError').html('请输入邮箱');
		
		return false;
	} else {
		$('#emailError').html('');
		if(isEmailNo($('#email').val()) == false) {
			$('#emailError').html('请输入正确的邮箱');
			
			return false;
		} else {
			$('#emailError').html('');
			return true;
		}
	}
}
/*
 * 姓名验证
 */
function checkname() {
	if($.trim($('#userName').val()).length == 0) {
		$('#nameError').html('请输入真实姓名');
		
		return false;
	}
}
/*
 * 注册表单提交时验证
 */
function checkRegister() {
	if(checkPhone() == false) {
		return false;
	}
	if(checkPassword() == false) {
		return false;
	}
	if(checkrePassword() == false) {
		return false;
	}
	if(checkName() == false) {
		return false;
	}
	if(checkEmail() == false) {
		return false;
	}
	if(checkQQ() == false) {
		return false;
	}
}