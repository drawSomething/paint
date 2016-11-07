var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

io.on('connection',function(socket){
	console.log('connect');
	socket.emit('open');

	
    socket.on('message', function(message) {
        console.log('received: %s', message)
        // if (message == keyWord) {
        //     console.log('correct')
        //     io.clients.forEach((client) => {
        //         client.send('答对了！！')
        //     })
        // } else {
            // console.log('wrong')
            console.log(io.clients);
            // io.clients.forEach(function(client){
            //     client.send(message)
            // })
            io.emit('message',message);
        // }
    })
});