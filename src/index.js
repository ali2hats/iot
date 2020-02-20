const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

global.status = "OFF"

io.on('connection', (socket) => {
    console.log('New WebSocket connection Port :' + port)
    socket.emit('message', 'Welcome!')
    socket.emit('status', global.status)
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('status', (message, callback) => {
        console.log("Status :" + message)
        global.status = message
        io.emit('status', global.status)
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        console.log("Message :" + message)
        io.emit('message', message)
        callback()
    })

    socket.on('disconnect', () => {
        console.log("A user has left")
        io.emit('message', 'A user has left!')
    })
})

app.post('/change_state', (req, res) => {
    console.log(req.body)
    if (req.body.queryResult.parameters['on']) {
        global.status = "ON"
        io.emit('status', global.status)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "speech": "Light Turn On!!!",
            "displayText": "Light Turn On"
        }));
    } else {
        global.status = "OFF"
        io.emit('status', global.status)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "speech": "Light Turn Off!!!",
            "displayText": "Light Turn Off"
        }));
    }
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
