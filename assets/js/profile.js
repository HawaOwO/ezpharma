// Import the Firebase functions you need
import { getDatabase, ref, get, push, child, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Get a reference to the database
const database = getDatabase();

// Reference to the "User" node in your database
const medicationRef = ref(database, 'Medication');

// Function to populate the table with user data
function populateMedicationData(snapshot) {
    // Clear existing table rows
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    // Loop through each user
    snapshot.forEach((medSnapshot) => {
        const med = medSnapshot.val();
        const newRow = document.createElement('tr');
        // Combine day, month, and year in one line
        const date = `${med.day} ${med.month} ${med.year}`;
        newRow.innerHTML = `
            <td>${med.name}</td>
            <td>${med.details}</td>
            <td>${med.quantity}</td>
            <td>${med.type}</td>
            <td>${date}</td>
            
        `;
        tbody.appendChild(newRow);
    });
}

// // Retrieve data once and populate the table
get(medicationRef).then((snapshot) => {
    populateMedicationData(snapshot);
}).catch((error) => {
    console.error("Error getting data:", error);
});

