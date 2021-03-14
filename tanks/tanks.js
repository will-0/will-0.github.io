const GAME_WIDTH=800
const GAME_HEIGHT=600
terr=[]
let bullets=[]
let obs=[]
kill=false
const pixels=2
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
function BOOM(pos,brad){
    for(i=0;i<brad/pixels;i++){
        obs.forEach(ob => {
            let dist=Math.sqrt(Math.pow(ob.position.x-pos.x,2)+Math.pow(ob.position.y-pos.y,2))
            if((brad-2*brad)<dist&&dist<brad){
                ob.position.y+=pixels
            }
            else{
                brad2=brad
                let dist1=ob.position.y-pos.y
                let dist2=ob.position.x-pos.x
                if((brad2-2*brad2)<dist2&&dist2<brad2&&dist1<0){
                    ob.position.y=pos.y
                }
            }
        })
    }
    let dist10=Math.sqrt(Math.pow(pos.x-tank1.position.x,2)+Math.pow(pos.y-tank1.position.y,2))
    let dist20=Math.sqrt(Math.pow(pos.x-tank2.position.x,2)+Math.pow(pos.y-tank2.position.y,2))
    if((brad-2*brad)<dist10&&dist10<brad){
        tank1.health-=(brad-dist10)
    }
    if((brad-2*brad)<dist20&&dist20<brad){
        tank2.health-=(brad-dist20)
    }
}
function angularmov(ang,speed){
    rang=ang*(Math.PI/180)
    xymot={
        x:0,
        y:0
    }
    xymot.y=speed*Math.sin(rang)
    xymot.x=speed*Math.cos(rang)
    return xymot
}
function drawline(origin,ang,length){
    for(i=0;i<length;i++){
        pos=angularmov(ang,i)
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,pixels,pixels)
    }
}
function accel_change(pos,accel,r){
    n=0
    if(50<pos && pos<150){
        //console.log("low")
        switch(r){
            case 0:
                n=accel+1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel-0.3
                break
        }
    }
    else if(250>pos && pos>150){
        //console.log("high")
        switch(r){
            case 0:
                n=accel-1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel+0.3
                break
        }
    }
    else if(pos>250){
        //console.log("VERY HIGH")
        switch(r){
            case 0:
                n=accel-1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel
                break
        }
    }
    else if(pos<50){
        //console.log("VERY LOW")
        switch(r){
            case 0:
                n=accel+1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel
                break
        }
    }
    else{
        //console.log("normal")
        switch(r){
            case 0:
                n=accel+1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel-1
                break
        }
    }
    if(n>8 || n<-8){
        n=n/2
    }
    return n
}
function fillcircle2(pos,rad,ac){
    ctx.fillRect(pos.x,pos.y,ac,ac)
    for(x=0;x<2*rad;x+=ac){
        for(y=0;y<2*rad;y+=ac){
            if(Math.floor(Math.sqrt(Math.pow(rad,2)-Math.pow(y,2)))>=x){
                ctx.fillRect(Math.floor(x+pos.x),Math.floor(y+pos.y),ac,ac)
                ctx.fillRect(Math.floor(pos.x-x),Math.floor(pos.y+y),ac,ac)
                ctx.fillRect(Math.floor(pos.x-x),Math.floor(pos.y-y),ac,ac)
                ctx.fillRect(Math.floor(pos.x+x),Math.floor(pos.y-y),ac,ac)
            }
        }
    }
}
class dirt{
    constructor(x,y,os){
        this.width=os;
        this.height=y*os+pixels
        this.floor=GAME_HEIGHT-os
        this.gamewidth=GAME_WIDTH
        this.gameheight=GAME_HEIGHT
        this.position={
            x:x,
            y:this.floor-y*os
        }
    }
    draw(ctx){
        ctx.fillStyle = '#000'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
function random_map(){
    levs=GAME_HEIGHT/pixels
    reps=GAME_WIDTH/pixels
    terr=[Math.floor(Math.random()*(levs/3))+levs/3]
    accel=0
    sped=0
    for(i=1;i<reps;i++){
        prev=terr[i-1]
        r=Math.floor(Math.random()*3)
        sped=accel_change(prev,sped,r,levs)
        terr.push(prev+sped/3)
    }
}
function ob_maker(){
    for(i=0;i<terr.length;i++){
        let new_bullet = new dirt(i*pixels,terr[i],pixels)
        obs.push(new_bullet)
    }
}
class Handler{
    constructor() {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    if(turn1){
                        if(tank1.dist>0){
                            tank1.terrnum--
                            tank1.dist--
                        }
                    }
                    else{
                        if(tank2.dist>0){
                            tank2.terrnum--
                            tank2.dist--
                        }
                    }
                    //console.log("move left")
                    break;
                case 39:
                    if(turn1){
                        if(tank1.dist>0){
                            tank1.terrnum++
                            tank1.dist--
                        }
                    }
                    else{
                        if(tank1.dist>0){
                            tank2.terrnum++
                            tank2.dist--
                        }
                    }
                    //console.log('move right')
                    break;
                case 38:
                    if(turn1){
                        tank1.ang--
                    }
                    else{
                        tank2.ang++
                    }
                    break
                case 40:
                    if(turn1){
                        tank1.ang++
                    }
                    else{
                        tank2.ang--
                    }
                    break
                case 32:
                    if(turn1){
                        tank1.fire()
                        turn1=false
                        tank1.dist=100
                    }
                    else{
                        tank2.fire()
                        turn1=true
                        tank2.dist=100
                    }
                    break
                case 190:
                    if(turn1){
                        tank1.shlength++
                    }
                    else{
                        tank2.shlength++
                    }
                    break
                case 188:
                    if(turn1){
                        tank1.shlength--
                    }
                    else{
                        tank2.shlength--
                    }
                    break
            }
        });

    }
}
class tank{
    constructor(terrnum,ang,one){
        this.size=10
        this.floor=GAME_HEIGHT-pixels
        this.position={
            x:terrnum*pixels,
            y:obs[terrnum].position.y
        }
        this.dist=100
        this.one=one
        this.health=100
        this.ang=ang
        this.shlength=100
        console.log(this.position)
        this.terrnum=terrnum
    }
    draw(ctx) {
        if(this.one){
            ctx.fillStyle = '#0ff'
        }
        else{
            ctx.fillStyle = '#f0f'
        }
        fillcircle2(this.position,this.size,1)
        drawline(this.position,this.ang,this.shlength)
        if(this.one){
            ctx.fillStyle="#000"
            ctx.fillRect(0,0,100*2,10)
            ctx.fillStyle="#0ff"
            ctx.fillRect(0,0,this.health*2,10)
        }
        else{
            ctx.fillStyle="#000"
            ctx.fillRect(GAME_WIDTH-100*2,0,100*2,10)
            ctx.fillStyle="#0ff"
            ctx.fillRect(GAME_WIDTH-this.health*2,0,this.health*2,10)
        }
        if(this.one){
            ctx.fillStyle="#000"
            ctx.fillRect(0,10,100*2,10)
            ctx.fillStyle="#0f0"
            ctx.fillRect(0,10,this.dist*2,10)
        }
        else{
            ctx.fillStyle="#000"
            ctx.fillRect(GAME_WIDTH-100*2,10,100*2,10)
            ctx.fillStyle="#0f0"
            ctx.fillRect(GAME_WIDTH-this.dist*2,10,this.dist*2,10)
        }
        
    }
    fire(){
        let fireang = angularmov(360-this.ang,this.shlength/10)
        let temppos = {
            x:this.position.x+fireang.x,
            y:this.position.y-fireang.y
        }
        let new_bullet = new bullet(GAME_WIDTH,GAME_HEIGHT,fireang.y,fireang.x,temppos)
        bullets.push(new_bullet)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        if(this.terrnum>0 && this.terrnum<GAME_WIDTH/2){
            if(obs[this.terrnum].position.y<this.floor){
                this.position={
                    x:this.terrnum*pixels,
                    y:obs[this.terrnum].position.y
                }
            }
            else{
                this.position={
                    x:this.terrnum*pixels,
                    y:this.floor
                }
            }
        }
        if(this.health<0){
            kill=true
        }
    }
}
class bullet{
    constructor(gameWidth,gameHeight,yveloc,xveloc,pos) {
        this.width=10;
        this.reverb=false
        this.height=10;
        this.maxSpeed=10;
        this.weeee=20
        this.speed=xveloc
        this.floor=gameHeight-this.height
        this.upspeed=yveloc
        this.accel=1
        this.minus=false
        this.acceleration=0.25
        this.bounce=2
        this.rounder=2
        this.position = pos
        this.dead=false
    }
    draw(ctx) {
        ctx.fillStyle = '#0ff'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed;
        this.position.y -= this.upspeed
        this.upspeed -= this.acceleration
        obs.forEach(obj => {
            if(obj.position.y < this.position.y){
                if(this.position.y < obj.position.y + obj.height){
                    if(obj.position.x < this.position.x){
                        if(this.position.x < obj.position.x + obj.width){
                            BOOM(this.position,20)
                            this.dead=true
                        }
                    }
                }
            }
        })
        if(this.position.x<0){
            this.dead=true
            BOOM(this.position,20)
        }
        if(this.position.x + this.width > 800){
            this.dead=true;
            BOOM(this.position,20)
        }
    }
}
let turn1=true
random_map()
ob_maker()
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')


tank1 = new tank(10,315,true)
tank2 = new tank(390,225,false)
new Handler()
let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    tank1.draw(ctx)
    tank1.update(deltaTime)
    tank2.draw(ctx)
    tank2.update(deltaTime)
    
    bullets.forEach(b => {
        if(!b.dead){
            b.draw(ctx)
            b.update(deltaTime)
        }
    })
    obs.forEach(ob => {
        ob.draw(ctx)
    })
    if(!kill){
        requestAnimationFrame(gameloop)
    }
    
}
gameloop()