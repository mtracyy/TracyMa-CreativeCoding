var input;
var button;
var htmlColor;
var canvas;

function setup() {
    canvas = createCanvas(width, height);

    instructions = createElement('h1', 'enter a common color');
    instructions.style('font-family', 'Montserrat');
    instructions.position(180, 80);
    input = createInput("red");
    input.position(200, 180);
    input.style('width', '300px');
    input.style('height', '40px');
    input.style('background-color', 'rgba(200, 200, 200, 0.5)');
    input.style('border', 'none');
    input.style('font-size', '18px');
    input.style('-webkit-transition', 'height,width 0.3s,0.5s ease-in-out');


    button = createButton("Enter");
    button.position(200, 250);
    button.style('background-color', 'rgba(82, 103, 110, 0.5)');
    button.style('border', 'none');
    button.style('height', '38px');
    button.style('line-height', '35px');
    button.style('width', '80px');
    button.style('color', 'white');
    button.style('text-align', 'center');
    button.style('font-size', '20px');
    button.style('font-weight', 'bold');


    htmlColor = createDiv("");
    htmlColor.position(100, 500);

}

function draw() {
    button.mousePressed(printColor);
    htmlColor.style('left', mouseX + 'px');
}

function printColor() {
    if (htmlColor) {
        htmlColor.html(input.value());
    }

    htmlColor.style('color', input.value().toUpperCase());
    htmlColor.style('font-size', '40px');
    htmlColor.style('font-family', 'Montserrat');

    input.value("");
}
