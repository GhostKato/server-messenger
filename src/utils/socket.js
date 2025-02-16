import { Server } from 'socket.io';
import { FRONTEND_DOMAIN } from '../constants/index.js';
import { env } from '../utils/env.js';

let io;
const users = {};

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env(FRONTEND_DOMAIN),
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  console.log("✅ WebSocket server started");

  io.on('connection', (socket) => {
    console.log('🔗 Client is connected:', socket.id);

    socket.emit('allMessages', []);

    socket.on('register', (userId) => {
      console.log(`✅ Client ${userId} registered.`);
      if (userId) {
        users[userId] = socket.id;
      }
    });

    socket.on('newMessage', (message) => {
      console.log(`📩 New message from ${message.fromId} to ${message.toId}:`, message);
      io.emit('newMessage', message);
    });

    socket.on('updateMessage', (updatedMessage) => {
      console.log(`📝 Updated message:`, updatedMessage);
      io.emit('updateMessage', updatedMessage);
    });

    socket.on('deleteMessage', (id) => {
      console.log(`🗑️ Messages from ID: ${id} deleted`);
      io.emit('deleteMessage', id);
    });

    socket.on('disconnect', () => {

      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          console.log(`⚠️ Client ${userId} disabled and removed from active users`);
          break;
        }
      }
    });
  });
};

export const sendMessageToClients = (event, messageData) => {
  if (io) {
    io.emit(event, messageData);
  }
};
