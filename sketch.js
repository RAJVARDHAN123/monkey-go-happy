var monkey , monkey_running, monkey_collide, moncry;

var exit2, exit2img;

var ghost, ghost_runner, standghost, ghost2;

var bananaImage,bananaImage2, obstacle,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var FoodGroup, obstacleGroup

var r,rimg,m,mimg,c,cimg;

var score

var play, playimg;

var head, headimg;

var htp, htpimg,more,moreimg;

var bac, bacimg;

var exit, exitimg;

var invisible;

var st = 0;

var ss = 0;

var score = 0;

var SERVE = 1;
var PLAY = 2;
var END = 0;

var gameState = SERVE;

var bac2, bac2img;

function preload(){
  
  
  monkey_running =               
loadAnimation("mon 1 edit.png","mon 2 edit.png","mon 3 edit.png","mon 4 edit.png","mon 5 edit.png","mon 6 edit.png");
  
  exit2img = loadImage("exit 2.png");
  
  moreimg = loadImage("rules2.png");
  
  cimg = loadImage("techno background.jpg");
  
  ghost_runner = loadAnimation("ghost1r.png","ghost2r.png", "ghost3r.png");
  
  standghost = loadAnimation("ghost2r.png");
  
  
  monkey_collide = loadAnimation("monnkey cr.png");
  
  bacimg = 
    loadImage("Preview-Jungle.jpg")

  
  bananaImage = loadImage("banana.png");
  bananaImage2 = loadImage("bananas.png");
  
 obstacle = loadImage("jaIL.png");
 obstacle2 = loadImage("trap 1.png");
 obstacle3 = loadImage("trap 2.png");
 obstacle4 = loadImage("trap 3.png");
 obstacle5 = loadImage("obstacle.png");
  
htpimg = loadImage("htp.png");
playimg = loadImage("play.png");
headimg = loadImage("mgh.png");
exitimg = loadImage("exit edit.png");
  
bac2img = loadImage("comic.jpg");
  
rimg = loadImage("restart.png");
  
mimg = loadImage("main menu.png");
  
}



function setup() {
  createCanvas(600,400);
  
  bac = createSprite(300,200);
  bac.addImage(bacimg);
  bac.scale = 0.3;

  
  monkey = createSprite(200,300);
  monkey.addAnimation("monkey run", monkey_running);
  monkey.scale = 0.17;
  monkey.visible = false;
  
   moncry = createSprite(200,320);
   moncry.addAnimation("anime2",monkey_collide);
   moncry.scale = 0.1;
   moncry.visible = false;
  
  
  
  ghost = createSprite(60,300);
  ghost.addAnimation("ghost", ghost_runner);
  ghost.scale = 0.4;
  
  ghost2 = createSprite(60,300);
  ghost2.addAnimation("ghost2",standghost);
  ghost2.scale = 0.4;
  ghost2.visible = false;
  
  invisible = createSprite(200,390,400,20);
  invisible.visible = false;
  
   
  bac2 = createSprite(300,200);
  bac2.addImage(bac2img);
  bac2.visible = false;
  
  head = createSprite(300,100);
  head.addImage(headimg);
  head.visible = false;
  
  htp = createSprite(300,200);
  htp.addImage(htpimg);
  htp.visible = false;
  
  play = createSprite(300,300);
  play.addImage(playimg);
  play.visible = false;
  
  exit = createSprite(50,50);
  exit.addImage(exitimg);
  exit.scale = 0.1;
  exit.visible = false;
  
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
   c = createSprite(325,50);
  c.addImage(cimg);
  c.scale = 0.5;
  c.visible = false;
  
  r = createSprite(250,200);
  r.addImage(rimg);
  r.scale = 0.2;
  r.visible = false;
  
  m = createSprite(400,200);
  m.addImage(mimg);
  m.scale = 0.05;
  m.visible = false;
 
  more = createSprite( 300,200);
  more.addImage(moreimg);
  more.scale = 0.45;
  more.visible = false;
  
  exit2 = createSprite(300,200);
  //exit2.addImage(exit2img);
  exit2.addImage(exit2img);
  exit2.scale = -0.1;
  exit2.visible = false;
  
 
}


