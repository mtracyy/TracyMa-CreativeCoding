function setup() {
    createCanvas(600, 500);
    background(0);

    ball1 = new Ball(random(580), random(480), color(int(random(0, 256)), int(random(0,256)), int(random(0,256))), int(random(20, 50)) );
    ball2 = new Ball(random(580), random(480), color(int(random(0, 256)), int(random(0,256)), int(random(0,256))), int(random(20, 50)) );
    ball3 = new Ball(random(580), random(480), color(int(random(0, 256)), int(random(0,256)), int(random(0,256))), int(random(20, 50)) );
    ball4 = new Ball(random(580), random(480), color(int(random(0, 256)), int(random(0,256)), int(random(0,256))), int(random(20, 50)) );
    ball5 = new Ball(random(580), random(480), color(int(random(0, 256)), int(random(0,256)), int(random(0,256))), int(random(20, 50)) );
}

function draw() {
    background(0);
    ball1.drawShape();
    ball1.move();

    ball2.drawShape();
    ball2.move();

    ball3.drawShape();
    ball3.move();

    ball4.drawShape();
    ball4.move();

    ball5.drawShape();
    ball5.move();
}

function Ball(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.xDirection = true;
    this.yDirection = true;

    this.drawShape = function () {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    };

    this.move = function () {
        if (this.xDirection) {
            this.x += 5;
        } else {
            this.x -= 5;
        }

        if (this.yDirection) {
            this.y += 5;
        } else {
            this.y -= 5;
        }

        if ((this.x >= 590) && (this.xDirection)) {
            this.xDirection = false;
        } else if ((this.x <= 10) && (!this.xDirection)) {
            this.xDirection = true;
        }

        if ((this.y >= 490) && (this.yDirection)) {
            this.yDirection = false;
        } else if ((this.y <= 10) && (!this.yDirection)) {
            this.yDirection = true;
        }
    }
}
