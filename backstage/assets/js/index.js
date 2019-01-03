var editor = document.getElementById('informationEditor');
var userSave = document.getElementById('saveUser');
var count = 0;

function myEditor() {
	document.getElementById('information').getElementsByTagName("input")[1].removeAttribute("disabled");
	document.getElementById('information').getElementsByTagName("input")[2].removeAttribute("disabled");
	document.getElementById('information').getElementsByTagName("input")[3].removeAttribute("disabled");
	document.getElementById('information').getElementsByTagName("select")[0].removeAttribute("disabled");
	document.getElementById('information').getElementsByTagName("select")[1].removeAttribute("disabled");
	editor.innerHTML = '保存';
	count++;
	if(count == 2) {
		document.getElementById('information').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
		document.getElementById('information').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
		document.getElementById('information').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
		document.getElementById('information').getElementsByTagName("select")[0].setAttribute('disabled', 'disabled');
		document.getElementById('information').getElementsByTagName("select")[1].setAttribute('disabled', 'disabled');
		editor.innerHTML = '编辑';
		editor.setAttribute('data-dismiss', 'modal');
		count = 0;
	} else {
		editor.removeAttribute('data-dismiss')
	}
}

function restoreSettings() {
	document.getElementById('information').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("select")[0].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("select")[1].setAttribute('disabled', 'disabled');
	editor.innerHTML = '编辑';
	count = 0;
}

// 关闭窗口(×)
function closeWindow() {
	document.getElementById('information').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("select")[0].setAttribute('disabled', 'disabled');
	document.getElementById('information').getElementsByTagName("select")[1].setAttribute('disabled', 'disabled');
	editor.innerHTML = '编辑';
	count = 0;
}

// 添加附件
function addAccessory() {
	var accessory = document.getElementById('accessory').files;
	var title = document.getElementById('title').innerHTML;
	var accessory = document.getElementById('accessory').innerHTML;
	setTimeout(function() {
		if(title == '' && accessory == '') {
			alert('标题和附件不能为空')
		} else if(title == '' || title == null) {
			alert('标题不能为空')
		} else if(accessory == '' || accessory == null) {
			alert('附件不能为空')
		}
	}, 500)
}

