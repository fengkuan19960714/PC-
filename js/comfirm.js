$(function () {
    let time ;
    // 地址id
    let getProvinceid = 1;
    let cityid = null;
    let district = null;
    // 地址列表
    let getProvinceList = [];
    let cityList = [];
    let districtList = [];
    // 地址文字
    let getProvinceText = "";
    let cityText = "";
    let districtText = "";
    // 地址编辑
    let cIndex = 0;
    let dIndex = 0;
    let address_id = "";
    let selectaddress = ""
    let checked = true;
    // 默认地址
    let status = false;
    // 选择地址
    let selectAddressText = "";
    let addressList="";
    // 支付方式选择
    let selectPay = 0;
    // 总价
    let amount = "";
    // 支付密码
    let password = "";
    // 商品详情参数
    let orderInfo = GetQueryString("orderInfo");
    
    let cart_id = GetQueryString("cart_id");
    let buyType = GetQueryString("buyType");
    let memberinfo;
    let valueText = "";
    var pageData = JSON.parse(decodeURIComponent(orderInfo));
    if(pageData[0].data[0].is_vip==1){
        $(".pays").css("display","none")
        $(".pays1").css("display","block")
    }else{
        $(".pays").css("display","block") 
        $(".pays1").css("display","none")
    }
    if(pageData[0].data[0].newcomer==1){
        $(".pays").css("display","none") 
        $(".pays1").css("display","none") 
    }
    console.log(pageData,"orderInfo")
    var html = template("payList", {
        pageData: pageData
    })
    $(".shoplist").html(html)
    // 微信支付
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 140,
        height: 140
    });
    // 判断支付方式
    $(".taobao").click(function () {
        selectPay = 2
    })
    $(".qq").click(function () {
        selectPay = 3
    })


    // 获取地址列表
			$.ajax({
				url: host + '/api/v2/member/address',
				data: {
					page: 1,
					limit: 4,
				},
				headers: {
					token: token
				},
				dataType: "json",
				type: 'get',
				success(res) {
					console.log(res, "res")
                    var pageData = res.data;
                    addressList=res.data
                    var index = res.data.findIndex((v,i)=>{
                        return v.address_is_default == '1'
                    })
                    if(index!=-1){
                        selectaddress = res.data[index].address_id;
                        selectAddressText = res.data[index];
                        $(".addressList").text(selectAddressText.area_info+selectAddressText.address_detail)
                    }
                    
                    console.log(res,selectaddress)
					var html1 = template('addressList', { pageData: pageData })
					$("#ulAddress").html(html1)

				}
			})

    function getcity(id, detailId) {
        console.log(getProvinceid, "getProvinceid")
        if (id >= 1) {
            getProvinceid = id
        }
        $.ajax({
            url: host + '/api/v2/member/area?level=2',
            data: {
                parentId: getProvinceid
            },
            headers: {
                token: token
            },
            dataType: "json",
            type: 'get',
            success(res) {

                var pageData = res.data;
                cityList = res.data;
                cIndex = cityList.findIndex((v, i) => {
                    return v.area_id == cityid
                })

                if (cIndex == -1) {
                    cIndex = 0
                }
                if (!detailId) {
                    if (id == 1) {
                        cityid = res.data[0].area_id
                        getdistrict()
                    } else {
                        cityid = res.data[0].area_id
                        getdistrict()
                    }
                } else {
                    cityText = cityList[cIndex].area_name
                    getdistrict(1)
                }
                var html = template("cityid", {
                    pageData: pageData
                })
                $(".city").html(html)
            }
        })
    }

    function getdistrict(id) {
        $.ajax({
            url: host + '/api/v2/member/area?level=3',
            data: {
                parentId: cityid
            },
            headers: {
                token: token
            },
            dataType: "json",
            type: 'get',
            success(res) {
                var pageData = res.data;
                districtList = res.data;
                if (id) {
                    dIndex = districtList.findIndex((v, i) => {
                        return v.area_id == district
                    })
                    districtText = districtList[dIndex].area_name
                }
                var html = template("districtid", {
                    pageData: pageData
                })
                $(".district").html(html)
            }
        })
    }
    // 添加地址
    function address(data) {
        $.ajax({
            url: host + '/api/v2/member/address',
            data: data,
            headers: {
                token: token,
            },
            dataType: 'json',
            type: 'post',
            success(res) {
                if (res.status == 0) {
                    $(document.body).css("overflow", "visible");
                    $('.theme-login').removeClass("selected");
                    $('.item-props-can').removeClass("selected");
                    $('.theme-popover-mask').hide();
                    $('.theme-popover').slideUp(200);
                    window.location.reload()
                }
            }
        })
    }
    // 编辑地址
    function compileAddress(data) {
        $.ajax({
            url: host + `/api/v2/member/address/${address_id}`,
            data: data,
            headers: {
                token: token,
            },
            dataType: 'json',
            type: 'PUT',
            success(res) {
                if (res.status == 0) {
                    $(document.body).css("overflow", "visible");
                    $('.theme-login').removeClass("selected");
                    $('.item-props-can').removeClass("selected");
                    $('.theme-popover-mask').hide();
                    $('.theme-popover').slideUp(200);
                    window.location.reload()
                }
            }
        })
    }
    $('#ulAddress').on("click", ".delClick", function (e) {
        let index = e.target.dataset.index;
        $.ajax({
            url: host + `/api/v2/member/address/${index}`,
            data: {},
            type: 'DELETE',
            dataType: 'json',
            headers: {
                token: token
            },
            success(res) {
                if (res.status == 0) {
                    prompt('删除成功',1000)
                    window.location.reload()
                }
            }
        })
        e.stopPropagation()
    })

    // 获取省
    $.ajax({
        url: host + '/api/v2/member/area?level=1',
        data: {},
        headers: {
            token: token
        },
        dataType: "json",
        type: 'get',
        success(res) {
            var pageData = Object.values(res.data);
            getProvinceList = Object.values(res.data);
            var html = template("getProvinceid", {
                pageData: pageData
            })
            $(".provinces").html(html)
            getcity(1, 0);

        }
    })
    // 点击省
    $(".provinces").change(function () {
        getProvinceid = Number($(this).val()) + 1;
        getProvinceText = getProvinceList[getProvinceid - 1]
        // 选中省筛选市
        getcity()
    })
    $(".city").change(function () {
        cityid = $(this).val();
        var index = cityList.findIndex((v, i) => {
            return v.area_id == cityid
        })
        cityText = cityList[index].area_name;
        getdistrict()
    })
    // 点击区
    $(".district").change(function () {
        district = $(this).val();
        var index = districtList.findIndex((v, i) => {
            return v.area_id == district
        })
        districtText = districtList[index].area_name
    })
    //    =============================================================================>地址结束
    // 添加地址
    $(".add-btns").click(function () {
        var name = $("#user-name").val();
        var phone = $("#user-phone").val();
        var text = $("#user-intro").val();
        var data = {
            address_detail: text,
            address_is_default: status ? 1 : 0,
            address_mob_phone: phone,
            address_realname: name,
            address_tel_phone: phone,
            area_id: district,
            area_info: getProvinceText + cityText + districtText,
            city_id: cityid,
            province_id: getProvinceid,
        }
        address(data)
    })
    // 编辑地址
    // 添加地址
    $(".detail1").click(function () {
        var name = $("#user-name").val();
        var phone = $("#user-phone").val();
        var text = $("#user-intro").val();
        var data = {
            address_detail: text,
            address_is_default: status ? 1 : 0,
            address_mob_phone: phone,
            address_realname: name,
            address_tel_phone: phone,
            area_id: district,
            area_info: getProvinceText + cityText + districtText,
            city_id: cityid,
            province_id: getProvinceid,
        }
        compileAddress(data)
    })
    // 添加默认地址
    // $("#ulAddress").on("click",".addressBtn",function(e){
    //     let id = e.target.dataset.id;
    //     $.ajax({
    //         url:host+''
    //     })
    // })
    $("#ulAddress").on("click", ".detail", function (e) {
        $(".detail1").show();
        $(".addopen").hide()
        // 禁止遮罩层下面的内容滚动
        var details = JSON.parse(e.target.dataset.list);
        address_id = details.address_id
        $("#user-phone").val(details.address_mob_phone);
        $("#user-name").val(details.address_realname);
        $("#user-intro").val(details.area_info);
        $(".provinces").val(3)
        cityid = details.city_id;
        district = details.area_id;
        getProvinceid = details.province_id;
        getProvinceText = getProvinceList[getProvinceid - 1]
        // console.log(city_id,district,getProvinceid)
        getcity(0, getProvinceid);
        // getdistrict(city_id)
        var pIndex = getProvinceList.findIndex((v, i) => {
            return i == details.province_id
        })
        $(".provinces").val(pIndex - 1)
        $(".city").val(cIndex)
        $(".district").val(dIndex)
        $(document.body).css("overflow", "hidden");
        // $(this).addClass("selected");
        // $(this).parent().addClass("selected");           
        $('.theme-popover-mask').show();
        $('.theme-popover-mask').height($(window).height());
        $('.theme-popover').slideDown(200);
    })
    // 
    $(".status").click(function () {
        status = true
    })
    $('.status1').click(function () {
        status = false
    })
    // 选择地址
    $("#ulAddress").on("click",".addressBtn",function(e){
        console.log(e)
        selectaddress = e.currentTarget.dataset.id;
        selectAddressText = addressList[e.currentTarget.dataset.index];
        $(".addressList").text(selectAddressText.area_info+selectAddressText.address_detail)
        console.log(3213)
        $(this).css("background","url(../images/peraddressbg.png) no-repeat scroll 0% 0%").siblings().css("background",'#fff')
    })
    let data = {
            cart_id: `${pageData[0].goods_id}|${pageData[0].goods_num}`,
            ifcart: 0,
            city_id: 109,
            point_pay:'',
            is_newcomer:pageData[0].data[0].newcomer==1?'1':''
    }
        if (buyType == 'NOW') {
            data.ifcart = 0
            pageData.forEach(element=>{
                data.cart_id = element.data.map((v, i) => `${v.goods_id}|${v.goods_num}`)
                console.log(data.cart_id,"data.cart_id")
            })
        } else {
            data.ifcart = 1;
            data.cart_id=[]
            pageData.forEach(element=>{
                element.data.forEach((v,i)=>{
                    data.cart_id.push(`${v.cart_id}|${v.goods_num}`)
                })
                console.log(data.cart_id,"data.cart_id")
            })
        }
    // 结算
    function checkout(){
        console.log(data,"data")
        for(var i in data){
            if(!data[i]){
                delete data[i]
            }
        }
        console.log
        $.ajax({
            url: host + '/api/v2/member/checkout',
            type: 'post',
            data: data,
            headers: {
                token: token
            },
            dataType: 'json',
            success(res) {
                console.log(res, "res")
                if (res.status == 0) {
                    var price = 0;
                    var freight = 0;
                    for (var i in res.data.store_final_order_total) {
                        price = Number(price) + Number(res.data.store_final_order_total[i])
                    }
                    for (var i in res.data.freight_list) {
                        freight = Number(freight) + Number(res.data.freight_list[i])
                    }
                    console.log(price)
                    amount = price
                    $(".freight").text('运费：'+freight)
                    $("#J_ActualFee").text(price)
                    $(".pay-sum").text(price)

                    $(".loginPrice").text("支付￥"+price)
                } else {
                    prompt(res.error, "1000")
                }
            }
        })
    }
    checkout()
   
    //点击span关闭
    $(".span").bind("click", function () {
        $(".shade").fadeOut(1000);
        $(".login").fadeOut(1000);
    });

    //居中显示
    function showShade() {
        var $vW = $(window).width();
        var $w = $(".login").outerWidth();
        var $vH = $(window).height();
        var $h = $(".login").outerHeight();
        $(".login").css({
            "left": ($vW - $w) / 2 + "px",
            "top": ($vH - $h) / 2 + "px"
        });
    };

    //浏览器大小发生改变
    $(window).resize(function () {
        showShade();
    });
    //绑定键盘事件  按下esc键退出
    $(document).keyup(function (ev) {
        if (ev.keyCode == 27) {
            //模拟事件
            $(".span").trigger("click");
        }
    })
    // 提交订单
    $('.submitOrder').click(function () {
        valueText = $("#store_text").val()
        console.log(valueText,"valueText")
        if(!token){
            prompt("请先登录", 1000)
            return false
        }
        if(!selectaddress){
            prompt("请选择地址", 1000)
            return false
        }
        if (selectPay == 0&&amount!=0) {
            prompt("请选择支付方式", 1000)
            return false
        }
        console.log(selectPay,"selectPay")
        if(pageData[0].data[0].is_vip==1){
            $(".defenPay").css("display","block");
            return false
             
        }
        
        showShade();
        let textArr = [];
        let myMap = new Object();
        pageData.forEach(element => {
            myMap[element.data[0].store_id] = valueText;
            textArr = myMap
        })
        console.log(textArr, "textArr")
        var input = $(".memo-input").val()
        var pageFrom = {
            cart_id: [`${pageData[0].goods_id}|${pageData[0].goods_num}`],
            pay_name: "online",
            pay_message: textArr,
            order_from: 1,
            is_virtual: 0,
            is_pintuan: 0,
            ifcart: 0,
            point_pay: data.point_pay,
            password:password,
            pd_pay: data.pd_pay,
            rcb_pay: 0,
            payment_code: selectPay == 2 ? "alipay" : "wxpay_native",
            address_id: selectaddress,
            is_newcomer:pageData[0].data[0].newcomer==1?'1':''
        }
        if (buyType == 'NOW') {
            pageFrom.ifcart = 0
            pageData.forEach(element=>{
                pageFrom.cart_id = element.data.map((v, i) => `${v.goods_id}|${v.goods_num}`)
                console.log(pageFrom.cart_id,"data.cart_id")
            })
        } else {
            pageFrom.ifcart = 1;
            pageFrom.cart_id=[]
            pageData.forEach(element=>{
                element.data.forEach((v,i)=>{
                    pageFrom.cart_id.push(`${v.cart_id}|${v.goods_num}`)
                })
                console.log(pageFrom.cart_id,"data.cart_id")
            })
        }
        btnOrder(pageFrom)

    })
    // 提交订单
    function btnOrder(pageFrom){
        if(!pageFrom.is_newcomer){
            delete pageFrom.is_newcomer
        }
        if(!pageFrom.password){
            delete pageFrom.password
        }
        $.ajax({
            url: host + '/api/v2/member/order',
            data: pageFrom,
            type: 'post',
            dataType: 'json',
            headers:{
                token:token
            },
            success(res) {
                console.log(res);
                if(amount==0){
                    window.location.href="../home/success.html?order_id="+res.data.order_id
                }else{
                    payBtn(res)
                }
                
            }
        })
    }
    let order_id = ""
    // 支付
    function payBtn(res){
        console.log(res,"res")
        $.ajax({
            url: host + `/api/v2/member/order/${res.data.pay_sn}`,
            data: {
                payment_code: selectPay == 3 ? "wxpay_native" : "alipay",
            },
            headers: {
                token: token
            },
            dataType: "json",
            type: 'put',
            success(res) {
                if(res.status==0){
                    console.log(res)
                if (selectPay == 3) {
                    qrcode.makeCode(res.data.code_url);
                    $(".shade").fadeIn(1000);
                    $(".login").fadeIn(1000);
                } else {
                    console.log(res)
                    $(".clear1").html(res.data.content)
                }
                order_id = res.data.order_id;
                // var timeTatlo = 60
                // time = setInterval(() => {
                //     if(timeTatlo!=0){
                //         timeTatlo-2;
                       
                //     }else{
                //         clearInterval(time)
                //     }
                // }, 2000);
                }else{
                    prompt(res.error,1000)
                }
                

            }
        })
    }
    
    // 订单查询
    function orderDetail(order_id){
        $.ajax({
            url:host+`/api/v2/member/order/${order_id}`,
            data:{},
            type:'get',
            dataType:'json',
            headers:{
                token:token
            },
            success(res){
                if(res.status==0){
                    if(res.data[0].order_state_id==20){
                        $(".shade").fadeOut(1000);
                        $(".login").fadeOut(1000);
                        window.location.href="../home/success.html?order_id="+order_id
                    }else{
                        prompt("请先扫码支付",1000)
                    }
                }
                console.log(res)
            }
        })
    }
    // 跳转支付成功
    $(".successBtn").click(function(){
        orderDetail(order_id)
    })
    // 查询用户信息
    $.ajax({
        url:host+'/api/v2/member/memberinfo',
        data:{},
        type:'get',
        dataType:"json",
        headers:{
            token:token
        },
        success(res){
            console.log(res);
            var pageData = res.data;
            memberinfo = res.data
            $('.pionts').text(pageData.member_points)
            $(".userpiont").text(pageData.recharge_rc_balance)
            $(".defenpiont").text(pageData.available_rc_balance)
            if(pageData.set_paypwd==1){
                $(".comfirtbtn1").css("display","block")
            }else{
                $(".comfirtbtn").css("display","block")
            }
        }
    })
    // 积分支付
    $('.radio1').click(function(){
        console.log()
        // data.pd_pay="";
        if($(".radio1").is(":checked")){
            data.point_pay = memberinfo.member_points
        }else{
            data.point_pay = ""
        }
        
        checkout()
    })
     // 余额支付
     $('.radio2').click(function(){
        // data.point_pay="";
        if($(".radio2").is(":checked")){
            data.pd_pay = memberinfo.recharge_rc_balance
        }else{
            data.pd_pay = ""
        }
       
        checkout()
    })
     // 得分抵扣
     $('.radio3').click(function(){
        data.point_pay="";
        data.pd_pay="";
        data.rcb_pay = memberinfo.available_rc_balance
        checkout()
    })
   
    // 设置得分密码
    $(".setnumber").click(function(){
        var number = $(".settingValue").val();
        $.ajax({
            url:host+'/api/v2/member/paypwd',
            data:{
                paypwd:number
            },
            type:'post',
            dataType:'json',
            headers:{
                token:token
            },
            success(res){
                console.log(res)
                if(res.status==0){
                    $(".defenPay").css("display","none")
                }else{
                    prompt(res.error,1000)
                }
            }
        })
    })
    // 输入密码
    $(".getetnumber").click(function(){
        valueText = $("#store_text").val()
        password = $(".textValue").val()
        let textArr = [];
        let myMap = new Object();
        pageData.forEach(element => {
            myMap[element.data[0].store_id] = valueText;
            textArr = myMap
        })
        var pageFrom = {
            cart_id: [`${pageData[0].goods_id}|${pageData[0].goods_num}`],
            pay_name: "online",
            pay_message: textArr,
            order_from: 1,
            is_virtual: 0,
            is_pintuan: 0,
            ifcart: 0,
            point_pay: data.point_pay,
            password:password,
            pd_pay: data.pd_pay,
            rcb_pay: 0,
            payment_code: selectPay == 2 ? "alipay" : "wxpay_native",
            address_id: selectaddress,
            is_newcomer:pageData[0].data[0].newcomer==1?'1':''
        }
        if (buyType == 'NOW') {
            pageFrom.ifcart = 0
            pageData.forEach(element=>{
                pageFrom.cart_id = element.data.map((v, i) => `${v.goods_id}|${v.goods_num}`)
                console.log(pageFrom.cart_id,"data.cart_id")
            })
        } else {
            pageFrom.ifcart = 1;
            pageFrom.cart_id=[]
            pageData.forEach(element=>{
                element.data.forEach((v,i)=>{
                    pageFrom.cart_id.push(`${v.cart_id}|${v.goods_num}`)
                })
                console.log(pageFrom.cart_id,"data.cart_id")
            })
        }
        if(password){
            $(".defenPay").css("display","none");
            btnOrder(pageFrom)
        }
    })
    // 关闭弹窗
    $(".clone").click(function(){
        $(".defenPay").css("display","none")
    })
})