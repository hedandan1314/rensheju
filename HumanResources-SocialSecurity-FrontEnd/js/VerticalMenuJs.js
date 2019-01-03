var active1 = document.getElementById('active1');
var active2 = document.getElementById('active2');
var active3 = document.getElementById('active3');
var active4 = document.getElementById('active4');
var active5 = document.getElementById('active5');
var sb = document.getElementById('sb');
var jy = document.getElementById('jy');
var lq = document.getElementById('lq');
var yj = document.getElementById('yj');
var xs = document.getElementById('xs');
var fa1 = document.getElementById('fa1');
var fa2 = document.getElementById('fa2');
var fa3 = document.getElementById('fa3');
var fa4 = document.getElementById('fa4');
var fa5 = document.getElementById('fa5');

var ownerDepart;

var pageIndex = 1,
    addCount = 0,
    totalPage = 0,
    lastPage = 0;
// 社会保险
function mysb() {
    active1.style.backgroundColor = '#ebf3fa';
    active2.style.background = 'none';
    active3.style.background = 'none';
    active4.style.background = 'none';
    active5.style.background = 'none';
    fa1.style.transform = 'rotate(90deg)';
    fa2.style.transform = 'rotate(0deg)';
    fa3.style.transform = 'rotate(0deg)';
    fa4.style.transform = 'rotate(0deg)';
    fa5.style.transform = 'rotate(0deg)';
    sb.style.display = 'block';
    jy.style.display = 'none';
    lq.style.display = 'none';
    yj.style.display = 'none';
    xs.style.display = 'none';
    document.getElementsByClassName('con_right_footer')[0].style.display = 'block';

    ownerDepart = '01';
    var parameter = {
        "pageIndex": pageIndex,
        "recordCount": 5,
        "criteria": {
            "ownerDepart": ownerDepart,
            "companyStatus": "1",
            "serviceStatus": "1"
        }
    }
    $.ajax({
        type: 'POST',
        url: ipAddress + '/service/queryProcedureAll',
        data: JSON.stringify(parameter),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            $('.con_right_middle:eq(0) ul:eq(0)').children().remove();
            console.log('result=', result.data);
            lastPage = result.totalPage;
            totalPage = lastPage;
            $('.pageNo').remove();
            page();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].canOnline == 1) {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '&serviceName=' + result.data[i].serviceName + '&orgName=' + result.data[i].orgName + '" target="_top">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                } else {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '" target="_top" class="operation">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                }

            }
            $('.con_right_middle:eq(0) ul:eq(0)').append(html);
        },
        error: function() {
            alert('失败')
        }
    })
    onload();
}

var pageIndex2 = 1,
    addCount2 = 0,
    totalPage2 = 0,
    lastPage2 = 0;

