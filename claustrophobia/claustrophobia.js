const GAME_SIZE=600
const divs=60
const divsize=GAME_SIZE/divs
const pixels=1
let uncovered=[]
kill=false
end=false
const target_size=parseInt(document.getElementById('targ').value)
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
function mdvar_setter(v){
    for(i=0;i<divs;i++){
        v.push([])
        for(j=0;j<divs;j++){
            if(i==0||j==0||i==divs-1||j==divs-1){
                v[i].push(false)
            }
            else{
                v[i].push(true)
            }
            
        }
    }
}
function WORLDBOOM(img){
    ctx.clearRect(0,0,800,600);
    let image = document.getElementById(img)
    ctx.drawImage(image,0,0,GAME_SIZE,GAME_SIZE)
}
function target(){
    ctx.fillStyle='#f00'
    ctx.fillRect((divs-(target_size+1))*divsize,(divs-(target_size+1))*divsize,target_size*divsize,target_size*divsize)
    let NOGIT=0 //Number Of Ghosts In Target
    ghosts.forEach(ghost =>{
        if(ghost.position.x>(divs-(target_size+1))*divsize && ghost.position.y>(divs-(target_size+1))*divsize){
            NOGIT++
        }
    })
    if(NOGIT==divs/2){
        end=true
    }
}
function cover(){
    for(i=0;i<divs;i++){
        for(j=0;j<divs;j++){
            if(!uncovered[i][j]){
                ctx.fillStyle='#0f0'
                ctx.fillRect(i*divsize,j*divsize,divsize,divsize)
            }
            else if(uncovered[i][j]=='med'){
                ctx.fillStyle='#0ff'
                ctx.fillRect(i*divsize,j*divsize,divsize,divsize)
            }
        }
    }
}
function verify(){
    for(i=0;i<divs;i++){
        for(j=0;j<divs;j++){
            if(uncovered[i][j]=='med'){
                uncovered[i][j]=false
            }
        }
    }
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
function linearSearch(arr,key){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === key){
            return true
        }
    }
    return false
}
class ghost{
    constructor(pos){
        this.coordinates={
            x:pos.x,
            y:pos.y
        }
        this.position={
            x:this.coordinates.x*divsize,
            y:this.coordinates.y*divsize
        }
        this.previousmove=0
        this.con=0
        this.maxcon=4
    }
    draw(ctx){
        ctx.fillStyle='#f0f'
        ctx.fillRect(this.position.x,this.position.y,divsize,divsize)
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
        let dir = {
            left:false,
            right:false,
            up:false,
            down:false,
            nums:0,
            poss:[]
        }
        var xr
        var yr
        if(loop%5==0){
            for(xr=0;xr<3;xr++){
                for(yr=0;yr<3;yr++){
                    if(this.coordinates.x+(xr-1)>=0 && this.coordinates.y+(yr-1)>=0 && this.coordinates.x+(xr-1)<divs && this.coordinates.y+(yr-1)<divs){
                        if(uncovered[this.coordinates.x+(xr-1)][this.coordinates.y+(yr-1)]==true){
                            if(xr==0&&yr==1){
                                dir.left=true
                                dir.nums++
                            }
                            if(xr==1&&yr==0){
                                dir.up=true
                                dir.nums++
                            }
                            if(xr==2&&yr==1){
                                dir.right=true
                                dir.nums++
                            }
                            if(xr==1&&yr==2){
                                dir.down=true
                                dir.nums++
                            }
                        }
                        else if(uncovered[this.coordinates.x+(xr-1)][this.coordinates.y+(yr-1)]=='med'){
                            kill=true
                        }
                    }
                }
            }
            let random = Math.floor(Math.random()*dir.nums)
            // console.log(dir.nums)
            if(dir.left){
                dir.poss.push(1)
            }
            if(dir.right){
                dir.poss.push(2)
            }
            if(dir.up){
                dir.poss.push(3)
            }
            if(dir.down){
                dir.poss.push(4)
            }
            let skip=false
            if(linearSearch(dir.poss,this.previousmove)){
                switch(this.previousmove){
                    case 1:
                        this.moveleft()
                        this.previousmove=0
                        skip=true
                        break
                    case 2:
                        this.moveright()
                        this.previousmove=0
                        skip=true
                        break
                    case 3:
                        this.moveup()
                        this.previousmove=0
                        skip=true
                        break
                    case 4:
                        this.movedown()
                        this.previousmove=0
                        skip=true
                        break
                }
            }
            if(!skip){
                for(i=0;i<dir.nums;i++){
                    if(random==i){
                        switch(dir.poss[i]){
                            case 1:
                                this.moveleft()
                                this.previousmove=1
                                break
                            case 2:
                                this.moveright()
                                this.previousmove=2
                                break
                            case 3:
                                this.moveup()
                                this.previousmove=3
                                break
                            case 4:
                                this.movedown()
                                this.previousmove=4
                                break
                        }
                    }
                }
            }
            else{
                this.con++
                if(this.con>=this.maxcon){
                    this.previousmove=0
                }
            }
            if(uncovered[this.coordinates.x][this.coordinates.y]==false){
                console.log(dir)
            }
            
        }
        
        this.position={
            x:this.coordinates.x*divsize,
            y:this.coordinates.y*divsize
        }
        
    }
}
class sheepdog{
    constructor(pos){
        this.coordinates={
            x:pos.x,
            y:pos.y
        }
        this.position={
            x:this.coordinates.x*divsize,
            y:this.coordinates.y*divsize
        }
        this.speed={
            x:0,
            y:0
        }
    }
    draw(ctx){
        ctx.fillStyle='#00f'
        ctx.fillRect(this.position.x,this.position.y,divsize,divsize)
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
    trump(){
        if(uncovered[this.coordinates.x][this.coordinates.y]){
            uncovered[this.coordinates.x][this.coordinates.y]='med'
        }
        else if(!uncovered[this.coordinates.x][this.coordinates.y]){
            uncovered[this.coordinates.x][this.coordinates.y]=false
            verify()
        }
        else{
            kill=true
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
                    minesweeper.trump()
                    break;
                case 39:
                    minesweeper.moveright()
                    minesweeper.trump()
                    break;
                case 38:
                    minesweeper.moveup()
                    minesweeper.trump()
                    break
                case 40:
                    minesweeper.movedown()
                    minesweeper.trump()
                    break
                case 32:

                    end=true
                    break
            }
        });
    }
}
ghosts=[]
mdvar_setter(uncovered)
for(i=0;i<divs;i++){
    ghosts.push(new ghost({x:Math.floor(Math.random()*divs-2)+1,y:Math.floor(Math.random()*divs-2)+1}))
}
sheepdog1=new sheepdog({x:0,y:0})
new Handler(sheepdog1)
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
loop=0
let lastTime = 0
function gameloop(timestamp) {
    loop++
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    target()
    ghosts.forEach(ghost=>{
        ghost.draw(ctx)
        ghost.update()
    })
    cover()
    grid()
    sheepdog1.draw(ctx)
    sheepdog1.update()
    if(!end && !dead){
        setTimeout(function(){
            requestAnimationFrame(gameloop)
        },0)
    }
    else if(end){
        WORLDBOOM('boom')
    }
    else{
        WORLDBOOM('sheep')
    }
}
gameloop()