//major
//wand
//cup
//sword
//coin
var edge = 38;
var cards = [];

function preload () {
    tarotData = loadJSON("assets/tarot_interpretations.json");
}

function setup() {
    createCanvas(800, 600);
    for (var i=0; i < tarotData.tarot_interpretations.length; i++) {
        var name = tarotData.tarot_interpretations[i].name;
        var suit = tarotData.tarot_interpretations[i].suit;
        // var fortune = tarotData.tarot_interpretations[i].fortune_telling;
        var keywords = tarotData.tarot_interpretations[i].keywords;
        var light = tarotData.tarot_interpretations[i].meanings.light;
        var shadow = tarotData.tarot_interpretations[i].meanings.shadow;
        cards[i] = new Card(name, suit, keywords, light, shadow);
    }

    for (var c=0; c < cards.length; c++) {
        cards[c].setLoc();
    }

}

function draw() {
    noStroke();
    fill(255); //rectangles divide page up into sections for each type of card
    rect(600, 0, 200, 600);
    fill(212, 225, 247);
    rect(0, 0, 300, 300); //wand
    fill(255, 255, 222);
    rect (300, 0, 300, 300); //cup
    fill(227, 236, 236);
    rect(0, 300, 300, 300); //sword
    fill(250, 233, 197);
    rect(300, 300, 300, 300); //coin
    fill(195, 169, 218);
    push();
    rectMode(CENTER);
    rect(300, 300, 250, 250); //major
    pop();

    for (var c=0; c < cards.length; c++) { //checks if any of ellipses are overlapping/too close, if they are re-choose their x and y, which is why the middle ellipses may be changing positions in the beginning
        for (var d=0; d < cards.length; d++) {
            if (dist(cards[c].x, cards[c].y, cards[d].x, cards[d].y) < 35) {
                if (cards[c].name !== cards[d].name) {
                    cards[c].setLoc();
                }
            }
        }
        cards[c].drawCard();

        if (dist(mouseX, mouseY, cards[c].x, cards[c].y) < 10) { //show name and keywords if mouse is hovering over "card"/ellipse
            cards[c].showText();
        }

    }



}

function Card (name, suit, keywords, light, shadow) {
    this.name = name;
    this.suit = suit;
    this.keywords = keywords;
    this.light = light;
    this.shadow = shadow;
    this.light_length = 0;
    this.shadow_length = 0;

    this.setLoc = function () { //setting x and y based on type of card
        if (suit === "major") {
            this.x = random(175 + 20, 425 - 20);
            this.y = random(175 + 20, 425 - 20);
        } else if (suit === "wands") {
            this.x = random(edge, 300 - edge);
            this.y = random(edge, 300 - edge);
            if ((this.x > 175) && (this.y > 175)) {
                this.x = random(edge, 300 - edge);
                this.y = random(edge, 300 - edge);
            }
        } else if (suit === "cups") {
            this.x = random(300 + edge, 600 - edge);
            this.y = random(edge, 300 - edge);
            if ((this.x < 425) && (this.y > 175)) {
                this.x = random(300 + edge, 600 - edge);
                this.y = random(edge, 300 - edge);
            }
        } else if (suit === "swords") {
            this.x = random(edge, 300 - edge);
            this.y = random(300 + edge, 600 - edge);
            if ((this.x > 175) && (this.y < 425)) {
                this.x = random(edge, 300 - edge);
                this.y = random(300 + edge, 600 - edge);
            }
        } else if (suit === "coins") {
            this.x = random(300 + edge, 600 - edge);
            this.y = random(300 + edge, 600 - edge);
            if ((this.x < 425) && (this.y < 425)) {
                this.x = random(300 + edge, 600 - edge);
                this.y = random(300 + edge, 600 - edge);
            }
        }
    };


    for (var l=0; l < this.light.length; l++) { // size of ellipse based on number of characters in light meaning of card
        this.light_length += this.light[l].length;
        this.light_length = map(this.light_length, 140, 300, 10, 50);
    }

    for (var s=0; s < this.shadow.length; s++) { // stroke weight of ellipse based on number of characters in shadow meaning of card
        this.shadow_length += this.shadow[s].length;
        this.shadow_length = map(this.shadow_length, 140, 300, 80, 20);
    }


    this.drawCard = function () {
        stroke(0);
        // console.log(this.shadow_length);
        strokeWeight(this.shadow_length/10);
        fill(255);
        push();
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.light_length, this.light_length);
        pop();
    };

    this.showText = function () {
        this.keyText = "";

        for (var t = 0; t < this.keywords.length; t++) {
            this.keyText += this.keywords[t] + " ";
        }

        push();
        textAlign(CENTER);
        rectMode(CENTER);
        fill(0);
        rect(this.x, this.y, 30, 15);
        fill(255);
        text(this.name, this.x, this.y);
        text(this.keyText, this.x, this.y + 20);
        pop();

    };
}
