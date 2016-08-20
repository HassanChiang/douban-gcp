/*
	Author: Hassan
	Email : hassan.chiang@gmail.com
*/

var urls = [];
var commetnValues = [];
var randomTimes = 200;
var commentEndUrl = '/?start=10000000#last';

function startShuaShua(url){
	var targetUrl = url + commentEndUrl;
	if(window.location.href == targetUrl){//already located target url
		var timeout = Math.ceil(Math.random()*randomTimes)*1000;
		var countdown = timeout/1000;
		console.log(countdown + "秒后刷新，稍等...");
		setInterval(function (){
			console.log((countdown--) + "秒后刷新，稍等...");
		},1000);
		var len = commetnValues.length + 2;
		setTimeout(function (){	
			var val = "好吧，随便看看"+timeout/1000; //default value
			for(var i=len; i > 2; i--){
				if(new Date().getTime()%i == 0){
					val = commetnValues[i-2] + timeout/1000; //random value
					break;
				}
			}
			$("#last").val(val);
			$("[type='submit']").trigger('click');
		}, timeout);
	} else if(window.location.href.indexOf(url) >= 0){ //check if url is valid
		window.location.href = targetUrl;// go to target url
	}
	if($("body").text().indexOf("服务器开小差了") >= 0){
		setTimeout(function (){
			window.location.href = targetUrl;// go to target url
		},5000);
	}
}

$(document).ready(function () {
	$.getJSON("https://raw.githubusercontent.com/HassanChiang/AD-BLOCKER/master/api/douban-group-urls.json?release=" + new Date().getTime(), function (result){
		urls = result.urls;
		commentEndUrl = result.commentEndUrl
		commetnValues = result.comments;
		randomTimes = result.randomTimes;
		if(urls.length > 0 && commetnValues.length > 0){
			for(var i=0; i < urls.length; i++){
				var url = urls[i];
				if(url && url.indexOf("https://www.douban.com/group")>=0){//check douban url
					startShuaShua(url);
				}
			}
		}
	});
});
