import { canvas } from "./config.js";
let timer = new Date();
let dif
export const collision = (player, ball) => {
  // если мяч и игрок соприкоснулись

  const distX = Math.abs(ball.x - player.x - player.width / 2);
  const distY = Math.abs(ball.y - player.y - player.height / 2);

  if (distX > player.width / 2 + ball.radius) {
    return false;
  }
  if (distY > player.height / 2 + ball.radius) {
    return false;
  }
  let now = new Date();
  dif = now - timer;
  
  console.log(dif);
  if (dif <= 100) {
    // if(player.numberPlayer =="p1"){
    //   player.x +=10
    // }
    // else{
    //   player.x -=10
    // }
    return false;   
  }
  timer = now;
  if (distX <= player.width / 2) {
    return true;
  }
  if (distY <= player.height / 2) {
    return true;
  }

  const deltaX = distX - player.width / 2;
  const deltaY = distY - player.height / 2;
  return deltaX * deltaX + deltaY * deltaY <= ball.radius * ball.radius;

};
export const collisionField = (ball) => {
  // если мяч соприкоснулся с полем
  if (ball.y - ball.radius * 2 <= 0 || ball.y >= canvas.height) {
    return true;
  }
  return false;
};
