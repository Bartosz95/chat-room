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

const port = process.env.PORT || 80

const bootstrapDistDir = path.join(__dirname + '/../node_modules/bootstrap/dist')
const mustacheDir = path.join(__dirname, '/../node_modules/mustache/mustache.min.js')
const momentDir = path.join(__dirname, '/../node_modules/moment/min/moment.min.js')
const qsDir = path.join(__dirname, '/../node_modules/qs/dist/qs.js')

const publicDir = path.join(__dirname, '/../public')

app.use(express.static(bootstrapDistDir));
app.use('/js/mustache.min.js', express.static(mustacheDir));
app.use('/js/moment.min.js', express.static(momentDir));
app.use('/js/qs.js', express.static(qsDir));
app.use(express.static(publicDir))


io.on('connection', socket => {

    socket.on('join', (options, callback) => {
        
        const { error, user } = addUser({ id: socket.id, ...options })

        if(error) {
            return callback(error)
        }
        
        socket.join(user.room)
        
        socket.emit('message', generateMessage(user.username, `Welcome ${user.username} in ${user.room} room!`))
        socket.broadcast.to(user.room).emit('message', generateMessage(user.username, `${user.username} has joined`))

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
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
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }        
    })
})

server.listen(port, () => {
    console.log(`Server listens on port ${port}`)
})