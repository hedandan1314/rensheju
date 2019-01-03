$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if(o[this.name]) {
			if(!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
var tableGate = {}

function show_sub(v) {

	if(v == '13') {
		//document.getElementById('imptype').value = '13';
		document.getElementById('panel1').style.display = 'block';
		document.getElementById('panel2').style.display = 'none';
		document.getElementById('panel3').style.display = 'none';
		tableGate.actionEle1.parameter.pageIndex = 1;
//		tableGate.actionEle1.loadData()
	} else if(v == '14') {
		//document.getElementById('imptype').value = '14';
		document.getElementById('panel2').style.display = 'block';
		document.getElementById('panel1').style.display = 'none';
		document.getElementById('panel3').style.display = 'none';
		tableGate.actionEle2.parameter.pageIndex = 1;
//		tableGate.actionEle2.loadData()
	} else if(v == '15') {
		// document.getElementById('imptype').value = '15';
		document.getElementById('panel1').style.display = 'none';
		document.getElementById('panel2').style.display = 'none';
		document.getElementById('panel3').style.display = 'block';
		tableGate.actionEle3.parameter.pageIndex = 1;
//		tableGate.actionEle3.loadData()
	}
}

$(function() {
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
			flag = true;
		}

	})
	$('#myModal4').on('shown.bs.modal', function() { //提示框显示时候触发
		uploader.refresh(); //刷新当前webUploder
	});
	var uploader = WebUploader.create({

		// swf文件路径
		swf: '../assets/js/Uploader.swf',

		// 文件接收服务端。
		server: 'http://192.168.100.180:8080/datasrv/importData',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#picker',

		// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		resize: false,
		chunked: true, // 是否分片
		duplicate: true, //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.

	});
	//点击关闭，存放文件全部清空
	$('#fileClose').click(function() {
		$('#thelist').html("");
	})
	$('.fileClose').click(function() {
		$('#thelist').html("")
	})
	uploader.on('fileQueued', function(file) {
		$("#thelist").append('<div id="' + file.id + '" class="item" style="position:relative">' +

			'<div class="am-badge" style="float:left;">' + file.name + '</div>' + '<div class="fa fa-close fileRemove" style="float:right;    cursor: pointer"></div>' + '</br>' +

			'<p class="state">等待导入...</p>' +

			'</div>');
		//点击删除按钮此行删除
		$('.fileRemove').click(function() {
			$(this).parent().remove()
		})
		//追加导入数据类型    
		uploader.on('uploadBeforeSend', function(obj, data) {
			//传入表单参数
			data = $.extend(data, {
				"imptype": $('#mySelect  option:selected').val()
			});
		});
		// 文件上传过程中创建进度条实时显示。
		uploader.on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress .progress-bar');

			// 避免重复创建
			if(!$percent.length) {
				$percent = $('<div class="progress progress-striped active">' +
					'<div class="progress-bar" role="progressbar" style="width: 0%">' +
					'</div>' +
					'</div>').appendTo($li).find('.progress-bar');
			}

			$li.find('p.state').text('导入中');

			$percent.css('width', percentage * 100 + '%');
		});
	});
	uploader.on('uploadSuccess', function(file, result) {
		console.log('result success=', result);
		if(result.code == 4004) {
			$('#' + file.id).find('p.state').text('导入成功');
			$('#' + file.id).find('p.state').append('<div style="color:red ;font-size:13px">' + result.message + '</div>');
		} else if(result.code == 1000) {
			$('#' + file.id).find('p.state').text('导入出错');
			$('#' + file.id).find('p.state').append('<div style="color:red ;font-size:13px">数据异常</div>');
		} else {
			$('#' + file.id).find('p.state').text('导入出错');
			$('#' + file.id).find('p.state').append('<div style="color:red ;font-size:13px">' + result.message + '</div>');
		}
	});

	uploader.on('uploadError', function(file, result) {
		console.log('result=', result);
		$('#' + file.id).find('p.state').text('导入出错');
		$('#' + file.id).find('p.state').append('<div style="color:red ;font-size:13px">' + result.message + '</div>');
	});

	uploader.on('uploadComplete', function(file) {
		$('#' + file.id).find('.progress').fadeOut();
	})
	//点击开始导入，进行导入
	$("#ctlBtn").click(function() {
		uploader.upload();
		//		var parameter = {
		//			"imptype": 13,
		//		}
		//		$.ajax({
		//			type: "post",
		//			data: parameter,
		//			url: 'http://' + domainName + ":8080/datasrv/importData",
		//			async: false,
		//			cache: false,
		//			contentType: false,
		//			processData: false,
		//			success: function(result) {
		//				console.log(result)
		//			}
		//		});
	});

	$("#mySelect").change(function() {
		$(".drugs tr").remove();
		$(".diagnosis tr").remove();
		$(".materialScience tr").remove();
		var a = $("#mySelect option:selected").val();
		//		alert(a)
		if(a == 13) {
			tableGate.actionEle1.loadData();
		};
		if(a == 14) {
			tableGate.actionEle2.loadData();
		};
		if(a == 15) {
			tableGate.actionEle3.loadData();
		};

	});

	//全局变量
	function actionEle(id) {
		this.parameter = {
			"pageIndex": 1,
			"recordCount": 5
		};
		this.totalPage = 0;
		this.dom = $('#' + id).get(0);

	}
	var generalName = "";
	//加载数据   搜索  向后翻页  向前翻页  跳到某页 删除
	tableGate = {};
	tableGate.actionEle1 = new actionEle('panel1');
	tableGate.actionEle2 = new actionEle('panel2');
	tableGate.actionEle3 = new actionEle('panel3');

	tableGate.actionEle1.loadData = function() {
		var dom = this.dom;
		//console.log("aaa" + dom)
		$(tableGate.actionEle1.dom).find("#toPage").val("");
		$(".drugs tr").remove();

		this.parameter.criteria = {
			"generalName": generalName
		}

		$.ajax({
			url: ipAddress + "/service/queryMedicine",
			type: "post",
			data: JSON.stringify(this.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				tableGate.actionEle1.totalPage = result.totalPage;
				//console.log(result)
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + result.data[i].id +
						'</td>' +
						'<td>' + result.data[i].categoryCode +
						'</td>' +
						'<td>' + result.data[i].generalCode +
						'</td>' +
						'<td>' + result.data[i].ogeneralCode +
						'</td>' +
						'<td>' + result.data[i].generalName +
						'</td>' +
						'<td>' + '<a class="btn btn-success detail" data-toggle="modal" data-target="#detail" style="outline: none;" >查看</a>' +
						'</td>' +
						'<input type="hidden"  id=' + result.data[i].id + '>' +
						'</tr>'
					$(dom).find('#medicalTb tbody').append(html)
					//生成页码
					var totalPage = result.totalPage;
					//console.log(totalPage);
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
					$(dom).find('.pagination .pageNo' + tableGate.actionEle1.parameter.pageIndex).css('background-color', '#ddd');
					//注册页码跳转事件_养老保险
					$(dom).find('.pagination .pageNo').click(function() {
						tableGate.actionEle1.goPage($(this).text());

					})

					//删除获取ID
					$(".del").click(function() {
						id = $(this).attr("id");
					})
					$(".change").click(function() {
						cid = $(this).attr("id");
					})
				}
				$('.detail').click(function() {
					var id = $(this).parent().next().attr("id")
					//alert(id)
					$.ajax({
						type: "post",
						url: ipAddress + "/service/detailMedicine",
						async: true,
						data: {
							"id": id
						},
						success: function(result) {
							console.log(result)
							$('#medicalId').val(result.id); //序号
							$('#medicalCategoryCode').val(result.categoryCode); //分类编码
							$('#medicalGeneralCode').val(result.generalCode); //药品通用名编码
							$('#medicalOgeneralCode').val(result.ogeneralCode); //原药品通用名编码
							$('#medicalGeneralName').val(result.generalName); //中文通用名
							$('#medicalPaymentType').val(result.paymentType); //支付类别
							$('#medicalMarkDosage').val(result.markDosage); //标注剂型
							$('#medicalProductCode').val(result.productCode); //产品名编码
							$('#medicalMedicalRatio').val(result.medicalRatio); //基本医疗自付比例
							$('#medicalOverallRatio').val(result.overallRatio); //居民统筹自付比例
							$('#medicalRetireRatio').val(result.retireRatio); //离休自付比列
							$('#medicalInjuryRatio').val(result.injuryRatio); //工伤保险自付比例
							$('#medicalBirthRatio').val(result.birthRatio); //生育保险自付比例
							$('#medicalProductName').val(result.productName); //产品名称
							$('#medicalCommercialName').val(result.commercialName); //商品名
							$('#medicalDosage').val(result.dosage); //剂型
							$('#medicalSpecs').val(result.specs); //规格
							$('#medicalPackMaterial').val(result.packMaterial); //包装材质
							$('#medicalMinPackVolume').val(result.minPackVolume); //最小包装数量（转换比）
							$('#medicalUnit').val(result.unit); //单位
							$('#medicalIsOtc').val(result.isOtc); //是否OTC
							$('#medicalIsBase').val(result.isBase); //是否基药
							$('#medicalMarkPrice').val(result.markPrice); //低价药标识
							$('#medicalGovPrice').val(result.govPrice); //政府定价
							$('#medicalProcurePrice').val(result.procurePrice); //省集中采购上限价
							$('#medicalOfficialNumber').val(result.officialNumber); //药品批准文号
							$('#medicalSupplier').val(result.supplier); //供应商   			
							$('#medicalManufacturer').val(result.manufacturer); //生产企业
							$('#medicalPaymentScope').val(result.paymentScope); //限定支付范围
							$('#medicalCatalogNumber').val(result.catalogNumber); //省目录编号
							$('#medicalReportingNumber').val(result.reportingNumber); //招标申报编号
							$('#medicalVariationType').val(result.variationType); //变更类型
							$('#medicalVariationCause').val(result.variationCause); //变更原因   			
						}
					});
					//点击编辑按钮进行编辑，表单去除只读属性同事保存按钮可点击
					$('.editOne').click(function() {
						$('.saveOne').removeAttr('disabled');
						$('.disabledInput').removeAttr('readonly');
						//点击保存按钮，表单只读保存不可点击，同时刷新页面
						$('.saveOne').click(function() {
							var formData = $('#formInformation1').serializeObject();
							$.ajax({
								type: "post",
								url: ipAddress + "/service/modifyMedicine",
								data: JSON.stringify(formData),
								contentType: 'application/json;charset=UTF-8',
								processData: false,
								async: false,
								success: function(result) {
									if(result.code == 3030) {
										alert("修改成功")
										tableGate.actionEle3.loadData();
									}

								}
							});
							$('#detail').modal('hide')
							$('.saveOne').attr({
								'disabled': 'disabled'
							});

							$('.disabledInput').attr({
								'readonly': 'true'
							});
							//							location.reload()
						})
					})

				})

			}

		})
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
		if(jumPage < 1) {
			jumPage = 1;
			$(tableGate.actionEle1.dom).find("#toPage").val("1");
		}
		if(jumPage > tableGate.actionEle1.totalPage) {
			$("#toPage").val(tableGate.actionEle1.totalPage);
		}
		if(jumPage <= tableGate.actionEle1.totalPage) {
			tableGate.actionEle1.goPage(jumPage);
			$(tableGate.actionEle1.dom).find(".pageNumber").html(jumPage);
		} else {
			tableGate.actionEle1.goPage(tableGate.actionEle1.totalPage);
			$(tableGate.actionEle1.dom).find(".pageNumber").html(tableGate.actionEle1.totalPage);
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

	$(".button1").click(function() {
		tableGate.actionEle1.parameter.pageIndex=1;
		generalName = $(".chineName1").val();
		tableGate.actionEle1.loadData();
	})

	tableGate.actionEle1.loadData();

	//------------------------------------------------------------------//
	var chargeName = "";
	tableGate.actionEle2.loadData = function() {
		var dom = this.dom;
		console.log("aaa" + dom)
		$(".diagnosis tr").remove();
		this.parameter.criteria = {
			"chargeName": chargeName
		}

		$.ajax({
			url: ipAddress + "/service/queryDiagnosis",
			type: "post",
			data: JSON.stringify(this.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				tableGate.actionEle2.totalPage = result.totalPage;
				console.log("aaaa" + result)
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + result.data[i].id +
						'</td>' +
						'<td>' + result.data[i].chargeCode +
						'</td>' +
						'<td>' + result.data[i].chargeName +
						'</td>' +
						'<td>' + '<a class="btn btn-success detail2" data-toggle="modal" data-target="#detail2" style="outline: none;">查看</a>' +
						'</td>' +
						'<input type="hidden"  id=' + result.data[i].id + '>' +
						'</tr>'
					$(dom).find('#DiagnosisTb .diagnosis').append(html)
					//生成页码
					var totalPage = result.totalPage;
					console.log(totalPage);
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
					$(dom).find('.pagination .pageNo' + tableGate.actionEle2.parameter.pageIndex).css('background-color', '#ddd');
					//注册页码跳转事件_养老保险
					$(dom).find('.pagination .pageNo').click(function() {
						tableGate.actionEle2.goPage($(this).text());

					})

					//删除获取ID
					$(".del").click(function() {
						id = $(this).attr("id");
					})
					$(".change").click(function() {
						cid = $(this).attr("id");
					})

				}

				//查看诊疗明细
				var id;
				$('.detail2').click(function() {
					id = $(this).parent().next().attr("id")
					$.ajax({
						type: "post",
						url: ipAddress + "/service/detailDiagnosis",
						async: true,
						data: {
							"id": id
						},
						success: function(result) {
							console.log(result)
							$('#DiagnosisId').val(result.id); //序号
							$('#DiagnosisChargeCode').val(result.chargeCode); //收费项目编码
							$('#DiagnosisChargeName').val(result.chargeName); //收费项目名称
							$('#DiagnosisChargeType').val(result.chargeType); //收费类别
							$('#DiagnosisChargeLevel').val(result.chargeLevel); //收费项目等类
							$('#DiagnosisMedicalRatio').val(result.medicalRatio); //基本医疗自付比例
							$('#DiagnosisOverallRatio').val(result.overallRatio); //居民统筹自付比例
							$('#DiagnosisInjuryRatio').val(result.injuryRatio); //工伤保险自付比例
							$('#DiagnosisBirthRatio').val(result.birthRatio); //生育保险自付比例
							$('#DiagnosisRetireRatio').val(result.retireRatio); //离休自付比例
							$('#DiagnosisProjectContent').val(result.projectContent); //项目内涵
							$('#DiagnosisExtraContent').val(result.extraContent); //除外内容
							$('#DiagnosisUnit').val(result.unit); //计价单位
							$('#DiagnosisSHospital3').val(result.sHospital3); //三类医院苏南
							$('#DiagnosisMHospital3').val(result.mHospital3); //三类医院苏中
							$('#DiagnosisNHospital3').val(result.nHospital3); //三类医院苏北
							$('#DiagnosisSHospital2').val(result.sHospital2); //二类医院苏南
							$('#DiagnosisMHospital2').val(result.mHospital2); //二类医院苏中
							$('#DiagnosisNHospital2').val(result.nHospital2); //二类医院苏北
							$('#DiagnosisSHospital1').val(result.sHospital1); //一类医院苏南
							$('#DiagnosisMHospital1').val(result.mHospital1); //一类医院苏中
							$('#DiagnosisNHospital1').val(result.nHospital1); //一类医院苏北
							$('#DiagnosisDescription').val(result.description); //说明
							$('#DiagnosisVariationType').val(result.variationType); //变更类别
							$('#DiagnosisVariationContent').val(result.variationContent); //变更内容
							$('#DiagnosisEvidence').val(result.evidence); //文件依据
							$('#DiagnosisScope').val(result.scope); //执行范围   			
							$('#DiagnosisRemark').val(result.remark); //备注	
						}
					});
					//点击编辑按钮进行编辑，表单去除只读属性同事保存按钮可点击
					$('.editTwo').click(function() {
						$('.saveTwo').removeAttr('disabled');
						$('.disabledInput').removeAttr('readonly');
						//点击保存按钮，表单只读保存不可点击，同时刷新页面
						$('.saveTwo').click(function() {
							var formData = $('#formInformation2').serializeObject();
							$.ajax({
								type: "post",
								url: ipAddress + "/service/modifyDiagnosis",
								data: JSON.stringify(formData),
								contentType: 'application/json;charset=UTF-8',
								processData: false,
								async: false,
								success: function(result) {
									//console.log(result)
								}
							});
							$('#detail2').modal('hide')
							$('.saveTwo').attr({
								'disabled': 'disabled'
							});

							$('.disabledInput').attr({
								'readonly': 'true'
							});
							//$('#DiagnosisSearch').attr('value','')
							//$('#DiagnosisTb').DataTable().ajax.reload(); 
							//$("#panel2").load(location.href+"#panel2");
							//location.reload() 	  			
						})
					})

				})
			}
		})
	}
	//上一页按钮事件_养老保险
	$(tableGate.actionEle2.dom).find('.pagination #previous').click(function() {
		tableGate.actionEle2.prevPage();
	})
	//下一页按钮事件_养老保险
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
		tableGate.actionEle2.goPage(tableGate.actionEle1.totalPage);
		$(tableGate.actionEle2.dom).find(".pageNumber").html(tableGate.actionEle2.totalPage);
	})
	//跳转页数
	$(tableGate.actionEle2.dom).find('#jumpPage').click(function() {
		var jumPage = $(tableGate.actionEle2.dom).find("#toPage").val();
		if(jumPage < 1) {
			jumPage = 1;
			$(tableGate.actionEle2.dom).find("#toPage").val("1");
		}

		if(jumPage > tableGate.actionEle2.totalPage) {
			$(tableGate.actionEle2.dom).find("#toPage").val(tableGate.actionEle2.totalPage);
		}
		if(jumPage <= tableGate.actionEle2.totalPage) {
			tableGate.actionEle2.goPage(jumPage);
			$(tableGate.actionEle2.dom).find(".pageNumber").html(jumPage);
		} else {
			tableGate.actionEle2.goPage(tableGate.actionEle2.totalPage);
			$(tableGate.actionEle2.dom).find(".pageNumber").html(tableGate.actionEle2.totalPage);
		}

	})
	//声明下一页函数_养老保险
	tableGate.actionEle2.nextPage = function() {
		if(this.parameter.pageIndex >= this.totalPage) {
			alert('已经是最后一页');
			return;
		}
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex++;
		this.loadData();
	}
	//声明上一页函数_养老保险
	tableGate.actionEle2.prevPage = function() {
		if(this.parameter.pageIndex <= 1) {
			alert('已经是第一页');
			return;
		}
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex--;
		this.loadData();
	}
	//声明搜索函数_养老保险
	tableGate.actionEle2.search = function() {
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex = 1;
		this.loadData();
	}
	//声明跳转函数
	tableGate.actionEle2.goPage = function(pageNo) {
		this.parameter.pageIndex = pageNo;
		$(this.dom).find("tbody").html('')
		this.loadData();
	}

	$(".button2").click(function() {
tableGate.actionEle2.parameter.pageIndex=1;
		chargeName = $(".chineName2").val();

		tableGate.actionEle2.loadData();
	})

	//----------------------------------------------------------------------------------//

	var materialName = "";
	tableGate.actionEle3.loadData = function() {
		var dom = this.dom;
		console.log("aaa" + dom)
		$(".materialScience tr").remove();
		this.parameter.criteria = {
			"materialName": materialName
		}

		$.ajax({
			url: ipAddress + "/service/queryClinical",
			type: "post",
			data: JSON.stringify(this.parameter),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				tableGate.actionEle3.totalPage = result.totalPage;
				console.log(result)
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + result.data[i].id +
						'</td>' +
						'<td>' + result.data[i].materialCode +
						'</td>' +
						'<td>' + result.data[i].materialName +
						'</td>' +
						'<td>' + '<a class="btn btn-success detail3" data-toggle="modal" data-target="#detail3" style="outline: none;">查看</a>' +
						'</td>' +
						'<input type="hidden"  id=' + result.data[i].id + '>' +
						'</tr>'
					$(dom).find('#ClinicalTb tbody').append(html)
					//生成页码
					var totalPage = result.totalPage;
					console.log(totalPage);
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
					$(dom).find('.pagination .pageNo' + tableGate.actionEle3.parameter.pageIndex).css('background-color', '#ddd');
					//注册页码跳转事件_养老保险
					$(dom).find('.pagination .pageNo').click(function() {
						tableGate.actionEle3.goPage($(this).text());

					})

					//删除获取ID
					$(".del").click(function() {
						id = $(this).attr("id");
					})
					$(".change").click(function() {
						cid = $(this).attr("id");
					})
				}
				//查看诊疗明细
				var id;
				$('.detail3').click(function() {
					id = $(this).parent().next().attr("id")
					$.ajax({
						type: "post",
						url: ipAddress + "/service/detailClinical",
						async: true,
						data: {
							"id": id
						},
						success: function(result) {
							console.log(result)
							$('#ClinicalId').val(result.id); //序号
							$('#ClinicalMaterialCode').val(result.materialCode); //编码
							$('#ClinicalMaterialName').val(result.materialName); //特殊材料名称
							$('#ClinicalMaterialSpecs').val(result.materialSpecs); //规格
							$('#ClinicalMaterialLevel').val(result.materialLevel); //特殊材料等级
							$('#ClinicalRetireRatio').val(result.retireRatio); //离休自付比例
							$('#ClinicalInjuryRatio').val(result.injuryRatio); //工伤保险自付比例
							$('#ClinicalBirthRatio').val(result.birthRatio); //生育保险自付比例
							$('#ClinicalUnit').val(result.unit); //单位
							$('#ClinicalDescription').val(result.description); //说明
							$('#ClinicalHospital').val(result.hospital); //医院
							$('#ClinicalModifyDate').val(result.modifyDate); //修改日期
							$('#ClinicalRemark').val(result.remark); //备注
						}
					});
					//点击编辑按钮进行编辑，表单去除只读属性同事保存按钮可点击
					$('.editThree').click(function() {
						$('.saveThree').removeAttr('disabled');
						$('.disabledInput').removeAttr('readonly');
						//点击保存按钮，表单只读保存不可点击，同时刷新页面
						$('.saveThree').click(function() {
							var formData = $('#formInformation3').serializeObject();
							$.ajax({
								type: "post",
								url: ipAddress + "/service/modifyClinical",
								data: JSON.stringify(formData),
								contentType: 'application/json;charset=UTF-8',
								processData: false,
								async: false,
								success: function(result) {

									if(result.code == 3030) {
										alert("修改成功")
										tableGate.actionEle3.loadData();
									}

								},
								//								complete: function () {
								//      $("#panel3").load('http://' + domainName + ":8080/service/queryClinical");
								//window.location.reload();
								// }
							});
							$('#detail3').modal('hide')
							$('.saveThree').attr({
								'disabled': 'disabled'
							});

							$('.disabledInput').attr({
								'readonly': 'true'
							});
							//$('#DiagnosisSearch').attr('value','')
							//$('#DiagnosisTb').DataTable().ajax.reload(); 
							//$("#panel2").load(location.href+"#panel2");
							//							location.reload()
						})
					})

				})

			}
		})
	}
	//上一页按钮事件_养老保险
	$(tableGate.actionEle3.dom).find('.pagination #previous').click(function() {
		tableGate.actionEle3.prevPage();
	})
	//下一页按钮事件_养老保险
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
		tableGate.actionEle3.goPage(tableGate.actionEle1.totalPage);
		$(tableGate.actionEle3.dom).find(".pageNumber").html(tableGate.actionEle3.totalPage);
	})
	//跳转页数
	$(tableGate.actionEle3.dom).find('#jumpPage').click(function() {

		var jumPage = $(tableGate.actionEle3.dom).find("#toPage").val();
		if(jumPage < 1) {
			jumPage = 1;
			$(tableGate.actionEle3.dom).find("#toPage").val("1");
		}
		if(jumPage > tableGate.actionEle3.totalPage) {
			$(tableGate.actionEle3.dom).find("#toPage").val(tableGate.actionEle3.totalPage);
		}
		if(jumPage <= tableGate.actionEle3.totalPage) {
			tableGate.actionEle3.goPage(jumPage);
			$(tableGate.actionEle3.dom).find(".pageNumber").html(jumPage);
		} else {
			tableGate.actionEle3.goPage(tableGate.actionEle3.totalPage);
			$(tableGate.actionEle3.dom).find(".pageNumber").html(tableGate.actionEle3.totalPage);
		}

	})
	//声明下一页函数_养老保险
	tableGate.actionEle3.nextPage = function() {
		if(this.parameter.pageIndex >= this.totalPage) {
			alert('已经是最后一页');
			return;
		}
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex++;
		this.loadData();
	}
	//声明上一页函数_养老保险
	tableGate.actionEle3.prevPage = function() {
		if(this.parameter.pageIndex <= 1) {
			alert('已经是第一页');
			return;
		}
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex--;
		this.loadData();
	}
	//声明搜索函数_养老保险
	tableGate.actionEle3.search = function() {
		$(this.dom).find("tbody").html('')
		this.parameter.pageIndex = 1;
		this.loadData();
	}
	//声明跳转函数
	tableGate.actionEle3.goPage = function(pageNo) {
		this.parameter.pageIndex = pageNo;
		$(this.dom).find("tbody").html('')
		this.loadData();
	}

	$(".button3").click(function() {
tableGate.actionEle3.parameter.pageIndex=1;
		materialName = $(".chineName3").val();
		tableGate.actionEle3.loadData();
	})

	//			var id;
	//	$('.detail2').click(function() {
	//		id = $(this).parent().next().attr("id")
	//		$.ajax({
	//			type: "post",
	//			url: 'http://' + domainName + ":/service/detailDiagnosis",
	//			async: true,
	//			data: {
	//				"id": id
	//			},
	//			success: function(result) {
	//				console.log(result)
	//				$('#DiagnosisId').val(result.id); //序号
	//				$('#DiagnosisChargeCode').val(result.chargeCode); //收费项目编码
	//				$('#DiagnosisChargeName').val(result.chargeName); //收费项目名称
	//				$('#DiagnosisChargeType').val(result.chargeType); //收费类别
	//				$('#DiagnosisChargeLevel').val(result.chargeLevel); //收费项目等类
	//				$('#DiagnosisMedicalRatio').val(result.medicalRatio); //基本医疗自付比例
	//				$('#DiagnosisOverallRatio').val(result.overallRatio); //居民统筹自付比例
	//				$('#DiagnosisInjuryRatio').val(result.injuryRatio); //工伤保险自付比例
	//				$('#DiagnosisBirthRatio').val(result.birthRatio); //生育保险自付比例
	//				$('#DiagnosisRetireRatio').val(result.retireRatio); //离休自付比例
	//				$('#DiagnosisProjectContent').val(result.projectContent); //项目内涵
	//				$('#DiagnosisExtraContent').val(result.extraContent); //除外内容
	//				$('#DiagnosisUnit').val(result.unit); //计价单位
	//				$('#DiagnosisSHospital3').val(result.sHospital3); //三类医院苏南
	//				$('#DiagnosisMHospital3').val(result.mHospital3); //三类医院苏中
	//				$('#DiagnosisNHospital3').val(result.nHospital3); //三类医院苏北
	//				$('#DiagnosisSHospital2').val(result.sHospital2); //二类医院苏南
	//				$('#DiagnosisMHospital2').val(result.mHospital2); //二类医院苏中
	//				$('#DiagnosisNHospital2').val(result.nHospital2); //二类医院苏北
	//				$('#DiagnosisSHospital1').val(result.sHospital1); //一类医院苏南
	//				$('#DiagnosisMHospital1').val(result.mHospital1); //一类医院苏中
	//				$('#DiagnosisNHospital1').val(result.nHospital1); //一类医院苏北
	//				$('#DiagnosisDescription').val(result.description); //说明
	//				$('#DiagnosisVariationType').val(result.variationType); //变更类别
	//				$('#DiagnosisVariationContent').val(result.variationContent); //变更内容
	//				$('#DiagnosisEvidence').val(result.evidence); //文件依据
	//				$('#DiagnosisScope').val(result.scope); //执行范围   			
	//				$('#DiagnosisRemark').val(result.remark); //备注	
	//			}
	//		});
	//				//点击编辑按钮进行编辑，表单去除只读属性同事保存按钮可点击
	//				$('.editTwo').click(function() {
	//					$('.saveTwo').removeAttr('disabled');
	//					$('.disabledInput').removeAttr('readonly');
	//					//点击保存按钮，表单只读保存不可点击，同时刷新页面
	//					$('.saveTwo').click(function() {
	//						var formData = $('#formInformation2').serializeObject();
	//						$.ajax({
	//							type: "post",
	//							url: 'http://' + domainName + ":8080/service/modifyDiagnosis",
	//							data: JSON.stringify(formData),
	//							contentType: 'application/json;charset=UTF-8',
	//							processData: false,
	//							async: false,
	//							success: function(result) {
	//								console.log(result)
	//							}
	//						});
	//						$('#detail2').modal('hide')
	//						$('.saveTwo').attr({
	//							'disabled': 'disabled'
	//						});
	//
	//						$('.disabledInput').attr({
	//							'readonly': 'true'
	//						});
	//						//$('#DiagnosisSearch').attr('value','')
	//						//$('#DiagnosisTb').DataTable().ajax.reload(); 
	//						//$("#panel2").load(location.href+"#panel2");
	//						//location.reload() 	  			
	//					})
	//				})
	//
	//			})
	//		}
})
//	//查询材料列表
//	var ClinicalInfo = {
//		"pageIndex": pageIndex,
//		"recordCount": 5,
//		"criteria": {
//			"generalName": ""
//		}
//	}
//	var html3;
//	$.ajax({
//		url: 'http://' + domainName + ":8080/service/queryClinical",
//		type: "post",
//		data: JSON.stringify(ClinicalInfo),
//		contentType: 'application/json;charset=UTF-8',
//		success: function(result) {
//			console.log(result)
//			for(var i = 0; i < result.data.length; i++) {
//				html3 += '<tr>' +
//					'<td>' + result.data[i].id +
//					'</td>' +
//					'<td>' + result.data[i].materialCode +
//					'</td>' +
//					'<td>' + result.data[i].materialName +
//					'</td>' +
//					'<td>' + '<a class="btn btn-success detail3" data-toggle="modal" data-target="#detail3" style="outline: none;">查看</a>' +
//					'</td>' +
//					'<input type="hidden"  id=' + result.data[i].id + '>' +
//					'</tr>'
//
//			}
//			$('#ClinicalTb tbody').append(html3)
//			//查看诊疗明细
//			var id;
//			$('.detail3').click(function() {
//				id = $(this).parent().next().attr("id")
//				$.ajax({
//					type: "post",
//					url: 'http://' + domainName + ":8080/service/detailClinical",
//					async: true,
//					data: {
//						"id": id
//					},
//					success: function(result) {
//						console.log(result)
//						$('#ClinicalId').val(result.id); //序号
//						$('#ClinicalMaterialCode').val(result.materialCode); //编码
//						$('#ClinicalMaterialName').val(result.materialName); //特殊材料名称
//						$('#ClinicalMaterialSpecs').val(result.materialSpecs); //规格
//						$('#ClinicalMaterialLevel').val(result.materialLevel); //特殊材料等级
//						$('#ClinicalRetireRatio').val(result.retireRatio); //离休自付比例
//						$('#ClinicalInjuryRatio').val(result.injuryRatio); //工伤保险自付比例
//						$('#ClinicalBirthRatio').val(result.birthRatio); //生育保险自付比例
//						$('#ClinicalUnit').val(result.unit); //单位
//						$('#ClinicalDescription').val(result.description); //说明
//						$('#ClinicalHospital').val(result.hospital); //医院
//						$('#ClinicalModifyDate').val(result.modifyDate); //修改日期
//						$('#ClinicalRemark').val(result.remark); //备注
//					}
//				});
//				//点击编辑按钮进行编辑，表单去除只读属性同事保存按钮可点击
//				$('.editThree').click(function() {
//					$('.saveThree').removeAttr('disabled');
//					$('.disabledInput').removeAttr('readonly');
//					//点击保存按钮，表单只读保存不可点击，同时刷新页面
//					$('.saveThree').click(function() {
//						var formData = $('#formInformation3').serializeObject();
//						$.ajax({
//							type: "post",
//							url: 'http://' + domainName + ":8080/service/modifyClinical",
//							data: JSON.stringify(formData),
//							contentType: 'application/json;charset=UTF-8',
//							processData: false,
//							async: false,
//							success: function(result) {
//								console.log(result)
//							},
//							//								complete: function () {
//							//      $("#panel3").load('http://' + domainName + ":8080/service/queryClinical");
//							//window.location.reload();
//							// }
//						});
//						$('#detail3').modal('hide')
//						$('.saveThree').attr({
//							'disabled': 'disabled'
//						});
//
//						$('.disabledInput').attr({
//							'readonly': 'true'
//						});
//						//$('#DiagnosisSearch').attr('value','')
//						//$('#DiagnosisTb').DataTable().ajax.reload(); 
//						//$("#panel2").load(location.href+"#panel2");
//						location.reload()
//					})
//				})
//
//			})
//		}
//	})
//})