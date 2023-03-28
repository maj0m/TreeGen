var leafSize = 15;
var leafAlpha = 255;
var minLength = 8;
var maxLength = 80;
var minThickness = 1;
var maxThickness = 24;
var minLengthMultiplier = 0.5;
var maxLengthMultiplier = 1;
var minRot = 20;
var maxRot = 40;
var maxTurns = 5;

var maxTurnsSlider;
var generateButton;

function setup() {
  generateButton = createButton("Generate Tree");
  generateButton.position(10, 20);
  generateButton.mousePressed(redraw);

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  noLoop()
}

function draw() {
  background(100);
  translate(width / 2, height / 2 + 200);

  branch(maxLength, 0, 0);
}

function branch(len, rot, turns) {
  push();


  //branches
  if(len > minLength && abs(turns) < maxTurns) {
    rotate(rot);
    strokeWeight(map(len, minLength, maxLength, minThickness, maxThickness));
    stroke(70, 40, 20);
    line(0, 0, 0, -len);
    translate(0, -len);
    branch(len * random(minLengthMultiplier, maxLengthMultiplier), random(minRot, maxRot), turns+1);
    branch(len * random(minLengthMultiplier, maxLengthMultiplier), random(-minRot, -maxRot), turns-1);
  }

  //leaves
  else if(len <= minLength) {
    var r = 80 + random(-20, 20);
    var g = 120 + random(-20, 20);
    var b = 40 + random(-20, 20);
    fill(r, g, b, leafAlpha);
    noStroke();
    ellipse(0, 0, leafSize);
  }

  pop();
  

}
