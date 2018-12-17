var url;
var baseURL;
var apiKey;
var query;

var locationData;
var myLocation;
var lat;
var lon;

var r = 280;
var tempo = 1;
var adjust;

var temp;
var weather;
var cloudiness = 0;
var windSpeed = 1;
var cloudOpacity = 255;

var time;
var currentTime;
var currentColor;
var newColor;

var instruments = [];
var instrumentKeys = [];
var keyNotes;

var ellipses = [];
var snow = [];
var rain = [];
var clouds = [];
var cloudImgs = [];

var hue;
var sat;
var light;

function preload() {
    //gets user location - if user does not allow, the program will not load
    locationData =  getCurrentPosition();

    planet = loadImage("assets/planet.png");
    cityBorder = loadImage("assets/city.png");
    cloud1 = loadImage("assets/cloud1.png");
    cloud2 = loadImage("assets/cloud2.png");
    cloud3 = loadImage("assets/cloud3.png");
    cloudImgs = [cloud1, cloud2, cloud3];
    raleway = loadFont("assets/Raleway-Light.ttf");
}


function setup() {
    createCanvas(1066, 600);
    colorMode(HSL, 360);
    imageMode(CENTER);

    time = hour();
    currentTime = time;

    // sets up inital/current bg color
    hue = map(time, 0, 23, 200, 230);
    if (time > 12) {
        sat = map(time, 0, 23, 350, 100);
        cloudOpacity = map(time, 0, 23, 255, 80);
    } else {
        sat = map(time, 0, 23, 80, 360);
        cloudOpacity = map(time, 0, 23, 100, 255);
    }
    if (time > 12) {
        light = map(time, 12, 23, 290, 50);
    } else if (time >= 0 && time <= 4) {
        light = map(time, 0, 4, 50, 120);
    } else {
        light = map(time, 4, 12, 150, 300);
    }

    currentColor = color(hue, sat, light);
    background(currentColor);

    setupInstrument();

    // this is code for if location is entered manually in query
    // baseURL = "https://api.openweathermap.org/data/2.5/weather?id=";
    // // query = "5194556"; //hunter park, PA
    // // query = "5128581"; //new york, NY
    // // query = "4992263"; // eugene, OR
    // query = "5879348"; // chugach state park, AL

    apiKey = "2b12b0c37d4fe53bbc3f4f765140097d";

    //below is code for if user allows browser to access current location (lat & lon)
    baseURL = "https://api.openweathermap.org/data/2.5/weather?";
    lat = "lat=" + locationData.latitude;
    lon = "lon=" + locationData.longitude;
    query = lat + "&" + lon;

    url = baseURL + query + "&APPID=" + apiKey;

    myTemp = loadJSON(url, gotTemp);


    // this creates the rain and snow objects
    for (var s=0; s < 400; s++) {
        rain.push(new Raindrop(random(0, width), random(2, 13)));
        snow.push(new Snowflake(random(0, width), random(1, 5), round(random(0, 2))));
    }

}

// this sets up the midi notes and the location of each "key" around the globe
function setupInstrument() {
    adjust = map(time, 0, 23, -15, 15).toFixed(1);

    keyNotes = [58-adjust, 72-adjust, 64-adjust, 55-adjust, 57-adjust, 39-adjust, 43-adjust, 46-adjust, 55-adjust, 74-adjust, 79-adjust];

    for (var i=0; i < 11; i++) {
        var angle = i * 4;
        var x = cos(angle) * r;
        var y = sin(angle) * r;
        instrumentKeys.push(new InstrumentKey(x+width/2, y+height/2, keyNotes[i]));

        instruments.push(new Instrument(keyNotes[i]));
    }
}