// 分页(就业创业)
function page2() {
    if (totalPage2 <= 6) {
        while (totalPage2 > 0) {
            $('#previous2').after('<li class="pageNos2 pageNo' + totalPage2 + '"><a href="javascript:;">' + totalPage2 + '</a></li>');
            totalPage2--
        }
    } else {
        if (pageIndex > 3 && totalPage - 2 >= pageIndex) {
            $('#previous2').after('<li class="pageNos2 pageNo' + (pageIndex - 2) + '"><a href="javascript:;">' + (pageIndex2 - 2) +
                '</a></li><li class="pageNos2 pageNo' + (pageIndex2 - 1) + '"><a href="javascript:;">' + (pageIndex2 - 1) +
                '</a></li><li class="pageNos2 pageNo' + (pageIndex2) + '"><a href="javascript:;">' + pageIndex2 +
                '</a></li><li class="pageNos2 pageNo' + (pageIndex2 + 1) + '"><a href="javascript:;">' + (pageIndex2 + 1) +
                '</a></li><li class="pageNos2 pageNo' + (pageIndex2 + 2) + '"><a href="javascript:;">' + (pageIndex2 + 2) +
                '</a></li>');
        } else if (pageIndex2 > 3 && totalPage2 - 2 < pageIndex2) {
            $('#previous2').after('<li class="pageNos2 pageNo' + (totalPage2 - 4) + '"><a href="javascript:;">' + (totalPage2 - 4) +
                '</a></li><li class="pageNos2 pageNo' + (totalPage2 - 3) + '"><a href="javascript:;">' + (totalPage2 - 3) +
                '</a></li><li class="pageNos2 pageNo' + (totalPage2 - 2) + '"><a href="javascript:;">' + (totalPage2 - 2) +
                '</a></li><li class="pageNos2 pageNo' + (totalPage2 - 1) + '"><a href="javascript:;">' + (totalPage2 - 1) +
                '</a></li><li class="pageNos2 pageNo' + (totalPage2) + '"><a href="javascript:;">' + totalPage2 +
                '</a></li>');
        } else {
            $('#previous2').after('<li class="pageNos2 pageNo1"><a href="javascript:;">' + 1 +
                '</a></li><li class="pageNos2 pageNo2"><a href="javascript:;">' + 2 +
                '</a></li><li class="pageNos2 pageNo3"><a href="javascript:;">' + 3 +
                '</a></li><li class="pageNos2 pageNo4"><a href="javascript:;">' + 4 +
                '</a></li><li class="pageNos2 pageNo5"><a href="javascript:;">' + 5 +
                '</a></li>');
        }
    }
    //获取当前页面的页码变色
    $('.con_right_footer:eq(1) .pageNo' + pageIndex2).css('background-color', '#ddd');
    if (pageIndex2 <= 0) {
        $('.con_right_footer:eq(1) .pageNo1').css('background-color', '#ddd');
    }
    $('.con_right_footer:eq(1) .pageNos2').click(function() {
        pageIndex2 = parseInt($(this).find('a').text());
        addCount2 = pageIndex2 * 5 - 5;
        initAjax2();
    })

}

// 跳转页数(搜索)
$('#jump2').click(function() {
    var jumPage = $("#toPage2").val();
    if (jumPage > 0) {
        jumPage = parseInt(jumPage);

        if (jumPage <= lastPage2) {
            pageIndex2 = jumPage;
            addCount2 = pageIndex2 * 5 - 5;
            initAjax2();
        } else {
            $("#toPage2").val(lastPage);
            pageIndex2 = lastPage2;
            addCount2 = pageIndex2 * 5 - 5;
            initAjax2();
        }
    } else {
        $("#toPage2").val('1');
        pageIndex2 = 1;
        addCount2 = 0;
        initAjax2();
    }
})

// 上一页
$('#previous2').click(function() {
    if (pageIndex2 < 2) {
        alert('已经是第一页');
        addCount2 = 0;
        return
    } else {
        $('.con_right_middle:eq(1) ul:eq(0)').children().remove();
    }
    if (--pageIndex2 < 2) {
        pageIndex2 = 1;

    }
    addCount2 -= 5;
    initAjax2();
})

// 下一页
$('#next2').click(function() {
    if (pageIndex2 == lastPage2) {
        alert('已经是最后一页');
        return;
    } else {
        $('.con_right_middle:eq(1) ul:eq(0)').children().remove();
        addCount2 += 5;
    }
    ++pageIndex2;
    initAjax2();
})

function initAjax2() {
    ownerDepart = '02';
    var parameter = {
        "pageIndex": pageIndex2,
        "recordCount": 5,
        "criteria": {
            "ownerDepart": ownerDepart,
            "companyStatus": "1",
            "serviceStatus": "1"
        }
    }
    $.ajax({
        type: 'POST',
        url: ipAddress + '/service/queryProcedureAll',
        data: JSON.stringify(parameter),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            $('.con_right_middle:eq(1) ul:eq(0)').children().remove();
            console.log('result=', result.data);
            lastPage2 = result.totalPage;
            totalPage2 = lastPage2;
            $('.pageNos2').remove();
            page2();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].canOnline == 1) {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '&serviceName=' + result.data[i].serviceName + '&orgName=' + result.data[i].orgName + '" target="_top">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                } else {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '" target="_top" class="operation">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                }

            }
            $('.con_right_middle:eq(1) ul:eq(0)').append(html);
        },
        error: function() {
            alert('失败')
        }
    })
    onload();
}

