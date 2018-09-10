"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 反黑联盟 - findPassword
 * @联系 
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var pw = {
	init:function(){
		this.tab();
		this.email();
		this.phone();
	},
	tab:function(){
		var _p = $('#tab').find('p');
		var list = $('#listem').find('.list');
		_p.click(function(){
			var _this = $(this);
			var _idx = _this.index();

			_this.addClass('active').siblings('p').removeClass('active');
			list.eq(_idx).show().siblings('.list').hide();
		});
	},
	email:function(){
		var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var btn = $('#btnSendEmail');
		var ipt = $('#iptEmail');
		var tips = $('#emailTips');
		var email;
		btn.click(function(){
			if($.trim(ipt.val()).match(regEmail)){
				email = $.trim(ipt.val());
		        sendPwdToEmail(email);
		    }else{
		        tips.addClass('red').text("邮箱格式不正确！"); 
		        ipt.focus();
		        return false; 
		    }
		});
		function sendPwdToEmail(email){
			console.log(email);
			//$.ajax();
			tips.removeClass('red').text('正在发送...'); //放在beforeSend里
			tips.addClass('green').text('发送成功！请去邮箱查看新密码！'); //放在beforeSend里
		};
	},
	phone:function(){
		var regMobile = /^((13[0-9]{1}|15[0-35-9]{1}|170|18[0|5-9]{1})+\d{8})$/;
		var btn = $('#btnSendPhone');
		var btnTime = $('#btnTime');
		var ipt = $('#iptPhone');
		var tips = $('#phoneTips');
		var phoneNum;
		btn.click(function(){
			if($.trim(ipt.val()).match(regMobile)){
				phoneNum = $.trim(ipt.val());
		        sendPwdToPhone(phoneNum);
		    }else{
		        tips.addClass('red').text("手机号不正确！"); 
		        ipt.focus();
		        return false; 
		    }
		});
		function sendPwdToPhone(phoneNum){
			console.log(phoneNum);
			//$.ajax();
			tips.removeClass('red').text('正在发送...'); //放在beforeSend里
			
			//以下放在success里
			tips.addClass('green').text('新密码已发送！'); 
			btn.hide();
			btnTime.show();
			countDown60s(10);//记得改回60
		};
		function countDown60s(s){
			var s = s;
			var timer = null;

			settime(s);
			
			function settime(s) {
			    if (s == 0) { 
			    	btn.show();
			    	btnTime.hide();
			    	tips.removeClass('green').text('你可以重新发送密码！');
			        s = s;
			        return;
			    } else {
			        btn.hide();
			        btnTime.show().text('重新发送（'+dbl(s)+'）');
			        s--; 
			    }
			    clearTimeout(timer);
				timer = setTimeout(function(){ 
				    settime(s);
				},1000);
			}
		};
		function dbl(n){
			return n<10?'0'+n:''+n;
		};
	}
};

pw.init();
