// Import the Firebase functions you need
import { getDatabase, ref, get, push,remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Get a reference to the database
const database = getDatabase();

// Reference to the "User" node in your database
const usersRef = ref(database, 'User');

// Function to open the modal
function openModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'block';
}
// Function to close the modal
function closeModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'none';
}

// Function to populate the table with user data
function populateUserData(snapshot) {
    // Clear existing table rows
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    // Loop through each user
    snapshot.forEach((userSnapshot) => {
        const user = userSnapshot.val();
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.role}</td>
            <td><button class="delete-button" data-key="${userSnapshot.key}"  style="background-color: red; color: white;">Delete</button></td>

        `;
        tbody.appendChild(newRow);
    });
}

function deleteUser(userKey) {
    if (confirm("Are you sure you want to delete this user?")) {
        // Remove the medication from the database
        remove(ref(database, `User/${userKey}`)).then(() => {
            // Medication deleted successfully
            alert("User deleted successfully");
        }).catch((error) => {
            // Error occurred while deleting medication
            console.error("Error deleting user:", error);
            alert("Error deleting medication. Please try again later.");
        });
    }
}

// Retrieve data once and populate the table
get(usersRef).then((snapshot) => {
    populateUserData(snapshot);
}).catch((error) => {
    console.error("Error getting data:", error);
});

// Attach an event listener to the "Add Medication" button// Wait for the DOM to fully load before adding the event listener
document.addEventListener('DOMContentLoaded', function () {
    // Function to open the modal
    function openModal() {
        const modal = document.getElementById('addUserModal');
        modal.style.display = 'block';
    }

    // Attach an event listener to the "Add Medication" button
    document.querySelector('.btn').addEventListener('click', function () {
        openModal();
        // Adding a click event for the button within this function
        // Adding a click event for the "Add Medication" button within this function
        document.getElementById('addUserForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting

            // Validate and handle the form submission here
            addNewUser();
    });

});
});

// Dynamically attach click event listeners to delete buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const userKey = event.target.dataset.key;
        deleteUser(userKey);
    }
});


document.getElementById('cancelButton').addEventListener('click', closeModal);