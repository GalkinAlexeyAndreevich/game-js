const canvas = document.querySelector("#game-field");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;


let paddleSpeed = 15

let PlayerInfo1 = {
    x: 10,
    y: 300,
    socket: -1,
    numberPlayer: "p1",
    canvas: canvas,
  };
  let PlayerInfo2 = {
    x: canvas.width - 30,
    y: 300,
    socket: -1,
    numberPlayer: "p2",
    canvas: canvas,
  };

export {
    canvas,
    ctx,
    paddleSpeed,
    PlayerInfo1,
    PlayerInfo2
}