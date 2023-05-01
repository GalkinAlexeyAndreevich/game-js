import express, { static as expressStatic } from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const http = createServer(app);
app.use(cors());
app.use(expressStatic("."));
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8080;

let rooms = []
io.sockets.on("connection", async (socket) => {

  await socket.join("room");
  io.to("room").emit("getRooms",rooms)

  socket.on("checkInRoom",()=>{
    for(let item of rooms){
      if(item.id==socket.id){
        socket.emit("answerOnCheck",false)
      }
    }
  })

  socket.on("addRoom",async()=>{
      await socket.join(`room${rooms.length}`);
      rooms.push({id:rooms.length,p1:socket.id,close:false})
      io.to("room").emit("getRooms",rooms)    
  })

  socket.on("joinRoom",async(id)=>{
    rooms[id].p2 = socket.id
    rooms[id].close = true
    await socket.join(`room${id}`);
    io.to(`room${id}`).emit("startGame",rooms[id] );
    io.to(`room`).emit("getRooms",rooms);
  })

  socket.on("infoPlayerOnServer", (data) => {
    io.to(`room${data.roomId}`).emit("infoPlayerOnClient", {
      x: data.x,
      y: data.y,
      choose: data.numberPlayer
    });
  });

  socket.on("infoBallOnServer",(data)=>{
    io.to(`room${data.roomId}`).emit("infoBallOnClient",{
      x:data.x,
      y:data.y
    })
  })

  socket.emit("sda", { data: socket.id });

  socket.on("disconnect", async (reason) => {
    console.log(socket.id);
    for(let i=0;i<rooms.length;i++){
      if(rooms[i].p1 == socket.id){
        rooms.splice(i, 1);
      }
    }
    await socket.leave("room");

    io.to("room").emit("getRooms",rooms)
  });

});

http.listen(port, () => {
  console.log(`connect on port ${port}`);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/", (req, res) => {
  console.log("method get");
  res.send("work get");
});
