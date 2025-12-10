const input = document.getElementById("input-file");
const container = document.getElementById("handsontable-container");

let hot = null;

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  Papa.parse(file, {
    complete: function (results) {
      const data = results.data;

      // Remove empty last row
      if (data.length > 0 && data[data.length - 1].every(v => v === "")) {
        data.pop();
      }

      // Destroy old table
      if (hot) hot.destroy();

      // CREATE TABLE WITH FILTERS + SORT + UNDO/REDO
      hot = new Handsontable(container, {
        data: data,
        rowHeaders: true,
        colHeaders: true,
        height: "auto",
        width: "100%",
        stretchH: "all",
        manualColumnResize: true,
        manualRowResize: true,

        // Enable Plugins
        dropdownMenu: true,
        filters: true,
        columnSorting: true,
        undo: true,       // ← Added
        redo: true,       // ← Added

        licenseKey: "non-commercial-and-evaluation"
      });
    }
  });
});
