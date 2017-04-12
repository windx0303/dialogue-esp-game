var score = 0;

//default sec: 20
var timeInSec =  gup("timeInSec") ? gup("timeInSec") : 20;

var sessionCounter = 0;

var targetTime;

var taskStarted = false;
var taskFinished = false;

var inputData = [
	  {
		    "conversation": [
		      "give me nonstop flights from , new york city to las vegas",
		      "sunday flights",
		      "sunday flights from new york city to las vegas"
		   
		    ],
		    "gs_label": {
		      "toloc.city_name": "las vegas",
		      "fromloc.city_name": "new york city"
		    },
		    "session_id": 0,
		    "data_set": "tutorial"
		  },
		  {
		    "conversation": [
		      "what flights go from . denver to san francisco",
		      "which are nonstop"
		    ],
		    "gs_label": {
		      "toloc.city_name": "san francisco",
		      "fromloc.city_name": "denver"
		    },
		    "session_id": 1,
		    "data_set": "ATIS Class D test set"
		  },
		  {
		    "conversation": [
		      "show me flights from los angeles to pittsburgh , on monday evening",
		      "anytime monday",
		      "monday around noon"
		    ],
		    "gs_label": {
		      "toloc.city_name": "pittsburgh",
		      "fromloc.city_name": "los angeles"
		    },
		    "session_id": 2,
		    "data_set": "ATIS Class D test set"
		  },
		  {
		    "conversation": [
		      "i would like an american airlines flight from cincinnati to burbank leaving this afternoon",
		      "what aircraft do they use"
		    ],
		    "gs_label": {
		      "toloc.city_name": "burbank",
		      "fromloc.city_name": "cincinnati"
		    },
		    "session_id": 3,
		    "data_set": "ATIS Class D test set"
		  },
		  {
		    "conversation": [
		      "i need a flight from montreal quebec to san diego california leaving this sunday",
		      "i need a flight from san diego california to indianapolis indiana leaving in the afternoon on tuesday",
		      "indianapolis indiana",
		      "i need a flight from san diego to indianapolis leaving in the afternoon on tuesday",
		      "i need a flight from indianapolis to toronto reaching toronto on thursday morning",
		      "which are the nonstop flights"
		    ],
		    "gs_label": {
		      "toloc.city_name": "toronto",
		      "fromloc.city_name": "indianapolis"
		    },
		    "session_id": 4,
		    "data_set": "ATIS Class D test set"
		  },
		  {
		    "conversation": [
		      "flights from new york to miami",
		      "first class fare"
		    ],
		    "gs_label": {
		      "toloc.city_name": "miami",
		      "fromloc.city_name": "new york"
		    },
		    "session_id": 5,
		    "data_set": "ATIS Class D test set"
		  }
		];

$(document).ready(function () {

	$(".pre-inst-task-time").text(timeInSec);
	$("#timeDisplay").text(getDisplayTime(parseInt(timeInSec)*1000));
	
	//load conv count
	$(".pre-inst-task-num").text(inputData.length);
	
	$("#wrap").hide();	
	reloadChatArea();
	
	$("#start-btn").on("click", function(){
		
		taskStarted = true;
		
		var currentDate = new Date();
		var curTime = currentDate.getTime();
		targetTime = curTime + 1000*timeInSec;
		
		alert("Task start!");
		
		$("#pre-inst").hide();
		
		$("#wrap").show();
		$("#type").focus();
		
		$("#chatLines").animate({ scrollTop: $("#chatLines").prop("scrollHeight") }, 500);
		
	});
	
	$("#type").focus();
	
	$("#type").keypress(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			var submitDate = new Date();
			var submitTime = submitDate.getTime();
			submitChat($("#type").val().trim().toUpperCase(), (+timeInSec)*1000-(targetTime-submitTime));
		}
	});
	
	$("#notExistBtn").on("click", function(){
		var isComfirmed = confirm("Are you sure?");
		if(!isComfirmed){
			return false;
		}
		var submitDate = new Date();
		var submitTime = submitDate.getTime();
		submitChat("NO SUCH THING", (+timeInSec)*1000-(targetTime-submitTime));
	});
	
	//countdown
	setInterval(function(){
		if(taskStarted&&taskFinished==false){
			countdownTimer();
		}
	}, 300);
	
	
});

