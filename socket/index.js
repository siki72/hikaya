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
    }
  });
  // send online users arrayto client
  io.emit("onlineUsers", onLineUsers);

  socket.on("disconnect", () => {
    console.log("quelqu'un est partie", socket.id);
  });
});

io.listen(3333);
