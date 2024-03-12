// Import the Firebase functions you need
import { getDatabase, ref, get, push, } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Get a reference to the database
const database = getDatabase();

// Reference to the "User" node in your database
const recordRef = ref(database, 'Record');

// Function to populate the table with user data
function populateRecordData(snapshot) {
    // Clear existing table rows
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    // Loop through each user
    snapshot.forEach((recordSnapshot) => {
        const record = recordSnapshot.val();
        const newRow = document.createElement('tr');
        // Combine day, month, and year in one line
        
        newRow.innerHTML = `
            <td>${record.name}</td>
            <td>${record.quantityR}</td>
            <td>${record.date}</td>
            
            
        `;
        tbody.appendChild(newRow);
    });
}

// Retrieve data once and populate the table
get(recordRef).then((snapshot) => {
    populateRecordData(snapshot);
}).catch((error) => {
    console.error("Error getting data:", error);
});

