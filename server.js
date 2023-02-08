const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//run when client connects
io.on("connection", (socket) => {
  //Welcome current user
  socket.emit("message", "Welcome to chatcord"); // send to 1 client

  //Broadcast when user connects
  socket.broadcast.emit("message", "A user has joined the chat"); //send to everyone except the one that's connecting

  //Run when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", " A user has left the chat");
  });

  ///io.emit(); //send to everyone
});
const PORT = 3000 || process.env.PORT;

server.listen(3000, () => console.log(`Server running on ${PORT}`));
