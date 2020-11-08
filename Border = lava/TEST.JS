class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=10
        this.x = false
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
        if(this.position.x<0) {
            this.position.x=0
            console.log('YOU LOSE')
            this.x = true
        }
        if(this.position.x + this.size > 800) {
            this.position.x = 800 - this.size;
            console.log('YOU LOSE')
            this.x = true
        }
        if(this.position.y<0) {
            this.position.y=0;
            console.log('YOU LOSE')
            this.x = true
        }
        if(this.position.y + this.size > 600) {
            this.position.y = 600 - this.size;
            console.log('YOU LOSE')
            this.x = true
        }
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
        // document.addEventListener("keyup", event=> {
        //     switch (event.keyCode) {
        //         case 37:
        //             if(dodger.speed.x<0){
        //                 dodger.stopx()
        //             }
        //             break
        //         case 39:
        //             if(dodger.speed.x>0){
        //                 dodger.stopx()
        //             }
        //             break;
        //         case 38:
        //             if(dodger.speed.y<0){
        //                 dodger.stopy()
        //             }
        //             break
                
        //         case 40:
        //             if(dodger.speed.y>0){
        //                 dodger.stopy()
        //             }
        //             break
        //     }
        // });

    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

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
    if (!dodger.x){
        requestAnimationFrame(gameloop)
    }
}
requestAnimationFrame(gameloop)