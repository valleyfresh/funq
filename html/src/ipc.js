var username=localStorage.getItem('user');
var password=localStorage.getItem('pass');
var wsTmp, wsJsonObj;

//ipc functions
function connect(username,password)
{if ("WebSocket" in window)
 {var l = window.location;ws = new WebSocket("ws://" + username + ":" +  password + "@" + (l.hostname ? l.hostname : "localhost") + ":" + (l.port ? l.port : "5030") + "/"); 
  ws.onopen=function(e){console.log("connected");$("#username").text(username)} 
  ws.onmessage=function(e){
	  wsTmp=e.data;
	  wsJsonObj=JSON.parse(wsTmp);
	  if (wsJsonObj.func == "sourceForSym"){parseForSym(wsJsonObj.output)}
	  else if (wsJsonObj.func == "selectFromTrade"){parseForQTable(wsJsonObj.output);}
	  else {console.log(wsTmp);$("[class='card-text']").text(wsTmp)}
  }
  ws.onerror=function(e){console.log(e.data);}
 }else alert("WebSockets not supported on your browser.");
}

function parseAnswers()
{
	var parsedAnswers, answers=$("[aria-selected='true']");
	for (i = 0;i<answers.length;i++){
		//create dictionary to store answers
	}
}

function parseTable(data){
	var colNames = [];
	var singleRow=data[0];
	for (var k in singleRow) colNames.push({"data":k});
	$("#dataTable").DataTable({
		"data": data,
		"columns": colNames
	});
}

//Events
//send query from box to q console
$("#sendBtn").click(function(){ws.send($("[aria-label='q-console']").val())});

//main
connect(username,password);
