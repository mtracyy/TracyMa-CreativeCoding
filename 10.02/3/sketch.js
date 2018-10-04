function setup() {
    createCanvas(600, 500);
    background(200);
    rectMode(CENTER);
}

function draw() {
    background(200);

    for (i = 0; i < 3; i++) {
        transX = ((i+1) * 100) + 100;
        rotateDegree = map(mouseX, 0, width, 0, 360);
        rectWidth = (i+1) * 15 + (5 * (i+1));
        rectHeight = ((i+1) * 10) + (20 * (i+1));

        push();
        translate(transX, 200);
        rotate(radians(rotateDegree));
        rect(0, 0, rectWidth, rectHeight);
        pop();
    }

}