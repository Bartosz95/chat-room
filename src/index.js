const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express()
server = http.createServer(app)
io = socketio(server)

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))


io.on('connection', socket => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', "A new user joined")

    socket.on('sendMessage', message => {
        console.log('Got message', message)
        io.emit('message', message)
    })

    socket.on('sendLocation', coords => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', "A user has left.")
    })
})

server.listen(port, () => {
    console.log(`Server listens on port ${port}`)
})