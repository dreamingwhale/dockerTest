const http = require('http');
const express = require('express');
const {Server}= require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 클라이언트 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

// Socket.IO 연결 처리
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log(`Message: ${msg}`);
        io.emit('chat message', msg); // 클라이언트로 메시지 전송
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(3000,()=>{
    console.log('listening on *:3000');
});
