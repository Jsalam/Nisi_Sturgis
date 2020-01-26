var duration = 45000;
let length = 2759
let scrollStep = length / duration;
let scrollPosition = 0;
var start = -1;
var end = -1;
let run = false;
let currentT = 0;
let ellapsedT = 0;
let yOverlay = document.getElementById("overlay2");

//get the audio element from the HTML code
var media = document.getElementById("mediaClip");
var theAnimatedGiff = document.getElementById("theAnimation");


// This function detects the scroll position and  
function scrollPlay() {
  window.requestAnimationFrame(scrollPlay);
  //scrollPosition = window.pageYOffset;

  if (start != -1) {
    ellapsedT = (Date.now() - start) / 1000;
  }

  if (run) {

    if (scrollPosition < length) {
      //scrollPosition += scrollStep;
      scrollPosition = (Date.now() - start) * scrollStep;
      window.scrollTo(0, scrollPosition)
      document.getElementById("currentPosition").innerHTML = scrollPosition.toFixed();
      currentT = (scrollPosition / scrollStep) / 1000;
      document.getElementById("currentTime").innerHTML = currentT.toFixed(1);
      //Uncomment this line to see the scroll position on console
      //console.log(scrollPosition);
    } else {
      if (end == -1) {
        end = Date.now() - start
        console.log("duration: " + end);
        run = false;
      }
    }
  } else {
    document.getElementById("currentPosition").innerHTML = window.pageYOffset;
    currentT = (window.pageYOffset / scrollStep) / 1000
    document.getElementById("currentTime").innerHTML = currentT.toFixed(1);
  }

  if (ellapsedT < duration/1000) {
    document.getElementById("ellapsedTime").innerHTML = ellapsedT.toFixed(1);
    // overlay scrolling
    let overlayPos = (ellapsedT - currentT) * 100;
    yOverlay.style.top = (170 + overlayPos) + "px";
  }


  if (run) {
    document.getElementById("myBtn").innerHTML = "captions activated";
  } else {
    document.getElementById("myBtn").innerHTML = "activate captions";
  }


  /* // First
   setPositionAndPlay(100, 320, 0);
 
   // Second
   setPositionAndPlay(425, 660, 1);
 
   // Third
   setPositionAndPlay(765, 1030, 2);
 
   // Fourth
   setPositionAndPlay(1118, 1370, 3);
 
   // Fifth
   setPositionAndPlay(1469, 1720, 4);
 
   // Sixth
   setPositionAndPlay(1822, 2063, 5);
 
   // Seventh
   setPositionAndPlay(2170, 2414, 6);
 
   // Eighth
   setPositionAndPlay(2520, 2920, 7);*/

  /***** Controlling the animated giff ****/

  // snow
  //switchAnimation(0, 898, "https://i.gifer.com/2eSd.gif");

  // leaves
  //switchAnimation(899, 1953, "https://library.kissclipart.com/20180905/iee/kissclipart-autumn-gif-transparent-clipart-autumn-clip-art-b1f9a54cd26940e1.gif");

  // petals
  //switchAnimation(1954, 2890, "https://img1.liveinternet.ru/images/attach/c/1/57/639/57639782_Padayuschie_lepestkt_rozz.gif");


}

window.requestAnimationFrame(scrollPlay);


function activateCaptions() {
  // media.play();
  // media.loop = false;
  if (start == -1) {
    start = Date.now();
  }
  run = !run;


}

/*This function sets the scroll positions for playing an audio/video and sets the reproduction time in seconds
startScroll: The scroll position 
*/
function setPositionAndPlay(startScroll, endScroll, playTime) {
  let setupGap = 100;
  if (scrollPosition > startScroll && scrollPosition < startScroll + setupGap) {
    media.currentTime = playTime;
    media.pause();
    //console.log("set up time at second: " + playTime);
  } else if (scrollPosition > startScroll + setupGap && scrollPosition < endScroll) {
    media.play();

  }
}

function switchAnimation(startScroll, endScroll, imageURL) {
  if (scrollPosition > startScroll && scrollPosition < endScroll) {
    if (theAnimatedGiff.src != imageURL) {
      theAnimatedGiff.src = imageURL;
    }
  }
}

