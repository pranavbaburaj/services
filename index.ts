import express, { Express, Request, Response } from "express";
import { Server } from "http";
import cookieParser from "cookie-parser";
import { join } from "path";
import { randomUUID } from "crypto";

const app: Express = express();
const server: Server = new Server(app);
const io: any = require("socket.io")(server);

app.use(cookieParser());
const TEMPLATE_PATH: string = join(__dirname, "public");
app.use(express.static(join(__dirname, "public")));

app.get("/", (req: Request, res: Response): void => {
  res.redirect(`/${randomUUID()}`);
});
// If they join a specific room, then render that room
app.get("/:room", (req: Request, res: Response): void => {
  res.cookie("rm", req.params.room);
  res.sendFile(join(TEMPLATE_PATH, "room.html"), { roomId: req.params.room });
});

io.on("connection", (socket: any) => {
  socket.on("join-room", (roomId: any, userId: any) => {
    socket.join(roomId); // Join the room
    socket.broadcast.emit("user-connected", userId); // Tell everyone else in the room that we joined
    console.log(userId + "someone joined " + roomId);
    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(3000);