function draw() {

    // draw visuals
    background(currentColor);
    image(cityBorder, width/2, height/2);

    // weather = "thunderstorms"; // for demonstration

    if (weather === "snow") {
        for (var s=0; s < snow.length; s++){
            snow[s].snowFall();
        }
    } else if (weather === "rain") {
        for (var r=0; r < rain.length; r++){
            rain[r].rainFall();
        }
    } else if (weather === "thunderstorms") {
        for (r=0; r < rain.length; r++){
            rain[r].rainFall();
        }
        if (millis().toFixed(0) % 100 === 0) {
            thunder();
        }
    }

    for (var c=0; c < clouds.length; c++) {
        clouds[c].draw();
    }

    image(planet, width/2, height/2);

    // text
    push();
    fill(360);
    textFont(raleway);
    textSize(40);
    textAlign(RIGHT);
    text(weather, width - 50, height - 70);
    text(temp + "°F", width - 50, height - 30);
    textAlign(LEFT);
    textSize(30);
    text(myLocation, 20, height - 30);
    pop();

    // draw visuals end ---------------------- below is code to "play" the instrument

    // the scene updates every hour/based on the hour value only
    time = hour();

    if (time !== currentTime) {
        console.log("updated theme");
        updateTheme(time);
        currentTime = time;
        currentColor = newColor;
    }

    if (ellipses.length > 0) {
        for (var e=0; e < ellipses.length; e++) {
            ellipses[e].drawE();
            for (var i=0; i < instrumentKeys.length; i++) {
                if (dist(ellipses[e].x, ellipses[e].y, instrumentKeys[i].x, instrumentKeys[i].y) < 100) {
                    instruments[i].play();
                }
            }

            if (ellipses[e].takeOut) {
                ellipses.splice(e, 1);
            }
        }
    } else { // if there are no more ellipses in globe, make 5
        for (var x=0; x<5; x++) {
            ellipses.push(new EllipseObj(width / 2, height / 2));
        }
    }

    // this is the code to "see" where the keys are (by drawing ellipses at their positions)
    // noFill();
    // ellipse(width/2, height/2, 400);
    // rect(width/2, height/2, 200, 200);


    // for (var k=0; k < instrumentKeys.length; k++) {
    //     ellipse(instrumentKeys[k].x, instrumentKeys[k].y, 200);
    //     console.log(instrumentKeys[k].x, instrumentKeys[k].y);
    // }
}

function gotTemp(myData) {
    myLocation = myData.name;
    weather = myData.weather[0].main;
    // console.log("weather: ", weather);

    if ((weather.indexOf("Drizzle") !== -1) || (weather.indexOf("Rain") !== -1)) {
        weather = "rain";
    } else if ((weather.indexOf("Clouds") !== -1)) {
        weather = "cloudy";
    } else if ((weather.indexOf("Snow") !== -1)) {
        weather = "snow";
    } else if ((weather.indexOf("Thunderstorm") !== -1)) {
        weather = "thunderstorms";
    } else {
        weather = "clear";
    }

    // convert kelvins to fahrenheit
    temp = (int(myData.main.temp) * (9/5) - 459.67).toFixed(0);
    // console.log("temp: " + temp);

    // speed of the ellipses
    tempo = map(temp, -130, 130, 0.1, 2);

    for (var e=0; e < ellipses.length; e++) {
        ellipses[e].speed = tempo;
    }


    cloudiness = round(myData.clouds.all/10);

    if (clouds.length < cloudiness) {
        for (var c = 0; c < cloudiness - clouds.length; c++) {
            clouds.push(new Cloud(random([0, 1]), random(0, height), random(0.5, 1.5), cloudImgs[random([0, 1, 2])]));
        }
    } else if (clouds.length > cloudiness) {
        clouds.splice(0, clouds.length - cloudiness);
    }

    windSpeed = myData.wind.speed / 500;

}

function updateTheme(time) {
    hue = map(time, 0, 23, 200, 230);
    if (time > 12) {
        sat = map(time, 0, 23, 350, 100);
        cloudOpacity = map(time, 0, 23, 255, 80);
    } else {
        sat = map(time, 0, 23, 80, 360);
        cloudOpacity = map(time, 0, 23, 100, 255);
    }
    if (time > 12) {
        light = map(time, 12, 23, 290, 50);
    } else if (time >= 0 && time <= 4) {
        light = map(time, 0, 4, 50, 120);
    } else {
        light = map(time, 4, 12, 150, 300);
    }
    newColor = color(hue, sat, light);

    adjust = map(time, 0, 23, -15, 15).toFixed(1);
    keyNotes = [58-adjust, 72-adjust, 64-adjust, 55-adjust, 57-adjust, 39-adjust, 43-adjust, 46-adjust, 55-adjust, 74-adjust, 79-adjust];

    for (var i=0; i < instruments.length; i++) {
        instruments[i].midi = keyNotes[i]
    }

    myTemp = loadJSON(url, gotTemp);

    return newColor;
}

