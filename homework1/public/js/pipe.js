(function() {
    var Pipe = window.Pipe = function(obj) {
        var arr = [100,120,140,160],
            len = arr.length,
            y = parseInt(Math.random() * len),
            x = arr[y];
        this.image = obj.img.pipe_up;
        this.allHeight = obj.canvas.height * 0.7;
        this.w = 52;
        this.h = x;
        this.x = obj.canvas.width + Math.random() * obj.canvas.width;
        this.y = this.allHeight - this.h;
        this.render = function() {
            obj.ctx.drawImage(this.image,0,0,this.w,320,this.x,this.y,this.w,this.h);
        }
        //源源不断的更新管子
        this.update = function() {
            this.x--;
            var that = this;
            if(this.x < -this.w){
                this.h = arr[parseInt(Math.random() * len)];
                this.y = this.allHeight - this.h;
                this.x = obj.canvas.width + Math.random() * obj.canvas.width;
            }
        }
    }
})()