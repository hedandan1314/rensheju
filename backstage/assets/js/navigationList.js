$(function() {
    var ownerDepart = userInfo.ownerDepart; // 获取所属部门
    var roleType = userInfo.roleType; // 获取角色类型

    if (ownerDepart == 01) {
        $('.xz:eq(0) li:eq(1)').siblings().css('display', 'none');
        $('.menu ul li:first()').css('display', 'none');
        $('.menu ul li:last()').css('display', 'none');
    } else if (ownerDepart == 02) {
        $('.xz:eq(0) li:eq(0)').siblings().css('display', 'none');
        $('.xz:eq(1) li:eq(3)').css('display', 'none');
        $('.menu ul li:first()').css('display', 'none');
        $('.menu ul li:last()').css('display', 'none');
    } else if (ownerDepart == 03) {
        $('.xz:eq(0) li:eq(2)').siblings().css('display', 'none');
        $('.xz:eq(1) li:eq(3)').css('display', 'none');
        $('.menu ul li:first()').css('display', 'none');
        $('.menu ul li:last()').css('display', 'none');
    } else if (ownerDepart == 04) {
        $('.xz:eq(0) li:eq(3)').siblings().css('display', 'none');
        $('.xz:eq(1) li:eq(3)').css('display', 'none');
        $('.menu ul li:first()').css('display', 'none');
        $('.menu ul li:last()').css('display', 'none');
    } else if (ownerDepart == 05) {
        $('.xz:eq(0) li:eq(4)').siblings().css('display', 'none');
        $('.menu ul li:first()').css('display', 'none');
        $('.menu ul li:last()').css('display', 'none');
    } else {
        $('.menu ul li:eq(2)').css('display', 'block');
        $('.menu ul li:eq(3)').css('display', 'none');
    }

    // if (roleType == 0) {
    //     if (ownerDepart == 01) {
    //         $('.xz:eq(0) li:eq(1)').siblings().css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 02) {
    //         $('.xz:eq(0) li:eq(0)').siblings().css('display', 'none');
    //         $('.xz:eq(1) li:eq(3)').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 03) {
    //         $('.xz:eq(0) li:eq(2)').siblings().css('display', 'none');
    //         $('.xz:eq(1) li:eq(3)').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 04) {
    //         $('.xz:eq(0) li:eq(3)').siblings().css('display', 'none');
    //         $('.xz:eq(1) li:eq(3)').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 05) {
    //         $('.xz:eq(0) li:eq(4)').siblings().css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else {
    //         $('.menu ul li:eq(2)').css('display', 'block');
    //         $('.menu ul li:eq(3)').css('display', 'none');
    //     }
    // } else if (roleType == 1) {
    //     if (ownerDepart == 01) {
    //         $('.xz:eq(0) li:eq(1)').siblings().css('display', 'none');
    //         $('.menu ul li:first()').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 02) {
    //         $('.xz:eq(0) li:eq(0)').siblings().css('display', 'none');
    //         $('.xz:eq(1) li:eq(3)').css('display', 'none');
    //         $('.menu ul li:first()').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 03) {
    //         $('.xz:eq(0) li:eq(2)').siblings().css('display', 'none');
    //         $('.xz:eq(1) li:eq(3)').css('display', 'none');
    //         $('.menu ul li:first()').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 04) {
    //         $('.xz:eq(0) li:eq(3)').siblings().css('display', 'none');
    //         $('.xz:eq(1) li:eq(3)').css('display', 'none');
    //         $('.menu ul li:first()').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else if (ownerDepart == 05) {
    //         $('.xz:eq(0) li:eq(4)').siblings().css('display', 'none');
    //         $('.menu ul li:first()').css('display', 'none');
    //         $('.menu ul li:last()').css('display', 'none');
    //     } else {
    //         $('.menu ul li:eq(2)').css('display', 'block');
    //         $('.menu ul li:eq(3)').css('display', 'none');
    //     }
    // } else {
    //     $('.menu ul li:eq(2)').css('display', 'block');
    //     $('.menu ul li:eq(3)').css('display', 'none');
    // }
})