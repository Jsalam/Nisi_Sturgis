class Camera{
    constructor(){
        this.camera = globalP5.createCamera();
        this.target;
        this.pos;
        this.currentAngleOnXY = 0;
    }

    lookAt(_x, _y, _z){
        this.target =  globalP5.createVector(_x, _y, _z)
        this.camera.lookAt(_x, _y, _z)
    }

    setPosition(_x, _y, _z){
        this.pos =  globalP5.createVector(_x, _y, _z)
        this.camera.setPosition(_x, _y, _z)
    }

    orbitate(radius){
        this.currentAngleOnXY =  globalP5.map( globalP5.mouseX, 0,  globalP5.width, -Math.PI, Math.PI) + Math.PI/2
        let newPos = Utils.getXY(this.currentAngleOnXY, 0, 0, radius)
        this.setPosition(newPos.x,  newPos.y, this.pos.z)
        this.camera.camera(newPos.x,  newPos.y, this.pos.z, 0,0,0, 0,0,-1)
    }
}