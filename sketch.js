//Game States
var PLAY=1;
var END=0;
var gameState=1;

var groundImage, ground2Image, spaceshipImage,  spaceship, ground, ground2;

var obstacleImage, laserImage, laser;

var score, sound,sound2, fireball, fireballImage;

var fireballGroup, laserGroup;

var  restartImg;

var gameoverImg;
var survivalTime;

function preload(){
groundImage = loadImage("background.png");
  
spaceshipImage = loadImage("spaceship.jpg");
  

  
fireballImage = loadImage("fireball.png");
  
restartImg=loadImage("restart.png");
gameoverImg=loadImage("gameover.png");
  
  
laserImage = loadImage("laser.png");
}

function setup() {
 createCanvas(700,700);
 
  ground = createSprite(200,300,700,700);
  ground.addImage(groundImage);
  ground.scale = 5;
  ground.velocityX = -8;
  
  spaceship = createSprite(150,200,20,20);
  spaceship.addImage(spaceshipImage);
  spaceship.scale = 0.8;
  
  restart = createSprite(300,350);
   restart.addImage( restartImg);
 restart.scale=0.4;
  
  gameover = createSprite(300,300);
 gameover  .addImage( gameoverImg);
 gameover.scale=0.4;
  
  score = 0;
  survivalTime=0;
  fireballGroup = new Group();
  laserGroup = new Group();
}

function draw() {
    background(220);

    if(gameState === PLAY){
    if(ground.x < 0){
      ground.x = ground.width / 2;
    }
restart.visible=false;
 gameover.visible=false    
   
 
      survivalTime=Math.ceil(frameCount/frameRate())
   
    
    if(keyDown("up_arrow")){
      spaceship.velocityY = -1; 
    }
   if(keyDown("down_arrow")){
     spaceship.velocityY = 1;
   }  
   fireball();
   if(keyDown("space")){
      createlaser();
    }
      if(fireballGroup.isTouching(laserGroup)){
      fireballGroup.destroyEach();
      score = score + 2;
  }
      if(fireballGroup.isTouching(spaceship)){
      fireballGroup.destroyEach();
      spaceship.visible=false;
       
        gameState=END
      }
  }
     if(gameState === END){
    gameover.visible=true;   
  restart.visible=true
   ground.velocityX=0;
   
       
    }

      
  
  if(mousePressedOver(restart)) {
      reset();
    
  
  }
  
  
    drawSprites();
    textSize(20);
    stroke("yellow");
    text(" SCORE : " + score, 160,20)
  
   stroke("yellow")
  textSize(20);
 
  text("survivalTime:" + survivalTime,300,20);
  }


function reset(){
   gameState=PLAY;
 spaceship.visible=true;
 ground.velocityX=-8;
  score=0;
}

function fireball(){
  if(frameCount % 80 === 0 ){
    var fireball = createSprite(580,330,10,10);
    fireball.addImage(fireballImage);
    fireball.scale = 0.1;
    fireball.velocityX = -(14 + 3 * score/100);
    fireball.y = Math.round(random(50,340));
    fireball.lifetime = 200;
    fireballGroup.add(fireball);
}
}



function createlaser(){
  var laser = createSprite(300,200,60,10);
  laser.addImage(laserImage);
  laser.scale = 0.3;
  laser.x = 270;
  laser.y = spaceship.y;
  laser.velocityX = 4;
  laser.lifetime = 100;
  laserGroup.add(laser);
  return laser;
}