class NumberInput {

    constructor(controlledInput, lowerLimit, upperLimit, valueStep) {
        this._controlledInput = controlledInput;
        this._lowerLimit = lowerLimit;
        this._upperLimit = upperLimit;
        this._valueStep = valueStep;
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    increase() {
        this._controlledInput.value = +this._controlledInput.value + this._valueStep;
        this.validateRange();
    }

    decrease() {
        this._controlledInput.value = +this._controlledInput.value - this._valueStep;
        this.validateRange();
    }

    validateRange() {
        this._controlledInput.value =
            this.clamp(this._controlledInput.value, this._lowerLimit, this._upperLimit);
    }

    getValidateInput() {
        return this._controlledInput.value.replace(/\D/g, '');
    }

    getValueControlledInput() {
        return Number(this._controlledInput.value);
    }

    setValueControlledInput(value) {
        this._controlledInput.value = value;
        this.validateRange();
    }

    setUpperLimit(value) {
        if (value > 0 && value > this._lowerLimit) {
            this._upperLimit = value;
            this.validateRange();
        }
    }
}
