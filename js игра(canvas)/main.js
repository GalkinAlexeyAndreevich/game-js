const canvas = document.querySelector("#game-field")
const ctx = canvas.getContext("2d")
canvas.width = 1280
canvas.height = 720
let paused = false
let paddleSpeed = 15

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

        this.speed = 0

    }
    // onClick(e) {
    //     switch (e.code) {
    //         case this.up:   
    //             this.y = this.y - this.speed
    //             break
    //         case this.down:
    //             this.y = this.y + this.speed
    //             break
    //     }
    //     this.updateLocation()
    // }
    updateLocation() {
        // console.log(this.x, this.y);
        this.y = this.y + this.speed
        if (this.y > this.maxY) this.y = this.maxY
        if (this.y < this.minY) this.y = this.minY
        ctx.fillStyle = this.colorObj
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    beginPosition() {
        this.x = this.beginX
        this.y = this.beginY
        this.speed = 0
        this.updateLocation()
    }
}


class Ball {
    constructor() {
        this.radius = 15,
        this.x = 330,
        this.y = 400,
        this.maxX = canvas.width,
        this.maxY = canvas.height,
        this.minX = 0,
        this.minY = 30,
        this.colorObj = "white",
        this.velocity = -10
        this.direction = 0
        this.isNegative = false
        // this.max = 2
        // this.min = -5
        this.coef = 0
        this.element = document.querySelector("#ball")
    }
    updateLocation() {

        if (this.x > this.maxX) this.x = this.maxX
        if (this.x < this.minX) this.x = this.minX
        if (this.y > this.maxY) this.y = this.maxY
        if (this.y < this.minY) this.y = this.minY
        
        ctx.beginPath();
        ctx.fillStyle = this.colorObj
        ctx.arc(this.x,this.y-this.radius,this.radius,0,Math.PI *2)
        ctx.fill()

    }
    moveBall() {
        console.log(this.direction);
        this.x = this.x + this.velocity
        this.y = this.y + this.direction
        this.updateLocation()
    }
    changeDirection() {
        if(this.direction == 0){
            this.direction = 5
        }
        this.isNegative = !this.isNegative
        if(this.isNegative){
            this.direction = this.direction + this.coef/5
            this.direction = -this.direction
        }
        else{
            this.direction = this.direction - this.coef/5
        }
    }
    beginPosition() {
        this.x = 500
        this.y = 400
        this.direction = 0
        this.coef = 0
        this.velocity = -10
        this.updateLocation()
    }
}
const PlayerInfo1 = {
    x:10,
    y:300,
    colorObj: "white",
    up:"KeyW",
    down:"KeyS"
    
}
const PlayerInfo2 = {
    x:canvas.width-30,
    y:300,
    colorObj: "white",
    up:"ArrowUp",
    down:"ArrowDown"

}

let player1 = new Player1(PlayerInfo1)
let player2 = new Player1(PlayerInfo2)
let ball = new Ball()

function collision(player, ball) {
    // если мяч и игрок соприкоснулись
    if (player.y < ball.y && player.y + player.height > ball.y- ball.radius *2 &&
        player.x - player.width < ball.x && player.x > ball.x - ball.radius *2) {
        if(ball.velocity >=0){
            ball.velocity = ball.velocity + ball.coef/5
        }
        else{
            ball.velocity = ball.velocity - ball.coef/5
        }
        ball.velocity = -ball.velocity 
        return true
    }
    return false
}
function collisionField(ball){
    // если мяч соприкоснулся с полем
    if(ball.y - ball.radius * 2 <= 0 ||  ball.y >=canvas.height){
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

        switch (e.code) {
            case this.up:   
                this.y = this.y - this.speed
                break
            case this.down:
                this.y = this.y + this.speed
                break
        }
        if(e.code == "Escape"){
            paused  = !paused
        }
        else if(!paused){
            if(e.code == "KeyW"){
                player1.speed = -paddleSpeed
            }
            else if(e.code == "KeyS"){
                player1.speed = paddleSpeed
            }

            if(e.code == "ArrowUp"){
                player2.speed = -paddleSpeed
            }
            else if(e.code == "ArrowDown"){
                player2.speed = paddleSpeed
            }
        }

    })

    document.addEventListener('keyup', function(e) {
        if (e.code == "KeyW" || e.code == "KeyS") {
            player1.speed = 0;
        }
      
        if (e.code == "ArrowUp"|| e.code == "ArrowDown") {
            player2.speed  = 0;
        }
      });

    requestAnimationFrame(update)
}
function gameScore() {
    const div = document.querySelector(".gameScore")
    div.textContent = player1.score + ":" + player2.score
    player1.beginPosition()
    player2.beginPosition()
    ball.beginPosition()

}

const clearCanvas = ()=>{
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.setLineDash([64, 18]);
    ctx.beginPath(); 
    ctx.lineWidth = 5
    ctx.moveTo(canvas.width/2, 0);   
    ctx.lineTo(canvas.width/2, canvas.height);  
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

const update = () => {
    // бесконечный цикл обновления объектов и их коллизия
    window.requestAnimationFrame(update)
    // Если нажать Esc игра встанет на паузу
    if(paused){
        return
    }
    // Очищаем canvas
    clearCanvas()
    // Размещаем игроков и мяч
    player1.updateLocation()
    player2.updateLocation()
    ball.moveBall()
    // Один из игровок забил
    if (ball.x <= 0) {
        player2.score += 1
        gameScore()
    }
    else if (ball.x >= canvas.width) {
        player1.score += 1
        gameScore()
    }   
    // Коллизия игрока и мяча, мяча и поля. Чем больше мяч касается с объектами, тем выше его скорость
    if (collision(player1, ball) || collision(player2, ball) || collisionField(ball)) {
        console.log("collide");
        ball.coef = ball.coef + 1
        ball.changeDirection()
    }
}

start()