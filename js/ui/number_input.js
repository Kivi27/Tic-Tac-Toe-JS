class NumberInput {

    constructor(controlledInput, lowerLimit, upperLimit, valueStep) {
        this.controlledInput = controlledInput;
        this._lowerLimit = lowerLimit;
        this._upperLimit = upperLimit;
        this._valueStep = valueStep;
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    increase() {
        this.controlledInput.value = +this.controlledInput.value + this._valueStep;
        this.validateRange();
    }

    decrease() {
        this.controlledInput.value = +this.controlledInput.value - this._valueStep;
        this.validateRange();
    }

    validateRange() {
        this.controlledInput.value =
            this.clamp(this.controlledInput.value, this._lowerLimit, this._upperLimit);
    }

    getValidateInput() {
        return this.controlledInput.value.replace(/\D/g, '');
    }

    getValueControlledInput() {
        return Number(this.controlledInput.value);
    }

    setValueControlledInput(value) {
        this.controlledInput.value = value;
        this.validateRange();
    }

    setUpperLimit(value) {
        if (value > 0 && value > this._lowerLimit) {
            this._upperLimit = value;
            this.validateRange();
        }
    }
}
