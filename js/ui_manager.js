class Ui_manager {
    constructor(labelPlayerName) {
        this._labelPlayerName = labelPlayerName;
    }

    updateLabelPlayerName(player) {
        this._labelPlayerName.textContent = player.getName();
    }

    addStyle(allCells, nameStyle) {
        allCells.forEach(cell => cell.classList.add(nameStyle));
    }

    removeStyle(Field, nameStyle) {
        Field.forEach(row => {
            row.forEach(cell => cell.classList.remove(nameStyle));
        });
    }
}