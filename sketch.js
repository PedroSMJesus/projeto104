var PLAY=0;
var END=1;
var gameState = PLAY;

var bg, bg_img;
var player, enemie1, enemie2, enemie3;
var edges;
var life=3;
var lifes1, lifes2, lifes3;
var lifes1_img, lifes2_img, lifes3_img;
var enemie1_img, enemie2_img, enemie3_img;
var playerImage;
var resetButton, resetButton_img;
var gameOver, gameOver_img;

function preload() {
    bg_img = loadImage("./assets/backgroundImage.png");
    lifes1_img = loadImage("./assets/heart_1.png");
    lifes2_img = loadImage("./assets/heart_2.png");
    lifes3_img = loadImage("./assets/heart_3.png");
    enemie1_img = loadImage("./assets/enemie1Image.png");
    enemie2_img = loadImage("./assets/enemie2Image.png");
    enemie3_img = loadImage("./assets/enemie3Image.png");
    playerImage = loadImage("./assets/playerImage.png");
    resetButton_img = loadImage("./assets/resetImage.png");
    gameOver_img = loadImage("./assets/gameOver.png")
     
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    bg = createSprite(windowWidth,windowHeight,20,20);
    bg.addImage(bg_img);
    bg.scale = 1.1;

    player = createSprite(displayWidth/2,displayHeight-300, 50, 50);
    player.addImage(playerImage);
    player.scale= 0.3;

    lifes1 = createSprite(width-1200, height-550, 15, 15);
    lifes1.addImage(lifes1_img);
    lifes1.scale=0.50;

    lifes2 = createSprite(width-1200, height-550, 15, 15);
    lifes2.addImage(lifes2_img);
    lifes2.scale=0.50;

    lifes3 = createSprite(width-1200, height-550, 15, 15);
    lifes3.addImage(lifes3_img);
    lifes3.scale=0.50;

    resetButton = createSprite(width-650, height-300, 50, 50);
    resetButton.addImage(resetButton_img);
    resetButton.scale = 1;
    resetButton.visible = false;

    gameOver = createSprite(width-650, height-550, 50, 50);
    gameOver.addImage(gameOver_img);
    gameOver.scale= 0.5;
    gameOver.visible = false;

    enemie1Group = new Group();
    enemie2Group = new Group();
    enemie3Group = new Group();

}

function draw() {
    background(bg_img);

    if(gameState === PLAY){
       player.x = World.mouseX;
       player.y = World.mouseY; 

       edges = createEdgeSprites();
       player.collide(edges);
       player.collide(enemie2Group);
       edges.overlap(enemie1Group, function (collector, collected) { 
        collected.remove();
       });
       edges.overlap(enemie3Group, function (collector, collected) { 
        collected.remove();
       });

       if (enemie1Group.isTouching(player) || enemie3Group.isTouching(player)) {
        life = life-1;
        enemie1Group.destroyEach();
        enemie2Group.destroyEach();
        enemie3Group.destroyEach();
      }
      if (life === 3) {
        lifes3.visible = true;
        lifes2.visible = false;
        lifes1.visible = false;
      }
      if (life === 2) {
        lifes3.visible = false;
        lifes2.visible = true;
        lifes1.visible = false;
      }
      if (life === 1) {
        lifes3.visible = false;
        lifes2.visible = false;
        lifes1.visible = true;
      }

      spawEnemie1Group();
      spawEnemie2Group();
      spawEnemie3Group();

      if (life === 0) {
        gameState = END
      }

    }

    if(gameState === END){
       enemie1Group.destroyEach();
       enemie1Group.setVelocityXEach(0);
       enemie1Group.setLifetimeEach(-1);

       enemie2Group.destroyEach();
       enemie2Group.setVelocityXEach(0);
       enemie2Group.setLifetimeEach(-1);

       enemie3Group.destroyEach();
       enemie3Group.setVelocityXEach(0);
       enemie3Group.setLifetimeEach(-1);

       player.visible= false;
       gameOver.visible= true;
       lifes1.visible= false;
       resetButton.visible= true;

       if (keyDown("space") || mousePressedOver(resetButton)) {
        reset();
      }
    }

    drawSprites();
}

function spawEnemie1Group() {
    if (frameCount % 75 === 0) {
        enemie1 = createSprite(displayWidth, random(height-550, height-100), 75, 75);
        enemie1.addImage(enemie1_img);
        enemie1.scale= 0.3;
        enemie1.velocityX= -6;
        enemie1.lifetime = 1300;
        enemie1.setCollider("rectangle",0,0,40,40);
        enemie1Group.add(enemie1);
    }
}

function spawEnemie2Group() {
   if (frameCount %85 === 0) {
    enemie2 = createSprite(player.x, player.y, 75, 75);
    enemie2.addImage(enemie2_img);
    enemie2.scale= 0.3;
    enemie2.setCollider("rectangle",0,0,40,40);
    enemie2Group.add(enemie2);
   } 
}

function spawEnemie3Group() {
    if (frameCount % 85 === 0) {
      for (let index = 50; index < 400; index=index+50) {
        enemie3 = createSprite(index,height-575,75,75);
        enemie3.addImage(enemie3_img);
        enemie3.scale = 0.3;
        enemie3.velocityY= 7;
        enemie3.lifetime = 2000;
        enemie3.setCollider("rectangle",0,0,40,40);
        enemie3Group.add(enemie3);
      }
    }
}

function reset() {
    gameState = PLAY;
    life = 3;
    player.visible= true;
    gameOver.visible= false;
    resetButton.visible= false;
}