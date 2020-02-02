class SceneCastManager {
    constructor(_id, _sceneName) {
        this.id = _id;
        this.scene = _sceneName;
        this.actors = [];
    }

    addActor(actor) {
        // check if the caption id exists
        if (this.verifyIDAvalilability(actor.id)) {
            this.actors.push(actor);
            return true;
        } else {
            alert("The actor ID " + actor.id + " does exist. This actor was not added to the cast")
            return false;
        }
        
    }

    getActorById(id) {
        let rtn = undefined;
        for (let i = 0; i < this.actors.length; i++) {
            const element = this.actors[i];
            if (element.id == id){
                rtn = element;
                break;
            }
        }
        return rtn;
    }

    verifyIDAvalilability(actorID) {
        let rtn = true;
        for (let i = 0; i < this.actors.length; i++) {
            const element = this.actors[i];
            if (element.seq === actorID){
                rtn = false;
                break;
            }
        }
        return rtn;
    }
}