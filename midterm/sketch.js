var draggable_items = [];
var clickable_items = [];
var gameScene = "start";
var poisoned = false;
var flavored_good = false;
var flavored_bad = false;
var gameState = "playing";
var ew = new Text("Ew, what is that taste?!", 120, 170, 100, 40, 15, 50);
var tasty = new Text("Yum! Hmm... I don't remember buying this flavor.", 80, 175, 200, 40, 15, 50);
var text_timer = 0;
var no_freedom = new Text("Your owner found you outside, thinking a burgular tried to steal you, and brought you back in.", 600, 350, 700, 150, 40, 50);
var freedom = new Text("Freedom?", 600, 350, 600, 200, 100, 0);

function preload() {
	bg = loadImage("assets/start.png");
	left_bg = loadImage("assets/left.png");
	street_bg = loadImage("assets/end.png");
	player_sprite = loadImage("assets/player.png");
	mouse = loadImage("assets/plug.png");
	owner = loadImage("assets/owner.png");
	window_nc = loadImage("assets/notcracked.png");
	window_c = loadImage("assets/cracked.png");
	sriracha = loadImage("assets/sriracha.png");
	pepper = loadImage("assets/pepper.png");
	salt = loadImage("assets/salt.png");
	dishsoap = loadImage("assets/dishsoap.png");
	clorox = loadImage("assets/clorox.png");
	poison = loadImage("assets/poison.png");
	popcorn = loadImage("assets/popcorn.png");
	opencab_br = loadImage("assets/opencab-br.png");
	opencab_bl = loadImage("assets/opencab-bl.png");
	opencab_tr = loadImage("assets/opencab-tr.png");
	opencab_tl = loadImage("assets/opencab-tl.png");
	dead = loadImage("assets/dead.png");
	player = new Player(player_sprite, 200, 376);
	draggable_items[0] = new Draggable(sriracha, 930, 105, "left", 4);
	draggable_items[1] = new Draggable(pepper, 810, 235, "left", 4);
	draggable_items[2] = new Draggable(salt, 770, 235, "left", 4);
	draggable_items[3] = new Draggable(dishsoap, 790, 527, "left", 2);
	draggable_items[4] = new Draggable(clorox, 1108, 580, "left", 1);
	draggable_items[5] = new Draggable(poison, 925, 603, "left", 2);
	// clickable_items[0] = new Draggable(window_nc, 800, 200);
	clickable_items[0] = new Clickable(window_c, 650, 170, 296, 273, "start");
	clickable_items[1] = new Clickable(opencab_br, 1108, 557, 182, 147, "left");
	clickable_items[2] = new Clickable(opencab_bl, 814, 557, 363, 199, "left");
	clickable_items[3] = new Clickable(opencab_tr, 1126, 158, 149, 223, "left");
	clickable_items[4] = new Clickable(opencab_tl, 817, 160, 380, 303, "left");
}

function setup() {
  createCanvas(1200, 700);
  image(bg, 0, 0);
  imageMode(CENTER);
  textAlign(CENTER);
  // rectMode(CENTER);
}

function Text(txt, x, y, w, h, size, opacity) {
    this.text = txt;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.size = size;
    this.show = false;
    this.opacity = opacity;

    this.print = function () {
        if (this.show) {
            push();
            textSize(this.size);
            noStroke();
            fill(255, 255, 255, this.opacity);
            rect(this.x, this.y, this.w, this.h);
            fill(0);
            text(this.text, this.x, this.y, this.w, this.h);
            pop();
        }
    }
}

function Draggable(img, x, y, scene, clickable_ind) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.hovered = false;
    this.show = false;
    this.clickable_ind = clickable_ind;
    this.used = false; //index of the cabinet the item is in

    this.draw = function () {
        if (gameScene === this.scene) {
            if ((this.show) && (!this.used)) {
                image(this.img, this.x, this.y);
            }
        }
        // ellipse(this.x, this.y, 60, 60);
    };
}

function Clickable(img, x, y, w, h, scene) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scene = scene;
    this.hovered = false;
    this.show = false;

    this.draw = function () {
        if (gameScene === this.scene) {
            if (this.show) {
                image(this.img, this.x, this.y);
            }
        }
    }

}

