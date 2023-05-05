import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
import { canvas, PlayerInfo1, PlayerInfo2, fps } from "./modules/config.js";

import Player from "./modules/player.js";
import Ball from "./modules/ball.js";

import { clearCanvas } from "./modules/clearCanvas.js";
import { collision, collisionField } from "./modules/collision.js";
import { roomPanel } from "./modules/roomPanel.js";

const gameDiv = document.querySelector(".game");
gameDiv.style.display = "none";
const RoomSearch = document.querySelector(".RoomSearch");
console.log(RoomSearch);
RoomSearch.style.display = "block";

let player1;
let player2;
let ball;
const socket = io("ws://192.168.226.13:8080");

roomPanel(socket);

socket.on("startGame", (room) => {
  player1 = new Player(PlayerInfo1);
  player2 = new Player(PlayerInfo2);
  ball = new Ball(canvas);

  if (room.p1 == socket.id) {
    player1.socket = socket;
  } else if (room.p2 == socket.id) {
    player2.socket = socket;
  } else {
    alert("Упс, ошибка");
  }
  player1.roomId = room.id;
  player2.roomId = room.id;
  ball.socket = socket;
  ball.roomId = room.id;
  ball.idOwner = room.p1;
  console.log(player1);
  console.log(player2);

  gameDiv.style.display = "block";
  RoomSearch.style.display = "none";
  clear();
  start();

  socket.on("infoPlayerOnClient", (data) => {
    if (data.choose == "p1") {
      player1.x = data.x;
      player1.y = data.y;
    } else if (data.choose == "p2") {
      player2.x = data.x;
      player2.y = data.y;
    }
  });
  socket.on("changeDirectionOnClient", (data) => {
    ball.direction = data.direction;
    ball.velocity = data.velocity;
    ball.coef = data.coef;
    ball.x = data.x;
    ball.y = data.y;
  });
  socket.on("scorePlayerOnClient", (data) => {
    player1.score = data.score1;
    player2.score = data.score2;
    updateScore();
  });
});

socket.on("disconnect", () => {
  clear();
});
const surrender = gameDiv.querySelector(".surrender");
surrender.addEventListener("click", () => {
  socket.emit("gameEndOnServer", ball.roomId);
});
socket.on("gameEndOnClient", (data) => {
  clear();
  gameDiv.style.display = "none";
  RoomSearch.style.display = "block";
  if (data == socket.id) {
    alert("Вы проиграли");
  } else {
    alert("Вы выиграли");
  }
});

let requestId = null;
const clear = () => {
  clearCanvas();
  if (requestId !== null) {
    cancelAnimationFrame(requestId);
  }
};

const start = () => {
  gameScore();
  player1.movePlayer();
  player2.movePlayer();
  updateScore();
  requestId = requestAnimationFrame(update);
};
const gameScore = () => {
  let player;
  // Один из игровок забил
  if (ball.x <= 0 && player1.socket != -1) {
    player = "player2Score";
  } else if (ball.x >= canvas.width && player2.socket != -1) {
    player = "player1Score";
  }
  if (ball.x <= 0 || ball.x >= canvas.width) {
    player1.beginPosition();
    player2.beginPosition();
    ball.beginPosition();
  }
  if (player) {
    socket.emit("scorePlayerOnServer", {
      whoScore: player,
      roomId: player1.roomId,
    });
  }
};
const updateScore = () => {
  const div = document.querySelector(".gameScore");
  div.textContent = player1.score + ":" + player2.score;
};

let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

const update = () => {
  // Лок фпс
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);

    // Очищаем canvas
    clearCanvas();
    // Размещаем игроков и мяч
    player1.updateLocation();
    player2.updateLocation();
    ball.moveBall();
    gameScore();

    //Чем больше мяч касается со стенками, тем выше его скорость
    if (collisionField(ball)) {
      ball.coef = ball.coef >= 4 ? 4 : ball.coef + 0.5;
    }
    // Коллизия игрока и мяча, мяча и поля.
    if (
      collision(player1, ball) ||
      collision(player2, ball) ||
      collisionField(ball)
    ) {
      console.log("collide");
      ball.changeDirection();
    }
  }

  // бесконечный цикл обновления объектов и их коллизия
  requestId = requestAnimationFrame(update);
};
