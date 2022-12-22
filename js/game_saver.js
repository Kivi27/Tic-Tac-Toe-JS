class Game_saver {
    constructor() {

    }

    static saveGame(keySave, gameManager) {
        const saveObj = gameManager.getStateSave();
        localStorage.setItem(keySave, JSON.stringify(saveObj));
    }

    static loadGame(keySave, gameManager) {
        const saveObj = JSON.parse(localStorage.getItem(keySave));
        gameManager.setStateSave(saveObj);
    }
}