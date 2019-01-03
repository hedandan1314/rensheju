;
(function() {
	var slider1 = $(".slider_img1"),
		slider2 = $(".slider_img2"),
		slider3 = $(".slider_img3");
	var slider_nav1 = $("#slider_nav>ul>li:eq(0)"),
		slider_nav2 = $("#slider_nav>ul>li:eq(1)"),
		slider_nav3 = $("#slider_nav>ul>li:eq(2)");

	setInterval(function() {
		var left1 = slider1.position().left,
			left2 = slider2.position().left,
			left3 = slider3.position().left;
		if(left1 == 0) {

			slider2.animate({
				"left": 0 + "px"
			}, 1000);

			slider1.animate({
				"left": -$(".content").width()
			}, 1000);
			slider3.css(
				"left", $(".content").width())
			slider_nav2.addClass("active");
			slider_nav1.removeClass("active");
			slider_nav3.removeClass("active");

		} else if(left2 == 0) {

			slider3.animate({
				"left": 0 + "px"
			}, 1000);

			slider1.css(
				"left", $(".content").width());
			slider2.animate({
				"left": -$(".content").width()
			}, 1000);
			slider_nav3.addClass("active");
			slider_nav2.removeClass("active");
			slider_nav1.removeClass("active");
		} else {
			slider1.animate({
				"left": 0 + "px"
			}, 1000);

			slider2.css(
				"left", $(".content").width());
			slider3.animate({
				"left": -$(".content").width()
			}, 1000);
			slider_nav1.addClass("active");
			slider_nav2.removeClass("active");
			slider_nav3.removeClass("active");
		}

	}, 10000);

	slider_nav1.on("click", function() {
		slider1.css("left", 0 + "px");
		slider2.css("left", $(".content").width());
		slider3.css("left", $(".content").width());
		slider_nav1.addClass("active");
		slider_nav2.removeClass("active");
		slider_nav3.removeClass("active");
	});
	slider_nav2.on("click", function() {
		slider2.css("left", 0 + "px");
		slider1.css("left", $(".content").width());
		slider3.css("left", $(".content").width());
		slider_nav2.addClass("active");
		slider_nav1.removeClass("active");
		slider_nav3.removeClass("active");
	});
	slider_nav3.on("click", function() {
		slider3.css("left", 0 + "px");
		slider2.css("left", $(".content").width());
		slider1.css("left", $(".content").width());
		slider_nav3.addClass("active");
		slider_nav2.removeClass("active");
		slider_nav1.removeClass("active");
	})

	$.ajax({
		async: false,
		type: "POST",
		url: ipAddress + '/service/queryProcedureRecord',
		dataType: "json",
		success: function(msg) { //请求成功后的回调函数
			$(msg).each(function(index, ele) {
				var serviceId = ele.serviceId;
				var applyTime = ele.applyTime;
				var serviceStatus = ele.serviceStatus;
				if(serviceStatus == 0) {
					serviceStatus = "未办结"
				} else {
					serviceStatus = "已办结"
				}
				var item = "<tr><td nowrap class='td1'><a style='cursor:pointer; ' >" + serviceId + "</a></td>+<td nowrap class='td2'>" + applyTime + "</td><td nowrap class='td3'>" + serviceStatus + "</td></tr>";
				$("#service").append(item);
			});
		},
		error: function() { //请求失败时调用此函数

		}
	});

	

})()