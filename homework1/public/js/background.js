(function() {
    var Background = window.Background = function(obj) {
        this.image = obj.img.background;
        this.render = function() {
            obj.ctx.drawImage(this.image,0,0);
        }
    }
})()