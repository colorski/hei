"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 反黑联盟 - 黑中介 - admin
 * @联系 
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var admin = {
	body:$('body'),
	list:{
		listem:$('#listem'),
		init:function(){
			this.delete();
			this.edit();
		},
		delete:function(){
			var aim,id,name;
			this.listem.delegate('.del','click',function(){
				var _this = $(this);
				aim = _this.parents('li');
				id = _this.parent('p.fr').data('id');
				name = _this.parent('p.fr').data('name');
				console.log(name);
				black.confirm('确定要删除<strong>'+name+'</strong>？');
				$('#alertTip_bg').addClass('del_bg');
			});
	 		admin.body.delegate('.del_bg .sure','click',function(){

				console.log("id:"+id+'; name:'+name);
				//$.ajax();  
				//success之后
				$(this).parents('#alertTip_bg').remove();
				aim.slideUp('fast');
	 		});
		},
		edit:function(){
			var aim,id,name;
			this.listem.delegate('.edit','click',function(){
				var _this = $(this);
				aim = _this.parents('li');
				id = _this.parent('p.fr').data('id');
				name = _this.parent('p.fr').siblings('p.fl').text();
				
				black.confirm();
				$('#alertTip_bg').addClass('edit_bg').find('h6').text('编辑中介名');
				$('#alertTip').find('p').replaceWith('<input type="text" value="'+name+'" id="iptName" style="width:240px;padding:8px;margin:10px 20px;" />');
			});
	 		admin.body.delegate('.edit_bg .sure','click',function(){
	 			var newName = $('#iptName').val();
				console.log("id:"+id+'; newName:'+newName);
				//$.ajax();
				//success之后
				$(this).parents('#alertTip_bg').remove();
				aim.find('p.fl').text(newName);
	 		});
		}
	},
	report:{
		listem:$('#reportListem'),
		init:function(){
			this.ignore();
			this.close();
		},
		ignore:function(){
			this.listem.delegate('.btn_ignore','click',function(){
				var _this = $(this);
				var id = _this.data('id');
				console.log(id);
				//$.ajax(); 成功之后
				_this.parents('li').slideUp('fast');
				return;
			});
		},
		close:function(){
			this.listem.delegate('.btn_close','click',function(){
				var _this = $(this);
				var id = _this.data('id');
				console.log(id);
				//$.ajax(); 成功之后
				_this.parents('li').slideUp('fast');
				return;
			});
		}
	},
	user:{
		listem:$('#userListem'),
		init:function(){
			this.iFeng();
			this.iKai();
		},
		iFeng:function(){
			var rt = $('#rt');
	 		var icon = '<i class="icon iconfont icon-yuanxingxuanzhong"></i>';
	 		var id,typeId;
			this.listem.delegate('.f','click',function(){
				var _this = $(this);
				id = _this.parent('.do').data('id');
				console.log(id);

	 			var fHtml='<div class="alertTip_bg report_bg" id="report_bg">'+
					'<div class="alertTip" id="reportTip">'+
						'<h6>封号原因</h6>'+
						'<p class="list" data-id="1">发布违法内容</p>'+
						'<p class="list" data-id="2">发布政治敏感信息</p>'+
						'<p class="list" data-id="3">发布垃圾广告信息</p>'+
						'<p class="list" data-id="4">发布的内容不适合本站</p>'+
						'<button class="cancle">取消</button><button class="sure">确定</button>'+
					'</div>'+
				'</div>';
				rt.append(fHtml);
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
		 				black.alerts('请选择原因！','warning');
		 				return false;
		 			}else{
		 				fData(id,typeId);
		 			}
		 		});
		 		function fData(id,typeId){
		 			console.log('id:'+id+' typeId:'+typeId);
		 			//提交数据的ajax
		 			//$.ajax();   在成功后隐藏弹出框 - $('#report_bg').remove();
		 		};
			});
		},
		iKai:function(){
			var id,account,aim;
			this.listem.delegate('.k','click',function(){
				var _this = $(this);
				aim = _this;
				id = _this.parent('.do').data('id');
				account = _this.parent('.do').data('ac');
				black.confirm('确定要解封<strong>'+account+'</strong>？');
				$('#alertTip_bg').addClass('kai_bg');
			});
			admin.body.delegate('.kai_bg .sure','click',function(){
				console.log(id);
				//提交数据的ajax
				//$.ajax();   在成功后隐藏弹出框 - 
				$(this).parents('.kai_bg').remove();
				aim.removeClass('k').addClass('f').text('封');
			});

		}
	}
};


