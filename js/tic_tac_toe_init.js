const saveKeyTicTacToeField = "stateGame";
const saveKeyOldCountColumn = "sizeField";
const defaultSizeTicTacToeField = 3;

const inputCountColumnGrid = document.querySelector(".tic-tac-toe-resize-ui__input");
const resizeController = new Number_controlled_input(inputCountColumnGrid);
const buttonUpSize = document.querySelector(".tic-tac-toe-resize-ui__up-size");

buttonUpSize.addEventListener("click", function () {
    resizeController.increase();
});

const buttonDownSize = document.querySelector(".tic-tac-toe-resize-ui__down-size");

buttonDownSize.addEventListener("click", function () {
    resizeController.decrease();
});

const buttonChangeCountColumn = document.querySelector(".tic-tac-toe-resize-ui__button-apply-change");

buttonChangeCountColumn.addEventListener("click", function () {
    const countColumn = resizeController.getValueControlledInput();
    const oldCountColumn = Number(localStorage.getItem(saveKeyOldCountColumn));

    if (oldCountColumn !== countColumn) {
        changeSizeTicTacToe(countColumn, countColumn);
        Saver.saveObj(saveKeyTicTacToeField, ticTacToeController);
        localStorage.setItem(saveKeyOldCountColumn, String(countColumn));
    }
});

inputCountColumnGrid.addEventListener("input", function () {
    this.value = resizeController.getValidateInput();
});

inputCountColumnGrid.addEventListener('focusout', function () {
    resizeController.validateRange();
});


function initTicTacToeCells(cellsTicTacToe) {
    for (let cellTicTacToe of cellsTicTacToe) {
        cellTicTacToe.addEventListener("click", (pressedButton) => {
            ticTacToeController.gameStep(pressedButton);
            Saver.saveObj(saveKeyTicTacToeField, ticTacToeController);
        });
    }
}

function changeSizeTicTacToe(countColumn, countRow) {
    gridController.changeSizeGrid(countColumn, countRow);
    const allCells = gridController.getCells();
    ticTacToeController.clearField();
    initTicTacToeCells(allCells);
    ticTacToeController.dynamicChangeField(allCells, countColumn, countRow);
}

const gridTicTacToe = document.querySelector(".tic-tac-toe-grid");
const resetButton = document.querySelector(".tic-tac-toe-setting__reset-button");
const labelPlayerName = document.querySelector(".tic-tac-toe-game__player-name");
const labelPlayerInfo = document.querySelector(".tic-tac-toe-hud__player-info");
const countColumnAndRow = resizeController.getValueControlledInput();

const gridController = new Grid_controller(gridTicTacToe, countColumnAndRow, countColumnAndRow);
const cellsTicTacToe = gridController.getCells();

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");
initTicTacToeCells(cellsTicTacToe);
const ticTacToeController = new Tic_tac_toe_controller(cellsTicTacToe, countColumnAndRow,
    countColumnAndRow, [player1, player2]);
const uiController = new Ui_controller(labelPlayerName, labelPlayerInfo);

const nameWinStyle = "tic-tac-toe__сell_win";
const nameDrawStyle = "tic-tac-toe__cell_draw";
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

resetButton.addEventListener("click", () => {
    ticTacToeController.clearField();
    Saver.saveObj(saveKeyTicTacToeField, ticTacToeController);
});

window.onstorage = () => tryRestoreTicTacToeState();

tryRestoreTicTacToeState();

function tryRestoreTicTacToeState() {
    const oldSizeField = Number(localStorage.getItem(saveKeyOldCountColumn));
    if (!oldSizeField) {
        localStorage.setItem(saveKeyOldCountColumn, String(defaultSizeTicTacToeField));
    } else if (localStorage.getItem(saveKeyTicTacToeField)) {
        resizeController.setValueControlledInput(oldSizeField);
        changeSizeTicTacToe(oldSizeField, oldSizeField);
        Saver.loadObj(saveKeyTicTacToeField, ticTacToeController);
    }
}