class Caption {
  constructor(_seq, _speakerID, _speakerName, _in, _duration, _caption) {
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
    this.remaining = 0
  }

  /**
  Shows the cation on screeen
  */
  display() {
    this.countdown();
    if (this.visible) {
      let string =  ">> " + this.caption;
      let boxWidth = 70;
      let txtLength = textWidth(string);
      let txtHeight = ceil(txtLength/ boxWidth) + 1
      let leading = 12
      textAlign(LEFT)
      textSize(12)
      textLeading(leading)
      text(string, 0, -20, boxWidth, txtHeight *  leading)
      textAlign(CENTER)
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