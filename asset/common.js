/*
 * 
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	//平台检测
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	//获取用户信息
	var USERINFO;
	if(isAndroid){
		USERINFO = window.lhzs && window.lhzs.getUser();
	}
	//ios callback
	window.getIosUser = function(userinfo){
		if(userinfo){
			USERINFO = userinfo;
		}else{
			console.warn('getIosUser参数缺失');			
		}
	};
	var getUserInfo = function(){
		if(USERINFO){
			console.log(USERINFO);
			return JSON.parse(USERINFO);
		}
		console.warn('用户信息未就绪');
	};
	
	//跳转方法
	var jumpPage = function(linkType, linkId, infoId, killid) {
		console.log(linkType+','+linkId+','+infoId+','+killid);
		if (isAndroid) {
			window.lhzs && window.lhzs.jump(linkType, linkId, infoId, killid);
		} else {
			window.location.href = "ios://jump?" + linkType + (linkId!==void 0 ? ('?' + linkId) : '') + (infoId!==void 0 ? ('?' + infoId) : '') + (killid!==void 0 ? ('?' + killid) : '');
		}
	};
	$('#body,#view').on('click', '[data-type]', function(e) {
		var target = this;
		var linkType = target.dataset.type;
		var linkId = target.dataset.id;
		var infoId = target.dataset.info;
		var killid = target.dataset.killid;
		if (parseInt(linkType)) {
			jumpPage(linkType, linkId, infoId, killid);
		}
	});
	var jumpUrl = function(currentUrl, newUrl, newTitle){
		console.log(currentUrl, newUrl, newTitle);
		if (isAndroid) {
			window.lhzs && window.lhzs.redirect(currentUrl, newUrl, newTitle);
		} else {
			window.location.href = "ios://redirect?" + currentUrl + '$' + newUrl + (newTitle!==void 0 ? ('$' + newTitle) : '');
		}
	};
	$('#body,#view').on('click', '[data-href]', function(e) {
		var target = this;
		var href = target.dataset.href;
		var currentUrl = location.href;
		var nextTitle = target.dataset.title;
		if (href) {
			jumpUrl(currentUrl, href, nextTitle);
		}
	});


	module.exports = {
		getUserInfo:getUserInfo
	};
});