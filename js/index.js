"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 反黑联盟 - 黑中介 - 首页
 * @联系 heizhongjie.vip
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var index = {
 	init:function(){
 		this.getListData('beijing');
	},
	body: $('body'),
	load: '<div class="loader_bg" id="loaderBg"><div class="loader_wave"></div></div>',
	getListData: function(city){
		var $Listem = $('#listem');
		$.ajax({
			type: "POST",
			url: "../api/index-list.json",
			dataType: "json",
			beforeSend:function(){
				$Listem.append(index.load);
			},
			success: function(res){
				$('#loaderBg').remove();
				if(res.status === 1){
					formatData(res.data, city);
				}else{
					black.alerts(res.message);
				}
			},
			error: function(){
				$('#loaderBg').remove();
				black.alerts('获取列表数据时发生错误!','danger');
			}
		});

		function formatData (data, city) {
			if(data.length){
				var  arrHtml = new Array();
				for(var i=0; i<data.length; i++){
					arrHtml[i] = '<div class="rt_list">'+
						'<a href="detail.html?city='+city+'">'+
								'<h3>'+data[i].title+'</h3>'+
								'<p>'+data[i].content+'</p>'+
								'<time>'+data[i].time+'</time>'+
							'</a>'+
					'</div>';
				}
			}else{
				arrHtml = ['<div class="rt_list"><p style="margin-top:10px; line-height:2">暂无内容！</p></div>'];
			}
			$Listem.html(arrHtml.join(''));
		}
	}
};

//首页初始化
index.init();



