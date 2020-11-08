class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.size=20
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
ball11 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball12 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball13 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball14 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball15 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball16 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball17 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball18 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball19 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball20 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball21 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball22 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball23 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball24 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball25 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball26 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball27 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball28 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball29 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball30 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball31 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball32 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball33 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball34 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball35 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball36 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball37 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball38 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball39 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball40 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball41 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball42 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball43 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball44 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball45 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball46 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball47 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball48 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball49 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball50 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball51 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball52 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball53 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball54 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball55 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball56 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball57 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball58 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball59 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball60 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball61 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball62 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball63 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball64 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball65 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball66 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball67 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball68 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball69 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball70 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball71 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball72 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball73 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball74 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball75 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball76 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball77 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball78 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball79 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball80 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball81 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball82 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball83 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball84 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball85 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball86 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball87 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball88 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball89 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball90 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball91 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball92 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball93 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball94 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball95 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball96 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball97 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball98 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball99 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
ball100 = new ball(GAME_WIDTH,GAME_HEIGHT,dodger,score)
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
    ball11.update()
    ball11.draw(ctx)
    ball12.update()
    ball12.draw(ctx)
    ball13.update()
    ball13.draw(ctx)
    ball14.update()
    ball14.draw(ctx)
    ball15.update()
    ball15.draw(ctx)
    ball16.update()
    ball16.draw(ctx)
    ball17.update()
    ball17.draw(ctx)
    ball18.update()
    ball18.draw(ctx)
    ball19.update()
    ball19.draw(ctx)
    ball20.update()
    ball20.draw(ctx)
    ball21.update()
    ball21.draw(ctx)
    ball22.update()
    ball22.draw(ctx)
    ball23.update()
    ball23.draw(ctx)
    ball24.update()
    ball24.draw(ctx)
    ball25.update()
    ball25.draw(ctx)
    ball26.update()
    ball26.draw(ctx)
    ball27.update()
    ball27.draw(ctx)
    ball28.update()
    ball28.draw(ctx)
    ball29.update()
    ball29.draw(ctx)
    ball30.update()
    ball30.draw(ctx)
    ball31.update()
    ball31.draw(ctx)
    ball32.update()
    ball32.draw(ctx)
    ball33.update()
    ball33.draw(ctx)
    ball34.update()
    ball34.draw(ctx)
    ball35.update()
    ball35.draw(ctx)
    ball36.update()
    ball36.draw(ctx)
    ball37.update()
    ball37.draw(ctx)
    ball38.update()
    ball38.draw(ctx)
    ball39.update()
    ball39.draw(ctx)
    ball40.update()
    ball40.draw(ctx)
    ball41.update()
    ball41.draw(ctx)
    ball42.update()
    ball42.draw(ctx)
    ball43.update()
    ball43.draw(ctx)
    ball44.update()
    ball44.draw(ctx)
    ball45.update()
    ball45.draw(ctx)
    ball46.update()
    ball46.draw(ctx)
    ball47.update()
    ball47.draw(ctx)
    ball48.update()
    ball48.draw(ctx)
    ball49.update()
    ball49.draw(ctx)
    ball50.update()
    ball50.draw(ctx)
    ball51.update()
    ball51.draw(ctx)
    ball52.update()
    ball52.draw(ctx)
    ball53.update()
    ball53.draw(ctx)
    ball54.update()
    ball54.draw(ctx)
    ball55.update()
    ball55.draw(ctx)
    ball56.update()
    ball56.draw(ctx)
    ball57.update()
    ball57.draw(ctx)
    ball58.update()
    ball58.draw(ctx)
    ball59.update()
    ball59.draw(ctx)
    ball60.update()
    ball60.draw(ctx)
    ball61.update()
    ball61.draw(ctx)
    ball62.update()
    ball62.draw(ctx)
    ball63.update()
    ball63.draw(ctx)
    ball64.update()
    ball64.draw(ctx)
    ball65.update()
    ball65.draw(ctx)
    ball66.update()
    ball66.draw(ctx)
    ball67.update()
    ball67.draw(ctx)
    ball68.update()
    ball68.draw(ctx)
    ball69.update()
    ball69.draw(ctx)
    ball70.update()
    ball70.draw(ctx)
    ball71.update()
    ball71.draw(ctx)
    ball72.update()
    ball72.draw(ctx)
    ball73.update()
    ball73.draw(ctx)
    ball74.update()
    ball74.draw(ctx)
    ball75.update()
    ball75.draw(ctx)
    ball76.update()
    ball76.draw(ctx)
    ball77.update()
    ball77.draw(ctx)
    ball78.update()
    ball78.draw(ctx)
    ball79.update()
    ball79.draw(ctx)
    ball80.update()
    ball80.draw(ctx)
    ball81.update()
    ball81.draw(ctx)
    ball82.update()
    ball82.draw(ctx)
    ball83.update()
    ball83.draw(ctx)
    ball84.update()
    ball84.draw(ctx)
    ball85.update()
    ball85.draw(ctx)
    ball86.update()
    ball86.draw(ctx)
    ball87.update()
    ball87.draw(ctx)
    ball88.update()
    ball88.draw(ctx)
    ball89.update()
    ball89.draw(ctx)
    ball90.update()
    ball90.draw(ctx)
    ball91.update()
    ball91.draw(ctx)
    ball92.update()
    ball92.draw(ctx)
    ball93.update()
    ball93.draw(ctx)
    ball94.update()
    ball94.draw(ctx)
    ball95.update()
    ball95.draw(ctx)
    ball96.update()
    ball96.draw(ctx)
    ball97.update()
    ball97.draw(ctx)
    ball98.update()
    ball98.draw(ctx)
    ball99.update()
    ball99.draw(ctx)
    ball100.update()
    ball100.draw(ctx)
    score += ((
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
        ball11.speed.x/50+
        ball12.speed.x/50+
        ball13.speed.x/50+
        ball14.speed.x/50+
        ball15.speed.x/50+
        ball16.speed.x/50+
        ball17.speed.x/50+
        ball18.speed.x/50+
        ball19.speed.x/50+
        ball20.speed.x/50+
        ball21.speed.x/50+
        ball22.speed.x/50+
        ball23.speed.x/50+
        ball24.speed.x/50+
        ball25.speed.x/50+
        ball26.speed.x/50+
        ball27.speed.x/50+
        ball28.speed.x/50+
        ball29.speed.x/50+
        ball30.speed.x/50+
        ball31.speed.x/50+
        ball32.speed.x/50+
        ball33.speed.x/50+
        ball34.speed.x/50+
        ball35.speed.x/50+
        ball36.speed.x/50+
        ball37.speed.x/50+
        ball38.speed.x/50+
        ball39.speed.x/50+
        ball40.speed.x/50+
        ball41.speed.x/50+
        ball42.speed.x/50+
        ball43.speed.x/50+
        ball44.speed.x/50+
        ball45.speed.x/50+
        ball46.speed.x/50+
        ball47.speed.x/50+
        ball48.speed.x/50+
        ball49.speed.x/50+
        ball50.speed.x/50+
        ball51.speed.x/50+
        ball52.speed.x/50+
        ball53.speed.x/50+
        ball54.speed.x/50+
        ball55.speed.x/50+
        ball56.speed.x/50+
        ball57.speed.x/50+
        ball58.speed.x/50+
        ball59.speed.x/50+
        ball60.speed.x/50+
        ball61.speed.x/50+
        ball62.speed.x/50+
        ball63.speed.x/50+
        ball64.speed.x/50+
        ball65.speed.x/50+
        ball66.speed.x/50+
        ball67.speed.x/50+
        ball68.speed.x/50+
        ball69.speed.x/50+
        ball70.speed.x/50+
        ball71.speed.x/50+
        ball72.speed.x/50+
        ball73.speed.x/50+
        ball74.speed.x/50+
        ball75.speed.x/50+
        ball76.speed.x/50+
        ball77.speed.x/50+
        ball78.speed.x/50+
        ball79.speed.x/50+
        ball80.speed.x/50+
        ball81.speed.x/50+
        ball82.speed.x/50+
        ball83.speed.x/50+
        ball84.speed.x/50+
        ball85.speed.x/50+
        ball86.speed.x/50+
        ball87.speed.x/50+
        ball88.speed.x/50+
        ball89.speed.x/50+
        ball90.speed.x/50+
        ball91.speed.x/50+
        ball92.speed.x/50+
        ball93.speed.x/50+
        ball94.speed.x/50+
        ball95.speed.x/50+
        ball96.speed.x/50+
        ball97.speed.x/50+
        ball98.speed.x/50+
        ball99.speed.x/50+
        ball100.speed.x/50+
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
        ball11.speed.y/50+
        ball12.speed.y/50+
        ball13.speed.y/50+
        ball14.speed.y/50+
        ball15.speed.y/50+
        ball16.speed.y/50+
        ball17.speed.y/50+
        ball18.speed.y/50+
        ball19.speed.y/50+
        ball20.speed.y/50+
        ball21.speed.y/50+
        ball22.speed.y/50+
        ball23.speed.y/50+
        ball24.speed.y/50+
        ball25.speed.y/50+
        ball26.speed.y/50+
        ball27.speed.y/50+
        ball28.speed.y/50+
        ball29.speed.y/50+
        ball30.speed.y/50+
        ball31.speed.y/50+
        ball32.speed.y/50+
        ball33.speed.y/50+
        ball34.speed.y/50+
        ball35.speed.y/50+
        ball36.speed.y/50+
        ball37.speed.y/50+
        ball38.speed.y/50+
        ball39.speed.y/50+
        ball40.speed.y/50+
        ball41.speed.y/50+
        ball42.speed.y/50+
        ball43.speed.y/50+
        ball44.speed.y/50+
        ball45.speed.y/50+
        ball46.speed.y/50+
        ball47.speed.y/50+
        ball48.speed.y/50+
        ball49.speed.y/50+
        ball50.speed.y/50+
        ball51.speed.y/50+
        ball52.speed.y/50+
        ball53.speed.y/50+
        ball54.speed.y/50+
        ball55.speed.y/50+
        ball56.speed.y/50+
        ball57.speed.y/50+
        ball58.speed.y/50+
        ball59.speed.y/50+
        ball60.speed.y/50+
        ball61.speed.y/50+
        ball62.speed.y/50+
        ball63.speed.y/50+
        ball64.speed.y/50+
        ball65.speed.y/50+
        ball66.speed.y/50+
        ball67.speed.y/50+
        ball68.speed.y/50+
        ball69.speed.y/50+
        ball70.speed.y/50+
        ball71.speed.y/50+
        ball72.speed.y/50+
        ball73.speed.y/50+
        ball74.speed.y/50+
        ball75.speed.y/50+
        ball76.speed.y/50+
        ball77.speed.y/50+
        ball78.speed.y/50+
        ball79.speed.y/50+
        ball80.speed.y/50+
        ball81.speed.y/50+
        ball82.speed.y/50+
        ball83.speed.y/50+
        ball84.speed.y/50+
        ball85.speed.y/50+
        ball86.speed.y/50+
        ball87.speed.y/50+
        ball88.speed.y/50+
        ball89.speed.y/50+
        ball90.speed.y/50+
        ball91.speed.y/50+
        ball92.speed.y/50+
        ball93.speed.y/50+
        ball94.speed.y/50+
        ball95.speed.y/50+
        ball96.speed.y/50+
        ball97.speed.y/50+
        ball98.speed.y/50+
        ball99.speed.y/50+
        ball100.speed.y/50)/4)*3
        
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
        !ball10.dead&&
        !ball11.dead&&
        !ball12.dead&&
        !ball13.dead&&
        !ball14.dead&&
        !ball15.dead&&
        !ball16.dead&&
        !ball17.dead&&
        !ball18.dead&&
        !ball19.dead&&
        !ball20.dead&&
        !ball21.dead&&
        !ball22.dead&&
        !ball23.dead&&
        !ball24.dead&&
        !ball25.dead&&
        !ball26.dead&&
        !ball27.dead&&
        !ball28.dead&&
        !ball29.dead&&
        !ball30.dead&&
        !ball31.dead&&
        !ball32.dead&&
        !ball33.dead&&
        !ball34.dead&&
        !ball35.dead&&
        !ball36.dead&&
        !ball37.dead&&
        !ball38.dead&&
        !ball39.dead&&
        !ball40.dead&&
        !ball41.dead&&
        !ball42.dead&&
        !ball43.dead&&
        !ball44.dead&&
        !ball45.dead&&
        !ball46.dead&&
        !ball47.dead&&
        !ball48.dead&&
        !ball49.dead&&
        !ball50.dead&&
        !ball51.dead&&
        !ball52.dead&&
        !ball53.dead&&
        !ball54.dead&&
        !ball55.dead&&
        !ball56.dead&&
        !ball57.dead&&
        !ball58.dead&&
        !ball59.dead&&
        !ball60.dead&&
        !ball61.dead&&
        !ball62.dead&&
        !ball63.dead&&
        !ball64.dead&&
        !ball65.dead&&
        !ball66.dead&&
        !ball67.dead&&
        !ball68.dead&&
        !ball69.dead&&
        !ball70.dead&&
        !ball71.dead&&
        !ball72.dead&&
        !ball73.dead&&
        !ball74.dead&&
        !ball75.dead&&
        !ball76.dead&&
        !ball77.dead&&
        !ball78.dead&&
        !ball79.dead&&
        !ball80.dead&&
        !ball81.dead&&
        !ball82.dead&&
        !ball83.dead&&
        !ball84.dead&&
        !ball85.dead&&
        !ball86.dead&&
        !ball87.dead&&
        !ball88.dead&&
        !ball89.dead&&
        !ball90.dead&&
        !ball91.dead&&
        !ball92.dead&&
        !ball93.dead&&
        !ball94.dead&&
        !ball95.dead&&
        !ball96.dead&&
        !ball97.dead&&
        !ball98.dead&&
        !ball99.dead&&
        !ball100.dead)
        requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)