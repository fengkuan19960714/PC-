$(function () {
    let getToken;
    //七牛token 七牛云平台安全标识
    let qiniutoken = '';
    //七牛云图片base64格式上传地址
    let uploadUrl = "http://upload-z2.qiniup.com/putb64/-1";
    //七牛云平台 配置的域名
    var urlHeader = 'https://cdn.health.healthplatform.xyz';
    //需要上传的图片内容 base64格式
    let imgStr = '';
    let from = {
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        img6: "",
        status: true,
        name: '',
        select: false
    }
    // 获取后台token
    $.ajax({
        url: host + '/api/v2/common/imgkeyqiniu',
        data: {},
        dataTypa: "json",
        headers: {
            token: token,
        },
        type: "get",
        success(res) {
            console.log(res);
            qiniutoken = res.data;
        }
    })
    $(".submitpop").css("display','block")
    // 初始化
    var img = new ImgUpload(".imglog", 80, 80, 80);
    $(document).on('change', ".inputPic", function (e) {
        $(".lodings").css("display", "block")
        console.log(e)
        var index = e.target.dataset.index
        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function (e) {
            //或者 e.target.result都是一样的，都是base64码
            imgStr = reader.result.split(',')[1];
            uploadImg(index)
            console.log('需要上传的base64格式图片:' + imgStr);
        }
    })
    //
    $(".status1").click(function () {
        from.select = true
    })
    $(".status").click(function () {
        from.select = false
    })
    //上传图片
    function uploadImg(index) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", uploadUrl, true);
        //文本类型
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        //七牛认证信息 注意空格
        xhr.setRequestHeader("Authorization", "UpToken " + qiniutoken);
        xhr.send(imgStr);
        //监听状态
        xhr.onreadystatechange = function () {
            $(".lodings").css("display", "none")
            if (xhr.readyState == 4) {

                var result = xhr.responseText;
                console.log('上传请求结果数据:' + result);
                result = JSON.parse(result);
                switch (index) {
                    case "1":
                        console.log(1)
                        $("#mypic").attr("src", urlHeader + "/" + result.hash);
                        from.img1 = urlHeader + "/" + result.hash
                        if(from.img1){
                            $(".img1s").show()
                        }
                        break;
                    case "2":
                        $("#mypic1").attr("src", urlHeader + "/" + result.hash);
                        from.img2 = urlHeader + "/" + result.hash;
                        if(from.img2){
                            $(".img2s").show()
                        }
                        break;
                    case "3":
                        $("#mypic2").attr("src", urlHeader + "/" + result.hash);
                        from.img3 = urlHeader + "/" + result.hash;
                        if(from.img3){
                            $(".img3s").show()
                        }
                        break;
                    case "4":
                        $("#mypic3").attr("src", urlHeader + "/" + result.hash);
                        from.img4 = urlHeader + "/" + result.hash;
                        if(from.img4){
                            $(".img4s").show()
                        }
                        break;
                    case "5":
                        $("#mypic4").attr("src", urlHeader + "/" + result.hash);
                        from.img5 = urlHeader + "/" + result.hash;
                        if(from.img5){
                            $(".img5s").show()
                        }
                        break;
                    case "6":
                        $("#mypic5").attr("src", urlHeader + "/" + result.hash);
                        from.img6 = urlHeader + "/" + result.hash;
                        if(from.img6){
                            $(".img6s").show()
                        }
                        break;
                    default:
                        break;
                }
                // $("#mypic").attr("src", urlHeader+"/" + result.hash);
                img1 = urlHeader + "/" + result.hash
                console.log(img1, "img1")
                // $("#imgUrl").val(urlHeader + result.hash);
            }
        }
    }
    // 单选
    $(".option1").click(function () {
        status = true
    })
    $(".option2").click(function () {
        status = false
    })
    $(".submits").click(function () {
        console.log(from, "from")
        name = $("#user-name").val();
        if (!from.name) {
            $(".showfile").show()
            return false
        }
        if (!from.img1) {
            $(".showfile").show();
            return false
        }
        if (!from.img2) {
            $(".showfile").show();
            return false
        }
        if (!from.img3) {
            $(".showfile").show();
            return false
        }
        $(".showfile").hide()
        let data = {
            apply_info: {
                company: from.name,
                licenseImg: from.img1,
                idImg: [from.img2, from.img3],
                cardImg: from.img3,
                foodImg: from.img4,
                healthCareImg: from.img5,
                dockerName: name
            }

        }
        $.ajax({
            url: host + '/api/v2/member/businessapply',
            data: data,
            type: 'post',
            dataTypa: 'json',
            headers: {
                token: token
            },
            success(res) {
                console.log(res)
                if (res.status == 0) {
                    $(".submitpop").show()
                } else {
                    prompt(res.error, "1000")
                }
            }
        })
        // 提交表单
    })
    // 返回首页
    $(".gohome").click(function () {
        window.location.href = "../home/home.html"
    })


})