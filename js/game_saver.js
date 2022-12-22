class Game_saver {
    constructor() {

    }

    static saveGame(keySave, gameManager) {
        const stateGame = gameManager.getField();
        const indexCurrentPlayer = gameManager.getIndexCurrentPlayer();
        const saveObj = {
            "stateGame": stateGame,
            "indexCurrentPlayer": indexCurrentPlayer,
        };
        localStorage.setItem(keySave, JSON.stringify(saveObj));
    }

    static loadGame(keySave, gameManager, onLoadGame) {
        const saveObj = JSON.parse(localStorage.getItem(keySave));
        const stateGame = saveObj.stateGame;
        const indexCurrentPlayer = saveObj.indexCurrentPlayer;
        gameManager.setField(stateGame);
        gameManager.setCurrentPlayer(indexCurrentPlayer);
        onLoadGame();
    }
}