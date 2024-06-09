// Import the Firebase functions you need
import { getDatabase, ref, get, push, child, orderByChild, equalTo, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

//const auth = getAuth();
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
        if (med.quantity <21) {
            newRow.style.backgroundColor = '#fff7df';
            newRow.classList.add('highlight-row'); // Yellow background 
        } 
        newRow.innerHTML = `
            <td>${med.name}</td>
            <td>${med.details}</td>
            <td>${med.quantity}</td>
            <td>${med.type}</td>
            <td>${date}</td>
            <td><button class="edit-button" data-key="${medSnapshot.key}">Edit</button></td>
            <td><button class="delete-button" data-key="${medSnapshot.key}"  style="background-color: red; color: white;">Delete</button></td>
    
        `;
        tbody.appendChild(newRow);
    });
}

// Function to delete a medication
function deleteMedication(medKey) {
    if (confirm("Are you sure you want to delete this medication?")) {
        // Remove the medication from the database
        remove(ref(database, `Medication/${medKey}`)).then(() => {
            // Medication deleted successfully
            alert("Medication deleted successfully");
            refreshMedicationData();
        }).catch((error) => {
            // Error occurred while deleting medication
            console.error("Error deleting medication:", error);
            alert("Error deleting medication. Please try again later.");
        });
    }
}

// Function to populate the form fields with existing medication data for editing
function editMedication(medKey) {
    // Get a reference to the medication node in the database
    const medRef = ref(database, `Medication/${medKey}`);

    // Fetch the medication data from the database
    get(medRef).then((snapshot) => {
        // Get the medication data
        const medication = snapshot.val();

        // Populate the form fields with existing medication data for editing
        document.getElementById('medName').value = medication.name;
        document.getElementById('medDescription').value = medication.details;
        document.getElementById('medQuantity').value = medication.quantity;
        document.getElementById('medType').value = medication.type;
        document.getElementById('medDay').value = medication.day;
        document.getElementById('medMonth').value = medication.month;
        document.getElementById('medYear').value = medication.year;

        // Store the medication key in a hidden input field
        document.getElementById('medKey').value = medKey;

        // Open the modal for editing
        openModal();
        refreshMedicationData();
    }).catch((error) => {
        // Error occurred while fetching medication data
        console.error("Error fetching medication data:", error);
        alert("Error fetching medication data. Please try again later.");
    });
}

function refreshMedicationData() {
    // Retrieve data once and populate the table
    get(medicationRef).then((snapshot) => {
        populateMedicationData(snapshot);
    }).catch((error) => {
        console.error("Error getting data:", error);
    });
}

// Retrieve data once and populate the table
refreshMedicationData();
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

// Dynamically attach click event listeners to edit buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        const medKey = event.target.dataset.key;
        editMedication(medKey);
    }
});

// Dynamically attach click event listeners to delete buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const medKey = event.target.dataset.key;
        deleteMedication(medKey);
    }
});



document.getElementById('cancelButton').addEventListener('click', closeModal);

