$(function(){
    let goodsList;
    let page = 0
        // 获取超值期待商品列表
    $.ajax({
        url:host+'/api/v2/member/goodscommon',
        data:{
            page: 1,
            limit: 10,
            gc_id:405
        },
        dataType:'json',
        type:'get',
        headers:{
            token:token
        },
        success(res){
            console.log(res,"数据")
            var pageData = res.data;
            goodsList = res.data;
            var html= template('overflow',{pageData:pageData});
            $(".surpass").html(html)
        }
    })
    $(".cooShop_right").click(function(){
        var aumont = Math.ceil(goodsList.length/4)
        if(aumont>page+1){
            page ++;
        }
        
        var left=-1200*page
        $(".surpass").animate({left:left+"px"})
    })
    $(".cooShop_left").click(function(){
        var aumont = Math.ceil(goodsList.length/4)
        if(page>0){
            page --;
        }
        
        var left=-1200*page
        $(".surpass").animate({left:left+"px"})
    })
    // 获取健康优选
    $.ajax({
        url:host+'/api/v2/member/goodscommon?page=1&limit=15&is_vip=1&type=sort&goods_state=1&only_app=1',
        data:{},
        type:'get',
        dataType:'json',
        success(res){
            console.log(res.data)
            var pageData = res.data;
            var html= template('health',{pageData:pageData});
            console.log(html,"html")
            $(".healths").html(html)
        }
    })

    // vip商品解析
    $.ajax({
        url:host + '/api/v2/member/goodsexplain?page=1&limit=6',
        data:{},
        dataType:'json',
        type:'get',
        success(res){
            console.log(res.data,"data")
            var pageData = res.data;
            var html= template('vip',{pageData:pageData});
            console.log(html,"html")
            $(".vips").html(html)
        }
    })
})