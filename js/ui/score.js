class Score {

    constructor(labelScore, player) {
        this._labelScore = labelScore;
        this._player = player;
    }

    setOnUpdateUi(callback) {
        this._onUpdateUi = callback;
    }

    getLabelScoreValue() {
        return Number(this._labelScore.textContent);
    }

    setLabelScoreValue(newValue) {
        this._labelScore.textContent = newValue;

        const callback = this._onUpdateUi;
        if (callback) {
            callback();
        }
    }

    getPlayer() {
        return this._player;
    }
}