// Import Firebase modules using version 9 syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

// Initialize Firebase and Firestore

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOmvWrerUzWrxHA6sJZRbnueG0SMBDu88",
    authDomain: "notocode-db4ef.firebaseapp.com",
    projectId: "notocode-db4ef",
    storageBucket: "notocode-db4ef.appspot.com",
    messagingSenderId: "698861799572",
    appId: "1:698861799572:web:5d12e14fdb057fe0b90c81",
    measurementId: "G-P6HQBP84L4"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to load data from Firestore
async function loadFromFirestore() {
    const dataTableData = collection(db, 'dataTableData');
    const dataTableDataQuery = query(dataTableData, orderBy('timestamp'));
    const querySnapshot = await getDocs(dataTableDataQuery);
    
    const table = document.getElementById('dataTable');
    querySnapshot.forEach(doc => {
        const rowData = doc.data();
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        cell1.textContent = rowData.title;
        const cell2 = row.insertCell(1);
        cell2.textContent = rowData.category;
        const cell3 = row.insertCell(2);
        cell3.textContent = rowData.description;
    });
}

document.getElementById('postForm').addEventListener('submit', async function (event) {
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

    // Save data to Firestore
    await addDoc(collection(db, 'dataTableData'), {
        title,
        category,
        description,
        timestamp: serverTimestamp(),
    });
});

// Load data from Firestore on page load
loadFromFirestore();

// Add the filterTable function
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






