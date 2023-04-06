// filter.js
function filterTable(columnIndex, filterInputId) {
    const filter = document.getElementById(filterInputId).value.toUpperCase();
    const table = document.getElementById("dataTable");
    const rows = table.getElementsByTagName("tr");
  
    for (let i = 1; i < rows.length; i++) {
      const cell = rows[i].getElementsByTagName("td")[columnIndex];
      if (cell) {
        const cellText = cell.textContent || cell.innerText;
        if (cellText.toUpperCase().indexOf(filter) > -1) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  }
  
  document.getElementById("titleFilter").addEventListener("keyup", () => filterTable(0, "titleFilter"));
  document.getElementById("categoryFilter").addEventListener("keyup", () => filterTable(1, "categoryFilter"));
  document.getElementById("descriptionFilter").addEventListener("keyup", () => filterTable(2, "descriptionFilter"));
  