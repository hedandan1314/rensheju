// var domainName = '192.168.100.194';
// var domainName = '192.168.100.176';

// var ipAddress = 'http://192.168.100.176:8080';
  var ipAddress = 'http://192.168.100.169:8080';

//var ipAddress = 'http://192.168.100.84:8520/egov-socialsecurity';

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