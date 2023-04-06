document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const table = document.getElementById('dataTable');
    const row = table.insertRow(-1);

    const cell1 = row.insertCell(0);
    cell1.textContent = title;

    const cell2 = row.insertCell(1);
    cell2.textContent = category;

    const cell3 = row.insertCell(2);
    cell3.textContent = description;

    // Clear form fields after submission
    document.getElementById('title').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
});
