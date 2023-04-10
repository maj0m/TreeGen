class Tree {
    constructor(rootX, rootY, minLen, maxLen, minLenMultiplier, maxLenMultiplier, maxThickness, minRot, maxRot, maxTurns, leafSize, color, leafColor) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.minLen = minLen;
        this.maxLen = maxLen;
        this.minLenMultiplier = minLenMultiplier;
        this.maxLenMultiplier = maxLenMultiplier;
        this.maxThickness = maxThickness;
        this.minRot = minRot;
        this.maxRot = maxRot;
        this.maxTurns = maxTurns;
        this.leafSize = leafSize;
        
        this.color = color;
        this.leafColor = leafColor;

        this.branches = [];
        this.leaves = [];
    }

    buildTree() {
        this.createBranch(null, this.rootX, this.rootY, this.maxLen, 0, this.maxThickness, 0);
    }
  
    createBranch(parent, startX, startY, len, rot, thickness, turns) {                
        if(len > this.minLen && abs(turns) < this.maxTurns) {
            var branch = new Branch(parent, startX, startY, len, rot, thickness, this.color);
            this.addBranch(branch);    

            var A = random(this.minLenMultiplier, this.maxLenMultiplier);
            var B = random(this.minLenMultiplier, this.maxLenMultiplier);
            this.createBranch(branch, branch.endX, branch.endY, len * A, rot - random(this.minRot, this.maxRot), thickness * A, turns + 1);
            this.createBranch(branch, branch.endX, branch.endY, len * B, rot + random(this.minRot, this.maxRot), thickness * B, turns - 1);
        } 
        
        else if(len < this.minLen) {
            var leaf = new Leaf(parent, startX, startY, this.leafSize, this.leafColor);
            this.addLeaf(leaf);
        }
    }
  
    addBranch(b) {
        this.branches.push(b);
    }

    addLeaf(l) {
        this.leaves.push(l);
    }
  
    clearTree() {
        this.branches = [];
        this.leaves = [];
    }

    drawTree() {
        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].drawBranch();
        }

        for(var j = 0; j < this.leaves.length; j++) {
            this.leaves[j].drawLeaf();
        }
    }

    move(x, y) {
        this.rootX = x;
        this.rootY = y;

        var newX = x - this.branches[0].startX;
        var newY = y - this.branches[0].startY;
        
        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].move(newX, newY);
        }

        for(var i = 0; i < this.leaves.length; i++) {
            this.leaves[i].move(newX, newY);
        }
    }

    scale(s) {
        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].rescaleBranch(s);
        }

        for(var i = 0; i < this.leaves.length; i++) {
            this.leaves[i].rescaleLeaf(s);
        }
    }
  }