var vm = avalon.define({
    $id: "checkenroll",
    mobile: "",
    submit: function() {
        check(vm);
    }
});

function check(vm) {
    $.ajax({
        type: "GET",
        url: settings.url + "checkUserExist",
        data: {mobile: vm.mobile},
        success: function(res) {
            if(res.status === -1) {
                popWindow("服务器错误，数据提交失败");
            } else {
                if(res.status === 1) {
                    window.location.href = "enrollinfo.html?mobile=" + vm.mobile;
                } else {
                    popWindow("未检索到您的报名信息，请确认您输入的手机号码是否正确");
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            popWindow("服务器错误，数据提交失败");
        }
    });
};