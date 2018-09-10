"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 反黑联盟 - 黑中介 - 投票
 * @联系 
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var vote = {
 	init:function(l){
 		this.getVoteData(l);
 		this.eventVote();
 	},
 	update:function(l){
 		this.getVoteData(l); //更新数据
 	},
 	voteListem:$('#voteListem'),
 	voteListemBase:$('#voteListemBase'),
 	body:$('body'),
 	ifVoted:null, //今天是否投过票，未投过是1，已投过是0
 	getVoteData:function(l){
 		$.ajax({
 			url:"../js/voteData.txt?t="+Math.random(),
 			type:"GET",
 			dataType:"json",
 			beforeSend: function(){
 				//alert(123);
 			},
 			success: function(data){
 				var totle = data.totle;
 				vote.ifVoted = data.ifVoted;
 				//排序
 				var d = data.infos.sort(function(a,b){
 					return b.num - a.num;
 				});
 				var arrHtml = new Array();
 				vote.voteListemBase.css({'height': l*totle-40+'px', 'line-height': (l*totle-40)/4+'px'});
 				
 				for(var i=0,len=d.length; i<len;i++){
 					arrHtml[i] = '<li><p data-id="'+d[i].id+'" data-num="'+d[i].num+'" style="background: rgb('+colorNum(d[i].num)+','+colorNum(d[i].num)+','+colorNum(d[i].num)+');">'+d[i].name+'</p>（<strong>'+d[i].num+'</strong>）</li>';
 				}
 				vote.voteListem.html(arrHtml.join(''));
 			},
 			error: function(){
 				console.log("error");
 			}
 		});
 		function colorNum(n){
 			return 255-n;
 		};
 	},
 	eventVote:function(){
 		var aimId,aimNum,aimStrong;
 		this.voteListem.delegate('li > p','click',function(){
 			if(vote.ifVoted){
	 			var _this = $(this);
	 			var n = _this.text();
	 			aimId = _this.data('id');
	 			aimNum = _this.data('num')+1;
	 			aimStrong = _this.next('strong');
				black.confirm('确定要投<b>'+n+'</b>？');
				$('#alertTip_bg').addClass('vote_ev_bg');
 			}else{
 				black.alerts('你已经投过，请明天再来！','warning');
 				return false;
 			}
 			
 		});
 		this.body.delegate('.vote_ev_bg .sure','click',function(){
 			aimStrong.addClass('ved').text(aimNum);
			vote.ifVoted = 0; //已投过票

			console.log("aimId:"+aimId+'; aimNum:'+aimNum);
			//$.ajax();  注意这里的aimNum是已经+1了的
			//success之后
			$(this).parents('#alertTip_bg').remove();
			//vote.update(34);
 		});

 	}
};

//投票页初始化
vote.init(34); //34为li的height+marginBottom


