import Player from "./modules/player.js";
import Ball from "./modules/ball.js";
import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";

const canvas = document.querySelector("#game-field");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
let paused = false;
let paddleSpeed = 15;

let arrSocketData = [];
let PlayerInfo1 = {
  x: 10,
  y: 300,
  colorObj: "white",
  socket: -1,
  numberPlayer: "p1",
  canvas: canvas,
};
let PlayerInfo2 = {
  x: canvas.width - 30,
  y: 300,
  colorObj: "white",
  socket: -1,
  numberPlayer: "p2",
  canvas: canvas,
};

let choose;

let player1;
let player2;
let ball;
const socket = io("ws://localhost:8080");
socket.on("sda", (args) => {
  console.log(args);
});
socket.on("connectToGame", (data) => {
  choose = data.yourPlayer;
    if (choose == 0) {
      throw new Error("room close");
    }
  //   console.log(data, choose, socket);
  if (choose == 1) {
    PlayerInfo1.socket = socket;
  }
  if (choose == 2) {
    PlayerInfo2.socket = socket;
  }
});
socket.on("startGame", () => {
    player1 = new Player(PlayerInfo1);
    player2 = new Player(PlayerInfo2);
    ball = new Ball(ballInfo);

    clear();
    start();
    
    socket.on("infoCoordinationOnClient", (data) => {
        if (data.choose == "p1") {
          player1.x = data.x;
          player1.y = data.y;
        } else if (data.choose == "p2") {
          player2.x = data.x;
          player2.y = data.y;
        }

    });
});

socket.on("disconnect", () => {
  console.log("disconnect");
  clear();
});

let ballInfo = {
  canvas: canvas,
};

function collision(player, ball) {
  // если мяч и игрок соприкоснулись
  if (player.x + player.width < ball.x || player.x > ball.x + ball.radius)
    return false;
  if (player.y + player.height < ball.y || player.y > ball.y + ball.radius)
    return false;
  if (ball.velocity >= 0) {
    ball.velocity = ball.velocity + ball.coef / 5;
  } else {
    ball.velocity = ball.velocity - ball.coef / 5;
  }
  ball.velocity = -ball.velocity;
  return true;
}
function collisionField(ball) {
  // если мяч соприкоснулся с полем
  if (ball.y - ball.radius * 2 <= 0 || ball.y >= canvas.height) {
    return true;
  }
  return false;
}
let requestId = null;

const clear = () => {
  clearCanvas();

  if (requestId !== null) {
    cancelAnimationFrame(requestId);
  }
};

const start = () => {
  console.log(arrSocketData);
  player1.beginPosition();
  player2.beginPosition();
  ball.beginPosition();

  gameScore();

  document.body.addEventListener("keydown", (e) => {
    // if(e.code == "KeyW"){
    //     player1.speed = -paddleSpeed
    // }
    // else if(e.code == "KeyS"){
    //     player1.speed = paddleSpeed
    // }

    if (e.code == "ArrowUp") {
      if (choose == 1) {
        player1.speed = -paddleSpeed;
      } else {
        player2.speed = -paddleSpeed;
      }
    } else if (e.code == "ArrowDown") {
      if (choose == 1) {
        player1.speed = paddleSpeed;
      } else {
        player2.speed = paddleSpeed;
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.code == "Escape") {
      paused = !paused;
    }
    if (e.code == "ArrowUp" || e.code == "ArrowDown") {
      if (choose == 1) {
        player1.speed = 0;
      } else {
        player2.speed = 0;
      }
    }
  });

  requestId = requestAnimationFrame(update);
};
function gameScore() {
  const div = document.querySelector(".gameScore");
  div.textContent = player1.score + ":" + player2.score;
  player1.beginPosition(ctx);
  player2.beginPosition(ctx);
  ball.beginPosition();
  socket.emit("score player", {
    player1: player1.score,
    player1: player1.score,
  });
}

const clearCanvas = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([64, 18]);
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "white";
  ctx.stroke();
};

const update = () => {
  // бесконечный цикл обновления объектов и их коллизия
  // Если нажать Esc игра встанет на паузу
  if (paused) {
    return;
  }
  // Очищаем canvas
  clearCanvas();
  // Размещаем игроков и мяч
  player1.updateLocation();
  player2.updateLocation();

  //   ball.moveBall();
  // Один из игровок забил
  if (ball.x <= 0) {
    player2.score += 1;
    gameScore();
  } else if (ball.x >= canvas.width) {
    player1.score += 1;
    gameScore();
  }
  // Коллизия игрока и мяча, мяча и поля. Чем больше мяч касается с объектами, тем выше его скорость
  if (
    collision(player1, ball) ||
    collision(player2, ball) ||
    collisionField(ball)
  ) {
    // console.log("collide");
    ball.coef = ball.coef + 1;
    ball.changeDirection();
  }

  //   console.log(ball.coef);
  requestId = requestAnimationFrame(update);
};
