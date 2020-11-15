class apple{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.size=25
        this.position={x:(Math.floor(Math.random() * this.gamewidth-this.size)),y:(Math.floor(Math.random() * this.gameheight-this.size))}
        
        this.mid=this.size/2
    }
    draw(ctx){
        ctx.fillStyle = '#000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    relocate(){
        this.position={x:(Math.floor(Math.random() * this.gamewidth-this.size)),y:(Math.floor(Math.random() * this.gameheight-this.size))}
    }
}
class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.len=100
        this.history={
            x:[],
            y:[]
        }
        this.size=25
        this.maxSpeed=5
        this.roller=0
        this.dead=false
        this.mid=this.size/2
    }
    draw(ctx){
        ctx.fillStyle = '#0ff'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
        this.history.x.push(this.position.x)
        this.history.y.push(this.position.y)
    }
    tail(ctx){
        this.roller=0
        if(this.history.x.length>this.len){
            this.history.x.shift()
            this.history.x.shift()
        }
        if(this.history.y.length>this.len){
            this.history.y.shift()
            this.history.y.shift()
        }
        while(this.roller<this.history.x.length){
            ctx.fillStyle = '#0ff'
            ctx.fillRect(this.history.x[this.roller],this.history.y[this.roller],this.size,this.size)
            this.roller++
        }
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
        //wall detection{
        if(this.position.x<0){
            this.position.x=0
            this.dead=true
        }
        if(this.position.x + this.size > this.gamewidth){
            this.position.x = this.gamewidth - this.size
            this.dead=true
        }
        if(this.position.y<0){
            this.position.y=0
            this.dead=true
        }
        if(this.position.y + this.size > this.gameheight){
            this.position.y = this.gameheight - this.size
            this.dead=true
        }
        //}
        //apple detection{
        if(apple.position.y<(this.position.y+this.size)){
            if(this.position.y + this.size<apple.position.y+apple.size){
                if(apple.position.x+apple.size > this.position.x+this.size){
                    if(this.position.x+this.size>apple.position.x){
                        score++
                        apple.relocate()
                        //bottom right
                        this.len+=10
                    }
                }
            }
        }
        if(apple.position.y<(this.position.y)){
            if(this.position.y<apple.position.y+apple.size){
                if(apple.position.x+apple.size > this.position.x+this.size){
                    if(this.position.x+this.size>apple.position.x){
                        score++
                        apple.relocate()
                        //top right
                        this.len+=10
                    }
                }
            }
        }
        if(apple.position.y<(this.position.y)){
            if(this.position.y<apple.position.y+apple.size){
                if(apple.position.x+apple.size > this.position.x){
                    if(this.position.x>apple.position.x){
                        score++
                        apple.relocate()
                        //top left
                        this.len+=10
                    }
                }
            }
        }
        if(apple.position.y<(this.position.y+this.size)){
            if(this.position.y+this.size<apple.position.y+apple.size){
                if(apple.position.x+apple.size > this.position.x){
                    if(this.position.x>apple.position.x){
                        score++
                        apple.relocate()
                        //bottom left
                        this.len+=10
                    }
                }
            }
        }
        if(apple.position.y<(this.position.y+this.mid)){
            if(this.position.y + this.mid<apple.position.y+apple.mid){
                if(apple.position.x+apple.mid > this.position.x+this.mid){
                    if(this.position.x+this.mid>apple.position.x){
                        score++
                        apple.relocate()
                        //middle
                        this.len+=10
                    }
                }
            }
        }
        //}
        //tail detection{
        this.roller=0
        while(this.roller<this.history.x.length-10){
            if(this.history.y[this.roller]<(this.position.y+this.size)){
                if(this.position.y + this.size<this.history.y[this.roller]+this.size){
                    if(this.history.x[this.roller]+this.size > this.position.x+this.size){
                        if(this.position.x+this.size>this.history.x[this.roller]){
                            console.log('hit')
                            this.dead=true
                            //bottom right
                        }
                    }
                }
            }
            if(this.history.y[this.roller]<(this.position.y)){
                if(this.position.y<this.history.y[this.roller]+this.size){
                    if(this.history.x[this.roller]+this.size > this.position.x+this.size){
                        if(this.position.x+this.size>this.history.x[this.roller]){
                            console.log('hit')
                            this.dead=true
                            //top right
                        }
                    }
                }
            }
            if(this.history.y[this.roller]<(this.position.y)){
                if(this.position.y<this.history.y[this.roller]+this.size){
                    if(this.history.x[this.roller]+this.size > this.position.x){
                        if(this.position.x>this.history.x[this.roller]){
                            console.log('hit')
                            this.dead=true
                            //top left
                        }
                    }
                }
            }
            if(this.history.y[this.roller]<(this.position.y+this.size)){
                if(this.position.y+this.size<this.history.y[this.roller]+this.size){
                    if(this.history.x[this.roller]+this.size > this.position.x){
                        if(this.position.x>this.history.x[this.roller]){
                            console.log('hit')
                            this.dead=true
                            //bottom left
                        }
                    }
                }
            }
            if(this.history.y[this.roller]<(this.position.y+this.mid)){
                if(this.position.y + this.mid<this.history.y[this.roller]+this.mid){
                    if(this.history.x[this.roller]+this.mid > this.position.x+this.mid){
                        if(this.position.x+this.mid>this.history.x[this.roller]){
                            console.log('hit')
                            this.dead=true
                            //middle
                        }
                    }
                }
            }
            this.roller++
        }
    }

}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.stopx()
                    dodger.stopy()
                    dodger.moveLeft()
                    break;
                case 39:
                    dodger.stopx()
                    dodger.stopy()
                    dodger.moveRight()
                    break;
                case 38:
                    dodger.stopx()
                    dodger.stopy()
                    dodger.moveup()
                    break
                case 40:
                    dodger.stopx()
                    dodger.stopy()
                    dodger.movedown()
                    break
            

            }
        });
    }
}
let score=0
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
apple = new apple(GAME_WIDTH,GAME_HEIGHT)
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
    apple.draw(ctx)
    dodger.tail(ctx)
    if(!dodger.dead){
        requestAnimationFrame(gameloop)
    }
    else{
        console.log(score)
    }
}
requestAnimationFrame(gameloop)