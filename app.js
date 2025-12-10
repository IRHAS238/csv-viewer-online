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

      // Destroy previous table
      if (hot) hot.destroy();

      // Create Handsontable instance
      hot = new Handsontable(container, {
        data: data,

        // Visual
        rowHeaders: true,
        colHeaders: true,
        fixedRowsTop: 1,          // ← FREEZE HEADER ROW
        height: "auto",
        width: "100%",
        stretchH: "all",

        // Interaction
        manualColumnResize: true,
        manualRowResize: true,

        // Plugins
        dropdownMenu: true,
        filters: true,
        columnSorting: true,
        search: true,
        undo: true,
        redo: true,

        // License
        licenseKey: "non-commercial-and-evaluation"
      });
    }
  }
