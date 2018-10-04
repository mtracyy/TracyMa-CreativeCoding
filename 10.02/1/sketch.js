function setup() {
    createCanvas(600, 500);
    background(200);
    rectMode(CENTER);
}

function draw() {
    push();
    translate(200, 200);
    rotate(PI/3);
    rect(0, 0, 40, 70);
    pop();

    push();
    translate(300, 200);
    rotate(PI/6);
    rect(0, 0, 50, 80);
    pop();

    push();
    translate(400, 200);
    rotate(PI/9);
    rect(0, 0, 60, 90);
    pop();

}