// 就业创业
function myjy() {
    active2.style.backgroundColor = '#ebf3fa';
    active1.style.background = 'none';
    active3.style.background = 'none';
    active4.style.background = 'none';
    active5.style.background = 'none';
    fa2.style.transform = 'rotate(90deg)';
    fa1.style.transform = 'rotate(0deg)';
    fa3.style.transform = 'rotate(0deg)';
    fa4.style.transform = 'rotate(0deg)';
    fa5.style.transform = 'rotate(0deg)';
    sb.style.display = 'none';
    jy.style.display = 'block';
    lq.style.display = 'none';
    yj.style.display = 'none';
    xs.style.display = 'none';
    document.getElementsByClassName('con_right_footer')[0].style.display = 'block';

    initAjax2();
}

var pageIndex3 = 1,
    addCount3 = 0,
    totalPage3 = 0,
    lastPage3 = 0;

// 分页(就业创业)
function page3() {
    if (totalPage3 <= 6) {
        while (totalPage3 > 0) {
            $('#previous3').after('<li class="pageNos3 pageNo' + totalPage3 + '"><a href="javascript:;">' + totalPage3 + '</a></li>');
            totalPage3--
        }
    } else {
        if (pageIndex3 > 3 && totalPage3 - 2 >= pageIndex3) {
            $('#previous2').after('<li class="pageNos3 pageNo' + (pageIndex3 - 2) + '"><a href="javascript:;">' + (pageIndex3 - 2) +
                '</a></li><li class="pageNos3 pageNo' + (pageIndex3 - 1) + '"><a href="javascript:;">' + (pageIndex3 - 1) +
                '</a></li><li class="pageNos3 pageNo' + (pageIndex3) + '"><a href="javascript:;">' + pageIndex3 +
                '</a></li><li class="pageNos3 pageNo' + (pageIndex3 + 1) + '"><a href="javascript:;">' + (pageIndex3 + 1) +
                '</a></li><li class="pageNos3 pageNo' + (pageIndex3 + 2) + '"><a href="javascript:;">' + (pageIndex3 + 2) +
                '</a></li>');
        } else if (pageIndex3 > 3 && totalPage3 - 2 < pageIndex3) {
            $('#previous3').after('<li class="pageNos3 pageNo' + (totalPage3 - 4) + '"><a href="javascript:;">' + (totalPage3 - 4) +
                '</a></li><li class="pageNos3 pageNo' + (totalPage3 - 3) + '"><a href="javascript:;">' + (totalPage3 - 3) +
                '</a></li><li class="pageNos3 pageNo' + (totalPage3 - 2) + '"><a href="javascript:;">' + (totalPage3 - 2) +
                '</a></li><li class="pageNos3 pageNo' + (totalPage3 - 1) + '"><a href="javascript:;">' + (totalPage3 - 1) +
                '</a></li><li class="pageNos3 pageNo' + (totalPage3) + '"><a href="javascript:;">' + totalPage3 +
                '</a></li>');
        } else {
            $('#previous3').after('<li class="pageNos3 pageNo1"><a href="javascript:;">' + 1 +
                '</a></li><li class="pageNos3 pageNo2"><a href="javascript:;">' + 2 +
                '</a></li><li class="pageNos3 pageNo3"><a href="javascript:;">' + 3 +
                '</a></li><li class="pageNos3 pageNo4"><a href="javascript:;">' + 4 +
                '</a></li><li class="pageNos3 pageNo5"><a href="javascript:;">' + 5 +
                '</a></li>');
        }
    }
    //获取当前页面的页码变色
    $('.con_right_footer:eq(2) .pageNo' + pageIndex3).css('background-color', '#ddd');
    if (pageIndex3 <= 0) {
        $('.con_right_footer:eq(2) .pageNo1').css('background-color', '#ddd');
    }
    $('.con_right_footer:eq(2) .pageNos3').click(function() {
        pageIndex3 = parseInt($(this).find('a').text());
        addCount3 = pageIndex3 * 5 - 5;
        initAjax3();
    })

}

