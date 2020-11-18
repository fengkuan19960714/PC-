$(function(){
    let status=false
    // 拼团列表
    $.ajax({
        url:host+'/api/v2/member/goodsgroupbuy/1/edit?page=1&limit=5',
        type:'get',
        dataType:"json",
        data:{
            store_id:1
        },
        success(res){
            console.log(res)
            var pageData = res.data;
                var html= template("groupData",{pageData:pageData})
                console.log(html)
                $(".template1").html(html)
        }
    })
    // 获取首页轮播
    $.ajax({
        url:host+'/api/v2/member/banner',
        type:'get',
        dataType:"json",
        data:{
        },
        success(res){
            console.log(res.data)
            var bannerData = res.data;
            var html= template("bannerList",{bannerData:bannerData})
           
            // console.log(html)
            $(".swiper-wrapper").html(html)
            $('.am-slider').flexslider();
            var mySwiper = new Swiper ('.swiper-container', {
				// autoplay:{
				// 	stopOnlastSlide:true
				// },
			  loop: true, // 循环模式选项
			  
			  // 如果需要分页器
			  pagination: {
				el: '.swiper-pagination',
			  },
			  
			  // 如果需要前进后退按钮
			  navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			  },
			  
			  // 如果需要滚动条
			  scrollbar: {
				el: '.swiper-scrollbar',
			  },
			})   
            // $(".banner1").slider()
        }
    })
    if(status==true){
        var $wrap = $('#wrap'),
        $picUl = $('.pic'),
        $tabLi = $('.tab li'),
        $prev = $('.prev'),
        $next = $('.next'),
        widLi = $picUl.children().eq(0).width(),
        len = $tabLi.length,
        idx = 0,
        timer = null;

    //get first; set all
    $tabLi.click(function() {
        $(this).addClass("on").siblings().removeClass("on")
        idx = $(this).index();

        $picUl.animate({
            left: -idx * widLi
        }, 500)
    })
    // 点击下一张
    $next.click(function() {
        idx++;
        idx %= len; // 序号为小圆按钮的长度时到达第一张
        $tabLi.eq(idx).addClass("on").siblings().removeClass("on")
        $picUl.animate({
            left: -idx * widLi
        }, 500)
    })

    $prev.click(function() {
        idx--;
        if (idx < 0) {
            idx = len - 1
        };

        $tabLi.eq(idx).addClass("on").siblings().removeClass("on")
        $picUl.animate({
            left: -idx * widLi
        }, 500)
    })

    // 自动轮播
    auto();

    function auto() {
        timer = setInterval(function() {
            console.log(312312)
            $next.trigger("click") // 触发click
        }, 3000)
    }

    $wrap.hover(function() {
        clearInterval(timer);
    }, function() {
        auto();
    })
    }
   
    // 获取新人专享
    $.ajax({
        url:host+'/api/v2/member/goodscommon?page=1&limit=3',
        type:'get',
        dataType:"json",
        data:{
            store_id:1,
            newcomer:1
        },
        success(res){
            if(res.data!=null){
                var pageData = res.data;
                console.log(res.data,"data1")
                var html= template("newlist",{pageData:pageData})
                // console.log(html)
                $(".template5").html(html) 
            }
            
        }
    })
    // 获取秒杀列表
    $.ajax({
        url:host+'/api/v2/member/seckill?page=1&limit=5',
        type:'get',
        dataType:"json",
        data:{
            store_id:1
        },
        success(res){
            if(res.data!=null){
                var pageData = res.data;
            // console.log(res.data,"data")
            var html= template("sekill",{pageData:pageData})
            // console.log(html)
            $(".template2").html(html) 
            }
            
        }
    })

     // 获取砍价列表
     $.ajax({
        url:host+'/api/v2/member/cutgoods?page=1&limit=5',
        type:'get',
        dataType:"json",
        data:{
            store_id:1,
            // cutprice_commend:1
        },
        success(res){
            if(res.data!=null){
                var pageData = res.data;
            console.log(res.data,"data")
            var html= template("bargin",{pageData:pageData})
            console.log(html)
            $(".template3").html(html) 
            }
            
        }
    })
    // 获取分类推荐
    $.ajax({
        url:host+'/api/v2/member/customcatalog',
        type:'get',
        dataType:"json",
        data:{},
        success(res){
            var pageData = res.data;
            console.log(res.data,"data")
            var html= template("homeclass",{pageData:pageData})

            console.log(html,html1)
            $(".template4").html(html) 
            var html1= template('homeshop',{pageData:pageData[0].goods})
            $(".template7").html(html1) 
        }
    })
})
