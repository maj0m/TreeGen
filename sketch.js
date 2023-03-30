var leafSize;
var leafAlpha;
var minBranchLength;
var maxBranchLength;
var branchThickness;
var leafColor;
var branchColor;

var maxTurns;
var minLengthMultiplier;
var maxLengthMultiplier;

const minRot = 20;
const maxRot = 40;

var generateButton;

function setup() {
  generateButton = createButton("Generate Tree");
  generateButton.position(10, 20);
  generateButton.mousePressed(update);

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  update();
  noLoop();
}

function draw() {
  background(100);
  translate(width / 2, height / 2 + 250);
  branch(maxBranchLength, 0, 0);
}

function branch(len, rot, turns) {
  push();

  //Branches
  if(len > minBranchLength && abs(turns) < maxTurns) {
    rotate(rot);
    strokeWeight(map(len, minBranchLength, maxBranchLength, 1, branchThickness));
    stroke(branchColor);
    line(0, 0, 0, -len);
    translate(0, -len);
    branch(len * random(minLengthMultiplier, maxLengthMultiplier), random(minRot, maxRot), turns+1);
    branch(len * random(minLengthMultiplier, maxLengthMultiplier), random(-minRot, -maxRot), turns-1);
  }

  //Leaves
  else if(len <= minBranchLength) {
    var r = leafColor[0] + random(-20, 20);
    var g = leafColor[1] + random(-20, 20);
    var b = leafColor[2] + random(-20, 20);
    fill(r, g, b, leafAlpha);
    noStroke();
    ellipse(0, 0, leafSize);
  }

  pop();
}



//----------GUI----------//

var controls = new function() {
  this.leafSize = 15;
  this.leafAlpha = 255;
  this.minBranchLength = 8;
  this.maxBranchLength = 80;
  this.branchThickness = 24;
  this.leafColor = [80, 120, 40];
  this.branchColor = [70, 40, 20];
  this.maxTurns = 5;
  this.minLengthMultiplier = 0.5;
  this.maxLengthMultiplier = 1;
}

var gui = new dat.GUI();
gui.add(controls, 'leafSize',5,30,1);
gui.add(controls, 'leafAlpha',0,255, 1);
gui.add(controls, 'minBranchLength', 3, 20, 1);
gui.add(controls, 'maxBranchLength', 50, 100, 1);
gui.add(controls, 'branchThickness', 5, 40, 1);
gui.addColor(controls, 'leafColor');
gui.addColor(controls, 'branchColor');

var advancedOptions = gui.addFolder('Advanced');
advancedOptions.add(controls, 'maxTurns', 2, 20, 1);
advancedOptions.add(controls, 'minLengthMultiplier', 0.4, 0.8, 0.01);
advancedOptions.add(controls, 'maxLengthMultiplier', 0.8, 1, 0.01);

function update() {
  leafSize = controls.leafSize;
  leafAlpha = controls.leafAlpha;
  minBranchLength = controls.minBranchLength;
  maxBranchLength = controls.maxBranchLength;
  branchThickness = controls.branchThickness;
  leafColor = controls.leafColor;
  branchColor = controls.branchColor;
  maxTurns = controls.maxTurns;
  minLengthMultiplier = controls.minLengthMultiplier;
  maxLengthMultiplier = controls.maxLengthMultiplier;
  
  redraw();
}