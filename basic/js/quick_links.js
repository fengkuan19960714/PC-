(function() {

jQuery(function($){
	
	//鼠标悬停信息

	$("#wrap .item").mouseenter(function(){
		$(this).children(".mp_tooltip").animate({left:-92,queue:true});
		$(this).children(".mp_tooltip").css("visibility","visible");
		$(this).children(".ibar_login_box").css("display","block");
	});
	$("#wrap .item").mouseleave(function(){
		$(this).children(".mp_tooltip").css("visibility","hidden");
		$(this).children(".mp_tooltip").animate({left:-121,queue:true});
		$(this).children(".ibar_login_box").css("display","none");
	});
	// 首页二维码
	// $(".shopMainbg").mouseenter(function(){
	// 	console.log(312312)
	// 	$(".codes").animate({left:200,queue:true});
	// 	$(".codes").css("display","block");
	// });
	$(".shopMainbg").on("mouseenter",".list1",function(){
		$(this).children(".codes").show()
		// $(".codes").css("display","block");
	})
	// $(".shopMainbg").mouseleave(function(){
	// 	console.log(312312)
	// 	$(".codes").animate({left:-200,queue:true});
	// 	$(".codes").css("display","none");
	// });
	$(".shopMainbg").on("mouseleave",".list1",function(){
		$(this).children(".codes").hide()
	})


	$(".quick_toggle li").mouseover(function(){
		$(this).children(".mp_qrcode").show();
		$(this).children(".mp_tooltip").animate({left:-92,queue:true});
		$(this).children(".mp_tooltip").css("visibility","visible");
	});
	$(".quick_toggle li").mouseleave(function(){
		$(this).children(".mp_qrcode").hide();
		$(this).children(".mp_tooltip").css("visibility","hidden");
		$(this).children(".mp_tooltip").animate({left:-121,queue:true});		
	});
	

})
		$(".return_top").click(function(){
			ds.scrollTo(0, 0);
			hideReturnTop();})

		$(".ticketing").click(function(){
			$(".popcar").css("display","block");
			$(".popApp").hide()
		})
		
		$('.a').click(function() {
			
		   });
		   $(".one").on("click",".a",function(e){
			   console.log($(this),"this")
			if ($(this).siblings('ul').css('display') == 'none') {
				$(this).css("background:#FB3435")
				$(this).siblings().css("background:color:#fff");
				$(this).children(".img2s").show();
				$(this).children(".img1s").hide();
				$(this).siblings().children(".img1s").show();
				$(this).siblings('ul').slideDown(100).children('li');
				if ($(this).parents('li').siblings('li').children('ul').css('display') == 'block') {
				 $(this).parents('li').siblings('li').children('ul').slideUp(100);
			
				}
			   } else {
				$(this).children(".img2s").hide();
				$(this).children(".img1s").show();
				console.log($(this).children("img1s"),"312")
				//控制自身菜单下子菜单隐藏
				$(this).siblings('ul').slideUp(100);
				//控制自身菜单下子菜单隐藏
				$(this).siblings('ul').children('li').children('ul').slideUp(100);
			   }
		   })
})();