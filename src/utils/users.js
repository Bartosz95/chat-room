const users = []

const addUser = ({ id, username, room, chatbot, isChatbotAvailable }) => {

    // Clean data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    chatbot = (chatbot.toLowerCase() === 'true');

    // Validate data
    if(!username) {
        return {
            error: "Username is required"
        }
    }

    if(username === `assistant`) {
        return {
            error: "Username cannot be assistant"
        }
    }
    
    if(chatbot) {
        if (!isChatbotAvailable) {
            return {
                error: "Chatbot is not available now"
            }
        }
        room = `chatbot-${id}`
    } else {
        if(!room) {
            return {
                error: "Name of room  required"
            }
        } else if(room.substring(0,7) === `chatbot` && room.substring(8) !== id) {
            return {
                error: `You cannot join to someone chatbot room`
            }
        }
    }

    const existingUser = users.find(user => {
        return user.username === username && user.room === room && !user.chatbot
    })

    if(existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    const user = { id, username, room, chatbot }
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
