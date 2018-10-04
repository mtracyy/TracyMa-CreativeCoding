int playerScore;
int ellipseX;
int ellipseY;
int[] ellipseXqueue = new int[5];
int[] ellipseYqueue = new int[5];
int[] ellipseSize = new int[5];
int speed;
int currentIndex;
int margin = 20;
int strokeWgt = 4;
float timer = 0;
color[] colorQueue = new color[5];
color[] colorNext = new color[5];
color playerColor;
boolean newCircle;
boolean circle1;
boolean circle2;
boolean circle3;
boolean circle4;
boolean circle5;
boolean gameOver;
boolean start;
boolean started;

String instructions = "How to play: Absorb the balls that are smaller AND the same hue as you (If you are red, you can absorb any SHADE of red). When you are white, you can absorb any color! But be careful, the color of the OUTLINES of the balls may trick you!";

int playerSize = 50;

//int fillColor = 255;

void setup() {

  gameOver = true; //whether game is running
  start = false; //helps control game over state
  started = false; //helps control toggling of instructions and start button
  
  speed = 4;
  size(600, 500);
  playerColor = color(255);
  playerScore = 0;
  newCircle = false;
  currentIndex = 0;
  circle1 = false;
  circle2 = false;
  circle3 = false;
  circle4 = false;
  circle5 = false;
  
  //colorMode(HSB, 360, 100, 100);
}

void mouseClicked() {
  if (started == false) { //so game cannot be restarted after gameover by clicking in "button" area
    if ((260 < mouseX && mouseX < 350) && (235 < mouseY && mouseY < 265)) {
      start = true;
    }
  }
}

