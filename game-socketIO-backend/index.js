const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http,{cors:{
    origin: "http://127.0.0.1:5500/index.html",
    methods: ["GET", "POST"]
}})

const port = process.env.PORT || 8080

io.on('connection', socket => {
    console.log("connect client");
})

app.listen(port,()=>{
    console.log(`connect on port ${port}`);
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.get('/',(req,res)=>{
    console.log("method get");
    res.send("work get")
})

// io.sockets.on('connection', socket => {
//     console.log("connect client");
// })
// app.listen(3002,()=>{
//     console.log("work");
// })
