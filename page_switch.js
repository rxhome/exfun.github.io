// 获取按钮元素
var scrollDown= document.getElementById("scrollDown");
var scrollUp= document.getElementById("scrollUp");
// 绑定点击事件
scrollDown.addEventListener("click", function() {
	scrollPage(1);
});
scrollUp.addEventListener("click", function() {
	scrollPage(0);
});

function scrollPage(e){
	// 获取窗口的滚动高度
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
	// 计算下一页的位置
	if(e){
		var nextPageTop = scrollTop + window.innerHeight * 0.83;
		console.log('Page Up');
	}else{
		var nextPageTop = scrollTop - window.innerHeight * 0.83;
		console.log('Page Down');
	}
	// 使用scrollTo()方法滚动到下一页的位置
	window.scrollTo({
		top: nextPageTop,
		behavior: "smooth"
	});
}

//当页面下滑到一定位置，显示返回顶部按钮
window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var navigation = document.getElementById('navigation');
    if (scrollTop > window.innerHeight * 0.84) {
        navigation.style.display = 'block';
    } else {
        navigation.style.display = 'none';
    }
});
