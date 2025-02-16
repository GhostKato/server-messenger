import { Server } from 'socket.io';

let io;

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      // origin: 'http://localhost:3001',
      origin: 'https://app-messenger-seven.vercel.app',
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

  console.log("WebSocket сервер запущено");

  io.on('connection', (socket) => {
    console.log('Клієнт підключений');

    socket.emit('allMessages', []);

    socket.on('newMessage', (message) => {

      io.emit('newMessage', message);
    });

    socket.on('updateMessage', (updatedMessage) => {
      io.emit('updateMessage', updatedMessage);
    });

    socket.on('deleteMessage', (id) => {
      io.emit('deleteMessage', id);
    });

    socket.on('disconnect', () => {
      console.log('Клієнт відключений');
    });
  });
};

export const sendMessageToClients = (event, messageData) => {
  if (io) {
    io.emit(event, messageData);
  }
};
