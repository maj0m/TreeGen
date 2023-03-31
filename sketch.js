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
  generateButton.mouseReleased(update);
 

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  update();
  noLoop();
}

function draw() {
  background(100);
 
  fill(0, 0, 0);
  textSize(32);
  text('Presets:\nRegular: Press "1"\nCherry: Press "2"\nWillow: Press "3"', 10, 80);

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

//----------SETTINGS----------//

class Settings {
  constructor(_leafSize, _leafAlpha, _minBranchLength, _maxBranchLength, _branchThickness, _leafColor,
              _branchColor, _maxTurns, _minLengthMultiplier, _maxLengthMultiplier) {
    this.leafSize             = _leafSize;
    this.leafAlpha            = _leafAlpha;
    this.minBranchLength      = _minBranchLength;
    this.maxBranchLength      = _maxBranchLength;
    this.branchThickness      = _branchThickness;
    this.leafColor            = _leafColor;
    this.branchColor          = _branchColor;
    this.maxTurns             = _maxTurns;
    this.minLengthMultiplier  = _minLengthMultiplier;
    this.maxLengthMultiplier  = _maxLengthMultiplier;
  }
}

var settings;
var preset1 = new Settings(15, 255, 8, 80, 24, [80, 120, 40], [70, 40, 20], 5, 0.5, 1);
var preset2 = new Settings(12, 150, 5, 75, 28, [200,136,210], [34,27,24], 5, 0.6, 0.95);
var preset3 = new Settings(15, 190, 8, 90, 30, [104, 145, 66], [57,43,36], 7, 0.6, 1);
settings = preset1;

function keyPressed() {
  if(keyCode == 49) {
    settings = preset1;
  }

  else if(keyCode == 50) {
    settings = preset2;
  }

  else if(keyCode == 51) {
    settings = preset3;
  }
}

//----------GUI----------//

var gui = new dat.GUI();
gui.add(settings, 'leafSize' ,5,30,1);
gui.add(settings, 'leafAlpha',0,255, 1);
gui.add(settings, 'minBranchLength', 3, 20, 1);
gui.add(settings, 'maxBranchLength', 50, 100, 1);
gui.add(settings, 'branchThickness', 5, 40, 1);
gui.addColor(settings, 'leafColor');
gui.addColor(settings, 'branchColor');

var advancedOptions = gui.addFolder('Advanced');
advancedOptions.add(settings, 'maxTurns', 2, 20, 1);
advancedOptions.add(settings, 'minLengthMultiplier', 0.4, 0.8, 0.01);
advancedOptions.add(settings, 'maxLengthMultiplier', 0.8, 1, 0.01);

function update() {
  leafSize = settings.leafSize;
  leafAlpha = settings.leafAlpha;
  minBranchLength = settings.minBranchLength;
  maxBranchLength = settings.maxBranchLength;
  branchThickness = settings.branchThickness;
  leafColor = settings.leafColor;
  branchColor = settings.branchColor;
  maxTurns = settings.maxTurns;
  minLengthMultiplier = settings.minLengthMultiplier;
  maxLengthMultiplier = settings.maxLengthMultiplier;
  
  redraw();
}