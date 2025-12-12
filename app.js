const input = document.getElementById("input-file");
const container = document.getElementById("handsontable-container");

let hot = null;

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  Papa.parse(file, {
    skipEmptyLines: true,
    complete: function (results) {
      let data = results.data;

      if (!data || data.length < 2) return;

      // ✅ Use FIRST row as column headers
      const headers = data[0];

      // ✅ Remove header row from data
      data = data.slice(1);

      // Destroy old table
      if (hot) hot.destroy();

      hot = new Handsontable(container, {
        data: data,

        // ✅ Use real CSV headers
        colHeaders: headers,
        rowHeaders: true,

        // ✅ Freeze real header row
        fixedRowsTop: 0,

        width: "100%",
        height: "auto",
        stretchH: "all",

        manualColumnResize: true,
        manualRowResize: true,

        dropdownMenu: true,
        filters: true,
        columnSorting: true,

        undo: true,
        redo: true,

        licenseKey: "non-commercial-and-evaluation"
      });
    }
  });
});
