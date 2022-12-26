class Saver {
    constructor() {

    }

    static saveGame(keySave, saveObj) {
        const saveState = saveObj.getStateSave();
        localStorage.setItem(keySave, JSON.stringify(saveState));
    }

    static loadGame(keySave, saveObj) {
        const saveState = JSON.parse(localStorage.getItem(keySave));
        saveObj.setStateSave(saveState);
    }
}