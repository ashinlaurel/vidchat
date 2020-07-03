const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const router = require("./router.js");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const cors = require("cors");

const PORT = process.send.PORT || 3001;

server.listen(PORT, () => {
  console.log("listening on Port " + PORT);
});

app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  console.log("client " + socket.id + " is connected");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      // console.log(error);
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!!` });

    socket.join(user.room);
    callback();
    // console.log(name, room);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    // console.log(user);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});
