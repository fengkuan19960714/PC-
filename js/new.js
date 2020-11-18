$(function(){
    // 选择新闻分类
    let classify_id="";
    let class_name = "";
    // 获取分类列表
    $.ajax({
        url:host+'/api/v2/member/informationclass?limit=0',
        data:{},
        dataType:'json',
        type:'get',
        success(res){
            console.log(res);
            var pageData = res.data;
            pageData.forEach(element => {
                element.addtime = dataTime(element.addtime)
                console.log(dataTime(1595317020),"312312")
            });
            classify_id = res.data[0].classify_id
            var html = template("newTitleList",{pageData:pageData})
            $(".lists").html(html)
            class_name = res.data[0].classify_name;
            // console.log($(".lists").children("li").get(0))
            $(".lists").children("li").first().addClass("bgcolor")
            newList()
        }
    })
    // 获取新闻列表
    function newList(){
        $.ajax({
            url:host+`/api/v2/member/information?classify_id=${classify_id}`,
            data:{},
            type:"get",
            dataType:'json',
            success(res){
                console.log(3123123);
                
                var pageData = res.data;
                pageData.forEach(element => {
                    element.addtime = dataTime(element.addtime)
                    console.log(dataTime(1595317020),"312312")
                });
                
                var html = template("newList",{pageData:pageData});
                console.log(html)
                $(".newtitleList").html(html)
            }
        })
    }
    // 点击分类
    $(".new-left").on("click","li",function(e){
        console.log(e,32213123)
        
        $(this).css({"color":"#FB3435",'border':'1px solid #FB3435'}).siblings().css({"color":"#000",'border':'none'})
        classify_id = e.currentTarget.dataset.id;
        class_name = e.currentTarget.dataset.title
        newList()
    })
    // 跳转详情
    $(".newtitleList").on("click",".newinfo",function(e){
        console.log(e,"e")
        $(this).css({"background":"#FFE9E9","border":"2px solid #FB3435"}).siblings().css({"background":"#f5f5f5","border":"none"})
        var information_id = e.currentTarget.dataset.id;
        
        window.location.href=`../home/information.html?id=${information_id}&title=${class_name}`
    })
})