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
				"left", $(".content").width());
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

	}, 6000);

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
	});
	//登录个人信息

	//	$.cookie("userName","张三");
	//	$.cookie("password","123");
	$(document).ready(function() {
		if($.cookie('cookieData') == null) {
			$("#icon span").html("个人登入");
			$(".login").attr("href", "login.html");
			$(".serviceHall").attr("href", "login.html");
			$(".camera").attr("href", "login.html");
			$(".personal").attr("href", "login.html");
			$(".publicQuery").attr("href", "login.html");
		} else {
			var mycookie = $.cookie('cookieData');
			var myobject = JSON.parse(mycookie);
			$(".icon span:eq(0)").text(myobject.userName);
			$(".login").attr("href", "loginOut.html");
		}
	})
})();