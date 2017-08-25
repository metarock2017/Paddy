(function() {
    var Bomb = window.Bomb = function(obj,y) {
        this.image = obj.img.bomb;
        this.x = obj.llp.x + 20;
        this.y = obj.llp.y + 20;
        this.render = function(x,y) {
            obj.ctx.drawImage(this.image,this.x,this.y);
        }
        this.update = function() {
            this.x += 3;
            // this.y = y;
        }
    }
})()