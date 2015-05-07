var vm = avalon.define({
    $id: "enrollinfo",
    name: "",
    address: "",
    mobile: "",
    ly_crop: "",
    ly_area: "",
    ly_prod: "",
    ty_crop: "",
    ty_area: ""
});

avalon.ready(function() {
    var result = location.search.match(new RegExp("mobile=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        //vm.mobile = "";
        window.location.href = "checkenroll.html";
    } else {
        vm.mobile = result[1];
    }

    $.ajax({
        type: "GET",
        url: settings.url + "get_user?mobile=" + vm.mobile,
        success: function(res) {
            if(res.status === -1) {
                popWindow("服务器错误，数据获取失败");
            } else {
                if(res.status === 0) {
                    vm.name = res.name;
                    vm.address = res.address;
                    vm.ly_crop = res.ly_crop;
                    vm.ly_area = res.ly_area;
                    vm.ly_prod = res.ly_prod;
                    vm.ty_crop = res.ty_crop;
                    vm.ty_area = res.ty_area;
                } else {
                    popWindow("服务器错误，数据获取失败");
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            popWindow("服务器错误，数据获取失败");
        }
    })
});