(function() {
    var Game = window.Game = function() {
        this.canvas = document.querySelector('.canvasId');
        this.ctx = this.canvas.getContext('2d'); //创建画布
        this.ctx.font="20px Georgia";
        this.init();//设置画布的宽高
        //读取资源
        var that = this;      

        this.loadAllResource(function() {
            that.begin();
        });
    }
    Game.prototype.init = function() {
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        this.canvas.height = windowH > 736 ? 736 : windowH;
        this.canvas.width  = windowW > 414 ? 414 : windowW;
    }
    Game.prototype.loadAllResource = function(fn) {
        this.img = {};
        var len = images.length;
        for(let i = 0 ; i < len ; i++) {
            this.img[images[i].name] = new Image();
            this.img[images[i].name].src = images[i].url;
        }
        fn();
    }
    Game.prototype.begin = function() {
        var that = this;
        this.background = new Background(this);          
        this.land = new Land(this);   
        this.llp = new Llp(this);      
        this.pipe = new Pipe(this);
        this.monster = new Monster(this);
        this.bomb = new Bomb(this);
        var up,left,down,right,spa;
        var y = that.llp.y;
        var isGameOver = false;
        var BombY = that.llp.y;
        var j = 2,k = 2,i = 2,l = 2,s = 2;
        var count = 0;
        var b = 0;  
        var num1 = 0;
        var num2 = 0;
        var num3 = 0;
        var point = 0;
        var timer = setInterval(function() {
            that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
            that.background.render();
            that.land.render();
            that.land.update();
            that.llp.render();
            that.pipe.render();
            that.pipe.update();
            that.bomb.render();
            that.monster.render();
            that.monster.update();
            that.ctx.fillText('你的分数为：' + point , 100 ,40)
            isDisappear(that.bomb.x,that.bomb.y,that.monster.x1,that.monster.y1,that.monster.x2,that.monster.y2,that.monster.x3,that.monster.y3);
            isTouchMan(that.llp.x,that.llp.y,that.pipe.x,that.pipe.y); 
            isTouchMonster(that.llp.x,that.llp.y,that.monster.x1,that.monster.y1,that.monster.x2,that.monster.y2,that.monster.x3,that.monster.y3);
            if(isGameOver === true) {
                start.style.display = 'block';
                poin.innerHTML = '你的分数是: ' + point;
                clearInterval(timer);
            }
        },20);
        //当按下键盘对应的键所做的事情
        var isUp = true,isLeft = true,
        isRight = true, isDown = true,
        isBomb = true;
        var bombId = 0;
        var tmpB = false;
        document.onkeydown = function(e) {
            var e = window.event||e;
            isBomb = true;
            switch(e.keyCode){
                case 38: { // 上
                    isBomb = true;
                    isUp = true;
                    i = 2;
                    l = 0;
                    if(!up){
                        up = setInterval(function(){
                            if(isUp) {
                                that.llp.y -= i;
                                if(isBomb){
                                    that.bomb.y -= i;                                    
                                }
                                if(parseInt(that.llp.y) <= 200) {
                                    isUp = false;
                                }
                            }else {
                                that.llp.y += i;
                                if(isBomb) {
                                    that.bomb.y += i;                                                                    
                                }
                                if(parseInt(that.llp.y) >= y) {
                                    that.llp.y = y;  
                                    i = 0;                                                                 
                                    isUp = true;
                                }
                            }
                        },20);
                    }
                }
                break;
                case 32: {//空格
                    s = 2;
                    isBomb = tmpB;
                    that.bomb.x = that.llp.x + 30;
                    that.bomb.y = that.llp.y + 30;
                    if(!spa) {
                        spa = setInterval(function(){
                            isBomb = tmpB;
                            that.bomb.x += s;
                        },20)
                    }
                } 
                break;                
                case 39: {//右
                    isBomb = true;
                    k = 0;
                    j = 2;
                    if(!right) {
                        right = setInterval(function() {
                            if(isRight) {
                                if(isBomb){
                                    that.bomb.x += j;                                    
                                }
                                that.llp.x += j;
                                if(that.llp.x >= that.canvas.width - 34) {
                                    that.llp.x = that.canvas.width - 34;
                                    that.bomb.x = that.canvas.width - 34;
                                }
                                if(that.bomb.x >= that.canvas.width + 34) {
                                    s = 0;
                                    tmp = true;
                                }
                            }
                        },20)
                    }
                }
                break;
                case 37: {//左
                    isBomb = true;
                    k = 3;
                    j = 0;      
                    if(!left) {
                        left = setInterval(function() {
                            if(isLeft) {
                                if(isBomb){
                                    that.bomb.x -= k;                                      
                                }
                                that.llp.x -= k;  
                                if(that.llp.x <= 0) {
                                    that.llp.x = 0;
                                } 
                            }              
                        },20);
                    }                                          
                }
                break;
                case 40: {//下
                    isBomb = true;
                    l = 2;
                    i = 0;
                    if(!down) {
                        down = setInterval(function() {
                            if(isDown) {
                                if(isBomb){
                                    that.bomb.y += l;                                    
                                }
                                that.llp.y += l;
                                if(parseInt(that.llp.y) >= y ){
                                    that.llp.y = y;
                                    if(isBomb){
                                        that.bomb.y = y;                                        
                                    }
                                }
                            }
                        },20)
                    }
                    break;
                }            
            }
        }
        //当按键按完毕后做的事情
        var stopL,stopT,stopD,stopR;
        document.onkeyup = function(e) {
            var e = e || window.e;
            switch(e.keyCode) {
                case 37:{//左
                    setTimeout(function() {
                        k = 0;
                    },300);
                }
                break;
                case 38:{//上
                    
                }
                break;
                case 39:{//右
                    setTimeout(function() {
                        j = 0;
                    },300)
                }
                break;
                case 40:{//下

                }
                break;
            }

        }
        
        function isTouchMan(manX,manY,pipeX,pipeY) {
            if((manX + that.llp.w - 8) > pipeX && manX < (pipeX+that.pipe.w)) {
                if((manY + that.llp.h)> pipeY && manY < (pipeY + that.pipe.h)) {
                    isGameOver = true;
                }
            }
        }
        
        function isDisappear(bombX,bombY,monsX1,monsY1,monsX2,monsY2,monsX3,monsY3){
            if(parseInt(bombX) >= parseInt(monsX1) && parseInt(bombX) <= parseInt(monsX1 + 10)){
                if(parseInt(bombY) >= monsY1 && parseInt(bombY) <= (monsY1 + that.monster.h)) {
                    that.monster.x1 = that.canvas.width + Math.random() * that.canvas.width;
                    point++;
                }
            }

            if(parseInt(bombX) >= parseInt(monsX2) && parseInt(bombX) <= parseInt(monsX2 + 10)){
                if(parseInt(bombY) >= monsY2 && parseInt(bombY) <= (monsY2 + that.monster.h)) {
                    that.monster.x2 = that.canvas.width + Math.random() * that.canvas.width;
                    point++;
                }
            }

            if(parseInt(bombX) >= parseInt(monsX3) && parseInt(bombX) <= parseInt(monsX3 + 10)){
                if(parseInt(bombY) >= monsY3 && parseInt(bombY) <= (monsY3 + that.monster.h)) {
                    that.monster.x3 = that.canvas.width + Math.random() * that.canvas.width;
                    point++;
                }
            }

        }

        function isTouchMonster(manX,manY,monsX1,monsY1,monsX2,monsY2,monsX3,monsY3){
            if(parseInt(manX) >= parseInt(monsX1 - that.llp.w) && parseInt(manX) <= parseInt(monsX1 + that.monster.w)) {
                if(manY >= (monsY1 - that.llp.h) && manY <= (monsY1 + that.monster.h - 10)) {
                    isGameOver = true;
                }
            }
            if(parseInt(manX) >= parseInt(monsX2 - that.llp.w) && parseInt(manX) <= parseInt(monsX2 + that.monster.w)) {
                if(manY >= (monsY2- that.llp.h) && manY <= (monsY2 + that.monster.h - 10)) {
                    isGameOver = true;
                }
            }
            if(parseInt(manX) >= parseInt(monsX3 - that.llp.w) && parseInt(manX) <= parseInt(monsX3 + that.monster.w)) {
                if(manY >= (monsY3 - that.llp.h) && manY <= (monsY3 + that.monster.h - 10)) {
                    isGameOver = true;
                }
            }
        }

    }
})()