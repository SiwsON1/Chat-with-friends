const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');


app.use(express.static(path.join(__dirname, 'client')));

const messages = [];
const users = [];

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
  });

  const server = app.listen(9001, () => {
    console.log('Server is running on Port:', 9001)
  });

  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => { console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
   });
   socket.on('join', (join) => { console.log('I\'ve add ' + socket.id);
   const socketId = socket.id;
     users.push({ join, socketId});
     socket.broadcast.emit('join', join);
     console.log(join);
   });
    socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left')
    console.log('I\'ve added a listener on message and disconnect events \n');
    const userIndex = users.findIndex(user => user.socketId === socket.id);
  if (userIndex !== -1) {
    const userLogin = users[userIndex].join;
    users.splice(userIndex, 1);
    socket.broadcast.emit('removeUser', { userLogin });
    console.log(userLogin);
  }
  });
  });

