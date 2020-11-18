   
let status=6;
let times;
let code;
if(GetQueryString("code")){
    code = GetQueryString("code");
}
    if(code){
        let data={
            code:code,
            source:7
        }
        $.ajax({
            url:host+'/api/v2/member/login',
            data:data,
            type:"post",
            dataType:'json',
            success(res){
                console.log(res)
                if(res.status==0){
                    prompt("登录成功",1000)
                    localStorage.setItem("token", res.data.token);
                   
                    console.log(localStorage.getItem("token"),"3123123")
                    token = res.data.token;
                    cart_num = res.data.cart_num;
                    $(".login-pop").css("display","none");
                    $(".loginShow1").css("display","block");
                    $(".loginShow").css("display","none")
                    $(".marqueen").css("display","none");
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
                            localStorage.setItem("memberInfo", res.data.member_nick);
                            $(".loginShow1").text(res.data.member_nick?res.data.member_nick:res.data.wx_name)
                        }
                    })
                }
            }
        })
    }
// 	// 登录授权模块
window.callback = function(res){
        let codeData =res
        if(res.ret === 0){
            console.log(res)
            // alert(res.ticket)   // 票据
        }
        var phone;
        if(status==6){
            console.log(1)
            // phone = $("input[ id='input_phone']").val();
            phone = $("input[ id='input_pwd']").val();
        }else{
            console.log(2)
            phone = $("input[ id='input_phone']").val();
        }
    console.log(phone,status,"pho")
    if(phone==""||phone.length!=11){
        prompt("请填写正确的手机号",1000)
        return false
    }
    let data={
        mobile:phone,
        type:status,
        ticket:codeData.ticket,
        randstr:codeData.randstr
    }
    $.ajax({
        url:host+'/api/v2/common/mobilecode',
        type:"post",
        dataType:"json",
        data:data,
        success(res){
           
            if(res.status==0){
                prompt(res.data.message,1000)
                var time = 60
                times = setInterval(() => {
                    time--
                    $("#TencentCaptcha").text(time+'秒后重试');
                    $(".code-2").text(time+'秒后重试');
                    $(".code-1").hide();
                    $(".code-2").show();
                    if(time==0){
                        clearInterval(times);
                        $(".code-1").show();
                        $(".code-2").hide();
                        $("#TencentCaptcha").text("获取验证码")
                    }
                }, 1000);
                times()
            }else{
                prompt("请60秒后重试",1000)
            }
            console.log(res,"请求数据")
           
        }
    })
}
$(function(){
    //登录
    $(".loginsBtn_1").click(function(){
        $('.login-pop').css("display","block");
        $(".btn1").css("display","block")
        $(".btn2").css("display","none")
    })   
    $(".reginersBtn_1").click(function(){
        $('.login-pop').css("display","block");
        $(".btn1").css("display","none")
        $(".btn2").css("display","block")
    }) 
    $(".loginBtn1").click(function(){
        status = 6
        clearInterval(times);
        $("#TencentCaptcha").text("获取验证码")
        $(".loginBtn1").css("color","#E4393C");
        $(".regerBtn1").css("color","#999999")
        $(".btn1").css("display","block")
        $(".btn2").css("display","none")
    })
    $(".regerBtn1").click(function(){
        status = 5
        clearInterval(times);
        $("#TencentCaptcha").text("获取验证码")
        $(".regerBtn1").css("color","#E4393C");
        $(".loginBtn1").css("color","#999999");
        $(".btn1").css("display","none")
        $(".btn2").css("display","block")
    })
    $(".regerBtn").click(function(){
        var name = $("input[ id='input_name']").val();
        var phone = $("input[ id='input_phone']").val();
        var code = $("input[ id='input_code']").val();
        var code1 = $("input[ id='input_code1']").val();
        var state;
        console.log(name,phone,code,code1)
        if(name!=""&&phone!=""&&code!=""&&code1!=""){
            state = true
        }else{
            state = false
        }

        if(!state){
            prompt("请完善表单信息",1000)
        }else{
            let data={
            source:6,
            member_mobile:phone,
            captcha_code:code,
            action:"register",
            member_nick:name,
            inviter_mobile:code1
            // token:"21f3d74da970da80526a60c63a596b7a"
        }
        $.ajax({
            url:host+'/api/v2/member/login',
            type:"post",
            dataType:'json',
            data:data,
            success(res){
                if(res.status==0){
                    console.log(res)
                    localStorage.setItem("token", res.data.token);
                    console.log(localStorage.getItem("mycolor"),"3123123")
                    token = res.data.token;
                    cart_num = res.data.cart_num;
                    prompt("注册成功",2000)
                    localStorage.setItem("token", res.data.token);
                    console.log(localStorage.getItem("token"),"3123123")
                    token = res.data.token;
                    cart_num = res.data.cart_num;
                    $(".top-car").text(cart_num)
                    $(".login-pop").css("display","none");
                    $(".loginShow").css("display","none")
                    $(".loginShow1").css("display","block")
                    $(".marqueen").css("display","none");
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
                            localStorage.setItem("memberInfo", res.data.member_nick?res.data.member_nick:res.data.wx_name);
                            $(".loginShow1").text(res.data.member_nick?res.data.member_nick:res.data.wx_name)
                        }
                    })
                    window.location.reload()
                }else{
                    prompt(res.error,2000)
                    $(".login-pop").css("display","none");
                }
                
            }
        })
        }
        console.log(name)
    })
    $("#regerBtn2").click(function(){
        var pwd = $("input[ id='input_pwd']").val();
        var code = $("input[ id='input_code']").val();
        var state;
        console.log()
        if(pwd!=""&&code!=""){
            state = true
        }else{
            state = false
        }
        if(!state){
            prompt("请完善表单信息",1000)
            return false
        }else{
            
        }
        let data={
            source:6,
            member_mobile:pwd,
            captcha_code:code,
            action:'login'
            // token:"21f3d74da970da80526a60c63a596b7a"
        }
        $.ajax({
            url:host+'/api/v2/member/login',
            type:"post",
            dataType:'json',
            data:data,
            success(res){
                console.log(res)
                if(res.status==0){
                    prompt("登录成功",1000)
                    localStorage.setItem("token", res.data.token);
                    console.log(localStorage.getItem("token"),"3123123")
                    token = res.data.token;
                    cart_num = res.data.cart_num;
                    $(".top-car").text(cart_num)
                    $(".login-pop").css("display","none");
                    $(".loginShow").css("display","none")
                    $(".loginShow1").css("display","block")
                    $(".marqueen").css("display","none");
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
                            localStorage.setItem("memberInfo", res.data.member_nick);
                            $(".loginShow1").text(res.data.member_nick?res.data.member_nick:res.data.wx_name)
                        }
                    })
                    // window.location.reload()
                }else{
                    prompt(res.error,1000)
                    $(".login-pop").css("display","none");
                }
            }
        })
        console.log(name)
    })

    $(".loginShow").click(function(){
        console.log(32)
        $(".login-pop").css("display","block");
    })
    $(".cloneLogin").click(function(){
        $(".login-pop").css("display","none");
    })
    // 微信登录
    $(".codeClone").click(function(){
        console.log(12)
        $(".codeImg").css("display","none")
    })
    $(".wecharts").click(function () {
        console.log("微信")
        $(".codeImg").css("display","block")
        var obj = new WxLogin({
            // self_redirect:true,
            id: "wxCodes",　　//div的id
            appid: "wxf8343c89807bb3a3",　　//后台申请的appid
            scope: "snsapi_login",　　//写死
            redirect_uri: encodeURI("https://m.gogo.jdecology.com/terminal/home/home.html"),　　//扫描二维码后跳转的页面
            state: "",
            style: "black",//二维码黑白风格
            href: ""
        });
        console.log(obj,"obj")
    })
  
})