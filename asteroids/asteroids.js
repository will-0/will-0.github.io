bullets=[]
asteroids=[]
let score=0
function WORLDBOOM(){
    ctx.clearRect(0,0,800,600);
    let image = document.getElementById("boom")
    ctx.drawImage(image,0,0,GAME_WIDTH,GAME_HEIGHT)
}
class ship{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:GAME_WIDTH/2,y:GAME_HEIGHT/2}
        this.speed={x:0,y:0}
        this.rspeed=0
        this.rotated=270
        this.size=25
        this.maxSpeed=2
        this.relpoints=[
            {x:0,y:-this.size},
            {x:+this.size/2,y:+this.size/2},
            {x:-this.size/2,y:+this.size/2},
        ]
        var i
        this.points=[]
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y})
        }
        this.hypotenuse=Math.sqrt(2)*(this.size/2)
        this.rotation=0
    }
    shoot(){
        let new_bullet = new Bullet(GAME_WIDTH,GAME_HEIGHT,angularmov(this.rotated,10),this.points[0])
        bullets.push(new_bullet)
        score-=5
    }
    draw(){
        var i
        for(i=0;i<this.points.length-1;i++){
            JTD(this.points[i],this.points[i+1])
        }
        JTD(this.points[this.points.length-1],this.points[0])
    }
    accelerate(){
        if(this.rspeed<0.5){
            this.rspeed=0.5
        }
        this.rspeed+=0.01
        this.speed={
            x:this.speed.x+angularmov(this.rotated,this.rspeed).x,
            y:this.speed.x+angularmov(this.rotated,this.rspeed).y
        }
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    update(deltaTime) {
        if(!deltaTime) return;
        // console.log(this.rotated)
        
        this.rotated+=this.rotation
        for(i=0;i<this.points.length;i++){
            this.relpoints[i]=rotate_point(this.relpoints[i],this.rotation)
        }
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y}
        }
        asteroids.forEach(asteroid=>{
            if(detect2shapecollision(asteroid.points,this.points)){
                kill=true
            }
        })
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.rotation>=360)this.rotation=0
        if(this.rotation<=-1)this.rotation=359
        if(this.position.x<0) this.position.x=this.gamewidth
        if(this.position.x > this.gamewidth) this.position.x = 0;
        if(this.position.y<0) this.position.y=this.gameheight
        if(this.position.y > this.gameheight) this.position.y = 0;
    }
}
class Bullet{
    constructor(gamewidth,gameheight,speed,pos){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = speed
        this.width=5;
        this.height=5;
        this.position = pos
        this.dead=false
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
class asteroid{
    constructor(gamewidth,gameheight,size,position,speed,rotation,ang){
        console.log(gamewidth,gameheight,size,position,speed,rotation,ang)
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={
            x:position.x+1,
            y:position.y+1
        }
        this.speed=angularmov(ang,speed)
        this.angspeed=speed
        this.size=size
        this.ang=ang
        this.maxSpeed=2
        this.path=[]
        this.sep=30
        this.splatorder=false
        this.splitorder=0
        this.relpoints = [
            {x:-this.size,y:-this.size},
            {x:+this.size,y:-this.size/2},
            {x:+this.size*2,y:+this.size/2},
            {x:-this.size/2,y:+this.size*2.4},
            {x:-this.size*2,y:this.size/3}
        ]
        var i
        this.points=[]
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y})
        }
        this.rotation=rotation
    }
    draw(){
        var i
        for(i=0;i<this.points.length-1;i++){
            JTD(this.points[i],this.points[i+1])
        }
        JTD(this.points[this.points.length-1],this.points[0])
    }
    update() {
        var i
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        for(i=0;i<this.points.length;i++){
            this.relpoints[i]=rotate_point(this.relpoints[i],this.rotation)
        }
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y}
        }
        
        bullets.forEach(bullet=>{
            if(!bullet.dead){
                if(detect_rotated_shape(this.points,bullet.position)){
                    console.log('hit')
                    bullet.dead=true
                    if(this.size==50){
                        this.splatorder=true
                        this.splitorder=25
                        score+=50
                    }
                    else if(this.size==25){
                        this.splatorder=true
                        this.splitorder=10
                        score+=25
                    }
                    else{
                        this.splatorder=true
                        score+=10
                    }
                    
                }
            }
            
        })
    }

}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
//---------------------------------------start shape detection----------------------------------------------------------//
function rotate_point(point,ang){
    angle=ang*(Math.PI/180)
    let Matrix=[
        [Math.cos(angle),-Math.sin(angle)],
        [Math.sin(angle),Math.cos(angle)]
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]
    }
    return npoint
}
function detect2shapecollision(points1,points2){
    var i
    for(i=0;i<points1.length;i++){
        if(detect_rotated_shape(points2,points1[i])){
            return true
        }
    }
    for(i=0;i<points2.length;i++){
        if(detect_rotated_shape(points1,points2[i])){
            return true
        }
    }
    return false
}
function xyswitch(coord){
    let ncoord={
        x:coord.y,
        y:coord.x
    }
    return ncoord
}
function detect_rotated_shape(points,p){
    pointnum=points.length
    var i
    sidetruecount=0
    for(i=0;i<pointnum-1;i++){
        if(angleline_detection(points[i],points[i+1],p,true)){
            sidetruecount++
        }
    }
    if(angleline_detection(points[pointnum-1],points[0],p,true)){
        sidetruecount++
    }
    if(sidetruecount==pointnum){
        return true
    }
    else{
        return false
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
function diff(p1,p2){
    dist={x:0,y:0}
    if(p1.x>p2.x){
        dist.x=p1.x-p2.x
    }
    else{
        dist.x=p2.x-p1.x
        // dist.sector+=10
    }
    if(p1.y>p2.y){
        dist.y=p1.y-p2.y
    }
    else{
        dist.y=p2.y-p1.y
        // dist.sector++
    }
    return dist

}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
}
function anglefinder(p1,p2){
    dist=diff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    switch(dist.sector){
        case 0:
            ang+=270
            break
        case 10:
            ang=360-ang
            break
        case 1:
            ang=180-ang
            break
        case 11:
            break

    }
    return ang
}
function pnanglefinder(p1,p2){
    dist=pndiff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    return ang
}
function angleline_detection(lp1,lp2,p,inv){
    np={x:p.x-lp1.x,y:p.y-lp1.y}
    //y=mx+b
    let m=pndiff(lp1,lp2).y/pndiff(lp1,lp2).x
    if(np.x<0&&lp1.x<lp2.x){
        inv=!inv
    }
    if(np.x>=0&&lp1.x>=lp2.x){
        inv=!inv
    }
    if(np.y/np.x>m){
        if(!inv){
            return false
        }
        else{
            return true
        }
    }
    else{
        if(inv){
            return false
        }
        else{
            return true
        }
    }
}
function JTD(p1,p2){
    if(pndiff(p1,p2).x>=0){
        angle=pnanglefinder(p1,p2)+180
    }
    else{
        angle=pnanglefinder(p1,p2)
    }
    
    dist=Math.sqrt(Math.pow(diff(p1,p2).x,2)+Math.pow(diff(p1,p2).y,2))
    drawline(p1,angle,dist)
}
function drawline(origin,ang,length){
    for(i=0;i<length;i++){
        pos=angularmov(ang,i)
        ctx.fillStyle='#000'
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,2,2)
    }
}
//------------------------------------------end shape detection code-------------------------------------------------//
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 38:
                    dodger.accelerate()
                    break
                case 37:
                    dodger.rotation=357
                    break
                case 39:
                    dodger.rotation=3
                    break
                case 32:
                    dodger.shoot()
                    break
                case 75:
                    kill=true
                    break

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.rotation=0
                    break
                case 39:
                    dodger.rotation=0
                    break
                case 38:
                    this.rspeed=0
                    break
            }
        });

    }
}
let kill = false
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
const GAME_WIDTH=600
const GAME_HEIGHT=600
dodger1 = new ship(GAME_WIDTH,GAME_HEIGHT)
new Handler(dodger1)
let lastTime = 0
let loop=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    loop++
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    bullets.forEach(element => {
        if(!element.dead){
            element.update()
            element.draw(ctx)
        }
    })
    asteroids.forEach(element => {
        element.update()
        element.draw()
    })
    if(loop%200==0){
        var random=Math.floor(Math.random()*4)
        var randomspin=Math.random()*3
        var randomspeed=Math.random()+1
        let new_ast
        let randomang
        switch(random){
            case 0:
                randomang=Math.floor(Math.random()*90)+45
                new_ast = new asteroid(GAME_WIDTH,GAME_HEIGHT,50,{x:Math.floor(Math.random()*300)+150,y:0},randomspeed,randomspin,randomang)
                asteroids.push(new_ast)
                break
            case 1:
                randomang=Math.floor(Math.random()*90)+225
                new_ast = new asteroid(GAME_WIDTH,GAME_HEIGHT,50,{x:Math.floor(Math.random()*300)+150,y:600},randomspeed,randomspin,randomang)
                asteroids.push(new_ast)
                break
            case 2:
                randomang=(Math.floor(Math.random()*90)+315)%360
                new_ast = new asteroid(GAME_WIDTH,GAME_HEIGHT,50,{x:0,y:Math.floor(Math.random()*300)+150},randomspeed,randomspin,randomang)
                asteroids.push(new_ast)
                break
            case 3:
                randomang=Math.floor(Math.random()*90)+135
                new_ast = new asteroid(GAME_WIDTH,GAME_HEIGHT,50,{x:600,y:Math.floor(Math.random()*300)+150},randomspeed,randomspin,randomang)
                asteroids.push(new_ast)
                break
        }
    }
    var a
    for(a=0;a<asteroids.length;a++){
        if(asteroids[a].splatorder){
            if(asteroids[a].splitorder>0){
                var aster=asteroids[a]
                asteroids.push(new asteroid(600,600,aster.splitorder,aster.position,aster.angspeed,aster.rotation,aster.ang+aster.sep))
                asteroids.push(new asteroid(600,600,aster.splitorder,aster.position,aster.angspeed,aster.rotation,aster.ang-aster.sep))
            }
            asteroids.splice(a,1)
        }
        else{
            if(asteroids[a].position.x<-100) asteroids.splice(a,1);
            else if(asteroids[a].position.x > asteroids[a].gamewidth+100) asteroids.splice(a,1);
            else if(asteroids[a].position.y<-100) asteroids.splice(a,1);
            else if(asteroids[a].position.y>asteroids[a].gameheight+100) asteroids.splice(a,1);
        }
        
    }
    dodger1.update(deltaTime);
    dodger1.draw(ctx);
    document.getElementById('score').textContent='score:'+score
    if(!kill){
        requestAnimationFrame(gameloop)
    }
    else{
        console.log('killed')
        WORLDBOOM()
    }
}
gameloop()