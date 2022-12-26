class Tic_tac_toe_view {
    _sizeCell = 100;
    _standardUnitSize = "px";
    constructor(grid, countRow, countColumn) {
        this._grid = grid;
        this.changeSizeGrid(countRow, countColumn);
    }

    changeSizeGrid(countRow, countColumn) {
        const columnGrid = (this._sizeCell + this._standardUnitSize + " ").repeat(countColumn);
        const rowGrid = (this._sizeCell + this._standardUnitSize + " ").repeat(countRow);
        this._grid.style.gridTemplateColumns = columnGrid;
        this._grid.style.gridTemplateRows = rowGrid;
        const countCell = countRow * countColumn;

        this.deleteAllCells();

        for (let i = 0; i < countCell; i++) {
            this.addCell();
        }
    }

    deleteAllCells() {
        const allBlockCells = document.querySelectorAll(".tic_tac-toe__сell");
        allBlockCells.forEach(cell => cell.remove());
    }

    addCell() {
        const newCell = document.createElement("div");
        newCell.className = "tic_tac-toe__сell";
        newCell.innerHTML = '<button class="tic-tac-toe__button"></button>';
        this._grid.append(newCell);
    }

    getCells() {
        return Array.from(document.querySelectorAll(".tic-tac-toe__button"));
    }
}