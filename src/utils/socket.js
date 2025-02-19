import { Server } from "socket.io";
import { FRONTEND_DOMAIN } from "../constants/index.js";
import { env } from "../utils/env.js";

let io;
const users = {};

export const setupSocket = (server) => {
  if (io) {
    return;
  }

  io = new Server(server, {
    cors: {
      origin: env(FRONTEND_DOMAIN),
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("✅ WebSocket server started");

  io.on("connection", (socket) => {

    socket.on("register", (userId) => {
      if (userId && !users[userId]) {
        users[userId] = { socketId: socket.id, status: "online" };

        io.emit("updateUserStatus", { userId, status: "online" });
      }
    });

    socket.on("newMessage", (message) => {
      io.emit("newMessage", message);
    });

    socket.on("updateMessage", (updatedMessage) => {
      io.emit("updateMessage", updatedMessage);
    });

    socket.on("deleteMessage", (id) => {
      io.emit("deleteMessage", id);
    });

    socket.on("addNotification", (message) => {
      io.emit("addNotification", message);
    });

    socket.on("deleteNotification", ({ fromId }) => {
      if (fromId) {
        io.emit("deleteNotification", { fromId });
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUserId = null;

      for (const userId in users) {
        if (users[userId].socketId === socket.id) {
          disconnectedUserId = userId;
          delete users[userId];
          break;
        }
      }

      if (disconnectedUserId) {
        io.emit("updateUserStatus", { userId: disconnectedUserId, status: "offline" });
      }
    });
  });
};

export const sendUserStatusToClients = (userId, status) => {
  if (io && userId) {
    io.emit("updateUserStatus", { userId, status });
  }
};

export const sendMessageToClients = (event, messageData) => {
  if (io && event && messageData) {
    io.emit(event, messageData);
  }
};
