import {io} from "socket.io-client"
const ioClient = io.connect('http://localhost:8080')
ioClient.on('connection', socket => {
    console.log("client connect");
})
console.log(213);