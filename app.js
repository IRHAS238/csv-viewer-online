const input = document.getElementById("input-file");
const container = document.getElementById("handsontable-container");
const placeholder = document.getElementById("placeholder-table");

let hot = null;

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  Papa.parse(file, {
    skipEmptyLines: true,
    complete: function (results) {
      let data = results.data;

      if (!data || data.length < 2) return;

      // ✅ Hide placeholder after upload
      placeholder.style.display = "none";

      // ✅ First row becomes headers
      const headers = data[0];
      data = data.slice(1);

      // Remove empty last row if exists
      if (data.length > 0 && data[data.length - 1].every(v => v === "")) {
        data.pop();
      }

      if (hot) hot.destroy();

      hot = new Handsontable(container, {
        data: data,
        colHeaders: headers,         // ✅ Real CSV headers
        rowHeaders: index => index + 1, // ✅ Row numbers 1,2,3...

        width: "100%",
        height: 600,
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
