import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});
let onLineUsers = [];
io.on("connection", (socket) => {
  // listen to a connection
  socket.on("addNewUser", (userId) => {
    const exist = onLineUsers.some((u) => u.userId === userId);
    if (!exist) {
      onLineUsers.push({ userId, socketId: socket.id });
      // send online users arrayto client
      io.emit("onlineUsers", onLineUsers);
    }
  });

  //add message recevied from client
  socket.on("sendMessage", (message) => {
    const user = onLineUsers.find(
      (user) => user.userId === message.recepientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotifications", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("allMessagesReaded", (data) => {
    const user = onLineUsers.find((user) => user.userId === data.recepientId);
    if (user) {
      io.to(user.socketId).emit("messagesReaded", {
        sendId: data.senderId,
        chatId: data.chatId,
      });
    }
  });
  socket.on("chatOpen", (data) => {
    const user = onLineUsers.find((user) => user.userId === data.recepientId);
    if (user) {
      io.to(user.socketId).emit("getChatOpen", {
        chatId: data.chatId,
        senderId: data.senderId,
      });
    }
  });

  socket.on("isTyping", (data) => {
    const user = onLineUsers.find((user) => user.userId === data.recepientId);

    if (user) {
      io.to(user.socketId).emit("senderTyping", {
        typingSenderId: data.senderId,
      });
    }
  });
  socket.on("finishTyping", (data) => {
    const user = onLineUsers.find((user) => user.userId === data.recepientId);

    if (user) {
      io.to(user.socketId).emit("senderFinishTyping", {
        typingSenderId: data.senderId,
      });
    }
  });
  socket.on("disconnect", () => {
    onLineUsers = onLineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("onlineUsers", onLineUsers);
  });
});

io.listen(3333);
