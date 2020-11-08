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
                

            }
        });

    }
}

class ball{
    constructor(gameWidth,gameHeight, paddle, x,score,block1, block2, block3, block4, block5, block6){
        this.image = document.getElementById("img_ball")
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.speed = {x:2, y:2}
        this.position = {x:10, y:10}
        this.size = 16;
        this.paddle = paddle
        this.x = x
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
        }
        if(this.position.y>this.gameHeight){
            this.speed.y = -this.speed.y
            this.x += 1
            console.log('You have ' + (10-this.x) + ' lives left.')
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

        if (block1.dead == false){
            if (this.position.y < block1.size){
                if(block1.position.x<this.position.x){
                    if(this.position.x<(block1.position.x+block1.size)){
                        this.speed.y = -this.speed.y
                        this.score += 5
                        block1.kill(ctx)
                        console.log('hit')
                    }
                }
            }
        }
        if (block2.dead == false){
            if (this.position.y < block2.size){
                if(block2.position.x<this.position.x){
                    if(this.position.x<block2.position.x+block2.size){
                        this.speed.y = -this.speed.y
                        this.score += 5
                        block2.kill(ctx)
                        console.log('hit')
                    }
                }
            }
        }
        if (block3.dead == false){
            if (this.position.y < block3.size){
                if(block3.position.x<this.position.x){
                    if(this.position.x<block3.position.x+block3.size){
                        this.speed.y = -this.speed.y
                        this.score += 5
                        block3.kill(ctx)
                        console.log('hit')
                    }
                }
            }
        }
        if (block4.dead == false){
            if (this.position.y < block4.size){
                if(block4.position.x<this.position.x){
                    if(this.position.x<block4.position.x+block4.size){
                        this.speed.y = -this.speed.y
                        this.score += 5
                        block4.kill(ctx)
                        console.log('hit')
                    }
                }
            }
        }
        if (block5.dead == false){
            if (this.position.y < block5.size){
                if(block5.position.x<this.position.x){
                    if(this.position.x<block5.position.x+block1.size){
                        this.speed.y = -this.speed.y
                        this.score += 5
                        block5.kill(ctx)
                        console.log('hit')
                    }
                }
            }
        }
        if (block6.dead == false){
            if (this.position.y < block6.size){
                if(block6.position.x<this.position.x){
                    if(this.position.x<block6.position.x+block6.size){
                        this.speed.y = -this.speed.y
                        this.score += 5
                        block6.kill(ctx)
                        console.log('hit')
                    }
                }
            }
        }

        if((10-this.x) == 0) {
            console.log('you dun bin exterminated')
            console.log('your score is ' + this.score)
            this.speed=0
            this.isDone = true
        }
        this.position.x += 5*this.speed.x;
        this.position.y += 5*this.speed.y;
    }
}


class block{
    
    constructor(xposition){
        this.image = document.getElementById("block")
        this.position = {x:xposition, y:0}
        this.size = 100;
        this.dead = false
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
    }
    kill(ctx){
        this.dead = true
    }
}

var myReq

let x = 0
let score = 0
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600


block1 = new block(100)
block2 = new block(200)
block3 = new block(300)
block4 = new block(400)
block5 = new block(500)
block6 = new block(600)


Paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT);
ball = new ball(GAME_WIDTH,GAME_HEIGHT, Paddle, x,score);

new Handler(Paddle);
Paddle.draw(ctx)

let lastTime = 0

function gameloop(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    Paddle.update(deltaTime);
    Paddle.draw(ctx);
    ball.update(deltaTime)

    ball.draw(ctx);

    if(block1.dead == false){
        block1.draw(ctx)
    }
    if(block2.dead == false){
        block2.draw(ctx)
    }
    if(block3.dead == false){
        block3.draw(ctx)
    }
    if(block4.dead == false){
        block4.draw(ctx)
    }
    if(block5.dead == false){
        block5.draw(ctx)
    }
    if(block6.dead == false){
        block6.draw(ctx)
    }

    if (!ball.isDone){
        requestAnimationFrame(gameloop)
    }
}

requestAnimationFrame(gameloop)
