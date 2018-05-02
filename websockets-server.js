var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var topic = "";
var port = 3001;
ws = new WebSocketServer({
  port: port
});
var messages = [];
console.log('websockets server started');
ws.on('connection', function(socket) {
  console.log('client connection established');
  if (topic) {
    socket.send("Topic: '" + topic + "'");
  }

  messages.forEach(function(msg) {
    socket.send(msg);
  });
  socket.on('message', function(data) {
    console.log("message recieved: " + data);
    var clientmsg = "";
    if (data.startsWith("/topic")) {
      topic = data.split("/topic")[1].trim();
      clientmsg = "*** Topic has changed to '" + topic + "'";
    } else {
      console.log('message received: ' + data);
      messages.push(messageToClients);
    }
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(clientmsg)
    });

    //  socket.send(data);
  });
});
