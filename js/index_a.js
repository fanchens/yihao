// 临时数据
// 头部数据
var nav_list = ["in_de()", "首页", "pc_de()", "PC端", "pe_de()", "移动端", "dak_de()", "软件分享", "ret_de()", "反馈交流", "why()", "关于"]
// 左侧目录数据——PC端
var catalog_list = ["xx()", "PC端软件导航目录", "log_hd()", "装机必备", "log_ds()", "下载软件", "log_cs()", "电脑系统", "log_pr()", "剪辑软件",
    "log_ps()", "编程软件", "log_lr()", "远程控制", "log_netdisk()", "网盘直链下载", "log_off()", "办公软件", "log_disk()", "存储软件", "log_rad()", "其他分类"]
// 左侧目录数据-手机端
var phone_list = ["xx()", "手机软件导航目录",
    "ph_film()", "影视", "ph_ad()", "去广告", "ph_disk()", "存储软件", "ph_goo()", "谷歌", "ph_ds()", "下载软件",
    "ph_cp()", "抓包软件", "ph_vms()", "虚拟框架玩机", "ph_vm()", "虚拟机", "ph_cs()", "浏览器", "ph_bk()", "阅读软件", "ph_rad()", "其他分类"
]
// 临时数据结束
// 本地加载数据
// 承载盒子
var brar = '<div class="catalog" id="catalog"></div><div class="subject" id="subject">'+
'<h1 class="sub_h">请君在左侧的目录中选择需要的软件</h1><h1 class="sub_h">若这里面没有君所需软件，请在首页联系管理员</h1></div>'

// 进行网络请求
function network(new_value) {
    netword_ret = ""
    $.ajax({
        // 同步， 如果是ture就是异步，这里限制异步请求
        async: false,
        url: "http://47.100.82.150:8002/inquire",
        data: { condition: "classes", value: new_value },
        type: "post",
        success: function (res) {
            // console.log(res);
            // 将获取的值传递给刚才的参数用来返回
            netword_ret = res;
        }
    })
    // 将获取到的数据返回出去
    return netword_ret
}

// 进行数据添加
function div_value(link_id, div_value) {
    // 将内容赋值给div
    document.getElementById(link_id).innerHTML = div_value;
}

// 头部/目录---列表数据处理
function list_data(div_id, list_name) {
    var temp_value = ""
    var div_values = ""
    for (var i = 0; i < list_name.length; list_name) {
        div_values = '<a onclick="' + list_name[i] + '">' + list_name[i + 1] + '</a>';
        temp_value = temp_value + div_values;
        i = i + 2
        // console.log(temp_value)
    }
    // console.log(temp_value)
    div_value(div_id, temp_value);
}

// 主体内容处理
function sub(value_list) {
    console.log(value_list)
    // 先将标题内容进行汇总
    tit_value = '<h1 class="sub_h">现在为您展示的是' + value_list[0][1] + '板块中的' + value_list[0][2] + '类中的内容</h1>'

    // 将数据分类展示
    // 展示标题
    th_temp_a = ""
    th_value = ""

    // 内容
    var td_value = ""
    var td_value_a = ""

    // 表
    var tab = ""

    for (var i = 2; i < value_list[0].length; value_list) {
        // 表头部分
        th_temp_a = '<th>' + value_list[0][i] + '</th>';
        th_value = th_value + th_temp_a;
        i++
    }
    // 将表头数据进行汇总和格式化
    th_values = '<tr>' + th_value + '</tr>';

    // 将表内容进行格式化展示
    for (var i = 1; i < value_list.length; value_list) {
        for (j = 2; j < value_list[i].length; value_list[i]) {
            td_value = td_value + '<td class="td_va">' + value_list[i][j] + '</td>';
            j++
        }
        td_value_a = td_value_a + '<tr>' + td_value + '</tr>';
        // 临时参数归位
        td_value = ""
        i++
    }
    tab = '<table>' + th_values + td_value_a + '</table>';
    // 将数据展示出来
    div_value("subject", tit_value + tab)
}

// 首页
function in_de(){
    // 关闭承载div
    div_value("sub_div", "")
    // 加载首页页面
}
// 导航选择--仅加载目录
// PC端
function pc_de() {
    // 加载div
    div_value("sub_div", brar)
    // 加载目录
    list_data("catalog", catalog_list)
}
// 移动端
function pe_de() {
    // 加载div
    div_value("sub_div", brar)
    // 加载数据
    list_data("catalog", phone_list)
}
// 软件分享
function dak_de() {
    // 内嵌数据
    if_data = '<iframe src="./iform/rjfx.html" frameborder="0" class="ifr"></iframe>'
    // 将内容添加到内嵌数据中
    div_value("sub_div", if_data)
    }
// 反馈交流
function ret_de() { alert("尚未开完完毕") }
// 关于
function why() { alert("尚未开完完毕") }


// 目录内容展示
// PC端
function log_hd() { sub(network("PC_装机必备")) }
function log_ds() { sub(network("PC_下载软件")) }
function log_cs() { sub(network("PC_电脑系统")) }
function log_pr() { sub(network("PC_剪辑软件")) }
function log_ps() { sub(network("PC_编程软件")) }
function log_lr() { sub(network("PC_远程控制")) }
function log_netdisk() { sub(network("PC_网盘直链下载")) }
function log_off() { sub(network("PC_办公软件")) }
function log_disk() { sub(network("PC_存储软件")) }
function log_rad() { sub(network("PC_其他分类")) }
// 移动端
function ph_film() { sub(network("PH_影视")) }
function ph_ad() { sub(network("PH_去广告")) }
function ph_disk() { sub(network("PH_存储软件")) }
function ph_goo() { sub(network("PH_谷歌")) }
function ph_ds() { sub(network("PH_下载软件")) }
function ph_cp() { sub(network("PH_抓包软件")) }
function ph_vms() { sub(network("PH_虚拟框架玩机")) }
function ph_vm() { sub(network("PH_虚拟机")) }
function ph_cs() { sub(network("PH_浏览器")) }
function ph_bk() { sub(network("PH_阅读软件")) }
function ph_rad() { sub(network("PH_其他分类")) }

// 导航
list_data("nav", nav_list);
// PC目录
// list_data("catalog", catalog_list);
// sub(re_value_a);