const input = document.getElementById("input-file");
const container = document.getElementById("handsontable-container");

let hot = null;

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  Papa.parse(file, {
    complete: function (results) {
      let data = results.data;

      // remove empty last row
      if (data.length && data[data.length - 1].every(c => c === "")) {
        data.pop();
      }

      if (hot) hot.destroy();

      hot = new Handsontable(container, {
        data: data,

        rowHeaders: true,
        colHeaders: true,

        // 🔒 FREEZE FIRST TWO ROWS (metadata + real header)
        fixedRowsTop: 2,

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
