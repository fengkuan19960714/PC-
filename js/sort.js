$(function(){
    let query={
        only_app:1,
        gc_id_2:"",
        gc_id:"",
        page:1,
        limit:12
    }
    let total=""
    // 获取分类商品列表
     function getClassShop(){
         for(let i in query){
             if(!query[i]){
                 delete query[i]
             }
         }
        $.ajax({
            url:host + '/api/v2/member/goodscommon',
            data:query,
            dataType:'json',
            type:"get",
            success(res){
                console.log(res)
                var pageData = res.data;
                total = res.pagination.pages
                var html = template("classShop",{pageData:pageData});
                $(".shopList").html(html)
                console.log()
                var pagination = new Pagination({
                    wrap: $('.am-pagination'),
                    count: total,
                    prevText: '上一页',
                    nextText: '下一页',
                    callback: function(page) {
                        query.page = page 
                        console.log(page)
                        getClassShop1(page)
                    },
                    // ajax:{
                    //     url:host+`/api/v2/member/goodscommon?only_app=1${query.gc_id_2?'&gc_id_2='+query.gc_id_2:''}${query.gc_id?'&gc_id='+query.gc_id:''}&limit=12&page=`,
                    //     // data:query,
                    //     success(res){
                    //         var pageData = res.data;
                    //         total = res.pagination.pages
                    //         var html = template("classShop",{pageData:pageData});
                    //         $(".shopList").html(html)
                    //     },
                    //     error(){

                    //     }
                    // }
                  });
                
                
            }
        })
    }
    function getClassShop1(page){
        for(let i in query){
            if(!query[i]){
                delete query[i]
            }
        }
        query.page = page
       $.ajax({
           url:host + '/api/v2/member/goodscommon',
           data:query,
           dataType:'json',
           type:"get",
           success(res){
               var pageData = res.data;
            console.log(res);
            total = res.pagination.pages
            var html = template("classShop",{pageData:pageData});
            $(".shopList").html(html)
           }
       })
        
    }
    getClassShop()
    //获取分类
    $.ajax({
        url:host+'/api/v2/member/storegc',
        data:{},
        dataType:'json',
        type:'get',
        success(res){
            console.log(res.data);
            var pageData = res.data;
            console.log(pageData,"数据")
            // var html = template("classify",{pageData:pageData});
            var html = template("classify",{pageData:pageData})
            console.log(html,"html")
            $(".one").html(html)
        }
    })
    // 点击一级分类
   $(".one").on("click",".oneBtn",function(e){
    // query.gc_id_1 = e.target.dataset.id;
    getClassShop()
    e.preventDefault()
    console.log(e,"e")
   })
    // 点击二级分类
    $(".one").on("click",".twoBtn",function(e){
       query.gc_id_2 = e.currentTarget.dataset.id;
       getClassShop()
       e.preventDefault()
       console.log(e,"e")
       return false
      })
         // 点击三级分类
   $(".one").on("click",".threeBtn",function(e){
    query.gc_id = e.currentTarget.dataset.id;
    console.log(query.gc_id)
    getClassShop()
    e.preventDefault()
    console.log(e,"e")
    return false
   })
   $(".one").on("click",".tab-1",function(){
       $(".tab-1").css({"background":"#F5F5F5","color":"#000000"})
       $(this).css({"background":"#FFE3E3","color":"#FB3435"})
   })
   $(".one").on("click",".tab-2",function(){
       $(".tab-2").css("color","#000000")
    $(this).css("color","#FB3435")
   })
   $(".one").on("click",".tab-3",function(){
    $(".tab-3").css("color","#000000")
 $(this).css("color","#FB3435")
})
    //    点击头部分类商品列表
    $(".classBtn").click(function(e){
        var index = e.currentTarget.dataset.id;
        console.log(e)
        switch (index) {
            case "1":
                query.type = "hotest"
                break;
            case "2":
                query.type = "sort"
                break;
            case "3":
                query.type = "newest"
                break;
            case "4":
                query.type = "cheapest"
                break;
            default:
                break;
        }
        getClassShop()
    })
  
})