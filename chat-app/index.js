const express = require("express");
const http = require("http");
const socket = require("socket.io");
const os = require("os");
const { DefaultDeserializer } = require("v8");

const app = express();

app.use(express.static("public"));

var server = app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on port ${process.env.PORT || 5000}`);
});

var io = socket(server);
console.log("hello");
var io = socket(server);

io.on("connection", (socket) => {
  console.log(`connected to ${socket.id}`);

  socket.on("chat", (data) => {
    console.log(data);
    new_data = {
      message: data.message,
      handle: data.handle,
      person: "anonymous",
    };

    io.sockets.emit("chat", new_data);
  });
});
