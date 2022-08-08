const users = []

const addUser = ({ id, username, room }) => {

    // Clean data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate data
    if(!username || !room) {
        return {
            error: "Both username and room are required!"
        }
    }

    const existingUser = users.find(user => {
        return user.username === username && user.room === room
    })

    if(existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = id => {

    const index = users.findIndex(user => user.id === id)

    if(index !== -1) {
        return users.splice(index, 1).pop()
    }

    
}

const getUser = id => {
    return users.find(user => user.id === id)
}

const getUsersInRoom = room => {
    return users.filter(user => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}