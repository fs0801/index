// JavaScript Document


var index=0;
function login(){
	WB2.login(function(){
		$("#login").css("background-color","#093");
		$("#login").html("已登录");
		})
}

function getInfo(page)
{
	
	WB2.anyWhere(function(W){
	W.parseCMD("/statuses/user_timeline.json",
	function(sResult,bStatus){
		if(bStatus==true){
			for(x in sResult.statuses){
				alert(x);
				index+=1;
				$("#table").append("<tr id='tr"+index+"'><td class='index'>"+(index)+"</td><td id='time'>"+sResult.statuses[x].created_at+"</td><td>"+sResult.statuses[x].text.substring(0,50)+"...[more]"+"</td><td id='b"+index+"'></td><td id='c"+index+"'></td><tr>")
				if(sResult.statuses[x].deleted=="1")
				{$("#b"+index).addClass("red")}
				else
				{$("#b"+index).addClass("green")}
				
				if(sResult.statuses[x].retweeted_status){
					if(sResult.statuses[x].retweeted_status.deleted=="1")
					{$("#c"+index).addClass("red")}
					else
					{$("#c"+index).addClass("green")}
				}else
				{$("#c"+index).addClass("pale")}
				
			}
		}
		else{alert("获取失败")}
		},
		{//source:"1846799922",
		uid:$("#uid").val(),
		count:200,
		page:page
		},
		{method: 'GET'}
	)		
	});
	
}

function showInfo()
{
	$("#table").append("<tr><th>序号</th><th>时间</th><th>微博</th><th>原创</th><th>转发</th></tr>");
	var allPage;
	WB2.anyWhere(function(W){
	W.parseCMD("/statuses/user_timeline.json",
	function(sResult,bStatus){
		if(bStatus==true)
		{
			 var x=parseInt(sResult.total_number);
			allPage=(Math.ceil(x/100));
			alert(x);
			for (var page=1;page<=allPage;page++)
			{	
				getInfo(page);
				$("#function").html("正在获取...<br />"+Math.ceil(100*page/allPage)+"%");
			}
			
		}
		else{$("#function").html("获取失败");
		alert(sResult)
		$("#function").css("background-color","#f00");
		
		
		}},
	{
		uid:$("#uid").val(),
		count:1	
	},{method:"GET"})
	})
	
}
