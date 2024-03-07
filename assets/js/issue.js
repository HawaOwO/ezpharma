// Import the Firebase functions you need
import { getDatabase, ref, get, push, } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Get a reference to the database
const database = getDatabase();

// Reference to the "User" node in your database
const issueRef = ref(database, 'Issue');

// Function to open the modal
function openModal() {
    const modal = document.getElementById('addIssueModal');
    modal.style.display = 'block';

    // // Clear the form when opening the modal
    // document.getElementById('addUserForm').reset();
}
// Function to close the modal
function closeModal() {
    const modal = document.getElementById('addIssueModal');
    modal.style.display = 'none';
}

// Function to populate the table with user data
function populateIssueData(snapshot) {
    // Clear existing table rows
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    // Loop through each user
    snapshot.forEach((issueSnapshot) => {
        const issue = issueSnapshot.val();
        const newRow = document.createElement('tr');
        // Combine day, month, and year in one line
        const date = `${issue.day} ${issue.month} ${issue.year}`;
        newRow.innerHTML = `
            <td>${issue.name}</td>
            <td>${issue.description}</td>
            <td>${issue.username}</td>
            <td>${issue.status}</td>
            <td>${date}</td>
            
        `;
        tbody.appendChild(newRow);
    });
}

// Retrieve data once and populate the table
get(issueRef).then((snapshot) => {
    populateIssueData(snapshot);
}).catch((error) => {
    console.error("Error getting data:", error);
});


// // Function to add a new user
// function addNewUser() {
//     const newFirstName = document.getElementById('newFirstName').value;
//     const newLastName = document.getElementById('newLastName').value;
//     const newEmail = document.getElementById('newEmail').value;
//     const newPassword = document.getElementById('newPassword').value;

//     // Add the new user to the Realtime Database
//     // (You should also add proper error handling and validation)
//     const newUserRef = push(ref(database, 'User'));
//     set(newUserRef, {
//         firstName: newFirstName,
//         lastName: newLastName,
//         email: newEmail,
//         phone: '', // Add more fields if needed
//         role: 'user' // Default role, update as needed
//     });

//     // Add the new user to Firebase Authentication
//     // (You should also add proper error handling and validation)
//     createUserWithEmailAndPassword(auth, newEmail, newPassword)
//         .then((userCredential) => {
//             closeModal();
//             alert('User added successfully!');
//         })
//         .catch((error) => {
//             console.error('Error adding user:', error.message);
//             alert('Error adding user. Please check your input and try again.');
//         });
// }
