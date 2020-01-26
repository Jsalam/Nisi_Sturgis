class Actor{
    constructor(_id, _name, _speechColor){
        this.id = _id;
        this.name = _name;
        this.speechColor = _speechColor
        this.pos = createVector(0,0,0);
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
        textAlign(CENTER)
        push()
        translate(this.pos.x, this.pos.y)
        noStroke();
        fill(200,10)
        ellipse(0,0,10,10)
        fill(200,40)
        rotateX(-PI/2)
        let faceCamera = PI/2 - cam1.currentAngleOnXY 
        rotateY(faceCamera)
        
        if (this.speechColor){
            fill(this.speechColor)
        } else {
            fill(200,60)
        }
        
        if (this.currentCaption){
            this.currentCaption.display();
            if (this.currentCaption.visible === false){
                this.currentCaption.reset();
                this.currentCaption = undefined;
            }
        }
        rotateX(PI/2)
        fill(200,60)
        text(this.name, 0,0)
        pop()
    }
}