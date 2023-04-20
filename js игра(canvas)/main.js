const canvas = document.querySelector("#game-field")
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 560

class Player1 {
    constructor({x,y,colorObj,up,down}) {

        this.width = 20,
        this.height = 100,
        this.score = 0,

        this.x = x,
        this.y = y,
        this.maxY = canvas.height-this.height,
        this.minY = 0,
        this.colorObj = colorObj

        this.beginX = x
        this.beginY = y

        this.up = up
        this.down = down 

    }
    onClick(e) {
        switch (e.code) {
            case this.up:   
                this.y = this.y - 10
                break
            case this.down:
                this.y = this.y + 10
                break
        }
        this.updateLocation()
    }
    updateLocation() {
        // console.log(this.x, this.y);
        if (this.y > this.maxY) this.y = this.maxY
        if (this.y < this.minY) this.y = this.minY
        ctx.fillStyle = this.colorObj
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    beginPosition() {
        this.x = this.beginX
        this.y = this.beginY
        this.updateLocation()
    }
}


class Ball {
    constructor() {
        this.radius = 20,
        this.x = 330,
        this.y = 400,
        this.maxX = canvas.width,
        this.maxY = canvas.height,
        this.minX = 0,
        this.minY = 0,
        this.colorObj = "orange",
        this.velocity = -5
        this.direction = 0
        this.max = 2
        this.min = -5
        this.element = document.querySelector("#ball")
    }
    updateLocation() {

        console.log(this.y);
        if (this.x > this.maxX) this.x = this.maxX
        if (this.x < this.minX) this.x = this.minX
        if (this.y > this.maxY) this.y = this.maxY
        if (this.y < this.minY) this.y = this.minY
        
        ctx.beginPath();
        ctx.fillStyle = this.colorObj
        ctx.arc(this.x,this.y-this.radius,this.radius,0,Math.PI *2)
        ctx.fill()

        // ctx.stroke()
        // ctx.fillRect(this.x,this.y,this.radius,this.radius )
    }
    moveBall() {
        // this.direction = Math.floor(Math.random() * (this.radius + this.radius) -this.radius)
        this.x = this.x + this.velocity
        this.y = this.y + this.direction
        this.updateLocation()
    }
    changeDirection() {
        if(this.direction ==0){
           this.direction = Math.floor(Math.random() * (this.max - this.min) + this.min) 
        }
        else{
            this.direction = -this.direction
        }
        // this.velocity = -this.velocity
    }
    beginPosition() {
        this.x = 500
        this.y = 400
        this.direction = 0
        this.updateLocation()
    }
}
const PlayerInfo1 = {
    x:0,
    y:300,
    colorObj: "red",
    up:"KeyW",
    down:"KeyS"
    
}
const PlayerInfo2 = {
    x:canvas.width-20,
    y:300,
    colorObj: "red",
    up:"ArrowUp",
    down:"ArrowDown"

}

let player1 = new Player1(PlayerInfo1)
let player2 = new Player1(PlayerInfo2)
let ball = new Ball()

function collision(player, ball) {
    if (player.y <= ball.y && player.y + player.height   >= ball.y- ball.radius *2 && player.x - player.width <= ball.x && player.x >= ball.x - ball.radius *2) {
        ball.velocity = -ball.velocity
        return true
    }
    if(ball.y - ball.radius *2<=0 ){
        return true
    }
    return false

}

const start = () => {

    player1.beginPosition()
    player2.beginPosition()
    ball.beginPosition()


    gameScore()


    document.body.addEventListener("keydown", (e) => {
        player1.onClick(e)
        player2.onClick(e)
    })

    requestAnimationFrame(update)
}
function gameScore() {
    const div = document.querySelector(".gameScore")
    div.textContent = player1.score + ":" + player2.score
    player1.beginPosition()
    player2.beginPosition()
    ball.beginPosition()

}
const update = () => {
    window.requestAnimationFrame(update)
    ctx.fillStyle = "rgba(255, 255, 255, 1)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    player1.updateLocation()
    player2.updateLocation()
    if (ball.x <= 0) {
        player2.score += 1
        gameScore()
    }
    if (ball.x >= canvas.width) {
        player1.score += 1
        gameScore()
    }
    ball.moveBall()
    if (collision(player1, ball) || collision(player2, ball)) {
        console.log("collide");
        ball.changeDirection()

    }
   
}

start()