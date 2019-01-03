// 侧边栏动画
$(function() {
    $('.menu>ul>li>.slide').children().css('transform', 'rotate(0deg)').attr("leng", "");
    $('.menu>ul>li>.slide').click(function() {
        $xz = $('.menu>ul>li>.slide');

        if ($(this).children().attr('leng') != 's') {
            $(this).children().attr("leng", "s");
            $(this).children().css('transform', 'rotate(90deg)');
        } else {
            $(this).children().attr("leng", "");
            $(this).children().css('transform', 'rotate(0deg)');
        }

        $($xz).not($(this)).siblings(".xz").stop().slideUp(400);
        $($xz).not($(this)).children().css('transform', 'rotate(0deg)').attr("leng", "");
        $(this).siblings(".xz").slideToggle(400);
    })
})