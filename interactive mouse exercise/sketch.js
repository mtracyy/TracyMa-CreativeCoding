function setup() {
    createCanvas(600, 500);
    background(0, 0, 0);
}

function draw() {
}

function mouseMoved() {
    if (mouseY < (height / 3) && (mouseX < width / 2)) {
        background(30, 200, 100);
    } else if ((mouseY > (height / 3) && (mouseX < width / 2))) {
        background(100, 30, 200);
    } else {
        background(200, 30, 100);
    }

    if (mouseX === 500) {
        ellipse(500, random(0, 500), 50, 50);
    }
}