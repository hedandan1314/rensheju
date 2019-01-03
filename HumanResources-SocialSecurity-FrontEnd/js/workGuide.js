$(function() {
    function getParam(url, name) {
        try {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = url.split('?')[1].match(reg);
            if (r != null) {
                return r[2];
            }
            return ""; //如果此处只写return;则返回的是undefined
        } catch (e) {
            return ""; //如果此处只写return;则返回的是undefined
        }
    };
    /* 办事指南 */
    $(".list").find("li").on("mouseover", function() {
        $(this).children().first().children().first().css("display", "none").next().css("display", "inline-block");
        $(this).children().last().css('color', '#0784be')
    }).on("mouseout", function() {
        $(this).children().first().children().first().css("display", "inline-block").next().css("display", "none");
        $(this).children().last().css('color', '')
    });
    
        //获取href传的值
    var urlTemp = window.location.href;
    var serviceCode = getParam(urlTemp, "serviceCode");
    // alert(serviceCode);
    var guideInfo = {
        "serviceCode": serviceCode
    }
    var html = '';
    $.ajax({
        type: "post",
        url: ipAddress + "/service/detailProcedureGuideAll",
        async: true,
        data: JSON.stringify(guideInfo),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
           // console.log("result=", result)
            $('#serviceName').html(result.serviceName); //事项类型			
            $('#categoryInstitution').html(result.categoryInstitution); //下属单位
            $('#orgName').html(result.orgName); //所属机构
            $('#consultPhone').html(result.consultPhone); //咨询电话
            $('#proceedPrice').html(result.proceedPrice); //收费标准
            $('#promisePeriod').html(result.promisePeriod); //承诺期限
            $('#proceedPeriod').html(result.proceedPeriod); //办理时间
            $('#proceedPlace').html(result.proceedPlace); //办理地点
            $('#proceedCondition').html(result.proceedCondition); //受理条件
            $('#proceedMaterial').html(result.proceedMaterial); //办理材料
            /* 办理流程 */
         
           if(result.attachFlowchart==''){
           	$('.layer-txt button').attr("disabled","disabled");
           
           }else{
           	$('.layer-txt button').removeAttr("disabled");;
           	$('.layer-txt button').on('click', function() {
        $(this).siblings().css('display', 'block')
    });
    $('.close').on('click', function() {
        $(this).parent().css('display', 'none');
        $(this).parent().next().css('display', 'none');
    }).on('mouseover', function() {
        $(this).css('color', '#e60c17')
    }).on('mouseout', function() {
        $(this).css('color', '')
    })
    $('.light').attr('style', 'overflow-x:hidden')
            $('#attachFlowchart').attr('src', ipAddress + result.attachFlowchart); //办理流程
          
           }
    

            if (result.serviceAttachModels) {
                var j = 0;
                for (var i = 0; i < result.serviceAttachModels.length; i++) {
                    if (result.serviceAttachModels[i].attachFrom == '') {
                        continue
                    }
                    html += '<div class="first">' +
                        '<div class="fl" id="serviceAttachModels">' +
                        (j++ + 1) + "." + result.serviceAttachModels[i].attachName +
                        '</div>' +
                        '<div class="fr">' +
                        '<a href="' + ipAddress + result.serviceAttachModels[i].attachFrom + '"  download="' + result.serviceAttachModels[i].attachName + '"> <img src="./img/load.png" alt=""></a>' +
                        '</div>' +
                        '</div>'

                }
                $('#loadBtn').html(html)
            }

        }

    });
})