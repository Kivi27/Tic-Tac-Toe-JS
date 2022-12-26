class Tic_tac_toe_controller {
    _limitWin = 3;
    _blockGame = false;

    constructor(cells, countRow, countColumn, players) {
        this._countRow = countRow;
        this._countColumn = countColumn;
        this._players = players;
        this._currentPlayer = this._players[0];
        this._gameField = [];
        this._winCells = [];

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

    checkCell(cell, playerSymbol) {
        if (cell.textContent === playerSymbol) {
            this._winCells.push(cell);
        } else {
            this._winCells = [];
        }
    }

    getWinCell() {
        return this._winCells.length === this._limitWin ? this._winCells : null;
    }

    collectWinElementsHorizontal(player) {
        const playerSymbol = player.getGameSymbol();

        rowLoop: for (let i = 0; i < this._countRow; i++) {
            this._winCells = [];
            for (let j = 0; j < this._countColumn; j++) {
                this.checkCell(this._gameField[i][j], playerSymbol);

                if (this._winCells.length === this._limitWin) {
                    break rowLoop;
                }
            }
        }

        return this.getWinCell();
    }

    collectWinElementsVertical(player) {
        const playerSymbol = player.getGameSymbol();

        columnLoop: for (let j = 0; j < this._countColumn; j++) {
            this._winCells = [];
            for (let i = 0; i < this._countRow; i++) {
                this.checkCell(this._gameField[i][j], playerSymbol);

                if (this._winCells.length === this._limitWin) {
                    break columnLoop;
                }
            }
        }

        return this.getWinCell();
    }


    collectWinElementUpperMainDiagonal(player) {
        const playerSymbol = player.getGameSymbol();

        diagonalLoop: for (let numberDiagonal = 0; numberDiagonal < this._countColumn; numberDiagonal++) {
            let rowIndex = 0;
            this._winCells = [];

            for (let columnIndex = numberDiagonal; columnIndex >= 0; columnIndex--) {
                this.checkCell(this._gameField[rowIndex][columnIndex], playerSymbol);

                if (this._winCells.length === this._limitWin) {
                    break diagonalLoop;
                }
                rowIndex++;
            }
        }

        return this.getWinCell();
    }

    collectWinElementDownMainDiagonal(player) {
        const playerSymbol = player.getGameSymbol();

        diagonalLoop: for (let numberDiagonal = 1; numberDiagonal < this._countRow; numberDiagonal++) {
            let rowIndex = numberDiagonal;
            this._winCells = [];

            for (let columnIndex = this._countColumn - 1; columnIndex > numberDiagonal - 1; columnIndex--) {
                this.checkCell(this._gameField[rowIndex][columnIndex], playerSymbol);

                if (this._winCells.length === this._limitWin) {
                    break diagonalLoop;
                }
                rowIndex++;
            }
        }

        return this.getWinCell();
    }

    collectWinElements(player) {
        return this.collectWinElementsHorizontal(player)
            || this.collectWinElementsVertical(player)
            || this.collectWinElementUpperMainDiagonal(player)
            || this.collectWinElementDownMainDiagonal(player)
    }

    checkWin() {
        let isWin = false;
        const winElements = this.collectWinElements(this._currentPlayer);

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