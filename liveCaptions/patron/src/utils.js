class Utils {
    static getHeading(x, y) {
        return globalP5.atan2(globalP5.mouseY - y, globalP5.mouseX - x);
    }

    static getX(angle, radius) {
        return globalP5.cos(angle) * radius;
    }


    static getY(angle, radius) {
        return globalP5.sin(angle) * radius;
    }

    static getXY(angle, centerX, centerY, radius) {
        let xComp = centerX + Utils.getX(angle, radius);
        let yComp = centerY + Utils.getY(angle, radius);
        return (globalP5.createVector(xComp, yComp));
    }

    static drawVector(xVect, yVect, radius) {
        let a = getHeading(xVect, yVect);
        let pos = getXY(a, radius);
        globalP5.stroke(globalP5.map(globalP5.dist(mouseX, mouseY, xVect, yVect), 0, 400, 205, 25));
        globalP5.line(xVect, yVect, pos.x + xVect, pos.y + yVect);
      }
}