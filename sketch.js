var generateButton;
var tree;

function setup() {
  generateButton = createButton("Generate Tree");
  generateButton.position(10, 20);
  generateButton.mousePressed(newTree);

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  tree = new Tree(windowWidth/2, windowHeight/2 + 250, 8, 80, 0.5, 1, 16, 20, 40, 5, 14, [70, 40, 20], [80, 120, 40, 255]);
  tree.buildTree();

  //noLoop();
}

function draw() {
  background(100);
  
  textSize(16);
  text('Controls:\nGenerate tree: "SpaceBar"\nScale Up: "W" / "UpArrow"\nScale Down: "S" / "DownArrow"\nMove root: "LeftMouseButton"', 10, 60);
  text('Presets:\nPress "1" for Oak (Default)\nPress "2" for Cherry\nPress "3" for Willow', 10, 180);
  

  tree.drawTree();

}

function newTree() {
  tree.clearTree();
  tree.buildTree();
}

function mouseClicked() {
  if( mouseX > 200 && mouseY > 200) { //Bal oldali textre es kepernyo felso reszere ne lehessen fat rakni
    tree.move(mouseX, mouseY);
  }
}

function keyPressed() {
  if(keyCode == 32) { // Space - Generate new tree
    newTree();
  }

  else if(keyCode == 49) { // 1 - Regular
    tree = new Tree(tree.rootX, tree.rootY, 8, 80, 0.5, 1, 16, 20, 40, 5, 14, [70, 40, 20], [80, 120, 40, 255]);
    newTree();
  }

  else if(keyCode == 50) { // 2 - Cherry
    tree = new Tree(tree.rootX, tree.rootY, 5, 75, 0.6, 0.95, 24, 20, 30, 5, 12, [34,27,24], [200,136,210, 150]);
    newTree();
  }

  else if(keyCode == 51) { // 3 - Willow
    tree = new Tree(tree.rootX, tree.rootY, 8, 90, 0.6, 0.95, 30, 20, 40, 7, 15, [57,43,36], [104, 145, 66, 180]);
    newTree();
  }

  else if(keyCode == 87 || keyCode == 38) { // W vagy UpArrow - Scale up
    tree.scale(1.05);
  }

  else if(keyCode == 83 || keyCode == 40) { // S vagy DownArrow - Scale down
    tree.scale(0.95);
  }
}




  
  

