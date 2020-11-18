$(function(){
    let page = 0;
    let classid = 1
    // 获取每日速递
    $.ajax({
        url:'https://m.gogo.jdecology.com/api/v2/member/goodscommon?page=1&limit=11&rand=1&is_vip=0&only_app=1',
        data:{},
        type:'get',
        headers:{
            token:token,
        },
        success(res){
            var pageData = res.data.slice(0,6);
            var pageData1 = res.data.slice(6,9);
            var pageData2 = res.data.slice(9,14);
            console.log(pageData1,pageData2,"pageData")
            var html= template('newshop',{pageData:pageData})
            var html1= template('todayShop',{pageData:pageData1})
            var html2= template('hosts',{pageData:pageData2})
            console.log(html1)
            $(".news").html(html) 
            $(".news1").html(html1) 
            $(".host").html(html2) 
        }
    })
    // 每日速递翻页
    $('.img-bar-left').click(function(){
        page = page - 1;
        var lefts = page*1200;
        console.log(lefts,"321321")
        $('.news').css("left",-lefts+'px');
        if(page==0){
            $('.img-bar-left').css("display","none")
            return false
        }
        
        
    })
    // 获取店铺分类
    $.ajax({
        url:host+'/api/v2/common/storeclass',
        type:'get',
        dataType:'json',
        data:{},
        success(res){
            console.log(res,"分类")
            storeList(res.data[0].storeclass_id)
            var pageData = res.data;
            var html = template("class_list",{pageData:pageData});
            console.log(html)
            $(".classlists").html(html)
        }
    })
    function storeList(id){
        console.log(id)
        // 获取推荐店铺
        $.ajax({
            url:host+'/api/v2/member/store',
            data:{
                storeclass_id:id,
                store_recommend:1
            },
            headers:{
                token:token
            },
            type:'get',
            dataType:"json",
            success(res){
                console.log(res,"host")
                var pageData;
                if(res.data.length>3){
                    pageData = res.data.slice(0,3);
                }else if(!res.data){
                    pageData=[]
                }else{
                    pageData = res.data 
                }
                console.log(pageData,"poage")
                var html = template("store_list",{pageData:pageData});
                $(".classlist").html(html)
            }
        })
    }
    $(".classlists").on("click",".classBtn",function(e){
        $(this).css({"color":"#FB3435",'border-bottom':"1px solid #FB3435"}).siblings().css({"color":"#000",'border':'none'})
        var id= e.currentTarget.dataset.id;
        console.log(e)
        storeList(id)
    })
    $(".coo-title").on("click",".shop-btns",function(e){
        let id = e.currentTarget.dataset.id;
        console.log(id,"id")
        window.location.href = `../home/16shop.html?id=${id}`
    })
    $(".coo-title").on("click",".coo-bar",function(){
        console.log("跳转商家列表")
        window.location.href = `../home/shopStore.html`
    })
    
    $('.img-bar-right').click(function(){
        
        page = page+1;
        var lefts = page*1200;
        if(page>0){
            $('.img-bar-left').css("display","block")
        }
        $('.news').css("left",-lefts+'px');
    })
})