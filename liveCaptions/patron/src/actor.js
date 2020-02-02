class Actor{
    constructor(_p5, _id, _name, _speechColor){
        this.p5 = _p5;
        this.id = _id;
        this.name = _name;
        this.speechColor = _speechColor
        this.pos = this.p5.createVector(0,0,0);
        this.angle;
        this.currentCaption;
    }

    setPosition(_pos){
        this.pos = _pos;
    }
    
    setAngle(_angle){
        this.angle = _angle;
    }

    setCaption(caption){
        this.currentCaption = caption;
    }

    show(){
        this.p5.textAlign(this.p5.CENTER)
        this.p5.push()
        this.p5.translate(this.pos.x, this.pos.y, this.pos.z)
        this.p5.noStroke();
        this.p5.fill(200,10)
        this.p5.ellipse(0,0,10,10)
        this.p5.fill(200,40)
        this.p5.rotateX(-Math.PI/2)
        let faceCamera = Math.PI/2 - cam1.currentAngleOnXY 
        this.p5.rotateY(faceCamera)
        
        if (this.speechColor){
            this.p5.fill(this.speechColor)
        } else {
            this.p5.fill(200,60)
        }
        
        if (this.currentCaption){
            this.currentCaption.display();
            if (this.currentCaption.visible === false){
                this.currentCaption.reset();
                this.currentCaption = undefined;
            }
        }
        this.p5.rotateX(Math.PI/2)
        this.p5.fill(200,60)
        this.p5.text(this.name, 0,0)
        this.p5.pop()
    }
}