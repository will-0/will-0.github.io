const GAME_WIDTH=800
const GAME_HEIGHT=600
terr=[]
let bullets=[]
let obs=[]
kill=false
let scr=0
let fst=true
const pixels=4
function WORLDBOOM(){
    ctx.clearRect(0,0,800,600);
    let image = document.getElementById("boom")
    ctx.drawImage(image,0,0,GAME_WIDTH,GAME_HEIGHT)
}
function YOU_DEAD_BOIIIII(){
    ctx.clearRect(0,0,800,600);
    let image = document.getElementById("dead")
    ctx.drawImage(image,0,0,GAME_WIDTH,GAME_HEIGHT)
}
function fillcircle2(pos,rad,ac,skell){
    ctx.fillRect(pos.x,pos.y,ac,ac)
    if(skell){
        for(x=0;x<2*rad;x+=ac){
            for(y=0;y<2*rad;y+=ac){
                if(Math.floor(Math.sqrt(Math.pow(rad,2)-Math.pow(y,2)))==x){
                    ctx.fillRect(Math.floor(x+pos.x),Math.floor(y+pos.y),ac,ac)
                    ctx.fillRect(Math.floor(pos.x-x),Math.floor(pos.y+y),ac,ac)
                    ctx.fillRect(Math.floor(pos.x-x),Math.floor(pos.y-y),ac,ac)
                    ctx.fillRect(Math.floor(pos.x+x),Math.floor(pos.y-y),ac,ac)
                }
            }
        }
        for(x=0;x<2*rad;x+=ac){
            for(y=0;y<2*rad;y+=ac){
                if(Math.floor(Math.sqrt(Math.pow(rad,2)-Math.pow(x,2)))==y){
                    ctx.fillRect(Math.floor(x+pos.x),Math.floor(y+pos.y),ac,ac)
                    ctx.fillRect(Math.floor(pos.x-x),Math.floor(pos.y+y),ac,ac)
                    ctx.fillRect(Math.floor(pos.x-x),Math.floor(pos.y-y),ac,ac)
                    ctx.fillRect(Math.floor(pos.x+x),Math.floor(pos.y-y),ac,ac)
                }
            }
        } 
    }
    else{
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
}
const epicenter={
    x:GAME_WIDTH/2,
    y:GAME_HEIGHT/2
}
function BOOM(pos,brad){
    for(i=0;i<brad;i++){
        obs.forEach(ob => {
            let dist=Math.sqrt(Math.pow(ob.position.x-pos.x,2)+Math.pow(ob.position.y-pos.y,2))
            if((brad-2*brad)<dist&&dist<brad){
                if(!ob.dnk){
                    ob.height-=pixels
                }
                else{
                    YOU_DEAD_BOIIIII()
                    kill=true
                }
            }
        })
    }
    let dist10=Math.sqrt(Math.pow(pos.x-epicenter.x,2)+Math.pow(pos.y-epicenter.y,2))
    if((brad-2*brad)<dist10&&dist10<brad){
        WORLDBOOM()
        kill=true
    }
}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
function accel_change(pos,accel,r){
    n=0
    if(pos<150){
        //console.log("low")
        switch(r){
            case 0:
                n=accel+9
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel-3
                break
        }
    }
    else if(pos>150){
        //console.log("high")
        switch(r){
            case 0:
                n=accel-9
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel+3
                break
        }
    }
    else{
        //console.log("normal")
        switch(r){
            case 0:
                n=accel+9
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel-9
                break
        }
    }
    if(n>8 || n<-8){
        n=n/2
    }
    return n
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
    for(i=0;i<length;i+=pixels){
        pos=angularmov(ang,i)
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,pixels,pixels)
    }
}
class dirt{
    constructor(x,y,os,dnk){
        this.width=os;
        this.x=x
        this.height=y*os+pixels
        this.floor=GAME_HEIGHT-os
        this.gamewidth=GAME_WIDTH
        this.gameheight=GAME_HEIGHT
        this.position={
            x:epicenter.x+angularmov(this.x*2,(this.height/pixels)).x,
            y:epicenter.y+angularmov(this.x*2,(this.height/pixels)).y
        }
        if(dnk==4){
            this.dnk=true
        }
        else{
            this.dnk=false
        }
    }
    draw(ctx){
        if(!this.dnk){
            ctx.fillStyle = '#000'
        }
        else{
            ctx.fillStyle = '#f00'
        }
        drawline(epicenter,this.x*2,(this.height/pixels))
        this.position={
            x:epicenter.x+angularmov(this.x*2,(this.height/pixels)).x,
            y:epicenter.y+angularmov(this.x*2,(this.height/pixels)).y
        }
    }
}
class bomber{
    constructor(){
        this.orbital=250
        this.size=10
        this.speed=2
        this.year=0
        this.position={
            x:epicenter.x+angularmov(this.year,this.orbital).x,
            y:epicenter.y+angularmov(this.year,this.orbital).y
        }
        this.points=[this.position]
    }
    fire(){
        scr++
        document.getElementById('output').textContent = 'your score is ' + scr
        let new_bullet = new Bullet(b1,GAME_WIDTH,GAME_HEIGHT,this.year)
        bullets.push(new_bullet)
    }
    draw(){
        ctx.fillStyle='#000'
        fillcircle2(epicenter,this.orbital,1,true)
        fillcircle2(this.position,this.size,1,false)
        this.year+=this.speed
        if(this.year>360){
            this.year-=360
            fst=false
        }
        if(fst){
            this.position={
                x:epicenter.x+angularmov(this.year,this.orbital).x,
                y:epicenter.y+angularmov(this.year,this.orbital).y
            }
            this.points.push(this.position)
        }
        else{
            this.position={
                x:this.points[this.year/this.speed].x,
                y:this.points[this.year/this.speed].y
            }
        }
    }
}
class Bullet{
    constructor(spacebase,gamewidth,gameheight,ang){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.position = {
            x:(spacebase.position.x),
            y:(spacebase.position.y)
        }
        this.speed = angularmov(ang+180,2)
        this.size = 10
        this.dead = false
        this.b=true
    }
    draw(ctx){
        ctx.fillStyle = '#0f0'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    update(){
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        obs.forEach(obj => {
            if(this.position.y < obj.position.y){
                if(obj.position.y < this.position.y + this.size){
                    if(this.position.x < obj.position.x){
                        if(obj.position.x < this.position.x + this.size){
                            BOOM(this.position,22)
                            this.dead=true
                            console.log('hi')
                        }
                    }
                }
            }
        })
        if(this.position.y < epicenter.y){
            if(epicenter.y < this.position.y + this.size){
                if(this.position.x < epicenter.x){
                    if(epicenter.x < this.position.x + this.size){
                        BOOM(this.position,22)
                        this.dead=true
                        console.log('hi')
                    }
                }
            }
        }
    }
}
function random_map(){
    levs=GAME_HEIGHT/pixels
    reps=180
    terr=[150]
    accel=0
    sped=0
    for(i=1;i<reps;i++){
        prev=terr[i-1]
        r=Math.floor(Math.random()*3)
        sped=0
        terr.push(prev+accel_change(prev,sped,r,levs))
    }
}
function ob_maker(){
    for(i=0;i<terr.length;i++){
        let new_bullet = new dirt(i,terr[i],pixels,Math.floor(Math.random()*10))
        obs.push(new_bullet)
    }
}
class Handler{
    constructor() {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 32:
                    b1.fire()
                    break
                case 75:
                    kill=true
                    break
            }
        });

    }
}
let turn1=true
random_map()
ob_maker()
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
let lastTime = 0
b1= new bomber()
new Handler()
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    b1.draw()
    obs.forEach(ob => {
        ob.draw(ctx)
    })
    bullets.forEach(pow => {
        if(!pow.dead){
            pow.draw(ctx)
            pow.update()
        }
    })
    setTimeout(function(){
        if(!kill){
            requestAnimationFrame(gameloop)
        }
    },3)
    
    
    
}
gameloop()