class Game_manager {
    _countRow = 3;
    _countColumn = 3;
    _blockGame = false;

    constructor(buttons, players) {
        this._players = players;
        this._currentPlayer = this._players[0];
        this._gameField = [];

        for (let i = 0, j = 0; j < buttons.length; i++, j += this._countColumn) {
            this._gameField[i] = buttons.slice(j, j + this._countColumn);
        }
    }

    setOnUpdateUi(callback) {
        this._OnUpdateUi = callback;
        this._OnUpdateUi();
    }

    setOnWin(callback) {
        this._onWin = callback;
    }

    setOnReset(callback) {
        this._onReset = callback;
    }

    getField() {
        let field = new Array(this._countRow);
        for (let i = 0; i < this._countRow; i++) {
            field[i] = new Array(this._countColumn);

            for (let j = 0; j < this._countColumn; j++) {
                field[i][j] = this._gameField[i][j].textContent;
            }
        }
        return field;
    }

    setField(newField) {
        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                this._gameField[i][j].textContent = newField[i][j];
            }
        }
    }

    getIndexCurrentPlayer() {
        return this._players.findIndex(player => player === this._currentPlayer);
    }

    getCurrentPlayer() {
        return this._currentPlayer;
    }

    setCurrentPlayer(idx) {
        this._currentPlayer = this._players[idx];
    }

    getStateSave() {
        const stateField = this.getField();
        const indexCurrentPlayer = this.getIndexCurrentPlayer();

        return {
            "stateField": stateField,
            "indexCurrentPlayer": indexCurrentPlayer,
        };
    }

    setStateSave(saveObj) {
        this.setField(saveObj.stateField);
        this.setCurrentPlayer(saveObj.indexCurrentPlayer);
        this.checkWin();
        this._OnUpdateUi();
    }

    getWinElementsHorizontal(player) {
        let winButton = [];

        for (let i = 0; i < this._countRow; i++) {
            winButton = [];
            let countScore = 0;
            const playerSymbol = player.getGameSymbol();

            for (let j = 0; j < this._countColumn; j++) {
                if (this._gameField[i][j].textContent === playerSymbol) {
                    winButton.push(this._gameField[i][j]);
                    countScore++;
                }
            }

            if (countScore === this._countColumn) {
                break;
            }
        }
        return winButton.length === this._countColumn ? winButton : null;
    }

    getWinElementsVertical(player) {
        let winButton = [];

        for (let j = 0; j < this._countColumn; j++) {
            winButton = [];
            let countScore = 0;
            const playerSymbol = player.getGameSymbol();

            for (let i = 0; i < this._countRow; i++) {
                if (this._gameField[i][j].textContent === playerSymbol) {
                    winButton.push(this._gameField[i][j]);
                    countScore++;
                }
            }

            if (countScore === this._countRow) {
                return winButton;
            }
        }

        return winButton.length === this._countColumn ? winButton : null;
    }

    getWinElementsMainDiagonal(player) {
        const winButton = [];
        const playerSymbol = player.getGameSymbol();
        let countScore = 0;

        for (let i = 0; i < this._countRow; i++) {
            if (this._gameField[i][i].textContent === playerSymbol) {
                winButton.push(this._gameField[i][i]);
                countScore++;
            }
        }

        return countScore === this._countRow ? winButton : null;
    }

    getWinElementsSideDiagonal(player) {
        const winButton = [];
        const playerSymbol = player.getGameSymbol();
        let countScore = 0;

        for (let i = 0; i < this._countRow; i++) {
            const columnIndex = this._countColumn - i - 1;

            if (this._gameField[i][columnIndex].textContent === playerSymbol) {
                winButton.push(this._gameField[i][columnIndex]);
                countScore++;
            }
        }

        return countScore === this._countRow ? winButton : null;
    }

    getWinElements(player) {
        return this.getWinElementsHorizontal(player)
            || this.getWinElementsVertical(player)
            || this.getWinElementsMainDiagonal(player)
            || this.getWinElementsSideDiagonal(player);
    }

    changeCurrentPlayer() {
        this._currentPlayer = this._currentPlayer === this._players[0] ? this._players[1] : this._players[0];
    }

    checkWin() {
        let isWin = false;
        const winElements = this.getWinElements(this._currentPlayer);

        if (winElements != null) {
            this._blockGame = true;
            this._onWin(winElements);
            isWin = true;
        }

        return isWin;
    }

    clearField() {
        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                this._gameField[i][j].textContent = "";
            }
        }

        this._currentPlayer = this._players[0];
        this._onReset(this._gameField, this._countRow, this._countColumn);
        this._blockGame = false;
        this._OnUpdateUi();
    }

    gameStep(pressedEvent) {
        const pressedButton = pressedEvent.target;

        if (pressedButton.textContent === "" && !this._blockGame) {
            pressedButton.textContent = this._currentPlayer.getGameSymbol();
            if (!this.checkWin()) {
                this.changeCurrentPlayer();
                this._OnUpdateUi();
            }
        }
    }
}