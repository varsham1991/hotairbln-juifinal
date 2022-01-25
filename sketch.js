var bg, bgImg, bgImg2;
var balloon, balloonImg;
var bottomGrd, topGrd;
var obsBottom1, obsBottom2, obsBottom3;
var obsTop1, obsTop2
var TopObs, BtmObs
var resetImg, reset;
var gameOverImg, gameOver
var topObsGrp, btmObsGrp, barsGrp;
var dieSnd, jumpSnd;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;

function preload() {
  bgImg=loadImage("assets/bg.png")
  bgImg2=loadImage("assets/bgImg2.jpg")
  balloonImg=loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  obsBottom1=loadImage("assets/obsBottom1.png");
  obsBottom2=loadImage("assets/obsBottom2.png");
  obsBottom3=loadImage("assets/obsBottom3.png");

  obsTop1=loadImage("assets/obsTop1.png")
  obsTop2=loadImage("assets/obsTop2.png")

  resetImg=loadImage("assets/restart.png");
  gameOverImg=loadImage("assets/gameOver.png");

  dieSnd=loadSound("assets/die.mp3");
  jumpSnd=loadSound("assets/jump.mp3");



}

function setup() {
  createCanvas(400, 400)
  bg= createSprite(165, 485, 1, 1);
 getBackground();


 

  bottomGrd=createSprite(200, 390, 800, 20);
  bottomGrd.visible=false;

  topGrd=createSprite(200, 10, 800, 20);
  topGrd.visible=false;


  balloon=createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale= 0.2;

  topObsGrp= new Group();
  btmObsGrp= new Group();
  barsGrp=new Group();

  reset =createSprite(220, 200);
  reset.addImage(resetImg);
  gameOver=createSprite(220, 180);
  gameOver.addImage(gameOverImg);

  reset.scale=0.5;
  reset.visible=false;
  gameOver.scale=0.5;
  gameOver.visible=false;
  
}

function draw() {
 // background("black");


  if(gameState===PLAY){

  bg.velocityX = -3;
  if(bg.x<0){
    bg.x=bg.width/2
  }

  if(keyDown("space")) {
    balloon.velocityY = -4;
    jumpSnd.play();
  }

  balloon.velocityY=balloon.velocityY+2;
  



  bar();
 
  spawnTopObsticles();
  spawnBtmObsticles();

  if(balloon.isTouching(topObsGrp)||balloon.isTouching(btmObsGrp)||balloon.isTouching(bottomGrd)
  ||balloon.isTouching(topGrd)){
    gameState=END;
    dieSnd.play();
  }
}

if(gameState===END){
reset.visible=true;
gameOver.visible=true;

balloon.velocityX=0;
balloon.velocityY=0;

topObsGrp.setVelocityXEach(0);
btmObsGrp.setVelocityXEach(0);

topObsGrp.setLifetimeEach(-1);
btmObsGrp.setLifetimeEach(-1);

balloon.y=200;
if(mousePressedOver(reset)){
  reset1();
}

}
drawSprites();
Score();
}

function spawnTopObsticles(){
  
  if(frameCount%60===0){
    TopObs = createSprite(400, 50, 40, 50);
    TopObs.addImage(obsTop1);
    TopObs.scale=0.1;
    TopObs.velocityX=-4;
    TopObs.y=Math.round(random(10, 100));
    var rand=Math.round(random(1, 2));
    switch(rand){
      case 1: TopObs.addImage(obsTop1);
      break;

      case 2: TopObs.addImage(obsTop2);
      break;

      default:break;
    }
    TopObs.lifetime=150;
    balloon.depth=balloon.depth +1;
    topObsGrp.add(TopObs);

  }
}

function reset1(){
  gameState = PLAY;
  topObsGrp.destroyEach();
  btmObsGrp.destroyEach();
  reset.visible=false;
  gameOver.visible=false;
  score = 0;
}

function spawnBtmObsticles(){
  if(frameCount%60===0){
  BtmObs = createSprite(400, 300, 40, 50);
  BtmObs.addImage(obsBottom1);
  BtmObs.scale=0.1;
  BtmObs.velocityX=-4;
  BtmObs.x=Math.round(random(300, 600));
  var Rand=Math.round(random(1, 2, 3));
  switch(Rand){
    case 1: BtmObs.addImage(obsBottom1);
    break;

    case 2: BtmObs.addImage(obsBottom2);
    break;

    case 3: BtmObs.addImage(obsBottom3);
    break;

    default:break;
    
  }
  BtmObs.lifetime=150;
  balloon.depth=balloon.depth+1;
  btmObsGrp.add(BtmObs);
  }
}

function bar(){
  if(frameCount%60===0){
    var bar;
    bar = createSprite(400, 200, 10, 800);
    bar.velocityX=-6;
    bar.depth=balloon.depth;
    bar.lifetime=70;
    bar.visible=false;
    barsGrp.add(bar);

  }
}

function Score(){
  if(balloon.isTouching(barsGrp)){
    score = score + 10;

  }

  textSize(20);
  fill("black");
  text("score:"+score, 250, 50);

}

async function getBackground(){
  var response = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Tokyo")
  var responseJSON= await response.json();
  var dateTime= responseJSON.datetime;
  var hour= dateTime.slice(11, 13);

  if(hour>=06 && hour<=19){
    bg.addImage(bgImg);
    bg.scale=1.3;
  }
  else{
    bg.addImage(bgImg2);
    bg.scale=1.3;
    bg.x=200;
    bg.y=200;
  }

}