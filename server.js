const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userCount = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  userCount++;
  io.emit('userCount', userCount);

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    userCount--;
    io.emit('userCount', userCount);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
