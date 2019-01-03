;
(function() {
    var MyMarhq = '';
    clearInterval(MyMarhq);
    //	$('.tbl-body tbody').empty();
    $('.tbl-header tbody').empty();


    var Items = $(".demo tr")

    if (Items.length > 5) {
        $('.tbl-body tbody').html($('.tbl-body tbody').html() + $('.tbl-body tbody').html());
        $('.tbl-body').css('top', '0');
        var tblTop = 0;
        var speedhq = 80; // 数值越大越慢
        var outerHeight = $('.tbl-body tbody').find("tr").outerHeight();

        function Marqueehq() {
            if (tblTop <= -outerHeight * Items.length) {
                tblTop = 0;
            } else {
                tblTop -= 1;
            }
            $('.tbl-body').css('top', tblTop + 'px');
        }

        MyMarhq = setInterval(Marqueehq, speedhq);

        // 鼠标移上去取消事件
        $(".tablebox tbody").hover(function() {
            clearInterval(MyMarhq);
        }, function() {
            clearInterval(MyMarhq);
            MyMarhq = setInterval(Marqueehq, speedhq);
        })

    }
})()