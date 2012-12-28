// JavaScript Document

var index=1;
var projName="";
var clickCount=1;
var keyword;

$(document).ready(function(e){ 
	$("#loginBt").click(function(){login();})
	//if(T.loginStatus()){$("#loginBt").addClass("okbg");}/* */
	$("#selectBt").toggle(	
	function(){$("#selectTable").show("fast","",function(){$("#selectBt").addClass("okbg")})},
	function(){$("#selectTable").hide("fast","",function(){$("#selectBt").removeClass("okbg")})}
	);
  	$("#ftBut").toggle(	
	function(){$("#targetDetail").show("fast","",function(){$("#ftBut").addClass("okbg")})},
	function(){$("#targetDetail").hide("fast","",function(){$("#ftBut").removeClass("okbg")})}
	);
  	$("#chsAct").toggle(	
	function(){$("#chsActTr").show("fast","",function(){$("#chsAct").addClass("okbg")})},
	function(){$("#chsActTr").hide("fast","",function(){$("#chsAct").removeClass("okbg")})}
	);
	$("#start").toggle(	
	function(){$("#status").show("fast","",function(){$("#start").addClass("okbg")})},
	function(){$("#status").hide("fast","",function(){$("#start").removeClass("okbg")})}
	);
	$("#ntBut").toggle(	
	function(){$("#nearTarget").show("fast","",function(){$("#ntBut").addClass("okbg")})},
	function(){$("#nearTarget").hide("fast","",function(){$("#ntBut").removeClass("okbg")})}
	);
	$("#atBut").toggle(	
	function(){$("#attackMode").show("fast","",function(){$("#atBut").addClass("okbg")})},
	function(){$("#attackMode").hide("fast","",function(){$("#atBut").removeClass("okbg")})}
	);	
	$("#saBut").toggle(	
	function(){$("#status").show("fast","",function(){$("#saBut").addClass("okbg")})},
	function(){$("#status").hide("fast","",function(){$("#saBut").removeClass("okbg")})}
	);
	$("#addProject").toggle(	
	function(){$("#projectTable").show("fast","",function(){$("#addProject").addClass("okbg");})},
	function(){$("#projectTable").hide("fast","",function(){$("#addProject").removeClass("okbg")})}
	);
	readProject();
	$(".delItem").click(function(){delCustom();});
	$("#addProject>tbody>tr>td:not('.but')").click(function(){changeProject();});
	$("#createPjBut").click(function(){createProject();});
	//$("td.deltbut").click(function(){alert("aa");delProject();});
	$("#clickToMore").click(function(){clickToMore();$("#clickToMore").addClass("okbg");});
	
	$("#ntstartButThis").click(function(){oneThisComment();$("#ntstartButThis").addClass("okbg");});
	$("#ntstartButThat").click(function(){oneThatComment();$("#ntstartButThat").addClass("okbg");});
	$("#atBut").click(function(){postRandomWb();$("#atBut").addClass("okbg");});
	//ntstartBut atBut
	
	$("#searchBt").click(function(){
		 keyword=$("#addText").val();
		if(projName=="")
		{alert("请选择或新建一个项目！");return;}
		else if(keyword=="请输入关键词")
		{alert("请输入关键词");return;}
		searchKeyword(1,keyword);
	$("#searchBt").addClass("okbg");
	});
	

});
function clickToMore()
{
	if(projName=="")
		{alert("请选择或新建一个项目！");return;}
		else if(keyword=="请输入关键词")
		{alert("请输入关键词");return;}
	clickCount=clickCount+1;
	searchKeyword(clickCount,keyword);
		
}
  
function login()
  {
	  T.init({
    appkey:801229323 
	//801124054
	
	
 });
    
	 T.login(function (loginStatus) {
        $("#loginBt").addClass("okbg");
		$("#loginBt").html("已登录");
    },function (loginError) {
         $("#loginBt").addClass("errbg");
		 $("#loginBt").html("登录失败");
    });

	}
	

function createProject()
{
	var npn=$("#newpjName").val();
	if(localStorage.project)
	{
		var projArray=(localStorage.project).split("#/#");
		for (x in projArray)
		{
			if( projArray[x]==npn)
			{$("#newpjName").attr("value","该项目名已存在，请输入一个新的项目名");
				$("#newpjName").focus();
				$("#newpjName").select($(this).val());
				return;
			}
		}
		projName=npn;
		localStorage.setItem("project",localStorage.project+"#/#"+npn);
		saveProject(npn);	
	}
	else{
		localStorage.setItem("project",npn);
		projName=npn;
		saveProject(npn);
		
		}
}

