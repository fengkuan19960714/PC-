$(function(){
       // 获取分类
       $.ajax({
        url:'https://www.healthplatform.xyz/api/v2/member/storegc',
        type:'get',
        dataType:"json",
        success(res){
            // console.log(res.data)
            
            var pageData = res.data;
            var html= template("productOptions",{pageData:pageData})
            // console.log(html)
            $("#js_climit_li").html(html)
        }
    })
})