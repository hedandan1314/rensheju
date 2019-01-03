
if ($.cookie('PHPSESSID') != null) {
    // alert('aa');
} else {
    window.location.href = './login.html';
}
var expiresDate= new Date();
expiresDate.setTime(expiresDate.getTime() + (1*60*1000));
$.cookie('PHPSESSID', $.cookie('PHPSESSID'), {
    expires: expiresDate
});