// if mouse is moved & mouse is inside globe, then create more ellipses up to 50
// if there's more than 49, take the first ellipse out
function mouseMoved() {
    if (dist(mouseX, mouseY, width/2, height/2) < 200) {
        if (ellipses.length < 50) {
            ellipses.push(new EllipseObj(mouseX, mouseY));
        }
        if (ellipses.length > 49) {
           ellipses.splice(0, 1);
        }
    }
}

function InstrumentKey(x, y, note) {
    this.x = x;
    this.y = y;
    this.note = note;
}

function Instrument(midi) {
    this.midi = midi;
    this.osc = new p5.SinOsc();

    // Instantiate the envelope
    this.envelope = new p5.Envelope();

    // set attackTime, decayTime, sustainRatio, releaseTime
    this.envelope.setADSR(random(15,40)/1000,random(10,50)/100, 0.02, 0.05);

    // set attackLevel, releaseLevel
    this.envelope.setRange(0.2, 0);

    this.osc.start();
    this.osc.amp(0);

    this.play = function () {
        var freqValue = midiToFreq(this.midi);
        this.osc.freq(freqValue);

        this.envelope.play(this.osc, 0, 0.2);
    }
}

function EllipseObj(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.speed = tempo;
    this.xVelocity = this.speed * random([-1, 1]);
    this.yVelocity = this.speed * random([-1, 1]);
    this.counter = 0;
    this.takeOut = false;
    this.color = map(time, 0, 23, 180, 40);

    this.drawE = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        push();
        colorMode(HSL, 360);
        noStroke();
        fill(this.color, 324, 288);
        ellipse(this.x, this.y, this.size);
        pop();

        if (dist(this.x, this.y, width/2, height/2) > 200) {
            this.counter += 1 / 1000;
            this.xVelocity *= -1 + cos(random(100, 360))/5;
            this.yVelocity *= -1 + sin(random(100, 360))/5;
        }

        if (this.counter > 0.1) {
            this.takeOut = true;
        }
    }
}

// below are classes for weather elements
// snow code adapted from Nick Such - https://jsfiddle.net/nicksuch/osc9yrL2/
// rain and lightning adapted from https://code.sololearn.com/WhmdLzp9HjDe/#html

function Snowflake(x, size, direction) {
    this.x = x;
    this.y = -5;
    this.size = size;
    this.direction = direction;

    this.snowFall = function () {
        push();
        noStroke();
        fill(360);
        ellipse(this.x, this.y, this.size, this.size);
        pop();
        if (this.direction === 0) {
            this.x += map(this.size, 1, 5, .1, .5);
        } else {
            this.x -= map(this.size, 1, 5, .1, .5);
        }

        this.y += this.size + this.direction;

        if ((this.x > width + this.size) || (this.x < 0 - this.size) || (this.y > height + this.size)) {
            this.x = random(0, width);
            this.y = -5;
        }
    }
}

function Raindrop(x, size) {
    this.x = x;
    this.y = -10;
    this.height = size;
    this.color = map(this.height, 2, 13, 220, 280);
    this.vel = 0;
    this.grv = map(this.height, 2, 13, 3, 10);

    this.rainFall = function () {
        push();
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, 2, this.height);
        pop();

        this.y += this.vel;
        this.vel = this.grv;

        if (this.y > height + this.height) {
            this.x = random(0, width);
            this.y = -1 * this.height;
        }
    }
}

function Cloud(x, y, size, sprite) {
    this.size = size;
    if (x === 0) {
        this.x = 0 - this.size;
    } else {
        this.x = width + this.size;
    }
    this.y = y;
    this.speed = map(size, 0.5, 1.5, 0.01, 0.5);
    this.sprite = sprite;

    this.draw = function () {
        push();
        tint(255, cloudOpacity);
        image(this.sprite, this.x, this.y, this.sprite.width*this.size, this.sprite.height*this.size);
        pop();

        if (x === 0) {
            this.x += windSpeed + this.speed;
            if (this.x > width + this.sprite.width*this.size) {
                this.x = 0 - this.size;
                this.y = random(0, height);
            }
        } else {
            this.x -= windSpeed + this.speed;
            if (this.x < 0 - this.sprite.width*this.size) {
                this.x = width + this.size;
                this.y = random(0, height);
            }
        }
    }
}


function thunder() {
    push();
  	background(200, random(100,200));
  	pop();
}