// 跳转页数(搜索)
$('#jump3').click(function() {
    var jumPage = $("#toPage3").val();
    if (jumPage > 0) {
        jumPage = parseInt(jumPage);

        if (jumPage <= lastPage3) {
            pageIndex3 = jumPage;
            addCount3 = pageIndex3 * 5 - 5;
            initAjax3();
        } else {
            $("#toPage3").val(lastPage3);
            pageIndex3 = lastPage3;
            addCount3 = pageIndex3 * 5 - 5;
            initAjax3();
        }
    } else {
        $("#toPage3").val('1');
        pageIndex3 = 1;
        addCount3 = 0;
        initAjax3();
    }
})

// 上一页
$('#previous3').click(function() {
    if (pageIndex3 < 2) {
        alert('已经是第一页');
        addCount3 = 0;
        return
    } else {
        $('.con_right_middle:eq(2) ul:eq(0)').children().remove();
    }
    if (--pageIndex3 < 2) {
        pageIndex3 = 1;

    }
    addCount3 -= 5;
    initAjax3();
})

// 下一页
$('#next3').click(function() {
    if (pageIndex3 == lastPage3) {
        alert('已经是最后一页');
        return;
    } else {
        $('.con_right_middle:eq(2) ul:eq(0)').children().remove();
        addCount2 += 5;
    }
    ++pageIndex3;
    initAjax3();
})

function initAjax3() {
    var parameter = {
        "pageIndex": pageIndex3,
        "recordCount": 5,
        "criteria": {
            "companyStatus": "1",
            "serviceStatus": "1"
        }
    }
    $.ajax({
        type: 'POST',
        url: ipAddress + '/service/queryProcedureAll',
        data: JSON.stringify(parameter),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            $('.con_right_middle:eq(2) ul:eq(0)').children().remove();
            console.log('result=', result.data);
            lastPage3 = result.totalPage;
            totalPage3 = lastPage3;
            $('.pageNos3').remove();
            page3();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].canOnline == 1) {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '&serviceName=' + result.data[i].serviceName + '&orgName=' + result.data[i].orgName + '" target="_top">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                } else {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '" target="_top" class="operation">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                }

            }
            $('.con_right_middle:eq(2) ul:eq(0)').append(html);
        },
        error: function() {
            alert('失败')
        }
    })
    onload();
}

// 劳动权益
function mylq() {
    active3.style.backgroundColor = '#ebf3fa';
    active1.style.background = 'none';
    active2.style.background = 'none';
    active4.style.background = 'none';
    active5.style.background = 'none';
    fa3.style.transform = 'rotate(90deg)';
    fa1.style.transform = 'rotate(0deg)';
    fa2.style.transform = 'rotate(0deg)';
    fa4.style.transform = 'rotate(0deg)';
    fa5.style.transform = 'rotate(0deg)';
    sb.style.display = 'none';
    jy.style.display = 'none';
    lq.style.display = 'block';
    yj.style.display = 'none';
    xs.style.display = 'none';
    document.getElementsByClassName('con_right_footer')[0].style.display = 'none';
    initAjax3();
}

