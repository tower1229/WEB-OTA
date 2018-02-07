/*
 * 
 */
define(function(require, exports, module) {
	var getUserInfo = function(){
		if(USERINFO){
			return JSON.parse(USERINFO);
		}
		console.warn('用户信息未就绪');
	};
	
	module.exports = {
		getUserInfo: getUserInfo
	};
});