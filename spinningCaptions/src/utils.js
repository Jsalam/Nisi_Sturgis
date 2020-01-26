class Utils {
    static getHeading(x, y) {
        return atan2(mouseY - y, mouseX - x);
    }

    static getX(angle, radius) {
        return cos(angle) * radius;
    }


    static getY(angle, radius) {
        return sin(angle) * radius;
    }

    static getXY(angle, centerX, centerY, radius) {
        let xComp = centerX + Utils.getX(angle, radius);
        let yComp = centerY + Utils.getY(angle, radius);
        return (createVector(xComp, yComp));
    }

    static drawVector(xVect, yVect, radius) {
        let a = getHeading(xVect, yVect);
        let pos = getXY(a, radius);
        stroke(map(dist(mouseX, mouseY, xVect, yVect), 0, 400, 205, 25));
        line(xVect, yVect, pos.x + xVect, pos.y + yVect);
      }
}