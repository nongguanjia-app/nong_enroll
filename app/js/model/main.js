var vm = avalon.define({
	$id: "enroll",
	name: "",                 
	address: "",
	mobile: "",
	ly_crop: "",
	ly_area: "",
	ly_prod: 0,
	ty_crop: "",
	ty_area: "",
	submit: function() {
		submit_form(vm);
	}
});

avalon.ready(function() {
	var result = location.search.match(new RegExp("mobile=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		vm.mobile = "";
	} else {
		vm.mobile = result[1];
	}
});

function validate(vm) {
	if(vm.name == "") {
		popWindow("姓名不能为空");
		return false;
	}

	if(vm.address == "") {
		popWindow("地址不能为空");
		return false;
	}

	if(vm.mobile == "") {
		popWindow("手机不能为空");
		return false;
	}

	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(vm.mobile))){
		popWindow("请输入有效的手机号码");
		return false;
	}

	if(vm.ly_area == "") {
		popWindow("请填写去年玉米种植面积");
		return false;
	}

	if(!(/^\d+(\.\d+)?$/.test(vm.ly_area))) {
		popWindow("请在“去年玉米种植面积”字段中输入有效的数字");
		return false;
	}

	if(vm.ty_area == "") {
		popWindow("请填写今年计划种植面积");
		return false;
	}

	if(!(/^\d+(\.\d+)?$/.test(vm.ty_area))) {
		popWindow("请在“今年计划种植面积”字段中输入有效的数字");
		return false;
	}

	return true;
}

function submit_form(vm) {
	if(!validate(vm)) return;
	$.ajax({
		type: "GET",
		url: settings.url + "checkUserExist",
		data: {mobile: vm.mobile},
		success: function(res) {
			var op = "INSERT";
			if(res.status === -1) {
				popWindow("服务器错误，数据提交失败");
			} else {
				if(res.status === 1) {
					op = "UPDATE";
				}
				$.ajax({
					type: "POST",
					url: settings.url + "enroll",
					data: {
						op: op,
						name: vm.name,
						address: vm.address,
						mobile: vm.mobile,
						ly_crop: vm.ly_crop,
						ly_area: vm.ly_area,
						ly_prod: vm.ly_prod,
						ty_crop: vm.ty_crop,
						ty_area: vm.ty_area					
					},
					success: function(res) {
						if(res.status === -1) {
							popWindow("服务器错误，数据提交失败");
						} else {
							window.location.href = "../../advertise2.html";
						}
					},
					error: function(err) {
						popWindow("服务器错误，数据提交失败");
					}
				})
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popWindow("服务器错误，数据提交失败");
		}
	});
};