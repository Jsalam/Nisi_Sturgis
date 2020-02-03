
let cam1;
let actors = [];
let captions;
let latestSpeakerID;
let cast;
let stage;
let defDuration = 2000;

// communication to server
let socket;
let lastMessage;
let visualizeElements = false;
let input
// fonts
let fontNormal;
let fontEmphasis;
let fontYell;

function captionsApp(p5) {
  p5.preload = function () {
    fontNormal = p5.loadFont('./fonts/Roboto-Regular.ttf')
    fontEmphasis = p5.loadFont('./fonts/Roboto-Italic.ttf')
    fontYell = p5.loadFont('./fonts/Roboto-Bold.ttf');
  }

  p5.setup = function () {
    p5.createCanvas(1200, 768, p5.WEBGL);

    // instantiate the stage
    stage = new Stage(p5.createVector(0, 0, 0), 180, 400, 400);

    // instantiate the actors
    cast = new SceneCastManager(1, "The Cambodians");

    cast.addActor(new Actor(p5, 11, "#11"));
    cast.addActor(new Actor(p5, 25, "#25"));
    cast.addActor(new Actor(p5, 13, "#13"));
    cast.addActor(new Actor(p5, 46, "#46"));
    cast.addActor(new Actor(p5, 2, "#2"));
    cast.addActor(new Actor(p5, 7, "#7"));
    cast.addActor(new Actor(p5, 14, "#14"));
    cast.addActor(new Actor(p5, 8, "#8"));
    cast.addActor(new Actor(p5, 0, "#00"));


    // set position to actors
    stage.arrangeCast(cast.actors);

    // add actors not arranged on stage
    let incidentalSounds = (new Actor(p5, 99, ".."));
    incidentalSounds.setPosition(p5.createVector(230, 50, 30))
    cast.addActor(incidentalSounds);

    // // instantiate the sceneCaptionManager
    captions = new SceneCaptionManager(1, "Entire Script")

    // Camera 3D
    cam1 = new Camera();
    cam1.lookAt(0, 0, 0);
    cam1.setPosition(0, 230, 90);

    // Settings
    p5.rectMode(p5.CENTER)
    p5.imageMode(p5.CENTER)
    p5.textFont(fontNormal)

    // communication
    document.getElementById("patronButton").onclick = connectAndEnable;
  }

  p5.draw = function () {
    p5.background(0)
    if (visualizeElements) {
      // stage
      stage.show()
      // cast
      for (let i = 0; i < cast.actors.length; i++) {
        cast.actors[i].show();
      }
      // camera
      cam1.lookAt(0, 0, 0);
      cam1.orbitate(350)
    }
  }
}

function connectAndEnable() {
  // connect to server
  let enteredIP = document.getElementById("ipAddress").value;
  setIP(enteredIP);
  // enable draw function
  visualizeElements = true;
  // fullscreen
  fullScreen();
  document.getElementById('inputIP1').style.display = "none";
  document.getElementById('inputIP2').style.display = "none";
  document.getElementById('inputIP3').style.display = "none";
}


function setIP(ip) {
  socket = io.connect('http://' + ip + ':3000');
  // receiving messages
  socket.on('message', processMessage);
}

function processMessage(data) {
  msg = data;
  if (msg.Seq !== lastMessage) {
    let messageCaptions = parseMessage(msg);
    for (let i = 0; i < messageCaptions.length; i++) {
      const element = messageCaptions[i];
      setCaption(element);
    }
    lastMessage = msg.Seq;
  }
}


// assign this canvas to the HTML placeholder
var globalP5 = new p5(captionsApp, "sketchHolder");

/**SPlits the message in up to 4 captions returned in an array*/
function parseMessage(msg) {
  let tempCaptions = [];
  // one interaction for each speaker
  for (let i = 0; i < 4; i++) {
    if (msg.speakerID_A) {
      let durationTmp = defDuration;
      if (msg.duration_A) {
        durationTmp = parseInt(msg.duration_A);
      }
      tempCaptions[0] = new Caption(
        parseInt(msg.Seq), msg.speakerID_A, msg.name_A, msg._in, durationTmp, msg.caption_A, msg.style_A);
    }
    if (msg.speakerID_B) {
      let durationTmp = defDuration;
      if (msg.duration_B) {
        durationTmp = parseInt(msg.duration_B);
      }
      tempCaptions[1] = new Caption(
        parseInt(msg.Seq), msg.speakerID_B, msg.name_B, msg._in, durationTmp, msg.caption_B, msg.style_B);
    }
    if (msg.speakerID_C) {
      let durationTmp = defDuration;
      if (msg.duration_C) {
        durationTmp = parseInt(msg.duration_C);
      }
      tempCaptions[2] = new Caption(
        parseInt(msg.Seq), msg.speakerID_C, msg.name_C, msg._in, durationTmp, msg.caption_C, msg.style_C);
    }
    if (msg.speakerID_D) {
      let durationTmp = defDuration;
      if (msg.duration_D) {
        durationTmp = parseInt(msg.duration_D);
      }
      tempCaptions[3] = new Caption(
        parseInt(msg.Seq), msg.speakerID_D, msg.name_D, msg._in, durationTmp, msg.caption_D, msg.style_D);
    }
  }
  return tempCaptions;
}

function setCaption(captionTemp) {
  let actorTmp;

  if (captionTemp) {
    actorTmp = cast.getActorById(captionTemp.speakerID)
  }

  if (actorTmp && captionTemp) {
    // if this is a new phrase or a continuation of a previous one
    if (latestSpeakerID != captionTemp.speakerID){
      captionTemp.setPhraseStart();
      latestSpeakerID = captionTemp.speakerID;
    }
    actorTmp.setCaption(captionTemp)
  }
}

function fullScreen() {
  /* Get the documentElement (<html>) to display the page in fullscreen */
  var elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}