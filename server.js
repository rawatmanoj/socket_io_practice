const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder

app.use(express.static(path.join(__dirname,'public')));

// Run on connection

io.on('connection',socket =>{
    console.log("new user connected");

    socket.emit('message', 'welcome to disscord');

    //Broadcast when a user conncets

    socket.broadcast.emit('message','A user has joined the chat');

    // Runs when client disconnects

    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    });

       //Liste for chat msg
    socket.on('chatMessage',msg => {
        io.emit('message',msg);
    })

 

   

});



const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`server running ${PORT}`);
});