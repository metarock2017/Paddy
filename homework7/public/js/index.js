let canvas = document.querySelector('.canvasId'),
    ctx = canvas.getContext('2d'),
    raf,
    canvasHeight = canvas.height,
    canvasWidth = canvas.width;

let color= [
    "rgb(0,255,0)",
    "rgb(255,0,255)",
    "rgb(0,255,255)",
    "rgb(0,0,128)",
    "rgb(128,128,0)",
    "rgb(255,165,0)",                         
    "rgb(255,215,0)",                          
    "rgb(0,128,0)",
    "rgb(80,80,80)",
    " rgb(255,0,0)",
     "rgb(0,0,255)",
     "rgb(255,192,203)",
     "rgb(128,0,128)",
     "rgb(255,255,0)",
     "rgb(128,0,0)",
     "rgb(0,0,0)",                                           
     "rgb(165,42,42)",
     "rgb(0,255,255)",
     "rgb(0,0,139)",
     "rgb(0,139,139)",
     "rgb(169,169,169)",
     "rgb(0,100,0)",
     "rgb(189,183,107)",
     "rgb(139,0,139)",
     "rgb(85,107,47)",
     "rgb(255,140,0)",
     "rgb(153,50,204)",
     "rgb(139,0,0)",
     "rgb(233,150,122)",
     "rgb(148,0,211)",
     "rgb(75,0,130)",
     "rgb(240,230,140)",
     "rgb(173,216,230)",
     "rgb(224,255,255)",
     "rgb(144,238,144)",
     "rgb(211,211,211)",
      "rgb(255,182,193)",
     "rgb(255,255,224)",
      "rgb(255,0,255)",
      "rgb(128,0,128)",
      "rgb(192,192,192)",
      "rgb(255,255,255)",
      "rgb(240,255,255)",
      "rgb(245,245,220)"
     ]
function Ball(x,y,vx,vy,color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
}
Ball.prototype = {
    radius: 30,
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();       
        ctx.fillStyle = this.color;
        ctx.fill(); 
        if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
            var t = parseInt(Math.random() * color.length);
            this.vy = -this.vy;
            this.color = color[t];
         }
        if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
            var t = parseInt(Math.random() * color.length);            
            this.vx = -this.vx;
            this.color = color[t];
            console.log(color.length);
        }
    }
}


// var ball1 = new Ball(100,100,'red');
var arr = [];
for(let i = 0 ; i < 15 ; i++) {
    var t = parseInt(Math.random() * color.length);
    arr.push(new Ball(Math.random() * canvasWidth, Math.random() * canvasHeight, 7 * Math.random(),Math.random() * 7, color[t]));
}

function draw(arr) {
    ctx.clearRect(0,0, canvas.width, canvas.height);    
    for(let i = 0 ; i < arr.length ; i++) {
        arr[i].draw();
        arr[i].x += arr[i].vx;
        arr[i].y += arr[i].vy;
    } 
}
var timer;
// window.requestAnimationFrame(draw(arr));
canvas.addEventListener('mouseover', function(e){
    timer = setInterval(function() {
        draw(arr);
    },15);
});

setInterval(draw(arr),20);

  
canvas.addEventListener('mouseout', function(e){
    // window.cancelAnimationFrame(raf);
    clearInterval(timer);
});


