class Ui_controller {
    _drawLabel = "Draw !!!";

    constructor(labelPlayerName, labelInfoGame) {
        this._labelInfoGame = labelInfoGame;
        this._labelPlayerName = labelPlayerName;
    }

    updateLabelDraw() {
        this._labelInfoGame.textContent = this._drawLabel;
    }

    updateLabelPlayerName(player) {
        this._labelPlayerName.textContent = player.getName();
    }

    addStyleCells(allCells, nameStyle) {
        allCells.forEach(cell => cell.classList.add(nameStyle));
    }

    removeStyleCells(allCells, nameStyle) {
        allCells.forEach(cell => cell.classList.remove(nameStyle));
    }

    addStyleField(Field, nameStyle) {
        Field.forEach(row => {
            row.forEach(cell => cell.classList.add(nameStyle));
        });
    }

    removeStyleField(Field, nameStyle) {
        Field.forEach(row => {
            row.forEach(cell => cell.classList.remove(nameStyle));
        });
    }
}