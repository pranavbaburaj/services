const express = require('express')
const { join } = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {v4: uuidV4} = require('uuid')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const TEMPLATE_PATH = join(__dirname, "public")
app.use(express.static(join(__dirname, "public")))

// If they join the base link, generate a random UUID and send them to a new room with said UUID
app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})
// If they join a specific room, then render that room
app.get('/:room', (req, res) => {
    res.cookie('rm',req.params.room)
    res.sendFile(join(TEMPLATE_PATH, "room.html"), {roomId: req.params.room})
})
// When someone connects to the server
io.on('connection', socket => {
    // When someone attempts to join the room
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)  // Join the room
        socket.broadcast.emit('user-connected', userId) // Tell everyone else in the room that we joined
        console.log(userId + "someone joined " + roomId)
        // Communicate the disconnection
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', userId)
        })
    })
})

server.listen(3000) 