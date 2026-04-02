function downloadCSV(lines, filename) {
    const csvOutput = lines.join("\r\n");

    //blob is container for random data
    //here creating blob of CSV
    const csvBlob = new Blob([csvOutput], {type: "text/csv"});
    const blobUrl = URL.createObjectURL(csvBlob);

    const anchorElement = document.createElement("a");

    anchorElement.href = blobUrl;
    anchorElement.download = filename;
    anchorElement.click();

    //tells browser to forget about reference to blob
    //reducing memory usage!
    setTimeout(() => URL.revokeObjectURL(blobUrl), 500);
}