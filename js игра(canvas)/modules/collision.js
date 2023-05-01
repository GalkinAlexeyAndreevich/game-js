export const collision = (player, ball) => {
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