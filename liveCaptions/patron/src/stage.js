class Stage {
    constructor(_center, _radius, _width, _height, _depth) {
        this.center = _center;
        this.radius= _radius;
        this.width= _width;
        this.height= _height;
        this.depth = _depth;
    }

    arrangeCast(actors) {
        let anglePos = globalP5.TWO_PI / actors.length;
        for (let i = 0; i < actors.length; i++) {
            let pos = Utils.getXY(anglePos * i, this.center.x, this.center.y, this.radius)
            actors[i].setAngle(anglePos*i)
            actors[i].setPosition(pos);
        }
    }

    show() {
        globalP5.noFill()
        globalP5.stroke(255,30)
        globalP5.rect(this.center.x, this.center.y, this.width, this.height)
        //ellipse(this.center.x, this.center.y, this.radius*2, this.radius*2)
        globalP5.fill(255)
        globalP5.text("N", this.center.x, -10 + this.center.y -this.height/2)
        globalP5.text("S", this.center.x, 20 + this.center.y +this.height/2)
        globalP5.text("E", 10 + this.center.x + this.width/2, this.center.y)
        globalP5.text("W", -20 + this.center.x - this.width/2, this.center.y)
    }


}