class GridController {
    _maxSizeCell = 100;

    constructor(grid, countRow, countColumn) {
        this._grid = grid;
        this.changeSizeGrid(countRow, countColumn);
    }

    calculateFontSize(sizeCell) {
        return 3 * sizeCell / 100;
    }

    changeSizeGrid(countRow, countColumn) {
        let sizeCell = screen.width / countColumn;

        if (sizeCell > this._maxSizeCell) {
            sizeCell = this._maxSizeCell;
        }

        const columnGrid = `repeat(${countColumn}, ${sizeCell + "px"})`;
        const rowGrid = `repeat(${countRow}, ${sizeCell + "px"})`;

        this._grid.style.gridTemplateColumns = columnGrid;
        this._grid.style.gridTemplateRows = rowGrid;
        const countCell = countRow * countColumn;

        this.deleteAllCells();

        for (let i = 0; i < countCell; i++) {
            this.addCell(sizeCell);
        }
    }

    deleteAllCells() {
        const allBlockCells = document.querySelectorAll(".tic_tac-toe__сell");
        allBlockCells.forEach(cell => cell.remove());
    }

    addCell(sizeCell) {
        const newCell = document.createElement("div");
        const newGameButton = document.createElement("button");
        newCell.className = "tic_tac-toe__сell";
        newGameButton.className = "tic-tac-toe__button";
        newGameButton.style.fontSize = this.calculateFontSize(sizeCell) + "rem";
        newCell.append(newGameButton);
        this._grid.append(newCell);
    }

    getCells() {
        return Array.from(document.querySelectorAll(".tic-tac-toe__button"));
    }
}