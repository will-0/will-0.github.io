const precourse=[
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
var i
var j
var f
for(j=0;j<precourse.length;j++){
    for(i=0;i<5;i++){
        precourse[j].push(0)
    }
}
let blpr=[19,19,19,19,19,5]
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
const GAME_LENGTH=500
const GAME_SPEED=-5
function random_map(){
    rn=0
    for(i=0;i<rn+10;i++){
        precourse[i].push(rn-(i))
    }
    for(j=0;j<GAME_LENGTH;j++){
        rnp=Math.floor(Math.random()*100)
        if(rnp<=blpr[0]){
            block=0
        }
        if(rnp>blpr[0]){
            if(rnp<=blpr[0]+blpr[1]){
                block=1
            }
        }
        if(rnp>blpr[0]+blpr[1]){
            if(rnp<=blpr[0]+blpr[1]+blpr[2])
            block=2
        }
        if(rnp>blpr[0]+blpr[1]+blpr[2]){
            if(rnp<=blpr[0]+blpr[1]+blpr[2]+blpr[3])
            block=3
        }
        if(rnp>blpr[0]+blpr[1]+blpr[2]+blpr[3]){
            if(rnp<=blpr[0]+blpr[1]+blpr[2]+blpr[3]+blpr[4])
            block=4
        }
        if(rnp>blpr[0]+blpr[1]+blpr[2]+blpr[3]+blpr[4]){
            if(rnp<=blpr[0]+blpr[1]+blpr[2]+blpr[3]+blpr[4]+blpr[5])
            block=5
        }
        switch(block){
            case 0:
                rnpa=2
                break;
            case 1:
                rnpa=1
                break;
            case 2:
                rnpa=0
                break;
            case 3:
                rnpa=-2
                break;
            case 4:
                rnpa=-4
                break;
            case 5:
                rnpa=-4
                break;
        }
        rn+=rnpa
        while(rn<0){
            rn++
        }
        while(rn>9){
            rn--
        }
        f=0
        while(f<rn+1){
            precourse[f].push(rn-f)
            f++
        }
        f=0
        while(f<rn+1){
            precourse[f].push(rn-f)
            f++
        }

    }
}
let x = 0
random_map()

console.log(precourse[0].length)
function ca(){
    for(s=0;i<16;i++){
        precourse[0].push(12)
    }
}
ca()
console.table(precourse)
const GAME_WIDTH=800
const GAME_HEIGHT=600
let lasers = []
let bullets = []
const course=[
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
const who=[
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
obs=[
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
class Handler{
    constructor() {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 32:
                    dodger1.jump()
                    break
                case 27:
                    dead=true
                    break;
            }
        });
    }
}
class ob{
    constructor(gameWidth,gameHeight,os,sped) {
        this.size=os;
        this.floor=gameHeight-this.size
        this.gamewidth=gameWidth
        this.gameheight=gameHeight
        this.freq=this.gameheight/this.size
        this.mid=this.size/2
        this.dead=false
        this.startwall=this.gamewidth-this.size
        this.kill=false
        this.position={
            x:this.startwall,
            y:0
        }
        this.speed=sped
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
        //hit detection
        //floor reset detection
    }
}
class dodger{
    constructor(gameWidth,gameHeight,wall) {
        this.wall=wall
        this.size=50;
        this.maxSpeed=10;
        this.weeee=18
        this.speed=0
        this.floor=gameHeight-this.size
        this.upspeed=0
        this.onfloor=true
        this.accel=1
        this.mid=this.size/2
        this.minus=false
        this.acceleration=0
        this.position = {
            x: gameWidth / 2 - this.size / 2,
            y: gameHeight-this.size
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
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    jump(){
        if(this.onfloor){
            this.upspeed = this.weeee
            this.acceleration=this.accel
            this.onfloor=false
        }
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
            this.upspeed=0
            this.onfloor=true
        }
        if (this.position.y<0){
            this.position.y = 0
            this.upspeed=0
        }
        for(i=0;i<obs.length;i++){
            obs[i].forEach(ob => {
                //floor
                if(ob.position.y<(this.position.y+this.size)){
                    if(this.position.y + this.size<ob.position.y+ob.mid){
                        if(ob.position.x+ob.size > this.position.x+this.size){
                            if(this.position.x+this.size>ob.position.x){
                                this.position.y=ob.position.y-ob.size
                                this.onfloor=true
                                this.upspeed=0
                            }
                        }
                    }
                }
                if(ob.position.y<(this.position.y)){
                    if(this.position.y<ob.position.y+ob.mid){
                        if(ob.position.x+ob.size > this.position.x+this.size){
                            if(this.position.x+this.size>ob.position.x){
                                this.position.y=ob.position.y-ob.size
                                this.onfloor=true
                                this.upspeed=0
                            }
                        }
                    }
                }
                if(ob.position.y<(this.position.y)){
                    if(this.position.y<ob.position.y+ob.mid){
                        if(ob.position.x+ob.size > this.position.x){
                            if(this.position.x>ob.position.x){
                                this.position.y=ob.position.y-ob.size
                                this.onfloor=true
                                this.upspeed=0
                            }
                        }
                    }
                }
                if(ob.position.y<(this.position.y+this.size)){
                    if(this.position.y+this.size<ob.position.y+ob.mid){
                        if(ob.position.x+ob.size > this.position.x){
                            if(this.position.x>ob.position.x){
                                //bottom left
                                this.position.y=ob.position.y-ob.size
                                this.onfloor=true
                                this.upspeed=0
                            }
                        }
                    }
                }
                if(ob.position.y<(this.position.y+this.mid)){
                    if(this.position.y + this.mid<ob.position.y+ob.mid){
                        if(ob.position.x+ob.size > this.position.x+this.mid){
                            if(this.position.x+this.mid>ob.position.x){
                                //middle
                                this.position.y=ob.position.y-ob.size
                                this.onfloor=true
                                this.upspeed=0
                            }
                        }
                    }
                }
                //kill
                if(ob.position.y+ob.mid<(this.position.y+this.size)){
                    if(this.position.y + this.size<ob.position.y+ob.size){
                        if(ob.position.x+ob.size > this.position.x+this.size){
                            if(this.position.x+this.size>ob.position.x){
                                dead=true
                            }
                        }
                    }
                }
                if(ob.position.y+ob.mid<(this.position.y)){
                    if(this.position.y<ob.position.y+ob.size){
                        if(ob.position.x+ob.size > this.position.x+this.size){
                            if(this.position.x+this.size>ob.position.x){
                                dead=true
                            }
                        }
                    }
                }
                if(ob.position.y+ob.mid<(this.position.y)){
                    if(this.position.y<ob.position.y+ob.size){
                        if(ob.position.x+ob.size > this.position.x){
                            if(this.position.x>ob.position.x){
                                dead=true
                            }
                        }
                    }
                }
                if(ob.position.y+ob.mid<(this.position.y+this.size)){
                    if(this.position.y+this.size<ob.position.y+ob.size){
                        if(ob.position.x+ob.size > this.position.x){
                            if(this.position.x>ob.position.x){
                                //bottom left
                                dead=true
                            }
                        }
                    }
                }
                if(ob.position.y+ob.mid<=(this.position.y+this.mid)){
                    if(this.position.y + this.mid<=ob.position.y+ob.size){
                        if(ob.position.x+ob.size >= this.position.x+this.size){
                            if(this.position.x+this.size>=ob.position.x){
                                //middle
                                dead=true
                            }
                        }
                    }
                }
            })
        }
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.size > 800) this.position.x = 800 - this.size;
    }

}
let score=0
let objsize = 50
let test=false
let roller=[0,0,0,0,0,0,0,0,0,0,0,0]
dodger1 = new dodger(GAME_WIDTH,GAME_HEIGHT,objsize)
new Handler(dodger1);
let timer=0
let dead=false
let obupdate=0
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
function ptc(){
    for(j=0;j<precourse.length;j++){
        for(i=0;i<precourse[j].length;i++){
            if(precourse[j][i]<100){
                course[j].push(precourse[j][i])
                who[j].push(0)
            }
        }
    }
}

ptc()
function ob_maker(){
    for(j=0;j<course.length;j++){
        for(i=0;i<course[j].length;i++){
            if(who[j][i]==0){
                let new_bullet = new ob(GAME_WIDTH,GAME_HEIGHT,objsize,GAME_SPEED)
                obs[j].push(new_bullet)
            }
        }
    }
}
dodger1.defor()
ob_maker()
console.table(course)

let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    for(j=0;j<course.length;j++){
        for(r=0;r<course[j].length;r++){
            if(!obs[j][r].kill){
                if(obupdate>r*objsize/-GAME_SPEED){
                    obs[j][r].draw(ctx,course[j][roller[j]])
                    if(obs[j][r].position.x==obs[j][r].startwall){
                        roller[j]++
                    }
                    obs[j][r].update(deltaTime)
                }
            }
        }
    }
    dodger1.update(deltaTime);
    dodger1.draw(ctx);
    bullets.forEach(element => {
        element.update()
        element.draw(ctx)
    })
    timer = timer + 1
    if(!dead){
        if(roller[0]<course[0].length){
            requestAnimationFrame(gameloop)
        }
        else{
            console.log('level complete')
            console.log('your sore is ',score)
        }
    }
    else{
        console.log('u dead')
    }
    obupdate++
}
gameloop()