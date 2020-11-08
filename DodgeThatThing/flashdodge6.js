class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=10
    }
    draw(ctx){
        ctx.fillStyle = '#0ff'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    moveLeft(){
        this.speed.x = -this.maxSpeed
    }
    moveRight(){
        this.speed.x = this.maxSpeed
    }
    moveup(){
        this.speed.y = -this.maxSpeed
    }
    movedown(){
        this.speed.y = this.maxSpeed
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.size > 800) this.position.x = 800 - this.size;
        if(this.position.y<0) this.position.y=0;
        if(this.position.y + this.size > 600) this.position.y = 600 - this.size;
    }

}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.moveLeft()
                    break;
                case 39:
                    dodger.moveRight()
                    break;
                case 38:
                    dodger.moveup()
                    break
                case 40:
                    dodger.movedown()
                    break
            

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(dodger.speed.x<0){
                        dodger.stopx()
                    }
                    break
                case 39:
                    if(dodger.speed.x>0){
                        dodger.stopx()
                    }
                    break;
                case 38:
                    if(dodger.speed.y<0){
                        dodger.stopy()
                    }
                    break
                
                case 40:
                    if(dodger.speed.y>0){
                        dodger.stopy()
                    }
                    break
                

            }
        });

    }
}
class ball{
    constructor(gamewidth,gameheight,dodger,score){
        this.gameHeight = gameheight
        this.gameWidth = gamewidth
        this.position = {x:0,y:(Math.floor(Math.random() * 600))}
        this.speed = {x:(Math.random() * 8),y:(Math.random() * 8)}
        this.size = 10
        this.dead = false
    }
    draw(ctx){
        ctx.fillStyle = '#000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    update(deltaTime){
        if(this.position.x>this.gameWidth||this.position.x<0){
            this.speed.x = -this.speed.x
        }
        if(this.position.y<0){
            this.speed.y = -this.speed.y
        }
        if(this.position.y>this.gameHeight){
            this.speed.y = -this.speed.y
        }
        if(dodger.position.y < this.position.y){
            if(this.position.y < dodger.position.y + dodger.size){
                if(dodger.position.x < this.position.x){
                    if(this.position.x < dodger.position.x + dodger.size){
                        console.log('YOU LOSE')
                        console.log(Math.floor(score))
                        this.dead = true
                    }
                }
            }
            
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}
let flash=0
let flspeed = 0
let depresiation = 0.005
let score=1
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

ball1 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball2 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball3 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball4 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball5 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball6 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
dodger.position.x = GAME_WIDTH/2 - dodger.size/2
dodger.position.y = GAME_HEIGHT/2 - dodger.size/2
new Handler(dodger);

let lastTime = 0
dodger.draw(ctx)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    dodger.update(deltaTime);
    dodger.draw(ctx);
    ball1.update()
    if (flash>=flspeed)
        ball1.draw(ctx)
    ball2.update()
    if (flash>=flspeed)
        ball2.draw(ctx)
    ball3.update()
    if (flash>=flspeed)
        ball3.draw(ctx)
    ball4.update()
    if (flash>=flspeed)
        ball4.draw(ctx)
    ball5.update()
    if (flash>=flspeed)
        ball5.draw(ctx)
    ball6.update()
    if (flash>=flspeed)
        ball6.draw(ctx)
    if (flash>=flspeed)
        flash=0
    score += (ball1.speed.x/50 + ball2.speed.x/50 + ball3.speed.x/50 + ball4.speed.x/50 + ball5.speed.x/50 + ball6.speed.x/50)
    flash++
    flspeed+=depresiation
    if(!ball1.dead && !ball2.dead && !ball3.dead && !ball4.dead && !ball5.dead && !ball6.dead)
        requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)