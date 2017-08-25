(function() {
    var Monster = window.Monster = function(obj) {
        this.image = obj.img.monster;
        this.x1 = obj.canvas.width + Math.random() * obj.canvas.width;
        this.y1 = obj.canvas.height * 0.32 + obj.canvas.height * 0.3 * Math.random();
        this.x2 = obj.canvas.width + Math.random() * obj.canvas.width;
        this.y2 = obj.canvas.height * 0.32 + obj.canvas.height * 0.3 * Math.random();
        this.x3 = obj.canvas.width + Math.random() * obj.canvas.width;
        this.y3 = obj.canvas.height * 0.32 + obj.canvas.height * 0.3 * Math.random();
        this.w = 38;
        this.h = 38;
        this.render = function() {
            obj.ctx.drawImage(this.image,this.x1,this.y1);
            obj.ctx.drawImage(this.image,this.x2,this.y2);
            obj.ctx.drawImage(this.image,this.x3,this.y3);
        }
        this.update = function() {
            this.x1--;
            this.x2--;
            this.x3--;
            if(this.x1 < -this.w){
                this.y1 = obj.canvas.height * 0.32 + obj.canvas.height * 0.3 * Math.random();
                this.x1 = obj.canvas.width + Math.random() * obj.canvas.width;
            }            
            if(this.x2 < -this.w){
                this.y2 = obj.canvas.height * 0.32 + obj.canvas.height * 0.3 * Math.random();
                this.x2 = obj.canvas.width + Math.random() * obj.canvas.width;
            }
            if(this.x3 < -this.w){
                this.y3 = obj.canvas.height * 0.32 + obj.canvas.height * 0.3 * Math.random();
                this.x3 = obj.canvas.width + Math.random() * obj.canvas.width;
            }
        }
    }
})()