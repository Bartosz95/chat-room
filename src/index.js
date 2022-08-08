const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocation } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
server = http.createServer(app)
io = socketio(server)

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))


io.on('connection', socket => {
    console.log('New WebSocket connection')

    socket.on('join', (options, callback) => {
        
        const { error, user } = addUser({ id: socket.id, ...options })

        if(error) {
            return callback(error)
        }
        
        socket.join(user.room)
        
        socket.emit('message', generateMessage(user.username, `Welcome ${user.username} in ${user.room} room!`))
        socket.broadcast.to(user.room).emit('message', generateMessage(user.username, `${user.username} has joined`))

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!')
        }
        const user = getUser(socket.id)
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocation(user.username, coords))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', generateMessage(user.username, `${user.username} has left.`))
        }
        
    })
})

server.listen(port, () => {
    console.log(`Server listens on port ${port}`)
})