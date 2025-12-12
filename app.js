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

      // Destroy old table if exists
      if (hot) hot.destroy();

      // CREATE HANDSONTABLE WITH FULL FEATURES
      hot = new Handsontable(container, {
        data: data,
        rowHeaders: true,
        colHeaders: true,
        height: "auto",
        width: "100%",
        stretchH: "all",

        // Resize controls
        manualColumnResize: true,
        manualRowResize: true,

        // UI Plugins
        dropdownMenu: true,
        filters: true,
        columnSorting: true,
        search: true,          // Search plugin enabled

        // Undo / Redo
        undo: true,
        redo: true,

        // Required license key
        licenseKey: "non-commercial-and-evaluation"
      });
    }
  });
});
