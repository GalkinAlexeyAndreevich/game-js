import { canvas } from "./config.js";
let timer = new Date();
export const collision = (player, ball) => {
  // если мяч и игрок соприкоснулись
  if (player.x + player.width < ball.x || player.x > ball.x + ball.radius)
    return false;
  if (player.y + player.height < ball.y || player.y+10 > ball.y + ball.radius)
    return false;
  let now = new Date();
  // if (now - timer <= 20) {
  //   timer = now;
  //   return false;
  // }
  if (ball.velocity >= 0) {
    // Увеличение вертикальной скорости мяча, и изменение его направления
    ball.velocity = ball.velocity >= 12 ? 12 : ball.velocity + ball.coef;
  } else {
    ball.velocity = ball.velocity <= -12 ? -12 : ball.velocity - ball.coef;
  }
  ball.velocity = -ball.velocity;
  return true;
};
export const collisionField = (ball) => {
  // если мяч соприкоснулся с полем
  if (ball.y - ball.radius * 2 <= 0 || ball.y >= canvas.height) {
    return true;
  }
  return false;
};
