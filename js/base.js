// 全局设置
    // const token = "d9b1e41d08077ca3d7c2b7ef14155c58";
	const host = "https://m.gogo.jdecology.com";
	// let host = "https://test17.healthsource.com.cn";
	// let token = "9247e011289846042cc93ce3745c9be7";
	let token = localStorage.getItem("token");
	let page = 0
	$(".loginShow1").text('会员：'+localStorage.getItem("memberInfo"))
	let searchList = JSON.parse(localStorage.getItem("searchList"))
	if(!searchList){
		searchList = []
	}
	
	let cart_num = 0; //购物车
	// 处理函数模块
	// =======================================================================================================>
	console.log(searchList,"searchList")
	
	// 弹窗
    function prompt(newName, time, fn) {
		var $div = $('<div></div>');
		$div.css({
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'width': '100%',
			'height': '100%',
			'z-index': '100010',
			'background-color': 'rgba(0,0,0,0.4)',
			// 'background-color':'#000',
		});
		var $contentDiv = $('<div>' + newName + '</div>');
		$contentDiv.css({
			'position': 'absolute',
			'top': '50%',
			'left': '50%',
			'font-size': '25px',
			'padding': '50px 100px',
			'border-radius': '5px',
			'background-color': '#fff',
			'color': '#000'
		});
		$div.append($contentDiv);
		$('body').append($div);
	
		// 获取创建的大小
		var newW = (parseInt($contentDiv.css('width')) + 200) / 2;
		var newH = (parseInt($contentDiv.css('height')) + 100) / 2;
		$contentDiv.css({
			'margin-top': -newH + 'px',
			'margin-left': -newW + 'px',
		})
		setTimeout(function() {
			$div.remove();
			if (fn) {
				fn(); //回调函数    
			}
	
		}, time);
	}

	// /获取参数
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return decodeURI(r[2]);
		return null;
	}
	// 时间戳处理
	function dataTime(data) {
		var date = new Date(data)
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
		return Y + M + D + h + m + s
	  }
	// ====================================================================================================================>
	// 页面效果模块
	// 点击页面头部分类
	$(function(){
		$("#nav").hide(500)
		// 判断登录状态
		if(localStorage.getItem("token")){
			$(".loginShow").css("display","none");
			$(".loginShow1").css("display","block");
			$(".marqueen").css("display","none");
		}
		$(".tabList").click(function(){
			// console.log(312312)
			$(".popBtn").css("display","block")
			$(".popApp").css("display","block")
		})
		$(".popBtns").click(function(){
			window.location.href="../home/home.html"
		})
		// 点击全部，收缩分类栏
		$('.long-title').click(function(){
			$("#nav").toggle(500);
			$(".popBtn").hide()
		})
		// 回到顶部
		$(".quick_links_pop").click(function(){
			$('html , body').animate({scrollTop: 0},'slow');
		})
		$(".top1").click(function(){
			$('html , body').animate({scrollTop: 200},'slow');
		})
		$(".top2").click(function(){
			$('html , body').animate({scrollTop: 600},'slow');
		})
		$(".top3").click(function(){
			$('html , body').animate({scrollTop: 850},'slow');
		})
		$(".top4").click(function(){
			$('html , body').animate({scrollTop: 1900},'slow');
		})
		// 跳转我的页面
		$(".search13").click(function(){
			console.log(312312)
			window.location.href = "../home/search.html"
		})
		// 模块化页面底部
		// var html ='<div class="am-container consumer" style="display: flex;height: 130px;border-bottom:1px solid #eee ;"><div style="display: flex;"><div class="fontImg"><div class="max_box_1"><div id="box1"></div><div id="box2"></div><div id="box3"></div> </div><div class="max_box_2"><div id="box4"></div><div id="box5"></div><div id="box6"></div> </div><div class="texts">多</div></div><div  style="margin-top:17%;" class="decs">品类齐全，轻松购物</div></div><div style="display: flex;"><div class="fontImg">	<div class="max_box_1">		<div id="box1"></div>		 <div id="box2"></div>		 <div id="box3"></div> 	</div>	<div class="max_box_2">		<div id="box4"></div>		 <div id="box5"></div>		 <div id="box6"></div> 	</div>	<div class="texts">快</div></div><div  style="margin-top:17%;" class="decs">多仓直发，极速配送</div></div><div style="display: flex;">	<div class="fontImg">		<div class="max_box_1">			<div id="box1"></div>			 <div id="box2"></div>			 <div id="box3"></div> 		</div>		<div class="max_box_2">			<div id="box4"></div>			 <div id="box5"></div>			 <div id="box6"></div> 		</div>		<div class="texts">好</div>	</div>	<div  style="margin-top:17%;" class="decs">正品行货，精致服务</div></div><div style="display: flex;">	<div class="fontImg">		<div class="max_box_1">			<div id="box1"></div>			 <div id="box2"></div>			 <div id="box3"></div> 		</div>		<div class="max_box_2">			<div id="box4"></div>			 <div id="box5"></div>			 <div id="box6"></div> 		</div>		<div class="texts">省</div>	</div>	<div  style="margin-top:17%;" class="decs">天天低价，畅选无忧</div></div></div><div class="am-container footers" style="background-color: #fff;display: flex;">	<div class="footer_left">		<img src="">	</div>	<div class="storgeList" style="margin-right:60px">		<ul>			<li>合伙共赢</li>			<li>商企招商</li>			<li>快捷社区</li>			<li>智慧商圈</li>			<li>新闻资讯</li>		</ul>	</div>	<div class="storgeList" style="margin-right: 200px;"><ul>	<li>购购商城</li>	<li>商家入驻</li>	<li>生活圈</li>	<li class="class_lists">		<div class="m_bottom">旅行出游</div>		<div class="m_bottom">智教培优</div>		<div class="m_bottom">艺品艺拍</div>		<div>直播礼包</div>		<div>票务系统</div>		<div>优品批发</div>	</li></ul></div><div class="footer_code">	<img src="">	<div class="code_text">健德购购公众号</div>	<div class="code_text">扫一扫 关注我们</div></div><div class="footer_code">	<img src="">	<div class="code_text" style="font-size: 18px;">健德购购APP</div>	<div class="code_text">扫一扫 即刻下载</div></div><div class="footer_code">	<img src="">	<div class="code_text" style="font-size: 18px;">健德抖音账号</div>	<div class="code_text">扫一扫 关注我们</div></div></div><div class="bottom">	<div class="am-container" style="display: flex;background-color: #000;color: #fff;">		<div class="bottom_text1">专线服务</div>		<div class="bottom_phone">400-828-1088</div>		<div class="footer_number">			<div>©2020  武汉健德生态科技有限公司</div>			<div>鄂公网安备 42010202002251号</div>			<a style="color: #fff!important;" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42010202002228"><img style="width:15px;height:15px" src="../images/huohui.png">鄂ICP备19021339号-1</a>		</div>	</div>	</div>'
		// var html = 
		// $(".footerTemplate").html(html)
		// d登录模块

		// 获取顶部分类
		$.ajax({
			url:host+'/api/v2/common/indexconfig',
			data:{},
			type:'get',
			dataType:'json',
			success(res){
				// console.log(res.data,"1231231")
				var pageData = res.data;
				// var html = template("class_headers",{pageData:pageData.menus}) 
				// $(".class_header").html(html)
			}
		})
		$(".ticket").click(function(){
			$(".popBtn").css("display","block")
			$(".popcar").css("display","block")
		})
		$(".class_header").on("click",".className",function(e){
			// console.log(e,"e")
			var index = e.currentTarget.dataset.index;
			switch (index) {
				case "0":
					window.location.href = "../home/cooperation.html"
					break
				case "1":
					window.location.href = "../home/shopping.html"
					break;
				case "2":
					$(".popBtn").css("display","block")
					$(".popcar").css("display","block")
					
					// $(".popBtn").css("display","block")
					break;
				case "3":
					window.location.href = "../home/new.html"
					break;
				case "4":
					window.location.href="../home/investment.html"
					
					break;
				case "5":
					console.log(5)
					$(".popBtn").css("display","block")
					$(".popApp").css("display","block")
					break;
				case "6":
					$(".popBtn").css("display","block")
					$(".popApp").css("display","block")
					break;
				case "7":
					$(".popBtn").css("display","block")
					$(".popApp").css("display","block")
					break;
				default:
					$(".popBtn").css("display","block")
					$(".popApp").css("display","block")
					break;

			}
		})
		// 点击logo返回首页
		$(".imgesBtn").click(function(){
			window.location.href="../home/home.html"
		})
		// 返回首页
		$(".popBtns").click(function(){
			window.location.href="../home/home.html"
		})
		$(".bar-text3").click(function(){
			window.location.href = "../person/order.html"
		})
		$(".bar-text23").click(function(){
			$(".popBtn").css("display","block")
			$(".popApp").css("display","block")
		})
		$(".clone").click(function(){
			console.log(321312)
			$(".popBtn").css("display","none")
		})
		// 商家入驻
		$(".shopTop").click(function(){
			window.location.href = "../home/investment.html"
		})
		 // 获取分类
		 $.ajax({
			url:host+'/api/v2/member/storegc',
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
		// 获取购物车列表
		getCartList()
		function getCartList(){
			$.ajax({
				url:host +'/api/v2/member/cart',
				data:{},
				headers:{
					token:token
				},
				dataType:"json",
				type:"get",
				success(res){
					for (var i in res.data.store_cart_list){
						console.log(res.data.store_cart_list[i])
						res.data.store_cart_list[i].forEach(element => {
							cart_num =cart_num+element.goods_num
						});
					}
					console.log(cart_num,"cart_num")
					$(".top-car").text("购物车"+cart_num)
				}
			})
		}
		 // 每日速递翻页
		 $('.img-bar-left').click(function(){
			page = page - 1;
			var lefts = page*1200;
			console.log(lefts,"321321")
			// $('.news').css("left",);
			$(".news").animate({
				left:-lefts+'px',
			  });
			var num = Math.ceil(storedataList.length/4);
			console.log(num,page,num>page)
			if(num>page){
				console.log("进入")
				$('.img-bar-right').css("display","block")
			}else{
				$('.img-bar-right').css("display","none")
			}
			if(page==0){
				$('.img-bar-left').css("display","none")
				return false
			}
		   
			
			
		})
		$(".ticketing").click(function(){
			console.log(31231)
			$(".popcar").css("display","block")
		})
		$('.nav-list2 ul li').click(function () {
			console.log(312312)
			$(".nav-list2").css("display", "none");
			$(".popBtn").css("display","block")
			$(".popcar").css("display","block")
		})
		$('.img-bar-right').click(function(){
			
			page = page+1;
			var lefts = page*1200;
			var num = Math.ceil(storedataList.length/4);
			console.log(num,num>page>0)
			if(page>0){
				$('.img-bar-left').css("display","block")
			}
			if(num-1>page>0){
				$('.img-bar-right').css("display","block")
			}else{
				$('.img-bar-right').css("display","none")
			}
			$(".news").animate({
				left:-lefts+'px',
			  });
		})
		// 生活圈
		$("#prods").click(function () {
			console.log(312312)
			$(".nav-list2").css("display", "block");
		})
		// 跳转搜索页
		$(".goSearch").click(function(){
			window.location.href = "../home/search.html"
		})
	})


	// 上传图片
	function ImgUpload(node,width,height,linHeight){
		var _this = this;
		this._node = node;
		this.width = width + 'px';
		this.height = height + 'px';
		this.linHeight = linHeight + 'px';
		this.setCss();
		this.createFile();
	}
	
	ImgUpload.prototype.createFile = function(){
		$(this._node).append('<input type="file"/>')
	}
	
	ImgUpload.prototype.setCss = function(){
		$(this._node).css({
			"width":this.width,
			"height":this.height,
			"line-height":this.linHeight,
		})
	}
	
	ImgUpload.prototype.setSpan = function(_this){
		$(_this).siblings().css("opacity",0);
	}

	