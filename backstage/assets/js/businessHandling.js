bkLib.onDomLoaded(function() {
	nicEditors.allTextAreas()
});

function modifyTrue() {
	document.getElementById('trueOrFalse').innerHTML = '是'
}

function modifyFalse() {
	document.getElementById('trueOrFalse').innerHTML = '否'
}

! function() {
	laydate.skin('molv'); //切换皮肤，请查看skins下面皮肤库
}();
laydate({
	elem: '#releaseTime',
	// istime: true,
	// format: 'YYYY-MM-DD hh:mm:ss',
	// min: laydate.now() //-1代表昨天，-2代表前天，以此类推
});

var flag = true;
$('.navbar-brand').click(function() {
	if(flag) {
		$("#aside").animate({
			marginLeft: '-180px'
		});
		$(".main").animate({
			marginLeft: '0px'
		});
		// $("#main", parent.document).animate({
		//     marginLeft: '0px'
		// });
		flag = false;
	} else {
		$("#aside").animate({
			marginLeft: '0px'
		});
		$(".main").animate({
			marginLeft: '180px'
		});
		// $("#main", parent.document).animate({
		//     marginLeft: '180px'
		// });
		flag = true;
	}

})

function check2(name, spanId, okInfo, errorInfo) {
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

function addServiceName() {
	check2("serviceName", "titlespan1", "正确", "不能为空");
}

$(function() {
	//	var x = 10;
	//	var y = 20;
	//	$(".images").mouseover(function(e) {
	//
	//		$("#tooltip")
	//			.css({
	//				// "top": (e.pageY + y) + "px",
	//				"top": "10px",
	//				"left": (e.pageX + x) + "px"
	//			}).show("fast"); //设置x坐标和y坐标，并且显示
	//	}).mouseout(function() {
	//
	//		$("#tooltip").hide(); //移除 
	//	}).mousemove(function(e) {
	//		$("#tooltip")
	//			.css({
	//				// "top": (e.pageY + y) + "px",
	//				"top": "10px",
	//				"left": (e.pageX + x) + "px"
	//			});
	//	});
	var addCount = 0,
		currentPage = 0;
	var dataLength;
	var userInfo = JSON.parse($.cookie('userInfo')); //根据登录获取用户信息
	//console.log(userInfo)
	$('ul.ownerDepart').find('li').click(function() {
		var a = $(this).data('id')
		//alert(a)
		sessionStorage.clear();
		sessionStorage.Value = a

	})
	var ownerDepart = sessionStorage.Value;
	var serviceName1;
	//添加业务
	$('#tableAddIn').off('click').click(function() {
		//var index = $('#removeOne tr').length;
		var tr = '<tr>' +
			'<td>' + '<input type="text" class="outLINE" name="attachName" >' +
			'</td>' +
			'<td>' + '<input type="file" class="outLINE" name="evidenceFile" >' +
			'</td>' +
			'<td>' + '<input type="checkbox" class="inlineCheckbox" value="" name="attachStatus" >' +
			'</td>' +
			'<td>' + '<input type="button" value="删除" class="removeLINE">' +
			'</td>' +
			'</tr>';
		$(this).parent().parent().next().find('table').append(tr);
		$('.removeLINE').off('click').click(function() {
			$(this).parent().parent().remove()
		})
	})
	/**
	 * 编辑业务
	 */
	//办理流程
	//	var x = 10;
	//	var y = 20;
	//	$(".images").mouseover(function(e) {
	//
	//		var tooltip = "<div id='tooltip'><img src='../assets/images/add.png'  alt='产品预览图' id='tooltip2'/><\/div>"; //创建 div 元素
	//		$("body").append(tooltip); //把它追加到文档中						 
	//		$("#tooltip")
	//			.css({
	//				// "top": (e.pageY + y) + "px",
	//				"top": "10px",
	//				"left": (e.pageX + x) + "px"
	//			}).show("fast"); //设置x坐标和y坐标，并且显示
	//	}).mouseout(function() {
	//
	//		$("#tooltip").remove(); //移除 
	//	}).mousemove(function(e) {
	//		$("#tooltip")
	//			.css({
	//				// "top": (e.pageY + y) + "px",
	//				"top": "10px",
	//				"left": (e.pageX + x) + "px"
	//			});
	//	});
	$('#tableAddIn1').off('click').click(function() {
		//var index = $('#removeOne tr').length;
		var tr = '<tr>' +
			'<td>' + '<input type="text" class="outLINE" name="attachName1" >' +
			'</td>' +
			'<td>' + '<input type="file" class="outLINE" name="evidenceFile1" >' +
			'</td>' +
			'<td>' + '<input type="checkbox" class="inlineCheckbox" value="" name="attachStatus1" >' +
			'</td>' +
			'<td>' + '<input type="button" value="删除" class="removeLINE">' +
			'</td>' +
			'</tr>';
		$(this).parent().parent().next().find('table').append(tr);
		$('.removeLINE').off('click').click(function() {
			$(this).parent().parent().remove()
		})
	})

	//提交业务
	var canOnline;
	$('#canOnline').change(function() {
		if($(this).is(':checked')) {
			canOnline = 1
		} else {
			canOnline = 0
		}
	})

	var addCount = 0;

	function actionEle() {
		this.parameter = {
			"pageIndex": 1,
			"recordCount": 5
		};
		this.totalPage = 0;
	}

	var tableGate = {};
	tableGate.actionEle = new actionEle();

	tableGate.actionEle.loadData = function() {

		$("input[type=file]").val("")

		tableGate.actionEle.parameter.criteria = {
			"ownerDepart": ownerDepart,
			"serviceName": serviceName1,
			"type": "1"
		}
		$.ajax({
			type: "post",
			url: ipAddress + "/service/queryProcedure",
			data: JSON.stringify(tableGate.actionEle.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				tableGate.actionEle.parameter.pageIndex = result.currentPage;
				tableGate.actionEle.totalPage = result.totalPage;
				var data = result.data;
				//console.log(data)
				var dataLength = result.data.length * result.totalPage;
				$(".corporationResource tr").remove();
				for(var i = 0; i < data.length; i++) {
					var html = '<tr>' +
						'<td>' + (i + 1 + addCount) +
						'</td>' +
						'<td>' + data[i].orgName +
						'</td>' +
						'<td>' + data[i].serviceName +
						'</td>' +
						'<td>' + (data[i].companyStatus == 1 ? '单位办事' : '个人办事') +
						'</td>' +
						'<td>' + data[i].serviceAuthor +
						'</td>' +
						'<td>' +
						'<a href="javascript:;" class="btn btn-default" data-toggle="modal" data-target="#editor" style="outline: none;     margin-right: 10px;"onclick="myDetai(this,' + data[i].serviceCode + ')">编辑</a>' +
						'<a href="javascript:;" class="btn btn-warning" data-toggle="modal" data-target="#delete" style="outline: none; " onclick="myDelete(this,' + data[i].serviceCode + ')">删除</a>' +
						' </td>' +
						'</tr>'
					$(".corporationResource").append(html);
				}

				//生成页码
				var totalPage = result.totalPage;
				var page = parseInt(tableGate.actionEle.parameter.pageIndex);
				//console.log("page", page)
				$(".pagination .pageNo").remove();
				if(totalPage <= 6) {
					while(totalPage > 0) {
						$("#previous").after('<li><a href=" javascript:;" class="pageNo pageNo' + totalPage + '">' + totalPage + '</a></li>');
						totalPage--
					}
				} else {
					if(page > 3 && totalPage - 2 >= page) {
						$("#previous").after('<li><a href=" javascript:;" class="pageNo pageNo' + (page - 2) + '">' + (page - 2) +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (page - 1) + '">' + (page - 1) +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (page) + '">' + page +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (page + 1) + '">' + (page + 1) +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (page + 2) + '">' + (page + 2) +
							'</a></li>');
					} else if(page > 3 && totalPage - 2 < page) {
						$("#previous").after('<li><a href=" javascript:;" class="pageNo pageNo' + (totalPage - 4) + '">' + (totalPage - 4) +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (totalPage - 3) + '">' + (totalPage - 3) +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (totalPage - 2) + '">' + (totalPage - 2) +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (totalPage - 1) + '">' + (totalPage - 1) +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo' + (totalPage) + '">' + totalPage +
							'</a></li>');
					} else {
						$("#previous").after('<li><a href=" javascript:;" class="pageNo pageNo1">' + 1 +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo2">' + 2 +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo3">' + 3 +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo4">' + 4 +
							'</a></li><li><a href=" javascript:;" class="pageNo pageNo5">' + 5 +
							'</a></li>');
					}
				}
				//获取当前页面的页码变色
				$('.pagination .pageNo' + tableGate.actionEle.parameter.pageIndex).css('background-color', '#ddd');
				//注册页码跳转事件_养老保险
				$('.pagination .pageNo').click(function() {
					addCount = $(this).text() * 5 - 5;
					tableGate.actionEle.goPage($(this).text());

				})
			},
			error: function() {
				alert('失败')
			}
		});

	}

	//上一页按钮事件
	$('.pagination #previous').click(function() {

		tableGate.actionEle.prevPage();
	})

	//下一页按钮事件
	$('.pagination #next').click(function() {

		tableGate.actionEle.nextPage();
	})

	//首页
	$('.pagination #fristPage').click(function() {
		addCount = 0 * 5;
		tableGate.actionEle.goPage(1);
		$(tableGate.actionEle).find(".pageNumber").html(1);
	})
	//尾页
	$('.pagination #lastPage').click(function() {
		addCount = 5 * tableGate.actionEle.totalPage - 5;
		tableGate.actionEle.goPage(tableGate.actionEle.totalPage);
		$(tableGate.actionEle).find(".pageNumber").html(tableGate.actionEle.totalPage);
	})

	//条件查询
	$(".searchBt").click(function() {
		serviceName1 = $("#serviceName1").val();
		tableGate.actionEle.parameter.pageIndex = 1;
		addCount = 0;
		tableGate.actionEle.loadData();
	})

	//跳转页数
	$('#jumpPage').click(function() {
		var jumPage = $("#toPage").val();
		if(jumPage < 1) {
			jumPage = 1;
			$("#toPage").val("1");
		}
		if(jumPage > tableGate.actionEle.totalPage) {
			$("#toPage").val(tableGate.actionEle.totalPage);
		}
		if(jumPage <= tableGate.actionEle.totalPage) {
			tableGate.actionEle.goPage(jumPage);
			$(".pageNumber").html(jumPage);
		} else {
			tableGate.actionEle.goPage(tableGate.actionEle.totalPage);
			$(".pageNumber").html(tableGate.actionEle.totalPage);
		}
		addCount = 5 * tableGate.actionEle.parameter.pageIndex - 5;

	})
	//声明下一页函数
	tableGate.actionEle.nextPage = function() {
		if(this.parameter.pageIndex >= tableGate.actionEle.totalPage) {
			alert('已经是最后一页');
			return;
		}
		$(this).find("tbody").html('')
		this.parameter.pageIndex++;
		tableGate.actionEle.loadData();
		addCount = tableGate.actionEle.parameter.pageIndex * 5 - 5;
	}
	//声明上一页函数
	tableGate.actionEle.prevPage = function() {
		if(this.parameter.pageIndex <= 1) {
			alert('已经是第一页');
			return;
		}
		$(this).find("tbody").html('')
		this.parameter.pageIndex--;
		tableGate.actionEle.loadData();
		addCount = tableGate.actionEle.parameter.pageIndex * 5 - 5;
	}
	//声明搜索函数
	tableGate.actionEle.search = function() {
		$(this).find("tbody").html('')
		this.parameter.pageIndex = 1;
		this.loadData();
	}
	//声明跳转函数
	tableGate.actionEle.goPage = function(pageNo) {
		this.parameter.pageIndex = pageNo;
		$(this).find("tbody").html('')
		this.loadData();
	}

	tableGate.actionEle.loadData();
	//添加业务
	$('#addAccessory').click(function() { //获取数据
		var serviceName = $.trim($('#serviceName').val()) //业务名称必填，单独获取进行必填判断  
		var serviceStatus = $("input[name='serviceStatus']:checked").val();
		var companyStatus = $("input[name='companyStatus']:checked").val();
		var userInfo = JSON.parse($.cookie('userInfo'));
		//console.log(userInfo.userName);
		var ywInfo = {
			"serviceName": serviceName, //业务名称
			"ownerDepart": $('#ownerDepart option:selected').val(), //所属部门
			"canOnline": canOnline, //能否网上办理
			"serviceStatus": serviceStatus, //正常业务、审批业务
			"companyStatus": companyStatus, //单位办事、个人办事
			"proceedPrice": $.trim($('#proceedPrice').val()), //收费标准
			"promisePeriod": $.trim($('#promisePeriod').val()), //承诺期限
			"consultPhone": $.trim($('#consultPhone').val()), //咨询电话
			"proceedPeriod": $.trim($('#proceedPeriod').val()), //办理时间
			"proceedPlace": $.trim($('#proceedPlace').val()), //办理地点
			"proceedCondition": $('.nicEdit-main').eq(0).html(), //受理条件
			"proceedMaterial": $('.nicEdit-main').eq(1).html(), //办理材料
			"serviceType": "01",
			"serviceAuthor": userInfo.userName
			//        		"attachFlowchart"://办理流程

		}

		//附件名称循环遍历
		var arr = [];
		for(var i = 0; i < $("input[name=attachName]").length; i++) {
			arr.push($("input[name=attachName]").eq(i).val());
		}
		//console.log("arr=" + arr.toString());

		var att = [];
		//		alert($("input[name=attachStatus]").length)
		for(var i = 0; i < $("input[name=attachStatus]").length; i++) {
			var status;
			if($("input[name=attachStatus]").eq(i).prop("checked")) {
				status = 1;
			} else {
				status = 0;
			}
			att.push(status);
		}
		//console.log("att=" + att);
		//		alert(canOnline)
		var formData = new FormData($("#addYw")[0]);
		formData.append("ywInfo", JSON.stringify(ywInfo));
		formData.append("filesStatus", att.toString());
		formData.append("name123", arr.toString());

		if(serviceName == '') {
			alert('业务名称不能为空')
		} else {

			$.ajax({
				type: 'post',
				url: ipAddress + '/service/addProcedureGuide',
				data: formData,
				async: false,
				cache: false,
				contentType: false,
				processData: false,
				success: function(result) {
					//console.log('result=', result);
					alert('添加成功')
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
					// $('#attachFlowchart').removeAttr()
					if(result == 1) {
						tableGate.actionEle.parameter.pageIndex = 1;
						tableGate.actionEle.loadData();
					} else {
						alert("提交失败")
					}
				},
				error: function() {
					alert('提交失败')
				}
			})
		}
		//        	 var formData = new FormData($("#addYw"));
		//        	console.log(formData,'55555');//获取到文件列表)[]
		//        	console.log($('#addYw').serialize(),'表单');	
		//业务所需要表格即附件集合
		//var attachModels={
		//	"attachName":$.trim($('#attachName').val())//表格名称
		////	"evidenceFile":$('#attachName').val()//上传路劲
		////	"attachStatus"://是否必须
		//}
		//$('#tableAddIn').click(function(){
		//	
		//})
		//        })
		//业务查询按照业务名称搜索

	});
	var pageIndex = 1;
	var count = 0
	var
		currentPage = 0;
	// 公告条件查询
	var annoTime,
		totalPage;

	$("#sureDelete").click(function() {
		//		alert("删除," + removeId);
		var parameter = {
			"serviceCode": removeId
		}
		//console.log('myDelete parameter=', parameter);
		$.ajax({
			type: 'POST',
			url: ipAddress + '/service/deleteProcedureGuide',
			data: JSON.stringify(parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				//console.log(result)
				if(result != 0) {
					trObj.removeChild(trId);
					tableGate.actionEle.loadData();
				}
			}
		})

	})
	//编辑业务
	$("#saves").click(function() {

		var serviceName = $.trim($('.addTitle1').val()) //业务名称必填，单独获取进行必填判断  
		var serviceStatus = $("input[name='serviceStatus1']:checked").val();
		var companyStatus = $("input[name='companyStatus1']:checked").val();
		var userInfo = JSON.parse($.cookie('userInfo'));

		//console.log(userInfo.userName);
		var canOnline1;
		if($(".canOnline1").prop("checked")) {
			canOnline1 = 1;
		} else {
			canOnline1 = 0;
		}
		var ywInfo = {
			"serviceName": serviceName, //业务名称
			"ownerDepart": $('#ownerDepart1 option:selected').val(), //所属部门
			"canOnline": canOnline1, //能否网上办理
			"serviceStatus": serviceStatus, //正常业务、审批业务
			"companyStatus": companyStatus, //单位办事、个人办事
			"proceedPrice": $.trim($('.proceedPrice1').val()), //收费标准
			"promisePeriod": $.trim($('.promisePeriod1').val()), //承诺期限
			"consultPhone": $.trim($('.consultPhone1').val()), //咨询电话
			"proceedPeriod": $.trim($('.proceedPeriod1').val()), //办理时间
			"proceedPlace": $.trim($('.proceedPlace1').val()), //办理地点
			"proceedCondition": $('.nicEdit-main').eq(2).html(), //受理条件
			"proceedMaterial": $('.nicEdit-main').eq(3).html(), //办理材料
			"serviceType": "01",
			"serviceCode": $(this).val(),
			"serviceAuthor": userInfo.userName

		}

		//附件名称循环遍历
		var arr = [];
		for(var i = 0; i < $("input[name=attachName1]").length; i++) {
			arr.push($("input[name=attachName1]").eq(i).val());
		}
		//console.log("arr=" + arr.toString());

		var att = [];
		//		alert($("input[name=attachStatus]").length)
		for(var i = 0; i < $("input[name=attachStatus1]").length; i++) {
			var status;
			if($("input[name=attachStatus1]").eq(i).prop("checked")) {
				status = 1;
			} else {
				status = 0;
			}
			att.push(status);
		}
		//console.log("att=" + att);

		var formData = new FormData($("#modifyYw")[0]);

		formData.append("ywInfo", JSON.stringify(ywInfo));
		formData.append("filesStatus", att.toString());
		formData.append("name123", arr.toString());

		if(serviceName == '') {
			alert('业务名称不能为空')

		} else {
			$.ajax({
				type: 'post',
				url: ipAddress + '/service/modifyProcedureGuide',
				data: formData,
				async: false,
				cache: false,
				contentType: false,
				processData: false,
				success: function(result) {
					//					console.log('result=', result);
					$('#serviceName').val("");
					$('#proceedPrice').val("");
					$('#promisePeriod').val("");
					$('#consultPhone').val("");
					$('#proceedPeriod').val("");
					$('#proceedPlace').val("");
					$('.nicEdit-main').eq(0).html("");
					$('.nicEdit-main').eq(1).html("");
					$('#canOnline1').removeAttr('checked');
					//$('#attachFlowchart1').attr('src', '');
					$("input[name='serviceStatus']").removeAttr('checked');
					$("input[name='companyStatus']").removeAttr('checked');
					$("#tab_fam  tr:not(:first)").empty("")
					if(result == 1) {
						tableGate.actionEle.loadData();
					} else {
						alert("提交失败")
					}
					//					var files = $("input[name=file]");
					//					files.after(files.clone());
					//					files.remove();
				},
				error: function() {
					alert('提交失败')
				}
			})
		}

	})

})
var trid,
	trObj,
	removeId;

function myDelete(obj, id) {

	//	alert("aaaa" + id);
	removeId = id;
	trId = obj.parentNode.parentNode;
	trObj = trId.parentNode;
}
//上传流程图，点击上传实时预览
//$('#attachFlowchart').off("change").on("change",function(f) {
//  //这里面根据需求写具体的ajax方法
//  var rd = new FileReader(); //创建文件读取对象
//	var files = f.files[0]; //获取file组件中的文件
//	var type = files.type.split('/')[0]; //按照惯例，不应该由前端判断格式，因为这里是根据后缀名判断的，修改后缀名仍旧可以上传，理应由后端根据文件格式来判断。
//	if(type != 'image') {
//		alert('请上传图片');
//		return;
//	}
//
//	rd.readAsDataURL(files); //文件读取装换为base64类型
//	rd.onloadend = function(e) {
//		//alert(e)
//		//加载完毕之后获取结果赋值给img
//		document.getElementById("attachFlowchart2").src = this.result;
//		
//		if(document.getElementById("attachFlowchart2").src != null && document.getElementById("attachFlowchart2").src != '') {
//			$('#quxiao').show();
//
//		}
//
//	}
//})

function show(f) {
	var rd = new FileReader(); //创建文件读取对象
	var files = f.files[0]; //获取file组件中的文件
	var type = files.type.split('/')[0]; //按照惯例，不应该由前端判断格式，因为这里是根据后缀名判断的，修改后缀名仍旧可以上传，理应由后端根据文件格式来判断。
	if(type != 'image') {
		alert('请上传图片');
		return;
	}

	rd.readAsDataURL(files); //文件读取装换为base64类型
	rd.onloadend = function(e) {
		//alert(e)
		//加载完毕之后获取结果赋值给img
		document.getElementById("attachFlowchart2").src = this.result;

		if(document.getElementById("attachFlowchart2").src != null && document.getElementById("attachFlowchart2").src != '') {
			$('#quxiao').show();

		}

	}
}
$("#quxiao").click(function() {
	document.getElementById("attachFlowchart2").src = '';

	$('#attachFlowchart').val("");

	$('#quxiao').hide();

})

function clearYe() {
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

	//alert($('.checkbox-inline').html())
}

function show1(f) {
	var rd = new FileReader(); //创建文件读取对象
	var files = f.files[0]; //获取file组件中的文件
	var type = files.type.split('/')[0]; //按照惯例，不应该由前端判断格式，因为这里是根据后缀名判断的，修改后缀名仍旧可以上传，理应由后端根据文件格式来判断。
	if(type != 'image') {
		alert('请上传图片');
		return;
	}

	rd.readAsDataURL(files); //文件读取装换为base64类型
	rd.onloadend = function(e) {
		//加载完毕之后获取结果赋值给img

		document.getElementById("attachFlowchart1").src = this.result;

		if(document.getElementById("attachFlowchart1").src != null && document.getElementById("attachFlowchart1").src != '') {
			$('#quxiao2').show();

		}

		if(document.getElementById("attachFlowchart1").src == '') {
			$('#quxiao2').hide();
		}
	}
}
$("#quxiao2").click(function() {
	document.getElementById("attachFlowchart1").src = '';

	$('#attachFlowchart3').val("");

	$('#quxiao2').hide();

	//clearYe()

})
/**
 * 编辑显示信息 
 */
function myDetai(obj, serviceCode) {

	$.ajax({
		type: "POST",
		url: ipAddress + "/service/detaiProcedure",
		data: {
			"serviceCode": serviceCode
		},
		success: function(result) {
			//console.log("aa", result)
			//alert(result.serviceCode)
			//if(result.canOnline==0||result.canOnline==null){
			//	$(".canOnline1").removeAttr("checked")
			//}else{
			//	$(".canOnline1").prop("checked")
			//}
			if(result.canOnline == 1) {
				$(".canOnline1").prop("checked")
			} else {
				$(".canOnline1").removeAttr("checked")
			}

			$('.addTitle1').val(result.serviceName); //业务名称必填，单独获取进行必填判断  
			$('.proceedPrice1').val(result.proceedPrice);
			$('.promisePeriod1').val(result.promisePeriod);
			$('.consultPhone1').val(result.consultPhone);
			$('.proceedPeriod1').val(result.proceedPeriod) //办理时间
			$('.proceedPlace1').val(result.proceedPlace); //办理地点
			$('.nicEdit-main').eq(2).html(result.proceedCondition); //受理条件
			$('.nicEdit-main').eq(3).html(result.proceedMaterial); //办理材料
			//办理流程
			if(result.attachFlowchart != null && result.attachFlowchart != '') {
				$('#attachFlowchart1').attr('src', ipAddress + result.attachFlowchart);
				$("#quxiao2").show();

			} else {
				$('#attachFlowchart1').attr('src', '');
			}

			//			var tooltip = "<div id='tooltip' ><img src='' alt='产品预览图' id='tooltip2'/></div>"; //创建 div 元素
			//			$("body").append(tooltip); //把它追加到文档中		
			//			$('#tooltip img').attr('src', ipAddress + result.attachFlowchart);
			$('#removeOne1').empty();
			var trTemp = "";
			var serviceAttachModels = result.serviceAttachModels;
			if(serviceAttachModels != null) {

				for(var i = 0; i < serviceAttachModels.length; i++) {
					trTemp += '<tr>' +
						'<td><input type="text" class="outLINE" name="attachName1" value="' + serviceAttachModels[i].attachName + '" >' +
						'</td>' +
						'<td><input type="file" class="outLINE" name="evidenceFile1" >' +
						'</td>' +
						'<td><input type="checkbox" class="inlineCheckbox"checked="' + serviceAttachModels[i].attachStatus + '" name="attachStatus1" >' +
						'</td>' +
						'<td><input type="button" value="删除" class="removeLINE2" id="' + serviceAttachModels[i].attachId + '">' +
						'</td>' +
						'</tr>';

				}
			}
			$('#removeOne1').append(trTemp);
			//编辑业务中删除附件
			$('.removeLINE2').off('click').click(function() {
				var id = $(this).attr('id');
				var tr = $(this).parent().parent();
				//alert(id)
				//prompt(id)
				var parameter = {
					"attachId": id
				}
				$.ajax({
					type: "post",
					url: ipAddress + "/service/deleteAttach",
					async: true,
					data: JSON.stringify(parameter),
					contentType: 'application/json;charset=UTF-8',
					success: function(result) {
						tr.remove()
					}
				});

			})
			//			var serviceStatus = parseInt(result.canOnline);
			if(result.canOnline == 1) {
				$(".canOnline1").prop("checked", "checked")
			}

			if(result.serviceStatus == 1) {
				$("input[name=serviceStatus1]").eq(0).prop("checked", "checked");
			} else {
				$("input[name=serviceStatus1]").eq(1).prop("checked", "checked");
			}

			if(result.companyStatus == 1) {
				$("input[name=companyStatus1]").eq(0).prop("checked", "checked");
			} else {
				$("input[name=companyStatus1]").eq(1).prop("checked", "checked");
			}

			$('#ownerDepart1').val(result.ownerDepart);
			$("#saves").val(result.serviceCode);

		}
	})

}