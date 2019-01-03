(function() {
	$.each($('.tablebox .tbl-body'), function(index, ele) {
		var tbody = $(ele).find('tbody');
		var trCount = tbody.find('tr').length;
		var dbtbody = tbody.html(tbody.html() + tbody.html());
		dbtbody.css('top', '0');
		var tblTop = 0;
		var speedhq = 200; // 数值越大越慢
		var outerHeight = tbody.find("tr").outerHeight();

		function Marqueehq() {

			if(tblTop <= -outerHeight * trCount) {
				tblTop = 0;
			} else {
				tblTop = tblTop - 1;
			}
			$(ele).css('top', tblTop + 'px');
		}

		var MyMarhq = setInterval(Marqueehq, speedhq);

		// 鼠标移上去取消事件
		$(ele).hover(function() {
			clearInterval(MyMarhq);
		}, function() {
			clearInterval(MyMarhq);
			MyMarhq = setInterval(Marqueehq, speedhq);
		})
	})

	var len = $(".procedureTotal tr").length;
	var num = 0;
	for(var i = 0; i < len; i++) {
		num++;
		$('.procedureTotal tr:eq(' + i + ') td:first').text(num);
		if(i == len / 2 - 1) {
			num = 0;
		}
	}
	var len = $(".corporationEmploy tr").length;
	var num = 0;
	for(var i = 0; i < len; i++) {
		num++;
		$('.corporationEmploy tr:eq(' + i + ') td:first').text(num);
		if(i == len / 2 - 1) {
			num = 0;
		}
	}
	var len = $(".corporationResource tr").length;
	var num = 0;
	for(var i = 0; i < len; i++) {
		num++;
		$('.corporationResource tr:eq(' + i + ') td:first').text(num);
		if(i == len / 2 - 1) {
			num = 0;
		}
	}
})()