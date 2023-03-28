var minLength = 10;
var maxLength = 100;
var minThickness = 1;
var maxThickness = 30;
var minLengthMultiplier = 0.7;
var maxLengthMultiplier = 0.9;
var minRot = 10;
var maxRot = 35;
var maxTurns = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  noLoop()
}

function draw() {
  background(100);
  translate(width / 2, height / 2 + maxLength*2);

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
    fill(r, g, b);
    noStroke();
    ellipse(0, 0, 15);
  }

  pop();
  

}
