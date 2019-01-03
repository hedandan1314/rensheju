! function() {
	laydate.skin('molv'); //切换皮肤，请查看skins下面皮肤库
}();
laydate({
	elem: '#releaseTime',
	// istime: true,
	// format: 'YYYY-MM-DD hh:mm:ss',
	// min: laydate.now() //-1代表昨天，-2代表前天，以此类推
});
/*   function urlHtml(num){
        	var toUrl = "./operation.html?num =" + num;
			window.open(toUrl);
        }*/
$(function() {
	var x = 10;
	var y = 20;
	$(".images").mouseover(function(e) {

		$("#tooltip")
			.css({
				// "top": (e.pageY + y) + "px",
				"top": "10px",
				"left": (e.pageX + x) + "px"
			}).show("fast"); //设置x坐标和y坐标，并且显示
	}).mouseout(function() {

		$("#tooltip").hide(); //移除 
	}).mousemove(function(e) {
		$("#tooltip")
			.css({
				// "top": (e.pageY + y) + "px",
				"top": "10px",
				"left": (e.pageX + x) + "px"
			});
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
	$('ul.ownerDepart').find('li').click(function() {
		var a = $(this).data('id')
		//alert(a)
		//sessionStorage.clear();
		sessionStorage.Value = a

	})

	var addCount = 0;
	var serviceName = "";

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
		$("#toPage").val("");
		$('#guidanceTb tbody tr').remove();

		tableGate.actionEle.parameter.criteria = {
			"ownerDepart": sessionStorage.Value,
			"serviceName": serviceName

		}
		$.ajax({
			type: "post",
			url: ipAddress + "/service/queryProcedureGuide",
			async: true,
			data: JSON.stringify(tableGate.actionEle.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				//console.log(result)
				tableGate.actionEle.parameter.pageIndex = result.currentPage;
				tableGate.actionEle.totalPage = result.totalPage;
				var data = result.data;
				var dataLength = result.data.length * result.totalPage;
				for(var i = 0; i < result.data.length; i++) {
					var html = ' <tr>' +
						'<td>' + (i + 1 + addCount) +
						'</td>' +
						'<td>' + result.data[i].serviceName +
						'</td>' +
						'<td>' + result.data[i].orgName +
						'</td>' +
						'<td>' +
						'<a class="btn btn-success searchBtn" data-toggle="modal"   data-target="#editor" style="outline: none;">查看</a>' +
						'</td>' +
						'<input type="hidden" id=' + result.data[i].serviceCode + '>' +
						'</tr>'
					$('#guidanceTb tbody').append(html)
					$('.searchBtn').click(function() {
						var serviceCode = $(this).parent().next().attr("id");
						//alert(serviceCode)
						var searchInfo = {
							"serviceCode": serviceCode
						}
						var data = '';
						$.ajax({
							type: "post",
							url: ipAddress + "/service/detailProcedureGuide",
							async: true,
							data: JSON.stringify(searchInfo),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								//console.log(result)
								//console.log(ipAddress + result.attachFlowchart)
								$('#serviceName').val(result.serviceName); //业务名称				
								$('#categoryInstitution').val(result.categoryInstitution); //下属单位
								$('#orgName').val(result.orgName); //所属机构
								$('#consultPhone').val(result.consultPhone); //咨询电话
								$('#proceedPrice').val(result.proceedPrice); //收费标准
								$('#promisePeriod').val(result.promisePeriod); //承诺期限
								$('#proceedPeriod').val(result.proceedPeriod); //办理时间
								$('#proceedPlace').val(result.proceedPlace); //办理地点
								$('#proceedCondition').html(result.proceedCondition); //受理条件
								$('#proceedMaterial').html(result.proceedMaterial); //办理材料
								$('#attachFlowchart').attr('src', ipAddress + result.attachFlowchart); //办理流程
								var tooltip = "<div id='tooltip' ><img src='' alt='产品预览图' id='tooltip2'/></div>"; //创建 div 元素
								$("body").append(tooltip); //把它追加到文档中		
								$('#tooltip img').attr('src', ipAddress + result.attachFlowchart);
								for(var i = 0; i < result.serviceAttachModels.length; i++) {
									data += (i + 1) + "." + result.serviceAttachModels[i].attachName + '\n';
									//console.log(data)
									$('#serviceAttachModels').html(data); //所需表格
								}

							}

						});
					})

				}

				//生成页码
				var totalPage = result.totalPage;
				var page = parseInt(tableGate.actionEle.parameter.pageIndex);
				//console.log("page", page)
				$(".pagination .pageNo").remove();
				if(totalPage <= 5) {
					while(totalPage > 0) {
						$("#previous").after('<li><a href="javascript:;" class="pageNo pageNo' + totalPage + '">' + totalPage + '</a></li>');
						totalPage--
					}
				} else {
					if(page > 3 && totalPage - 2 >= page) {
						$("#previous").after('<li><a href="javascript:;" class="pageNo pageNo' + (page - 2) + '">' + (page - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page - 1) + '">' + (page - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page) + '">' + page +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 1) + '">' + (page + 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 2) + '">' + (page + 2) +
							'</a></li>');
					} else if(page > 3 && totalPage - 2 < page) {
						$("#previous").after('<li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 4) + '">' + (totalPage - 4) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 3) + '">' + (totalPage - 3) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 2) + '">' + (totalPage - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 1) + '">' + (totalPage - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage) + '">' + totalPage +
							'</a></li>');
					} else {
						$("#previous").after('<li><a href="javascript:;" class="pageNo pageNo1">' + 1 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo2">' + 2 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo3">' + 3 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo4">' + 4 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo5">' + 5 +
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
	tableGate.actionEle.loadData();

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
		serviceName = $("#serviceName1").val();
		tableGate.actionEle.parameter.pageIndex = 1;
		addCount = 0;
		tableGate.actionEle.loadData();
	})

	//条件查询
	$(".searchButton").click(function() {
		serviceName = $(".serviceName").val();
		tableGate.actionEle.parameter.pageIndex = 1;
		addCount = 0;
		tableGate.actionEle.loadData();
	})

	//跳转页数
	$('#jumpPage').click(function() {
		var jumPage = $("#toPage").val();
		if(jumPage<1){
			jumPage=1;
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

	//	//办事指南页面交互
	//	var pageIndex = 1;
	//	var guidanceInfo = {
	//		"pageIndex": pageIndex,
	//		"recordCount": 5,
	//		"criteria": {
	//			"ownerDepart": sessionStorage.Value
	//		}
	//	}
	//	var html;
	//	$.ajax({
	//		type: "post",
	//		url: GLOBALURL + "/service/queryProcedureGuide",
	//		async: true,
	//		data: JSON.stringify(guidanceInfo),
	//		contentType: 'application/json;charset=UTF-8',
	//		success: function(result) {
	//			console.log(result)
	//			for(var i = 0; i < result.data.length; i++) {
	//				html += ' <tr>' +
	//					'<td>' + (i + 1) +
	//					'</td>' +
	//					'<td>' + result.data[i].serviceName +
	//					'</td>' +
	//					'<td>' + result.data[i].orgName +
	//					'</td>' +
	//					'<td>' +
	//					'<a class="btn btn-success searchBtn" data-toggle="modal"   data-target="#editor" style="outline: none;">查看</a>' +
	//					'</td>' +
	//					'<input type="hidden" id=' + result.data[i].serviceCode + '>' +
	//					'</tr>'
	//
	//			}
	//			$('#guidanceTb tbody').append(html)
	//			//办事指南查看交互
	//

	//	}

	//	});

})