void draw() {
  if (start) {
    
    gameOver = false;
    started = true;
    start = false;
    
  } else { //if game has not started
    if (started == false) { //show instructions and start button
      fill(0, 255, 0);
      rect(width/2 - 40, height/2 - 15, 80, 30, 7);
      fill(255);
      textAlign(CENTER, CENTER);
      text("Start", width/2, height/2);
      text(instructions, width/2 - 200, height/2 - 300, 400, 400); 
    }
  }
  
  if (!gameOver) {
    //fillColor--;
    //if(fillColor==0)fillColor=360;
    //background(fillColor, 50, 100);
    
    noStroke();
    background(0);
    fill(playerColor);
    text(playerScore, width/2, 100);
    //text(int(timer), 550, 450);
    timer += .06;
    //println(timer);
    ellipse(mouseX, 400, 50, 50);
    
    
    if ((int(timer) % 2) == 0 && (newCircle == false)) { //condition for ball to be generated
      //println("running");
      
      int hue = int(random(1,4));    //picks random main color, R, G, or B
      if (hue == 1) {
        colorQueue[currentIndex] = color(random(100, 255), 0, 0);
      } else if (hue == 2){
        colorQueue[currentIndex] = color(0, random(100, 255), 0);
      } else if (hue == 3){
        colorQueue[currentIndex] = color(0, 0, random(100, 255));
      }
      
      int nextHue = int(random(1,4)); //picks color of "border"/color that player will become if enemy ball is absorbed
      if (nextHue == 1) {
        colorNext[currentIndex] = color(random(100, 255), 0, 0);
      } else if (nextHue == 2){
        colorNext[currentIndex] = color(0, random(100, 255), 0);
      } else if (nextHue == 3){
        colorNext[currentIndex] = color(0, 0, random(100, 255));
      }
      
      
      int newCircleSize = int(random(15, 90));
      ellipseX = int(random(margin, width - margin));
      ellipseXqueue[currentIndex] = ellipseX;
      ellipseSize[currentIndex] = newCircleSize;
      
      if ((circle1 == false) && (currentIndex == 0)) {
        circle1 = true;
        ellipseYqueue[currentIndex] = 0;
      }
      
      if ((circle2 == false) && (currentIndex == 1)) {
        circle2 = true;
        ellipseYqueue[currentIndex] = 0;
      }
      
      if ((circle3 == false) && (currentIndex == 2)) {
        circle3 = true;
        ellipseYqueue[currentIndex] = 0;
      }
      
      if ((circle4 == false) && (currentIndex == 3)) {
        circle4 = true;
        ellipseYqueue[currentIndex] = 0;
      }
      
      if ((circle5 == false) && (currentIndex == 4)) {
        circle5 = true;
        ellipseYqueue[currentIndex] = 0;
      }
      
      if (currentIndex == 4) { // resets the circle variables after the 5th circle is generated
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    }
      
    if (circle1 == true) {
      fill(colorQueue[0]);
      stroke(colorNext[0]);
      strokeWeight(strokeWgt);
      ellipse(ellipseXqueue[0], ellipseYqueue[0], ellipseSize[0] - strokeWgt, ellipseSize[0] - strokeWgt);
      //fill(255);
      //text(ellipseSize[0], ellipseXqueue[0] - ellipseSize[0] / 10, ellipseYqueue[0]);
      ellipseYqueue[0] += speed;
      
      if (ellipseYqueue[0] > height + ellipseSize[0]) {
        circle1 = false;
      }
      
      if (dist(mouseX, 400, ellipseXqueue[0], ellipseYqueue[0]) < ellipseSize[0]) {
        
        if  (playerSize > ellipseSize[0]) { //checks if player is larger than enemy, and within this checks/compares colors of enemy and player
          
          if ((red(colorQueue[0]) != 0) && (red(playerColor) > 0)) {
            circle1 = false;
            playerColor = colorNext[0];
            playerScore += (ellipseSize[0]/8);
          
          } else if ((green(colorQueue[0]) != 0) && (green(playerColor) > 0)) {
            circle1 = false;
            playerColor = colorNext[0];
            playerScore += (ellipseSize[0]/8);
            
          } else if ((blue(colorQueue[0]) != 0) && (blue(playerColor) > 0)) {
            circle1 = false;
            playerColor = colorNext[0];
            playerScore += (ellipseSize[0]/8);
            
          } else if (playerColor == color(255)){
            circle1 = false;
            playerColor = colorNext[0];
            playerScore += (ellipseSize[0]/8);
          } else {
            gameOver = true; //color is wrong
          }
          
        } else {
          gameOver = true; //player is smaller than enemy
        }
      }
    }
    
    if (circle2 == true) {
      //fill(colorQueue[1], 255, 255);
      fill(colorQueue[1]);
      stroke(colorNext[1]);
      strokeWeight(strokeWgt);
      ellipse(ellipseXqueue[1], ellipseYqueue[1], ellipseSize[1] - strokeWgt, ellipseSize[1] - strokeWgt);
      //fill(255);
      //text(ellipseSize[1], ellipseXqueue[1] - ellipseSize[1] / 10, ellipseYqueue[1]);
      ellipseYqueue[1] += speed;
      if (ellipseYqueue[1] > height + ellipseSize[1]) {
        circle2 = false;
      }
      
      if (dist(mouseX, 400, ellipseXqueue[1], ellipseYqueue[1]) < ellipseSize[1]) {
        
        if  (playerSize > ellipseSize[1]) {
          if ((red(colorQueue[1]) != 0) && (red(playerColor) > 0)) {
            circle2 = false;
            playerColor = colorNext[1];
            playerScore += (ellipseSize[1]/8);
          
          } else if ((green(colorQueue[1]) != 0) && (green(playerColor) > 0)) {
            circle2 = false;
            playerColor = colorNext[1];
            playerScore += (ellipseSize[1]/8);
            
          } else if ((blue(colorQueue[1]) != 0) && (blue(playerColor) > 0)) {
            circle2 = false;
            playerColor = colorNext[1];
            playerScore += (ellipseSize[1]/8);
            
          } else if (playerColor == color(255)){
            circle2 = false;
            playerColor = colorNext[1];
            playerScore += (ellipseSize[1]/8);
          } else {
            gameOver = true;
          }
        } else {
          gameOver = true;
        }
      }
      
    }
  
    if (circle3 == true) {
      //fill(colorQueue[2], 255, 255);
      fill(colorQueue[2]);
      stroke(colorNext[2]);
      strokeWeight(strokeWgt);
      ellipse(ellipseXqueue[2], ellipseYqueue[2], ellipseSize[2] - strokeWgt, ellipseSize[2] - strokeWgt);
      //fill(255);
      //text(ellipseSize[2], ellipseXqueue[2] - ellipseSize[2] / 10, ellipseYqueue[2]);
      ellipseYqueue[2] += speed;
      if (ellipseYqueue[2] > height + ellipseSize[2]) {
        circle3 = false;
      }
      
      if (dist(mouseX, 400, ellipseXqueue[2], ellipseYqueue[2]) < ellipseSize[2]) {
        
        if  (playerSize > ellipseSize[2]) {
          if ((red(colorQueue[2]) != 0) && (red(playerColor) > 0)) {
            circle3 = false;
            playerColor = colorNext[2];
            playerScore += (ellipseSize[2]/8);
          
          } else if ((green(colorQueue[2]) != 0) && (green(playerColor) > 0)) {
            circle3 = false;
            playerColor = colorNext[2];
            playerScore += (ellipseSize[2]/8);
            
          } else if ((blue(colorQueue[2]) != 0) && (blue(playerColor) > 0)) {
            circle3 = false;
            playerColor = colorNext[2];
            playerScore += (ellipseSize[2]/8);
            
          } else if (playerColor == color(255)){
            circle3 = false;
            playerColor = colorNext[2];
            playerScore += (ellipseSize[2]/8);
          } else {
            gameOver = true;
          }
        } else {
          gameOver = true;
        }
      }
      
      
    }
    
    if (circle4 == true) {
      //fill(colorQueue[3], 255, 255);
      fill(colorQueue[3]);
      stroke(colorNext[3]);
      strokeWeight(strokeWgt);
      ellipse(ellipseXqueue[3], ellipseYqueue[3], ellipseSize[3] - strokeWgt, ellipseSize[3] - strokeWgt);
      //fill(255);
      //text(ellipseSize[3], ellipseXqueue[3] - ellipseSize[3] / 10, ellipseYqueue[3]);
      ellipseYqueue[3] += speed;
      if (ellipseYqueue[3] > height + ellipseSize[3]) {
        circle4 = false;
      }
      
      if (dist(mouseX, 400, ellipseXqueue[3], ellipseYqueue[3]) < ellipseSize[3]) {
        
        if  (playerSize > ellipseSize[3]) {
          if ((red(colorQueue[3]) != 0) && (red(playerColor) > 0)) {
            circle4 = false;
            playerColor = colorNext[3];
            playerScore += (ellipseSize[3]/8);
          
          } else if ((green(colorQueue[3]) != 0) && (green(playerColor) > 0)) {
            circle4 = false;
            playerColor = colorNext[3];
            playerScore += (ellipseSize[3]/8);
            
          } else if ((blue(colorQueue[3]) != 0) && (blue(playerColor) > 0)) {
            circle4 = false;
            playerColor = colorNext[3];
            playerScore += (ellipseSize[3]/8);
            
          } else if (playerColor == color(255)){
            circle4 = false;
            playerColor = colorNext[3];
            playerScore += (ellipseSize[3]/8);
          } else {
            gameOver = true;
          }
        } else {
          gameOver = true;
        }
      }
      
    }
    
    if (circle5 == true) {
      //fill(colorQueue[4], 255, 255);
      fill(colorQueue[4]);
      stroke(colorNext[4]);
      strokeWeight(strokeWgt);
      ellipse(ellipseXqueue[4], ellipseYqueue[4], ellipseSize[4] - strokeWgt, ellipseSize[4] - strokeWgt);
      //fill(255);
      //text(ellipseSize[4], ellipseXqueue[4] - ellipseSize[4] / 10, ellipseYqueue[4]);
      ellipseYqueue[4] += speed;
      if (ellipseYqueue[4] > height + ellipseSize[4]) {
        circle5 = false;
      }
      
      if (dist(mouseX, 400, ellipseXqueue[4], ellipseYqueue[4]) < ellipseSize[4]) {
        
        if  (playerSize > ellipseSize[4]) {
          if ((red(colorQueue[4]) != 0) && (red(playerColor) > 0)) {
            circle5 = false;
            playerColor = colorNext[4];
            playerScore += (ellipseSize[4]/8);
          
          } else if ((green(colorQueue[4]) != 0) && (green(playerColor) > 0)) {
            circle5 = false;
            playerColor = colorNext[4];
            playerScore += (ellipseSize[4]/8);
            
          } else if ((blue(colorQueue[4]) != 0) && (blue(playerColor) > 0)) {
            circle5 = false;
            playerColor = colorNext[4];
            playerScore += (ellipseSize[4]/8);
            
          } else if (playerColor == color(255)){
            circle5 = false;
            playerColor = colorNext[4];
            playerScore += (ellipseSize[4]/8);
          } else {
            gameOver = true;
          }
        } else {
          gameOver = true;
        }
      }
      
      
    }
    
      newCircle = true;
    
    if (int(timer) % 2 != 0) {
      newCircle = false;
    } 
    
  } else {
    textAlign(CENTER, CENTER);
    if (started) {
      text("Game Over!", width/2, height/2);
      
    }
  }


}
