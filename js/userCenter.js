"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 反黑联盟 - userCenter
 * @联系 
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var uc = {
	body:$('body'),
	index:{
		init:function(){
			this.changeNickName();
		},
		changeNickName:function(){
			var btn = $('#btnChangeNickName');
			var aim,id,name;
			btn.click(function(){
				var _this = aim = $(this);
				id = _this.attr('data-id');
				name = _this.attr('data-name');
				
				black.confirm();
				$('#alertTip_bg').addClass('edit_bg').find('h6').text('修改昵称');
				$('#alertTip').find('p').replaceWith('<input type="text" value="'+name+'" id="iptName" style="width:240px;padding:8px;margin:10px 20px;" />');
			});
	 		uc.body.delegate('.edit_bg .sure','click',function(){
	 			var newName = $('#iptName').val();
				console.log("id:"+id+'; newName:'+newName);
				//$.ajax();
				//success之后
				$(this).parents('#alertTip_bg').remove();
				aim.next('span').text(newName);
				aim.attr('data-name',newName);
	 		});
		}
	},
	changePassword:{
		init:function(){
			this.change();
		},
		change:function(){
			var btn = $('#btnPwd'),
				newPwd = $('#newPwd'),
				newPwdCheck = $('#newPwdCheck');
			var newPassword;
			newPwd.on('keyup',function(){
				this.value = this.value.replace(/[^\w]/g,"");
			});
			btn.click(function(){
				if($.trim(newPwd.val()) == ''){
					black.alerts('新密码不能为空！','warning');
					return false;
				}
				if($.trim(newPwd.val()) != $.trim(newPwdCheck.val())){
					black.alerts('两次密码不一致！','warning');
					return false;
				}else{
					newPassword = $.trim(newPwdCheck.val());
				}
				//$.ajax();
				//success之后
				console.log(newPassword);
				black.alerts('密码修改成功！');
			});
		}
	},
	msg:{
		init:function(){
			this.deleteMsg();
		},
		deleteMsg:function(){
			var listem = $('#msgListem');
			var aim,id;
			listem.delegate('.btn_del','click',function(){
				var _this = aim = $(this);
				id = _this.data('id');
				black.confirm('确定要删除此消息吗？');
				$('#alertTip_bg').addClass('del_bg');
			});
	 		uc.body.delegate('.del_bg .sure','click',function(){
				console.log("id:"+id);
				//$.ajax();
				//success之后
				$(this).parents('#alertTip_bg').remove();
				aim.parents('li').slideUp(200);
				black.alerts('删除成功！');
	 		});
		}
	},
	myPublickArticles:{
		init:function(){
			this.del();
		},
		del:function(){
			var listem = $('#mArticleListem');
			var aim,id;
			listem.delegate('.del','click',function(){
				var _this = aim = $(this);
				id = _this.data('id');
				black.confirm('确定要删除此主题吗？');
				$('#alertTip_bg').addClass('del_bg');
			});
	 		uc.body.delegate('.del_bg .sure','click',function(){
				console.log("id:"+id);
				//$.ajax();
				//success之后
				$(this).parents('#alertTip_bg').remove();
				aim.parents('tr').remove();
				black.alerts('删除成功！');
	 		});
		}
	},
	myComments:{
		init:function(){
			this.del();
		},
		del:function(){
			var listem = $('#mCommentListem');
			var aim,id;
			listem.delegate('.del','click',function(){
				var _this = aim = $(this);
				id = _this.data('id');
				black.confirm('确定要删除此评论吗？');
				$('#alertTip_bg').addClass('del_bg');
			});
	 		uc.body.delegate('.del_bg .sure','click',function(){
				console.log("id:"+id);
				//$.ajax();
				//success之后
				$(this).parents('#alertTip_bg').remove();
				aim.parents('tr').remove();
				black.alerts('删除成功！');
	 		});
		}
	}
};


