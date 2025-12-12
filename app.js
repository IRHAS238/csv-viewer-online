hot = new Handsontable(container, {
  data: data,

  rowHeaders: true,
  colHeaders: true,

  fixedRowsTop: 2, // ✅ FREEZE first + second row

  height: "auto",
  width: "100%",
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
