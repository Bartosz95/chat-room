const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocation } = require('./utils/messages')

const app = express()
server = http.createServer(app)
io = socketio(server)

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))


io.on('connection', socket => {
    console.log('New WebSocket connection')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user joined'))

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!')
        }
        io.emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocation(coords))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left.'))
    })
})

server.listen(port, () => {
    console.log(`Server listens on port ${port}`)
})