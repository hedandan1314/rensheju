;
(function() {
	
	//坐标时间
	var arrDay = [];
	var arrMonth = [];
	var arrYear = [];
	

	var arr = [];
	var arr1 = [];
	var arr2 = [];
	//每日投诉
		$.ajax({
		type: "post",
		url: ipAddress + '/stats/getComplaintCountDay	',
		async: false,
		data:{serviceCode:"2018090312512803"},
		success: function(msg) {
			for(var i in msg) {
				arr.push(msg[i].count)
				var day = new Date(msg[i].day).getDay();
				switch(day) {
					case 0:
						today = "星期日";
						break;
					case 1:
						today = "星期一";
						break;
					case 2:
						today = "星期二";
						break;
					case 3:
						today = "星期三";
						break;
					case 4:
						today = "星期四";
						break;
					case 5:
						today = "星期五";
						break;
					case 6:
						today = "星期六";
						break;
				}
				arrDay.push(today);
			}
		},
	});
	//每月投诉
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getComplaintCountMonth',
		async: false,
		data:{serviceCode:"03"},
		success: function(msg) {	
			for(var i in msg) {
				arr1.push(msg[i].count)

				arrMonth.push(new Date(msg[i].month).getMonth() + 1 + "月");

			}
		},
	});
	//每年投诉
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getComplaintCountYear',
		async: false,
		data:{serviceCode:"03"},
		success: function(msg) {
			for(var i in msg) {
				arr2.push(msg[i].count)
				arrYear.push(msg[i].year + "年");

			}
		
		},
	});
	var dom = document.getElementById("container_last");
	var myChart = echarts.init(dom);
	option = null;

	var data = arr
	var dataAxis = arrDay
	var arr1 = [arr2,arr1,arr];
	var arr2 = [	arrYear,	arrMonth,arrDay];

	;
	$("#container_bottom li").on("click", function() {

		$(this).addClass("active").siblings().removeClass('active');

	})

	var obox = document.getElementById("container_bottom");
	var lis = obox.getElementsByTagName("li");
	for(var index = 0; index < lis.length; index++) {
		lis[index].theIndex = index;
		lis[index].onclick = function() {
			data = arr1[this.theIndex];
			dataAxis = arr2[this.theIndex];
			option = {
				tooltip: {
					trigger: 'axis',
				},
				grid: {
					left: '10%',
					right: '5%',
					top: '10%',
					containLable: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: dataAxis,
					axisLabel: {
						textStyle: {
							color: '#fff'
						}
					},
					axisLine: {
						lineStyle: {
							color: '#A6BFCB',
							width: 1,
						}
					},
					axisTick: {
						show: false
					}

				},
				yAxis: {
					type: 'value',
					axisLabel: {
						textStyle: {
							color: '#fff'
						}
					},
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: '#A6BFCB',
							type: 'dotted'
						}
					},
				},

				series: [{

					type: 'line',
					itemStyle: {
						normal: {
							color: '#07FFFD'
						}
					},
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 1,
								color: 'RGBA(137, 54, 255, 0)'
							}, {
								offset: 0.5,
								color: 'RGBA(137, 54, 255, 1)'
							}])
						}
					},
					data: data
				}]
			};;
			if(option && typeof option === "object") {
				myChart.setOption(option, true);
			}

		}
	}
	option = {
		tooltip: {
			trigger: 'axis',
		},
		grid: {
			left: '10%',
			right: '5%',
			top: '10%',
			containLable: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: dataAxis,
			axisLabel: {
				textStyle: {
					color: '#fff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#A6BFCB',
					width: 1,
				}
			},
			axisTick: {
				show: false
			}

		},
		yAxis: {
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#fff'
				}
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				lineStyle: {
					color: '#A6BFCB',
					type: 'dotted'
				}
			},
		},

		series: [{

			type: 'line',
			itemStyle: {
				normal: {
					color: '#07FFFD'
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 1,
						color: 'RGBA(137, 54, 255, 0)'
					}, {
						offset: 0.5,
						color: 'RGBA(137, 54, 255, 1)'
					}])
				}
			},
			data: data
		}]
	};

	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
})()