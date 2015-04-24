var vm = avalon.define({
    $id: "download",

    download: function() {
        download_excel(vm);
    }
});

function download_excel(vm) {
    $.ajax({
        type: "GET",
        url: settings.url + "get_excel",
        success: function(res) {
            if(res.status == -1) {
                alert(res.msg);
            } else {
                if(res.status == 0) {
                    $("#download_button")[0].style.display="";
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("服务器错误，数据提交失败");
        }
    });
}