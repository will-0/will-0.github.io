var i
let key = {
    dig1:false,
    dig2:false,
    dig3:false,
    dig4:false,
    dig5:false,
    dig6:false,
    dig7:false,
    dig8:false,
    arw1:false,
    arw2:false,
    arw3:false,
    arw4:false,
    arw5:false,
    arw6:false,
    arw7:false,
    arw8:false,
    arw9:false,
}
class dodger{
    constructor(gamewidth,gameheight,color,img,num){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.size=gap
        this.maxSpeed=gap
        this.x = false
        this.color=color
        this.img=img
        this.dead=false
        this.num=num
        this.q=this.size/4
        this.h=this.size/2
        this.left=false
        this.right=false
        this.up=false
        this.down=false
        this.overshoot={x:0,y:0}
    }
    draw(ctx){
        if(turn%8==this.num-1){
            ctx.fillStyle = '#0ff'
        }
        else{
            ctx.fillStyle = this.color
        }
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
        ctx.drawImage(this.img,this.position.x+this.q,this.position.y+this.q,this.h,this.h)
    }
    moveLeft(){
        this.left=true
        if(detecting_tf(this.num,true)){
            this.maxSpeed=0
        }
        this.speed.x += -this.maxSpeed
    }
    moveRight(){
        if(detecting_tf(this.num,true)){
            this.maxSpeed=0
        }
        this.right=true
        this.speed.x += this.maxSpeed
    }
    moveup(){
        if(detecting_tf(this.num,true)){
            this.maxSpeed=0
        }
        this.up=true
        this.speed.y += -this.maxSpeed
    }
    movedown(){
        if(detecting_tf(this.num,true)){
            this.maxSpeed=0
        }
        this.down=true
        this.speed.y += this.maxSpeed
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
        
        if(!this.dead){
            if(this.position.x<0) {
                if(this.num==1||this.num==2||this.num==7||this.num==8||this.num==6||this.num==5){
                    this.overshoot.x=0-this.position.x/this.size
                    if(this.down){
                        for(i = 0; i<this.overshoot.x; i++){
                            this.position.y-=this.size
                        }
                    }
                    if(this.up){
                        for(i = 0; i<this.overshoot.x; i++){
                            this.position.y+=this.size
                        }
                    }
                }
                this.position.x=0
            }
            if(this.position.x + this.size > 600) {
                if(this.num==1||this.num==2||this.num==7||this.num==8||this.num==6||this.num==5){
                    this.overshoot.x=this.position.x/this.size-7
                    if(this.down){
                        for(i = 0; i<this.overshoot.x; i++){
                            this.position.y-=this.size
                        }
                    }
                    if(this.up){
                        for(i = 0; i<this.overshoot.x; i++){
                            this.position.y+=this.size
                        }
                    }
                }
                this.position.x = 600 - this.size;

            }
            if(this.position.y<0) {
                if(this.num==1||this.num==2||this.num==7||this.num==8||this.num==6||this.num==5){
                    this.overshoot.y=0-this.position.y/this.size
                    if(this.right){
                        for(i = 0; i<this.overshoot.y; i++){
                            this.position.x-=this.size
                        }
                    }
                    if(this.left){
                        for(i = 0; i<this.overshoot.y; i++){
                            this.position.x+=this.size
                        }
                    }
                }
                this.position.y=0;

            }
            if(this.position.y + this.size > 600) {
                if(this.num==1||this.num==2||this.num==7||this.num==8||this.num==6||this.num==5){
                    this.overshoot.y=this.position.y/this.size-7
                    if(this.right){
                        for(i = 0; i<this.overshoot.y; i++){
                            this.position.x-=this.size
                        }
                    }
                    if(this.left){
                        for(i = 0; i<this.overshoot.y; i++){
                            this.position.x+=this.size
                        }
                    }
                }
                this.position.y = 600 - this.size;

            }   
        }
        this.left=false
        this.right=false
        this.up=false
        this.down=false

        if(this.dead){
            this.position={x:800,y:600}
        }
        
        if(!this.speed.x==0||!this.speed.y==0){
            detecting_kill(this.num,false)
        }
        this.stopy()
        this.stopx()
        this.maxSpeed=gap
    }

}
class Handler{
    constructor(bishop) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 97:
                    key.arw1=true
                    break
                case 98:
                    key.arw2=true
                    break
                case 99:
                    key.arw3=true
                    break
                case 100:
                    key.arw4=true
                    break
                case 101:
                    key.arw5=true
                    break
                case 102:
                    key.arw6=true
                    break
                case 103:
                    key.arw7=true
                    break
                case 104:
                    key.arw8=true
                    break
                case 105:
                    key.arw9=true
                    break
                case 49:
                    key.dig1=true
                    break
                case 50:
                    key.dig2=true
                    break
                case 51:
                    key.dig3=true
                    break
                case 52:
                    key.dig4=true
                    break
                case 53:
                    key.dig5=true
                    break
                case 54:
                    key.dig6=true
                    break
                case 55:
                    key.dig7=true
                    break
                case 56:
                    key.dig8=true
                    break
                case 67:
                    turn+=2
                    break
            }
        });
        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 97:
                    key.arw1=false
                    break
                case 98:
                    key.arw2=false
                    break
                case 99:
                    key.arw3=false
                    break
                case 100:
                    key.arw4=false
                    break
                case 101:
                    key.arw5=false
                    break
                case 102:
                    key.arw6=false
                    break
                case 103:
                    key.arw7=false
                    break
                case 104:
                    key.arw8=false
                    break
                case 105:
                    key.arw9=false
                    break
                case 49:
                    key.dig1=false
                    break
                case 50:
                    key.dig2=false
                    break
                case 51:
                    key.dig3=false
                    break
                case 52:
                    key.dig4=false
                    break
                case 53:
                    key.dig5=false
                    break
                case 54:
                    key.dig6=false
                    break
                case 55:
                    key.dig7=false
                    break
                case 56:
                    key.dig8=false
                    break

            }
        });
    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
