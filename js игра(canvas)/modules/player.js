export default class Player {
  constructor({ x, y, colorObj, socket, numberPlayer, canvas }) {
    this.width = 20;
    this.height = 100;
    this.score = 0;

    this.x = x;
    this.y = y;
    this.maxY = canvas.height - this.height;
    this.minY = 0;
    this.colorObj = colorObj;

    this.beginX = x;
    this.beginY = y;

    this.speed = 0;
    this.socket = socket;
    this.numberPlayer = numberPlayer;
    this.ctx = canvas.getContext("2d");
  }
  updateLocation() {
    // console.log(this.x, this.y);
    this.y = this.y + this.speed;
    if (this.y > this.maxY) this.y = this.maxY;
    if (this.y < this.minY) this.y = this.minY;
    this.ctx.fillStyle = this.colorObj;

    if (this.socket != -1) {
      this.socket.emit("infoCoordinationOnServer", {
        x: this.x,
        y: this.y,
        numberPlayer: this.numberPlayer,
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
}
