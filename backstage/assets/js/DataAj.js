;
(function() {
	/*
	 查数据
	 * */
	var len = $(".procedureTotal1 tr").length;
	var num = 0;
	for(var i = 0; i < len; i++) {
		num++;
		$('.procedureTotal1 tr:eq(' + i + ') td:first').text(num);
		if(i == len / 2 - 1) {
			num = 0;
		}
	}

	
	//注册总人数
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getRegisterCount',
		async: false,
		success: function(msg) {
			$("#statisticRegister").html(msg);
		},
	});
	//当前在线人数
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getOnlineCount',
		async: false,
		success: function(msg) {
			$("#statisticOnline").html(msg);
		},
	});
	//今日登录人数
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getRealLogonCount',
		async: false,
		success: function(msg) {
			$("#statisticLogin").html(msg);
		},
	});
	//今日注册人数
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getRealRegisterCount',
		async: false,
		success: function(msg) {
			$("#todayRegister").html(msg);
		},
	});
	//用户业务办理总数
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getProcedureTotal',
		async: false,
		success: function(msg) {
			$(msg).each(function(index, ele) {
				var orgName = ele.orgName;
				var totalCount = ele.totalCount;
				var handleCount = ele.handleCount;
				var transactCount = ele.transactCount;
				var item = "<tr><td nowrap class='td1'></td><td nowrap class='td2'>" +
					orgName + "</td><td nowrap class='td3'>" + totalCount +
					"</td><td nowrap class='td4'>" + handleCount +
					"</td><td nowrap class='td5'>" + transactCount + "</td></tr>";
				$(".procedureTotal").append(item);
			});
		},
	});
	//养老保险参保情况(图)
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getPensionInsurance',
		async: false,
		success: function(msg) {

			for(i = 0; i < msg.data.length; i++) {
				var item = "<tr><td nowrap class='td1'>" + msg.data[i].regionName +
					"</td><td nowrap class='td2'>" + msg.data[i].regionHousehold +
					"</td><td nowrap class='td3'>" + msg.data[i].securityCareer +
					"</td><td nowrap class='td4'>" + msg.data[i].securityResident +
					"</td><td nowrap class='td5'>" + msg.data[i].securityRate + "%</td></tr>";
				$(".pensionInsurance").append(item);
			}

		},
	});

	//企业用工情况 (图)
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getCorporationEmploy',
		async: false,
		success: function(msg) {
			for(i = 0; i < msg.data.length; i++) {
				var item = "<tr><td nowrap class='td1'>" +
					"</td><td nowrap class='td2'>" + msg.data[i].companyName +
					"</td><td nowrap class='td3'>" + msg.data[i].employTotal +
					"</td><td nowrap class='td4'>" + msg.data[i].employPart +
					"</td><td nowrap class='td5'>" + msg.data[i].employRate + "%</td></tr>";
				$(".corporationEmploy").append(item);
			}

		},
	});

	//企业用工需求
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getCorporationResource',
		async: false,
		success: function(msg) {
			for(i = 0; i < msg.data.length; i++) {
				var item = "<tr><td nowrap class='td1'>" +
					"</td><td nowrap class='td2'>" + msg.data[i].companyName +
					"</td><td nowrap class='td3'>" + msg.data[i].resPosition +
					"</td><td nowrap class='td4'>" + msg.data[i].resRequire +
					"</td><td nowrap class='td5'>" + msg.data[i].resLoss + "</td></tr>";
				$(".corporationResource").append(item);
			}
		},
	});
	//医疗保险参保情况（图）
	$.ajax({
		type: "post",
		url: ipAddress + '/stats/getMecialInsurance',
		async: false,
		success: function(msg) {
			for(i = 0; i < msg.data.length; i++) {
				var item = "<tr><td nowrap class='td1'>" + msg.data[i].regionName +
					"</td><td nowrap class='td2'>" + msg.data[i].regionHousehold +
					"</td><td nowrap class='td3'>" + msg.data[i].securityCareer +
					"</td><td nowrap class='td4'>" + msg.data[i].securityResident +
					"</td><td nowrap class='td5'>" + msg.data[i].securityRate + "%</td></tr>";
				$(".mecialInsurance").append(item);
			}
		},
	});
})();