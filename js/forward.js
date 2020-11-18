$(function(){
    let data = {
        page:1,
        limit:10,
        is_vip:0,
        type:'sort',
        gc_id_2:403
    }
    let total = ""
    // 获取直播礼包列表
    function getShopList(){
        $.ajax({
            url:host+'/api/v2/member/goodscommon',
            data:data,
            dataType:'json',
            type:'get',
            success(res){
                console.log(res)
                var pageData = res.data;
                var html = template("forwards",{pageData:pageData});
                total = res.pagination.page
                $(".forWardLists").html(html)
                var pagination = new Pagination({
                    wrap: $('.am-pagination'),
                    count: total,
                    prevText: '上一页',
                    nextText: '下一页',
                    callback: function(page) {
                        data.page = page 
                        console.log(page)
                        // getClassShop()
                    },
                    ajax:{
                        url:host+`/api/v2/member/goodscommon?is_vip=1&gc_id_2=403$&type=sort&limit=12&page=`,
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
    }
    getShopList()

})