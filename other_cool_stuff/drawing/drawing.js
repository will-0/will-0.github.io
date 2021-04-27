function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(evt.clientX - (rect.left+20)),
      y: Math.floor(evt.clientY - (rect.top+20))
    };
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
let erase=false
let font=2
let color = {
    r:0,
    g:0,
    b:0
}
function drawline2(origin,dist){
    if(!erase){
        if(dist.x>=0){
            for(i=0;i<dist.x;i++){
                ctx.fillRect(origin.x+i,origin.y+i*(dist.y/dist.x),font,font)
            }
        }
        else{
            for(j=0;j>dist.x;j--){
                ctx.fillRect(origin.x+j,origin.y+j*(dist.y/(dist.x)),font,font)
            }
        }
        if(dist.y>=0){
            for(i=0;i<dist.y;i++){
                ctx.fillRect(origin.x+i*(dist.x/dist.y),origin.y+i,font,font)
            }
        }
        else{
            for(j=0;j>dist.y;j--){
                ctx.fillRect(origin.x+j*(dist.x/dist.y),origin.y+j,font,font)
            }
        }
    }
    else{
        if(dist.x>=0){
            for(i=0;i<dist.x;i++){
                ctx.clearRect(origin.x+i,origin.y+i*(dist.y/dist.x),font,font)
            }
        }
        else{
            for(j=0;j>dist.x;j--){
                ctx.clearRect(origin.x+j,origin.y+j*(dist.y/(dist.x)),font,font)
            }
        }
        if(dist.y>=0){
            for(i=0;i<dist.y;i++){
                ctx.clearRect(origin.x+i*(dist.x/dist.y),origin.y+i,font,font)
            }
        }
        else{
            for(j=0;j>dist.y;j--){
                ctx.clearRect(origin.x+j*(dist.x/dist.y),origin.y+j,font,font)
            }
        }
    }
    

}
function gapfill(arr){
    ctx.fillStyle = colorhex
    var dist = {x:arr[1].x-arr[0].x,y:arr[1].y-arr[0].y}
    drawline2(arr[0],dist)
    
}
let hex = '0123456789abcdef'
let colorhex = '#' + hex[color.r%16] + hex[color.g%16] + hex[color.b%16]
var click = false
var linefill = []
class Handler{
    constructor(dodger) {
        document.addEventListener("mousemove", event=> {
            if(click){
                var m = getMousePos(canvas,event)
                linefill.push({x:m.x-font/2,y:m.y-font/2})
                if(linefill.length>2){
                    linefill.shift()
                }
                gapfill(linefill)
            }
        });
        document.addEventListener('mousedown',function(){
            click=true
        })
        document.addEventListener('mouseup',function(){
            click=false
            linefill.shift()
            linefill.shift()
        })
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 38:
                    font++
                    console.log(font)
                    break
                case 40:
                    if(font>0){
                        font--
                    }
                    console.log(font)
                    break
                case 69:
                    erase=!erase
                    break
                case 82:
                    color.r++
                    break
                case 71:
                    color.g++
                    break
                case 66:
                    color.b++
                    break
            }
        });
    }
}
let score=1
let canvas = document.getElementById("gamescreen")
let canvas2 = document.getElementById("sample")
let ctx = canvas.getContext('2d')
let ctx2 = canvas2.getContext('2d')
const GAME_WIDTH=800
const GAME_HEIGHT=600


new Handler();

let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    colorhex = '#' + hex[color.r%16] + hex[color.g%16] + hex[color.b%16]
    document.getElementById('color').textContent = colorhex
    ctx2.fillStyle = colorhex
    ctx2.fillRect(0,0,800,10)
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)