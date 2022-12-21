class Player {
    constructor(name, gameSymbol) {
        this._name = name;
        this._gameSymbol = gameSymbol;
    }

    getName() {
        return this._name;
    }

    getGameSymbol() {
        return this._gameSymbol;
    }
}