var url;
var baseURL;
var apiKey;
var query;

var r = 280;
var tempo = 1;
var adjust;

var temp;
var weather;

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

var hue;
var sat;
var light;

function preload() {
    planet = loadImage("assets/planet.png");
}


function setup() {
    createCanvas(1066, 600);
    colorMode(HSL, 360);
    imageMode(CENTER);

    // time = 17;
    time = hour();
    currentTime = time;

    hue = map(time, 0, 23, 200, 230);
    if (time > 12) {
        sat = map(time, 0, 23, 200, 100);
    } else {
        sat = map(time, 0, 23, 80, 300);
    }
    if (time > 12) {
        light = map(time, 12, 23, 250, 50);
    } else if (time >= 0 && time <= 4) {
        light = map(time, 0, 4, 50, 100);
    } else {
        light = map(time, 4, 12, 100, 250);
    }

    currentColor = color(hue, sat, light);
    background(currentColor);

    setupInstrument();

    baseURL = "https://api.openweathermap.org/data/2.5/weather?id=";
    query = "2660646";
    // query = "5128594";
    // query = "668474";
    apiKey = "2b12b0c37d4fe53bbc3f4f765140097d";

    url = baseURL + query + "&APPID=" + apiKey;


    for (var s=0; s < 300; s++) {
        rain.push(new Raindrop(random(0, width), random(2, 13)));
        snow.push(new Snowflake(random(0, width), random(1, 5), round(random(0, 2))));
    }

    // setInterval(updateData(), 3600000);

}

function draw() {
    background(currentColor);

    weather = "snow"; // for demonstration
    if (weather === "snow") {
        for (var s=0; s < snow.length; s++){
            snow[s].snowFall();
        }
    } else if (weather === "rain") {
        for (var r=0; r < rain.length; r++){
            rain[r].rainFall();
        }
    } else if (weather === "thunderstorm") {
        for (r=0; r < rain.length; r++){
            rain[r].rainFall();
        }
        if (millis().toFixed(0) % 100 === 0) {
            thunder();
        }
    }

    image(planet, width/2, height/2);

    time = hour();

    // if (((millis() > 10000) && (time < 11))) {
    //     time += 2;
    // }

    if (time !== currentTime) {
        // console.log("theme ran");
        newColor = updateTheme(time);
        currentTime = time;
        background(lerpColor(currentColor, newColor, (millis()%5000)/5000.0));
        currentColor = newColor;
    }

    // noFill();
    // ellipse(width/2, height/2, 400);
    // rect(width/2, height/2, 200, 200);


    // for (var k=0; k < instrumentKeys.length; k++) {
    //     ellipse(instrumentKeys[k].x, instrumentKeys[k].y, 200);
    //     console.log(instrumentKeys[k].x, instrumentKeys[k].y);
    // }

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
    } else {
        for (var x=0; x<5; x++) {
            ellipses.push(new EllipseObj(width / 2, height / 2));
        }
    }

}

function gotTemp(myData) {
    weather = myData.weather[0].main;
    console.log("weather: ", weather);

    if ((weather.indexOf("Drizzle") !== -1) || (weather.indexOf("Rain") !== -1)) {
        weather = "rain";
    } else if ((weather.indexOf("Clouds") !== -1)) {
        weather = "clouds";
    } else if ((weather.indexOf("Snow") !== -1)) {
        weather = "snow";
    } else if ((weather.indexOf("Thunderstorm") !== -1)) {
        weather = "thunderstorm";
    } else {
        weather = "clear";
    }

    temp = (int(myData.main.temp) * (9/5) - 459.67).toFixed(0);
    console.log("temp: " + temp);
    tempo = map(temp, -130, 130, 0.1, 5);

    for (var e=0; e < ellipses.length; e++) {
        ellipses[e].speed = tempo;
    }

    console.log(tempo);
}

// function gotTime(myData) {
//     var datetime = myData.datetime;
//     for (var x=0; x < datetime.length; x++) {
//         if (datetime[x] === "T") {
//             time = datetime.slice(x+1, x+9);
//         }
//     }
//     console.log("time", time);
// }

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

// function updateData() {
//     myTemp = loadJSON(url, gotTemp);
//     // myTime = loadJSON(timeURL, gotTime);
// }

function mouseClicked() {
    myTemp = loadJSON(url, gotTemp);
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

function updateTheme(time) {
    red = map(time, 0, 23, 120, 30);
    green = map(time, 0, 23, 130, 80);
    newColor = color(red, green, blue);

    adjust = map(time, 0, 23, -15, 20).toFixed(1);
    keyNotes = [58-adjust, 72-adjust, 64-adjust, 55-adjust, 57-adjust, 39-adjust, 43-adjust, 46-adjust, 55-adjust, 74-adjust, 79-adjust];

    myTemp = loadJSON(url, gotTemp);

    return newColor;
}

function Snowflake(x, size, direction) {
    this.x = x;
    this.y = -5;
    this.size = size;
    this.direction = direction;

    this.snowFall = function () {
        // console.log(this.x);
        push();
        noStroke();
        fill(255);
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
    this.color = map(this.height, 2, 13, 100, 255);
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

function thunder() {
    push();
  	background(175, random(100,200));
  	pop();
}

function setupInstrument() {
    adjust = map(time, 0, 23, -15, 20).toFixed(1);

    keyNotes = [58-adjust, 72-adjust, 64-adjust, 55-adjust, 57-adjust, 39-adjust, 43-adjust, 46-adjust, 55-adjust, 74-adjust, 79-adjust];

    for (var i=0; i < 11; i++) {
        var angle = i * 4;
        var x = cos(angle) * r;
        var y = sin(angle) * r;
        instrumentKeys.push(new InstrumentKey(x+width/2, y+height/2, keyNotes[i]));

        instruments.push(new Instrument(keyNotes[i]));
    }
}