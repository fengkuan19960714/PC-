// JavaScript Document

//商品规格选择
$(function() {
	// 页面点击弹窗
	// $('.item-inform').on("click",".coollet",function(){
		
	// })
	// 规格1选择
	let spec1= ""
	// 规格2选择
	let spec2= ""
	let userId=GetQueryString("id");//调用
	// 判断是否商家列表
	let store=GetQueryString("store");//调用
	// 商品详情
	let pageData;
	let enshrine_type = 0
	// 数量
	let numbers=1;
	let specs = new Object;

	if(store){
		$(".mt").css("display","none");
		$(".store_show").css("display","block")
	}else{
		$(".mt").css("display","block");
		$(".store_show").css("display","none")
	}
	$(".mt").click(function(){
		window.location.href = "../home/sort.html"
	})
	// 点击规格一
	$(".item-inform").on("click",".class1",function(e){
		console.log(e)
		var index = e.currentTarget.dataset.index
		var indexs = e.currentTarget.dataset.index1
		var oSpan = document.createElement('i')
		if (!!$(this).hasClass("selected")) {
			$(this).removeClass("selected");
			// $(this).removeChild(oSpan)
			spec1 = ""
		} else {
			spec1 = e.currentTarget.dataset.value
			$(this).addClass("selected").siblings("li").removeClass("selected");
			// $(this).appendChild(oSpan).siblings("li").removeChild(oSpan);

		}
		
		specs[pageData.spec_name[index]]=pageData.spec_value[index][indexs];
		var index = pageData.SKUList.findIndex((v,i)=>{
			console.log(JSON.stringify(v.goods_spec))
			return JSON.stringify(v.goods_spec)==JSON.stringify(specs)
		})
		if(index!=-1){
			$(".textPrice").text(pageData.SKUList[index].goods_price)
		}
		
		// console.log(spes,"specs")
		e.preventDefault()
		console.log(spec1)
	})
	// 获取店铺详情
	function storeDetail(){
		$.ajax({
			url:host+`/api/v2/member/store/${pageData.store_id}`,
			headers:{
				token:token
			},
			data:{},
			dataType:'json',
			type:'get',
			success(res){
				console.log(res)
				$(".store_name").text(res.data.store_name)
				$('.store_img').attr("src", res.data.store_avatar);
				$('.market').text(res.data.view);
				$(".view").text(res.data.store_sales);
			}
		})
	}
	// 跳转店铺详情
	$(".store").click(function(){
		console.log(pageData,"pageData")
		window.location.href = `../home/16shop.html?id=${pageData.store_id}`
	})

	// 点击数量
	$(".item-inform").on("click","#add",function(){
		console.log(31231)
		numbers = numbers+1;
		console.log(numbers)
		$("#text_box").val(numbers)
	})
	// 点击数量
	$(".item-inform").on("click","#min",function(){
		console.log(31231)
		if(numbers==1){
			return false
		}else{
			numbers = numbers-1;
		}
		
		console.log(numbers)
		$("#text_box").val(numbers)
	})
	// 点击规格二
	$(".item-inform").on("click",".class2",function(e){
		console.log($(this))
		var oSpan = document.createElement('i')
		if (!!$(this).hasClass("selected")) {
			$(this).removeClass("selected");
			// $(this).removeChild(oSpan)
			spec2 = ""
		} else {
			spec2 = e.currentTarget.dataset.value
			$(this).addClass("selected").siblings("li").removeClass("selected");
			// $(this).appendChild(oSpan).siblings("li").removeChild(oSpan);
		}
		e.preventDefault()
	})
		

		
		// 获取商品详情
		$.ajax({
			url: host+`/api/v2/member/goodscommon/${userId}`,
			type: 'get',
			dataType: "json",
			data: {},
			success(res) {
				res.data.goodsimagesList.forEach((v,i)=>{
					v.select = false
				})
				res.data.goodsimagesList[0].select = true
				pageData = res.data;
				console.log(pageData)
				// pageData.goods_body = JSON.parse(pageData.goods_body)
				var html = template('template9', { pageData: pageData })
				
				// var html1= template('template10',{pageData:pageData})
				// var html2= template('template11',{pageData:pageData})
				// console.log(html1)					// var html3= template('template12',{pageData:pageData})
				
				$(".item-inform").html(html)
				$('.imgCotent').html(pageData.goods_body);
				
				console.log(res.data,"res.data.enshrine_sum")
				enshrine_type = res.data.enshrine_type;
				if(res.data.enshrine_type==0){
					console.log(31231)
					$(".img1").css("display","block");
					$(".img2").css("display","none")
					
				}else{
					$(".img1").css("display","none")
					$(".img2").css("display","block")
				}
				storeDetail()
				// 获取评论列表
			$.ajax({
				url: host + '/api/v2/member/goodsevaluate',
				data: {
					goods_id:pageData.SKUList[0].goods_id
				},
				dataType: 'json',
				headers:{
					token:token
				},
				type: 'get',
				success(res) {
					var data="";
					var Y="";
					var M="";
					var D="";
					var h="";
					var m="";
					res.data.forEach(element => {
						date = new Date(element.geval_addtime);
						Y = date.getFullYear() + '-';
						M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						D = date.getDate() + ' ';
						h = date.getHours() + ':';
						m = date.getMinutes() + ':';
						element.geval_addtime = Y+"-"+M+"-"+D+"-"+"  "+h+":"+m
					});
					console.log(res,"res")
					var pageData1 = res.data;
					if(res.data.length==0){
						var html = '<div>暂无评论</div>';
					}else{
						var html = template("gaveLists",{pageData1:pageData1});
					}
					
					
					console.log(html,"html")
					$(".gaveList").html(html)
				}
			})

			// 获取商品列表

		$.ajax({
			url: host + '/api/v2/member/goodscommon',
			data: {
				page: 1,
				limit: 3,
				store_id:pageData.store_id
			},
			dataType: 'json',
			type: 'get',
			success(res) {
				console.log(res)
				var pageData = res.data;
				var html = template("goods_detail", { pageData, pageData });
				console.log(html, "html")
				$(".detailList").html(html)
			}
		})
				// $(".imgCotent").html(html1)
			}
		});
		
		// 收藏商品
		$(".item-inform").on('click','.coollet',function(){
			console.log(312312);
			console.log(pageData,"pageData");
			let enshrine_type = pageData.enshrine_type;
			if(enshrine_type==0){
				$.ajax({
					url:host+'/api/v2/member/enshrine',
					data:{
						goods_commonid:pageData.goods_commonid,
						
					},
					headers:{
						'content-Type':'application/x-www-form-urlencoded',
						token:token
					},
					type:'post',
					dataType:'json',
					success(res){
						if(res.status==0){
							prompt("收藏成功", 2000)
							$(".img1").css("display","block");
							$(".img2").css("display","none")
						}else{
							prompt(res.error, 2000)
						}
						
					}
				})
			}
		})
		// 轮播图切换
		$(".item-inform").on("click",".selectImg",function(e){
			console.log(e)
			pageData.goods_image = e.currentTarget.dataset.url;
			var index = e.currentTarget.dataset.index
			$(".top_img").attr("src",pageData.goods_image);
			pageData.goodsimagesList.forEach((v,i)=>{
				v.select = false
			})
			console.log($(".selectImg"),"div")
			$(".selectImg").removeClass("selectBorder");
			$(".selectImg").eq(index).addClass("selectBorder")
		})

	// 添加购物车
	$(".item-inform").on("click","#LikBasket",function(){
		if(!token){
			$(".login-pop").show()
            return false
        }
		console.log(spec1,"zh",spec2)
		let number = $("#text_box").val()
		console.log(number)
		if(number<=0){
			prompt('请选择数量',1000)
			return false
		}
		console.log(32131)
		var goods_id;
		// 判断规格
		if(pageData.spec_name==null&&pageData.spec_value==null){
			goods_id = pageData.SKUList[0].goods_id
		}else{
			if(pageData.spec_name){
				
				// if(!spec1||!spec2){
				// 	prompt("请选择规格",1000)
				// 	return false
				// }
				// let specs = new Object;
				// specs[spec1]=spec2
				var index = pageData.SKUList.findIndex((v,i)=>{
					console.log(JSON.stringify(v.goods_spec))
					return JSON.stringify(v.goods_spec)==JSON.stringify(specs)
				})
				if(index==-1){
					prompt("请选择规格",1000)
					return false
				}
				console.log(index,"index",JSON.stringify({spec1:spec2}))
				
				goods_id = pageData.SKUList[index].goods_id
			}else{
				if(specs){
					prompt("请选择规格",1000)
					return false
				}
				goods_id = pageData.SKUList[0].goods_id
			}
		}
		
		$.ajax({
			url:host+'/api/v2/member/cart',
			data:{
				goods_id:goods_id,
				quantity:number
			},
			headers:{
				token:token
			},
			dataType:'json',
			type:"post",
			success(res){
				console.log(res);
				if(res.status==0){
					prompt("添加成功",1000)
				}
			}
		})
	})
	
	// 立即购买
	$(".item-inform").on("click","#LikBuy",function(){
		if(!token){
			$(".login-pop").show()
            return false
        }
		let number = $("#text_box").val()
		var goods_id;
		if(number<=0){
			alert('请选择数量')
			return false
		}
		console.log(32131)
		var goods_id;
		// 判断规格
		if(pageData.spec_name==null&&pageData.spec_value==null){
			goods_id = pageData.SKUList[0].goods_id
		}else{
			if(pageData.spec_name){
				var index = pageData.SKUList.findIndex((v,i)=>{
					console.log(JSON.stringify(v.goods_spec))
					return JSON.stringify(v.goods_spec)==JSON.stringify(specs)
				})
				if(index==-1){
					prompt("请选择规格",1000)
					return false
				}
				goods_id = pageData.SKUList[index].goods_id
			}else{
				if(specs){
					alert("请选择规格")
					return false
				}
				goods_id = pageData.SKUList[0].goods_id
			}
		}
		let goods_num = $('#text_box').val()
		console.log(goods_num,"goods_num")
		let skuList = pageData.SKUList.filter(v => v.goods_id == goods_id);
		skuList[0].goods_num = goods_num;
		skuList = [{active1:true,data:skuList}]
		window.location.href = `../home/pay.html?orderInfo=${encodeURIComponent(JSON.stringify(skuList))}&buyType=NOW`;
	})

	

})