// 医药机构
function myyj() {
    active4.style.backgroundColor = '#ebf3fa';
    active1.style.background = 'none';
    active2.style.background = 'none';
    active3.style.background = 'none';
    active5.style.background = 'none';
    fa4.style.transform = 'rotate(90deg)';
    fa1.style.transform = 'rotate(0deg)';
    fa2.style.transform = 'rotate(0deg)';
    fa3.style.transform = 'rotate(0deg)';
    fa5.style.transform = 'rotate(0deg)';
    sb.style.display = 'none';
    jy.style.display = 'none';
    yj.style.display = 'block';
    lq.style.display = 'none';
    xs.style.display = 'none';
    document.getElementsByClassName('con_right_footer')[0].style.display = 'none';
}

var pageIndex4 = 1,
    addCount4 = 0,
    totalPage4 = 0,
    lastPage4 = 0;

// 分页(业务审批)
function page4() {
    if (totalPage4 <= 6) {
        while (totalPage4 > 0) {
            $('#previous4').after('<li class="pageNos4 pageNo' + totalPage4 + '"><a href="javascript:;">' + totalPage4 + '</a></li>');
            totalPage4--
        }
    } else {
        if (totalPage4 > 3 && totalPage4 - 2 >= pageIndex4) {
            $('#previous4').after('<li class="pageNos4 pageNo' + (pageIndex4 - 2) + '"><a href="javascript:;">' + (pageIndex4 - 2) +
                '</a></li><li class="pageNos4 pageNo' + (pageIndex4 - 1) + '"><a href="javascript:;">' + (pageIndex4 - 1) +
                '</a></li><li class="pageNos4 pageNo' + (pageIndex4) + '"><a href="javascript:;">' + pageIndex4 +
                '</a></li><li class="pageNos4 pageNo' + (pageIndex4 + 1) + '"><a href="javascript:;">' + (pageIndex4 + 1) +
                '</a></li><li class="pageNos4 pageNo' + (pageIndex4 + 2) + '"><a href="javascript:;">' + (pageIndex4 + 2) +
                '</a></li>');
        } else if (pageIndex4 > 3 && totalPage3 - 2 < pageIndex4) {
            $('#previous4').after('<li class="pageNos4 pageNo' + (totalPage4 - 4) + '"><a href="javascript:;">' + (totalPage4 - 4) +
                '</a></li><li class="pageNos4 pageNo' + (totalPage4 - 3) + '"><a href="javascript:;">' + (totalPage4 - 3) +
                '</a></li><li class="pageNos4 pageNo' + (totalPage4 - 2) + '"><a href="javascript:;">' + (totalPage4 - 2) +
                '</a></li><li class="pageNos4 pageNo' + (totalPage4 - 1) + '"><a href="javascript:;">' + (totalPage4 - 1) +
                '</a></li><li class="pageNos4 pageNo' + (totalPage4) + '"><a href="javascript:;">' + totalPage4 +
                '</a></li>');
        } else {
            $('#previous4').after('<li class="pageNos4 pageNo1"><a href="javascript:;">' + 1 +
                '</a></li><li class="pageNos4 pageNo2"><a href="javascript:;">' + 2 +
                '</a></li><li class="pageNos4 pageNo3"><a href="javascript:;">' + 3 +
                '</a></li><li class="pageNos4 pageNo4"><a href="javascript:;">' + 4 +
                '</a></li><li class="pageNos4 pageNo5"><a href="javascript:;">' + 5 +
                '</a></li>');
        }
    }
    //获取当前页面的页码变色
    $('.con_right_footer:eq(3) .pageNo' + pageIndex4).css('background-color', '#ddd');
    if (pageIndex4 <= 0) {
        $('.con_right_footer:eq(3) .pageNo1').css('background-color', '#ddd');
    }
    $('.con_right_footer:eq(3) .pageNos4').click(function() {
        pageIndex4 = parseInt($(this).find('a').text());
        addCount4 = pageIndex4 * 5 - 5;
        initAjax4();
    })

}

