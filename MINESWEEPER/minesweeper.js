const GAME_SIZE=600
const divs=parseInt(document.getElementById('grid').value)
const divsize=GAME_SIZE/divs
const minenum=Math.floor((divs*divs)*0.14)
const pixels=1
let minepos=[]
let proxblockpos=[]
let proxblocks=[]
let mines=[]
let uncovered=[]
let minesweeperpic=document.getElementById('minesweeper')
kill=false
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
const num_pics=[
    document.getElementById('1'),
    document.getElementById('2'),
    document.getElementById('3'),
    document.getElementById('4'),
    document.getElementById('5'),
    document.getElementById('6'),
    document.getElementById('7'),
    document.getElementById('8')
]
function WORLDBOOM(){
    ctx.clearRect(0,0,800,600);
    let image = document.getElementById("boom")
    ctx.drawImage(image,0,0,GAME_SIZE,GAME_SIZE)
}
function mdvar_setter(v){
    for(i=0;i<divs;i++){
        v.push([])
        for(j=0;j<divs;j++){
            v[i].push(false)
        }
    }
}
function linear_search(item,arr){
    for(scr=0;scr<arr.length;scr++){
        if(xycode(arr[scr].x,arr[scr].y)==xycode(item.x,item.y)){
            return true
        }
    }
    return false
}
function linear_searchV1(item,arr){
    for(i=0;i<arr.length;i++){
        if(arr[i]==item){
            return true
        }
    }
    return false
}
function xycode(x,y){
    return x*(divs+1)+y
}
function minelayer(reps){
    let hist=[]
    for(i=0;i<reps;i++){
        randx=Math.floor(Math.random()*divs)
        randy=Math.floor(Math.random()*divs)
        code=xycode(randx,randy)
        if(!linear_searchV1(code,hist)){
            minepos.push({x:randx,y:randy})
            hist.push(code)
        }
        else{
            i--
        }
        
        
    }
    
}
function minemaker(){
    for(i=0;i<minepos.length;i++){
        let new_bullet = new mine(minepos[i])
        mines.push(new_bullet)
    }
}
function proxblocklayer(){
    for(i=0;i<divs;i++){
        arr=[]
        for(j=0;j<divs;j++){
            proxnum=0
            if(linear_search({x:i,y:j},minepos)){
                proxnum='mine'
            }
            else{
                if(linear_search({x:i-1,y:j-1},minepos)){
                    proxnum++
                }
                if(linear_search({x:i,y:j-1},minepos)){
                    proxnum++
                }
                if(linear_search({x:i+1,y:j-1},minepos)){
                    proxnum++
                }
                if(linear_search({x:i-1,y:j},minepos)){
                    proxnum++
                }
                if(linear_search({x:i+1,y:j},minepos)){
                    proxnum++
                }
                if(linear_search({x:i-1,y:j+1},minepos)){
                    proxnum++
                }
                if(linear_search({x:i,y:j+1},minepos)){
                    proxnum++
                }
                if(linear_search({x:i+1,y:j+1},minepos)){
                    proxnum++
                }
            }
            arr.push(proxnum)
        }
        proxblockpos.push(arr)
    }
}
function proxblockmaker(){
    for(i=0;i<proxblockpos.length;i++){
        for(j=0;j<proxblockpos[i].length;j++){
            if(proxblockpos[i][j]!=0 && proxblockpos[i][j]!='mine'){
                let new_bullet = new proxblock({x:i,y:j},proxblockpos[i][j])
                proxblocks.push(new_bullet)
            }
        }
    }
}
function cover(){
    for(i=0;i<divs;i++){
        for(j=0;j<divs;j++){
            if(!uncovered[i][j]){
                ctx.fillStyle='#0f0'
                ctx.fillRect(i*divsize,j*divsize,divsize,divsize)
            }
        }
    }
}
function excavator(pos,reps){
    if(reps==0)return;
    let xr=0
    let yr=0
    for(xr=0;xr<3;xr++){
        for(yr=0;yr<3;yr++){
            if(pos.x+(xr-1)>=0 && pos.y+(yr-1)>=0 && pos.x+(xr-1)<divs && pos.y+(yr-1)<divs){
                if(proxblockpos[pos.x+(xr-1)][pos.y+(yr-1)]==0){
                    uncovered[pos.x+(xr-1)][pos.y+(yr-1)]=true
                    excavator({x:pos.x+(xr-1),y:pos.y+(yr-1)},reps-1)
                }
                else{
                    uncovered[pos.x+(xr-1)][pos.y+(yr-1)]=true
                }
            }
        }
    }
    return
}
function grid(){
    ctx.fillStyle='#000'
    for(j=0;j<divs;j++){
        ctx.fillRect(0,j*divsize,GAME_SIZE,1)
    }
    for(j=0;j<divs;j++){
        ctx.fillRect(j*divsize,0,1,GAME_SIZE)
    }
}
function score(){
    let score=0
    for(i=0;i<divs;i++){
        for(j=0;j<divs;j++){
            if(uncovered[i][j]){
                score++
            }
        }
    }
    if(score==(divs*divs)-minenum){
        kill=true
        document.getElementById('score').textContent=
            'YOU WIN!!!!!!!!!!!!!!!!!!!!!'
    }
    else{
        document.getElementById('score').textContent=
            'score:'+(score/((divs*divs)-minenum))*100+'%'
    }
}
class mine{
    constructor(pos){
        this.position={
            x:pos.x*divsize,
            y:pos.y*divsize
        }
    }
    draw(ctx){
        ctx.fillStyle='#000'
        ctx.fillRect(this.position.x,this.position.y,divsize,divsize)
    }
}
class proxblock{
    constructor(pos,num){
        this.position={
            x:pos.x*divsize,
            y:pos.y*divsize
        }
        this.image=num_pics[num-1]
    }
    draw(ctx){
        ctx.fillStyle='#000'
        ctx.drawImage(this.image,this.position.x,this.position.y,divsize,divsize)
    }
}
class minesweeper{
    constructor(pos){
        this.coordinates={
            x:pos.x,
            y:pos.y
        }
        this.position={
            x:this.coordinates.x*divsize,
            y:this.coordinates.y*divsize
        }
        this.img=minesweeperpic
    }
    draw(ctx){
        ctx.drawImage(this.img,this.position.x,this.position.y,divsize,divsize)
    }
    moveup(){
        this.coordinates.y--
    }
    movedown(){
        this.coordinates.y++
    }
    moveleft(){
        this.coordinates.x--
    }
    moveright(){
        this.coordinates.x++
    }
    dig(){
        if(proxblockpos[this.coordinates.x][this.coordinates.y]==0){
            if(uncovered[this.coordinates.x][this.coordinates.y]==false){
                excavator({x:this.coordinates.x,y:this.coordinates.y},8)
            }
        }
        else if(proxblockpos[this.coordinates.x][this.coordinates.y]=='mine'){
            kill=true
            WORLDBOOM()
        }
        else{
            uncovered[this.coordinates.x][this.coordinates.y]=true
        }

    }
    update(){
        if(this.coordinates.x>=divs){
            this.coordinates.x=divs-1
        }
        if(this.coordinates.y>=divs){
            this.coordinates.y=divs-1
        }
        if(this.coordinates.x<0){
            this.coordinates.x=0
        }
        if(this.coordinates.y<0){
            this.coordinates.y=0
        }
        this.position={
            x:this.coordinates.x*divsize,
            y:this.coordinates.y*divsize
        }
    }
}
class Handler{
    constructor(minesweeper) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    minesweeper.moveleft()
                    break;
                case 39:
                    minesweeper.moveright()
                    break;
                case 38:
                    minesweeper.moveup()
                    break
                case 40:
                    minesweeper.movedown()
                    break
                case 32:
                    minesweeper.dig()
                    break
            }
        });
    }
}

mdvar_setter(uncovered)
minelayer(minenum)
proxblocklayer()
proxblockmaker()
minemaker()
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
minesweeper = new minesweeper({x:0,y:0})
let lastTime = 0
new Handler(minesweeper)
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    
    mines.forEach(mine =>{
        mine.draw(ctx)
    })
    proxblocks.forEach(pb =>{
        pb.draw(ctx)
    })
    cover()
    minesweeper.draw(ctx)
    minesweeper.update()
    grid()
    score()
    if(!kill){
        requestAnimationFrame(gameloop)
    }
    else{
        WORLDBOOM()
    }
    
}
gameloop()