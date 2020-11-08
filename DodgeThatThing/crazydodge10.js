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
ball7 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball8 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball9 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball10 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
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
    ball1.draw(ctx)
    ball2.update()
    ball2.draw(ctx)
    ball3.update()
    ball3.draw(ctx)
    ball4.update()
    ball4.draw(ctx)
    ball5.update()
    ball5.draw(ctx)
    ball6.update()
    ball6.draw(ctx)
    ball7.update()
    ball7.draw(ctx)
    ball8.update()
    ball8.draw(ctx)
    ball9.update()
    ball9.draw(ctx)
    ball10.update()
    ball10.draw(ctx)
    score += (
        ball1.speed.x/50+
        ball2.speed.x/50+
        ball3.speed.x/50+
        ball4.speed.x/50+
        ball5.speed.x/50+
        ball6.speed.x/50+
        ball7.speed.x/50+
        ball8.speed.x/50+
        ball9.speed.x/50+
        ball10.speed.x/50+
        ball1.speed.y/50+
        ball2.speed.y/50+
        ball3.speed.y/50+
        ball4.speed.y/50+
        ball5.speed.y/50+
        ball6.speed.y/50+
        ball7.speed.y/50+
        ball8.speed.y/50+
        ball9.speed.y/50+
        ball10.speed.y/50+
        10)
        
    if(
        !ball1.dead&&
        !ball2.dead&&
        !ball3.dead&&
        !ball4.dead&&
        !ball5.dead&&
        !ball6.dead&&
        !ball7.dead&&
        !ball8.dead&&
        !ball9.dead&&
        !ball10.dead)
        requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)