// var domainName = '192.168.100.194';
// var domainName = '192.168.100.176';

   var ipAddress = 'http://192.168.100.121:8080';
//var ipAddress = 'http://192.168.100.13:8080';

// var ipAddress = 'http://192.168.100.84:8520/egov-socialsecurity';
// var ipAddress = 'http://221.131.140.66:9999/egov-socialsecurity';

function formatDateStr(str) {
    if (str.length < 14) {
        alert("时间格式不对!");
    }
    var year = str.substr(0, 4);
    var month = str.substr(4, 2);
    var day = str.substr(6, 2);
    var hh = str.substr(8, 2);
    var mm = str.substr(10, 2);
    var ss = str.substr(12, 2);

    var comp = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    return comp;
}

//页面失效时间
var maxTime = 1200; // seconds
function jianTingYM() {
    var time = maxTime;
    $('body').on('keydown mousemove mousedown', function(e) {
        time = maxTime; // reset
    });
    var intervalId = setInterval(function() {
        time--;
        // console.log(time);
        if (time <= 0) {
            ShowInvalidLoginMessage();
            clearInterval(intervalId);
        }
    }, 1000)

    function ShowInvalidLoginMessage() {
        alert("您已经长时间没操作了，即将退出系统");
        location.href = './login.html';
    }
}
var URLTEMP = location.pathname;
if (URLTEMP.indexOf("login.html") < 0) {
    jianTingYM()
}