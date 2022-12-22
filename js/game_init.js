const saveKey = "game_manager";

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const cellsTicTacToe = Array.from(document.querySelectorAll(".tic-tac-toe__button"));
const resetButton = document.querySelector(".tic-tac-toe-hud__reset-button");
const labelPlayerName = document.querySelector(".tic-tac-toe__player-name");

const uiManager = new Ui_manager(labelPlayerName);
const gameManager = new Game_manager(cellsTicTacToe,[player1, player2]);
gameManager.setOnUpdateUi(() => {
    const currentPlayer = gameManager.getCurrentPlayer();
    uiManager.updateLabelPlayerName(currentPlayer);
});

gameManager.setOnWin((winCells) => {
    uiManager.addStyleWinElements(winCells);
});

gameManager.setOnReset( (allCells, countRow, countColumn) => {
    uiManager.removeStyleWinElements(allCells, countRow, countColumn);
})

if (localStorage.getItem(saveKey)) {
    Game_saver.loadGame(saveKey, gameManager);
    console.log("load manager from local storage.....");
}

for (let button of cellsTicTacToe) {
    button.addEventListener("click", (pressedButton) => {
        gameManager.gameStep(pressedButton);
        Game_saver.saveGame(saveKey, gameManager);
    });
}

resetButton.addEventListener("click", (e) => {
    gameManager.clearField();
    Game_saver.saveGame(saveKey, gameManager);
});