var gap
const GAME_WIDTH=600
const GAME_HEIGHT=600
let bw=false
var frst
var scnd
let turn = 0
gap=GAME_WIDTH/8
function detecting_kill(num,h){
    if(detecting(num,h)=='b'){
        bishop.dead=true
        console.log('dead b')
    }
    if(detecting(num,h)=='b1'){
        bishop1.dead=true
        console.log('dead b1')
    }
    if(detecting(num,h)=='c'){
        castle.dead=true
        console.log('dead c')
    }
    if(detecting(num,h)=='c1'){
        castle1.dead=true
        console.log('dead c1')
    }
    if(detecting(num,h)=='k'){
        king.dead=true
        console.log('dead k')
    }
    if(detecting(num,h)=='k1'){
        king1.dead=true
        console.log('dead k1')
    }
    if(detecting(num,h)=='q'){
        queen.dead=true
        console.log('dead q')
    }
    if(detecting(num,h)=='q1'){
        queen1.dead=true
        console.log('dead q1')
    }
}
function detecting_tf(num,h){
    if(detecting(num,h)=='b'){
        return true
    }
    if(detecting(num,h)=='b1'){
        return true
    }
    if(detecting(num,h)=='c'){
        return true
    }
    if(detecting(num,h)=='c1'){
        return true
    }
    if(detecting(num,h)=='k'){
        return true
    }
    if(detecting(num,h)=='k1'){
        return true
    }
    if(detecting(num,h)=='q'){
        return true
    }
    if(detecting(num,h)=='q1'){
        return true
    }
    if(detecting(num,h)=='nd'){
        return false
    }
}
function detecting(num,h){
    if(num==1){
        return detection(bishop,h)
    }
    if(num==2){
        return detection(bishop1,h)
    }
    if(num==3){
        return detection(castle,h)
    }
    if(num==4){
        return detection(castle1,h)
    }
    if(num==5){
        return detection(king,h)
    }
    if(num==6){
        return detection(king1,h)
    }
    if(num==7){
        return detection(queen,h)
    }
    if(num==8){
        return detection(queen1,h)
    }
}
function detection(me,h){
    if(!h){
        if(me.num!=1){
            if(me.position.x==bishop.position.x){
                if(me.position.y==bishop.position.y){
                    return 'b'
                }
                
            }
            
        }
        else if(me.num!=2){
            if(me.position.x==bishop1.position.x){
                if(me.position.y==bishop1.position.y){
                    return 'b1'
                }
                
            }
            
        }
        else if(me.num!=3){
            if(me.position.x==castle.position.x){
                if(me.position.y==castle.position.y){
                    return 'c'
                }
                
            }
            
        }
        else if(me.num!=4){
            if(me.position.x==castle1.position.x){
                if(me.position.y==castle1.position.y){
                    return 'c1'
                }
                
            }
            
        }
        else if(me.num!=5){
            if(me.position.x==king.position.x){
                if(me.position.y==king.position.y){
                    return 'k'
                }
                
            }
            
        }
        else if(me.num!=6){
            if(me.position.x==king1.position.x){
                if(me.position.y==king1.position.y){
                    return 'k1'
                }
                
            }
            
        }
        else if(me.num!=7){
            if(me.position.x==queen.position.x){
                if(me.position.y==queen.position.y){
                    return 'q'
                }
                
            }
            
        }
        else if(me.num!=8){
            if(me.position.x==queen1.position.x){
                if(me.position.y==queen1.position.y){
                    return 'q1'
                }
                
            }
            
        }
        else{
            return 'nd'
        }
    }
    else{
        if(me.num!=1){
            if(me.position.x + me.speed.x==bishop.position.x){
                if(me.position.y + me.speed.y==bishop.position.y){
                    return 'b'
                }
                
            }
            
        }
        else if(me.num!=2){
            if(me.position.x + me.speed.x==bishop1.position.x){
                if(me.position.y + me.speed.y==bishop1.position.y){
                    return 'b1'
                }
                
            }
            
        }
        else if(me.num!=3){
            if(me.position.x + me.speed.x==castle.position.x){
                if(me.position.y + me.speed.y==castle.position.y){
                    return 'c'
                }
                
            }
            
        }
        else if(me.num!=4){
            if(me.position.x + me.speed.x==castle1.position.x){
                if(me.position.y + me.speed.y==castle1.position.y){
                    return 'c1'
                }
                
            }
            
        }
        else if(me.num!=5){
            if(me.position.x + me.speed.x==king.position.x){
                if(me.position.y + me.speed.y==king.position.y){
                    return 'k'
                }
                
            }
            
        }
        else if(me.num!=6){
            if(me.position.x + me.speed.x==king1.position.x){
                if(me.position.y + me.speed.y==king1.position.y){
                    return 'k1'
                }
                
            }
            
        }
        else if(me.num!=7){
            if(me.position.x + me.speed.x==queen.position.x){
                if(me.position.y + me.speed.y==queen.position.y){
                    return 'q'
                }
                
            }
            
        }
        else if(me.num!=8){
            if(me.position.x + me.speed.x==queen1.position.x){
                if(me.position.y + me.speed.y==queen1.position.y){
                    return 'q1'
                }
                
            }
            
        }
        else{
            return 'nd'
        }
    }
}
function tcount(){
    let tc=0
    if (key.arw1){
        tc++
    }
    if (key.arw2){
        tc++
    }
    if (key.arw3){
        tc++
    }
    if (key.arw4){
        tc++
    }
    if (key.arw5){
        tc++
    }
    if (key.arw6){
        tc++
    }
    if (key.arw7){
        tc++
    }
    if (key.arw8){
        tc++
    }
    if (key.arw9){
        tc++
    }
    if (key.dig1){
        tc++
    }
    if (key.dig2){
        tc++
    }
    if (key.dig3){
        tc++
    }
    if (key.dig4){
        tc++
    }
    if (key.dig5){
        tc++
    }
    if (key.dig6){
        tc++
    }
    if (key.dig7){
        tc++
    }
    if (key.dig8){
        tc++
    }
    return tc

}
function gridback(h,w){
    let level = {
        x:0,
        y:0
    }
    while(level.y<10){
        while(level.x<10){
            if(level.x%2==0){
                ctx.fillStyle = frst
            }
            else{
                ctx.fillStyle = scnd
            }
            ctx.fillRect(level.x*gap,level.y*gap,gap,gap)
            level.x++
        }
        if(bw){
            frst='#000'
            scnd='#fff'
            bw=false
        }
        else{
            frst='#fff'
            scnd='#000'
            bw=true
        }
        level.y++
        level.x=0
    }
}
function handler2(){
    if(tcount()==2){
        if(turn%8==0){
            if(!bishop.dead){
                if(key.arw1){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                        }
                        key.dig1=key.arw1=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                        }
                        key.dig2=key.arw1=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                        }
                        key.dig3=key.arw1=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                        }
                        key.dig4=key.arw1=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                        }
                        key.dig5=key.arw1=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                            console.log(6)
                        }
                        key.dig6=key.arw1=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                        }
                        key.dig7=key.arw1=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop.moveLeft()
                            bishop.movedown()
                        }
                        key.dig8=key.arw1=false
                    }
                    turn++
                }
                if(key.arw3){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig1=key.arw3=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig2=key.arw3=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig3=key.arw3=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig4=key.arw3=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig5=key.arw3=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig6=key.arw3=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig7=key.arw3=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop.moveRight()
                            bishop.movedown()
                        }
                        key.dig8=key.arw3=false
                    }
                    turn++
                }
                if(key.arw9){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig1=key.arw9=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig2=key.arw9=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig3=key.arw9=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig4=key.arw9=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig5=key.arw9=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig6=key.arw9=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig7=key.arw9=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop.moveRight()
                            bishop.moveup()
                        }
                        key.dig8=key.arw9=false
                    }
                    turn++
                }
                if(key.arw7){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig1=key.arw7=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig2=key.arw7=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig3=key.arw7=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig4=key.arw7=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig5=key.arw7=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig6=key.arw7=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig7=key.arw7=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop.moveLeft()
                            bishop.moveup()
                        }
                        key.dig8=key.arw7=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
        if(turn%8==1){
            if(!bishop1.dead){
                if(key.arw1){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                        }
                        key.dig1=key.arw1=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                        }
                        key.dig2=key.arw1=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                        }
                        key.dig3=key.arw1=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                        }
                        key.dig4=key.arw1=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                        }
                        key.dig5=key.arw1=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                            console.log(6)
                        }
                        key.dig6=key.arw1=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                        }
                        key.dig7=key.arw1=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop1.moveLeft()
                            bishop1.movedown()
                        }
                        key.dig8=key.arw1=false
                    }
                    turn++
                }
                if(key.arw3){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig1=key.arw3=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig2=key.arw3=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig3=key.arw3=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig4=key.arw3=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig5=key.arw3=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig6=key.arw3=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig7=key.arw3=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop1.moveRight()
                            bishop1.movedown()
                        }
                        key.dig8=key.arw3=false
                    }
                    turn++
                }
                if(key.arw9){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig1=key.arw9=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig2=key.arw9=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig3=key.arw9=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig4=key.arw9=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig5=key.arw9=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig6=key.arw9=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig7=key.arw9=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop1.moveRight()
                            bishop1.moveup()
                        }
                        key.dig8=key.arw9=false
                    }
                    turn++
                }
                if(key.arw7){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig1=key.arw7=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig2=key.arw7=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig3=key.arw7=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig4=key.arw7=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig5=key.arw7=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig6=key.arw7=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig7=key.arw7=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            bishop1.moveLeft()
                            bishop1.moveup()
                        }
                        key.dig8=key.arw7=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
        if(turn%8==2){
            if(!castle.dead){
                if(key.arw4){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            castle.moveLeft()
                            
                        }
                        key.dig1=key.arw4=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            castle.moveLeft()
                            
                        }
                        key.dig2=key.arw4=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            castle.moveLeft()
                            
                        }
                        key.dig3=key.arw4=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            castle.moveLeft()
                            
                        }
                        key.dig4=key.arw4=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            castle.moveLeft()
                            
                        }
                        key.dig5=key.arw4=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            castle.moveLeft()
                            
                            console.log(6)
                        }
                        key.dig6=key.arw4=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            castle.moveLeft()
                            
                        }
                        key.dig7=key.arw4=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            castle.moveLeft()
                            
                        }
                        key.dig8=key.arw4=false
                    }
                    turn++
                }
                if(key.arw2){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            castle.movedown()
                        }
                        key.dig1=key.arw2=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            castle.movedown()
                        }
                        key.dig2=key.arw2=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            castle.movedown()
                        }
                        key.dig3=key.arw2=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            castle.movedown()
                        }
                        key.dig4=key.arw2=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            castle.movedown()
                        }
                        key.dig5=key.arw2=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            castle.movedown()
                        }
                        key.dig6=key.arw2=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            castle.movedown()
                        }
                        key.dig7=key.arw2=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            castle.movedown()
                        }
                        key.dig8=key.arw2=false
                    }
                    turn++
                }
                if(key.arw6){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig1=key.arw6=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig2=key.arw6=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig3=key.arw6=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig4=key.arw6=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig5=key.arw6=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig6=key.arw6=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig7=key.arw6=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            castle.moveRight()
                            
                        }
                        key.dig8=key.arw6=false
                    }
                    turn++
                }
                if(key.arw8){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            castle.moveup()
                        }
                        key.dig1=key.arw8=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            castle.moveup()
                        }
                        key.dig2=key.arw8=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            castle.moveup()
                        }
                        key.dig3=key.arw8=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            castle.moveup()
                        }
                        key.dig4=key.arw8=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            castle.moveup()
                        }
                        key.dig5=key.arw8=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            castle.moveup()
                        }
                        key.dig6=key.arw8=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            castle.moveup()
                        }
                        key.dig7=key.arw8=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            castle.moveup()
                        }
                        key.dig8=key.arw8=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
        if(turn%8==3){
            if(!castle1.dead){
                if(key.arw4){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            castle1.moveLeft()
                            
                        }
                        key.dig1=key.arw4=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            castle1.moveLeft()
                            
                        }
                        key.dig2=key.arw4=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            castle1.moveLeft()
                            
                        }
                        key.dig3=key.arw4=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            castle1.moveLeft()
                            
                        }
                        key.dig4=key.arw4=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            castle1.moveLeft()
                            
                        }
                        key.dig5=key.arw4=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            castle1.moveLeft()
                            
                            console.log(6)
                        }
                        key.dig6=key.arw4=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            castle1.moveLeft()
                            
                        }
                        key.dig7=key.arw4=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            castle1.moveLeft()
                            
                        }
                        key.dig8=key.arw4=false
                    }
                    turn++
                }
                if(key.arw2){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig1=key.arw2=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig2=key.arw2=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig3=key.arw2=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig4=key.arw2=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig5=key.arw2=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig6=key.arw2=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig7=key.arw2=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            castle1.movedown()
                        }
                        key.dig8=key.arw2=false
                    }
                    turn++
                }
                if(key.arw6){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig1=key.arw6=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig2=key.arw6=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig3=key.arw6=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig4=key.arw6=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig5=key.arw6=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig6=key.arw6=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig7=key.arw6=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            castle1.moveRight()
                            
                        }
                        key.dig8=key.arw6=false
                    }
                    turn++
                }
                if(key.arw8){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig1=key.arw8=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig2=key.arw8=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig3=key.arw8=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig4=key.arw8=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig5=key.arw8=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig6=key.arw8=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig7=key.arw8=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            castle1.moveup()
                        }
                        key.dig8=key.arw8=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
        if(turn%8==4){
            if(!king.dead){
                if(key.arw4){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king.moveLeft()
                            
                        }
                        key.dig1=key.arw4=false
                    }
                    turn++
                }
                if(key.arw2){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            king.movedown()
                        }
                        key.dig1=key.arw2=false
                    }
                    turn++
                }
                if(key.arw6){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king.moveRight()
                            
                        }
                        key.dig1=key.arw6=false
                    }
                    turn++
                }
                if(key.arw8){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            king.moveup()
                        }
                        key.dig1=key.arw8=false
                    }
                    turn++
                }
                if(key.arw1){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king.moveLeft()
                            king.movedown()
                        }
                        key.dig1=key.arw1=false
                    }
                    turn++
                }
                if(key.arw3){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king.moveRight()
                            king.movedown()
                        }
                        key.dig1=key.arw3=false
                    }
                    turn++
                }
                if(key.arw9){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king.moveRight()
                            king.moveup()
                        }
                        key.dig1=key.arw9=false
                    }
                    turn++
                }
                if(key.arw7){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king.moveLeft()
                            king.moveup()
                        }
                        key.dig1=key.arw7=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
        if(turn%8==5){
            if(!king1.dead){
                if(key.arw4){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king1.moveLeft()
                            
                        }
                        key.dig1=key.arw4=false
                    }
                    turn++
                }
                if(key.arw2){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            king1.movedown()
                        }
                        key.dig1=key.arw2=false
                    }
                    turn++
                }
                if(key.arw6){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king1.moveRight()
                            
                        }
                        key.dig1=key.arw6=false
                    }
                    turn++
                }
                if(key.arw8){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            king1.moveup()
                        }
                        key.dig1=key.arw8=false
                    }
                    turn++
                }
                if(key.arw1){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king1.moveLeft()
                            king1.movedown()
                        }
                        key.dig1=key.arw1=false
                    }
                    turn++
                }
                if(key.arw3){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king1.moveRight()
                            king1.movedown()
                        }
                        key.dig1=key.arw3=false
                    }
                    turn++
                }
                if(key.arw9){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king1.moveRight()
                            king1.moveup()
                        }
                        key.dig1=key.arw9=false
                    }
                    turn++
                }
                if(key.arw7){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            king1.moveLeft()
                            king1.moveup()
                        }
                        key.dig1=key.arw7=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
        if(turn%8==6){
            if(!queen.dead){
                if(key.arw4){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen.moveLeft()
                            
                        }
                        key.dig1=key.arw4=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen.moveLeft()
                            
                        }
                        key.dig2=key.arw4=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen.moveLeft()
                            
                        }
                        key.dig3=key.arw4=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen.moveLeft()
                            
                        }
                        key.dig4=key.arw4=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen.moveLeft()
                            
                        }
                        key.dig5=key.arw4=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen.moveLeft()
                            
                            console.log(6)
                        }
                        key.dig6=key.arw4=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen.moveLeft()
                            
                        }
                        key.dig7=key.arw4=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen.moveLeft()
                            
                        }
                        key.dig8=key.arw4=false
                    }
                    turn++
                }
                if(key.arw2){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            queen.movedown()
                        }
                        key.dig1=key.arw2=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            queen.movedown()
                        }
                        key.dig2=key.arw2=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            queen.movedown()
                        }
                        key.dig3=key.arw2=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            queen.movedown()
                        }
                        key.dig4=key.arw2=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            queen.movedown()
                        }
                        key.dig5=key.arw2=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            queen.movedown()
                        }
                        key.dig6=key.arw2=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            queen.movedown()
                        }
                        key.dig7=key.arw2=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            queen.movedown()
                        }
                        key.dig8=key.arw2=false
                    }
                    turn++
                }
                if(key.arw6){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig1=key.arw6=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig2=key.arw6=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig3=key.arw6=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig4=key.arw6=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig5=key.arw6=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig6=key.arw6=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig7=key.arw6=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen.moveRight()
                            
                        }
                        key.dig8=key.arw6=false
                    }
                    turn++
                }
                if(key.arw8){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            queen.moveup()
                        }
                        key.dig1=key.arw8=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            queen.moveup()
                        }
                        key.dig2=key.arw8=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            queen.moveup()
                        }
                        key.dig3=key.arw8=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            queen.moveup()
                        }
                        key.dig4=key.arw8=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            queen.moveup()
                        }
                        key.dig5=key.arw8=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            queen.moveup()
                        }
                        key.dig6=key.arw8=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            queen.moveup()
                        }
                        key.dig7=key.arw8=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            queen.moveup()
                        }
                        key.dig8=key.arw8=false
                    }
                    turn++
                }
                if(key.arw1){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen.moveLeft()
                            queen.movedown()
                        }
                        key.dig1=key.arw1=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen.moveLeft()
                            queen.movedown()
                        }
                        key.dig2=key.arw1=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen.moveLeft()
                            queen.movedown()
                        }
                        key.dig3=key.arw1=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen.moveLeft()
                            queen.movedown()
                        }
                        key.dig4=key.arw1=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen.moveLeft()
                            queen.movedown()
                        }
                        key.dig5=key.arw1=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen.moveLeft()
                            queen.movedown()
                            console.log(6)
                        }
                        key.dig6=key.arw1=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen.moveLeft()
                            queen.movedown()
                        }
                        key.dig7=key.arw1=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen.moveLeft()
                            queen.movedown()
                        }
                        key.dig8=key.arw1=false
                    }
                    turn++
                }
                if(key.arw3){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig1=key.arw3=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig2=key.arw3=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig3=key.arw3=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig4=key.arw3=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig5=key.arw3=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig6=key.arw3=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig7=key.arw3=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen.moveRight()
                            queen.movedown()
                        }
                        key.dig8=key.arw3=false
                    }
                    turn++
                }
                if(key.arw9){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig1=key.arw9=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig2=key.arw9=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig3=key.arw9=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig4=key.arw9=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig5=key.arw9=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig6=key.arw9=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig7=key.arw9=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen.moveRight()
                            queen.moveup()
                        }
                        key.dig8=key.arw9=false
                    }
                    turn++
                }
                if(key.arw7){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig1=key.arw7=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig2=key.arw7=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig3=key.arw7=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig4=key.arw7=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig5=key.arw7=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig6=key.arw7=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig7=key.arw7=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen.moveLeft()
                            queen.moveup()
                        }
                        key.dig8=key.arw7=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
        if(turn%8==7){
            if(!queen1.dead){
                if(key.arw4){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen1.moveLeft()
                            
                        }
                        key.dig1=key.arw4=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen1.moveLeft()
                            
                        }
                        key.dig2=key.arw4=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen1.moveLeft()
                            
                        }
                        key.dig3=key.arw4=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen1.moveLeft()
                            
                        }
                        key.dig4=key.arw4=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen1.moveLeft()
                            
                        }
                        key.dig5=key.arw4=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen1.moveLeft()
                            
                            console.log(6)
                        }
                        key.dig6=key.arw4=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen1.moveLeft()
                            
                        }
                        key.dig7=key.arw4=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen1.moveLeft()
                            
                        }
                        key.dig8=key.arw4=false
                    }
                    turn++
                }
                if(key.arw2){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig1=key.arw2=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig2=key.arw2=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig3=key.arw2=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig4=key.arw2=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig5=key.arw2=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig6=key.arw2=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig7=key.arw2=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            queen1.movedown()
                        }
                        key.dig8=key.arw2=false
                    }
                    turn++
                }
                if(key.arw6){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig1=key.arw6=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig2=key.arw6=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig3=key.arw6=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig4=key.arw6=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig5=key.arw6=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig6=key.arw6=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig7=key.arw6=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen1.moveRight()
                            
                        }
                        key.dig8=key.arw6=false
                    }
                    turn++
                }
                if(key.arw8){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig1=key.arw8=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig2=key.arw8=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig3=key.arw8=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig4=key.arw8=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig5=key.arw8=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig6=key.arw8=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig7=key.arw8=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            
                            queen1.moveup()
                        }
                        key.dig8=key.arw8=false
                    }
                    turn++
                }
                if(key.arw1){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                        }
                        key.dig1=key.arw1=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                        }
                        key.dig2=key.arw1=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                        }
                        key.dig3=key.arw1=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                        }
                        key.dig4=key.arw1=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                        }
                        key.dig5=key.arw1=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                            console.log(6)
                        }
                        key.dig6=key.arw1=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                        }
                        key.dig7=key.arw1=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen1.moveLeft()
                            queen1.movedown()
                        }
                        key.dig8=key.arw1=false
                    }
                    turn++
                }
                if(key.arw3){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig1=key.arw3=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig2=key.arw3=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig3=key.arw3=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig4=key.arw3=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig5=key.arw3=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig6=key.arw3=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig7=key.arw3=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen1.moveRight()
                            queen1.movedown()
                        }
                        key.dig8=key.arw3=false
                    }
                    turn++
                }
                if(key.arw9){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig1=key.arw9=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig2=key.arw9=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig3=key.arw9=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig4=key.arw9=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig5=key.arw9=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig6=key.arw9=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig7=key.arw9=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen1.moveRight()
                            queen1.moveup()
                        }
                        key.dig8=key.arw9=false
                    }
                    turn++
                }
                if(key.arw7){
                    if(key.dig1){
                        for (i = 0; i < 1; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig1=key.arw7=false
                    }
                    if(key.dig2){
                        for (i = 0; i < 2; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig2=key.arw7=false
                    }
                    if(key.dig3){
                        for (i = 0; i < 3; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig3=key.arw7=false
                    }
                    if(key.dig4){
                        for (i = 0; i < 4; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig4=key.arw7=false
                    }
                    if(key.dig5){
                        for (i = 0; i < 5; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig5=key.arw7=false
                    }
                    if(key.dig6){
                        for (i = 0; i < 6; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig6=key.arw7=false
                    }
                    if(key.dig7){
                        for (i = 0; i < 7; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig7=key.arw7=false
                    }
                    if(key.dig8){
                        for (i = 0; i < 8; i++) {
                            queen1.moveLeft()
                            queen1.moveup()
                        }
                        key.dig8=key.arw7=false
                    }
                    turn++
                }
            }
            else{
                turn++
            }
        }
    }
}
bishop = new dodger(GAME_WIDTH,GAME_HEIGHT,'#0f0',document.getElementById("bishop"),1)
bishop1 = new dodger(GAME_WIDTH,GAME_HEIGHT,'#f00',document.getElementById("bishop"),2)
castle = new dodger(GAME_WIDTH,GAME_HEIGHT,'#0f0',document.getElementById("castle"),3)
castle1 = new dodger(GAME_WIDTH,GAME_HEIGHT,'#f00',document.getElementById("castle"),4)
king = new dodger(GAME_WIDTH,GAME_HEIGHT,'#0f0',document.getElementById("king"),5)
king1 = new dodger(GAME_WIDTH,GAME_HEIGHT,'#f00',document.getElementById("king"),6)
queen = new dodger(GAME_WIDTH,GAME_HEIGHT,'#0f0',document.getElementById("queen"),7)
queen1 = new dodger(GAME_WIDTH,GAME_HEIGHT,'#f00',document.getElementById("queen"),8)
castle.position={x:0,y:gap}
castle1.position={x:8*gap,y:0}
bishop.position={x:0,y:gap*3}
bishop1.position={x:8*gap,y:gap*2}
king.position={x:0,y:7*gap}
king1.position={x:8*gap,y:4*gap}
queen.position={x:0,y:5*gap}
queen1.position={x:8*gap,y:6*gap}



new Handler(bishop);

let lastTime = 0
bishop.draw(ctx)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,600,600);
    gridback(GAME_HEIGHT,GAME_WIDTH)
    bishop.update(deltaTime);
    bishop.draw(ctx);
    bishop1.update(deltaTime);
    bishop1.draw(ctx);
    castle.update(deltaTime);
    castle.draw(ctx);
    castle1.update(deltaTime);
    castle1.draw(ctx);
    king.update(deltaTime);
    king.draw(ctx);
    king1.update(deltaTime);
    king1.draw(ctx);
    queen.update(deltaTime);
    queen.draw(ctx);
    queen1.update(deltaTime);
    queen1.draw(ctx);
    handler2()
    requestAnimationFrame(gameloop)
    console.log(turn)
}
requestAnimationFrame(gameloop)