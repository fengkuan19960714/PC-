$(function(){
let queryList = {
    page:1,
    limit:10
}
// 数据列表
let shopList = [];
// 失效列表
let invalidList = [];
// 记录上次选择商品
let index,index1,index2;
// 全选
let selectAll=false;
// 结算总价
let price = ""
// 总数
let num = 0
    function getCartList(){
        $.ajax({
            url:host +'/api/v2/member/cart',
            data:queryList,
            headers:{
                token:token
            },
            dataType:"json",
            type:"get",
            success(res){
                if(res.error=="token过期，请重新登陆"){
                    $(".login-pop").show()
                }
                // 数据处理
                for (let items in res.data.store_cart_list) {
                    // if (res.data.store_cart_list[items][0]) {
                        console.log(12313)
                        shopList.push({
                            data: res.data.store_cart_list[items]
                        })
                }
                console.log(shopList,"shopList")
                shopList.forEach(element => {
                    element.active1 = false
                    element.goods_num = 0
                    element.goods_price = 0
                    element.data.forEach(v => {
                        v.active = false;
                    })
                })
                console.log(shopList)
                console.log(res)
                var pageData = shopList;
                console.log(pageData,"pageData")
                var html = template("cart-list",{pageData:pageData});
                console.log(html)
                $(".cartList").html(html)
                console.log("数据刷新")
                account()
            }
        })
    }
   
    getCartList();
    // 选择单个商品
    $(".cartList").on("click",".check1",function(e){
        console.log(e);
        index = e.currentTarget.dataset.index;
        index1 = e.currentTarget.dataset.indexs;
        console.log(shopList,"shopList")
        shopList[index].data[index1].active = !shopList[index].data[index1].active;
        console.log(shopList[index].data[index1].active,!shopList[index].data[index1].active,"shopList[index].data[index1].active")
        var status = shopList[index].data.findIndex((v,i)=>{
            return v.active==false
        })
        console.log(status)
        if(status==-1){
            $(this).closest(".item-list").find(".check").prop("checked", true);
            shopList[index].active1=true
        }else{
            
            $(this).closest(".item-list").find(".check").prop("checked", false);  
            shopList[index].active1=false
        }
        console.log(shopList,"321321")
        var allIndex = shopList.findIndex((v,i)=>{
            return v.active1==false
        })
        console.log(allIndex,shopList,"321321")
        console.log($(this).closest(".concent").find(".check2"))
        if(allIndex==-1){
            selectAll=true
            $(this).closest(".concent").find(".check2").prop("checked", true)
        }else{
            selectAll=false
            $(this).closest(".concent").find(".check2").prop("checked", false)
        }
        // 结算
        account()
        
    })
    // 选择商铺
    $(".cartList").on("click",".check",function(e){
        console.log("店铺",e)
        index = e.currentTarget.dataset.index;
        shopList[index].active1 = !shopList[index].active1;
        if(shopList[index].active1){
            shopList[index].data.forEach((v,i)=>{
                v.active = true
            })
            console.log($("input[name='items']"))
            console.log($(this).closest('.item-list'),$(this).closest('.item-list').find(".check1"))
            $(this).closest('.item-list').find(".check1").prop("checked", true);
        }else{
            shopList[index].data.forEach((v,i)=>{
                v.active = false
            })
            $(this).closest('.item-list').find(".check1").prop("checked", false);
        }
        var allIndex = shopList.findIndex((v,i)=>{
            return v.active1==false
        })
        console.log(allIndex,shopList,"321321")
        console.log($(this).closest(".concent").find(".check2"))
        if(allIndex==-1){
            selectAll=true
            $(this).closest(".concent").find(".check2").prop("checked", true)
        }else{
            selectAll=false
            $(this).closest(".concent").find(".check2").prop("checked", false)
        }
        // 结算
        account()
    })
    // 全选
    $('.check-all').click(function(){
        selectAll = !selectAll
        if(selectAll){
            console.log(312312)
            shopList.forEach(function(v,i){
                v.active1 = true
                v.data.forEach(function(ele,indedz){
                    ele.active = true
                })
            })
            $("input[name='select-all']").prop("checked", true);
            $("input[name='items']").prop("checked", true);
        }else{
            console.log(77777)
            shopList.forEach(function(v,i){
                v.active1 = false
                v.data.forEach(function(ele,indedz){
                    ele.active = false
                })
            })
            $("input[name='select-all']").prop("checked", false);
            $("input[name='items']").prop("checked", false);
        }
        // 结算
        account()
    })

    // 添加数量
    $(".cartList").on("click",".detailNumber",function(e){
        let number = $(this).siblings(".text_box").val();
        number++
        let cart_id = e.currentTarget.dataset.cartid;
        let store_id = e.currentTarget.dataset.storeid;
        let that = this
        $.ajax({
            url:host+`/api/v2/member/cart/${cart_id}`,
            data:{
                quantity:number,
                store_id:store_id
            },
            headers:{
                token:token
            },
            type:'put',
            dataType:'json',
            success(res){
                console.log(res);
                if(res.status==0){
                    // console.log($(that).siblings(".text_box"),"312312")
                    // $(that).siblings(".text_box").val(number)
                    prompt("修改成功", 2000)
                    shopList = []
                    getCartList();
                }else{
                    prompt(res.error, 2000)
                }
            }
        });
        
    })
    // 减少数量
    $(".cartList").on("click",".detailNumber1",function(e){
        let number = $(this).siblings(".text_box").val();
        console.log(number)
        if(number==1){
            return false
        }
        number=number-1
        console.log(number,"31231231")
        let cart_id = e.currentTarget.dataset.cartid;
        let store_id = e.currentTarget.dataset.storeid;
        // let that = this
        $.ajax({
            url:host+`/api/v2/member/cart/${cart_id}`,
            data:{
                quantity:number,
                store_id:store_id
            },
            headers:{
                token:token
            },
            type:'put',
            dataType:'json',
            success(res){
                console.log(res);
                if(res.status==0){
                    // $(that).siblings(".text_box").val(number)
                    prompt("修改成功", 2000);
                    shopList = []
                    getCartList();
                }else{
                    prompt(res.error, 2000)
                }
            }
        })
        
        // account()
    })
    // 获取cart_id数据
    function getIds() {
        let delArr = [],
            arr;
        shopList.forEach(element => {
            element.data.filter(v => {
                if (v.active) {
                    delArr.push(v)
                }
            })
        })
        
        arr = delArr.map(v => `${v.cart_id}|${v.goods_num}`);
        return arr
    }
    // 获取选中商品总数
    function getIds1() {
        let delArr = [];
        let num = 0
        shopList.forEach(element => {
            element.data.filter(v => {
                if (v.active) {
                    delArr.push(v)
                }
            })
        })
        console.log(delArr,312312)
        delArr.forEach((v,i)=>{
            num = Number(num)+Number(v.goods_num)
        })
        // arr = delArr.map(v => `${v.cart_id}|${v.goods_num}`);
        return num
    }
    // 结算购物车
   function account(){
       console.log(getIds(),getIds1(),"312321")
       if(getIds().length==0){
        return false
       }
       num = getIds1()
        $.ajax({
            url:host+'/api/v2/member/checkout',
            data:{
                ifcart:1,
                cart_id:getIds(),
                city_id:0
            },  
            headers:{
                token:token
            },
            dataType:"json",
            type:'post',
            success(res){
                console.log(res)
                if(res.status==0){
                    price=0
                    for(var i in res.data.store_final_order_total){
                        price = Number(price)+Number(res.data.store_final_order_total[i])
                    }
                    console.log(price)
                    $(".price").text(price)
                    $("#J_SelectedItemsCount").text(num)
                }else{
                    prompt(res.error,1000)
                    $(".price").text(0)
                    $("#J_SelectedItemsCount").text(0)
                }
                
            }
        })
    }
    // 删除购物车商品
    $(".cartList").on("click",".btn-fav",function(e){
        var cart_id = e.currentTarget.dataset.id;
        $.ajax({
            url:host+`/api/v2/member/cart/${cart_id}`,
            data:{},
            dataType:'json',
            headers:{
                token:token
            },
            type:'DELETE',
            success(res){
                console.log(res)
                if(res.status==0){
                    
                    prompt("删除成功", 1000)
                    window.location.reload()
                }else{
                    prompt(res.error, 1000)
                }
            }
        })
    })
    function getIds() {
        let delArr = [],
            arr;
        shopList.forEach(element => {
            element.data.filter(v => {
                if (v.active) {
                    delArr.push(v)
                }
            })
        })
        console.log(delArr,312312)
        arr = delArr.map(v => `${v.cart_id}|${v.goods_num}`);
        return arr
    }
    // 结算确认订单页
    $("#J_Go").click(function(){
        console.log(shopList)
        let selects;
        shopList.forEach((v, i) => {
            selects = v.data.filter(element => {
                return element.active != false
            })
            console.log(selects)
            v.data = selects
        })

        console.log(shopList)
        let selects1 = shopList.filter((v, i) => {
            return v.data.length != 0
        })
        let cart = getIds()
        window.location.href=`../home/pay.html?orderInfo=${encodeURIComponent(JSON.stringify(selects1))}&buyType=Cart&cart_id=${cart}`
    })
})