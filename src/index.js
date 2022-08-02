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

let count = 0

io.on('connection', (socket ) => {
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)
    socket.on('increment', () => {
        count++
        socket.emit('countUpdated', count)
    })

})

server.listen(port, () => {
    console.log(`Server listens on port ${port}`)
})