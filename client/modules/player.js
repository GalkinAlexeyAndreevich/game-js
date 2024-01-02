export default class Player {
  constructor({ x, y, socket, numberPlayer, canvas }) {
    this.width = 20;
    this.height = 100;
    this.score = 0;

    this.x = x;
    this.y = y;
    this.maxY = canvas.height - this.height;
    this.minY = 0;
    this.colorObj = "white";

    this.beginX = x;
    this.beginY = y;

    this.speed = 0;
    this.paddleSpeed = 10

    this.socket = socket;
    this.roomId = -1
    this.numberPlayer = numberPlayer;
    this.ctx = canvas.getContext("2d");
  }
  updateLocation() {
    this.y = this.y + this.speed;
    if (this.y > this.maxY) this.y = this.maxY;
    if (this.y < this.minY) this.y = this.minY;
    this.ctx.fillStyle = this.colorObj;

    if (this.socket != -1) {
      this.socket.emit("infoPlayerOnServer", {
        x: this.x,
        y: this.y,
        numberPlayer: this.numberPlayer,
        roomId:this.roomId
      });
    }
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  beginPosition() {
    this.x = this.beginX;
    this.y = this.beginY;
    this.speed = 0;
    this.updateLocation();
  }
  movePlayer(){
    window.addEventListener("keydown", (e) => {
      if(this.socket == -1){
        return
      }
      if (e.code == "ArrowUp") {
          this.speed = -this.paddleSpeed;
      } else if (e.code == "ArrowDown") {
          this.speed = this.paddleSpeed;
      }
    });

    window.addEventListener("keyup", (e)=> {
      if(this.socket == -1){
        return
      }
      if (e.code == "ArrowUp" || e.code == "ArrowDown") {
        this.speed = 0;
      }
    });
  }
}
