import { Server } from 'socket.io';
import { APP_DOMAIN } from '../constants/index.js';
import { env } from '../utils/env.js';

let io;

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env(APP_DOMAIN),  
      methods: ['GET', 'POST'],
      credentials: true,
    },
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
