const canvas = document.querySelector("#game-field");
canvas.width = 1280;
canvas.height = 720;

let fps = 60;


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
    fps,
    PlayerInfo1,
    PlayerInfo2

}