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
      // Replace this object with your Firebase project configuration
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to load data from Firestore
async function loadFromFirestore() {
    const querySnapshot = await db.collection('dataTableData').orderBy('timestamp').get();
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
    await db.collection('dataTableData').add({
        title,
        category,
        description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
});

// Load data from Firestore on page load
loadFromFirestore();
