$(function(){
    let pageData="";
    let selectPay;
    let order_id = GetQueryString("order_id");
    let time;
    console.log(order_id)
    $.ajax({
        url:host+`/api/v2/member/order/${order_id}`,
        data:{},
        dataType:"json",
        headers:{
            token:token,
        },
        type:'get',
        success(res){
            console.log(res);
            res.data[0].order_goods.forEach(element => {
                element.status=res.data[0].order_state
            });
            pageData = res.data;
          
            var html = template("orderInfos",{pageData:pageData});
            $(".center").html(html)
            if(pageData[0].order_state_id==10){
                $('.logistics').css("display","block")
                $('.payBtns').css("display","block")
                $('.text1s').css("display","block")
            }
            if(res.data[0].order_state_id==10){
                $(".order_status").hide()
            }else{
                $(".order_status").show()
            }
        }
    })
    // 判断支付方式
    $(".taobao").click(function () {
        selectPay = 2
    })
    $(".qq").click(function () {
        selectPay = 3
    })
    // 立即支付
    $(".center").click(function(){
        console.log(31231)
    })
    $(".center").on("click",".payBtns",function(){
        console.log(321123)
        payBtn(pageData[0].pay_sn)
    })
    // 微信支付
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 140,
        height: 140
    });
     // 支付
     function payBtn(res){
         if(!selectPay){
            prompt("请选择支付方式",1000);
            return false
         }
        console.log(res,"res")
        $.ajax({
            url: host + `/api/v2/member/order/${res}`,
            data: {
                payment_code: selectPay == 3 ? "wxpay_native" : "alipay",
                // payment_code: "wxpay_native",
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
                    $(".shade").css("display", "block")
                    $(".login").css("display", "block")
                } else {
                    console.log(res)
                    $(".clear1").html(res.data.content)
                }
                // var timeTatlo = 60
                // time = setInterval(() => {
                //     if(timeTatlo!=0){
                //         timeTatlo-2;
                //         orderDetail(res.data.order_id)
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
     //点击span关闭
     $(".span").bind("click", function () {
        $(".shade").fadeOut(1000);
        $(".login").fadeOut(1000);
    });
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
})