function Player(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;

    this.draw = function () {
        image(this.img, this.x, this.y);

        if (keyIsDown(LEFT_ARROW)) {
            if (gameScene === "left") {
                if (player.x > 710) {
                    this.x -= 2;
                }
            } else {
                this.x -= 2;
            }
        } else if (keyIsDown(RIGHT_ARROW)) {
            if (gameScene === "start") {
                if (player.x < 480) {
                    this.x += 2;
                }
            } else {
                this.x += 2;
            }
        }
    }
}

function draw() {

    if (gameState === "playing") {
        switch (gameScene) {
            case "start":
                push();
                imageMode(CORNER);
                image(bg, 0, 0);
                pop();
                break;
            case "left":
                push();
                imageMode(CORNER);
                image(left_bg, 0, 0);
                pop();
                break;
            default:
                break;
        }

        player.draw();

        if (gameScene === "start") {
            image(window_nc, 650, 170);

            if (player.x < 10) {
                gameScene = "left";
                player.x = 1190;
            }

            if (no_freedom.show === true) {
                push();
                rectMode(CENTER);
                no_freedom.print();
                pop();
                clickable_items[0].show = false;
                draggable_items[0].x = 930;
                draggable_items[0].y = 105;
                draggable_items[1].x = 810;
                draggable_items[1].y = 235;
                draggable_items[2].x = 770;
                draggable_items[2].y = 235;
                draggable_items[3].x = 790;
                draggable_items[3].y = 527;
                draggable_items[4].x = 1108;
                draggable_items[4].y = 580;
                draggable_items[5].x = 925;
                draggable_items[5].y = 603;
                if (text_timer < 30) {
                    text_timer += 0.1;
                } else {
                    no_freedom.show = false;
                    text_timer = 0;
                }

            }

        } else if (gameScene === "left") {
            image(popcorn, 424, 422);
            image(owner, 130, 450);

            if (player.x > 1190) {
                gameScene = "start";
                player.x = 10;
            }

            for (i = 0; i < draggable_items.length; i++) {
                d_item = draggable_items[i];
                corresponding_clickable = clickable_items[d_item.clickable_ind];
                if (corresponding_clickable.show === true) {
                    d_item.show = true;
                } else { //if cabinet is closed
                    if (!(((d_item.x < corresponding_clickable.x + corresponding_clickable.w / 2) &&
                            (d_item.x > corresponding_clickable.x - corresponding_clickable.w / 2)) &&
                            ((d_item.y > corresponding_clickable.y - corresponding_clickable.h / 2) &&
                                (d_item.y < corresponding_clickable.y + corresponding_clickable.h / 2)))) { // if item is not in corresponding cabinet, it is visible
                        d_item.show = true;
                    } else {
                        d_item.show = false;
                    }
                }

            }

            if (poisoned) {
                image(dead, 150, 160);
            } else {
                if (flavored_good) {
                    tasty.print();
                    // console.log(text_timer);
                    if (text_timer < 20) {
                        tasty.show = true;
                        text_timer += 0.1;
                    } else {
                        tasty.show = false;
                        text_timer = 0;
                        flavored_good = false;
                    }


                } else if (flavored_bad) {
                    ew.print();
                    if (text_timer < 20) {
                        ew.show = true;
                        text_timer += 0.1;
                    } else {
                        ew.show = false;
                        text_timer = 0;
                        flavored_bad = false;
                    }
                }
            }

        }

        if (clickable_items.length > 0) {
            for (var i = 0; i < clickable_items.length; i++) {
                var c_item = clickable_items[i];
                if (c_item.show) {
                    c_item.draw();
                }
            }
        }

        if (draggable_items.length > 0) {
            for (var i = 0; i < draggable_items.length; i++) {
                d_item = draggable_items[i];
                if (d_item.show) {
                    d_item.draw();
                }
            }
        }

        push();
        stroke(50);
        strokeWeight(5);
        line(player.x - 49, player.y, mouseX, mouseY);
        image(mouse, mouseX, mouseY);
        pop();

    } else if (gameState === "end") {
        push();
        imageMode(CORNER);
        image(street_bg, 0, 0);
        pop();
        rectMode(CENTER);
        image(player.img, 250, 500);
        freedom.show = true;
        freedom.print();
    }

}

