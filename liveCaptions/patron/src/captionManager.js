class SceneCaptionManager {
    constructor(_id, _sceneName) {
        this.id = _id;
        this.scene = _sceneName;
        this.captions = [];
    }

    addCaption(caption) {
        // check if the caption id exists
        if (this.verifyIDAvalilability(caption.seq)) {
            this.captions.push(caption);
            return true;
        } else {
            alert("The caption sequence ID " + caption.seq + " does exist. This caption was not added to the caption list")
            return false;
        }
        
    }

    getCaptionBySequenceId(seq) {
        let rtn = undefined;
        for (let i = 0; i < this.captions.length; i++) {
            const element = this.captions[i];
            if (element.seq === seq){
                rtn = element;
                break;
            }
        }
        return rtn;
    }

    verifyIDAvalilability(captionID) {
        let rtn = true;
        for (let i = 0; i < this.captions.length; i++) {
            const element = this.captions[i];
            if (element.seq === captionID){
                rtn = false;
                break;
            }
        }
        return rtn;
    }
}