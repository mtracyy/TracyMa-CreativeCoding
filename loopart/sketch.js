var xPos;
var yPos;
var redColor;
var blueColor;
var spacingY;
var spacingX;
var quad1Y;
var quad1X;
var circlewidth;
var color;

function setup() {
    createCanvas(700, 700);
    background(220);
    xPos = 0;
    yPos = 0;
    redColor = 0;
    blueColor = 0;
    spacingY = 40;
    spacingX = 23;

    quad1Y = int((height / 20)/(4));
    quad1X = int((width / 22));
    quad2X = int((width / 22));

    circlewidth = 18;
    noStroke();


    //top left corner
    color = 30;
    fill(color);

    for (var j = 0; j < quad1X -1 ; j++) {
        // console.log(quad1X);
        xPos = (j * spacingX) + 10;
        spacingX *= 0.976;
        // color += 1;

        for (i = 0; i < quad1Y; i++) {
            if (j % 2 === 0) {
                yPos = (i * spacingY) + 10;
            } else {
                yPos = (i * spacingY) + 30;
            }
            color += 0.2;
            fill(color);

            ellipse(xPos, yPos, circlewidth, 18);
            circlewidth *= 0.993;
            // console.log(circlewidth);
        }
    }


    //top right corner
    color = 30;
    fill(color);
    spacingX = 23;
    circlewidth = 18;

    for (j = quad1X; j > 1; j--) {
        // console.log(quad1X);
        xPos = (j * spacingX) * (0.5) + width/2.1;
        spacingX *= .970;
        // color -= 1;

        for (i = 0; i < quad1Y; i++) {
            if (j % 2 === 0) {
                yPos = (i * spacingY) + 10;
            } else {
                yPos = (i * spacingY) + 30;
            }

            color += 0.2;
            fill(color);

            ellipse(xPos, yPos, circlewidth, 18);
            circlewidth *= 0.994;
            // console.log(circlewidth);
        }
    }


    //bottom left
    color = 0;
    fill(color);
    spacingX = 23;
    circlewidth = 18;
    downOffset = (width/2.2);

    for (j = 0; j < quad2X+1; j++) {
        // console.log(quad1X);
        xPos = (j * spacingX) + 10;
        spacingX *= 0.978;
        // color -= 1;

        for (i = 0; i < quad1Y; i++) {
            if (j % 2 === 0) {
                yPos = (i * spacingY) + 10 + downOffset;
            } else {
                yPos = (i * spacingY) + 30 + downOffset;
            }

            color += 0.3;
            fill(color);

            ellipse(xPos, yPos, circlewidth, 18);
            circlewidth *= 0.993;
            // console.log(circlewidth);
        }
    }


    //bottom right
    color = 0;
    fill(color);
    spacingX = 23;
    circlewidth = 18;

    for (j = quad2X; j > 7 ; j--) {
        // console.log(quad1X);
        xPos = (j * spacingX) * (0.5) + width/2.1;
        spacingX *= .965;

        for (i = 0; i < quad1Y; i++) {
            if (j % 2 === 0) {
                yPos = (i * spacingY) + 10 + downOffset;
            } else {
                yPos = (i * spacingY) + 30 + downOffset;
            }

            color += 0.4;
            fill(color);

            ellipse(xPos, yPos, circlewidth, 18);
            circlewidth *= 0.993;
            // console.log(circlewidth);
        }
    }

}


function draw() {

}