//弹出规格选择
$(document).ready(function() {
	var $ww = $(window).width();
	if ($ww <1025) {
		$('.theme-login').click(function() {
			$(document.body).css("position", "fixed");
			$('.theme-popover-mask').show();
			$('.theme-popover').slideDown(200);

		})

		$('.theme-poptit .close,.btn-op .close').click(function() {
			$(document.body).css("position", "static");
			//					滚动条复位
			$('.theme-signin-left').scrollTop(0);

			$('.theme-popover-mask').hide();
			$('.theme-popover').slideUp(200);
		})

	}
})

//导航固定
// $(document).ready(function() {
// 	var $ww = $(window).width();
// 	var dv = $('ul.am-tabs-nav.am-nav.am-nav-tabs'),
// 		st;

// 	if ($ww < 623) {

// 				var tp =$ww+500;
// 				$(window).scroll(function() {
// 					st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
// 					if (st >= tp) {
// 						if (dv.css('position') != 'fixed') dv.css({
// 							'position': 'fixed',
// 							top: 53,
// 							'z-index': 1000009
// 						});

// 					} else if (dv.css('position') != 'static') dv.css({
// 						'position': 'static'
// 					});
// 				});
// 				//滚动条复位（需要减去固定导航的高度）

// 				$('.introduceMain ul li').click(function() {
// 					sts = tp;
// 					$(document).scrollTop(sts);
// 				});
//        } else {

