$(function(){
    
    $.ajax({
        url:host+'/api/v2/member/memberinfo',
        data:{},
        type:'get',
        dataType:"json",
        headers:{
            token:token
        },
        success(res){
            console.log(res);
            var pageData = res.data;
            var html= template("mines",{pageData:[pageData]})
            // console.log(html)
            $("#minesTop").html(html)
            if(!token){
                $(".outlogin").hide()
            }
        }
    })
    $("#minesTop").on("click",".tabList",function(){
        $(".popBtn").css("display","block")
    })
      // 退出登录
      $("#minesTop").on("click",".outlogin",function(){
          console.log(31231)
            localStorage.clear(); 
            prompt("登出成功",1000)
            window.location.href="../home/home.html"
            
      })
})