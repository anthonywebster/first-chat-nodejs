
$(function(){
	var messages = [];
    var url = window.location.host.indexOf("first-chat-nodejs.herokuapp.com") == -1 ? 'localhost:5000':'first-chat-nodejs.herokuapp.com';
    var socket = io.connect();
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var template = Handlebars.compile($('#template_message').html());
    socket.on('message',function(data){
        if (data.message) {
            messages.push(data);
            var html = template(data);
            $("#content").append(html);
            $('#content').scrollTop($("#content")[0].scrollHeight);
    	} else {
    		console.log("There is a problem:",data);
    	}
    });

    $('#content').scrollTop($("#content")[0].scrollHeight);

    sendButton.onclick = function () {
    	var text = field.value;
    	socket.emit('send',{message:text,username:name.value});
    	field.value="";
    };

    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            $('#send').trigger('click');
        }
    });

})