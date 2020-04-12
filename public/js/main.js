const chatForm = document.getElementById('chat-form');

const socket = io();

// Message from server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
});

//Message submit

chatForm.addEventListener('submit',e=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;


     //Emit a message to server
    socket.emit('chatMessage',msg);

});

//output msg to DOM

fucn