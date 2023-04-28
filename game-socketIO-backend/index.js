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
const players = {
  p1: "",
  p2: "",
};
let count = 0;
io.sockets.on("connection", async (socket) => {
  let yourPlayer = 0;

  if (!players.p1) {
    players.p1 = socket.id;
    yourPlayer = 1;
  } else if (!players.p2) {
    players.p2 = socket.id;
    yourPlayer = 2;
  } else {
    yourPlayer = 0;
  }

  count = Object.values(players).filter(Boolean).length;

  await socket.join("room");
  socket.emit("connectToGame", {
    yourPlayer: yourPlayer,
  });

  if (count == 2) {
    console.log(count);
    io.to("room").emit("startGame", players);
  }

  socket.on("infoCoordinationOnServer", (data) => {
    io.to("room").emit("infoCoordinationOnClient", {
      x: data.x,
      y: data.y,
      choose: data.numberPlayer
    });
  });

  socket.emit("sda", { data: socket.id });

  socket.on("disconnect", async (reason) => {
    if (players.p1 == socket.id) {
      players.p1 = "";
    } else if (players.p2 == socket.id) {
      players.p2 = "";
    }

    await socket.leave("room");

    count--;
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
