if ($.cookie('userInfo') != null) {
    // alert('aa');
} else {
    window.top.location = './login.html';
}
var expiresDate = new Date();
expiresDate.setTime(expiresDate.getTime() + (30 * 60 * 1000));
$.cookie('userInfo', $.cookie('userInfo'), {
    expires: expiresDate
});