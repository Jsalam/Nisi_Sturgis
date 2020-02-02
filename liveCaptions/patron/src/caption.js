class Caption {
  constructor(_seq, _speakerID, _speakerName, _in, _duration, _caption, _style) {
    // The sequence id. Must be an integer
    this.seq = _seq;
    // The character id
    this.speakerID = _speakerID;
    // The character name
    this.speakerName = _speakerName;
    // The 'in' time in format hh:mm:ss:ms
    this.in = _in;
    // The 'out' time calculated by adding the duration to the in
    this.out = -1;
    // The duration of the caption in milliseconds
    this.duration = _duration;
    // The caption text. Must be a string
    this.caption = _caption;
    // Is this caption has not been displayed visibility is true
    this.visible = true;
    this.remaining = 0;
    this.style = _style; // possible styles: normal, emphasis, yell, music
  }

  /**
  Shows the caption on screeen
  */
  display() {
    this.countdown();
    if (this.visible) {
      let string =  ">> " + this.caption;
      let boxWidth = 70;
      let txtLength = globalP5.textWidth(string);
      let txtHeight = globalP5.ceil(txtLength/ boxWidth) + 1
      let leading = 12
      globalP5.textAlign(globalP5.LEFT)
      globalP5.textSize(12)
      globalP5.textLeading(leading)
      // display caption
      globalP5.text(string, 0, -20, boxWidth, txtHeight *  leading)
      globalP5.textAlign(globalP5.CENTER)
    }
  }

  /**
  Creates a countdown timer and controls caption visibility
  */
  countdown() {
    if (this.out == -1) {
      this.out = Date.now()
      this.out += this.duration
    }

    if (Date.now() > this.out) {
      this.visible = false
      
    }else {
      this.remaining = this.out - Date.now();
    }
  }

  reset(){
    this.visible = true;
    this.out = -1;
    this.remaning = 0;
  }
}