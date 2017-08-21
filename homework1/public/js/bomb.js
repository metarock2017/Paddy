(function() {
    var Bomb = window.Bomb = function(obj,x) {
        this.image = obj.img.bomb;
        this.x = x;
        this.y = obj.canvas.height * 0.7 - 54;
        this.render = function() {
            obj.ctx.drawImage(this.image,this.x,this.y);
        }
        this.update = function() {
            this.x++;
        }
    }
})()