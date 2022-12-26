const saveKey = "state_game";
const nameWinStyle = "tic-tac-toe__сell_win";
const nameDrawStyle = "tic-tac-toe__cell_draw";

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const cellsTicTacToe = Array.from(document.querySelectorAll(".tic-tac-toe__button"));
const resetButton = document.querySelector(".tic-tac-toe-hud__reset-button");
const labelPlayerName = document.querySelector(".tic-tac-toe__player-name");
const labelPlayerInfo = document.querySelector(".tic-tac-toe-hud__player-info");

const uiController = new Ui_controller(labelPlayerName, labelPlayerInfo);
const ticTacToeController = new Tic_tac_toe_controller(cellsTicTacToe,[player1, player2]);

ticTacToeController.setOnUpdateUi(() => {
    const currentPlayer = ticTacToeController.getCurrentPlayer();
    uiController.updateLabelPlayerName(currentPlayer);
});

ticTacToeController.setOnWin(winCells => {
    uiController.addStyleCells(winCells, nameWinStyle);
});

ticTacToeController.setOnReset(allCells => {
    uiController.removeStyleField(allCells, nameWinStyle);
});

ticTacToeController.setOnDraw(allCells => {
    uiController.addStyleField(allCells, nameDrawStyle);
});

if (localStorage.getItem(saveKey)) {
    Saver.loadGame(saveKey, ticTacToeController);
}

for (let cellTicTacToe of cellsTicTacToe) {
    cellTicTacToe.addEventListener("click", (pressedButton) => {
        ticTacToeController.gameStep(pressedButton);
        Saver.saveGame(saveKey, ticTacToeController);
    });
}

resetButton.addEventListener("click", (event) => {
    ticTacToeController.clearField();
    Saver.saveGame(saveKey, ticTacToeController);
});