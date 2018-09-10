"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 反黑联盟 - 黑中介 - 详情页
 * @联系 heizhongjie.vip
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var detail = {
 	init:function(){
 		this.like(); //点赞
 		this.comment(); //评论
 		this.qrcode(); //分享
 		this.report(); //举报
 	},
 	like:function(){
 		var $zanBtn = $('#icoLike');
 		var $zanTxt = $('#icoLike').find('em');
 		$zanBtn.click(function() {
 			var s = $(this);
 			var id = s.attr('data-id');
 			var iTxtNum = parseInt(s.find('em').text());
 			if(!s.hasClass('zaned')){
 				var _plus = $('<b>+1</b>');
 				s.addClass('zaned').append(_plus).find('em').text(iTxtNum+1);
 				_plus.animate({top:'-24px',opacity:'0'},300,function(){
 					$zanBtn.find('b').remove();
 				});
 				
 				likeData(id,iTxtNum+1);
 			}else{
 				var _minus = $('<b>-1</b>');
 				s.removeClass('zaned').append(_minus).find('em').text(iTxtNum-1);
 				_minus.css({'top':'-24px'}).animate({top:'0px',opacity:'0'},300,function(){
 					$zanBtn.find('b').remove();
 				});
 				
 				likeData(id,iTxtNum-1);
 			}
 		});

 		function likeData(id,num){
 			console.log('id:'+id+' num:'+num);
 			//点赞的ajax方法
 			//$.ajax();
 		};
 	},
 	comment:function(){
 		var id;
 		//评论输入框的显示与隐藏
 		var btn = $('#icoComt');
 		var comt = $('#detailComt');
 		btn.click(function(){
 			comt.slideToggle(200);
 			$(this).toggleClass('active');
 			comt.find('#comtCon').focus();

 			id = $(this).attr('data-id');
 		});

 		//评论
 		var iptComt = $('#iptComt');
 		var comtCon = $('#comtCon');
 		iptComt.click(function(){
 			var con = comtCon.val();
 			if(con == ''){
 				black.alerts('无评论内容！','warning');
 				return false;
 			}else{
 				console.log('id:'+id+' con:'+con);
 				//ajax提交 - 注意需要先判断是否登录，游客不能评论，提示登录
 			}
 		});
 	},
 	qrcode:function(){
 		var icoShare = $('#icoShare');
 		var qrBox = $('#qrBox');
 		var url = window.location.href;
 		var b = true;
 		
 		icoShare.click(function(ev){
 			ev.stopPropagation();
 			if(b){
 				var qrcode = new QRCode("qrBox", {
 				    text: url,
 				    width: 100,
 				    height: 100
 				});
				b = false;
 			}
 			$(this).toggleClass('active');
			qrBox.toggle();
 		});
 		$('body').click(function(){
 			icoShare.removeClass('active');
 			qrBox.hide();
 		});
 	},
 	report:function(){
 		var rt = $('#rt');
 		var icon = '<i class="icon iconfont icon-yuanxingxuanzhong"></i>';
 		var id,typeId;
 		rt.delegate('.btn_report','click',function(){
 			var _this = $(this);
 			id = _this.attr('data-id');
 			console.log(id);

 			var reportHtml='<div class="alertTip_bg report_bg" id="report_bg">'+
				'<div class="alertTip" id="reportTip">'+
					'<h6>举报</h6>'+
					'<p class="list" data-id="1">垃圾广告</p>'+
					'<p class="list" data-id="2">色情、暴力、血腥等违反法律法规</p>'+
					'<p class="list" data-id="3">政治敏感</p>'+
					'<button class="cancle">取消</button><button class="sure">提交</button>'+
				'</div>'+
			'</div>';
			rt.append(reportHtml);
 		});
 		//可拖动
 		black.alertDrag();
 		//点cancle消失
 		rt.delegate('#reportTip > .cancle', 'click', function() {
 			typeId = undefined;
 			$(this).parents('#report_bg').remove();
 			return;
 		});
 		//选择项
 		rt.delegate('#reportTip > .list', 'click', function() {
 			var _this = $(this);
 			typeId = _this.attr('data-id');
 			$('#reportTip').find('.icon-yuanxingxuanzhong').remove();
 			_this.addClass('active').append(icon).siblings('.list').removeClass('active');
 		});
 		//点确定提交
 		rt.delegate('#reportTip > .sure', 'click', function() {
 			if(typeId === undefined){
 				black.alerts('请选择举报项！','warning');
 				return false;
 			}else{
 				reportData(id,typeId);
 			}
 		});
 		function reportData(id,typeId){
 			console.log('id:'+id+' typeId:'+typeId);
 			//提交数据的ajax
 			//$.ajax();   在成功后隐藏弹出框 - $('#report_bg').remove();
 		};
 	}
};

//详情页初始化
detail.init();



