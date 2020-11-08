class F_obsticle{
    constructor(gameWidth,gameHeight){
        this.width=10
        this.gap=200
        this.height1=(Math.floor(Math.random() * 400))
        this.maxSpeed=5
        this.gameheight=gameHeight
        this.gapspeed=3
        this.position1={
            x: 800,
            y: gameHeight-this.height1
        }
        this.height2=(gameHeight-this.height1)-this.gap
        this.position2={
            x:800,
            y:0
        }
    }
    draw1(ctx){
        ctx.fillStyle = '#000'
        ctx.fillRect(this.position1.x,this.position1.y,this.width,this.height1)
    }
    draw2(ctx){
        if(this.height2<0){
            this.height2=0
        }
        ctx.fillStyle = '#000'
        ctx.fillRect(this.position2.x,this.position2.y,this.width,this.height2)
    }
    update(deltaTime){
        if(!deltaTime) return;
        // if(score>1){
        //     this.height1 += this.holespeed
        //     if (this.height1<0){
        //         this.holespeed=-this.holespeed
        //     }
        //     this.height2 = (this.gameheight-this.height1)-this.gap
        //     this.position1.y = this.gameheight-this.height1
        // }
        this.position1.x -= this.maxSpeed
        this.position2.x -= this.maxSpeed
        if(this.position1.x<0){
            this.position1.x=800
            this.height1=(Math.floor(Math.random() * 400))
            this.position1.y=600-this.height1
            this.position2.x=800
            this.height2=(600-this.height1)-this.gap
            score++
            this.maxSpeed += 0.25
        }
    }
}
class boing{
    constructor(gameWidth,gameHeight,wall) {
        this.width=50;
        this.wall=wall
        this.height=50;
        this.maxSpeed=10;
        this.weeee=18
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
        this.dead=false
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
    update(deltaTime,wall) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        this.position.y -= this.upspeed
        this.upspeed -= this.acceleration
        if(this.position.y>this.floor){
            this.position.y=this.floor
            this.upspeed=0
        }
        if (this.position.y<0){
            this.position.y = 0
            this.upspeed=0
        }
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.width > 800) this.position.x = 800 - this.width;
        if(!hacks){
            if(F_obsticle.position1.y<(this.position.y+this.height)){
                if(this.position.y + this.height<F_obsticle.position1.y+F_obsticle.height1){
                    if(F_obsticle.position1.x+F_obsticle.width > this.position.x+this.width){
                        if(this.position.x+this.width>F_obsticle.position1.x){
                            this.dead=true
                        }
                    }
                }
            }
            if(F_obsticle.position2.y<(this.position.y+this.height)){
                if(this.position.y + this.height<F_obsticle.position2.y+F_obsticle.height2){
                    if(F_obsticle.position2.x+F_obsticle.width > this.position.x+this.width){
                        if(this.position.x+this.width>F_obsticle.position2.x){
                            this.dead=true
                        }
                    }
                }
            }
            if(F_obsticle.position1.y<(this.position.y)){
                if(this.position.y<F_obsticle.position1.y+F_obsticle.height1){
                    if(F_obsticle.position1.x+F_obsticle.width > this.position.x+this.width){
                        if(this.position.x+this.width>F_obsticle.position1.x){
                            this.dead=true
                        }
                    }
                }
            }
            if(F_obsticle.position2.y<this.position.y){
                if(this.position.y<F_obsticle.position2.y+F_obsticle.height2){
                    if(F_obsticle.position2.x+F_obsticle.width > this.position.x+this.width){
                        if(this.position.x+this.width>F_obsticle.position2.x){
                            this.dead=true
                        }
                    }
                }
            }
        }
    }
}
class Handler{
    constructor(boing) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                // case 37:
                //     boing.moveLeft()
                //     //console.log("move left")
                //     break;
                // case 39:
                //     boing.moveRight()
                //     //console.log('move right')
                //     break;
                case 32:
                    boing.jump()
                    break;
                case 16:
                    hacks=true
                // case 38:
                //     boing.grav()
                //     break;
                // case 40:
                //     boing.degrav()
                //     break;
                // case 85:
                //     boing.for()
                //     break;
                // case 68:
                //     boing.defor()
                //     break;
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
                case 16:
                    hacks=false
                

            }
        });

    }
}
hacks=false
reverse=false
score=0
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600


boing = new boing(GAME_WIDTH,GAME_HEIGHT,F_obsticle)
F_obsticle = new F_obsticle(GAME_WIDTH,GAME_HEIGHT)
new Handler(boing)
let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    boing.update(deltaTime,F_obsticle);
    boing.draw(ctx);
    F_obsticle.draw1(ctx)
    F_obsticle.draw2(ctx)
    F_obsticle.update(deltaTime)
    if(!boing.dead){
        requestAnimationFrame(gameloop)
    }
    else{
        console.log(score)
    }
}
gameloop()
