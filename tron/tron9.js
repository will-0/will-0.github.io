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
let deadp = false
let deadb = false

class dodger{
    constructor(gamewidth,gameheight,color){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.len=50
        this.color=color
        this.history={
            x:[],
            y:[]
        }
        this.size=9
        this.maxSpeed=6
        this.roller=0
        this.mid=this.size/2
    }
    draw(ctx){
        ctx.fillStyle = this.color
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
            ctx.fillStyle = this.color
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
            if(this.color=='#f0f'){
                deadp=true
            }
            else{
                deadb=true
            }
            console.log('out of bounds')
        }
        if(this.position.x + this.size > this.gamewidth){
            this.position.x = this.gamewidth - this.size
            if(this.color=='#f0f'){
                deadp=true
            }
            else{
                deadb=true
            }
            console.log('out of bounds')
        }
        if(this.position.y<0){
            this.position.y=0
            if(this.color=='#f0f'){
                deadp=true
            }
            else{
                deadb=true
            }
            console.log('out of bounds')
        }
        if(this.position.y + this.size > this.gameheight){
            this.position.y = this.gameheight - this.size
            if(this.color=='#f0f'){
                deadp=true
            }
            else{
                deadb=true
            }
            console.log('out of bounds')
        }
        //}
        //apple detection{
        // if(apple.position.y<(this.position.y+this.size)){
        //     if(this.position.y + this.size<apple.position.y+apple.size){
        //         if(apple.position.x+apple.size > this.position.x+this.size){
        //             if(this.position.x+this.size>apple.position.x){
        //                 score++
        //                 apple.relocate()
        //                 //bottom right
        //                 this.len+=10
        //             }
        //         }
        //     }
        // }
        // if(apple.position.y<(this.position.y)){
        //     if(this.position.y<apple.position.y+apple.size){
        //         if(apple.position.x+apple.size > this.position.x+this.size){
        //             if(this.position.x+this.size>apple.position.x){
        //                 score++
        //                 apple.relocate()
        //                 //top right
        //                 this.len+=10
        //             }
        //         }
        //     }
        // }
        // if(apple.position.y<(this.position.y)){
        //     if(this.position.y<apple.position.y+apple.size){
        //         if(apple.position.x+apple.size > this.position.x){
        //             if(this.position.x>apple.position.x){
        //                 score++
        //                 apple.relocate()
        //                 //top left
        //                 this.len+=10
        //             }
        //         }
        //     }
        // }
        // if(apple.position.y<(this.position.y+this.size)){
        //     if(this.position.y+this.size<apple.position.y+apple.size){
        //         if(apple.position.x+apple.size > this.position.x){
        //             if(this.position.x>apple.position.x){
        //                 score++
        //                 apple.relocate()
        //                 //bottom left
        //                 this.len+=10
        //             }
        //         }
        //     }
        // }
        // if(apple.position.y<(this.position.y+this.mid)){
        //     if(this.position.y + this.mid<apple.position.y+apple.mid){
        //         if(apple.position.x+apple.mid > this.position.x+this.mid){
        //             if(this.position.x+this.mid>apple.position.x){
        //                 score++
        //                 apple.relocate()
        //                 //middle
        //                 this.len+=10
        //             }
        //         }
        //     }
        // }
        //}
        //tail detection{
        this.roller=0
        while(this.roller<this.history.x.length-10){
            if(dodger1.history.y[this.roller]<(this.position.y+this.size)){
                if(this.position.y + this.size<dodger1.history.y[this.roller]+this.size){
                    if(dodger1.history.x[this.roller]+this.size > this.position.x+this.size){
                        if(this.position.x+this.size>dodger1.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#0ff'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //bottom right
                        }
                    }
                }
            }
            if(dodger1.history.y[this.roller]<(this.position.y)){
                if(this.position.y<dodger1.history.y[this.roller]+this.size){
                    if(dodger1.history.x[this.roller]+this.size > this.position.x+this.size){
                        if(this.position.x+this.size>dodger1.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#0ff'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //top right
                        }
                    }
                }
            }
            if(dodger1.history.y[this.roller]<(this.position.y)){
                if(this.position.y<dodger1.history.y[this.roller]+this.size){
                    if(dodger1.history.x[this.roller]+this.size > this.position.x){
                        if(this.position.x>dodger1.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#0ff'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //top left
                        }
                    }
                }
            }
            if(dodger1.history.y[this.roller]<(this.position.y+this.size)){
                if(this.position.y+this.size<dodger1.history.y[this.roller]+this.size){
                    if(dodger1.history.x[this.roller]+this.size > this.position.x){
                        if(this.position.x>dodger1.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#0ff'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //bottom left
                        }
                    }
                }
            }
            if(dodger1.history.y[this.roller]<(this.position.y+this.mid)){
                if(this.position.y + this.mid<dodger1.history.y[this.roller]+this.mid){
                    if(dodger1.history.x[this.roller]+this.mid > this.position.x+this.mid){
                        if(this.position.x+this.mid>dodger1.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#0ff'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //middle
                        }
                    }
                }
            }
            if(dodger2.history.y[this.roller]<(this.position.y+this.size)){
                if(this.position.y + this.size<dodger2.history.y[this.roller]+this.size){
                    if(dodger2.history.x[this.roller]+this.size > this.position.x+this.size){
                        if(this.position.x+this.size>dodger2.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#f0f'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //bottom right
                        }
                    }
                }
            }
            if(dodger2.history.y[this.roller]<(this.position.y)){
                if(this.position.y<dodger2.history.y[this.roller]+this.size){
                    if(dodger2.history.x[this.roller]+this.size > this.position.x+this.size){
                        if(this.position.x+this.size>dodger2.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#f0f'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //top right
                        }
                    }
                }
            }
            if(dodger2.history.y[this.roller]<(this.position.y)){
                if(this.position.y<dodger2.history.y[this.roller]+this.size){
                    if(dodger2.history.x[this.roller]+this.size > this.position.x){
                        if(this.position.x>dodger2.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#f0f'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //top left
                        }
                    }
                }
            }
            if(dodger2.history.y[this.roller]<(this.position.y+this.size)){
                if(this.position.y+this.size<dodger2.history.y[this.roller]+this.size){
                    if(dodger2.history.x[this.roller]+this.size > this.position.x){
                        if(this.position.x>dodger2.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#f0f'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
                            //bottom left
                        }
                    }
                }
            }
            if(dodger2.history.y[this.roller]<(this.position.y+this.mid)){
                if(this.position.y + this.mid<dodger2.history.y[this.roller]+this.mid){
                    if(dodger2.history.x[this.roller]+this.mid > this.position.x+this.mid){
                        if(this.position.x+this.mid>dodger2.history.x[this.roller]){
                            console.log('hit')
                            if(this.color=='#f0f'){
                                deadp=true
                            }
                            else{
                                deadb=true
                            }
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
    constructor(dodger1,dodger2) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger1.stopx()
                    dodger1.stopy()
                    dodger1.moveLeft()
                    
                    break;
                case 39:
                    dodger1.stopx()
                    dodger1.stopy()
                    dodger1.moveRight()
                    
                    break;
                case 38:
                    dodger1.stopx()
                    dodger1.stopy()
                    dodger1.moveup()
                    
                    break
                case 40:
                    dodger1.stopx()
                    dodger1.stopy()
                    dodger1.movedown()
                    
                    break
                case 65:
                    dodger2.stopx()
                    dodger2.stopy()
                    dodger2.moveLeft()
                    break;
                case 68:
                    dodger2.stopx()
                    dodger2.stopy()
                    dodger2.moveRight()
                    break;
                case 87:
                    dodger2.stopx()
                    dodger2.stopy()
                    dodger2.moveup()
                    break
                case 83:
                    dodger2.stopx()
                    dodger2.stopy()
                    dodger2.movedown()
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

dodger1 = new dodger(GAME_WIDTH,GAME_HEIGHT,'#0ff')
dodger2 = new dodger(GAME_WIDTH,GAME_HEIGHT,'#f0f')
// apple = new apple(GAME_WIDTH,GAME_HEIGHT)
dodger1.position.x = GAME_WIDTH/3 - dodger1.size/2
dodger1.position.y = GAME_HEIGHT/3 - dodger1.size/2
dodger2.position.x = GAME_WIDTH*2/3 - dodger2.size/2
dodger2.position.y = GAME_HEIGHT*2/3 - dodger2.size/2
new Handler(dodger1,dodger2);

let lastTime = 0
dodger1.draw(ctx)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    dodger1.update(deltaTime);
    dodger1.draw(ctx);
    // apple.draw(ctx)
    dodger1.tail(ctx)
    dodger2.update(deltaTime);
    dodger2.draw(ctx);
    // apple.draw(ctx)
    dodger2.tail(ctx)
    dodger1.len+=0.05
    dodger2.len+=0.05
    if(!deadb&&!deadp){
        requestAnimationFrame(gameloop)
    }
    else{
        if(!deadp){
            ctx.clearRect(0,0,800,600)
            ctx.fillStyle = '#f0f'
            ctx.fillRect(0,0,800,600)
        }
        else{
            ctx.clearRect(0,0,800,600)
            ctx.fillStyle = '#0ff'
            ctx.fillRect(0,0,800,600)
        }
    }
}
requestAnimationFrame(gameloop)