PShape face, shades, shade1, shade2, shade3, shade4, //PShape = datatype for storing shapes
       hair, hairL, hairR, hairBG,
       eyes, eyeL, eyeR, pupilL, pupilR, lidL, lidR,
       nose, nR, nL, nosL, nosR,
       mouth, lip, lip2,
       eyebrowL, eyebrowR,
       glasses, glassesL, glassesR, bridge, handle,
       body, shirt;
Integer yAdjust, xAdjust; //final readjustment values

void setup() {
  size(600, 700);
  background  (73,34,46);
  yAdjust = 70;
  xAdjust = -7; //values help center the entire portrait
  
  hair = createShape(GROUP);
  hairL = createShape(); //left side of hair
  hairL.beginShape();
  hairL.noStroke();
  hairL.fill(33,26,35);
  hairL.vertex(150, 65);
  hairL.vertex(120, 200);
  hairL.vertex(130, 340);
  hairL.vertex(200, 600);
  hairL.vertex(230, 500);
  hairL.vertex(240, 420);
  hairL.vertex(210, 102);
  hairL.endShape(CLOSE);
  
  hairR = createShape(); //right side
  hairR.beginShape();
  hairR.noStroke();
  hairR.fill(46,36,44);
  hairR.vertex(150, 65);
  hairR.vertex(390, 350);
  hairR.vertex(380, 500);
  hairR.vertex(435, 620);
  hairR.vertex(480, 440);
  hairR.vertex(475, 310);
  hairR.vertex(445, 150);
  hairR.vertex(400, 80);
  hairR.vertex(260, 50);
  hairR.endShape(CLOSE);
 
  hair.addChild(hairL);
  hair.addChild(hairR);
  
  fill(17,12,17);
  hairBG = createShape(RECT, 180, 250, 200, 200); //"back" of hair
  
  noStroke();
  face = createShape();
  face.beginShape();
  face.fill(253,225,185); //will only be visible on top left "triangle" on face
  face.vertex(208, 102); //top left corner
  face.vertex(200, 225);
  face.vertex(240, 310);
  face.vertex(325, 360); //chin point 1
  face.vertex(390, 350); //chin point 2
  face.vertex(420, 280);
  face.vertex(390, 160);
  face.vertex(320, 105);
  face.vertex(208, 102);
  face.endShape(CLOSE);
  
  shade1 = createShape(); //contour
  shade1.beginShape();
  shade1.fill(253,223,184);
  shade1.vertex(200, 225);
  shade1.vertex(240, 310);
  shade1.vertex(325, 360);
  shade1.vertex(200, 225);
  shade1.endShape();
  
  shade2 = createShape(); //light
  shade2.beginShape();
  shade2.fill(253,235,195);
  shade2.vertex(200, 225);
  shade2.vertex(325, 360);
  shade2.vertex(310, 240);
  shade2.endShape();
  
  shade3 = createShape(); //shadow
  shade3.beginShape();
  shade3.fill(252,222,180);
  shade3.vertex(310, 240);
  shade3.vertex(325, 360);
  shade3.vertex(390, 350);
  shade3.vertex(420, 280);
  shade3.vertex(310, 240);
  shade3.endShape();
  
  shade4 = createShape(); //darker shadow
  shade4.beginShape();
  shade4.fill(250,215,170);
  shade4.vertex(310, 240);
  shade4.vertex(420, 280);
  shade4.vertex(390, 160);
  shade4.vertex(320, 105);
  shade4.vertex(208, 102);
  shade4.endShape();
  
  shades = createShape(GROUP);
  shades.addChild(shade1);
  shades.addChild(shade2);
  shades.addChild(shade3);
  shades.addChild(shade4);
  
  fill(255,255,240);
  eyes = createShape(GROUP);
  eyeL = createShape(TRIANGLE, 300, 218, 285, 200, 250, 220); //order = right, mid, left
  eyeR = createShape(TRIANGLE, 406, 215, 399, 193, 370, 218); //order = right, mid, left
  eyeR.translate(-1, -1);
  fill(0, 0, 0);
  pupilL = createShape(TRIANGLE, 285, 200, 283, 219, 300, 218); //order = top, left, right
  pupilR = createShape(TRIANGLE, 400, 193, 395, 215, 406, 215); //order = top, left, right
  lidL = createShape(TRIANGLE, 285, 200, 260, 210, 250, 220);
  lidR = createShape(TRIANGLE, 399, 193, 376, 207, 370, 218);
  
  eyes.addChild(eyeL);
  eyes.addChild(eyeR);
  eyes.addChild(pupilL);
  eyes.addChild(pupilR);
  eyes.addChild(lidL);
  eyes.addChild(lidR);
  
  stroke(50);
  strokeWeight(1.3);
  glasses = createShape(GROUP);
  noFill();
  glassesL = createShape(ELLIPSE, 280, 215, 80, 70);
  glassesR = createShape(ELLIPSE, 390, 205, 75, 67);
  bridge = createShape(LINE, 353, 198, 317, 202);
  handle = createShape(LINE, 200, 210, 240, 220); 
  glasses.addChild(glassesL);
  glasses.addChild(glassesR);
  glasses.addChild(bridge);
  glasses.addChild(handle);
  
  noStroke();
  nose = createShape(GROUP);
  fill(255,210,157);
  nR = createShape(TRIANGLE, 340, 225, 345, 270, 360, 260); //order = top, mid, right
  fill(255,220,162);
  nL = createShape(TRIANGLE, 342, 235, 345, 265, 320, 270); //order = top, mid, left
  fill(227,180,131);
  nosL = createShape(TRIANGLE, 320, 270, 335, 267, 325, 265); // mid, right, left
  nosR = createShape(TRIANGLE, 360, 260, 358, 268, 350, 267); // right, mid, left
  nose.addChild(nL);
  nose.addChild(nR);
  nose.addChild(nosL);
  nose.addChild(nosR);
  
  fill(201,27,37);
  mouth = createShape(GROUP);
  lip = createShape();
  lip.beginShape();
  lip.vertex(335, 325);
  lip.vertex(315, 340);
  lip.vertex(330, 350);
  lip.vertex(360, 345);
  lip.vertex(375, 333);
  lip.vertex(355, 320);
  lip.vertex(345, 325);
  lip.vertex(335, 325);
  lip.endShape();

  fill(221,47,50);
  lip2 = createShape();
  lip2.beginShape();
  lip2.vertex(315, 340);
  lip2.vertex(345, 335);
  lip2.vertex(375, 333);
  lip2.vertex(360, 345);
  lip2.vertex(330, 350);
  lip2.vertex(315, 340);
  lip2.endShape();
  
  mouth.addChild(lip);
  mouth.addChild(lip2);
  
  fill(46,36,44);
  eyebrowL = createShape();
  eyebrowL.beginShape();
  eyebrowL.vertex(295, 193);
  eyebrowL.vertex(250, 195); //top arch
  eyebrowL.vertex(225, 215); //corner
  eyebrowL.vertex(252, 202);
  eyebrowL.vertex(300, 200);
  eyebrowL.vertex(295, 193);
  eyebrowL.endShape();
  
  eyebrowR = createShape();
  eyebrowR.beginShape();
  eyebrowR.vertex(355, 188);
  eyebrowR.vertex(353, 195);
  eyebrowR.vertex(395, 190);
  eyebrowR.vertex(410, 195);
  eyebrowR.vertex(385, 185);
  eyebrowR.vertex(355, 188);
  eyebrowR.endShape();
 
  fill(246,206,160);
  body = createShape();
  body.beginShape();
  body.vertex(260, 310);
  body.vertex(265, 400);
  body.vertex(160, 425);
  body.vertex(100, 450);
  body.vertex(60, 540);
  body.vertex(560, 540);
  body.vertex(500, 430);
  body.vertex(415, 415);
  body.vertex(380, 320);
  body.endShape();
 
  fill(53,74,54);
  stroke(53,74,54);
  strokeWeight(3);
  shirt = createShape();
  shirt.beginShape();
  shirt.vertex(265, 400);
  shirt.vertex(160, 425);
  shirt.vertex(100, 450);
  shirt.vertex(60, 540);
  shirt.vertex(560, 540);
  shirt.vertex(500, 430);
  shirt.vertex(415, 400);
  shirt.vertex(315, 425);
  shirt.vertex(265, 400);
  shirt.endShape();
 
}

void draw() {
  shape(hairBG, xAdjust, yAdjust);
  shape(body, xAdjust, -10 + yAdjust); //+ additional readjustments
  shape(shirt, xAdjust, -10 + yAdjust);
  shape(hair, xAdjust, yAdjust);
  shape(face, xAdjust, yAdjust);
  shape(shades, xAdjust, yAdjust);
  shape(eyes, -1 + xAdjust, -5 + yAdjust);
  shape(nose, xAdjust, yAdjust);
  shape(mouth, xAdjust, -25 + yAdjust);
  shape(eyebrowL, xAdjust, -25 + yAdjust);
  shape(eyebrowR, xAdjust, -23 + yAdjust);
  shape(glasses, xAdjust, yAdjust);
}
