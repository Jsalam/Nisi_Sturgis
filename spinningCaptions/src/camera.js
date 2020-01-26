class Camera{
    constructor(){
        this.camera = createCamera();
        this.target;
        this.pos;
        this.currentAngleOnXY = 0;
    }

    lookAt(_x, _y, _z){
        this.target = createVector(_x, _y, _z)
        this.camera.lookAt(_x, _y, _z)
    }

    setPosition(_x, _y, _z){
        this.pos = createVector(_x, _y, _z)
        this.camera.setPosition(_x, _y, _z)
    }

    orbitate(radius){
        this.currentAngleOnXY = map(mouseX, 0, width, -PI, PI) + PI/2
        let newPos = Utils.getXY(this.currentAngleOnXY, 0, 0, radius)
        this.setPosition(newPos.x,  newPos.y, this.pos.z)
        this.camera.camera(newPos.x,  newPos.y, this.pos.z, 0,0,0, 0,0,-1)
    }
}