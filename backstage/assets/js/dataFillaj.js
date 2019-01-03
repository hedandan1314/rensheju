;
var tableGate = {}

function searchRoute(ele) {
	var actionEleId = $(ele).parents('.tableEle').attr('id');
	tableGate[actionEleId].search();
}
(function() {
	//全局变量
	function actionEle(id) {
		this.parameter = {
			"pageIndex": 1,
			"recordCount": 5
		};
		this.totalPage = 0;
		this.dom = $('#' + id).get(0);
	}
	//下拉框选择
	$("#mySelect").change(function() {
		$(".pensionInsurance1 tr").remove();
		$(".corporationEmploy1 tr").remove();
		$(".corporationResource2 tr").remove();
		$(".mecialInsurance1 tr").remove();
		var a = $("#mySelect option:selected").val()
		if(a == '5') {
			tableGate.actionEle1.loadData();
			tableGate.actionEle1.goPage(1);
		};
		if(a == '2') {
			tableGate.actionEle2.loadData();
			tableGate.actionEle2.goPage(1);
		};
		if(a == '3') {
			tableGate.actionEle3.loadData();
			tableGate.actionEle3.goPage(1);
		};
		if(a == '6') {
			tableGate.actionEle4.loadData();
			tableGate.actionEle4.goPage(1);
		};
	});

	//加载数据   搜索  向后翻页  向前翻页  跳到某页 删除
	tableGate = {};
	tableGate.actionEle1 = new actionEle('actionEle1');
	tableGate.actionEle2 = new actionEle('actionEle2');
	tableGate.actionEle3 = new actionEle('actionEle3');
	tableGate.actionEle4 = new actionEle('actionEle4');

	//====================================================数据入录——养老保险===================================================================

	//加载数据_养老保险
	tableGate.actionEle1.loadData = function() {
		var dom = this.dom;

		this.parameter.criteria = {
			"regionName": $(".searchName").val()
		}
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/queryPensionInsurance',
			async: false,
			data: JSON.stringify(this.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(msg) {
				tableGate[dom.id].totalPage = msg.totalPage;

				//拼装数据_养老保险
				for(i = 0; i < msg.data.length; i++) {
					var item = "<tr ><td nowrap class='td1'>" + msg.data[i].regionName +
						"</td><td nowrap class='td2'>" + msg.data[i].regionHousehold +
						"</td><td nowrap class='td3'>" + msg.data[i].securityCareer +
						"</td><td nowrap class='td4'>" + msg.data[i].securityResident +
						"</td><td nowrap class='td5'>" + msg.data[i].securityRate +
						"%</td><td><a class='btn btn-default change' data-toggle='modal' data-target='#editor' onclick='showthis1(this);' style='outline: none;'  id=" + msg.data[i].id + ">编辑</a>" +
						"<a class='btn btn-warning del' data-toggle='modal' data-target='#delete' style='outline: none; margin-left:5px;' id=" + msg.data[i].id + ">删除</a></td></tr>";
					$(dom).find("tbody").append(item);

					//生成页码
					var totalPage = msg.totalPage;
					var page = parseInt(tableGate.actionEle1.parameter.pageIndex);
					$(dom).find('.pagination .pageNo').remove();
					if(totalPage <= 6) {
						while(totalPage > 0) {
							$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + totalPage + '">' + totalPage + '</a></li>');
							totalPage--
						}
					} else {
						if(page > 3 && totalPage - 2 >= page) {
							$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (page - 2) + '">' + (page - 2) +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page - 1) + '">' + (page - 1) +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page) + '">' + page +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 1) + '">' + (page + 1) +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 2) + '">' + (page + 2) +
								'</a></li>');
						} else if(page > 3 && totalPage - 2 < page) {
							$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 4) + '">' + (totalPage - 4) +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 3) + '">' + (totalPage - 3) +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 2) + '">' + (totalPage - 2) +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 1) + '">' + (totalPage - 1) +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage) + '">' + totalPage +
								'</a></li>');
						} else {
							$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo1">' + 1 +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo2">' + 2 +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo3">' + 3 +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo4">' + 4 +
								'</a></li><li><a href="javascript:;" class="pageNo pageNo5">' + 5 +
								'</a></li>');
						}

					}
					//获取当前页面的页码变色
					$(dom).find('.pagination .pageNo' + tableGate[dom.id].parameter.pageIndex).css('background-color', '#ddd');
					//注册页码跳转事件_养老保险
					$(dom).find('.pagination .pageNo').click(function() {
						tableGate[dom.id].goPage($(this).text());

					})

					//删除获取ID
					$(".del").click(function() {
						id = $(this).attr("id");
					})
					$(".change").click(function() {
						cid = $(this).attr("id");
					})
				}

			}
		});

	}
	//上一页按钮事件_养老保险
	$(tableGate.actionEle1.dom).find('.pagination #previous').click(function() {
		tableGate.actionEle1.prevPage();
	})
	//下一页按钮事件_养老保险
	$(tableGate.actionEle1.dom).find('.pagination #next').click(function() {
		tableGate.actionEle1.nextPage();
	})

	//首页
	$(tableGate.actionEle1.dom).find('.pagination #fristPage').click(function() {
		tableGate.actionEle1.goPage(1);
		$(tableGate.actionEle1.dom).find(".pageNumber").html(1);
	})
	//尾页
	$(tableGate.actionEle1.dom).find('.pagination #lastPage').click(function() {
		tableGate.actionEle1.goPage(tableGate.actionEle1.totalPage);
		$(tableGate.actionEle1.dom).find(".pageNumber").html(tableGate.actionEle1.totalPage);
	})
	//跳转页数
	$(tableGate.actionEle1.dom).find('#jumpPage').click(function() {
		var jumPage = $(tableGate.actionEle1.dom).find("#toPage").val();
		if(jumPage <= tableGate.actionEle1.totalPage) {
			tableGate.actionEle1.goPage(jumPage);
			if(jumPage < tableGate.actionEle1.totalPage) {
				$(tableGate.actionEle1.dom).find("#toPage").val(1);
			} else {
				$(tableGate.actionEle1.dom).find("#toPage").val(jumPage);
			}
			$(tableGate.actionEle1.dom).find(".pageNumber").html(jumPage);
		} else {
			tableGate.actionEle1.goPage(tableGate.actionEle1.totalPage);
			$(tableGate.actionEle1.dom).find(".pageNumber").html(tableGate.actionEle1.totalPage);
			if(jumPage > tableGate.actionEle1.totalPage) {
				$(tableGate.actionEle1.dom).find("#toPage").val(tableGate.actionEle1.totalPage);
			} else {
				$(tableGate.actionEle1.dom).find("#toPage").val(jumPage);
			}
		}

	})
	//声明下一页函数_养老保险
	tableGate.actionEle1.nextPage = function() {
		if(this.parameter.pageIndex >= this.totalPage) {
			alert('已经是最后一页');
			return;
		}
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex++;
		this.loadData();
	}
	//声明上一页函数_养老保险
	tableGate.actionEle1.prevPage = function() {
		if(this.parameter.pageIndex <= 1) {
			alert('已经是第一页');
			return;
		}
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex--;
		this.loadData();
	}
	//声明搜索函数_养老保险
	tableGate.actionEle1.search = function() {
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex = 1;
		this.loadData();
	}
	//声明跳转函数
	tableGate.actionEle1.goPage = function(pageNo) {
		this.parameter.pageIndex = pageNo;
		$(this.dom).find("tbody").html('')
		this.loadData();
	}

	tableGate.actionEle1.loadData()

	//	//新增_养老保险
	$("#addAccessory").click(function() {
		var ele = this
		var title = $('#account1').val();
		var parameter = {
			"regionName": $('#account1').val(),
			"regionHousehold": parseInt($('#userName6').val()),
			"securityCareer": parseInt($('#userName1').val()),
			"securityResident": parseInt($('#idCard4').val()),
		}

		if($('#account1').val() == '' || $('#userName6').val() == '' || $('#userName1').val() == '' || $('#idCard4').val() == '') {
			$("#addAccessory").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/addPensionInsurance',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(tableGate.actionEle1.dom).find('tbody').html('')
					var actionEleId = $(ele).parents('.tableEle').attr('id');
					tableGate.actionEle1.parameter.pageIndex = 1;
					tableGate.actionEle1.loadData();
				}
			});
			$('#account1').val('')
			$('#userName6').val('');
			$('#userName1').val('');
			$('#idCard4').val('');
			$('#titlespan').html('');
			$('#peopleSpan').html('');
			$('#workerSpan').html('');
			$('#oldSpan').html('');
		}
	});

	//删除_养老保险
	$("#deleteData").click(function() {
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/deletePensionInsurance',
			async: false,
			data: {
				"id": id
			},
			success: function(msg) {
				$(".pensionInsurance1 tr").remove();
				tableGate.actionEle1.loadData();
				if(tableGate.actionEle1.totalPage < tableGate.actionEle1.parameter.pageIndex) {
					tableGate.actionEle1.parameter.pageIndex = tableGate.actionEle1.parameter.pageIndex - 1;
					tableGate.actionEle1.loadData();
				}
			}
		});
	});
	//编辑_养老保险
	$("#addAccessory4").click(function() {
		var ele = this
		var title = $('#account2').val();
		var parameter = {
			"id": cid,
			"regionName": $('#account2').val(),
			"regionHousehold": parseInt($('#userName3').val()),
			"securityCareer": parseInt($('#userName4').val()),
			"securityResident": parseInt($('#idCard2').val()),
		}

		if($('#account2').val() == '' || $('#userName3').val() == '' || $('#userName4').val() == '' || $('#idCard2').val() == '') {
			$("#addAccessory4").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/modifyPensionInsurance',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(".pensionInsurance1 tr").remove();
					tableGate.actionEle1.loadData();
				}
			});
			$('#titlespan').html('');
			$('#peopleSpan').html('');
			$('#workerSpan').html('');
			$('#oldSpan').html('');
		}
	});
	function clean () {
		$(".modal-body").reset();
	}
	//====================================================数据入录——企业用工情况====================================================================
	//加载数据
	tableGate.actionEle2.loadData = function() {
		var dom = this.dom;

		this.parameter.criteria = {
			"companyName": $(".searchName1").val()
		}
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/queryCorporationEmploy',
			async: false,
			data: JSON.stringify(this.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(msg) {
				tableGate[dom.id].totalPage = msg.totalPage;

				//拼装数据
				for(i = 0; i < msg.data.length; i++) {
					var item = "<tr><td nowrap class='td1'>" +
						"</td><td nowrap class='td2'>" + msg.data[i].companyName +
						"</td><td nowrap class='td3'>" + msg.data[i].employTotal +
						"</td><td nowrap class='td4'>" + msg.data[i].employPart +
						"</td><td nowrap class='td5'>" + msg.data[i].employRate +
						"%</td><td><a class='btn btn-default change' data-toggle='modal' data-target='#editor2' onclick='showthis2(this);' style='outline: none;'  id=" + msg.data[i].id + ">编辑</a>" +
						"<a class='btn btn-warning del' data-toggle='modal' data-target='#delete' style='outline: none; margin-left:5px;'  id=" + msg.data[i].id + ">删除</a></td></tr>";
					$(dom).find("tbody").append(item);
				}
				//	序号自动增长
				var len = $(dom).find("tbody tr").length;
				var num = 0;
				for(var i = 0; i < len; i++) {
					num++;
					$('.corporationEmploy1 tr:eq(' + i + ') td:first').html(num);
					if(i == len - 1) {
						num = 0;
					}
				}

				//生成页码
				var totalPage = msg.totalPage;
				var page = parseInt(tableGate.actionEle2.parameter.pageIndex);
				$(dom).find('.pagination .pageNo').remove();
				if(totalPage <= 6) {
					while(totalPage > 0) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + totalPage + '">' + totalPage + '</a></li>');
						totalPage--
					}
				} else {
					if(page > 3 && totalPage - 2 >= page) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (page - 2) + '">' + (page - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page - 1) + '">' + (page - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page) + '">' + page +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 1) + '">' + (page + 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 2) + '">' + (page + 2) +
							'</a></li>');
					} else if(page > 3 && totalPage - 2 < page) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 4) + '">' + (totalPage - 4) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 3) + '">' + (totalPage - 3) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 2) + '">' + (totalPage - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 1) + '">' + (totalPage - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage) + '">' + totalPage +
							'</a></li>');
					} else {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo1">' + 1 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo2">' + 2 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo3">' + 3 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo4">' + 4 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo5">' + 5 +
							'</a></li>');
					}

				}
				//获取当前页面的页码变色
				$(dom).find('.pagination .pageNo' + tableGate[dom.id].parameter.pageIndex).css('background-color', '#ddd');
				//注册页码跳转事件
				$(dom).find('.pagination .pageNo').click(function() {
					tableGate[dom.id].goPage($(this).text());
				})
				//删除
				$(".del").click(function() {
					id = $(this).attr("id");
				})
				$(".change").click(function() {
					cid = $(this).attr("id");
				})
			}
		});
	}
	//注册上一页按钮事件
	$(tableGate.actionEle2.dom).find('.pagination #previous').click(function() {
		tableGate.actionEle2.prevPage();
	})
	//注册下一页按钮事件
	$(tableGate.actionEle2.dom).find('.pagination #next').click(function() {
		tableGate.actionEle2.nextPage();
	})
	//首页
	$(tableGate.actionEle2.dom).find('.pagination #fristPage').click(function() {
		tableGate.actionEle2.goPage(1);
		$(tableGate.actionEle2.dom).find(".pageNumber").html(1);
	})
	//尾页
	$(tableGate.actionEle2.dom).find('.pagination #lastPage').click(function() {
		tableGate.actionEle2.goPage(tableGate.actionEle2.totalPage);
		$(tableGate.actionEle2.dom).find(".pageNumber").html(tableGate.actionEle2.totalPage);
	})
	//跳转页数
	$(tableGate.actionEle2.dom).find('#jumpPage').click(function() {
		var jumPage = $(tableGate.actionEle2.dom).find("#toPage").val();
		if(jumPage <= tableGate.actionEle2.totalPage) {
			tableGate.actionEle2.goPage(jumPage);
			if(jumPage < tableGate.actionEle2.totalPage) {
				$(tableGate.actionEle2.dom).find("#toPage").val(1);
			} else {
				$(tableGate.actionEle2.dom).find("#toPage").val(jumPage);
			}

		} else {
			tableGate.actionEle2.goPage(tableGate.actionEle2.totalPage);
			if(jumPage > tableGate.actionEle2.totalPage) {
				$(tableGate.actionEle2.dom).find("#toPage").val(tableGate.actionEle2.totalPage);
			} else {
				$(tableGate.actionEle2.dom).find("#toPage").val(jumPage);
			}
		}

	})
	//声明下一页函数
	tableGate.actionEle2.nextPage = function() {
		if(this.parameter.pageIndex >= this.totalPage) {
			alert('已经是最后一页');
			return;
		}
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex++;
		this.loadData();
	}
	//声明上一页函数
	tableGate.actionEle2.prevPage = function() {
		if(this.parameter.pageIndex <= 1) {
			alert('已经是第一页');
			return;
		}
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex--;
		this.loadData();
	}
	//声明搜索函数
	tableGate.actionEle2.search = function() {
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex = 1;
		this.loadData();
	}
	//声明跳转函数
	tableGate.actionEle2.goPage = function(pageNo) {
		this.parameter.pageIndex = pageNo;
		$(this.dom).find("tbody").html('');
		this.loadData();
	}
	tableGate.actionEle2.loadData()

	//	//新增_用工情况
	$("#addAccessory1").click(function() {
		var ele = this
		var title = $('#agencyNumber').val();
		var parameter = {
			"companyName": $('#agencyNumber').val(),
			"employTotal": parseInt($('#agencyName1').val()),
			"employPart": parseInt($('#agencyName').val())
		}

		if($('#agencyNumber').val() == '' || $('#agencyName1').val() == '' || $('#agencyName').val() == '') {
			$("#addAccessory1").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/addCorporationEmploy',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(tableGate.actionEle2.dom).find('tbody').html('')
					var actionEleId = $(ele).parents('.tableEle').attr('id');
					tableGate.actionEle2.parameter.pageIndex = 1;
					tableGate.actionEle2.loadData();
				}
			});
			$('#agencyNumber').val('');
			$('#agencyName1').val('');
			$('#agencyName').val('');
			$('#spanTip5').html('');
			$('#workerspan1').html('');
			$('#peoplespan1').html('');
		}
	});
	//删除_用工情况
	$("#deleteData").click(function() {
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/deleteCorporationEmploy',
			async: false,
			data: {
				"id": id
			},
			success: function(msg) {
				$(".corporationEmploy1 tr").remove();
				tableGate.actionEle2.loadData();
				if(tableGate.actionEle2.totalPage < tableGate.actionEle2.parameter.pageIndex) {
					tableGate.actionEle2.parameter.pageIndex = tableGate.actionEle2.parameter.pageIndex - 1;
					tableGate.actionEle2.loadData();
				}
			}
		});
	});
	//编辑_企业用工情况
	$("#addAccessory5").click(function() {
		var parameter = {
			"id": cid,
			"companyName": $('#agencyNumber2').val(),
			"employTotal": parseInt($('#agencyName4').val()),
			"employPart": parseInt($('#agencyName5').val()),
		}
		if($('#agencyNumber2').val() == '' || $('#agencyName4').val() == '' || $('#agencyName5').val() == '') {
			$("#addAccessory5").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/modifyCorporationEmploy',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(".corporationEmploy1 tr").remove();
					tableGate.actionEle2.loadData();
				}
			});
			$('#spanTip5').html('');
			$('#workerspan1').html('');
			$('#peoplespan1').html('');
		}
	});
	
	//====================================================数据入录——用工需求====================================================================

	//加载数据
	tableGate.actionEle3.loadData = function() {
		var dom = this.dom;

		this.parameter.criteria = {
			"companyName": $(".searchName2").val()
		}
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/queryCorporationResource',
			async: false,
			data: JSON.stringify(this.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(msg) {
				tableGate[dom.id].totalPage = msg.totalPage;

				//拼装数据
				for(i = 0; i < msg.data.length; i++) {
					var item = "<tr><td nowrap class='td1'>" +
						"</td><td nowrap class='td2'>" + msg.data[i].companyName +
						"</td><td nowrap class='td3'>" + msg.data[i].resPosition +
						"</td><td nowrap class='td4'>" + msg.data[i].resRequire +
						"</td><td nowrap class='td5'>" + msg.data[i].resLoss +
						"</td><td><a class='btn btn-default change' data-toggle='modal' data-target='#editor3' onclick='showthis3(this);' style='outline: none;'  id=" + msg.data[i].id + ">编辑</a>" +
						"<a class='btn btn-warning del' data-toggle='modal' data-target='#delete' style='outline: none; margin-left:5px;'  id=" + msg.data[i].id + ">删除</a></td></tr>";
					$(dom).find("tbody").append(item);
				}
				//	序号自动增长
				var len = $(dom).find("tbody tr").length;
				var num = 0;
				for(var i = 0; i < len; i++) {
					num++;
					$('.corporationResource2 tr:eq(' + i + ') td:first').html(num);
					if(i == len - 1) {
						num = 0;
					}
				}

				//生成页码
				var totalPage = msg.totalPage;
				var page = parseInt(tableGate.actionEle3.parameter.pageIndex);
				$(dom).find('.pagination .pageNo').remove();
				if(totalPage <= 6) {
					while(totalPage > 0) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + totalPage + '">' + totalPage + '</a></li>');
						totalPage--
					}
				} else {
					if(page > 3 && totalPage - 2 >= page) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (page - 2) + '">' + (page - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page - 1) + '">' + (page - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page) + '">' + page +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 1) + '">' + (page + 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 2) + '">' + (page + 2) +
							'</a></li>');
					} else if(page > 3 && totalPage - 2 < page) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 4) + '">' + (totalPage - 4) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 3) + '">' + (totalPage - 3) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 2) + '">' + (totalPage - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 1) + '">' + (totalPage - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage) + '">' + totalPage +
							'</a></li>');
					} else {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo1">' + 1 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo2">' + 2 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo3">' + 3 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo4">' + 4 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo5">' + 5 +
							'</a></li>');
					}

				}
				//获取当前页面的页码变色
				$(dom).find('.pagination .pageNo' + tableGate[dom.id].parameter.pageIndex).css('background-color', '#ddd');
				//注册页码跳转事件
				$(dom).find('.pagination .pageNo').click(function() {
					tableGate[dom.id].goPage($(this).text());
				})
				//删除
				$(".del").click(function() {
					id = $(this).attr("id");
				});
				$(".change").click(function() {
					cid = $(this).attr("id");
				});
			}
		});
	}
	//注册上一页按钮事件
	$(tableGate.actionEle3.dom).find('.pagination #previous').click(function() {
		tableGate.actionEle3.prevPage();
	})
	//注册下一页按钮事件
	$(tableGate.actionEle3.dom).find('.pagination #next').click(function() {
		tableGate.actionEle3.nextPage();
	})
	//首页
	$(tableGate.actionEle3.dom).find('.pagination #fristPage').click(function() {
		tableGate.actionEle3.goPage(1);
		$(tableGate.actionEle3.dom).find(".pageNumber").html(1);
	})
	//尾页
	$(tableGate.actionEle3.dom).find('.pagination #lastPage').click(function() {
		tableGate.actionEle3.goPage(tableGate.actionEle3.totalPage);
		$(tableGate.actionEle3.dom).find(".pageNumber").html(tableGate.actionEle3.totalPage);
	})
	//跳转页数
	$(tableGate.actionEle3.dom).find('#jumpPage').click(function() {
		var jumPage = $(tableGate.actionEle3.dom).find("#toPage").val();
		if(jumPage <= tableGate.actionEle3.totalPage) {
			tableGate.actionEle3.goPage(jumPage);
			if(jumPage < tableGate.actionEle3.totalPage) {
				$(tableGate.actionEle3.dom).find("#toPage").val(1);
			} else {
				$(tableGate.actionEle3.dom).find("#toPage").val(jumPage);
			}
		} else {
			tableGate.actionEle3.goPage(tableGate.actionEle3.totalPage);
			if(jumPage > tableGate.actionEle3.totalPage) {
				$(tableGate.actionEle3.dom).find("#toPage").val(tableGate.actionEle3.totalPage);
			} else {
				$(tableGate.actionEle3.dom).find("#toPage").val(jumPage);
			}
		}

	})
	//声明下一页函数
	tableGate.actionEle3.nextPage = function() {
		if(this.parameter.pageIndex >= this.totalPage) {
			alert('已经是最后一页');
			return;
		}
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex++;
		this.loadData();
	}
	//声明上一页函数
	tableGate.actionEle3.prevPage = function() {
		if(this.parameter.pageIndex <= 1) {
			alert('已经是第一页');
			return;
		}
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex--;
		this.loadData();
	}
	//声明搜索函数
	tableGate.actionEle3.search = function() {
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex = 1;
		this.loadData();
	}
	//声明跳转函数
	tableGate.actionEle3.goPage = function(pageNo) {
		this.parameter.pageIndex = pageNo;
		$(this.dom).find("tbody").html('');
		this.loadData();
	}
	tableGate.actionEle3.loadData()

	//	//新增_用工需求
	$("#addAccessory2").click(function() {
		var ele = this
		var title = $('#agencyNumber1').val();
		var parameter = {
			"companyName": $('#agencyNumber1').val(),
			"resPosition": $('#agencyName2').val(),
			"resRequire": parseInt($('#agencyName3').val()),
			"resLoss": parseInt($('#address2').val())
		}
		if($('#agencyNumber1').val() == '' || $('#agencyName2').val() == '' || $('#agencyName3').val() == '' || $('#address2').val() == '') {
			$("#addAccessory2").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/addCorporationResource',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(tableGate.actionEle3.dom).find('tbody').html('')
					var actionEleId = $(ele).parents('.tableEle').attr('id');
					tableGate.actionEle3.parameter.pageIndex = 1;
					tableGate.actionEle3.loadData();
				}
			});
			$('#agencyNumber1').val('');
			$('#agencyName2').val('');
			$('#agencyName3').val('');
			$('#address2').val('');
			$('#spanTip1').html('');
			$('#agencySpan').html('');
			$('#WantSpan').html('');
			$('#peopleSpanTip').html('');
		}
	});
	//删除_用工需求
	$("#deleteData").click(function() {
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/deleteCorporationResource',
			async: false,
			data: {
				"id": id
			},
			success: function(msg) {
				$(".corporationResource2 tr").remove();
				tableGate.actionEle3.loadData();
				if(tableGate.actionEle3.totalPage < tableGate.actionEle3.parameter.pageIndex) {
					tableGate.actionEle3.parameter.pageIndex = tableGate.actionEle3.parameter.pageIndex - 1;
					tableGate.actionEle3.loadData();
				}
			}
		});
	});
	//编辑_企业用工需求
	$("#addAccessory6").click(function() {
		var parameter = {
			"id": cid,
			"companyName": $('#agencyNumber3').val(),
			"resPosition": $('#agencyName6').val(),
			"resRequire": parseInt($('#agencyName7').val()),
			"resLoss": parseInt($('#address4').val())
		}
		if($('#agencyNumber3').val() == '' || $('#agencyName6').val() == '' || $('#agencyName7').val() == '' || $('#address4').val() == '') {
			$("#addAccessory6").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/modifyCorporationResource',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(".corporationResource2 tr").remove();
					tableGate.actionEle3.loadData();
				}
			});
			$('#spanTip1').html('');
			$('#agencySpan').html('');
			$('#WantSpan').html('');
			$('#peopleSpanTip').html('');
		}
	});
	//====================================================数据入录——医疗保险====================================================================
	//加载数据
	tableGate.actionEle4.loadData = function() {
		var dom = this.dom;

		this.parameter.criteria = {
			"regionName": $(".searchName3").val()
		}
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/queryMecialInsurance',
			async: false,
			data: JSON.stringify(this.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(msg) {
				tableGate[dom.id].totalPage = msg.totalPage;

				//拼装数据
				for(i = 0; i < msg.data.length; i++) {
					var item = "<tr><td nowrap class='td1'>" + msg.data[i].regionName +
						"</td><td nowrap class='td2'>" + msg.data[i].regionHousehold +
						"</td><td nowrap class='td3'>" + msg.data[i].securityCareer +
						"</td><td nowrap class='td4'>" + msg.data[i].securityResident +
						"</td><td nowrap class='td5'>" + msg.data[i].securityRate +
						"%</td><td><a class='btn btn-default change' data-toggle='modal' data-target='#editor4' onclick='showthis4(this);' style='outline: none;'  id=" + msg.data[i].id + ">编辑</a>" +
						"<a class='btn btn-warning del' data-toggle='modal' data-target='#delete' style='outline: none; margin-left:5px;'  id=" + msg.data[i].id + ">删除</a></td></tr>";
					$(dom).find("tbody").append(item);
				}

				//生成页码
				var totalPage = msg.totalPage;
				var page = parseInt(tableGate.actionEle4.parameter.pageIndex);
				$(dom).find('.pagination .pageNo').remove();
				if(totalPage <= 6) {
					while(totalPage > 0) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + totalPage + '">' + totalPage + '</a></li>');
						totalPage--
					}
				} else {
					if(page > 3 && totalPage - 2 >= page) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (page - 2) + '">' + (page - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page - 1) + '">' + (page - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page) + '">' + page +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 1) + '">' + (page + 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (page + 2) + '">' + (page + 2) +
							'</a></li>');
					} else if(page > 3 && totalPage - 2 < page) {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 4) + '">' + (totalPage - 4) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 3) + '">' + (totalPage - 3) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 2) + '">' + (totalPage - 2) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage - 1) + '">' + (totalPage - 1) +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo' + (totalPage) + '">' + totalPage +
							'</a></li>');
					} else {
						$(dom).find('.pagination #previous').after('<li><a href="javascript:;" class="pageNo pageNo1">' + 1 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo2">' + 2 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo3">' + 3 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo4">' + 4 +
							'</a></li><li><a href="javascript:;" class="pageNo pageNo5">' + 5 +
							'</a></li>');
					}

				}
				//获取当前页面的页码变色
				$(dom).find('.pagination .pageNo' + tableGate[dom.id].parameter.pageIndex).css('background-color', '#ddd');
				//注册页码跳转事件
				$(dom).find('.pagination .pageNo').click(function() {
					tableGate[dom.id].goPage($(this).text());
				})
				//删除
				$(".del").click(function() {
					id = $(this).attr("id");
				});
				$(".change").click(function() {
					cid = $(this).attr("id");
				});
			}
		});
	}
	//注册上一页按钮事件
	$(tableGate.actionEle4.dom).find('.pagination #previous').click(function() {
		tableGate.actionEle4.prevPage();
	})
	//注册下一页按钮事件
	$(tableGate.actionEle4.dom).find('.pagination #next').click(function() {
		tableGate.actionEle4.nextPage();
	})
	//首页
	$(tableGate.actionEle4.dom).find('.pagination #fristPage').click(function() {
		tableGate.actionEle4.goPage(1);
		$(tableGate.actionEle4.dom).find(".pageNumber").html(1);
	})
	//尾页
	$(tableGate.actionEle4.dom).find('.pagination #lastPage').click(function() {
		tableGate.actionEle4.goPage(tableGate.actionEle4.totalPage);
		$(tableGate.actionEle4.dom).find(".pageNumber").html(tableGate.actionEle4.totalPage);
	})
	//跳转页数
	$(tableGate.actionEle4.dom).find('#jumpPage').click(function() {
		var jumPage = $(tableGate.actionEle4.dom).find("#toPage").val();
		if(jumPage <= tableGate.actionEle4.totalPage) {
			tableGate.actionEle4.goPage(jumPage);
			if(jumPage < tableGate.actionEle4.totalPage) {
				$(tableGate.actionEle4.dom).find("#toPage").val(1);
			} else {
				$(tableGate.actionEle4.dom).find("#toPage").val(jumPage);
			}
		} else {
			tableGate.actionEle4.goPage(tableGate.actionEle4.totalPage);
			if(jumPage > tableGate.actionEle4.totalPage) {
				$(tableGate.actionEle4.dom).find("#toPage").val(tableGate.actionEle4.totalPage);
			} else {
				$(tableGate.actionEle4.dom).find("#toPage").val(jumPage);
			}
		}

	})
	//声明下一页函数
	tableGate.actionEle4.nextPage = function() {
		if(this.parameter.pageIndex >= this.totalPage) {
			alert('已经是最后一页');
			return;
		}
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex++;
		this.loadData();
	}
	//声明上一页函数
	tableGate.actionEle4.prevPage = function() {
		if(this.parameter.pageIndex <= 1) {
			alert('已经是第一页');
			return;
		}
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex--;
		this.loadData();
	}

	//声明搜索函数
	tableGate.actionEle4.search = function() {
		$(this.dom).find("tbody").html('');
		this.parameter.pageIndex = 1;
		this.loadData();
	}
	//声明跳转函数
	tableGate.actionEle4.goPage = function(pageNo) {
		this.parameter.pageIndex = pageNo;
		$(this.dom).find("tbody").html('');
		this.loadData();
	}
	tableGate.actionEle4.loadData()

	//	//新增_医疗保险
	$("#addAccessory3").click(function() {
		var ele = this
		var title = $('#personalNumber1').val();
		var parameter = {
			"regionName": $('#personalNumber1').val(),
			"regionHousehold": parseInt($('#userName2').val()),
			"securityCareer": parseInt($('#idCard1').val()),
			"securityResident": parseInt($('#totalAmount').val())
		}

		if($('#personalNumber1').val() == '' || $('#userName2').val() == '' || $('#idCard1').val() == '' || $('#totalAmount').val() == '') {
			$("#addAccessory3").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/addMecialInsurance',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(tableGate.actionEle4.dom).find('tbody').html('')
					var actionEleId = $(ele).parents('.tableEle').attr('id');
					tableGate.actionEle4.parameter.pageIndex = 1;
					tableGate.actionEle4.loadData();
				}
			});
			$('#personalNumber1').val('');
			$('#userName2').val('');
			$('#idCard1').val('');
			$('#totalAmount').val('');
			$('#spanTip2').html('');
			$('#peopleSpan1').html('');
			$('#workerSpan1').html('');
			$('#oldSpan1').html('');
		}
	});
	//删除_医疗保险
	$("#deleteData").click(function() {
		$.ajax({
			type: "post",
			url: ipAddress + '/stats/deleteMecialInsurance',
			async: false,
			data: {
				"id": id
			},
			success: function(msg) {
				$(".mecialInsurance1 tr").remove();
				tableGate.actionEle4.loadData();
				if(tableGate.actionEle4.totalPage < tableGate.actionEle4.parameter.pageIndex) {
					tableGate.actionEle4.parameter.pageIndex = tableGate.actionEle4.parameter.pageIndex - 1;
					tableGate.actionEle4.loadData();
				}
			}
		});
	});
	//编辑_医疗保险
	$("#addSaves").click(function() {
		var parameter = {
			"id": cid,
			"regionName": $('#personalNumber').val(),
			"regionHousehold": parseInt($('#userName5').val()),
			"securityCareer": parseInt($('#idCard3').val()),
			"securityResident": parseInt($('#totalAmount1').val())
		}
		if($('#personalNumber').val() == '' || $('#userName5').val() == '' || $('#idCard3').val() == '' || $('#totalAmount1').val() == '') {
			$("#addSaves").attr("disabled", "disabled");
		} else {
			$.ajax({
				type: "post",
				url: ipAddress + '/stats/modifyMecialInsurance',
				async: false,
				data: JSON.stringify(parameter),
				contentType: 'application/json;charset=UTF-8',
				success: function(msg) {
					$(".mecialInsurance1 tr").remove();
					tableGate.actionEle4.loadData();
				}
			});
			$('#spanTip2').html('');
			$('#peopleSpan1').html('');
			$('#workerSpan1').html('');
			$('#oldSpan1').html('');
		}
	});
})();