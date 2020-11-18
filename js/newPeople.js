$(function(){
    let page = 1;
    let page1 = 1;
    let total = "";
    let data=""
    console.log(page,"page")
  
    //获取vip解析
    $.ajax({
        url:host+'/api/v2/member/goodscommon',
        data:{
            page:page,
            limit:12,
            newcomer:1
        },
        type:'get',
        dataType:'json',
        success(res){
            console.log(res,"res")
            var pageData = res.data;
            data = res.data
            var html= template('list',{pageData:pageData});
            console.log(html,"html")
            $(".lists").html(html)
            var pagination = new Pagination({
                wrap: $('.am-pagination'),
                count: total,
                prevText: '上一页',
                nextText: '下一页',
                callback: function(page) {
                    console.log(page)
                },
                // ajax:{
                //     url:host+`/api/v2/member/goodscommon?newcomer=1&limit=12&page=`,
                //     // data:query,
                //     success(res){
                //         var pageData = res.data;
                //         var html= template('list',{pageData:pageData});
                //         console.log(html,"html")
                //         $(".lists").html(html)
                //     },
                //     error(){

                //     }
                // }
              });
        }
    })
    // 跳转详情页面
    $(".lists").on("click",".coo-heaer",function(e){
        console.log(e.currentTarget.dataset.index)
        var id = e.currentTarget.dataset.index;
        var skulist = [data[id]];
        window.location.href = `../home/member.html?urlData=${encodeURIComponent(JSON.stringify(skulist))}`
    })
})