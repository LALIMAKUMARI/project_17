
var PLAY = 1;
var END = 0;
var gamestate=PLAY;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime,score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
 
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(80,515,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(400,550,900,10);
  ground.velocityX =-3;
  console.log(ground.x)
  
    
  score=0;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group(); 

  
}


function draw() {
 background("lightGreen");
  if (gamestate===PLAY){
  if (keyDown("space")&&monkey.y>=125) {
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;

  
  if (ground.x < 150) {
    ground.x = 400;
  }
 monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
    
    stroke ("blue");
    textSize (15);
    fill("red");
    text("score:"+score,500,50);
    
    stroke ("black");
    textSize (20);
    fill("black");
    survivalTime =Math.ceil(frameCount/frameRate())
    text("survivalTime:"+survivalTime,100,50)
    
    
    if(monkey.isTouching(bananaGroup)){
      
      bananaGroup.destroyEach();
       }
    if(monkey.isTouching(obstaclesGroup )){
      gamestate=END;
    }
    
   
  
  
    
  }
  
  if (gamestate===END){
    
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX=0;
    obstaclesGroup.setLifetimeEach(-3);
    bananaGroup.setLifetimeEach(-3);
    
  }
  
  drawSprites();
}

 
function spawnFood(){
  if (frameCount%80===0){
    banana = createSprite(600,320,20,20);
    banana.y= Math.round(random(120,400));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
     //assign lifetime to the variable
    banana.lifetime=180;
  
    
    bananaGroup.add(banana);
  }
  
}
function spawnObstacles(){
   if (frameCount%100===0){
     obstacle = createSprite(600,515,20,20);
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.15;
     obstacle.velocityX=-3;
     obstacle.lifetime=180;
     
     obstaclesGroup.add(obstacle);
   }
 }