function mousePressed() { // mouse pressed and mouse dragged code modified from @jacorre on Codepen
	if (draggable_items.length > 0) {
		for (var i = 0; i < draggable_items.length; i++) {
			var item = draggable_items[i],
					distance = dist(mouseX, mouseY, item.x, item.y);
			if (distance < item.img.width) {
				item.hovered = true;
			} else {
			    item.hovered = false;
            }
		}
	}
}

function mouseDragged() {
	if (draggable_items.length > 0) {
		for (var i = 0; i < draggable_items.length; i++) {
			var item = draggable_items[i];
			if (item.scene === gameScene) {
                if ((item.hovered) && (!item.used)) {
                    item.x = mouseX;
                    item.y = mouseY;
                }
            }
		}
	}
}

function mouseClicked() {
    if (clickable_items.length > 0) {
		for (var i = 1; i < clickable_items.length; i++) {
			var item = clickable_items[i];

			if (item.show === false) { //if cabinet is closed, then click anywhere on it to open
                if (((mouseX < item.x + item.w / 2) && (mouseX > item.x - item.w / 2)) && ((mouseY < item.y + item.h / 2) && (mouseY > item.y - item.y / 2))) {
                    if (item.scene === gameScene) {
                            item.show = true;
                    }
                }
            } else { //if cabinet is open, then click on the door/edge of it to close
			    if ( ( ((mouseX < item.x + item.w / 2) && (mouseX > item.x + item.w/3))
                        || ((mouseX > item.x - item.w / 2) && (mouseX < item.x - item.w/4)) )
                    && ((mouseY < item.y + item.h / 2) && (mouseY > item.y - item.y / 2))) {
			        if (item.scene === gameScene) {
                            item.show = false;
                    }
                }
            }
		}
	}

	//code to show cracked window (not reversible)
	if (((mouseX < clickable_items[0].x + clickable_items[0].w/2) && (mouseX > clickable_items[0].x - clickable_items[0].w/2)) && ((mouseY < clickable_items[0].y + clickable_items[0].h/2) && (mouseY > clickable_items[0].y - clickable_items[0].y/2))) {
        if (clickable_items[0].scene === gameScene) {
            if (clickable_items[0].show === false) {
                clickable_items[0].show = true;
            } else {
                if (poisoned) {
                    gameState = "end";
                } else {
                    no_freedom.show = true;
                }
            }
        }
    }

    if (gameScene === "left") {
        for (i = 0; i < 3; i++) {
            item = draggable_items[i];
            if ( ((item.x < 424 + popcorn.width/2) && (item.x > 424 - popcorn.width/2)) && ((item.y > 422 - popcorn.height/2) && (item.x < 422 + popcorn.height/2)) ) {
                if (!poisoned) {
                    flavored_good = true;
                    flavored_bad = false;
                }
                item.used = true;
                item.x = 0;
                item.y = 0;
            }
        }

        if ( ((draggable_items[3].x < 424 + popcorn.width/2) && (draggable_items[3].x > 424 - popcorn.width/2)) && ((draggable_items[3].y > 422 - popcorn.height/2) && (draggable_items[3].y < 422 + popcorn.height/2)) ) {
            if (!poisoned) {
                flavored_bad = true;
                flavored_good = false;
            }
            draggable_items[3].used = true;
            draggable_items[3].x = 0;
            draggable_items[3].y = 0;
        }

        for (i = 4; i < 6; i++) {
            item = draggable_items[i];
            if ( ((item.x < 424 + popcorn.width/2) && (item.x > 424 - popcorn.width/2)) && ((item.y > 422 - popcorn.height/2) && (item.y < 422 + popcorn.height/2)) ) {
                if (!poisoned) {
                    poisoned = true;
                }
                item.used = true;
                item.x = 0;
                item.y = 0;
            }
        }
    }


}