function saveProject(npn)
{
	var time=getTimeNow();
	$("#projectTable>tbody>tr").removeClass("green");
	$("#projectTable>tbody").append(" <tr class='green'><td >*</td><td class='itemName' >"+npn+"</td><td >"+time+"</td> <td >0%</td><td ></td> <td  class='continuebut' onclick='changeProject();'>选中</td> <td  data='"+npn+"' class='deltbut' onClick='delProject();' >删除</td></tr>");
	 localStorage.setItem("proj_"+npn,time+"#/#0%"+"#/#无");
	 /*var projects=localStorage.project;
	 if(projects==""){localStorage.setItem("project",npn)}
	 else{
		 localStorage.setItem("project",projects+"#/#"+npn);}
		 
		 */
		$("#tdTbody").html("");
		
}
function delProject()
{

	//try{
	//删除项目下的所有顾客
	var object=event.srcElement;
	if(object.parentElement.className=="green"){ projName=""}
	var temp=object.getAttribute("data");
	//alert(temp);
	var len=localStorage.length;
	for(x=0;x<=len;x++)
	{
		var tempKey=localStorage.key(x);
		var tpArray;
		try{tpArray=tempKey.split("#/#");}catch(splitErr){tpArray=new Array;};
		if((tpArray[0])==temp)
		{
			localStorage.removeItem(tempKey);
			x=x-1;
		}	
	}
	//删除项目总表中的项目名
	var tempArray;
	try{tempArray=localStorage.project.split("#/#");}catch(lcsErr){tempArray=localStorage.project.split()};
	for(x in tempArray)
	{
		if(tempArray[x]==temp){
			tempArray.splice(x,1);
			localStorage.setItem("project",tempArray.join("#/#"));
			}
	}
	//删除单独的项目信息
	try{localStorage.removeItem("proj_"+temp)}catch(delProjErr){};
	//删除页面表格的项目
	var row=object.parentElement;
	var table=row.parentElement;
	table.deleteRow( row.rowIndex);
	$("#tdTbody").html("");
	//}catch(erra){alert("cuo")}
		/**/
}

function readProject()
{
	//alert("到这儿");
	if(localStorage.project)	
	{
		var projArray;
		try{projArray=localStorage.project.split("#/#")}catch(spliterr){projArray=localStorage.project.split()};
		for (x in projArray)
		{
			var name=projArray[x];
			//var proj_name="proj_"+name;
			//alert("pn:::"+proj_name);
			if(localStorage.getItem("proj_"+name))
			{
			//proj_name=localStorage.getItem("proj_"+name);
			var tempItem=localStorage.getItem("proj_"+name);
			//alert("haha")
			var array=tempItem.split("#/#");
			var time=array[0];
			var finish=array[1];
			var keywords=array[2];
			$("#projectTable>tbody").append(" <tr ><td >*</td><td class='itemName' >"+name+"</td><td >"+time+"</td> <td >"+finish+"</td><td >"+keywords+"</td> <td class='continuebut' onclick='changeProject();'>选择</td> <td  data='"+name+"' class='delbut' onClick='delProject();' >删除</td></tr>");
			}
			else{
					projArray.splice(x,1);
					localStorage.setItem("project",tempArray.join("#/#"));
				}
		}
		return;
	}
	else{localStorage.setItem("project","")}
	
	
}
function readCustom()
{
	if(projName==""){return;}
	for (var x=0;x<localStorage.length;x++)
	{
			var tempkey=localStorage.key(x);
			var tempArray;
			try{tempArray=tempkey.split("#/#")}catch(splitErr){tempArray=[""]}
			var tempItem=localStorage.getItem(tempkey);
			if (tempArray[0]==projName){
				var tempItem=localStorage.getItem(tempkey);
				var itemArray=tempItem.split("#/#");
				var name=itemArray[3];
				var vip=itemArray[4];
				var location=itemArray[5];
				var time=itemArray[6];
				var txt=itemArray[7];
				var mcount=itemArray[8];
				var uid=tempArray[1];
		 $("#tdTbody").append("<tr><td >"+(index++)+"</td><td class='nameTd'>"+name
			 +"</td><td>"+vip+"</td><td >"+location+"</td><td >"+time
		 	+"</td><td class='txtTd'>"+txt+"</td><td>"+mcount+"</td><td class='delItem' id='"+uid+"' onClick='delCustom();'></td></tr>") ;
				}
	}
	
	
}

