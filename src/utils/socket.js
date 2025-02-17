import { Server } from "socket.io";
import { FRONTEND_DOMAIN } from "../constants/index.js";
import { env } from "../utils/env.js";

let io;
const users = {}; // { userId: { socketId, status: "online" | "offline" } }

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env(FRONTEND_DOMAIN),
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("✅ WebSocket server started");

  io.on("connection", (socket) => {
    console.log("🔗 Client is connected:", socket.id);

    socket.on("register", (userId) => {
      if (userId) {
        users[userId] = { socketId: socket.id, status: "online" };
        console.log(`✅ Client ${userId} registered and is ONLINE.`);

        io.emit("allUserStatuses", users);

        io.emit("updateUserStatus", { userId, status: "online" });
      }
    });

    socket.on("newMessage", (message) => {
      console.log(`📩 New message from ${message.fromId} to ${message.toId}:`, message);
      io.emit("newMessage", message);
    });

    socket.on("updateMessage", (updatedMessage) => {
      console.log(`📝 Updated message:`, updatedMessage);
      io.emit("updateMessage", updatedMessage);
    });

    socket.on("deleteMessage", (id) => {
      console.log(`🗑️ Messages from ID: ${id} deleted`);
      io.emit("deleteMessage", id);
    });

    socket.on("disconnect", () => {
      let disconnectedUserId = null;

      for (const userId in users) {
        if (users[userId].socketId === socket.id) {
          disconnectedUserId = userId;
          delete users[userId];
          console.log(`⚠️ Client ${userId} disconnected and is OFFLINE.`);
          break;
        }
      }

      if (disconnectedUserId) {
        io.emit("updateUserStatus", { userId: disconnectedUserId, status: "offline" });
      }
    });
  });
};

export const sendMessageToClients = (event, messageData) => {
  if (io) {
    io.emit(event, messageData);
  }
};