function check(name, reg, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name).value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function check1(name, spanId, okInfo, errorInfo, countInfo, formatInfo, lengthInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var userCode = $('#account').val(); // 账号
		var registrationNumber = $('#registrationNumber').val(); // 工商注册号
		var codeReg = /^[a-zA-Z0-9]+$/;
		if(userCode != '' && userCode != undefined) {
			var userCodeLength = document.getElementById('account').value.length;
			if(userCodeLength >= 4 && userCodeLength <= 18) {
				// 验证账号
				if(!codeReg.test(userCode)) {
					oSpanNode.innerHTML = countInfo.fontcolor("red");
					document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
					flag = false;
					return false;
				} else {
					oSpanNode.innerHTML = okInfo.fontcolor("green");
					document.getElementById('addAccessory').removeAttribute('disabled');
					flag = true;
				}
			} else {
				oSpanNode.innerHTML = lengthInfo.fontcolor("red");
				document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
				flag = false;
				return false;
			}

		} else {
			if(registrationNumber != '' && registrationNumber != undefined) {
				// 验证工商注册号
				if(!codeReg.test(registrationNumber)) {
					oSpanNode.innerHTML = countInfo.fontcolor("red");
					document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
					flag = false;
					return false;
				} else {
					oSpanNode.innerHTML = okInfo.fontcolor("green");
					document.getElementById('addAccessory').removeAttribute('disabled');
					flag = true;
				}

				if(registrationNumber.length != 18) {
					oSpanNode.innerHTML = formatInfo.fontcolor("red");
					document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
					flag = false;
					return false;
				} else {
					oSpanNode.innerHTML = okInfo.fontcolor("green");
					document.getElementById('addAccessory').removeAttribute('disabled');
					flag = true;
				}
			} else {
				oSpanNode.innerHTML = okInfo.fontcolor("green");
				document.getElementById('addAccessory').removeAttribute('disabled');
				flag = true;
			}
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function editorCheck(name, spanId, okInfo, errorInfo, countInfo, formatInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var registrationNumber = $('#registrationNumber2').val(); // 工商注册号
		var codeReg = /^[a-zA-Z0-9]+$/;

		// 验证工商注册号
		if(!codeReg.test(registrationNumber)) {
			oSpanNode.innerHTML = countInfo.fontcolor("red");
			document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
			flag = false;
			return false;
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('addAccessory2').removeAttribute('disabled');
			flag = true;
		}

		// 验证工商注册号只能为18位
		if(registrationNumber.length != 18) {
			oSpanNode.innerHTML = formatInfo.fontcolor("red");
			document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
			flag = false;
			return false;
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('addAccessory2').removeAttribute('disabled');
			flag = true;
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function check2(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory1').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory1').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function check3(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		// document.getElementById('addAccessory2').removeAttribute('disabled');
		document.getElementById('addAccessory2').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		// document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
		document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function check4(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory3').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory3').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function check5(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory4').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory4').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function check6(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory5').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory5').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function check7(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory6').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory6').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证定点医疗机构编号
function checkMedical(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory2').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证参保信息 身份证
function check8(name, spanId, okInfo, errorInfo, formatInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var personIdentity = $('#personIdentity').val(); // 身份证号
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!reg.test(personIdentity)) {
			oSpanNode.innerHTML = formatInfo.fontcolor("red");
			document.getElementById('addAccessory5').setAttribute('disabled', 'disabled');
			flag = false;
			return false
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('addAccessory5').removeAttribute('disabled');
			flag = true;
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory5').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证参保信息 身份证(编辑)
function editorCheckInsuredId() {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var personIdentity = $('#insuredPerson2').val(); // 身份证号
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!reg.test(personIdentity)) {
			oSpanNode.innerHTML = formatInfo.fontcolor("red");
			document.getElementById('saveEditorInsured').setAttribute('disabled', 'disabled');
			flag = false;
			return false
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('saveEditorInsured').removeAttribute('disabled');
			flag = true;
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('saveEditorInsured').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证法人用户公司名称
function checkName(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证法人用户公司名称(编辑)
function checkName2(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory2').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证档案编号
function checkFileNumber(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证档案 姓名
function checkName(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证档案 姓名(编辑)
function editorName(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('saveFiles').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('saveFiles').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证档案 身份证
function checkIdCard(name, spanId, okInfo, errorInfo, formatInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var personIdentity = $('#idCard').val(); // 身份证号
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!reg.test(personIdentity)) {
			oSpanNode.innerHTML = formatInfo.fontcolor("red");
			document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
			flag = false;
			return false
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('addAccessory').removeAttribute('disabled');
			flag = true;
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证档案 身份证(编辑)
function editorIdCard(name, spanId, okInfo, errorInfo, formatInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var personIdentity = $('#idCard2').val(); // 身份证号
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!reg.test(personIdentity)) {
			oSpanNode.innerHTML = formatInfo.fontcolor("red");
			document.getElementById('saveFiles').setAttribute('disabled', 'disabled');
			flag = false;
			return false
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('saveFiles').removeAttribute('disabled');
			flag = true;
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('saveFiles').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证医保报销 姓名、总金额、医院(编辑)
function editor1(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('editorSaves').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('editorSaves').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证医保报销 身份证
function checkInsuranceIdCard(name, spanId, okInfo, errorInfo, formatInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var personIdentity = $('#idCard3').val(); // 身份证号
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!reg.test(personIdentity)) {
			oSpanNode.innerHTML = formatInfo.fontcolor("red");
			document.getElementById('addAccessory3').setAttribute('disabled', 'disabled');
			flag = false;
			return false
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('addAccessory3').removeAttribute('disabled');
			flag = true;
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory3').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证医保报销 身份证(编辑)
function editorInsuranceIdCard(name, spanId, okInfo, errorInfo, formatInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		var personIdentity = $('#idCard4').val(); // 身份证号
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!reg.test(personIdentity)) {
			oSpanNode.innerHTML = formatInfo.fontcolor("red");
			document.getElementById('editorSaves').setAttribute('disabled', 'disabled');
			flag = false;
			return false
		} else {
			oSpanNode.innerHTML = okInfo.fontcolor("green");
			document.getElementById('editorSaves').removeAttribute('disabled');
			flag = true;
		}
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('editorSaves').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证个人参保信息 姓名
function checkInsuredPerson(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('addAccessory5').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('addAccessory5').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

// 验证个人参保信息 姓名(编辑)
function editorCheckPerson(name, spanId, okInfo, errorInfo) {
	var flag;
	var val = document.getElementsByName(name)[0].value;
	var oSpanNode = document.getElementById(spanId);
	if(val != '') {
		oSpanNode.innerHTML = okInfo.fontcolor("green");
		document.getElementById('saveEditorInsured').removeAttribute('disabled');
		flag = true;
	} else {
		oSpanNode.innerHTML = errorInfo.fontcolor("red");
		document.getElementById('saveEditorInsured').setAttribute('disabled', 'disabled');
		flag = false;
	}
	return flag;
}

function checkTitle() {
	//定义正则表达式,a-z，长度为4,忽略大小写
	var reg = new RegExp("/^\s*$/g");
	check("editorTitle", reg, "namespan", "正确", "不能为空");
}

function addCheckTitle() {
	check1("addTitle", "titlespan", "正确", "不能为空", "不能出现中文", "格式不正确", "长度必须大于等于5,小于等于18");
}

// 新录档案编号
function addFileNumber() {
	checkFileNumber("addTitle", "titlespan", "正确", "不能为空");
}

// 新录档案 姓名
function addCheckUserName() {
	checkName("addUserName", "titleName", "正确", "不能为空");
}

// 新录档案 身份证
function addCheckIdCard() {
	checkIdCard("addIdCard", "titleIdCard", "正确", "不能为空", "格式不正确");
}

// 公司名称
function addCheckName() {
	checkName("addCompanyName", "titlespan2", "正确", "不能为空");
}

// 编辑公司名称
function editorCheckName() {
	checkName2("companyName2", "editorNameSpan", "正确", "不能为空");
}

// 编辑档案 姓名
function editorCheckUserName() {
	editorName("userName2", "titleName2", "正确", "不能为空")
}
// 编辑档案 身份证
function editorCheckIdCard() {
	editorIdCard("idCard2", "titleIdCard2", "正确", "不能为空", "格式不正确");
}

function editorCheckTitle() {
	editorCheck("editorTitle", "editorTitleSpan", "正确", "不能为空", "不能出现中文", "格式不正确");
}

// 新增个人参保信息 姓名
function addInsuredPerson() {
	checkInsuredPerson("insuredPerson", "spanTipInsuredPerson", "正确", "不能为空");
}

// 编辑个人参保信息 姓名
function editorInsuredPerson() {
	editorCheckPerson("insuredPerson2", "spanTipInsuredPerson2", "正确", "不能为空");
}

// 新增个人参保信息 身份证
function addPersonalNumber3() {
	check8("addTitle1", "spanTip4", "正确", "不能为空", "格式不正确");
}

// 编辑个人参保信息 身份证
function editorInsuredId() {
	editorCheckInsuredId("personIdentity2", "spanTipPersonIdentity", "正确", "不能为空", "格式不正确");
}

function addCheckPeople() {
	check1("peopleNumber", "peopleSpan", "正确", "不能为空");
}

function addCheckWorker() {
	check1("workerNumber", "workerSpan", "正确", "不能为空");
}

function addCheckOld() {
	check1("oldNumber", "oldSpan", "正确", "不能为空");
}

function editorPersonalNumber3() {
	check2("addNumber5", "spanTip5", "正确", "不能为空");
}

function editorworkerNumber() {
	check2("addworker", "workerspan1", "正确", "不能为空");
}

function editorpeopleNumber() {
	check2("addpeople", "peoplespan1", "正确", "不能为空");
}

function editorAgencyTitle() {
	check3("addNumber1", "spanTip1", "正确", "不能为空");
}

function editorNameTitle() {
	check3("agencyName2", "agencySpan", "正确", "不能为空");
}

function editorWantTitle() {
	check3("addWantNumber1", "WantSpan", "正确", "不能为空");
}

function editorPeopleTitle() {
	check3("addPeople", "peopleSpanTip", "正确", "不能为空");
}

// 新录医保报销 姓名
function addInsuranceName() {
	check4("userName3", "spanTipName", "正确", "不能为空");
}

// 编辑医保报销 姓名
function editorInsuranceName() {
	editor1("userName4", "spanTipName2", "正确", "不能为空");
}

// 新录医保报销 身份证
function addInsuranceId() {
	checkInsuranceIdCard("idCard3", "spanTipId", "正确", "不能为空", "格式不正确");
}

// 编辑医保报销 身份证
function editorInsuranceId() {
	editorInsuranceIdCard("idCard4", "spanTipId2", "正确", "不能为空", "格式不正确")
}

// 新录医保报销 总金额
function addTotalAmount() {
	check4("totalAmount", "spanTipAmount", "正确", "不能为空");
}

// 编辑医保报销 总金额
function editorInsuranceTotal() {
	editor1("totalAmount2", "spanTipAmount2", "正确", "不能为空");
}

// 新录医保报销 医院
function addHospital() {
	check4("hospital", "spanTipHospital", "正确", "不能为空");
}

// 编辑医保报销 医院
function editorInsuranceHospital() {
	editor1("hospital2", "spanTipHospital2", "正确", "不能为空");
}

function addCheckPeople1() {
	check4("peopleNumber1", "peopleSpan1", "正确", "不能为空");
}

function addCheckWorker1() {
	check4("workerNumber1", "workerSpan1", "正确", "不能为空");
}

function addCheckOld1() {
	check4("oldNumber1", "oldSpan1", "正确", "不能为空");
}

function addCheckTitle1() {
	check5("addTitle1", "titlespan1", "正确", "不能为空");
}

function addCheckPeople2() {
	check5("peopleNumber2", "peopleSpan2", "正确", "不能为空");
}

function addCheckWorker2() {
	check5("workerNumber2", "workerSpan2", "正确", "不能为空");
}

function addCheckOld2() {
	check5("oldNumber2", "oldSpan2", "正确", "不能为空");
}

function editorPersonalNumber1() {
	check6("addNumber4", "spanTip4", "正确", "不能为空");
}

function editorworkerNumber1() {
	check6("addworker1", "workerspan", "正确", "不能为空");
}

function editorpeopleNumber1() {
	check6("addpeople1", "peoplespan", "正确", "不能为空");
}

function addAgencyNumber() {
	check7("addNumber", "spanTip", "正确", "不能为空");
}

// 新增定点医疗机构编号
function addMedicalNumber() {
	checkMedical("addNumber", "spanTip", "正确", "不能为空");
}

function editorNameTitle1() {
	check7("agencyName", "agencySpan1", "正确", "不能为空");
}

function editorWantTitle1() {
	check7("addWantNumber", "WantSpan1", "正确", "不能为空");
}

function editorPeopleTitle1() {
	check7("addPeople2", "peopleSpanTip1", "正确", "不能为空");
}

function editorArchives() {
	check8("addNumber3", "spanTip3", "正确", "不能为空");
}

function addCheckPeople3() {
	check8("peopleNumber3", "peopleSpan3", "正确", "不能为空");
}

function addCheckWorker3() {
	check8("workerNumber3", "workerSpan3", "正确", "不能为空");
}

function addCheckOld3() {
	check8("oldNumber3", "oldSpan3", "正确", "不能为空");
}

function myModal() {
	var title = document.getElementsByName('addTitle')[0].value;
	if(title == '') {
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
	}
}

function myModal2() {
	var title = document.getElementsByName('addNumber5')[0].value;
	if(title == '') {
		document.getElementById('addAccessory1').setAttribute('disabled', 'disabled');
	}
}

// 新录医疗机构
function myModalMedical() {
	var title = document.getElementsByName('addNumber')[0].value;
	if(title == '') {
		document.getElementById('addAccessory2').setAttribute('disabled', 'disabled');
	}
}

function myModal3() {
	var title = document.getElementsByName('addNumber2')[0].value;
	if(title == '') {
		document.getElementById('addAccessory3').setAttribute('disabled', 'disabled');
	}
}

// 新录医保报销
function myModalReimburse() {
	var title = document.getElementsByName('userName3')[0].value;
	if(title == '') {
		document.getElementById('addAccessory3').setAttribute('disabled', 'disabled');
	}
}

function myModal4() {
	var title = document.getElementsByName('addNumber2')[0].value;
	if(title == '') {
		document.getElementById('addAccessory3').setAttribute('disabled', 'disabled');
	}
}

function myModal5() {
	var title = document.getElementsByName('insuredPerson')[0].value;
	if(title == '') {
		document.getElementById('addAccessory5').setAttribute('disabled', 'disabled');
	}
}

function myModal6() {
	var title = document.getElementsByName('addNumber4')[0].value;
	if(title == '') {
		document.getElementById('addAccessory4').setAttribute('disabled', 'disabled');
	}
}

function myModal7() {
	var title = document.getElementsByName('addNumber')[0].value;
	if(title == '') {
		document.getElementById('addAccessory5').setAttribute('disabled', 'disabled');
	}
}

function myModal8() {
	var title = document.getElementsByName('addNumber3')[0].value;
	if(title == '') {
		document.getElementById('addSaves').setAttribute('disabled', 'disabled');
	}
}

function myModal9() {
	var title = document.getElementsByName('addTitle1')[0].value;
	if(title == '') {
		document.getElementById('addAccessory').setAttribute('disabled', 'disabled');
	}
	//	alert("aaa")
	document.getElementById("attachFlowchart2").src = '';
	$("#attachFlowchart2").attr('src', '')
	$("#titlespan1").text("");
	$('#quxiao').hide();
	$('#serviceName').val("");
	$('#proceedPrice').val("");
	$('#promisePeriod').val("");
	$('#consultPhone').val("");
	$('#proceedPeriod').val("");
	$('#proceedPlace').val("");
	$('.nicEdit-main').eq(0).html("");
	$('.nicEdit-main').eq(1).html("");
	if($("input[type='checkbox']").is(':checked')) {
		$('#canOnline').removeAttr('checked');
	}
	canOnline = 0;
	$("input[name='serviceStatus']").removeAttr('checked');
	$("input[name='companyStatus']").removeAttr('checked');
	$("#tab_fam  tr:not(:first)").empty("")
	$('input[type="file"]').val(""); 
	//alert($('.checkbox-inline').html())
}

function formReset() {
	document.getElementById("myForm").reset()
}

function showthis1(obj) {
	var x = $(obj).parent().parent().find("td");
	var countryName = x.eq(0).text();
	var peoples = x.eq(1).text();
	var workers = x.eq(2).text();
	var residents = x.eq(3).text();
	$("#account2").val(countryName);
	$("#userName3").val(peoples);
	$("#userName4").val(workers);
	$("#idCard2").val(residents);
}

function showthis2(obj) {
	var x = $(obj).parent().parent().find("td");
	var countryName = x.eq(0).text();
	var peoples = x.eq(1).text();
	var workers = x.eq(2).text();
	$("#agencyNumber2").val(countryName);
	$("#agencyName4").val(peoples);
	$("#agencyName5").val(workers);

}

function showthis3(obj) {
	var x = $(obj).parent().parent().find("td");
	var countryName = x.eq(0).text();
	var peoples = x.eq(1).text();
	var workers = x.eq(2).text();
	var residents = x.eq(3).text();
	$("#agencyNumber3").val(countryName);
	$("#agencyName6").val(peoples);
	$("#agencyName7").val(workers);
	$("#address4").val(residents);
}

function showthis4(obj) {
	var x = $(obj).parent().parent().find("td");
	var countryName = x.eq(0).text();
	var peoples = x.eq(1).text();
	var workers = x.eq(2).text();
	var residents = x.eq(3).text();
	$("#personalNumber").val(countryName);
	$("#userName5").val(peoples);
	$("#idCard3").val(workers);
	$("#totalAmount1").val(residents);
}