function changeProject()
{
	var object=event.srcElement;
	var row=object.parentElement;
	projName=row.lastChild.getAttribute("data");
	var table=row.parentElement;
	var rows=table.children;
	$(rows).removeClass("green");
	$(row).addClass("green");
	$("#tdTbody").html("");
	readCustom();
}

function delCustom()
{
		var object=event.srcElement;
		var temp=object.getAttribute("id");
		var key=projName+"#/#"+temp;
		localStorage.removeItem(key);
		var row=object.parentElement;
		//alert(row.rowIndex-1);
		var temptbody=row.parentElement;
		temptbody.deleteRow(row.rowIndex-1);
}

function searchCustom(page,keyword)
{
	 T.api("/search/t",
	 {
		 "format":"json",
		 "keyword":keyword,
		 "pagesize":"30",
		  "page":page,
		   "contenttype":"0x01",
		    "sorttype":"0",
			 "msgtype":"1",
		 },
	 "json","get")
     .success(function (response){
		// alert("chenggong");
		 //$("#divv").html(JSON.stringify(response))
		 var infoJson;
		 var tempArray;
		 try{
		tempArray=response.data.info
		 for(x in tempArray)
		 {
			 var txt;
			 var name;
			 var location;
			 var time;
			 var vip;
			 var mcount;
			 var uid;
			 var weiboid;
			 infoJson=response.data.info[x];
			try{  txt=infoJson.text;}catch(err1){txt="无"};
			try{ name=infoJson.nick.substr(0,8);}catch(err2){name="无"};
			try{
				 var temp=infoJson.location;if(temp.length>2){location=temp.substr(2)}else{location=temp;} ;}
			catch(err3){location="无"};
			try{
				var temp=new Date(parseInt(infoJson.timestamp) * 1000).toLocaleString();
				var time= temp.substr(4,4)+temp.substr(8,2)+"-"+temp.substr(16,2); }
			catch(err4){time=""};
			try{if(infoJson.isvip==0){vip="否"}else if(infoJson.isvip==1){vip="是";}}catch(err5){vip="无"};
			try{mcount=infoJson.mcount;if(mcount==undifined||mcount==null){mcount="un"}}catch(err6){mcount="0"};
			try{uid=infoJson.openid;weiboid=infoJson.id}catch(err7){uid="";weibid="23492058173941"}
         $("#tdTbody").append("<tr><td >"+(index++)+"</td><td class='nameTd'>"+name
			 +"</td><td>"+vip+"</td><td >"+location+"</td><td >"+time
		 	+"</td><td class='txtTd'>"+txt+"</td><td>"+mcount+"</td><td class='delItem' id='"+uid+"' onClick='delCustom();'></td></tr>") ;
			//##################
			localStorage.setItem(projName+"#/#"+uid,weiboid+"#/#0#/#0#/#"+name+"#/#"+vip+"#/#"+location+"#/#"+time+"#/#"+txt+"#/#"+mcount);
		}}catch(jsonErr){alert("出错，请换个关键字<br />错误信息："+JSON.stringify(response));return;}
      })
     .error(function (code, message) {
          alert(message);
      });
		
}



function searchKeyword(page,keyword)
{
	var thispage=page;

	 // alert("proj_"+projName+"haha");
	  var projArray=localStorage.getItem("proj_"+projName).split("#/#")
	  if(projArray[2]=="无")
	  {
		  	 localStorage.setItem("proj_"+projName,projArray[0]+"#/#"+projArray[1]+"#/#"+keyword);
		}else{
			 localStorage.setItem("proj_"+projName,localStorage.getItem("proj_"+projName)+"#/#"+keyword);
		}
		searchCustom(thispage,keyword);
}


function getTimeNow()
{
	var time= new Date();
	var month=addZero(time.getMonth()+1);
	var day=addZero(time.getDate());
	var hour=addZero(time.getHours());
	
	return month+"/"+day+":"+	hour;	
}
function addZero(x)
{
	if(x<10){x="0"+x}else{x=x};
	return x;
}

