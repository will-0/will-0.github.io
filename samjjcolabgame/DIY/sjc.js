end=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    if(!dead){
        end=0
        if(roller[0]<course[0].length){
            ctx.clearRect(0,0,800,600);
            for(j=0;j<course.length;j++){
                for(r=0;r<course[j].length;r++){
                    if(!obs[j][r].kill){
                        if(obupdate>r*objsize/2){
                            obs[j][r].draw(ctx)
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
            lasers.forEach(element => {
                element.update()
                element.draw(ctx)
            })
            laseroos.forEach(element => {
                element.update()
                element.draw(ctx)
            })
            laseras.forEach(element => {
                element.update()
                element.draw(ctx)
            })
            timer = timer + 1
        }
        else{
            console.log('end of game')
            dead=true
        }
    }
    else{
        end++
        console.log('u dead')
        if(end>5000){
            kill=true
        }
    }
    if(!kill){
        requestAnimationFrame(gameloop)
    }
    else{
        con=prompt('gamecode has paused to prevent computer damage do not worry if you want to continue press y',"y")
        if(con=='y'){
            kill=false
            end=0
            requestAnimationFrame(gameloop)
        }
    }
    obupdate++
}
function ob_maker(){
    for(j=0;j<course.length;j++){
        for(i=0;i<course[j].length;i++){
            if(who[j][i]==0){
                let new_bullet = new ob(GAME_WIDTH,GAME_HEIGHT,objsize,course[j][i])
                obs[j].push(new_bullet)
            }
            if(who[j][i]==1){
                let new_bullet = new bob(GAME_WIDTH,GAME_HEIGHT,objsize,course[j][i])
                obs[j].push(new_bullet)
            }
            if(who[j][i]==2){
                let new_bullet = new fob(GAME_WIDTH,GAME_HEIGHT,objsize,course[j][i])
                obs[j].push(new_bullet)
            }
            if(who[j][i]==3){
                let new_bullet = new yob(GAME_WIDTH,GAME_HEIGHT,objsize,course[j][i])
                obs[j].push(new_bullet)
            }
            if(who[j][i]==4){
                let new_bullet = new dob(GAME_WIDTH,GAME_HEIGHT,objsize,course[j][i])
                obs[j].push(new_bullet)
            }
        }
    }
}
function ptc(){
    for(j=0;j<precourse.length;j++){
        for(i=0;i<precourse[j].length;i++){
            if(precourse[j][i]<100){
                course[j].push(precourse[j][i])
                who[j].push(0)
            }
            if(precourse[j][i]>99 && 199>precourse[j][i]){
                course[j].push(precourse[j][i]-100)
                who[j].push(1)
            }
            if(precourse[j][i]>199 && 299>precourse[j][i]){
                course[j].push(precourse[j][i]-200)
                who[j].push(2)
            }
            if(precourse[j][i]>299 && 399>precourse[j][i]){
                course[j].push(precourse[j][i]-300)
                who[j].push(3)
            }
            if(precourse[j][i]>399 && 499>precourse[j][i]){
                course[j].push(precourse[j][i]-400)
                who[j].push(4)
            }
        }
    }
}
class laser{
    constructor(gamewidth,gameheight,x,y,fx,fy,fs){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = {
            x:x,
            y:y
        }
        this.width=10;
        this.height=10;
        this.position = {
            x:(fx + (fs/2)),
            y:(fy + (fs/2))
        }
    }
    draw(ctx){
        ctx.fillStyle = '#00FF00'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.position.y += this.speed.y;
        this.position.x += this.speed.x; 
    }
}
class Bullet{
    constructor(gamewidth,gameheight,x,y){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = {
            x:x,
            y:y
        }
        this.width=10;
        this.height=10;
        this.position = {
            x:(dodger1.position.x + (dodger1.size/2)),
            y:(dodger1.position.y + (dodger1.size/2))
        }
    }
    draw(ctx){
        
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;
        
    }
}
class Handler{
    constructor() {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger1.moveLeft()
                    break
                case 39:
                    dodger1.moveRight()
                    break
                case 32:
                    dodger1.shoot()
                    break
                case 38:
                    dodger1.moveup()
                    break
                case 40:
                    dodger1.movedown()
                    break
                case 82:
                    roller=[0,0,0,0,0,0,0,0,0,0,0,0]
                    obupdate=0
                    resurection()
                    dodger1.position.x=50
                    dodger1.position.y=225
                    break
                case 69:
                    kill=true
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(dodger1.speed.x < 0)
                        dodger1.stopx()
                    break
                
                case 39:
                    if(dodger1.speed.x > 0)
                        dodger1.stopx()
                    break              
                case 38:
                    if(dodger1.speed.y<0){
                        dodger1.stopy()
                    }
                    break
                
                case 40:
                    if(dodger1.speed.y>0){
                        dodger1.stopy()
                    }
                    break
            }
        });

    }
}
class ob{
    constructor(gameWidth,gameHeight,os,y) {
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
            y:this.floor-y*this.size
        }
        this.speed=-2
    }
    draw(ctx) {
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
class bob{
    constructor(gameWidth,gameHeight,os,y) {
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
            y:this.floor-y*this.size
        }
        this.speed=-2
    }
    draw(ctx) {
        // console.log('d')
        ctx.fillStyle = '#f0f'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        bullets.forEach(bullet => {
            if(this.position.y < bullet.position.y){
                if(bullet.position.y < this.position.y + this.size){
                    if(this.position.x < bullet.position.x){
                        if(bullet.position.x < this.position.x + this.size){
                            console.log('well done')
                            score = score + 40
                            this.kill = true
                        }
                    }
                }
            }
        })
        //hit detection
        //floor reset detection
    }
}
class fob{
    constructor(gameheight,gamewidth,os){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:750,y:dodger1.position.y}
        this.size=os
        this.kill = false
        this.maxSpeed=-2
    }
    draw(ctx){
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size,this.maxSpeed)
    }
    cannon(){
        let new_laser = new laser(GAME_WIDTH,GAME_HEIGHT,-10,0,this.position.x,this.position.y,this.size)
        lasers.push(new_laser)
    }
    update() {
        if(dodger1.position.y - dodger1.size < this.position.y){
            if(this.position.y < dodger1.position.y + dodger1.size){
                if(dodger1.position.x - dodger1.size < this.position.x){
                    if(this.position.x < dodger1.position.x + dodger1.size){
                        console.log('your dead ha!!!!!!!!')
                        dead=true
                    }
                }
            }
        }
        bullets.forEach(bullet => {
            if(this.position.y < bullet.position.y){
                if(bullet.position.y < this.position.y + this.size){
                    if(this.position.x < bullet.position.x){
                        if(bullet.position.x < this.position.x + this.size){
                            console.log('(well done)')
                            score = score + 40
                            this.kill = true
                        }
                    }
                }
            }
        })
        // if(timer == Math.floor((Math.random() * 35) + 1)){
        //     this.cannon()
        // }
        if(timer%30==0){
            this.cannon()
        }
        this.position.x+=this.maxSpeed
        this.position.y=dodger1.position.y
    }

}
class yob{
    constructor(gameWidth,gameHeight,os,y) {
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
            y:this.floor-y*this.size
        }
        this.speed=-2
    }
    draw(ctx){
        // console.log('d')
        ctx.fillStyle = '#ff0'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    cannono(){
        let new_laseroo = new laseroo(GAME_WIDTH,GAME_HEIGHT,-2,-10,this.position.x,this.position.y,this.size)
        laseroos.push(new_laseroo)
    }
    cannono1(){
        let new_laseroo = new laseroo(GAME_WIDTH,GAME_HEIGHT,-2,10,this.position.x,this.position.y,this.size)
        laseroos.push(new_laseroo)
    }
    update() {
        if(dodger1.position.y - dodger1.size < this.position.y){
            if(this.position.y < dodger1.position.y + dodger1.size){
                if(dodger1.position.x - dodger1.size < this.position.x){
                    if(this.position.x < dodger1.position.x + dodger1.size){
                        console.log('your dead ha!!!!!!!!')
                        dead=true
                    }
                }
            }
        }
        bullets.forEach(bullet => {
            if(this.position.y < bullet.position.y){
                if(bullet.position.y < this.position.y + this.size){
                    if(this.position.x < bullet.position.x){
                        if(bullet.position.x < this.position.x + this.size){
                            console.log('well done')
                            score = score + 40
                            this.kill = true
                        }
                    }
                }
            }
        })
        this.position.x+=this.speed
        if(timer%30==0){
            this.cannono()
            this.cannono1()
        }
    }

}
class dob{
    constructor(gameWidth,gameHeight,os,y) {
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
            y:this.floor-y*this.size
        }
        this.speed=-2
    }
    draw(ctx) {
        // console.log('d')
        ctx.fillStyle = '#0ff'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    cannona1(){
        let new_lasera = new lasera(GAME_WIDTH,GAME_HEIGHT,-10,-10,this.position.x,this.position.y,this.size)
        laseras.push(new_lasera)
    }
    cannona2(){
        let new_lasera = new lasera(GAME_WIDTH,GAME_HEIGHT,-10,10,this.position.x,this.position.y,this.size)
        laseras.push(new_lasera)
    }
    update() {
        if(dodger1.position.y - dodger1.size < this.position.y){
            if(this.position.y < dodger1.position.y + dodger1.size){
                if(dodger1.position.x - dodger1.size < this.position.x){
                    if(this.position.x < dodger1.position.x + dodger1.size){
                        console.log('your dead ha!!!!!!!!')
                        dead=true
                    }
                }
            }
        }
        bullets.forEach(bullet => {
            if(this.position.y < bullet.position.y){
                if(bullet.position.y < this.position.y + this.size){
                    if(this.position.x < bullet.position.x){
                        if(bullet.position.x < this.position.x + this.size){
                            console.log('well done')
                            score = score + 40
                            this.kill = true
                        }
                    }
                }
            }
        })
        this.position.x+=this.speed
        if(timer%30==0){
            this.cannona1()
            this.cannona2()
        }
    }

}
class dodger{
    constructor(gamewidth,gameheight,os){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:350,y:50}
        this.speed={x:0,y:0}
        this.size=os
        this.maxSpeed=7
    }
    draw(ctx){
        ctx.fillStyle = '#00f'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    moveRight(){
        this.speed.x = this.maxSpeed
    }
    moveLeft(){
        this.speed.x = -this.maxSpeed
    }
    moveup(){
        this.speed.y = -this.maxSpeed
    }
    movedown(){
        this.speed.y = this.maxSpeed
    }
    shoot(){
        score = score - 5
        let new_bullet = new Bullet(GAME_WIDTH,GAME_HEIGHT,10,0)
        bullets.push(new_bullet)
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    update(deltaTime) {
        lasers.forEach(laser => {
            if(this.position.y < laser.position.y){
                if(laser.position.y < this.position.y + this.size){
                    if(this.position.x < laser.position.x){
                        if(laser.position.x < this.position.x + this.size){
                            dead = true
                        }
                    }
                }
            }
        })
        laseroos.forEach(laser => {
            if(this.position.y < laser.position.y){
                if(laser.position.y < this.position.y + this.size){
                    if(this.position.x < laser.position.x){
                        if(laser.position.x < this.position.x + this.size){
                            dead = true
                        }
                    }
                }
            }
        })
        laseras.forEach(laser => {
            if(this.position.y < laser.position.y){
                if(laser.position.y < this.position.y + this.size){
                    if(this.position.x < laser.position.x){
                        if(laser.position.x < this.position.x + this.size){
                            dead = true
                        }
                    }
                }
            }
        })
        for(i=0;i<obs.length;i++){
            obs[i].forEach(ob => {
                if(this.position.y-this.size < ob.position.y){
                    if(ob.position.y < this.position.y + this.size){
                        if(this.position.x-this.size < ob.position.x){
                            if(ob.position.x < this.position.x + this.size){
                                dead = true
                            }
                        }
                    }
                }
            })
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(!deltaTime);
        if(this.position.x<=0){
            dead=true
        }
        if(this.position.x + this.size >= this.gamewidth){
            dead=true
        }
        if(this.position.y<=0){
            dead=true
        }
        if(this.position.y>=this.gameheight-this.size){
            dead=true
        }
    }

}
class laseroo{
    constructor(gamewidth,gameheight,x,y,fx,fy,fs){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = {
            x:x,
            y:y
        }
        this.width=10;
        this.height=10;
        this.position = {
            x:(fx + (fs/2)),
            y:(fy + (fs/2))
        }
    }
    draw(ctx){
        ctx.fillStyle = '#00FF00'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.position.y += this.speed.y;
        this.position.x += this.speed.x; 
    }
}
class lasera{
    constructor(gamewidth,gameheight,x,y,fx,fy,fs){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = {
            x:x,
            y:y
        }
        this.width=10;
        this.height=10;
        this.position = {
            x:(fx + (fs/2)),
            y:(fy + (fs/2))
        }
    }
    draw(ctx){
        ctx.fillStyle = '#00FF00'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.position.y += this.speed.y;
        this.position.x += this.speed.x; 
    }
}
function ca(){
    for(i=0;i<16;i++){
        precourse[0].push(12)
    }
}
function random_map(inar){
    for(j=0;j<GAME_LENGTH;j++){
        blockp=Math.floor(Math.random() * 1000)
        if(blockp<=blpr[0]){
            block=0
        }
        if(blockp>blpr[0]){
            if(blockp<=blpr[0]+blpr[1]){
                block=1
            }
        }
        if(blockp>blpr[0]+blpr[1]){
            if(blockp<=blpr[0]+blpr[1]+blpr[2])
            block=2
        }
        if(blockp>blpr[0]+blpr[1]+blpr[2]){
            if(blockp<=blpr[0]+blpr[1]+blpr[2]+blpr[3])
            block=3
        }
        if(blockp>blpr[0]+blpr[1]+blpr[2]+blpr[3]){
            if(blockp<=blpr[0]+blpr[1]+blpr[2]+blpr[3]+blpr[4])
            block=4
        }
        rn=Math.floor(Math.random() * 12)+block*12
        for(i=0;i<5;i++){
            switch(rn-i*12){
                case 0:
                    precourse[inar].push(0+i*100)
                    break;
                case 1:
                    precourse[inar].push(1+i*100)
                    break;
                case 2:
                    precourse[inar].push(2+i*100)
                    break;
                case 3:
                    precourse[inar].push(3+i*100)
                    break;
                case 4:
                    precourse[inar].push(4+i*100)
                    break;
                case 5:
                    precourse[inar].push(5+i*100)
                    break;
                case 6:
                    precourse[inar].push(6+i*100)
                    break;
                case 7:
                    precourse[inar].push(7+i*100)
                    break;
                case 8:
                    precourse[inar].push(8+i*100)
                    break;
                case 9:
                    precourse[inar].push(9+i*100)
                    break;
                case 10:
                    precourse[inar].push(10+i*100)
                    break;
                case 11:
                    precourse[inar].push(11+i*100)
                    break;
            }
        }
    }
}
function diffr(){
    hr=0
    for(j=0;j<who.length;j++){
        for(i=0;i<who[j].length;i++){
            switch(who[j][i]){
                case 0:
                    hr+=2
                    break;
                case 1:
                    hr++
                    break;
                case 2:
                    hr+=10
                    break;
                case 3:
                    hr+=5
                    break;
                case 4:
                    hr+=3
                    break;
            }
        }
    }
    hr=hr*bpvc
    return hr
}
function checker(arr){
    counter=0
    for(i=0;i<arr.length;i++){
        counter+=arr[i]
    }
    if(counter!=1000){
        alert('ERROR: blpr does not add up to 100%')
    }
}
function dtpc(code,arr){
    console.log('your inputed code was ' + code)
    for(i=0;i<code.length;i++){
        for(j=0;j<10;j++){
            if(code[i]==numbers[j]){
                arr.push(j)
            }
            if(code[i]==alpha100[j]){
                arr.push(j+100)
            }
            if(code[i]==alpha200[j]){
                arr.push(j+200)
            }
            if(code[i]==alpha300[j]){
                arr.push(j+300)
            }
            if(code[i]==alpha400[j]){
                arr.push(j+400)
            }
        }
    }
}
function resurection(){
    for(i=0;i<obs.length;i++){
        for(j=0;j<obs[i].length;j++){
            obs[i][j].kill=false
            obs[i][j].position.x=800
        }
    }
    dead=false
}
//actual game code


let precourse=[
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12],
    [12,12]
]
numbers=[0,1,2,3,4,5,6,7,8,9]
alpha100='ABCDEFGHIJ'
alpha200='KLMNOPQRST'
alpha300='abcdefghij'
alpha400='klmnopqrst'
let bpvc=parseInt(document.getElementById("output").textContent)
for(r=0;r<bpvc;r++){
    dtpc(document.getElementById(r).value,precourse[r])
}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
let laseroos = []
let laseras = []
let GAME_LENGTH=1000
let x = 0
ca()
let GAME_WIDTH=800
let GAME_HEIGHT=500
let lasers = []
let bullets = []
let course=[
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
let who=[
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
let kill=false
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
ptc()
ob_maker()
console.log('the difficulty rating of this level is ',diffr())
let lastTime = 0
gameloop()