class Ui_manager {
    constructor(labelPlayerName) {
        this._labelPlayerName = labelPlayerName;
    }

    updateLabelPlayerName(player) {
        this._labelPlayerName.textContent = player.getName();
    }

    addStyleWinElements(winElements) {
        winElements.forEach(winCell => winCell.classList.add("tic_tac-toe__сell_win"));
    }

    removeStyleWinElements(allCells, countRow, countColumn) {
        for (let i = 0; i < countRow; i++) {
            for (let j = 0; j < countColumn; j++) {
                allCells[i][j].classList.remove("tic_tac-toe__сell_win");
            }
        }
    }
}