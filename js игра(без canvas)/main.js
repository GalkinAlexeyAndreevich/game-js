
class Player1{
    constructor(){
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
    onClick(e){
        switch(e.code){
            
            case "ArrowUp":
                this.y = this.y - 5
                break
            case "ArrowDown":
                this.y = this.y + 5
                break
        }
    }
    updateLocation(){
        console.log(this.y);
        if(this.x>this.maxX)this.x=this.maxX
        if(this.x<this.minX)this.x=this.minX
        if(this.y>this.maxY)this.y=this.maxY
        if(this.y<this.minY)this.y=this.minY
        this.element.style.left = this.x +'px'
        this.element.style.top = this.y +'px'
    }
    updateSize(){
        this.element.style.width = this.width +'px'
        this.element.style.height = this.height +'px'
        this.element.style.backgroundColor = this.colorObj
        // colorPlayer
    }

}
class Player2 extends Player1{
    constructor(){
        super()
        this.width = 20,
        this.height = 100,
        this.x = 600,
        this.y = 300,
        this.maxX = 600,
        this.maxY = 400,
        this.minX = 600,
        this.minY = 200,
        this.colorObj = "red",
        this.element = document.querySelector(".player2") 
    }
}

class Ball{
    constructor(){
        this.width = 20,
        this.height = 20,
        this.x = 330,
        this.y = 325,
        this.maxX = 400,
        this.maxY = 400,
        this.minX = 200,
        this.minY = 200,
        this.colorObj = "green",
        this.velocity = -5
        this.element = document.querySelector(".ball")
    }
    updateLocation(){
        if(this.x>this.maxX)this.x=this.maxX
        if(this.x<this.minX)this.x=this.minX
        if(this.y>this.maxY)this.y=this.maxY
        if(this.y<this.minY)this.y=this.minY
        this.element.style.left = this.x +'px'
        this.element.style.top = this.y +'px'
    }
    updateSize(){
        this.element.style.width = this.width +'px'
        this.element.style.height = this.height +'px'
        this.element.style.backgroundColor = this.colorObj
        // colorPlayer
    }
    ballLeft(){
        console.log(this.y);
        this.x = this.x -5
        // console.log(this.y);
        this.updateLocation()
    }
    ballRight(){
        console.log(this.y);
        this.x = this.x+5
        // console.log(this.y);
        this.updateLocation()
    }
    
}

let player1 = new Player1()
let player2 = new Player2()
let ball = new Ball()


setInterval(()=>{
    if(collizia(player1,ball)){
        // ball.ballLeft()
        ball.ballRight()
        console.log(12345);
        return
    }
    // else if(collizia(player1,ball) ){
    //     ball.ballRight()
    //     console.log(1234);
    //     return
    // }
    ball.ballLeft()
    
},500)

player1.updateLocation()
player2.updateLocation()
ball.updateLocation()


document.body.addEventListener("keydown",(e)=>{
    player1.onClick(e)
    player1.updateLocation()
    player2.onClick(e)
    player2.updateLocation()
    // collizia(player,ball)
        
})

function collizia(player,ball){
    if(player.x-player.width  <= ball.x && player.x>= ball.x-ball.width){
        console.log("collide");
        return true
    }
    return false

}
// collizia(player,ball)


player1.updateSize()
player2.updateSize()
ball.updateSize()