/*
function originArray()
{
	if(projName=="")
		{alert("你还未选择任何项目！");return;}
	var str="{";
	for (var x=1;x<=localStorage.length;x++)
	{
			var tempkey=localStorage.key(x);
			var tempArray=tempkey.split("#/#")
			var tempItem=localStorage.getItem(tempkey);
			var itemArray=tempItem.split("#/#");
			//var customArray=[tempArray[0]];
			//var customIndex=1;
			if (tempArray[0]==projName){
				customArray.push(tempArray[1]+"#"+itemArray[0]);
			}
	}
	return customArray;
}
function originHtml()
{
		
}


*/

//----------------------------自动评论----------------------------------------------//


function oneThisComment()
{
	if(projName=="")
		{alert("你还未选择任何项目！");return;}
	$("#sendThisCommentDiv").html("");
	var str=$("#ntComtTxt").val();
	if(str=="评论内容"){alert("请输入内容！"); return;}else{str=$("#ntComtTxt").val()}
	
	for (var x=0;x<localStorage.length;x++)
	{
		var tempArray;
			var tempkey=localStorage.key(x);
			try{tempArray=tempkey.split("#/#")}catch(splitErr){tempArray=[""]}
			if(tempArray[0]==projName){
				var tempItem=localStorage.getItem(tempkey);
				var itemArray=tempItem.split("#/#");
				var randomStr=getRandomTxt();
				 var content=str+randomStr;
				 var thisId=itemArray[0];
				sendThisComment(thisId,content);
				//alert("1");
			}
	}
}

function oneThatComment()
{
	if(projName=="")
		{alert("你还未选择任何项目！");return;}
	$("#sendThisCommentDiv").html("");
	for (var x=0;x<localStorage.length;x++)
	{
		var tempArray;
		//alert(x);
			var tempkey=localStorage.key(x);
			try{tempArray=tempkey.split("#/#")}catch(splitErr){tempArray=["0"]}
			if(tempArray[0]==projName){
				//var tempItem=localStorage.getItem(tempkey);
				//var itemArray=tempItem.split("#/#");
				var str=getRandomTxt();
				 var content="haha!"+str;
				 var openid=tempArray[1];
				 //alert(openid)
				sendThatComment(openid,content);
				//alert("ok");
			}
	}
}



function sendThisComment(thisId,content)
{
	 T.api("/t/reply",
		 {"fomat":"json",
		 "content":content,
		 "clientip":"115.200.74.162",
		 "reid":thisId,
			 },"json","post")
	 .success(function (response){
		// alert("2");
		
		$("#sendThisCommentDiv").append(projName+"#"+thisId+"..............<font color='#093'>send OK!<br />" )
      })
     .error(function (code, message) {
          alert(message);
      });
		
}

function sendThatComment(openid,content)
{
	//alert("here");
	//var arr=new Array(3);
	this.openid=openid;
	var randomId;
	
	//alert("getCustomWb");
	 T.api("/statuses/user_timeline_ids",
		 {"fomat":"json",
		 "pageflag":0,
		 "reqnum":3,
		 "fopenid":openid,
		 "type":0x1,
		 "contenttype":1 
			 },"json","get")
	 .success(function (response){
		 //alert(JSON.stringify(response))
		 //var rArray= new Array;
		 var tempArr=response.data.info
		/* for (x in tempArr)
		 {
			
			 rArray.push(tempArr[x].id+"")
		 }// alert("getCustomWb2");*/
		// alert(rArray[rArray.length-1]);
		 var len=tempArr.length;
         randomId= tempArr[len-1].id;
		 sendThisComment(randomId,content);	
		//alert(arr+"there2");
		//$("#sendThisCommentDiv").append(projName+"#"+randomId+"..............<font color='#093'>send OK!<br />" )
      })
     .error(function (code, message) {
          alert(message);
      });

	//var randomId=arr[2];
	//alert(randomId+"there1");
	
}



function getRandomTxt()
{
	var str="....";
	var count=parseInt(Math.random()*4+4);
	for (var x=0;x<=count;x++)
	{
		str=str+".";
	}
	return str;
}

function postRandomWb()
{
	
		 T.api("/statuses/user_timeline",
		 {"fomat":"json",
		 "pageflag":0,
		 "reqnum":10,
		 "fopenid"://"B624064BA065E01CB73F835117FE96FA",
		 "CB8B84089476E4B2C35B6AD26F4117CE",
		 //"name":"那些温暖的句子",
		 "type":0x1,
		 "contenttype":0 
			 },"json","get")
	 .success(function (response){
		 $("#sendThisCommentDiv").html();  
		 $("#sendThisCommentDiv").html(JSON.stringify(response));
		 
      })
     .error(function (code, message) {
          alert(message);
      });
}