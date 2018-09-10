"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 反黑联盟 - 黑中介
 * @联系 heizhongjie.vip
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var black = {
	rdm:function(n,m){
		return parseInt(Math.random()*(m-n))+n;
	},
	dbl:function(n){
		return n<10?'0'+n:''+n;
	},
	ua:function(){
		var ie = navigator.userAgent.indexOf('MSIE');
		var body = $('body');
		if(ie > 0){
			body.append('<p class="ua">本站可能对你的浏览器不太适应！推荐你用<a href="http://chrome.360.cn/" target="_blank">360极速</a>或<a href="http://www.google.cn/chrome/browser/desktop/index.html" target="_blank">chrome</a><i class="icon iconfont icon-guanbi2 btn_ua" id="btnUaClose"></i></p>');
		}
		body.delegate('#btnUaClose','click',function(){
			$(this).parent('.ua').remove();
		});
	},
	ltH:function(){
		var lt = document.getElementById('lt');
		lt.style.height = window.innerHeight + 'px';
	},
	goTop:function(){
		var $obj = $('#goTop');
		$obj.click(function() {
			$('body,html').animate({scrollTop:0},500);  
            return false;
		});
	},
	alerts:function(txt,cls){
		var cls = cls?cls:cls='';
		var timer = null;
		var _html = '<p class="alerts '+cls+'" id="alerts">'+txt+'</p>';

		$('#alerts').remove();
		$('body').append(_html);
		var _as = $('#alerts');
		_as.fadeIn(100);
		clearTimeout(timer);
		timer = setTimeout(function(){
			_as.remove();
			clearTimeout(timer);
		},2000);
	},
	alert:function(txt){
		var tipHtml = '<div class="alertTip_bg" id="alertTip_bg">'+
				'<div class="alertTip" id="alertTip">'+
					'<h6>提示</h6>'+
					'<p>'+txt+'</p>'+
					'<button>确定</button>'+
				'</div>'+
			'</div>';
		var $body = $('#rt');
		black.alertDrag();
		$body.append(tipHtml).delegate('#alertTip > button', 'click', function() {
			$(this).parents('#alertTip_bg').remove();
			return;
		});
	},
	confirm:function(txt){
		var tipHtml = '<div class="alertTip_bg" id="alertTip_bg">'+
				'<div class="alertTip" id="alertTip">'+
					'<h6>提示</h6>'+
					'<p>'+txt+'</p>'+
					'<button class="cancle">取消</button><button class="sure">确定</button>'+
				'</div>'+
			'</div>';
		var $body = $('#rt');
		$body.append(tipHtml);
		black.alertDrag();
		$body.delegate('#alertTip > .cancle', 'click', function() {
			$(this).parents('#alertTip_bg').remove();
			return;
		});
	},
	alertDrag:function(){
		$('body').delegate('.alertTip h6','mousedown',function(e){
			var $box = $(this).parent('.alertTip');
			var o = $box.offset();
			var x = e.pageX - o.left;
			var y = e.pageY - o.top;
			//防止超出屏幕
			var iBoxWidth = $box.width();
			var iBoxHeight = $box.height();
			var iMarL = Math.abs(parseInt($box.css("marginLeft")));
			var iMarT = Math.abs(parseInt($box.css("marginTop")));
			var iWinWidth = $(window).width();
			var iWinHeight = $(window).height();
			var scroll_h = $(window).scrollTop();

			$(document).bind('mousemove',function(ev){
				$box.stop();
				var _x = ev.pageX - x;
				var _y = ev.pageY - y - scroll_h;
				if(_x<0){_x=0}
				if(_x>iWinWidth-iBoxWidth){_x=iWinWidth-iBoxWidth}
				if(_y<0){_y=0}
				if(_y>iWinHeight-iBoxHeight){_y=iWinHeight-iBoxHeight}

				$box.animate({left:_x+iMarL+'px',top:_y+iMarT+'px'},0);
				return false;
			});
			$(document).mouseup(function(){
				$(this).unbind('mousemove');
			});
		});
	},
	loaderHtml:'<div class="loader_bg" id="loaderBg"><div class="loader_wave"></div></div>',
	callOutLogin:function(){
		var lt = $('#lt');
		lt.delegate('#btnToLogin','click',function(){
			$('#logRegBg').remove();
			black.logReg();
		});
	},
	minCity:function(){
		var mC = $('#minCity,#minUcNav'), mCI = $('#minCityItems,#minUcNavItems');
		mC.click(function(event){
			mCI.toggle();
			event.stopPropagation();

			$('body').click(function(){
				mCI.hide();
			});
		});
	},
	logReg:function(){
		var _html = '<div class="login_bg" id="logRegBg">'+
				'<div class="login_cmn register" id="register">'+
					'<h5>加入反黑联盟</h5>'+
					'<p class="sub">揪出黑，还世界以清白</p>'+
					'<p class="tips" id="RegTips"></p>'+
					'<input type="text" name="nickName" id="nickName" placeholder="昵称"  />'+
					'<input type="text" name="account" id="account" placeholder="邮箱帐号"  />'+
					'<input type="text" name="password1" id="password1" placeholder="密码"  />'+
					'<input type="text" name="password2" id="password2" placeholder="确认密码" />'+
					'<input type="button" id="btnRegister" value="注 册" />'+
					'<p class="login_bot cf"><span id="btnGoLog">登录</span></p>'+
					'<i class="icon iconfont icon-guanbi" id="btnCloseRegister"></i>'+
				'</div>'+
				'<div class="login_cmn login" id="login">'+
					'<h5>登录反黑联盟</h5>'+
					'<p class="sub">揪出黑，还世界以清白</p>'+
					'<p class="tips" id="LogTips"></p>'+
					'<input type="text" name="logAccount" id="logAccount" placeholder="邮箱帐号"  />'+
					'<input type="text" name="logPassword" id="logPassword" placeholder="密码"  />'+
					'<input type="button" id="btnLogin" value="登 录" />'+
					'<p class="login_bot cf"><a href="../findPassword.html" target="_blank">忘记密码？</a><span id="btnGoReg">注册</span></p>'+
					'<i class="icon iconfont icon-guanbi" id="btnCloseLogin"></i>'+
				'</div>'+
			'</div>';
		//打开登录框
		var rt = $('#rt');
		rt.append(_html);
		
		var body = $('body'),
			logRegBg = $('#logRegBg'),
			login = $('#login'),
			register = $('#register'),
			logAccount = $('#logAccount'),
			logPassword = $('#logPassword'),
			nickName = $('#nickName'),
			account = $('#account'),
			password1 = $('#password1'),
			password2 = $('#password2');
		var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/;
		//登录
		body.delegate('#btnLogin','click',function(){
			if($.trim(logAccount.val()) == ''){
				errorTip('#LogTips','邮箱帐号不能为空!');
				return;
			}
			if($.trim(logAccount.val()).match(regEmail) == null){
				errorTip('#LogTips','邮箱帐号不正确!');
				return;
			}
			if($.trim(logPassword.val()) == ''){
				errorTip('#LogTips','密码不能为空!');
				return;
			}
			//$.ajax();
			//在beforeSend里
			login.append(black.loaderHtml);
			//在success里执行以下操作 如果不刷新页面，看怎么把状态更改为已登录的状态，因为涉及到昵称的显示和吐槽投票按钮的登录
			successTip('#LogTips','登录成功!');
			$('#loaderBg').remove();
			setTimeout(function(){
				logRegBg.hide();
			},1500);

			//errorTip('#RegTips','帐号或密码错误!');
			//successTip('#LogTips','登录成功!');
		});
		//注册
		body.delegate('#btnRegister','click',function(){
			if($.trim(nickName.val()) == ''){
				errorTip('#RegTips','昵称不能为空!');
				return;
			}
			if($.trim(account.val()) == ''){
				errorTip('#RegTips','邮箱帐号不能为空!');
				return;
			}
			if($.trim(account.val()).match(regEmail) == null){
				errorTip('#RegTips','邮箱帐号不正确!');
				return;
			}
			if($.trim(password1.val()) == ''){
				errorTip('#RegTips','密码不能为空!');
				return;
			}
			if($.trim(password1.val()) != $.trim(password2.val())){
				errorTip('#RegTips','两次密码输入不一致!');
				return;
			}
			//$.ajax();
			//在beforeSend里
			register.append(black.loaderHtml);
			//在success里执行以下操作
			successTip('#RegTips','注册成功!请登录！');
			$('#loaderBg').remove();
			setTimeout(function(){
				logShow();
			},3000);
		});
		body.delegate('#btnCloseLogin,#btnCloseRegister','click',function(){
			logRegBg.remove();
		});
		body.delegate('#btnGoReg','click',function(){
			login.animate({marginTop:'-250px', opacity:0}, 200, regShow);
		});
		body.delegate('#btnGoLog','click',function(){
			register.animate({marginTop:'-250px', opacity:0}, 200, logShow);
		});
		function regShow(){
			login.hide();
			$('#LogTips').empty().slideUp(0);
			register.show().animate({marginTop:'-200px', opacity:1}, 300);
		};
		function logShow(){
			register.hide();
			$('#RegTips').empty().slideUp(0);
			login.show().animate({marginTop:'-200px', opacity:1}, 300);
		};
		function errorTip(obj,txt){
			$(obj).empty().removeClass('success').addClass('error').append('<i class="icon iconfont icon-tishifill"></i> '+txt).slideDown(300);
		};
		function successTip(obj,txt){
			$(obj).empty().removeClass('error').addClass('success').append('<i class="icon iconfont icon-yuanxingxuanzhongfill"></i> '+txt).slideDown(300);
		};
	}
};

//公共部分执行
black.ua(); //检测低版本浏览器并提示
black.ltH(); //左侧高度适应窗口高度
black.minCity(); //移动端城市导航,移动端个人中心导航
black.goTop(); //返回顶部
black.callOutLogin(); //呼出注册登录框
//black.logReg(); //注册登录

