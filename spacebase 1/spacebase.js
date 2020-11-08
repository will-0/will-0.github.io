bullets = []


class Spacebase{
    constructor(gameWidth,gameHeight) {
        this.width=50;
        this.height=100;
        this.maxSpeed=10;
        this.speed=0
        this.fire=false
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
    shoot(){
        score -= 5
        let new_bullet = new Bullet(spacebase,GAME_WIDTH,GAME_HEIGHT,score,Ship)
        bullets.push(new_bullet)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.width > 800) this.position.x = 800 - this.width;
    }
}
class Bullet{
    constructor(spacebase,gamewidth,gameheight,score,ship){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = 10
        this.position = {x:(spacebase.position.x + (spacebase.width/2)),y:(this.gameheight-spacebase.height)}
        this.size = 10
        this.dead = false
    }
    draw(ctx){
        ctx.fillStyle = '#0f0'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    update(){
        this.position.y -= this.speed;
        if (this.position.y<0){
            this.speed = 0
        }
    }
}
class Ship{

    constructor(gamewidth,gameheight){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.position = {x:(Math.floor(Math.random() * 800)),y:0}
        this.maxSpeed = 5
        this.speed = {x:(Math.random() * this.maxSpeed),y:(Math.random() * this.maxSpeed)}
        this.size = 50
        this.dead = false
        this.boom = false
    }


    draw(ctx){
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    update(bullets){
        if(this.position.x + this.size>this.gamewidth||this.position.x<0){
            this.speed.x = -this.speed.x
        }
        if(this.position.y + this.size>this.gameheight){
            this.boom = true
            console.log('YOU LOSE')
            console.log(score)
        }
        bullets.forEach(bullet => {
            if(this.position.y < bullet.position.y){
                if(bullet.position.y < this.position.y + this.size){
                    if(this.position.x < bullet.position.x){
                        if(bullet.position.x < this.position.x + this.size){
                            console.log('HIT')
                            score = score + 100
                            this.dead = true
                        }
                    }
                }
            }
        })
        if(this.dead){
            this.maxSpeed += 0.05
            this.position.y = 0
            this.position.x = (this.gamewidth-this.size)*Math.random()
            this.speed_x = Math.random()
            this.speed_y = Math.sqrt((1-this.speed_x**2))
            this.speed = {x:this.maxSpeed*this.speed_x,y:this.maxSpeed*this.speed_y}
            this.dead = false
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}
class Handler{
    constructor(spacebase) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    spacebase.moveLeft()
                    //console.log("move left")
                    break;
                case 39:
                    spacebase.moveRight()
                    //console.log('move right')
                    break;
                case 32:
                    spacebase.shoot()
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(spacebase.speed<0)
                        spacebase.stop()
                        //console.log("stop")
                    break;
                
                case 39:
                    if(spacebase.speed>0)
                        spacebase.stop()
                        //console.log('stop')
                    break;
                

            }
        });

    }
}

let score = 0
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

function draw_background(ctx){
    ctx.drawImage(document.getElementById("bg"), 0, 0, GAME_WIDTH, GAME_HEIGHT)
}

ship = new Ship(GAME_WIDTH,GAME_HEIGHT)
spacebase = new Spacebase(GAME_WIDTH,GAME_HEIGHT)
new Handler(spacebase);
spacebase.draw(ctx)
let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    draw_background(ctx)
    spacebase.update(deltaTime);
    spacebase.draw(ctx);
    bullets.forEach(element => {
        element.update()
        element.draw(ctx)
    })
    ship.update(bullets)
    ship.draw(ctx)
    if(!ship.boom){
        requestAnimationFrame(gameloop)
    }
    
}
gameloop()