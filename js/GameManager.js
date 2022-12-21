class GameManager {
    _countRow = 3;
    _countColumn = 3;

    constructor(buttons, labelPlayerName, players) {
        this._players = players;
        this._currentPlayer = this._players[0];
        this._labelPlayerName = labelPlayerName;
        this._gameField = [];

        for (let i = 0, j = 0; j < buttons.length; i++, j += 3) {
            this._gameField[i] = buttons.slice(j, j + 3);
        }

        this.updateLabelPlayerName(this._currentPlayer);
    }

    checkHorizontal(player) {
        for (let i = 0; i < this._countRow; i++) {
            let countScore = 0;
            const playerSymbol = player.getGameSymbol();
            for (let j = 0; j < this._countColumn; j++) {
                if (this._gameField[i][j].textContent === playerSymbol) {
                    countScore++;
                }
            }
            if (countScore === this._countColumn) {
                return true;
            }
        }
        return false;
    }

    checkVertical(player) {
        for (let j = 0; j < this._countColumn; j++) {
            let countScore = 0;
            const playerSymbol = player.getGameSymbol();
            for (let i = 0; i < this._countRow; i++) {
                if (this._gameField[i][j].textContent === playerSymbol) {
                    countScore++;
                }
            }
            if (countScore === this._countRow) {
                return true;
            }
        }
        return false;
    }

    checkMainDiagonal(player) {
        let countScore = 0;
        const playerSymbol = player.getGameSymbol();
        for (let i = 0; i < this._countRow; i++) {
            if (this._gameField[i][i].textContent === playerSymbol) {
                countScore++;
            }
        }
        return countScore === this._countRow;
    }

    checkSideDiagonal(player) {
        let countScore = 0;
        const playerSymbol = player.getGameSymbol();
        for (let i = 0; i < this._countRow; i++) {
            if (this._gameField[i][this._countColumn - i - 1].textContent === playerSymbol) {
                countScore++;
            }
        }
        return countScore === this._countRow;
    }

    checkWin(player) {
        return this.checkHorizontal(player) || this.checkVertical(player) ||
            this.checkMainDiagonal(player) || this.checkSideDiagonal(player)
    }

    updateLabelPlayerName(newPlayer) {
        this._labelPlayerName.textContent = newPlayer.getName();
    }
    changeCurrentPlayer() {
        this._currentPlayer = this._currentPlayer === this._players[0] ? this._players[1] : this._players[0];
    }

    clearField() {
        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                this._gameField[i][j].textContent = "";
            }
        }
        this._currentPlayer = this._players[0];
        this.updateLabelPlayerName(this._currentPlayer);
    }

    gameStep(e) {
        const pressedButton = e.target;
        if (pressedButton.textContent === "") {
            pressedButton.textContent = this._currentPlayer.getGameSymbol();
            if (this.checkWin(this._currentPlayer)) {
                alert("WIIIIIIINNNNN");
            } else {
                this.changeCurrentPlayer();
                this.updateLabelPlayerName(this._currentPlayer);
            }
        }
    }
}