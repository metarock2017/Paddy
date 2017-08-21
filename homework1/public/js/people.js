(function() {
    var Llp = window.Llp = function(obj) {
        this.image = obj.img.man;
        this.x = obj.canvas.width * 0.3;
        this.y = obj.canvas.height * 0.7 - 54;
        this.render = function() {
            obj.ctx.drawImage(this.image,this.x,this.y);
        }
    }
})()