// 跳转页数(搜索)
$('#jump4').click(function() {
    var jumPage = $("#toPage4").val();
    if (jumPage > 0) {
        jumPage = parseInt(jumPage);

        if (jumPage <= lastPage4) {
            pageIndex4 = jumPage;
            addCount4 = pageIndex4 * 5 - 5;
            initAjax4();
        } else {
            $("#toPage4").val(lastPage4);
            pageIndex4 = lastPage4;
            addCount4 = pageIndex4 * 5 - 5;
            initAjax4();
        }
    } else {
        $("#toPage4").val('1');
        pageIndex4 = 1;
        addCount4 = 0;
        initAjax4();
    }
})

// 上一页
$('#previous4').click(function() {
    if (pageIndex4 < 2) {
        alert('已经是第一页');
        addCount4 = 0;
        return
    } else {
        $('.con_right_middle:eq(3) ul:eq(0)').children().remove();
    }
    if (--pageIndex4 < 2) {
        pageIndex4 = 1;

    }
    addCount4 -= 5;
    initAjax4();
})

// 下一页
$('#next4').click(function() {
    if (pageIndex4 == lastPage4) {
        alert('已经是最后一页');
        return;
    } else {
        $('.con_right_middle:eq(3) ul:eq(0)').children().remove();
        addCount4 += 5;
    }
    ++pageIndex4;
    initAjax4();
})

function initAjax4() {
    var parameter = {
        "pageIndex": pageIndex4,
        "recordCount": 5,
        "criteria": {
            "companyStatus": "1",
            "serviceStatus": "2"
        }
    }
    $.ajax({
        type: 'POST',
        url: ipAddress + '/service/queryProcedureAll',
        data: JSON.stringify(parameter),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            $('.con_right_middle:eq(4) ul:eq(0)').children().remove();
            console.log('result=', result.data);
            lastPage4 = result.totalPage;
            totalPage4 = lastPage4;
            $('.pageNos4').remove();
            page4();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].canOnline == 1) {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '&serviceName=' + result.data[i].serviceName + '&orgName=' + result.data[i].orgName + '" target="_top">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                } else {
                    html += '<li>' +
                        '<div>' + result.data[i].serviceName + '</div>' +
                        '<ul>' +
                        '<li><img src="./img/guide2.png" style="width: 25px;" />' +
                        '<a href="./workGuideD.html?serviceCode=' + result.data[i].serviceCode + '" >办事指南</a>' +
                        '</li>' +
                        '<li><img src="./img/handle.png" style="width: 25px;" />' +
                        '<a href="./onlineHandleD.html?serviceCode=' + result.data[i].serviceCode + '" target="_top" class="operation">在线办理</a>' +
                        '</li>' +
                        '<li><img src="./img/consult.png" style="width: 25px;" />' +
                        '<a href="http://rsj.huaian.gov.cn/hdjl/12333fw/index.html" target="_blank">在线咨询</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>'
                }

            }
            $('.con_right_middle:eq(4) ul:eq(0)').append(html);
        },
        error: function() {
            alert('失败')
        }
    })
    onload();
}

// 业务审批
function myxs() {
    active5.style.backgroundColor = '#ebf3fa';
    active1.style.background = 'none';
    active2.style.background = 'none';
    active3.style.background = 'none';
    active4.style.background = 'none';
    fa5.style.transform = 'rotate(90deg)';
    fa1.style.transform = 'rotate(0deg)';
    fa2.style.transform = 'rotate(0deg)';
    fa3.style.transform = 'rotate(0deg)';
    fa4.style.transform = 'rotate(0deg)';
    sb.style.display = 'none';
    jy.style.display = 'none';
    yj.style.display = 'none';
    lq.style.display = 'none';
    xs.style.display = 'block';
    document.getElementsByClassName('con_right_footer')[0].style.display = 'block';
    initAjax4();
}