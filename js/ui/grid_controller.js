class GridController {
    _maxSizeCell = 100;

    constructor(grid, countRow, countColumn) {
        this._grid = grid;
        this.changeSizeGrid(countRow, countColumn);
    }

    changeSizeGrid(countRow, countColumn) {
        const sizeCell = this.calculateSizeCell(countColumn);
        const countCell = countRow * countColumn;
        const columnGrid = `repeat(${countColumn}, ${sizeCell + "px"})`;
        const rowGrid = `repeat(${countRow}, ${sizeCell + "px"})`;
        this._grid.style.gridTemplateColumns = columnGrid;
        this._grid.style.gridTemplateRows = rowGrid;

        this.deleteAllCells();

        for (let i = 0; i < countCell; i++) {
            this.addCell(i, countRow, countColumn, sizeCell);
        }
    }

    calculateSizeCell(countColumn) {
        const leftIndentation = 30;
        let sizeCell = (window.innerWidth - leftIndentation) / countColumn;

        if (sizeCell > this._maxSizeCell) {
            sizeCell = this._maxSizeCell;
        }

        return sizeCell;
    }

    deleteAllCells() {
        const allBlockCells = document.querySelectorAll(".tic_tac-toe__сell");
        allBlockCells.forEach(cell => cell.remove());
    }

    addCell(indexCreated, countRow, countColumn, sizeCell) {
        const newCell = document.createElement("div");
        const newGameButton = document.createElement("button");
        this.setStyleCell(indexCreated, countRow, countColumn, newCell);
        this.setStyleGameButton(newGameButton, sizeCell);
        newCell.append(newGameButton);
        this._grid.append(newCell);
    }

    setStyleCell(indexCreated, countRow, countColumn, cell) {
        const defaultStyleCell = "tic_tac-toe__сell ";
        const topStyleCell = "tic-tac-toe__cell_top-border";
        const rightStyleCell = "tic-tac-toe__cell_right-border";
        const bottomStyleCell = "tic-tac-toe__cell_bottom-border";
        const leftStyleCell = "tic-tac-toe__cell_left-border";

        cell.className = defaultStyleCell;

        const isFirstColumn = indexCreated % countColumn === 0;
        const isFirstRow = indexCreated < countColumn;

        if (isFirstColumn) {
            cell.className += leftStyleCell + " ";
        }

        if (isFirstRow) {
            cell.className += topStyleCell + " ";
        }
        cell.className += rightStyleCell + " " + bottomStyleCell;
    }

    setStyleGameButton(gameButton, sizeCell) {
        gameButton.className = "tic-tac-toe__button";
        gameButton.style.fontSize = this.calculateFontSize(sizeCell) + "rem";
    }

    calculateFontSize(sizeCell) {
        return 3 * sizeCell / 100;
    }

    getCells() {
        return Array.from(document.querySelectorAll(".tic-tac-toe__button"));
    }
}