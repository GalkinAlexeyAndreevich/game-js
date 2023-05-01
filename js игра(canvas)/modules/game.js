import { clearCanvas } from "./clearCanvas.js";
import { paddleSpeed } from "./config.js";
import Player from "./player.js";
import Ball from "./ball.js";
import { paddleSpeed, PlayerInfo1, PlayerInfo2,canvas } from "./config.js";

export class Game {
  constructor(choose) {
    this.requestId = 0;
    this.paused = false;
    this.choose = choose;
    this.player1 = new Player(PlayerInfo1);
    this.player2 = new Player(PlayerInfo2);
    this.ball = new Ball(canvas)
  }
  start() {
    gameScore();

    window.addEventListener("keydown", (e) => {
      if (e.code == "ArrowUp") {
        if (this.choose == 1) {
          this.player1.speed = -paddleSpeed;
        } else {
          this.player2.speed = -paddleSpeed;
        }
      } else if (e.code == "ArrowDown") {
        if (this.choose == 1) {
          this.player1.speed = paddleSpeed;
        } else {
          this.player2.speed = paddleSpeed;
        }
      }
    });

    window.addEventListener("keyup", function (e) {
      if (e.code == "Escape") {
        this.paused = !this.paused;
      }
      if (e.code == "ArrowUp" || e.code == "ArrowDown") {
        if (this.choose == 1) {
          this.player1.speed = 0;
        } else {
          this.player2.speed = 0;
        }
      }
    });

    this.requestId = requestAnimationFrame(update);
  }
  update() {
    // бесконечный цикл обновления объектов и их коллизия
    // Если нажать Esc игра встанет на паузу
    if (this.paused) {
      return;
    }
    // Очищаем canvas
    clearCanvas();
    // Размещаем игроков и мяч
    this.player1.updateLocation();
    this.player2.updateLocation();

    //   ball.moveBall();
    // Один из игровок забил
    if (this.ball.x <= 0) {
      this.player2.score += 1;
      gameScore();
    } else if (this.ball.x >= canvas.width) {
      this.player1.score += 1;
      gameScore();
    }
    // Коллизия игрока и мяча, мяча и поля. Чем больше мяч касается с объектами, тем выше его скорость
    if (
      collision(player1, ball) ||
      collision(player2, ball) ||
      collisionField(ball)
    ) {
      // console.log("collide");
      this.ball.coef = this.ball.coef + 1;
      this.ball.changeDirection();
    }

    //   console.log(ball.coef);
    this.requestId = requestAnimationFrame(update);
  }
}

function gameScore() {
  const div = document.querySelector(".gameScore");
  div.textContent = player1.score + ":" + player2.score;
  player1.beginPosition();
  player2.beginPosition();
  ball.beginPosition();
  socket.emit("score player", {
    player1: player1.score,
    player1: player1.score,
  });
}

export const clear = (requestId) => {
  clearCanvas();

  if (requestId !== null) {
    cancelAnimationFrame(requestId);
  }
};