function countdownTimer(){
	
	var currentDate = new Date();
	var curTime = currentDate.getTime();
	var leftTime = targetTime - curTime;
	
	var displayTime = getDisplayTime(leftTime);
	
	$("#timeDisplay").text(displayTime);
	
	if(displayTime=="00:00"){
		
		extractAnswerToForm();
		sessionCounter++;
		
		if(sessionCounter<inputData.length){
			
			$("#type").val("");
			$("#answerList").empty();
			
			$("#notification").hide();
			blockPage(false);
			$("#type").focus();
			
			var currentDate = new Date();
			var curTime = currentDate.getTime();
			targetTime = curTime + 1000*timeInSec;
			
			alert("Next one!");
			reloadChatArea();
   		 	
			$("#type").focus();
			
		}else{
			
			taskFinished = true;
			
			//print summary. for deployment, this can be removed
			printResult();
			
		}

	}
	
}

function printResult(){
	
	$("#main").empty();
	
	$("#main").append("<div id='question'><div id='questionContainer' class='color-primary-4'>Result Summary</div></div>");
	
	var nowTable = $("<table style='margin: 10px auto 10px auto; font-size: 18px;'><thead style='font-weight: bold;'><tr><td>Conv. ID</td><td>Nth Answer for the Conv.</td><td>Answer</td><td>Matched</td><td style='text-align: right;'>Response Time (sec)</td></tr></thead></table>");
	
	var tBody = $("<tbody></tbody>");
	
	for(var i=0;i<inputData.length;i++){
		
		var dataSent = false;
		
		var innerIndex = 0;
		while(true){
			var nowInput = $("#legion-submit-form").find("input[name="+i+"_input_"+innerIndex+"]");
			var nowTime = $("#legion-submit-form").find("input[name="+i+"_time_"+innerIndex+"]");
			if(nowInput.length==1&&nowTime.length==1){
				
				var nowInputValue = nowInput.attr("value");
				
				var isGsLabel = (nowInputValue.toUpperCase()==inputData[i]["gs_label"]["toloc.city_name"].toUpperCase());
				
				var nowRow = $("<tr></tr>");
				if(isGsLabel){
					$(nowRow).css("font-weight", "bold");
				}else{
					$(nowRow).addClass("color-primary-3");
				}
				
				var nowConvTd = $("<td></td>");
				$(nowConvTd).text(i);
				$(nowRow).append(nowConvTd);
				
				var nowConvInnerTd = $("<td></td>");
				$(nowConvInnerTd).text(innerIndex);
				$(nowRow).append(nowConvInnerTd);
				
				
				var nowInputTd = $("<td></td>");
				$(nowInputTd).text(nowInputValue);
				$(nowRow).append(nowInputTd);
				
				var nowMatchTd = $("<td></td>");
				if(isGsLabel){
					$(nowMatchTd).text("X")
				}
				$(nowRow).append(nowMatchTd);
				
				var nowTimeValue = nowTime.attr("value");
				var nowDisplayTime = nowTimeValue/(1000.0);
				var nowTimeTd = $("<td style='text-align: right;'></td>");
				$(nowTimeTd).text(nowDisplayTime);
				if(isGsLabel){
					$(nowTimeTd).css("color", "blue");
				}
				$(nowRow).append(nowTimeTd);
				
				$(tBody).append(nowRow);
				
				innerIndex++;
				dataSent = true;
				
			}else{
				break;
			}
		}
		if(dataSent==false){
			var nowRow = $("<tr></tr>");
			
			var nowConvTd = $("<td></td>");
			$(nowConvTd).text(i);
			$(nowRow).append(nowConvTd);
			
			var nowConvInnerTd = $("<td>-</td>");
			$(nowRow).append(nowConvInnerTd);
			
			var nowInputTd = $("<td>[No Answer Received]</td>");
			$(nowRow).append(nowInputTd);
			
			var nowMatchTd = $("<td></td>");
			//if(isGsLabel){
			//	$(nowMatchTd).text("X")
			//}
			$(nowRow).append(nowMatchTd);
			
			var nowTimeTd = $("<td style='text-align: right;'>-</td>");
			$(nowRow).append(nowTimeTd);
			
			$(nowRow).addClass("color-primary-3");
			$(tBody).append(nowRow);
		}
		
	}

	$(nowTable).append(tBody);
	
	$("#main").append(nowTable);
	
	//<button id="start-btn" class="bg-color-primary-0 color-primary-1">START</button>

	$("#main").css("text-align", "center");
	$("#main").css("padding", "20px 20px 20px 20px");
	
	$("#main").append("<a href='ESP-AMT.html?timeInSec=20' target='_self'>TRY AGAIN (Task Time = 20 sec)</a>");

}

