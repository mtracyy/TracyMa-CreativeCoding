// my partner was Taline

var color1;
var color2;


function setup() {
    createCanvas(1200, 650);
    ellipseMode(CENTER);
	rectMode(CENTER);

	background(0);

    color1 = color(0,175,175);
    color2 = color(200,0,40);

    drawPath();
}

//Tracy - draws single spiral
function spiral(locX, locY, value) {
    center = 0;
    radius = 0.1;

    for (var times=0; times<300; times++) {
        x = radius * cos(center);
        y = radius * sin(center);
        push();
        translate(locX, locY);
        noStroke();
        fill(255);
        ellipse(x, y, 3, 3);
        pop();

        center += value;
        radius += 0.1;
    }

}

//Tracy - draws spirals in diagonal/triangular formation
function drawPath() {
	for (var diagonalRow = 1; diagonalRow < 13; diagonalRow++) {
		push();
		translate(-42 * diagonalRow, 42 * diagonalRow);

		for (var y=1; y < 16; y++) {
			yOffset = y * 35;
			for (var x = 1; x < 16; x++) {
				xOffset = x * 35;
				if (x===y) {
					spiral((width / 2.03) + xOffset, (height / 6) + yOffset, random(1,15)/10);
				}
			}
		}

		pop();

	}
}

//Taline - draws single flower
function flower(){

	stroke(1);
	fill(0);
	ellipse(100,100,100,100);

	push();
	translate(100,100);
	y = map(mouseY,0,500,0,PI);
	rotate(y);
	fill(color1);
		rect(0,0,70,70);
	pop();


	push();
	fill(color2);
	translate(100,100);
	x = map (mouseX, 0, 600, 0, PI);
		rotate(x);
	rect(0,0,70,70);
	pop();

	push();
	translate(100,100);
	y = map(mouseY,0,500,0,PI);
	rotate(y);
	fill(color1);
		rect(0,0,60,60);
	pop();

	push();
	fill(color2);
	translate(100,100);
	x = map (mouseX, 0, 600, 0, PI);
		rotate(x);
	rect(0,0,60,60);
	pop();

	push();
	translate(100,100);
	y = map(mouseY,0,500,0,PI);
	rotate(y);
	fill(color1);
		rect(0,0,50,50);
	pop();

	push();
	fill(color2);
	translate(100,100);
	x = map (mouseX, 0, 600, 0, PI);
		rotate(x);
	rect(0,0,50,50);
	pop();

	push();
	translate(100,100);
	y = map(mouseY,0,500,0,PI);
	rotate(y);
	fill(color1);
		rect(0,0,40,40);
	pop();

	push();
	fill(color2);
	translate(100,100);
	x = map (mouseX, 0, 600, 0, PI);
		rotate(x);
	rect(0,0,40,40);
	pop();

	push();
	translate(100,100);
	y = map(mouseY,0,500,0,PI);
	rotate(y);
	fill(color1);
		rect(0,0,30,30);
	pop();

	push();
	fill(color2);
	translate(100,100);
	x = map (mouseX, 0, 600, 0, PI);
		rotate(x);
	rect(0,0,30,30);
	pop();

	push();
	translate(100,100);
	y = map(mouseY,0,500,0,PI);
	rotate(y);
	fill(color1);
		rect(0,0,20,20);
	pop();

	push();
	fill(color2);
	translate(100,100);
	x = map (mouseX, 0, 600, 0, PI);
		rotate(x);
	rect(0,0,20,20);
	pop();

}

//Taline - draws single tree
function tree(){

push();
	strokeWeight(7);
	//stroke(130,110,90);
	stroke(200);
 	line(130,height,130,450);

 	strokeWeight(5);
	 	line(129,450,155,400); 	
	 	line(130,475,80,400);
	 	line(130,500,190,425);
	 	line(130,525,50,450);
	 	line(130,540,180,515);
	 	line(130,540,90,525);
	 	line(160,465,200,455);
	 	line(90,490,50,500);


 	strokeWeight(3);
	 	line(155,400,140,375);
	 	line(155,400,170,375);
	 	line(80,400,100,380);
	 	line(80,400,60,380);
	 	line(50,450,40,425);
	 	line(50,450,30,440);
	 	line(190,425,180,405);
	 	line(190,425,210,415);
	 	line(180,515,185,500);
	 	line(180,515,195,525);
	 	line(50,500,40,515);
	 	line(50,500,40,485);
	 	line(90,525,80,535);
	 	line(90,525,80,515);
	 	line(200,455,215,465);
	 	line(200,455,215,445);


 	strokeWeight(1);
 		line(90,490,90,460);
 		line(90,460,100,450);
 		line(90,460,80,450);
 		line(130,450,120,420);
 		line(120,420,100,400);
 		line(120,420,130,405);
 		line(130,540,150,510);
 		line(150,510,165,500);
 		line(150,510,155,490);

pop();
}



function draw() {
	push();
	translate(0, -60); // Tracy - I added this translate (+nested pop/push) to move the trees and flowers up to fill more empty space at top

		tree();

		//Tree duplicates

		//left side
		push();
			translate(190,20);
			scale(0.75);
			tree();
		pop();

		push();
			translate(330,60);
			scale(0.5);
			tree();
		pop();

		push();
			translate(450,100);
			scale(0.3);
			tree();
		pop();

		//right side

		push();
			translate(920,0);
			scale(1);
			tree();
		pop();

		push();
			translate(800,20);
			scale(0.75);
			tree();
		pop();

		push();
			translate(700,60);
			scale(0.50);
			tree();
		pop();

		push();
			translate(640,100);
			scale(0.30);
			tree();
		pop();


		//flower duplicates

		//left side
		push();
			translate(110,350);
			scale(0.3);
			flower();
		pop();

		push();
			translate(10,460);
			scale(0.25);
			flower();
		pop();

		push();
			translate(180,505);
			scale(0.2);
			flower();
		pop();

		push();
			translate(200,315);
			scale(0.2);
			flower();
		pop();

		push();
			translate(250,290);
			scale(0.15);
			flower();
		pop();

		push();
			translate(340,355);
			scale(0.2);
			flower();
		pop();

		push();
			translate(340,295);
			scale(0.1);
			flower();
		pop();

		push();
			translate(425,285);
			scale(0.1);
			flower();
		pop();

		push();
			translate(390,240);
			scale(0.1);
			flower();
		pop();

		push();
			translate(455,240);
			scale(0.05);
			flower();
		pop();

		push();
			translate(485,205);
			scale(0.05);
			flower();
		pop();

		//right side

		push();
			translate(910,410);
			scale(0.3);
			flower();
		pop();

		push();
			translate(1000,350);
			scale(0.25);
			flower();
		pop();

		push();
			translate(1085,470);
			scale(0.25);
			flower();
		pop();

		push();
			translate(890,280);
			scale(0.2);
			flower();
		pop();

		push();
			translate(810,360);
			scale(0.2);
			flower();
		pop();

		push();
			translate(795,265);
			scale(0.15);
			flower();
		pop();

		push();
			translate(730,275);
			scale(0.1);
			flower();
		pop();

		push();
			translate(740,240);
			scale(0.1);
			flower();
		pop();

		push();
			translate(700,235);
			scale(0.05);
			flower();
		pop();

		push();
			translate(645,215);
			scale(0.1);
			flower();
		pop();

    pop();

 }