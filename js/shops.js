$(function(){
    let id = GetQueryString("id");
    $.ajax({
        url:host+'/api/v2/member/goodscommon',
        data:{
            store_id:id,
            page:1,
            limit:10
        },
        type:'get',
        dataType:'json',
        success(res){
             pageData = res.data;
            var html = template('shopids',{pageData:pageData});
            let total = res.pagination.page;
            $(".am-container12").html(html)
            var pagination = new Pagination({
                wrap: $('.am-pagination'),
                count: total,
                prevText: '上一页',
                nextText: '下一页',
                callback: function(page) {
                    // query.page = page 
                    console.log(page)
                    // getClassShop()
                },
                ajax:{
                    url:host+`/api/v2/member/goodscommon?store_id=${id}&limit=12&page=`,
                    // data:query,
                    success(res){
                        var pageData = res.data;
                        total = res.pagination.pages
                        var html = template("classShop",{pageData:pageData});
                        $(".shopList").html(html)
                    },
                    error(){

                    }
                }
              });
        }
    })

    // 获取店铺详情
	function storeDetail(){
		$.ajax({
			url:host+`/api/v2/member/store/${id}`,
			headers:{
				token:token
			},
			data:{},
			dataType:'json',
			type:'get',
			success(res){
				console.log(res)
				$(".titles").text(res.data.store_name)
				$('.store_img').attr("src", res.data.store_avatar);
				$('.collet').text(res.data.view);
                $(".sales").text(res.data.store_sales);
                if(res.data.favorite==1){
                    $(".shop-btns").css("display","none")
                }

			}
		})
	}
    storeDetail()
    // 店铺收藏
    $(".shop-btns").click(function(){
        console.log("收藏")
        $.ajax({
            url:host+'/api/v2/member/favorites',
            data:{
                fav_id:id
            },
            type:'post',
            headers:{
                token:token
            },
            dataType:"json",
            success(res){
                console.log(res,"res")
                if(res.status==0){
                    prompt("关注成功",1000);
                    $(".shop-btns").css("display","none")
                }else{
                    prompt(res.error,1000)
                }
                
            }
        })
    })
    
})