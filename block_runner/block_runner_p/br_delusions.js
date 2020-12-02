const course=[1,1,1,0,0,4,12,6,2,2,7,8,5,5,12,8,12,9,2,11,1,1,6,0,4,4,10,7,7,5,3,1,2,7,7,0,10,5,0,1,2,3,3,8,8,9,10,11,11,11,9,9,5,3,3,8,2,10,8,8,5,10,10,5,1,0,0,7,4,6,2,2]
class boing{
    constructor(gameWidth,gameHeight) {
        this.width=50;
        this.reverb=false
        this.height=50;
        this.maxSpeed=10;
        this.weeee=15
        this.speed=0
        this.floor=gameHeight-this.height
        this.upspeed=0
        this.accel=1
        this.minus=false
        this.acceleration=0
        this.bounce=2
        this.rounder=2
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
    Bounce(){
        this.bounce+=0.1
        console.log('bounce = ' + (1/this.bounce))
    }
    debounce(){
        this.bounce-=0.1
        console.log('bounce = ' + (1/this.bounce))
    }
    bstop(){
        this.reverb=false
        console.log('bounce off')
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        this.position.y -= this.upspeed
        this.upspeed -= this.acceleration
        if(this.position.y>this.floor){
            this.position.y=this.floor
            if(this.reverb){
                this.upspeed=-this.upspeed/this.bounce
                if(this.upspeed<this.rounder){
                    this.upspeed=0
                }
            }
        }
        if (this.position.y<0){
            this.position.y=0
            if(this.reverb){
                this.upspeed=-this.upspeed/this.bounce
            }
        }
        if(this.position.x<0){
            this.position.x=0
        }
        if(this.position.x + this.width > 800) this.position.x = 800 - this.width;
    }
}
class ob{
    constructor(gameWidth,gameHeight) {
        this.size=50;
        this.floor=gameHeight-this.size
        this.gamewidth=gameWidth
        this.gameheight=gameHeight
        this.freq=this.gameheight/this.size
        this.mid=this.size/2
        this.dead=false
        this.startwall=this.gamewidth-this.size
        this.position={
            x:this.startwall,
            y:0
        }
        this.speed=-5
    }
    draw(ctx,num) {
        if(this.position.x==this.startwall){
            this.position.y=this.floor-num*this.size
        }
        // console.log('d')
        ctx.fillStyle = '#000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        if (this.position.x<0){
            this.position.x=this.gamewidth-this.size
        }
        //hit detection
        if(!test){
            if(boing.position.y<(this.position.y+this.size)){
                if(this.position.y + this.size<boing.position.y+boing.height){
                    if(boing.position.x+boing.width > this.position.x+this.size){
                        if(this.position.x+this.size>boing.position.x){
                            //bottom right
                            console.log('boop')
                            dead=true
                        }
                    }
                }
            }
            if(boing.position.y<(this.position.y)){
                if(this.position.y<boing.position.y+boing.height){
                    if(boing.position.x+boing.width > this.position.x+this.size){
                        if(this.position.x+this.size>boing.position.x){
                            //top right
                            console.log('boop')
                            dead=true
                        }
                    }
                }
            }
            if(boing.position.y<(this.position.y)){
                if(this.position.y<boing.position.y+boing.height){
                    if(boing.position.x+boing.width > this.position.x){
                        if(this.position.x>boing.position.x){
                            //top left
                            dead=true
                            console.log('boop')
                        }
                    }
                }
            }
            if(boing.position.y<(this.position.y+this.size)){
                if(this.position.y+this.size<boing.position.y+boing.height){
                    if(boing.position.x+boing.width > this.position.x){
                        if(this.position.x>boing.position.x){
                            //bottom left
                            console.log('boop')
                            dead=true
                        }
                    }
                }
            }
            if(boing.position.y<(this.position.y+this.mid)){
                if(this.position.y + this.mid<boing.position.y+boing.height){
                    if(boing.position.x+boing.width > this.position.x+this.mid){
                        if(this.position.x+this.mid>boing.position.x){
                            //middle
                            console.log('boop')
                            dead=true
                        }
                    }
                }
            }
        }
        //floor reset detection
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
                // case 109:
                //     boing.Bounce()
                //     break;
                // case 107:
                //     boing.debounce()
                //     break;
                // case 83:
                //     boing.bstop()
                //     break;
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                // case 37:
                //     if(boing.speed<0)
                //         boing.stop()
                //         //console.log("stop")
                //     break;
                
