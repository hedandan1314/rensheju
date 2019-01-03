// 退出登录
function exitLogon() {
    //  sessionStorage.removeItem('userInfo');
    sessionStorage.clear();
    $.cookie('userInfo', null);
    location.href = './login.html';
}



// 修改密码
function changePwd() {
    var val1 = $('form:last input:eq(0)').val();
    var val2 = $('form:last input:eq(1)').val();
    var val3 = $('form:last input:eq(2)').val();
    var userCode = JSON.parse($.cookie('userInfo')).userCode;
    var parameter = {
        "oldPwd": val1,
        "newPwd": val2,
        "userCode": userCode

    }
    if (val1 != '' && val2 != '' && val3 != '') {
        if (val2 == val3) {
            $.ajax({
                type: 'POST',
                url: ipAddress + '/usrmgr/modifyPwd',
                data: parameter,
                success: function(result) {
                    console.log('result=', result);
                    if (result.code == 1003) {
                        alert('原密码不正确，请重新输入')
                    } else {
                        sessionStorage.clear();
                        $.cookie('userInfo', null);
                        location.href = './login.html';
                    }
                },
                error: function() {
                    alert('失败')
                }
            })
        } else {
            alert('两次密码不一致,请重新输入');
            formReset();
        }
    } else {
        alert('密码不能为空!')
    }


}

// 重置表单
function formReset() {
    document.getElementById('formInformation').reset();
}

var userInfo = JSON.parse($.cookie('userInfo'));
// console.log($.cookie('userPhone'));

$('#userId').val(userInfo.userCode);
$('#userName').val(userInfo.userName);
$('#phone').val($.cookie('userPhone'));
$('#remark').val($.cookie('userRemark'));
$('#multiSelect').val(userInfo.ownerDepart);
$('#multiSelect2').val(userInfo.roleType);

$('#usersName').html(userInfo.userName);


function myEditor() {
    document.getElementById('information').getElementsByTagName("input")[1].removeAttribute("disabled");
    document.getElementById('information').getElementsByTagName("input")[2].removeAttribute("disabled");
    document.getElementById('information').getElementsByTagName("input")[3].removeAttribute("disabled");
    // document.getElementById('information').getElementsByTagName("select")[0].removeAttribute("disabled");
    // document.getElementById('information').getElementsByTagName("select")[1].removeAttribute("disabled");
    editor.innerHTML = '保存';
    count++;
    if (count == 2) {
        document.getElementById('information').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
        document.getElementById('information').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
        document.getElementById('information').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
        // document.getElementById('information').getElementsByTagName("select")[0].setAttribute('disabled', 'disabled');
        // document.getElementById('information').getElementsByTagName("select")[1].setAttribute('disabled', 'disabled');
        editor.innerHTML = '编辑';
        editor.setAttribute('data-dismiss', 'modal');
        count = 0;
        var parameter = {
            "userCode": userInfo.userCode,
            "userName": $('#userName').val(),
            "ownerDepart": $('#multiSelect option:selected').val(),
            "roleType": $('#multiSelect2 option:selected').val(),
            "userPhone": $('#phone').val(),
            "userRemark": $('#remark').val(),
            "userType": userInfo.userType
        }
        var userPhone = $('#phone').val();
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (userPhone != '') {
            if (!reg.test(userPhone)) {
                alert('手机号不正确!');
                $('#userName').val(userInfo.userName);
                $('#phone').val($.cookie('userPhone'));
                $('#remark').val($.cookie('userRemark'));
                return false;
            } else {
                $.ajax({
                    type: 'POST',
                    url: ipAddress + '/usrmgr/modifyUser',
                    data: JSON.stringify(parameter),
                    contentType: 'application/json;charset=UTF-8',
                    success: function(result) {
                        console.log('result=', result);
                        if (result.code == 3030) {
                            $.cookie("userPhone", userPhone);
                            // alert('修改成功')
                        } else {
                            alert('修改失败')
                        }
                    },
                    error: function() {
                        alert('失败')
                    }
                })
            }
        } else {
            $.ajax({
                type: 'POST',
                url: ipAddress + '/usrmgr/modifyUser',
                data: JSON.stringify(parameter),
                contentType: 'application/json;charset=UTF-8',
                success: function(result) {
                    console.log('result=', result);
                    if (result.code == 3030) {
                        // alert('修改成功')
                    } else {
                        alert('修改失败')
                    }
                },
                error: function() {
                    alert('失败')
                }
            })
        }

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