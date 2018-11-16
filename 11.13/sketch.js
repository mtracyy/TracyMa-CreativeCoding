var url;
var baseURL;
var query;
var flavors = [];
var berriesData = [];
var textures = [];
var berrySpheres = [];

function preload() {
    spicy = loadImage("assets/spicy.jpg");
    dry = loadImage("assets/dry.jpg");
    sweet = loadImage("assets/sweet.jpg");
    bitter = loadImage("assets/bitter.jpg");
    sour = loadImage("assets/sour.jpg");

    textures.push(spicy);
    textures.push(dry);
    textures.push(sweet);
    textures.push(bitter);
    textures.push(sour);

    font = loadFont("assets/odinfont.otf");
}

function setup() {
    createCanvas(600, 600, WEBGL);
    background(250,235,215);

    baseURL = "https://pokeapi.co/api/v2/berry-flavor/";

    for (var i=1; i < 6; i++) {
        query = str(i) + "/";
        url = baseURL + query;
        myBerries = loadJSON(url, gotBerries)
    }

    noStroke();
    textFont(font);
    textSize(15);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(188,143,143);

    for (var d = 0; d < berrySpheres.length; d++) { //draws the 5 ellipses that represent flavors
        push();
        texture(textures[d]);
        ellipse(berrySpheres[d].x, berrySpheres[d].y, berrySpheres[d].size, berrySpheres[d].size);
        pop();
    }

    for (var n = 0; n < berrySpheres.length; n++) { //checks if flavor ellipses are moused over
        if (dist(mouseX-300, mouseY-300, berrySpheres[n].x, berrySpheres[n].y) < berrySpheres[n].size/2) {
            for (var b=0; b < berriesData[n].length; b++) {
                push();
                    translate(berrySpheres[n].x, berrySpheres[n].y);
                    rotate(.21 * b); // translate+rotate to draw "berries" around the flavor ellipse
                    var berryColor = map(berriesData[n][b].potency, 10, 30, 80, 255);
                    fill(berryColor, 50, 80); // berries' color saturation based on potency value
                    ellipse(berrySpheres[n].size/2, berrySpheres[n].size/2, 10, 10);
                    // translate(berrySpheres[n].x, berrySpheres[n].y);
                pop();
            }
        } else {
            fill(255);
            text(flavors[n].toUpperCase(), berrySpheres[n].x, berrySpheres[n].y+berrySpheres[n].size/2 + 10);
        }
    }

}

function gotBerries(myBerries) {
    berriesData.push(myBerries.berries);
    flavors.push(myBerries.name);

    currentFlavorSize = map(myBerries.berries.length, 28, 30, 80, 100);
    berrySpheres.push(new BerryFlavor(((myBerries.id-1) * 100) - 200, ((myBerries.id-1) * 100) - 200, currentFlavorSize));
}

function BerryFlavor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
}