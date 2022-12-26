const saveKey = "state_game";
const nameWinStyle = "tic-tac-toe__сell_win";
const nameDrawStyle = "tic-tac-toe__cell_draw";

const cellsTicTacToe = Array.from(document.querySelectorAll(".tic-tac-toe__button"));
const resetButton = document.querySelector(".tic-tac-toe-setting__reset-button");
const labelPlayerName = document.querySelector(".tic-tac-toe-game__player-name");
const labelPlayerInfo = document.querySelector(".tic-tac-toe-hud__player-info");

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");
const ticTacToeController = new Tic_tac_toe_controller(cellsTicTacToe,[player1, player2]);
const uiController = new Ui_controller(labelPlayerName, labelPlayerInfo);

function tryRestoreTicTacToeState() {
    if (localStorage.getItem(saveKey)) {
        Saver.loadGame(saveKey, ticTacToeController);
    }
}

window.onstorage = () => tryRestoreTicTacToeState();

ticTacToeController.setOnUpdateUi(() => {
    const currentPlayer = ticTacToeController.getCurrentPlayer();
    uiController.updateLabelPlayerName(currentPlayer);
});

ticTacToeController.setOnWin(winCells => {
    uiController.addStyleCells(winCells, nameWinStyle);
});

ticTacToeController.setOnReset(allCells => {
    uiController.removeStyleField(allCells, nameWinStyle);
    uiController.removeStyleField(allCells, nameDrawStyle);
});

ticTacToeController.setOnDraw(allCells => {
    uiController.addStyleField(allCells, nameDrawStyle);
});

tryRestoreTicTacToeState();

for (let cellTicTacToe of cellsTicTacToe) {
    cellTicTacToe.addEventListener("click", (pressedButton) => {
        ticTacToeController.gameStep(pressedButton);
        Saver.saveGame(saveKey, ticTacToeController);
    });
}

resetButton.addEventListener("click", () => {
    ticTacToeController.clearField();
    Saver.saveGame(saveKey, ticTacToeController);
});