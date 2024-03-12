// Import the Firebase functions you need
import { getDatabase, ref, get, push, child, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Get a reference to the database
const database = getDatabase();

// Reference to the "User" node in your database
const medicationRef = ref(database, 'Medication');

// Function to open the modal
function openModal() {
    const modal = document.getElementById('addMedModal');
    modal.style.display = 'block';
}
// Function to close the modal
function closeModal() {
    const modal = document.getElementById('addMedModal');
    modal.style.display = 'none';
}

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


// Attach an event listener to the "Add Medication" button// Wait for the DOM to fully load before adding the event listener
document.addEventListener('DOMContentLoaded', function () {
    // Function to open the modal
    function openModal() {
        const modal = document.getElementById('addMedModal');
        modal.style.display = 'block';
    }

    // Attach an event listener to the "Add Medication" button
    document.querySelector('.btn').addEventListener('click', function () {
        openModal();
        // Adding a click event for the button within this function
        // Adding a click event for the "Add Medication" button within this function
        document.getElementById('addMedForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting

            // Validate and handle the form submission here
            addNewMedication();
    });
});
});

document.getElementById('cancelButton').addEventListener('click', closeModal);

