class TableCSVExporter {
    constructor (table, includeHeaders = true) {
        this.table = table;
        this.rows = Array.from(table.querySelectorAll("tr"));

        if(!includeHeaders && this.rows[0].querySelectorAll("th").length){
            this.rows.shift();
        }
    }

    convertToCSV () {
        const lines = [];
        const exportableRows = this.rows.filter(row => !row.classList.contains("result-stats"));
        const numCols = this._findLongestRowLength();

        for (const row of exportableRows){
            let line = "";
            const exportableCells = Array.from(row.children).filter(cell => !cell.classList.contains("no-export"))

            console.log(exportableCells.map(cell => `[${cell.textContent.trim()}]`))

            for (let i = 0; i < numCols; i++){
                if (exportableCells[i] !== undefined) {
                    line += TableCSVExporter.parseCell(exportableCells[i]);
                }

                line += (i !== (numCols - 1)) ? "," : "";
            }

            lines.push(line);
        }

        return lines.join("\n");
    }

    _findLongestRowLength () {
        return this.rows.reduce((longest, row) => {
            const exportableCellCount = Array.from(row.children).filter(cell => !cell.classList.contains("no-export")).length;

            return exportableCellCount > longest ? exportableCellCount : longest}, 0);

    }

    static parseCell (tableCell) {
        let parsedValue = tableCell.textContent;
        // Replace all double quotes with two double quotes
        parsedValue = parsedValue.replace(/"/g, '""');

        // If value contains comma, new-line or double quotes, enclose in double quotes
        parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

        return parsedValue
    }
}