class Branch {
    constructor(parent, startX, startY, len, rot, thickness, color) {
        this.color = color;
        this.parent = parent;
        if(parent == null) {
            this.startX = startX;
            this.startY = startY;
        }
        else {
            this.startX = this.parent.endX;
            this.startY = this.parent.endY;
        }
        
        this.len = len;
        this.rot = rot;
        this.thickness = thickness;
        this.endX = this.startX - this.len * sin(this.rot);
        this.endY = this.startY - this.len * cos(this.rot);
    }
  
    drawBranch() {
        push();
        stroke(this.color);
        strokeWeight(this.thickness);
        line(this.startX, this.startY, this.endX, this.endY);
        pop();
    }

    move(x, y) {
        this.startX += x;
        this.startY += y;
        this.endX += x;
        this.endY += y;
    } 

    rescaleBranch(s) {
        this.thickness *= s;
        this.len *= s;

        if(this.parent != null) {
            this.startX = this.parent.endX;
            this.startY = this.parent.endY;
        }

        this.endX = this.startX - this.len * sin(this.rot);
        this.endY = this.startY - this.len * cos(this.rot);
    }
  }