class NumberInput {

    _lowerLimit = 3;
    _upperLimit = 100;
    _valueStep = 1;

    constructor(controlledInput) {
        this.controlledInput = controlledInput;
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

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    getValueControlledInput() {
        return Number(this.controlledInput.value);
    }

    setValueControlledInput(value) {
        this.controlledInput.value = value;
        this.validateRange();
    }
}
