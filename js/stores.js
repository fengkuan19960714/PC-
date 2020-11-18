$(function(){
    let dataList;
    let storedataList;
    // 商品详情参数
    let page = 0;
    if(!token){
        prompt("请先登录",1000)
    }
    function storeList(data){
        console.log()
        // 获取推荐店铺
        $.ajax({
            url:host+'/api/v2/member/store',
            data:data,
            headers:{
                token:token
            },
            type:'get',
            dataType:"json",
            success(res){
                console.log(res,"host")
                var pageData;
                dataList = res.data;
                pageData = res.data; 
                var html = template("store_list1",{pageData:pageData});
                $(".classlist").html(html)
            }
        })
    }
    storeList()
    // 获取推荐店铺
    $.ajax({
        url:host+'/api/v2/member/store',
        data:{
            store_recommend:1
        },
        type:'get',
        dataType:'json',
        headers:{
            token:token
        },
        success(res){
            console.log(res,"res");
            var pageData = res.data;
            storedataList = res.data
            var html = template("storeList",{pageData:pageData});
            $(".store_template").html(html)
            if(res.data.length>4){
                $('.img-bar-right').css("display","block")
            }
        }
    })

    $(".classlist").on("click",".store-Btn",function(e){
        console.log(e);
        let index =  e.currentTarget.dataset.index;
        var skulist = dataList[index];
        console.log(skulist)
        window.location.href = `../home/16shop.html?id=${skulist.store_id}`;
    })
    // 跳转商家详情
    $(".store_template").on("click",".storesDetail",function(e){
        console.log(e,"8")
        var id = e.currentTarget.dataset.id;
        window.location.href = `../home/16shop.html?id=${id}`
    })

    // 每日速递翻页
    $('.img-bar-left').click(function(){
        page = page - 1;
        var lefts = page*1200;
        console.log(lefts,"321321")
        // $('.news').css("left",);
        $(".news").animate({
            left:-lefts+'px',
          });
        var num = Math.ceil(storedataList.length/4);
        console.log(num,page,num>page)
        if(num>page){
            console.log("进入")
            $('.img-bar-right').css("display","block")
        }else{
            $('.img-bar-right').css("display","none")
        }
        if(page==0){
            $('.img-bar-left').css("display","none")
            return false
        }
       
        
        
    })
    $('.img-bar-right').click(function(){
        
        page = page+1;
        var lefts = page*1200;
        var num = Math.ceil(storedataList.length/4);
        console.log(num,num>page>0)
        if(page>0){
            $('.img-bar-left').css("display","block")
        }
        if(num-2>page>0){
            $('.img-bar-right').css("display","block")
        }else{
            $('.img-bar-right').css("display","none")
        }
        $(".news").animate({
            left:-lefts+'px',
          });
    })
})