                // case 39:
                //     if(boing.speed>0)
                //         boing.stop()
                //         //console.log('stop')
                //     break;
                

            }
        });

    }
}
let test=false
let roller=0
let dead=false
let obupdate=0
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600


boing = new boing(GAME_WIDTH,GAME_HEIGHT)
ob2 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob3 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob4 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob5 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob6 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob7 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob8 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob9 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob10 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob11 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob12 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob13 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob14 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob15 = new ob(GAME_WIDTH,GAME_HEIGHT)
// ob16 = new ob(GAME_WIDTH,GAME_HEIGHT)
ob1 = new ob(GAME_WIDTH,GAME_HEIGHT)
new Handler(boing)
let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    boing.update(deltaTime);
    boing.draw(ctx);
    ob1.draw(ctx,course[roller])
    if(ob1.position.x==ob1.startwall){
        roller++
        // console.log('t2')
    }
    ob1.update(deltaTime)
    if(obupdate>10){
        ob2.draw(ctx,course[roller])
        
        if(ob2.position.x==ob2.startwall){
            roller++
        }
        ob2.update(deltaTime)
    }
    if(obupdate>20){
        ob3.draw(ctx,course[roller])
        
        if(ob3.position.x==ob3.startwall){
            roller++
        }
        ob3.update(deltaTime)
    }
    if(obupdate>30){
        ob4.draw(ctx,course[roller])

        if(ob4.position.x==ob4.startwall){
            roller++
        }
        ob4.update(deltaTime)
    }
    if(obupdate>40){
        ob5.draw(ctx,course[roller])
        
        if(ob5.position.x==ob5.startwall){
            roller++
            // console.log('test')
        }
        ob5.update(deltaTime)
    }
    if(obupdate>50){
        ob6.draw(ctx,course[roller])
        
        if(ob6.position.x==ob6.startwall){
            roller++
        }
        ob6.update(deltaTime)
    }
    if(obupdate>60){
        ob7.draw(ctx,course[roller])
        
        if(ob7.position.x==ob7.startwall){
            roller++
        }
        ob7.update(deltaTime)
    }
    if(obupdate>70){
        ob8.draw(ctx,course[roller])
        
        if(ob8.position.x==ob8.startwall){
            roller++
        }
        ob8.update(deltaTime)
    }
    if(obupdate>80){
        ob9.draw(ctx,course[roller])
        
        if(ob9.position.x==ob9.startwall){
            roller++
        }
        ob9.update(deltaTime)
    }
    if(obupdate>90){
        ob10.draw(ctx,course[roller])
        
        if(ob10.position.x==ob10.startwall){
            roller++
        }
        ob10.update(deltaTime)
    }
    if(obupdate>100){
        ob11.draw(ctx,course[roller])
        
        if(ob11.position.x==ob11.startwall){
            roller++
        }
        ob11.update(deltaTime)
    }
    if(obupdate>110){
        ob12.draw(ctx,course[roller])
        
        if(ob12.position.x==ob12.startwall){
            roller++
        }
        ob12.update(deltaTime)
    }
    if(obupdate>120){
        ob13.draw(ctx,course[roller])
        
        if(ob13.position.x==ob13.startwall){
            roller++
        }
        ob13.update(deltaTime)
    }
    if(obupdate>130){
        ob14.draw(ctx,course[roller])
        
        if(ob14.position.x==ob14.startwall){
            roller++
        }
        ob14.update(deltaTime)
    }
    if(obupdate>140){
        ob15.draw(ctx,course[roller])
        
        if(ob15.position.x==ob15.startwall){
            roller++
        }
        ob15.update(deltaTime)
    }
    // if(obupdate>150){
    //     ob16.draw(ctx,course[roller])
        
    //     if(ob16.position.x==ob16.startwall){
    //         roller++
    //     }
    //     ob16.update(deltaTime)
    // }
    if(!dead){
        if(roller<course.length){
            requestAnimationFrame(gameloop)
        }
        else{
            console.log('level complete')
        }
    }
    else{
        console.log(roller/course.length*100,'%')
    }
    obupdate++
}
gameloop()