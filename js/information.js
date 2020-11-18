$(function(){
    // 获取页面参数
    let id = GetQueryString("id");
    let title = GetQueryString("title");
    $(".class-1").text(title)
    $(".class-1").click(function(){
        window.location.href = "../home/new.html"
    })
    $.ajax({
        url:host+`/api/v2/member/information/${id}`,
        data:{},
        type:'get',
        dataType:'json',
        success(res){
            console.log(res)
                if(res.data.type==1){
                    $('.inforContent').html(res.data.information_content)
                }else if(res.data.type==2){
                    $(".playVideo").attr("src",JSON.parse(res.data.information_content)[0].url)
                    $(".new-name").html(JSON.parse(res.data.information_content)[0].name);
                }else{
                    $(".playVideo").attr("src",JSON.parse(res.data.information_content)[0].url)
                    $(".new-name").html(JSON.parse(res.data.information_content)[0].name); 
                }
        }
    })
    
})