class Paddle {

    constructor(gameWidth,gameHeight) {

        this.width=200;
        this.height=20;
        this.maxSpeed=10;
        this.speed=0

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight-this.height-10
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

    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.width > 800) this.position.x = 800 - this.width;
    }
}
class Paddle2 {

    constructor(gameWidth,gameHeight) {

        this.width=200;
        this.height=20;
        this.maxSpeed=10;
        this.speed=0

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: 10
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
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.width > 800) this.position.x = 800 - this.width;
    }
}

class Handler{
    constructor(Paddle) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    Paddle.moveLeft()
                    //console.log("move left")
                    break;
                
                case 39:
                    Paddle.moveRight()
                    //console.log('move right')
                    break;
                case 65:
                    Paddle2.moveLeft()
                    break;
                case 68:
                    Paddle2.moveRight()
                    break;
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(Paddle.speed<0)
                        Paddle.stop()
                        //console.log("stop")
                    break;
                
                case 39:
                    if(Paddle.speed>0)
                        Paddle.stop()
                        //console.log('stop')
                    break;
                case 65:
                    if(Paddle2.speed>0)
                        Paddle2.stop()
                        //console.log('stop')
                    break;
                case 68:
                    if(Paddle2.speed>0)
                        Paddle2.stop()
                        //console.log('stop')
                    break;

            }
        });

    }
}

class ball{
    constructor(gameWidth,gameHeight, paddle, x,x2,score,block1, block2, block3, block4, block5, block6){
        this.image = document.getElementById("img_ball")
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.speed = {x:2, y:2}
        this.position = {x:50, y:50}
        this.size = 16;
        this.paddle = paddle
        this.x = x
        this.x2 = x2
        this.isDone = false
        this.score = score
    }
    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
    }
    update(deltaTime){
        // console.log("yaaaaaaah")
        if(this.position.x>this.gameWidth||this.position.x<0){
            this.speed.x = -this.speed.x
        }
        if(this.position.y<0){
            this.speed.y = -this.speed.y
            this.x2++
            console.log('top player You have ' + (10-this.x2) + ' lives left.')
        }
        if(this.position.y>this.gameHeight){
            this.speed.y = -this.speed.y
            this.x += 1
            console.log('bottom player You have ' + (10-this.x) + ' lives left.')
        }
        if(this.position.y == this.paddle.position.y){
            if(this.paddle.position.x < this.position.x){
                if(this.position.x < this.paddle.position.x + this.paddle.width){
                    this.speed.y = -this.speed.y
                    this.paddle.width = this.paddle.width / 1.05
                    this.score += 1
                }
            }
        }
        if(this.position.y == Paddle2.position.y+Paddle.height){
            if(Paddle2.position.x < this.position.x){
                if(this.position.x < Paddle2.position.x + Paddle2.width){
                    this.speed.y = -this.speed.y
                    Paddle2.width = Paddle2.width / 1.05
                }
            }
        }

        if((10-this.x) == 0) {
            console.log('bottom player you dun bin exterminated')
            this.speed=0
            this.isDone = true
        }
        if((10-this.x2) == 0) {
            console.log('top player you dun bin exterminated')
            this.speed=0
            this.isDone = true
        }
        this.position.x += 5*this.speed.x;
        this.position.y += 5*this.speed.y;
    }
}

var myReq

let x = 0
let x2 =0
let score = 0
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600


Paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT);
Paddle2 = new Paddle2(GAME_WIDTH,GAME_HEIGHT);
ball = new ball(GAME_WIDTH,GAME_HEIGHT, Paddle, x, x2,score);

new Handler(Paddle);
Paddle.draw(ctx)

let lastTime = 0

function gameloop(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    Paddle.update(deltaTime);
    Paddle.draw(ctx);
    Paddle2.update(deltaTime);
    Paddle2.draw(ctx);
    ball.update(deltaTime)
    ball.draw(ctx);
    if(!ball.isDone){
        requestAnimationFrame(gameloop)
    }
}

requestAnimationFrame(gameloop)