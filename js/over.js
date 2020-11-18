$(function(){
    let page = 1;
    let page1 = 1;
    let total = "";
    let data=""
    console.log(page,"page")
    $(".success_btn").click(function(){
        window.location.href="../home/cooperation.html"
    })
    //获取vip解析
    $.ajax({
        url:host+'/api/v2/member/goodsexplain',
        data:{
            page:page,
            limit:12
        },
        type:'get',
        dataType:'json',
        success(res){
            console.log(res,"res")
            var pageData = res.data;
            data = res.data
            var html= template('list1',{pageData:pageData});
            console.log(html,"html")
            $(".lists1").html(html)
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
                    url:host+`/api/v2/member/goodsexplain?limit=15&page=`,
                    // data:query,
                    success(res){
                        var pageData = res.data;
                        var html= template('list1',{pageData:pageData});
                        console.log(html,"html")
                        $(".lists").html(html)
                    },
                    error(){

                    }
                }
              });
        }
    })
    // 跳转详情页面
    $(".lists1").on("click",".cooslist1",function(e){
        console.log(e.currentTarget.dataset.index)
        var id = e.currentTarget.dataset.index;
        var skulist = [data[id]];
        window.location.href = `../home/member.html?urlData=${encodeURIComponent(JSON.stringify(skulist))}`
    })
})