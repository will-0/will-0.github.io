bombs=[]
let dead=false
class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.length=50
        this.width=30
        this.position={x:0,y:this.gameheight/2}
        this.offsetorigin=0
        this.offset=-20
        this.relpoints=[
            {x:-this.length/2,y:-this.width/2},
            {x:this.length/2,y:-this.width/2}, 
            {x:this.length/2,y:this.width/2},
            {x:-this.length/2,y:this.width/2}
        ]
        this.points=[]
        var i
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y})
        }
        this.isopoints={
            top:[],
            bot:[]
        }
        for(i=0;i<this.relpoints.length;i++){
            this.isopoints.bot.push(iso_map(this.points[i],this.offsetorigin))
            this.isopoints.top.push(iso_map(this.points[i],this.offsetorigin+this.offset))
        }
        this.speed={x:0,y:0}
        this.maxSpeed=10
        this.rotation=0
        this.x = false
        this.fallspeed=0
    }
    draw(ctx){
        Bdraw3D(this.isopoints.bot,this.isopoints.top,'#000')
    }
    moveLeft(){
        for(i=0;i<this.points.length;i++){
            this.relpoints[i]=rotate_point(this.relpoints[i],-90)
        }
        this.rotation-=90
    }
    moveRight(){
        for(i=0;i<this.points.length;i++){
            this.relpoints[i]=rotate_point(this.relpoints[i],90)
        }
        this.rotation+=90
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    deadanimation(){
        for(i=0;i<this.isopoints.bot.length;i++){
            this.isopoints.bot[i]=iso_map(this.points[i],this.offsetorigin)
            this.isopoints.top[i]=iso_map(this.points[i],this.offsetorigin+this.offset)
        }
        this.fallspeed+=0.5
        this.offsetorigin+=this.fallspeed
        if(this.offsetorigin>300){
            this.x=true
        }
    }
    update(deltaTime) {
        if(!dead){
            if(!deltaTime) return;
            var i
            var j
            if(loop%3==0){
                // console.log(this.isopoints)
            }
            for(i=0;i<this.points.length;i++){
                this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y}
            }
            for(i=0;i<this.isopoints.bot.length;i++){
                this.isopoints.bot[i]=iso_map(this.points[i],this.offsetorigin)
                this.isopoints.top[i]=iso_map(this.points[i],this.offsetorigin+this.offset)
            }
            for(j=0;j<holes.holes.length;j++){
                if(
                    detect_rotated_shape(holes.holepoints[j],this.points[0]) &&
                    detect_rotated_shape(holes.holepoints[j],this.points[1]) &&
                    detect_rotated_shape(holes.holepoints[j],this.points[2]) &&
                    detect_rotated_shape(holes.holepoints[j],this.points[3])
                    ){
                    dead=true
                }
            }
            this.speed = angularmov(this.rotation,this.maxSpeed)
            this.position.x += this.speed.x
            this.position.y += this.speed.y;
            if(this.position.x<this.length){
                this.position.x=this.length
                this.rotation+=180
                for(i=0;i<this.points.length;i++){
                    this.relpoints[i]=rotate_point(this.relpoints[i],180)
                }
            }
            if(this.position.y<this.width){
                this.position.y=this.width
                this.rotation+=180
                for(i=0;i<this.points.length;i++){
                    this.relpoints[i]=rotate_point(this.relpoints[i],180)
                }
            }
            if(this.position.x>this.gamewidth-this.length){
                this.position.x=this.gamewidth-this.length
                this.rotation+=180
                for(i=0;i<this.points.length;i++){
                    this.relpoints[i]=rotate_point(this.relpoints[i],180)
                }
            }
            if(this.position.y>this.gameheight-this.width){
                this.position.y=this.gameheight-this.width
                this.rotation+=180
                for(i=0;i<this.points.length;i++){
                    this.relpoints[i]=rotate_point(this.relpoints[i],180)
                }
            }
        }
        else{
            this.deadanimation()
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
                    dodger.moveforward()
                    break
            }
        });

    }
}
class bomb{
    constructor(gamewidth,gameheight,position){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.dead=false
        this.length=10
        this.width=10
        this.position={x:position.x,y:position.y}
        this.offsetorigin=-200
        this.offset=-10
        this.relpoints=[
            {x:-this.length/2,y:-this.width/2},
            {x:this.length/2,y:-this.width/2}, 
            {x:this.length/2,y:this.width/2},
            {x:-this.length/2,y:this.width/2}
        ]
        this.points=[]
        var i
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y})
        }
        this.isopoints={
            top:[],
            bot:[]
        }
        for(i=0;i<this.relpoints.length;i++){
            this.isopoints.bot.push(iso_map(this.points[i],this.offsetorigin))
            this.isopoints.top.push(iso_map(this.points[i],this.offsetorigin+this.offset0))
        }
        this.dropspeed=0
        this.maxSpeed=0
        this.rotation=0
        this.x = false
    }
    draw(){
        Bdraw3D(this.isopoints.bot,this.isopoints.top,'#f00')
    }
    update(){
        var i
        if(loop%3==0){
            // console.log(this.isopoints)
        }
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y}
        }
        for(i=0;i<this.relpoints.length;i++){
            this.isopoints.bot[i]=iso_map(this.points[i],this.offsetorigin)
            this.isopoints.top[i]=iso_map(this.points[i],this.offsetorigin+this.offset)
        }
        this.dropspeed+=0.5
        this.offsetorigin+=this.dropspeed
        if(this.offsetorigin>0){
            holes.addhole({x:this.position.x-holes.size/2,y:this.position.y-holes.size/2})
            this.dead=true
        }
    }
}
class Holes{
    constructor(){
        this.holes=[]
        this.holebirthdate=[]
        this.holepoints=[]
        this.holeisopoints=[]
        this.size=80
    }
    addhole(pos){
        this.holes.push(pos)
        this.holebirthdate.push(loop)
        this.holeisopoints.push([
            iso_map({x:pos.x,y:pos.y},0),
            iso_map({x:pos.x+this.size,y:pos.y},0),
            iso_map({x:pos.x+this.size,y:pos.y+this.size},0),
            iso_map({x:pos.x,y:pos.y+this.size},0)
        ])
        this.holepoints.push([
            {x:pos.x,y:pos.y},
            {x:pos.x+this.size,y:pos.y},
            {x:pos.x+this.size,y:pos.y+this.size},
            {x:pos.x,y:pos.y+this.size}
        ])
    }
    draw(){
        var i
        for(i=0;i<this.holes.length;i++){
            Bdraw(this.holeisopoints[i])
        }
    }
}
let scalefactor=1.41
let rotationfactor=45
let tiltfactor=30
function iso_map(pos,offset){
    let isopos
    let pseudotiltfactor=tiltfactor*(Math.PI/180)
    let nepicenter={
        x:epicenter.x,
        y:epicenter.y+((offset/scalefactor)*Math.cos(pseudotiltfactor))
    }
    // let epicenterdiff=pndiff(epicenter,nepicenter)
    // // console.log(epicenterdiff)
    // let nepicenter2={
    //     x:rotate_point(epicenterdiff,-rotationfactor).x+epicenter.x,
    //     y:rotate_point(epicenterdiff,-rotationfactor).y+epicenter.y
    // }
    let relpos=pndiff(pos,epicenter)
    isopos=scale_point(squash_point(rotate_point(relpos,rotationfactor),tiltfactor),scalefactor)
    let final={
        x:isopos.x+nepicenter.x,
        y:isopos.y+nepicenter.y
    }
    return final
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
function scale_point(point,scale){
    let Matrix=[
        [1/scale,0],
        [0,1/scale]
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]
    }
    return npoint
}
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
function squash_point(point,squash){
    let dsquash=squash*(Math.PI/180)
    let rotsquash=Math.sin(dsquash)
    let Matrix=[
        [1,0],
        [0,rotsquash]
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]
    }
    return npoint
}
function Bdraw(points){
    var i
    for(i=0;i<points.length-1;i++){
        JTD(points[i],points[i+1])
    }
    JTD(points[points.length-1],points[0])
}
function Bdraw3D(points1,points2,color){
    let original=ctx.fillStyle
    ctx.fillstyle=color
    Bdraw(points1)
    Bdraw(points2)
    var i
    for(i=0;i<points1.length;i++){
        JTD(points1[i],points2[i])
    }
    ctx.fillStyle=original
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
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
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
function pnanglefinder(p1,p2){
    dist=pndiff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    return ang
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
function drawline(origin,ang,length){
    for(i=0;i<length;i++){
        pos=angularmov(ang,i)
        ctx.fillStyle='#000'
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,2,2)
    }
}
function WORLDBOOM(){
    ctx.clearRect(0,0,800,600);
    let image = document.getElementById("boom")
    ctx.drawImage(image,0,0,GAME_WIDTH,GAME_HEIGHT)
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
let score = 0
const GAME_WIDTH=600
const GAME_HEIGHT=600
const G=GAME_HEIGHT/2
const epicenter={x:G,y:G}
holes = new Holes()
dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
new Handler(dodger);

let lastTime = 0
dodger.draw(ctx)
let loop=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    loop++
    ctx.clearRect(0,0,800,600);
    Bdraw([iso_map({x:0,y:0},0),iso_map({x:600,y:0},0),iso_map({x:600,y:600},0),iso_map({x:0,y:600},0)])
    if(!dead){
        if(loop%100==0){
            bombs.push(new bomb(GAME_WIDTH,GAME_HEIGHT,{x:(Math.random()*(600-holes.size))+holes.size/2,y:(Math.random()*(600-holes.size))+holes.size/2}))
            score++
        }
        // var i
        // for(i=0;i<12;i++){
        //     JTD(iso_map({x:50*i,y:0},0),iso_map({x:50*i,y:600},0))
        //     JTD(iso_map({x:0,y:50*i},0),iso_map({x:600,y:50*i},0))
        // }
        bombs.forEach(bomb =>{
            if(!bomb.dead){
                bomb.draw()
                bomb.update()
            }
        })
    }
    document.getElementById('score').textContent='score:'+score
    dodger.update(deltaTime);
    dodger.draw(ctx);
    holes.draw()
    // tiltfactor+=0.5
    // rotationfactor++
    if (!dodger.x){
        requestAnimationFrame(gameloop)
    }
    else{
        WORLDBOOM()
    }
}
requestAnimationFrame(gameloop)