function draw() {
  background("white");
   drawSprites(); 
  
  
  invisible.x = monkey.x;
  monkey.collide(invisible);
 

 
 moncry.x = monkey.x;
 
 moncry.y = monkey.y;
 
 ghost2.x = ghost.x;
 
 ghost2.y = ghost.y; 
  
  
  
  //ghost.debug = true;
  ghost.setCollider("rectangle",0,0,200,
  550);
  monkey.setCollider("rectangle",0,0,300,
  550);
 
 
  if(gameState == SERVE){
 bac2.visible = true;
 head.visible = true;
 htp.visible = true;
 play.visible = true;
 monkey.visible = false;
    
    
    
    if(mousePressedOver(htp)){
      more.visible = true;
       exit2.visible = true;
    }
    
    if(mousePressedOver(exit2) && more.visible == true){
      more.visible = false;
      exit2.visible = false;
    }
    
    
    
    if(mousePressedOver(play)){
      gameState = PLAY;
    }
  }
  
  if(gameState == PLAY){
    
  jailobstacle();
    
  spawnbanana();
    
     more.visible = false;
      exit2.visible = false;
    
 bac2.visible = false;
    
 head.visible = false;
    
 htp.visible = false;
    
 play.visible = false;
    
 exit.visible = true;
    
 monkey.visible = true;
    
    if(keyDown("up")&& monkey.y >= 305) {
        monkey.velocityY = -17;
    }
  
  if(keyDown("space") && monkey.y >= 315){
    monkey.velocityY = -12;
  }
    
    monkey.velocityY = monkey.velocityY + 1;
  
    
  if(bac.x<0){
    bac.x = bac.width/6.7;
  }
     bac.velocityX = -(10+4*score/10);
    
    
    if(mousePressedOver(exit)){
      gameState = SERVE;
      restart();
    }
    
    if(obstacleGroup.isTouching(monkey)){
       gameState = END;

    }
    
      if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 5;
  }
    
    textSize(20);
    stroke("white");
    fill("black");
     st= Math.ceil(frameCount/getFrameRate());
    text("Survival Time : " + st, 250, 50);
    

    
    textSize(20);
    stroke("white");
    fill("black");
    text("Score : " + score, 500, 50);
    
    
    
    
    
  }
  
  if(gameState == END){
    bac.velocityX = 0;
    
    monkey.scale = 0.1;
    
    exit.visible = false;
    monkey.velocityY = 0;
    
 //  monkey.visible = false;
    
  // moncry.visible = true;
    
    
    c.visible = true;
    r.visible = true;
    m.visible = true;
    
monkey.addAnimation("monkey run", monkey_collide);
    
  
    
   
    
  ghost.velocityX = 1; 
    
    if(ghost.isTouching(monkey)){
      ghost.velocityX = 0;
      //ghost.changeAnimation("stand",standghost);
    }
  
    if(mousePressedOver(m)){
      gameState = SERVE;
      reset2();
    }
  
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    textSize(20);
    stroke("white");
    fill("black");
    text("Your Survival Time since", 200, 100);
    
    textSize(20);
    stroke("white");
    fill("black");
    text("starting is  " + st, 200, 120);
    
   
    
    textSize(20);
    stroke("white");
    fill("black");
    text("Score : " + score, 200, 150);
    
    textSize(25);
    stroke("white");
    fill("black");
    text("GAME OVER", 200, 50);
   
  }
  
  if(mousePressedOver(r)){
    reset();
  }
  
  if(monkey.isTouching(ghost)){
     ghost.visible = false;
    ghost2.visible = true;
  }
  
  

  


}

function jailobstacle(){
  if(frameCount % 300 == 0){
  var trap = createSprite(600,330);
    trap.velocityX = -(10+4*score/10);
 
  
  
  var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: trap.addImage(obstacle);
        trap.scale = 0.1;
              break;
      case 2: trap.addImage(obstacle2);
        trap.scale = 0.1;
              break;
      case 3: trap.addImage(obstacle3);
        trap.scale = 0.4;
              break;
      case 4: trap.addImage(obstacle4);
        trap.scale = 0.4;
              break;
      case 5: trap.addImage(obstacle5);
              break;
      default: break;
    }
   
    obstacleGroup.add(trap);
  
 }
}

function spawnbanana(){
  if(frameCount%80 == 0){
  var  banana = createSprite(650, random(120,200));
    banana.velocityX = -(10+4*score/10);
     banana.scale = 0.1;
    
    var food = Math.round(random(1,2))
      switch(food){
        case 1:
      banana.addImage(bananaImage);
          break;
          
       case 2: 
          banana.addImage(bananaImage2);
         break;
         default: break;
  }
     FoodGroup.add(banana);
 }
 
}

function restart(){
  
  exit.visible = false;
  
  obstacleGroup.destroyEach();
  
  FoodGroup.destroyEach();
  
  
}

function reset(){
  
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  monkey.addAnimation("monkey run", monkey_running);
  
  ghost.visible = true;
    ghost2.visible = false;
  
  r.visible = false;
  c.visible = false;
  m.visible = false;
  
  ghost.velocityX = 0;
  
  ghost.x = 60;
  
  monkey.scale = 0.17;
  
  score = 0;
  st = 0;
  
}

function reset2(){
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  monkey.addAnimation("monkey run", monkey_running);
  
  ghost.visible = true;
    ghost2.visible = false;
  
  r.visible = false;
  c.visible = false;
  m.visible = false;
  
  ghost.velocityX = 0;
  
  ghost.x = 60;
  
  monkey.scale = 0.17;
  
  score = 0;
  
}









