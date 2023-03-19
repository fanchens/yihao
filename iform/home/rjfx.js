var pc_list = [
    "PC_装机必备", "PC_下载软件", "PC_电脑系统", "PC_剪辑软件", "PC_编程软件", "PC_远程控制", "PC_网盘直链下载",
    "PC_办公软件", "PC_存储软件", "PC_其他分类"]
var ph_list = [
    "PH_影视", "PH_去广告", "PH_存储软件", "PH_谷歌", "PH_下载软件", "PH_抓包软件", "PH_虚拟框架玩机", "PH_虚拟机", "PH_浏览器",
    "PH_阅读软件", "PH_其他分类"
]

// 拼接内容
function vaos(list_name) {
    var op_valu = ""
    for (var i = 0; i < list_name.length; list_name) {
        op_valu = op_valu + '<option value="' + list_name[i] + '">' + list_name[i] + '</option>';
        i++
    }
    return op_valu
}
// 修改下拉框的值
function sect_data() {
    // 获取下拉框的值
    var sel = $("#plate").val();
    if (sel == 'PC端') {
        // 将下拉框中除了第一个选项，全部移除
        $('#classes option:gt(0)').remove();
        // 为下拉框拼接子标签
        $('#classes').append(vaos(pc_list));
    }
    else {
        if (sel == '移动端') {
            // 将下拉框中除了第一个选项，全部移除
            $('#classes option:gt(0)').remove();
            // 为下拉框拼接子标签
            $('#classes').append(vaos(ph_list));
        }
        else {
            // 将下拉框中除了第一个选项，全部移除
            $('#classes option:gt(0)').remove();
            // 为下拉框拼接子标签
            $('#classes').append("");
        }
    }
}

// 将数据上传
// var disk_data = {
//     "plate": "1",
//     "classes": "",
//     "name": "",
//     "url": "",
//     "title": "",
//     "pwd": "",
//     "replys": "",
//     "remark": ""
// }
// console.log(disk_data["plate"])

// 获取值
function up_data() {
    // 获取板块的值
    plate_value = $("#plate").val();
    if (plate != '') {
        // 获取类别的值
        classes_value = $('#classes').val()
        if (classes_value != '') {
            // 获取名称值
            name_value = $('#name').val()
            if (name_value != '') {
                // 获取链接地址
                url_value = $('#url').val()
                if (url_value != '') {
                    // 获取标题
                    title_value = $('#title').val()
                    if (title_value != '') {
                        // 获取密码
                        pwd_value = $('#pwd').val()
                        if (pwd_value != '') {
                            // 获取回复内容
                            reply_value = $('#reply').val()
                            if (reply_value == '') {
                                reply_value = '无'
                            } // else { console.log("数据赋值") }
                            // 注释内容
                            remarks_value = $('#remarks').val()
                            if (remarks_value == '') {
                                remarks_value = '无'
                            } // else { console.log("数据赋值") }

                            // 将数据上传到服务器
                            up_ret_data = int_updata(plate_value, classes_value, name_value, url_value, title_value, pwd_value, reply_value, remarks_value);

                            // 将返回的数据添加到展示框中
                            $('#int_ret_data').val(up_ret_data)

                            // console.log(up_ret_data)
                        } else { alert("密码是您分享的软件包的用到的密码，如：压缩包密码，密钥什么的，如若没有，请输入无") }
                    } else { alert("网页标题可以是网页的title,也可以是软件的名称") }
                } else { alert("giegie,你忘记填链接地址了哦") }
            }
            else { alert("giegie,你忘记填名字了哦") }
        }
        else { alert("请选择分享软件所属的类别") }
    }
    else { alert("请选择分享软件所属的板块") }

    // console.log(plate_value, classes_value, name_value, url_value, title_value, pwd_value, reply_value, remarks_value)
}

// 进行网络请求
function int_updata(plate_value, classes_value, name_value, url_value, title_value, pwd_value, reply_value, remarks_value) {
    // console.log("进行请求")
    netword_ret = ""
    $.ajax({
        // 同步， 如果是ture就是异步，这里限制异步请求
        async: false,
        url: "http://47.100.82.150:8002/add_data",
        data: {
            plate: plate_value,
            classes: classes_value,
            name: name_value,
            url: url_value,
            title: title_value,
            pwd: pwd_value,
            reply: reply_value,
            remarks: remarks_value
        },
        type: "post",
        success: function (res) {
            // console.log(res);
            // 将获取的值传递给刚才的参数用来返回
            netword_ret = res;
        }
    })
    // console.log("请求完成数据准备返回")
    // 将获取到的数据返回出去
    return netword_ret
}


// 登录限制
