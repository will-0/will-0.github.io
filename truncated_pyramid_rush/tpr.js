window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
let obs=[]
const lanesize=200
const LENGTH=8
let gspeed=30
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                // case 38:
                //     rotationfactor++
                //     break;
                // case 40:
                //     rotationfactor--
                //     break;
                case 37:
                    dodger.moveFwd()
                    break
                case 39:
                    dodger.moveBwd()
                    break
                case 32:
                    dodger.jump()
                    break
                // case 65:
                //     dodger.moveLeft()
                //     break
                // case 68:
                //     dodger.moveRight()
                //     break
                case 87:
                    dead=true
                    break
                // case 83:
                //     dodger.moveBwd()
                //     break
                // case 82:
                //     dodger.moveup()
                //     break
                // case 67:
                //     dodger.movedown()
                //     break
            }
        });
        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.stopy()
                    break
                case 39:
                    dodger.stopy()
                    break
            }
        });
    }
}
class ob{
    constructor(gamesize,lane,h){
        this.dead=false
        if(lane<0){
            this.dead=true
        }
        this.gamesize=gamesize
        this.size=lanesize
        
        this.position={x:GAME_SIZE-this.size/2,y:lane*this.size+this.size/2,z:LENGTH*GAME_SIZE-this.size/2}
        this.speed={
            x:0,
            y:0,
            z:-gspeed
        }
        if(h==1){
            this.h=2
            this.position.x-=this.size/2
        }
        else{
            this.h=1
        }
        
        this.maxspeed=10
        this.relpoints=[
            {x:this.h*this.size/2,y:this.size/2,z:this.size/2},
            {x:this.h*-this.size/2,y:this.size/2,z:this.size/2},
            {x:this.h*this.size/2,y:-this.size/2,z:this.size/2},
            {x:this.h*-this.size/2,y:-this.size/2,z:this.size/2},
            {x:this.h*this.size/2,y:this.size/2,z:-this.size/2},
            {x:this.h*-this.size/2,y:this.size/2,z:-this.size/2},
            {x:this.h*this.size/2,y:-this.size/2,z:-this.size/2},
            {x:this.h*-this.size/2,y:-this.size/2,z:-this.size/2},
        ]
        this.faces=[
            [0,1,3,2],
            [4,5,7,6],
            [2,3,7,6],
            [1,3,7,5],
            [0,1,5,4],
            [0,2,6,4]
        ]
        this.points=[]
        var i
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z})
        }
    }
    draw(ctx){
        Bdraw3D(this.points,this.faces)
    }
    update(deltaTime) {
        this.position.x+=this.speed.x
        this.position.y+=this.speed.y
        this.position.z+=this.speed.z
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z}
        }
        if(this.position.z<this.size/2){
            this.dead=true
        }
    }
}
class dodger{
    constructor(gamesize){
        this.gamesize=gamesize
        this.size=50
        this.position={x:G,y:G,z:G}
        this.floor=false
        this.speed={
            x:0,
            y:0,
            z:0
        }
        this.maxspeed=20
        this.relpoints=[
            {x:this.size/2,y:this.size/2,z:this.size/2},
            {x:-this.size/2,y:this.size/2,z:this.size/2},
            {x:this.size/2,y:-this.size/2,z:this.size/2},
            {x:-this.size/2,y:-this.size/2,z:this.size/2},
            {x:this.size/2,y:this.size/2,z:-this.size/2},
            {x:-this.size/2,y:this.size/2,z:-this.size/2},
            {x:this.size/2,y:-this.size/2,z:-this.size/2},
            {x:-this.size/2,y:-this.size/2,z:-this.size/2},
        ]
        this.faces=[
            [0,1,3,2],
            [4,5,7,6],
            [2,3,7,6],
            [1,3,7,5],
            [0,1,5,4],
            [0,2,6,4]
        ]
        this.points=[]
        var i
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z})
        }
    }
    draw(ctx){
        Bdraw3D(this.points,this.faces)
    }
    jump(){
        if(this.floor){
            this.speed.x=-45
            this.floor=false
        }
    }
    moveFwd(){
        this.speed.y=-this.maxspeed
    }
    moveBwd(){
        this.speed.y=this.maxspeed
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    stopz(){
        this.speed.z=0
    }
    update(deltaTime) {
        this.position.x+=this.speed.x
        this.position.y+=this.speed.y
        this.position.z+=this.speed.z
        this.speed.x+=3
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z}
        }
        if(this.position.x<this.size/2){
            this.speed.x=0
            this.position.x=this.size/2
        }
        if(this.position.y<this.size/2){
            this.position.y=this.size/2
        }
        if(this.position.x>this.gamesize-this.size/2){
            this.speed.x=0
            this.position.x=this.gamesize-this.size/2
            this.floor=true
        }
        if(this.position.y>this.gamesize-this.size/2){
            this.position.y=this.gamesize-this.size/2
        }
        obs.forEach(ob=>{
            ob.points.forEach(point=>{
                if(this.position.x-this.size/2<point.x&&this.position.x+this.size/2>point.x){
                    if(this.position.y-this.size/2<point.y&&this.position.y+this.size/2>point.y){
                        if(this.position.z-this.size/2<point.z&&this.position.z+this.size/2>point.z){
                            dead=true
                        }
                    }
                }
            })
            this.points.forEach(point=>{
                if(ob.position.x-ob.h*ob.size/2<point.x&&ob.position.x+ob.h*ob.size/2>point.x){
                    if(ob.position.y-ob.size/2<point.y&&ob.position.y+ob.size/2>point.y){
                        if(ob.position.z-ob.size/2<point.z&&ob.position.z+ob.size/2>point.z){
                            dead=true
                        }
                    }
                }
            })
        })
    }
}
let kill=false
let dead=false
let intensity=2
let perspective=intensity*170
let rotationfactor=-6
let tiltfactor=-180
let spinfactor=90
function iso_map(pos){
    let isopos
    let relpos=pndiff3D(pos,epicenter3D)
    isopos=add_perspective(rotate3D(relpos,tiltfactor,rotationfactor,spinfactor),perspective,intensity)
    let final={
        x:isopos.x+epicenter.x,
        y:isopos.y+epicenter.y
    }
    return final
}
function rotate3D(point,rx,ry,rz){
    let xpoint={
        x:point.x,
        y:rotate_point({x:point.y,y:point.z},rx).x,
        z:rotate_point({x:point.y,y:point.z},rx).y
    }
    let ypoint={
        x:rotate_point({x:xpoint.x,y:xpoint.z},ry).x,
        y:xpoint.y,
        z:rotate_point({x:xpoint.x,y:xpoint.z},ry).y
    }
    let zpoint={
        x:rotate_point({x:ypoint.x,y:ypoint.y},rz).x,
        y:rotate_point({x:ypoint.x,y:ypoint.y},rz).y,
        z:ypoint.z
    }
    return zpoint
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
function add_perspective(point,perspective,intensity){
    let z = intensity*G-point.z
    let Matrix=[
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,1/perspective,0]
    ]
    let hpoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1]+z*Matrix[0][2]+0*Matrix[0][3],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]+z*Matrix[1][2]+0*Matrix[1][3],
        z:point.x*Matrix[2][0]+point.y*Matrix[2][1]+z*Matrix[2][2]+0*Matrix[2][3],
        w:point.x*Matrix[3][0]+point.y*Matrix[3][1]+z*Matrix[3][2]+0*Matrix[3][3],
    }
    let npoint={
        x:hpoint.x/hpoint.w,
        y:hpoint.y/hpoint.w,
        z:hpoint.z/hpoint.w
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
function Bdraw3D(points,faces){
    var isopoints=[]
    var fpoints=[]
    for(var i=0;i<points.length;i++){
        isopoints.push(iso_map(points[i]))
    }
    for(i=0;i<faces.length;i++){
        fpoints=[]
        for(var j=0;j<faces[i].length;j++){
            fpoints.push(isopoints[faces[i][j]])
        }
        Bdraw(fpoints)
        
    }
}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
}
function pndiff3D(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y,z:p1.z-p2.z}
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
function scale_point(point,scale){
    let Matrix=[
        [scale,0],
        [0,scale],
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]
    }
    return npoint
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
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,2,2)
    }
}
function overlap(nums){
    del=[]
    overlaps=[]
    for(var i=0;i<nums.length-1;i++){
        for(var j=i+1;j<nums.length;j++){
            if(nums[i]==nums[j]){
                overlaps.push([i,j])
            }
        }
    }
    if(overlaps.length==3){
        return 'all'
    }
    for(i=0;i<overlaps.length;i++){
        return (overlaps[i][Math.floor(Math.random()*2)])
    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')


const GAME_SIZE=600
const G=GAME_SIZE/2
const epicenter={x:G,y:G}
const epicenter3D={x:G,y:G,z:G}
dodger1 = new dodger(GAME_SIZE)
new Handler(dodger1);
let borderpoints=[
    {x:GAME_SIZE,y:GAME_SIZE,z:LENGTH*GAME_SIZE},
    {x:0,y:GAME_SIZE,z:LENGTH*GAME_SIZE},
    {x:GAME_SIZE,y:0,z:LENGTH*GAME_SIZE},
    {x:0,y:0,z:LENGTH*GAME_SIZE},
    {x:GAME_SIZE,y:GAME_SIZE,z:0},
    {x:0,y:GAME_SIZE,z:0},
    {x:GAME_SIZE,y:0,z:0},
    {x:0,y:0,z:0}
]
let faces = [
    [0,1,3,2],
    [4,5,7,6],
    [2,3,7,6],
    [1,3,7,5],
    [0,1,5,4],
    [0,2,6,4]
]
let lastTime = 0
let loop=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    loop++
    ctx.clearRect(0,0,600,600);
    if(loop%50==0){
        gspeed++
        let type=[Math.floor(Math.random()*2),Math.floor(Math.random()*2),Math.floor(Math.random()*2)]
        let lanes=[Math.floor(Math.random()*3),Math.floor(Math.random()*3),Math.floor(Math.random()*3)]
        var t=0
        console.log(overlap(lanes))
        for(i=0;i<lanes.length;i++){
            if(type[i]==1){
                t++
            }
        }
        if(overlap(lanes)!=undefined&&overlap(lanes)!='all'){
            lanes[overlap(lanes)]=-100
        }
        else if(overlap(lanes)=='all'){
            lanes[0]=-100
            lanes[1]=-100
        }
        console.log(lanes)
        if(t==3){
            lanes[Math.floor(Math.random()*3)]=-100
        }
        let new_ob
        for(i=0;i<lanes.length;i++){
            new_ob= new ob(GAME_SIZE,lanes[i],type[i])
            obs.push(new_ob)
        }
        
        
    }
    obs.forEach(ob=>{
        if(!ob.dead){
            ob.draw()
            ob.update()
        }
        
    })
    Bdraw3D(borderpoints,faces)
    dodger1.draw(ctx)
    document.getElementById('score').textContent=
        'score:'+loop;
    dodger1.update()
    if(!dead){
        requestAnimationFrame(gameloop)
    }
}
requestAnimationFrame(gameloop)