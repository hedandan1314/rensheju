$(function() {
    //賬戶輸入框失去焦點
function validateNewPhone(newPhone) {
		reg = /^[1][3,4,5,7,8][0-9]{9}$/; //验证手机正则(输入前7位至11位)
		if(newPhone == "") {
			$('#newPhone').removeClass("checkedN");
			$('#newPhone').addClass("errorC");
			$('#newPhone').next().html("手机号码不能为空！");
			$('#newPhone').next().css("display", "block");
			//alert('注册失败,手机号码不能为空');
	
			return false;
		}
		if(newPhone.length != 11) {
			$('#newPhone').removeClass("checkedN");
			$('#newPhone').addClass("errorC");
			$('#newPhone').next().html("手机号码长度有误！");
			$('#newPhone').next().css("display", "block");
			//alert('注册失败,手机号码长度有误！');
	
			return false;
		}
		if(!reg.test(newPhone)) {
			$('#newPhone').removeClass("checkedN");
			$('#newPhone').addClass("errorC");
			$('#newPhone').next().html("手机号码不存在!");
			$('#newPhone').next().css("display", "block");
			//alert('注册失败,手机号码不存在!');
		
			return false;
		}
		$('#newPhone').addClass("checkedN");
		$('#newPhone').removeClass("errorC");
		$('#newPhone').next().empty();
		return true;
	}
        /* 手机输入框失去焦点 */
        $("#newPhone").blur(function() {
           var newPhone = $('#newPhone').val();
           validateNewPhone(newPhone)
        });


     var userInfo=JSON.parse($.cookie('PHPSESSID'));
       //console.log(userInfo)
    $('#submitBtn2').click(function() {
        //收集数据
      
        var newPhone = $('#newPhone').val();
        var oldPhone=userInfo.userPhone;

        if(validateNewPhone(newPhone)){
        	     //发送ajax请求
             $.ajax({
                 url: ipAddress + '/usrmgr/modifyPhone',
                 type: 'post',
                 data: {
                     "newPhone": newPhone,
                     "oldPhone":oldPhone,
                 },
                 success: function(result) {
                 	console.log(result)
                 	if (result.code == 1002) {
                     	alert(result.message)
                     	 
                   }
                     if (result.code == 3030) {
                     	alert('修改手机号码成功')
                     	 userInfo.userPhone=newPhone;
                     $.cookie('PHPSESSID',JSON.stringify(userInfo) );
                         location.href = './personalCenter.html';
                   }
                     

               },
               error: function() {
                   alert("登录失败，请输入正确的账号与密码")
              }
           })
        }
     
    })
})