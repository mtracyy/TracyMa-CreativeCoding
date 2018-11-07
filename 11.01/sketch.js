var tori = [];
var radius = 50;
var tube_radius = 15;
var analyzers = [];
var drums;
var bass;
var guitar;
var vocals;
var img;

function preload() {
    drums = loadSound("assets/Drums.flac");
    bass = loadSound("assets/Bass.flac");
    guitar = loadSound("assets/Guitar.flac");
    vocals = loadSound("assets/Vocals.flac");

    img = loadImage("assets/texture1.jpg")

}

function setup() {
    createCanvas(600, 600, WEBGL);
    background(0);
    drums.jump(.2);
    bass.jump(.3);
    guitar.jump(0.45);
    vocals.jump(0.5);

    var analyzerDrums = new p5.Amplitude();
    analyzerDrums.setInput(drums);

    var analyzerBass = new p5.Amplitude();
    analyzerBass.setInput(bass);

    var analyzerGuitar = new p5.Amplitude();
    analyzerGuitar.setInput(guitar);

    var analyzerVocals = new p5.Amplitude();
    analyzerVocals.setInput(vocals);

    analyzers = [analyzerDrums, analyzerBass, analyzerGuitar, analyzerVocals];


    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (i === j) {

                tori[i] = new Torus(i+1, i+1, radius, tube_radius, analyzers[i]);
            }
        }
    }

}

function draw() {
    background(map(tori[2].analyzer.getLevel()*100, 0, 10, 0, 255));
    for (i = 0; i < tori.length; i++) {
        tori[i].draw();
    }

    fill(163, 24, 66);
    noStroke();
    ellipse(200, -200, 10+tori[0].analyzer.getLevel()*500, 10+tori[0].analyzer.getLevel()*500);
    fill(24, 88, 162);
    ellipse(-200, 200, 10+tori[1].analyzer.getLevel()*500, 10+tori[1].analyzer.getLevel()*500);
}

function Torus (x, y, radius, tube_radius, analyzer) {
    this.x = x*120;
    this.y = y*120;
    this.radius = radius;
    this.tube_radius = tube_radius;
    this.analyzer = analyzer;

    this.draw = function () {
        rms = this.analyzer.getLevel() / 100;
        // console.log(rms);
        push();
        translate(this.x-300, this.y-300);
        rotateX(frameCount * rms);
        rotateY(frameCount * rms);
        texture(img);
        torus(this.radius, this.tube_radius);
        pop();
    };

}
