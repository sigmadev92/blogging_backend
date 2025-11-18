export const onlineUsers = {};

export default function initSocket(io) {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query?.userId;
    if (!userId) {
      console.log("Not connected");
      return;
    }
    console.log("⚡ New user connected:", socket.id, userId);
    onlineUsers[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    // Join room
    socket.on("joinRoom", (room) => {
      console.log("is triggered");
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    // Handle chat messages
    socket.on("chatMessage", ({ room, message }) => {
      io.to(room).emit("chatMessage", { message, sender: socket.id });
    });

    // Disconnect
    socket.on("disconnect", () => {
      // Find user by socket.id
      const userId = [...Object.keys(onlineUsers)].find(
        ([_, sId]) => sId === socket.id
      )?.[0];

      if (userId) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} went offline`);
        io.emit("userOffline", { userId });
      }
    });
  });
}
