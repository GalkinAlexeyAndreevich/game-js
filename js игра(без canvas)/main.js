
class Player1 {
    constructor() {
        this.width = 20,
            this.height = 100,
            this.x = 300,
            this.y = 300,
            this.maxX = 300,
            this.maxY = 400,
            this.minX = 300,
            this.minY = 200,
            this.colorObj = "red",
            this.element = document.querySelector(".player1")
    }
    onClick(e) {
        switch (e.code) {

            case "ArrowUp":
                this.y = this.y - 5
                break
            case "ArrowDown":
                this.y = this.y + 5
                break
        }
    }
    updateLocation() {
        console.log(this.y);
        if (this.x > this.maxX) this.x = this.maxX
        if (this.x < this.minX) this.x = this.minX
        if (this.y > this.maxY) this.y = this.maxY
        if (this.y < this.minY) this.y = this.minY
        this.element.style.left = this.x + 'px'
        this.element.style.top = this.y + 'px'
    }
    updateSize() {
        this.element.style.width = this.width + 'px'
        this.element.style.height = this.height + 'px'
        this.element.style.backgroundColor = this.colorObj
        // colorPlayer
    }

}
class Player2 extends Player1 {
    constructor() {
        super()
        this.width = 20,
            this.height = 100,
            this.x = 600,
            this.y = 300,
            this.maxX = 600,
            this.maxY = 600,
            this.minX = 600,
            this.minY = 100,
            this.colorObj = "red",
            this.element = document.querySelector(".player2")
    }
    onClick(e) {
        switch (e.code) {

            case "KeyW":
                this.y = this.y - 5
                break
            case "KeyS":
                this.y = this.y + 5
                break
        }
    }
}

class Ball {
    constructor() {
        this.width = 20,
            this.height = 20,
            this.x = 330,
            this.y = 400,
            this.maxX = 600,
            this.maxY = 400,
            this.minX = 280,
            this.minY = 200,
            this.colorObj = "green",
            this.velocity = -5
        this.element = document.querySelector(".ball")
    }
    updateLocation() {
        if (this.x > this.maxX) this.x = this.maxX
        if (this.x < this.minX) this.x = this.minX
        if (this.y > this.maxY) this.y = this.maxY
        if (this.y < this.minY) this.y = this.minY
        this.element.style.left = this.x + 'px'
        this.element.style.top = this.y + 'px'
    }
    updateSize() {
        this.element.style.width = this.width + 'px'
        this.element.style.height = this.height + 'px'
        this.element.style.backgroundColor = this.colorObj
        // colorPlayer
    }
    moveBall() {
        this.x = this.x - this.velocity
        this.updateLocation()
    }
    changeDirection() {
        this.velocity = -this.velocity
    }
    ballLeft() {
        console.log(this.y);
        this.x = this.x - 5
        // console.log(this.y);
        this.updateLocation()
    }
    ballRight() {
        console.log(this.y);
        this.x = this.x + 5
        // console.log(this.y);
        this.updateLocation()
    }

}

let player1 = new Player1()
let player2 = new Player2()
let ball = new Ball()

// && player.y + player.height <=ball.y && player.y>=ball.y + ball.height
//player.x - player.width <= ball.x && player.x >= ball.x - ball.width && 
function collizia(player, ball) {
    // console.log(player.y,ball.y+5);
    console.log( player.y + player.height, ball.y);
    if (player.y <=ball.y +10 && player.y + player.height-5 >=ball.y && player.x - player.width <= ball.x && player.x >= ball.x - ball.width) {
        console.log("collide");
        return true
    }
    return false

}
// collizia(player,ball)

const start = () => {



    player1.updateLocation()
    player2.updateLocation()
    ball.updateLocation()

    player1.updateSize()
    player2.updateSize()
    ball.updateSize()


    document.body.addEventListener("keydown", (e) => {
        player1.onClick(e)
        player1.updateLocation()
        player2.onClick(e)
        player2.updateLocation()
        // collizia(player,ball)
s
    })

    requestAnimationFrame(update)
}

const update = () => {
    collizia(player2, ball) 
    // if(collizia(player1, ball) || collizia(player2, ball)){

    // }
    ball.moveBall()
    // if (collizia(player1, ball) || collizia(player2, ball)) {
    //     ball.changeDirection()
    //     // ball.ballLeft()

    // }
    requestAnimationFrame(update)
}

start()