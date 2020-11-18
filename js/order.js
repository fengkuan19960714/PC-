$(function () {
    let status = GetQueryString("status");
    let quertList = {
        page: 1,
        limit: 10,
        order_type: 1,
        order_state: null
    }
    $(".am-avg-sm-5").find("li").eq(status).addClass("am-active").siblings().removeClass("am-active")
    $(".am-avg-sm-5 li").click(function(){
        $(this).addClass("am-active").siblings().removeClass("am-active")
    })
    
    switch (status) {
        case "1":
            quertList.order_state = 10;
            dataList()
            break;
        case "2":
            quertList.order_state = 20;
            dataList()
            break;
        case "3":
            quertList.order_state = 30;
            dataList()
            break;
        case "4":
            quertList.order_state = 40;
            dataList()
            break;
        case "5":
           datareturn()
            break;
        default:
            dataList()
            break;
    }
    // 获取订单列表
    function dataList() {
        for(var i in quertList){
            if(!quertList[i]){
                delete quertList[i]
            }
        }
        $.ajax({
            url: host + '/api/v2/member/order',
            data: quertList,
            type: "get",
            dataType: "json",
            headers: {
                token: token
            },
            success(res) {
                if(res.error=="token过期，请重新登陆"){
                    $(".login-pop").show()
                }
                // var mash = /{|}|"|"/g
                var pageData = res.data;
                if(res.data==null){
                    res.data = []
                }
               res.data.forEach(element => {
                //    element.order_goods[0].
                element.order_goods.forEach((v,i)=>{
                    v.goods_spec = JSON.stringify(v.goods_spec).replace(/{|}|"|"/g,"")
                })
               });
                let total = res.pagination.pages;
                var html = template("orderList", {
                    pageData: pageData
                })
                console.log(pageData == null,"312321")
                if (pageData == null || pageData.length == 0) {
                    console.log(1)
                    html = "<div style='text-align: center;margin-top:100px;font-size:40px'>暂无数据</div>"
                    $(".order-list").html(html)
                } else {
                    console.log(2)
                    $(".order-list").html(html)

                    var pagination = new Pagination({
                        wrap: $('.am-pagination'),
                        count: total,
                        prevText: '上一页',
                        nextText: '下一页',
                        callback: function (page) {
                            // query.page = page 
                            console.log(page)
                            // getClassShop()
                            $.ajax({
                                url: host + `/api/v2/member/order?order_state=${quertList.order_state}&order_type=${quertList.order_type}&limit=10&page=${page}`,
                                headers:{
                                    token:token,
                                },
                                dataType:'json',
                                type:'get',
                                success(res){
                                    var pageData = res.data;
                                    let total = res.pagination.pages;
                                console.log(pageData, "pageData")
                                var html = template("orderList", {
                                    pageData: pageData
                                })
                                console.log(html)
                                $(".order-list").html(html)
                                console.log("渲染")
                                }
                            })
                        },
                    });
                }

            }

        })
    }
    // 售后订单
    function datareturn(){
        $.ajax({
            url:host+'/api/v2/member/refundreturn',
            data:{},
            type:'get',
            dataType:'json',
            headers:{
                token:token
            },
            success(res){
                console.log(res);
                console.log(res)
                var pageData = res.data;
                // let total = res.pagination.pages;
                var html;
                if (pageData == null || pageData.length == 0) {
                    console.log(1)
                    html = "<div style='text-align: center;margin-top:100px;font-size:40px'>暂无数据</div>"
                   
                } else {
                    html = template("orderList", {
                        pageData: pageData
                    })
                }
                $(".order-list").html(html)
                console.log(pageData, "pageData")
               
                
            }
        })
    }
    // 点击订单分类
    window.orderBtn = function (e) {
        switch (e) {
            case 1:
                quertList.order_state =""
                dataList()
                break;
            case 2:
                quertList.order_state = 10;
                dataList()
                break;
            case 3:
                quertList.order_state = 20;
                dataList()
                break;
            case 4:
                quertList.order_state = 30;
                dataList()
                break;
            case 5:
                quertList.order_state = 40;
                dataList()
                break;
                case 6:
                    datareturn()
                    break;
            default:
                break;
        }
        console.log(e, 31232, quertList.order_state)
       

    }
    // 跳转订单详情
    $(".order-list").on("click", ".order-info", function (e) {
        var id = e.currentTarget.dataset.id;
        window.location.href = `../person/orderinfo.html?order_id=${id}`
    })
    // 订单商品分类
    window.orderStatus = function (e) {
        if (e == 1) {
            quertList.order_type = 1
        } else {
            quertList.order_type = 10
        }
        dataList()
        // window.location.reload()
    }
    // 确认收货
    $(".center").on("click", ".delivery", function (e) {
        console.log(e, "e")
        var order_id = e.currentTarget.dataset.id;
        $.ajax({
            url: host + `api/v2/member/orderstate/${order_id}`,
            data: {
                state_type: 'order_receive'
            },
            headers: {
                token: token
            },
            type: "PUT",
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.status = 0) {
                    prompt("发货成功", "1000")
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                } else {
                    prompt(res.error, "1000")
                }
            }
        })
    })
})