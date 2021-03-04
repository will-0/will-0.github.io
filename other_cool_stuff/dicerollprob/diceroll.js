
function output(arr){
    for(i=0;i<document.getElementById("table").rows.length-1;i++){
        document.getElementById(i+1).textContent =
            arr[i+1];
    }
}
var dice=parseInt(document.getElementById("dice").value)
var sides=parseInt(document.getElementById("sides").value)
function rounding(num,ud){
    if(num%1==0){
        return num
    }
    else{
        rem=num%1
        num-=rem
        num+=ud
        return num
    }
}
arr=[]
function basebasher(dec,base,dignum){
    var digits=[]
    x=true
    while(x){
        digits.push(dec%base)
        dec=rounding(dec/base,0)
        if(dec==0){
            x=false
        }
    }
    if(digits.length<dignum){
        while(dignum>digits.length){
            digits.push(0)
        }
    }
    return digits.reverse()
}
for(i=0;i<Math.pow(sides,dice);i++){
    arr.push(basebasher(i,sides,dice))
}
sum=[]
for(i=0;i<arr.length;i++){
    roller=0
    for(j=0;j<arr[i].length;j++){
        roller+=arr[i][j]
    }
    sum.push(roller+dice)
}
tnumsum=[]
for(i=0;i<dice*sides+1;i++){
    roller=0
    for(j=0;j<sum.length;j++){
        if(sum[j]==i){
            roller++
        }
    }
    tnumsum.push(roller/(Math.pow(sides,dice)))
}
console.table(tnumsum)
output(tnumsum)
