
let scrollStep = 1;
let scrollPosition = 0;
var start = -1;
var end = -1;
let run = false;
let currentT = 0;
let ellapsedT = 0;
let yOverlay = document.getElementById("overlay2");
// communication
let socket = io.connect('http://localhost:3000');

//get the audio element from the HTML code
var media = document.getElementById("mediaClip");
var theAnimatedGiff = document.getElementById("theAnimation");

// Start event detection loop
window.requestAnimationFrame(scrollPlay);


// This function detects the scroll position and  
function scrollPlay() {
  window.requestAnimationFrame(scrollPlay);

  if (window.scrollY > 10 && run == false) {
    alert("CAPTIONS ARE NOT ACTIVATED. \nClick OK, ESC OR ENTER to activate them and start caption brodcasting")
    alert("Are you sure?")
    run = true;
  }

  if (start != -1) {
    ellapsedT = (Date.now() - start) / 1000;
  }

  if (run) {
    document.getElementById("myBtn").innerHTML = "captions activated";
    currentT = (scrollPosition / scrollStep) / 1000;
    // Row detection
    getRowSeq()

  } else {
    document.getElementById("myBtn").innerHTML = "activate captions";
  }

  document.getElementById("ellapsedTime").innerHTML = ellapsedT.toFixed(1);
  //console.log(window.scrollY);
}

function getRowSeq() {
  let table = document.getElementById("table1");
  let rows = table.getElementsByTagName("tr");

  for (let index = 0; index < rows.length; index++) {
    let pos = table.offsetTop + rows[index].offsetTop - window.scrollY;
    let posBtm = pos + rows[index].scrollHeight;

    if (97 < pos && pos < 145) {
      rows[index].bgColor = "#FFB7CF"
      sendMessage(index-1)
    } else if (145 >= posBtm) {
      rows[index].bgColor = 'grey'
    } else if (145 < pos) {
      rows[index].bgColor = 'transparent'
    }
  }
  document.getElementById("currentPosition").innerHTML = window.scrollY
}

function sendMessage(index){
  socket.emit('message',captions[index])
  document.getElementById("currentSequence").innerHTML = index;
}

function activateCaptions() {
  if (start == -1) {
    start = Date.now();
  }
  run = !run;
  //socket = io.connect('http://localhost:3000')
  console.log('Operator connected to localhost')
}


