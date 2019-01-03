$(function() {
	var infomate = '<tr>' +
		'<th class="list1 line">' + '申请时间' +
		'</th>' +
		'<th class="line">' + '业务名称' +
		'</th>' +
		'<th class="list2 line">' + '状态' +
		'</th>' +
		'<th class="list4 line">' + '说明' +
		'</th>' +
		'</tr>';

//var userInfo=JSON.parse($.cookie('PHPSESSID'))
//console.log(JSON.parse($.cookie('PHPSESSID')).userCode)
	function actionEle() {
		this.parameter = {
			"pageIndex": 1,
			"recordCount": 5,
			"criteria": {
				"userCode":JSON.parse($.cookie('PHPSESSID')).userCode //当前用户账号
			}
		};
		this.totalPage = 0;
	}

	var tableGate = {};
	tableGate.actionEle = new actionEle();

	tableGate.actionEle.loadData = function() {
		$('table tbody tr').remove();
		$.ajax({
			url: ipAddress + '/service/queryMyProcedureRecord',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify(tableGate.actionEle.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				console.log("aaaaaaaaaa" + result.totalPage)
				tableGate.actionEle.parameter.pageIndex = result.currentPage;
				tableGate.actionEle.totalPage = result.totalPage;
				//console.log(result);
				var info = result.data;
				console.log(info);
				var serviceStatus, auditAdvice;
				
				for(var i = 0; i < info.length; i++) {
					if(info[i].serviceStatus == 0) {
						serviceStatus = '待审核'
					}
					if(info[i].serviceStatus == 1) {
						serviceStatus = '审核已通过'
					}
					if(info[i].serviceStatus == 2) {
						serviceStatus = '审核未通过'
					}
					if(info[i].auditAdvice == null) {
						auditAdvice = ''
					} else {
						auditAdvice = info[i].auditAdvice
					}

				var	infomate1 = ' <tr>' +
						'<th class="list1">' + info[i].applyTime +
						'</th>' +
						'<th>' + (info[i].serviceName == null ? '养老金申领认证' : info[i].serviceName) +
						'</th>' +
						'<th class="list2">' + serviceStatus +
						'</th>' +
						'<th class="list4">' + auditAdvice +
						'</th>' +
						'</tr>'
					$('table tbody').append(infomate1);
				}

				//生成页码
				var totalPage = result.totalPage;
				var page = parseInt(tableGate.actionEle.parameter.pageIndex);
				console.log("page", page)
				$(".pagination .pageNo").remove();
				if(totalPage <= 6) {
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
					//addCount = $(this).text() * 5 - 5;
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

		tableGate.actionEle.goPage(1);
		$(tableGate.actionEle).find(".pageNumber").html(1);
	})
	//尾页
	$('.pagination #lastPage').click(function() {

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
	//	$.ajax({
	//		url: GLOBALURL + '/service/queryMyProcedureRecord',
	//		type: 'post',
	//		contentType: 'application/json',
	//		data: JSON.stringify(parameter),
	//		success: function(result) {
	//			//console.log(result);
	//			var info = result.data;
	//			console.log(info);
	//			var serviceStatus, auditAdvice;
	//
	//			for(var i = 0; i < info.length; i++) {
	//				if(info[i].serviceStatus == 1) {
	//					serviceStatus = '通过'
	//				}
	//				if(info[i].serviceStatus == 2) {
	//					serviceStatus = '不通过'
	//				}
	//				if(info[i].auditAdvice == null) {
	//					auditAdvice = ''
	//				} else {
	//					auditAdvice = info[i].auditAdvice
	//				}
	//
	//				infomate += ' <tr>' +
	//					'<th class="list1">' + info[i].applyTime +
	//					'</th>' +
	//					'<th>' + info[i].serviceName +
	//					'</th>' +
	//					'<th class="list2">' + serviceStatus +
	//					'</th>' +
	//					'<th class="list4">' + auditAdvice +
	//					'</th>' +
	//					'</tr>'
	//			}
	//			$('table').append(infomate);
	//			//分页
	//			var count = 0
	//			$('#previous').click(function() {
	//				console.log('previous addCount1111=', addCount);
	//				if(pageIndex < 2) {
	//					alert('已经是第一页');
	//					addCount = 0;
	//					return
	//				} else {
	//					$('table thead').siblings().remove();
	//				}
	//
	//				if(--pageIndex < 2) {
	//					pageIndex = 1;
	//
	//				}
	//				addCount -= 5;
	//				console.log(pageIndex + "     " + totalPage)
	//				console.log('count=', count);
	//				console.log('previous addCount=', addCount);
	//				var parameter = {
	//					"pageIndex": pageIndex,
	//					"recordCount": 5
	//				}
	//				var html;
	//				$.ajax({
	//					type: 'POST',
	//					url: 'http://' + domainName + ':8080/content/queryFaq',
	//					data: JSON.stringify(parameter),
	//					contentType: 'application/json;charset=UTF-8',
	//					success: function(result) {
	//						for(var i = 0; i < result.data.length; i++) {
	//							html += '<tr>' +
	//								'<td>' + ((addCount - (5 - (i + 1))) + 5) +
	//								'</td>' +
	//								'<td>' + result.data[i].userCode +
	//								'<td>张三' +
	//								'</td>' +
	//								'<td>' + formatDateStr(result.data[i].logonTime) +
	//								'</td>' +
	//								'<td>' + result.data[i].remoteAddr +
	//								'</td>' +
	//								'</tr>'
	//						}
	//						$('table').append(html);
	//						// return currentPage;
	//					},
	//					error: function() {
	//						alert('失败')
	//					}
	//				})
	//			})
	//			var addCount = 0,
	//				currentPage = 0;
	//
	//			$('#next').click(function() {
	//				if(pageIndex == totalPage) {
	//					alert('已经是最后一页');
	//					return;
	//				} else {
	//					$('table thead').siblings().remove();
	//					addCount += 5;
	//				}
	//				++pageIndex;
	//				console.log(pageIndex + "     " + totalPage)
	//				console.log('next addCount=', addCount);
	//				// console.log('currentPage=', pageIndex);
	//				var parameter = {
	//					"pageIndex": pageIndex,
	//					"recordCount": 5
	//				}
	//				var html;
	//				$.ajax({
	//					type: 'POST',
	//					url: 'http://' + domainName + ':8080/content/queryFaq',
	//					data: JSON.stringify(parameter),
	//					contentType: 'application/json;charset=UTF-8',
	//					success: function(result) {
	//						console.log('aaaaaaaaaaaaaaaaa');
	//						for(var i = 0; i < result.data.length; i++) {
	//							html += '<tr>' +
	//								'<td>' + (i + 1 + addCount) +
	//								'</td>' +
	//								'<td>' + result.data[i].userCode +
	//								'<td>张三' +
	//								'</td>' +
	//								'<td>' + formatDateStr(result.data[i].logonTime) +
	//								'</td>' +
	//								'<td>' + result.data[i].remoteAddr +
	//								'</td>' +
	//								'</tr>'
	//						}
	//						$('table').append(html);
	//						return addCount;
	//					},
	//					error: function() {
	//						alert('失败')
	//					}
	//				})
	//			})
	//			var addCount = 0,
	//				currentPage = 0;
	//
	//			$('#next').click(function() {
	//				if(pageIndex == totalPage) {
	//					alert('已经是最后一页');
	//					return;
	//				} else {
	//					$('table thead').siblings().remove();
	//					addCount += 5;
	//				}
	//				++pageIndex;
	//				console.log(pageIndex + "     " + totalPage)
	//				console.log('next addCount=', addCount);
	//				// console.log('currentPage=', pageIndex);
	//				var parameter = {
	//					"pageIndex": pageIndex,
	//					"recordCount": 5
	//				}
	//				var html;
	//				$.ajax({
	//					type: 'POST',
	//					url: 'http://' + domainName + ':8080/content/queryFaq',
	//					data: JSON.stringify(parameter),
	//					contentType: 'application/json;charset=UTF-8',
	//					success: function(result) {
	//						console.log('aaaaaaaaaaaaaaaaa');
	//						for(var i = 0; i < result.data.length; i++) {
	//							html += '<tr>' +
	//								'<td>' + (i + 1 + addCount) +
	//								'</td>' +
	//								'<td>' + result.data[i].userCode +
	//								'<td>张三' +
	//								'</td>' +
	//								'<td>' + formatDateStr(result.data[i].logonTime) +
	//								'</td>' +
	//								'<td>' + result.data[i].remoteAddr +
	//								'</td>' +
	//								'</tr>'
	//						}
	//						$('table').append(html);
	//						return addCount;
	//					},
	//					error: function() {
	//						alert('失败')
	//					}
	//				})
	//			})
	//		},
	//		error: function() {
	//			alert("查询失败")
	//		}
	//	})

})