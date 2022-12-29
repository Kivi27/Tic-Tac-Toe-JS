class Score {

    constructor(labelScore, player) {
        this._labelScore = labelScore;
        this._player = player;
    }

    getLabelScoreValue() {
        return Number(this._labelScore.textContent);
    }

    setLabelScoreValue(newValue) {
        this._labelScore.textContent = newValue;
        this?._onUpdateUi();
    }

    getPlayer() {
        return this._player;
    }

    setOnUpdateUi(callback) {
        this._onUpdateUi = callback;
    }
}