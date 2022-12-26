class Tic_tac_toe_controller {
    _limitWin = 3;
    _blockGame = false;

    constructor(cells, countRow, countColumn, players) {
        this._countRow = countRow;
        this._countColumn = countColumn;
        this._players = players;
        this._currentPlayer = this._players[0];
        this._gameField = [];

        this.createField(cells);
    }

    createField(cells) {
        for (let i = 0, j = 0; j < cells.length; i++, j += this._countColumn) {
            this._gameField[i] = cells.slice(j, j + this._countColumn);
        }
    }

    dynamicChangeField(cells, newCountRow, newCountColumn) {
        this._countRow = newCountRow;
        this._countColumn = newCountColumn;
        this._gameField = [];
        this.createField(cells);
    }

    isFieldFill() {
        let isFill = true;

        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                const currentValue = this._gameField[i][j].textContent;

                if (currentValue === "") {
                    isFill = false;
                    break;
                }
            }
        }

        return isFill;
    }

    clearField() {
        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                this._gameField[i][j].textContent = "";
            }
        }

        this._currentPlayer = this._players[0];
        this._onReset(this._gameField);
        this._blockGame = false;
        this._OnUpdateUi();
    }

    getImageField() {
        let field = new Array(this._countRow);

        for (let i = 0; i < this._countRow; i++) {
            field[i] = new Array(this._countColumn);

            for (let j = 0; j < this._countColumn; j++) {
                field[i][j] = this._gameField[i][j].textContent;
            }
        }
        return field;
    }

    setImageField(newField) {
        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                this._gameField[i][j].textContent = newField[i][j];
            }
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

    setOnDraw(callback) {
        this._onDraw = callback;
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

    changeCurrentPlayer() {
        this._currentPlayer = this._currentPlayer === this._players[0]
            ? this._players[1]
            : this._players[0];
    }

    getStateSave() {
        const stateField = this.getImageField();
        const indexCurrentPlayer = this.getIndexCurrentPlayer();

        return {
            "stateField": stateField,
            "indexCurrentPlayer": indexCurrentPlayer,
        };
    }

    setStateSave(saveState) {
        this.setImageField(saveState.stateField);
        this.setCurrentPlayer(saveState.indexCurrentPlayer);
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

    gameStep(pressedEvent) {
        const pressedButton = pressedEvent.target;
        const isGameLock = !this._blockGame;
        const isCellEmpty = pressedButton.textContent === "";

        if (isCellEmpty && isGameLock) {
            pressedButton.textContent = this._currentPlayer.getGameSymbol();

            if (!this.checkWin()) {
                this.changeCurrentPlayer();
                this._OnUpdateUi();

                if (this.isFieldFill()) {
                    this._onDraw(this._gameField);
                }
            }
        }
    }
}