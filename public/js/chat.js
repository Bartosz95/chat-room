const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormTextArea =  document.querySelector('textarea')
const $messageFormButton = document.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('message', message => {
    console.log(message)
})

$messageForm.addEventListener('submit', e => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')
    
    const message = e.target.elements.message.value
    
    socket.emit('sendMessage', message, error => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormTextArea.value = ''
        $messageFormTextArea.focus()
        if(error) {
            return console.log(error)
        }
        console.log('The message delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {

    if(!navigator.geolocation) {
        return alert('Geolocation is not supportet by your browser.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('sendLocation', { 
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude 
        }, 
        () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log("Location shared!")
        })
    })
})