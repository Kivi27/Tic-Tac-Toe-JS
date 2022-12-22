const saveKey = "game_manager";
const nameWinStyle = "tic-tac-toe__сell_win";

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

gameManager.setOnWin(winCells => {
    uiManager.addStyle(winCells, nameWinStyle);
});

gameManager.setOnReset(allCells => {
    uiManager.removeStyle(allCells, nameWinStyle);
});

gameManager.setOnDraw(allCells => {
    uiManager.addStyle(allCells, "tic-tac-toe__cell_draw");
});

if (localStorage.getItem(saveKey)) {
    Game_saver.loadGame(saveKey, gameManager);
}

for (let cellTicTacToe of cellsTicTacToe) {
    cellTicTacToe.addEventListener("click", (pressedButton) => {
        gameManager.gameStep(pressedButton);
        Game_saver.saveGame(saveKey, gameManager);
    });
}

resetButton.addEventListener("click", (e) => {
    gameManager.clearField();
    Game_saver.saveGame(saveKey, gameManager);
});