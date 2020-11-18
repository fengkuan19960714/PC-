$(function(){
    let order_id = GetQueryString("order_id");
    console.log(order_id,"orderInfo")
    $.ajax({
        url:host+`/api/v2/member/order/${order_id}`,
        data:{},
        dataType:'json',
        headers:{
            token:token
        },
        type:'get',
        success(res){
            console.log(res);
            let payText ;
            switch (res.data[0].payment_code) {
                case "point":
                    payText="积分抵扣"
                    break;
                case "alipay":
                    payText="支付宝支付"
                    break;
                case "wxpay_native":
                    console.log(31231)
                    payText='微信支付'
                    break
                default:
                    break;
            }
            $('.order_pn').text("订单编号:"+res.data[0].order_sn)
            $('.pay').text("支付方式:"+payText)
            $('.price').text("支付金额"+res.data[0].order_amount)
        }
    })
    // 跳转订单详情
    $(".order-list").on("click", ".order-info", function (e) {
        var id = e.currentTarget.dataset.id;
        window.location.href = `../person/orderinfo.html?order_id=${id}`
    })
    $(".successInfo").click(function(){
        window.location.href = `../person/orderinfo.html?order_id=${order_id}`
    })
})