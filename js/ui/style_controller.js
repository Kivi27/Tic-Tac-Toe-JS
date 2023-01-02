class StyleController {

    constructor() {

    }

    addStyleCells(allCells, nameStyle) {
        allCells.forEach(cell => cell.classList.add(nameStyle));
    }

    removeStyleCells(allCells, nameStyle) {
        allCells.forEach(cell => cell.classList.remove(nameStyle));
    }

    addStyleField(Field, nameStyle) {
        Field.forEach(row => {
            row.forEach(cell => cell.classList.add(nameStyle));
        });
    }

    removeStyleField(Field, nameStyle) {
        Field.forEach(row => {
            row.forEach(cell => cell.classList.remove(nameStyle));
        });
    }
}