// 		dv.attr('otop', dv.offset().top); //存储原来的距离顶部的距离
// 		var tp = parseInt(dv.attr('otop'))+36;
// 		$(window).scroll(function() {
// 			st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
// 			if (st >= tp) {
             
// 					if (dv.css('position') != 'fixed') dv.css({
// 						'position': 'fixed',
// 						top: 0,
// 						'z-index': 998
// 					});

// 				//滚动条复位	
// 				$('.introduceMain ul li').click(function() {
// 					sts = tp-35;
// 					$(document).scrollTop(sts);
// 				});

// 			} else if (dv.css('position') != 'static') dv.css({
// 				'position': 'static'
// 			});
// 		});



// 	}
// });



$(document).ready(function() {
	//优惠券
	$(".hot span").click(function() {
		$(".shopPromotion.gold .coupon").toggle();
	})




	//获得文本框对象
	var t = $("#text_box");
	//初始化数量为1,并失效减
	$('#min').attr('disabled', true);
	//数量增加操作
	$("#add").click(function() {
			t.val(parseInt(t.val()) + 1)
			if (parseInt(t.val()) != 1) {
				$('#min').attr('disabled', false);
			}

		})
		//数量减少操作
	$("#min").click(function() {
		t.val(parseInt(t.val()) - 1);
		if (parseInt(t.val()) == 1) {
			$('#min').attr('disabled', true);
		}

	})

})