function extractAnswerToForm(){
	
	var items = $("#answerList").children("li");

	for(var i=0;i<items.length;i++){
		
		var nowText = $(items[i]).text();
		var nowTime = $(items[i]).attr("time");
		
		var nowInput = $("<input type='hidden'>");
		$(nowInput).attr("name", sessionCounter+"_input_"+i);
		$(nowInput).attr("value", nowText);
		$("#legion-submit-form").append(nowInput);
		
		var nowInputTime = $("<input type='hidden'>");
		$(nowInputTime).attr("name", sessionCounter+"_time_"+i);
		$(nowInputTime).attr("value", nowTime);
		$("#legion-submit-form").append(nowInputTime);
		
	}
	
}

function getDisplayTime(leftTime){
	
	//4001 -> 5
	//4000 -> 4
	//3999 -> 4
	if(leftTime<=0){
		return "00:00";
	}
	
	var secCount = Math.ceil(leftTime/1000);
	
	var displayMin = Math.floor(secCount/60);
	var displaySec = secCount-displayMin*60;
		
	if(displayMin<10){
		displayMin = "0" + displayMin; 
	}
	if(displaySec<10){
		displaySec = "0" + displaySec; 
	}
	
	//console.log(displayMin+":"+displaySec);
	return displayMin+":"+displaySec;
	
}


function reloadChatArea(){
	
	$("#chatLines").empty();
	var nowQueries = inputData[sessionCounter]["conversation"];
	for(var i=0;i<nowQueries.length;i++){
		var nowText = nowQueries[i];
		$("#chatLines").append(getUserLiText(nowText));
		$("#chatLines").append(getSystemLi());
	}
	
	$("#chatLines").animate({ scrollTop: $("#chatLines").prop("scrollHeight") }, 500);
	
	
}

function getSystemLi(){
	
	return $("<li class='messages confirmed crowd'><span class='role'>system</span>: <span class='systemAction'>(Display the flight information)</span></li>");
	
}

function getUserLiText(nowSentText){
	
	//var nowSentText = sentArray[sentCount];
		
		var result = $("<li></li>");
		$(result).addClass("messages");
		$(result).addClass("confirmed");
		$(result).addClass("requester");
		
		var liText= "<span class='role'>user</span>: "+nowSentText;
		$(result).append(liText);
		
		return result;
		
	}


	
function submitForm(){
	
	if(gup("assignmentId")!="") {

        var jobkey = gup("assignmentId");
        if(gup("hitId")!="") {
	        jobkey += "|" + gup("hitId");
        }
        
        if(gup("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE") {
	        $('input').attr("DISABLED", "true");
	        _allowSubmit = false;
        } else {
	        _allowSubmit = true;
        }
        $('#legion-assignmentId').attr('value', gup("assignmentId"));
        $("#legion-submit-form").attr('method', 'POST');
    
        if(gup("turkSubmitTo")!="") {
            $("#legion-submit-form").attr('action', gup("turkSubmitTo") + '/mturk/externalSubmit');
        }

    }
	
	//alert("Thanks for your waiting. We're submitting your work!");
	
	$("#legion-submit-form").submit();
	return false;
	
	
}

function submitChat(inputText, time){
	
	//empty input box
	$("#type").val("");
	
	//check dup
	if(inputText.length==0||inputText==null){
		return false;
	}
	
	//check dup
	var items = $("#answerList").children("li");
	for(var i=0;i<items.length;i++){
		var nowText = $(items[i]).text();
		if(inputText===nowText){
			return false;
		}
	}
	
	var newLi = $("<li class='answer' time='"+time+"'>"+inputText+"</li>");
	//alert();
	$("#answerList").append(newLi);
	if($("#answerList").children("li").length>4){
		items = $("#answerList").children("li");
		for(var i=0;i<items.length-4;i++){
			//$(items[i]).css("display", "none");
			//---------------
		}
	}
	
	var gsLabel = (inputData[sessionCounter]["gs_label"]["toloc.city_name"]).toUpperCase();
	if(inputText===gsLabel){
		score += 1000;
		$("#scoreDisplay").text(score);
		showNotification("Matched On: "+gsLabel);
	}else if(inputText==="NO SUCH THING"){
		showNotification("Answer Not Found");
	}
	
	//alert(inputText);
	
	
}

function showNotification(noteText){
	
	$("#notification").text(noteText);
	
	$("#notification").show();
	blockPage(true);
	
	setTimeout(function() { 
		$("#notification").hide();
		blockPage(false);
		$("#type").focus();
	}, 1000);
	
}


function blockPage(setBlock){
	
	if(setBlock){
		$('input').attr("DISABLED", "true");
		$('textarea').attr("DISABLED", "true");
	    _allowSubmit = false;
	}else{
		$('input').prop('disabled', false);
		$('textarea').prop('disabled', false);
	    _allowSubmit = true;
	}
	
}