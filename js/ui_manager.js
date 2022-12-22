class Ui_manager {
    constructor() {
        this._labelPlayerName = labelPlayerName;
    }

    updateLabelPlayerName(player) {
        this._labelPlayerName.textContent = player.getName();
    }
}