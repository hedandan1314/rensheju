$(function() {
    //賬戶輸入框失去焦點
        /*旧密码输入框失去焦点*/
       function validateOldPwd(oldPwd) {
		reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
		if(oldPwd == "") {
			$('#oldPwd').removeClass("checkedN");
			$('#oldPwd').addClass("errorC");
			$('#oldPwd').next().html("密码不能为空！");
			$('#oldPwd').next().css("display", "block");
			//alert('注册失败,密码不能为空！');
			
			return false;
		}
		if(!reg.test(oldPwd)) {
			$('#oldPwd').removeClass("checkedN");
			$('#oldPwd').addClass("errorC");
			$('#oldPwd').next().html("密码为6~12位的数字、字母或特殊字符！");
			$('#oldPwd').next().css("display", "block");
			//alert('注册失败,密码为6~12位的数字、字母或特殊字符！');
			
			return false;
		}
		$('#oldPwd').addClass("checkedN");
		$('#oldPwd').removeClass("errorC");
		$('#oldPwd').next().empty();
		return true;
	}
	//注册确认密码验证
	function validateNewPwd(newPwd) {
		if(newPwd == "") {
			$('#newPwd').removeClass("checkedN");
			$('#newPwd').addClass("errorC");
			$('#newPwd').next().html("密码不能为空！");
			$('#newPwd').next().css("display", "block");
			//alert('注册失败,密码不能为空！');
			
			return false;
		}
		if(!reg.test(newPwd)) {
			$('#newPwd').removeClass("checkedN");
			$('#newPwd').addClass("errorC");
			$('#newPwd').next().html("密码为6~12位的数字、字母或特殊字符！");
			$('#newPwd').next().css("display", "block");
			//alert('注册失败,密码为6~12位的数字、字母或特殊字符！');
			
			return false;

		}
		$('#newPwd').addClass("checkedN");
		$('#newPwd').removeClass("errorC");
		$('#newPwd').next().empty();
		return true;
	}
	//确认密码验证
	function validateSurePwd(newPwd,surePwd) {
		if(surePwd == "") {
			$('#surePwd').removeClass("checkedN");
			$('#surePwd').addClass("errorC");
			$('#surePwd').next().html("密码不能为空！");
			$('#surePwd').next().css("display", "block");
			//alert('注册失败,密码不能为空！');
			
			return false;
		}
		if(!reg.test(surePwd)) {
			$('#surePwd').removeClass("checkedN");
			$('#surePwd').addClass("errorC");
			$('#surePwd').next().html("密码为6~12位的数字、字母或特殊字符！");
			$('#surePwd').next().css("display", "block");
			//alert('注册失败,密码为6~12位的数字、字母或特殊字符！');
			
			return false;

		}
		if(newPwd!= surePwd) {
			$('#surePwd').removeClass("checkedN");
			$('#surePwd').addClass("errorC");
			$('#surePwd').next().html("两次密码输入不一致，请重新输入");
			//alert('注册失败,两次密码输入不一致，请重新输入');
			
			return false;
		}
		$('#surePwd').addClass("checkedN");
		$('#surePwd').removeClass("errorC");
		$('#surePwd').next().empty();
		return true;
	}
        $("#oldPwd").blur(function() {
        	var oldPwd = $('#oldPwd').val();
        	validateOldPwd(oldPwd)
        });
        /*新密码输入框失去焦点*/
        $("#newPwd").blur(function() {
        	var newPwd = $('#newPwd').val();
        	validateNewPwd(newPwd)
        });
        /* 确认密码输入框 */
        $("#surePwd").blur(function() {
        	 var newPwd = $('#newPwd').val();
      var surePwd = $('#surePwd').val();
      validateSurePwd(newPwd,surePwd)
        });
    var userInfo=JSON.parse($.cookie('PHPSESSID'));
    $('#submitBtn1').click(function() {
    	//console.log(userInfo)
        //收集数据
        var oldPwd = $('#oldPwd').val();
        var newPwd = $('#newPwd').val();
        var surePwd = $('#surePwd').val();
        var userCode=userInfo.userCode;
       if(validateOldPwd(oldPwd)&&validateNewPwd(newPwd)&&validateSurePwd(newPwd,surePwd)){
       	      //发送ajax请求
        $.ajax({
            url: ipAddress + '/usrmgr/modifyPwd',
            type: 'post',
            data: {
                "oldPwd": oldPwd,
                "newPwd": newPwd,
                "userCode":userCode
            },
            success: function(result) {
                //console.log(result);
               if(result.code==1003){
               	alert(result.message)
               	 $('#oldPwd').val("");
               	 $('#oldPwd').removeClass("checkedN");
         $('#newPwd').val("");
          $('#newPwd').removeClass("checkedN");
         $('#surePwd').val("");
          $('#surePwd').removeClass("checkedN");
               }
               if(result.code==1004){
               	  	  var userInfo=JSON.parse($.cookie('PHPSESSID'));
            	  userInfo.userPwd=newPwd;
                  $.cookie('PHPSESSID',JSON.stringify(userInfo) );
               	alert(result.message);
               	 location.href = './login.html';
             
               }

            },
            error: function() {
                alert("修改失败，请重新输入")
            }
        })
       }
  
    })
})