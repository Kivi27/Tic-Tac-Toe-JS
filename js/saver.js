class Saver {
    constructor() {

    }

    static saveObj(keySave, saveObj) {
        const saveState = saveObj.getStateSave();
        localStorage.setItem(keySave, JSON.stringify(saveState));
    }

    static loadObj(keySave, saveObj) {
        const saveState = JSON.parse(localStorage.getItem(keySave));
        saveObj.setStateSave(saveState);
    }
}