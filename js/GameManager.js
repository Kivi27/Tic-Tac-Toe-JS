class GameManager {
    _countRow = 3;
    _countColumn = 3;
    _blockGame = false;

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

    getWinElementsHorizontal(player) {
        for (let i = 0; i < this._countRow; i++) {
            let winButton = [];
            let countScore = 0;
            const playerSymbol = player.getGameSymbol();
            for (let j = 0; j < this._countColumn; j++) {
                if (this._gameField[i][j].textContent === playerSymbol) {
                    winButton.push(this._gameField[i][j]);
                    countScore++;
                }
            }
            if (countScore === this._countColumn) {
                return winButton;
            }
        }
        return null;
    }

    getWinElementsVertical(player) {
        for (let j = 0; j < this._countColumn; j++) {
            let winButton = [];
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
        return null;
    }

    getWinElementsMainDiagonal(player) {
        let winButton = [];
        let countScore = 0;
        const playerSymbol = player.getGameSymbol();
        for (let i = 0; i < this._countRow; i++) {
            if (this._gameField[i][i].textContent === playerSymbol) {
                winButton.push(this._gameField[i][i]);
                countScore++;
            }
        }
        return countScore === this._countRow ? winButton : null;
    }

    getWinElementsSideDiagonal(player) {
        let countScore = 0;
        let winButton = [];
        const playerSymbol = player.getGameSymbol();
        for (let i = 0; i < this._countRow; i++) {
            let columnIndex = this._countColumn - i - 1;
            if (this._gameField[i][columnIndex].textContent === playerSymbol) {
                winButton.push(this._gameField[i][columnIndex]);
                countScore++;
            }
        }
        return countScore === this._countRow ? winButton : null;
    }

    getWinElements(player) {
        return this.getWinElementsHorizontal(player) || this.getWinElementsVertical(player) ||
            this.getWinElementsMainDiagonal(player) || this.getWinElementsSideDiagonal(player);
    }

    updateLabelPlayerName(player) {
        this._labelPlayerName.textContent = player.getName();
    }

    changeCurrentPlayer() {
        this._currentPlayer = this._currentPlayer === this._players[0] ? this._players[1] : this._players[0];
    }

    addStyleWinElements(winElements) {
        winElements.forEach(item => item.classList.add("tic_tac-toe__сell_win"));
    }

    removeStyleWinElements() {
        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                this._gameField[i][j].classList.remove("tic_tac-toe__сell_win");
            }
        }
    }

    clearField() {
        for (let i = 0; i < this._countRow; i++) {
            for (let j = 0; j < this._countColumn; j++) {
                this._gameField[i][j].textContent = "";
            }
        }
        this._currentPlayer = this._players[0];
        this.updateLabelPlayerName(this._currentPlayer);
        this.removeStyleWinElements();
        this._blockGame = false;
    }

    gameStep(e) {
        const pressedButton = e.target;
        if (pressedButton.textContent === "" && !this._blockGame) {
            pressedButton.textContent = this._currentPlayer.getGameSymbol();
            let winElements = this.getWinElements(this._currentPlayer);
            if (winElements) {
                this._blockGame = true;
                this.addStyleWinElements(winElements);
            } else {
                this.changeCurrentPlayer();
                this.updateLabelPlayerName(this._currentPlayer);
            }
        }
    }
}