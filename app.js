// Get the HTML elements
const inputFile = document.getElementById('input-file');
const container = document.getElementById('handsontable-container');

let hotInstance = null;

// When user selects a CSV file
inputFile.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  // Use PapaParse to read the CSV
  Papa.parse(file, {
    complete: function (results) {
      const data = results.data;

      // Remove empty last row if needed
      if (data.length > 0 && data[data.length - 1].every(cell => cell === "")) {
        data.pop();
      }

      // If table already exists, destroy it
      if (hotInstance) {
        hotInstance.destroy();
      }

      // Create Handsontable instance
      hotInstance = new Handsontable(container, {
        data: data,
        rowHeaders: true,
        colHeaders: true,
        licenseKey: 'non-commercial-and-evaluation', // required for Handsontable CE
        stretchH: 'all',
        width: '100%',
        height: 'auto',
        manualColumnResize: true,
        manualRowResize: true
      });
    },
    error: function (err) {
      alert('Error reading file: ' + err.message);
    }
  });
});
