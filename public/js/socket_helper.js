const socket = io()

socket.on('message', (message) => {
    console.log("Message :" + message)
})

socket.on('status', (message) => {
    console.log("Status :" + message)
    $("#state").val(message)
})

const sendStatus = () => {
    var sentStatus = $("#state").val();
    if (sentStatus == "OFF") {
        sentStatus = "ON"
    } else {
        sentStatus = "OFF"
    }
    socket.emit('status', sentStatus, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
}


const sendMsg = () => {
    socket.emit('sendMessage', "Helllo", (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
}