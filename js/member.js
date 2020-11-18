$(function(){
    let buyType = GetQueryString("urlData");
    buyType = JSON.parse(decodeURIComponent(buyType))
    console.log(buyType,"buyType")
    $(".vip-title").text(buyType[0].title);
    $(".vip-text").text(buyType[0].desc);
    $(".content").html(buyType[0].explain);
    $(".vip-Btn").click(function(){
        window.location.href="../home/analysis.html"
    })
    $(".success_btn").click(function(){
        window.location.href="../home/cooperation.html"
    })
})