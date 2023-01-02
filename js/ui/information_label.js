class InformationLabel {

    constructor(label) {
        this._infoLabel = label;
    }

    setInfo(text) {
        this._infoLabel.textContent = text;
    }

    getInfo() {
        return this._infoLabel.textContent;
    }

    clear() {
        this._infoLabel.textContent = "";
    }

}