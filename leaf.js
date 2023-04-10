class Leaf {
    constructor(parent, x, y, size, rgb) {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.size = size;
        this.r = rgb[0] + random(-20, 20);
        this.g = rgb[1] + random(-20, 20);
        this.b = rgb[2] + random(-20, 20);
        this.a = rgb[3];
    }

    drawLeaf() {
        push();
        fill(this.r, this.g, this.b, this.a);
        noStroke();
        circle(this.x, this.y, this.size);
        pop();
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    } 

    rescaleLeaf(s) {
        this.size *= s;

            this.x = this.parent.endX;
            this.y = this.parent.endY;

    }
}