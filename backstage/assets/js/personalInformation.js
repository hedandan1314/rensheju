var editor = document.getElementById('informationEditor');
var count = 0;

function myEditor() {
    document.getElementById('formInformation').getElementsByTagName("input")[1].removeAttribute("disabled");
    document.getElementById('formInformation').getElementsByTagName("input")[2].removeAttribute("disabled");
    document.getElementById('formInformation').getElementsByTagName("input")[3].removeAttribute("disabled");
    document.getElementById('formInformation').getElementsByTagName("select")[0].removeAttribute("disabled");
    editor.innerHTML = '保存';
    count++;
    if (count == 2) {
        document.getElementById('formInformation').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
        document.getElementById('formInformation').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
        document.getElementById('formInformation').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
        document.getElementById('formInformation').getElementsByTagName("select")[0].setAttribute('disabled', 'disabled');
        editor.innerHTML = '编辑';
        editor.setAttribute('data-dismiss', 'modal');
        count = 0;
    } else {
        editor.removeAttribute('data-dismiss')
    }
}

function restoreSettings() {
    document.getElementById('formInformation').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
    document.getElementById('formInformation').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
    document.getElementById('formInformation').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
    document.getElementById('formInformation').getElementsByTagName("select")[0].setAttribute('disabled', 'disabled');
    editor.innerHTML = '编辑';
    count = 0;
}