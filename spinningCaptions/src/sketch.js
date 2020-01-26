
let cam1;
let actors = [];
let font;
let scene1Caps;
let scene1Cast;
let stage;
let sequence = 0;
let currentSequence = 0;
let captionTemp;

function preload() {
  font = loadFont('fonts/Roboto-Regular.ttf')
}

function setup() {
  createCanvas(1200, 768, WEBGL);

  // instantiate the stage
  stage = new Stage(createVector(0, 0, 0), 180, 400, 400);

  // instantiate the actors
  scene1Cast = new SceneCastManager(1, "The Cambodians");
 
    scene1Cast.addActor(new Actor(11, "#11", '#FF000060'));
    scene1Cast.addActor(new Actor(25, "#25", '#0066FF60'));
    scene1Cast.addActor(new Actor(13, "#13", '#00FF0060'));
    scene1Cast.addActor(new Actor(46, "#46"));
    scene1Cast.addActor(new Actor(2, "#2"));
    scene1Cast.addActor(new Actor(7, "#7"));
    scene1Cast.addActor(new Actor(14, "#14"));
    scene1Cast.addActor(new Actor(8, "#8"));
    scene1Cast.addActor(new Actor(0, "#00"));
    
  

  // set position to actors
  stage.arrangeCast(scene1Cast.actors);

  // add actors not arranged on stage
  let mom = new Actor(10, "Mom");
  mom.setPosition(createVector(230,50,0))
  scene1Cast.addActor(mom);

  // *** Captions
  let c1 = new Caption(1, 11, "#11", 2000, 3400, "but it is like he is old")
  let c2 = new Caption(2, 25, "#25", 2000, 3000, "he murdered 1000s of people")
  let c3 = new Caption(3, 13, "#13", 2000, 3000, "literally 100s of 1000s")
  let c4 = new Caption(4, 2, "#2", 2000, 3000, "have you played with it before?")
  let c5 = new Caption(5, 11, "#11", 2000, 3000, "but did you see the photo?")
  let c6 = new Caption(6, 8, "#8", 2000, 3000, "what?")
  let c7 = new Caption(7, 46, "#46", 2000, 3000, "what photo")
  let c8 = new Caption(8, 13, "#13", 2000, 3000, "the photo")
  let c9 = new Caption(9, 2, "#2", 2000, 3000, "nothing")
  let c10 = new Caption(10, 25, "#25", 2000, 3000, "oh yeah, the photo")
  let c11 = new Caption(11, 10, "Mom", 2000, 3000, "[wistling]")

  // instantiate the sceneCaptionManager
  scene1Caps = new SceneCaptionManager(1, "The Cambodians")
  scene1Caps.addCaption(c1)
  scene1Caps.addCaption(c2)
  scene1Caps.addCaption(c3)
  scene1Caps.addCaption(c4)
  scene1Caps.addCaption(c5)
  scene1Caps.addCaption(c6)
  scene1Caps.addCaption(c7)
  scene1Caps.addCaption(c8)
  scene1Caps.addCaption(c9)
  scene1Caps.addCaption(c10)
  scene1Caps.addCaption(c11)

  // Camera 3D
  cam1 = new Camera();
  cam1.lookAt(0, 0, 0);
  cam1.setPosition(0, 230, 90);

  // Settings
  rectMode(CENTER)
  imageMode(CENTER)
  textFont(font)
}

function draw() {
  background(0)

  // stage
  stage.show()

  // captions
  if (sequence != currentSequence) {
    captionTemp = scene1Caps.getCaptionBySequenceId(sequence);

    if (captionTemp) {
      actorTmp = scene1Cast.getActorById(captionTemp.speakerID)
    }

    if (actorTmp && captionTemp) {
      actorTmp.setCaption(captionTemp)
    }

    currentSequence = sequence;
  }

  // cast
  for (let i = 0; i < scene1Cast.actors.length; i++) {
    scene1Cast.actors[i].show();
  }

  // camera
  cam1.lookAt(0, 0, 0);
  cam1.orbitate(350)
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    sequence++;
  } else if (keyCode === LEFT_ARROW) {
    if (sequence >= 1) {
      sequence--;
    }
  }
  document.getElementById("sqnc").innerHTML = "Caption sequence: "+ sequence;
}

