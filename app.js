var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.set('views',__dirname+'/tpl');
app.set('view engine',"jade");
app.engine('jade',require('jade').__express);

app.get("/",function(req,res){
	res.render("page");
});

app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});

app.use(express.static(__dirname+'/public'));

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection',function(socket){
	socket.emit('message',{message:'Welcome to the chat'});
	
});

console.log("Listening on port"+port);