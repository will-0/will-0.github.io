class boing{
    constructor(gameWidth,gameHeight) {
        this.width=50;
        this.height=50;
        this.maxSpeed=10;
        this.weeee=20
        this.speed=0
        this.floor=gameHeight-this.height
        this.upspeed=0
        this.accel=1
        this.minus=false
        this.acceleration=0
        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight-this.height
        }
    }
    moveLeft(){
        this.speed = -this.maxSpeed
    }
    moveRight(){
        this.speed = this.maxSpeed
    }
    stop(){
        this.speed=0;
    }
    draw(ctx) {
        ctx.fillStyle = '#0ff'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    jump(){
        this.upspeed = this.weeee
        this.acceleration=this.accel
    }
    grav(){
        this.accel +=1
        if(this.accel>0 && this.minus == true){
            this.weeee = -this.weeee
            this.minus = false

        }
        console.log('gravity = ' + this.accel)
    }
    degrav(){
        this.accel -=1
        if(this.accel<0 && this.minus == false){
            this.weeee = -this.weeee
            this.minus = true
        }
        console.log('gravity = ' + this.accel)
    }
    for(){
        if(this.accel<0){
            this.weeee -=2
        }
        else{
            this.weeee +=2
        }
        if(this.accel<0){
            console.log('force = ' + (this.weeee + this.weeee * -2))
        }
        else{
            console.log('force = ' + this.weeee)
        }
        
    }
    defor(){
        if(this.accel<0){
            this.weeee +=2
        }
        else{
            this.weeee -=2
        }
        if(this.accel<0){
            console.log('force = ' + (this.weeee + this.weeee * -2))
        }
        else{
            console.log('force = ' + this.weeee)
        }
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        this.position.y -= this.upspeed
        this.upspeed -= this.acceleration
        if(this.position.y>this.floor){
            this.position.y=this.floor
            this.upspeed=-this.upspeed/2
            if(this.upspeed<2){
                this.upspeed=0
            }
        }
        if (this.position.y<0){
            this.position.y = 0
            this.upspeed=0
        }
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.width > 800) this.position.x = 800 - this.width;
    }
}
class Handler{
    constructor(boing) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    boing.moveLeft()
                    //console.log("move left")
                    break;
                case 39:
                    boing.moveRight()
                    //console.log('move right')
                    break;
                case 32:
                    boing.jump()
                    break;
                case 38:
                    boing.grav()
                    break;
                case 40:
                    boing.degrav()
                    break;
                case 85:
                    boing.for()
                    break;
                case 68:
                    boing.defor()
                    break;
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(boing.speed<0)
                        boing.stop()
                        //console.log("stop")
                    break;
                
                case 39:
                    if(boing.speed>0)
                        boing.stop()
                        //console.log('stop')
                    break;
                

            }
        });

    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600


boing = new boing(GAME_WIDTH,GAME_HEIGHT)
new Handler(boing)
let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    boing.update(deltaTime);
    boing.draw(ctx);
    requestAnimationFrame(gameloop)
}
gameloop()