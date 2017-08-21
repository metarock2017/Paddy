(function() {
    var Game = window.Game = function() {
        this.canvas = document.querySelector('.canvasId');
        this.ctx = this.canvas.getContext('2d'); //创建画布
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
        console.log(windowH);
        this.canvas.height = windowH > 736 ? 736 : windowH;
        this.canvas.width  = windowW > 414 ? 414 : windowW;
    }
    Game.prototype.loadAllResource = function(fn) {
        this.img = {};
        var len = images.length;
        console.log(this.img);
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
        this.bomb = new Bomb(this,300); 
        document.onkeydown = function(e) {
            var y = that.llp.y;
            var e = window.event||e;
            var isUp = true;
            // console.log(y);
            switch(e.keyCode){
                case 38: {
                    var timer = setInterval(function(){
                        if(isUp){
                            that.llp.y--;
                            if(parseInt(that.llp.y) === 250){
                                isUp = false;
                                console.log(123);
                            }
                        }else {
                            that.llp.y++;
                            if(that.llp.y === y){
                                isUp = true;
                                clearInterval(timer);
                            }
                        }
                    },20);
                }
                break;
                case 32: {
                    var bomber = setInterval(function() {
                        
                    },20);
                }
            }
        }
        var timer = setInterval(function() {
            that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
            that.background.render();
            that.land.render();
            that.land.update();
            that.llp.render();
            that.pipe.render();
            that.pipe.update();
            that.bomb.render();
        },20);
        console.log(this);
    }
   
})()