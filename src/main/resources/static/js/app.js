var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#notice").html("");
}

function connect() {
	var from = $("#from").val();
	var to = $("#to").val();
	var socket = new SockJS('/endpoint-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/getMessage/single/'+ from + to, function (result) {
        	showContent(result.body);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    var toUser = document.getElementById("to").value;
    var fromUser = document.getElementById("from").value;
    var message = document.getElementById("content").value;
    stompClient.send("/sendMessage/single/chat", {}, JSON.stringify({
        'message': $("#content").val(),
        'toUser': $("#to").val(),
        'fromUser': $("#from").val()
    }));
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", "/chatMessage", false);
    xmlhttp.setRequestHeader('content-type','application/x-www-form-urlencoded');
    //正式发送请求
    xmlhttp.send('toUser='+toUser+'&fromUser='+fromUser+'&message='+message);
}

function showContent(body) {
    $("#notice").append("<tr><td>" + body + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

