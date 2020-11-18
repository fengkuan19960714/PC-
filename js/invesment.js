$(function(){
    // 商企招商
    $.ajax({
        url:host+'/api/v2/member/business/0',
        type:"get",
        data:{},
        dataType:'json',
        success(res){
            console.log(res)
            $(".newList").html(res.data.desc)
            var pageData = res.data.img;
            var html = template("bannerList",{pageData:pageData});
            console.log(html)
            $('.swiper-wrapper').html(html)
            var mySwiper = new Swiper ('.swiper-container', {
				autoplay:{
					stopOnlastSlide:true
				},
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
        }
	})
	// 跳转企业招商
	$(".member_from").click(function(){
		if(!localStorage.getItem("token")){
				$(".login-pop").show()
		}else{
			window.location.href = "../person/idcard.html"
		}
	})
})