// Import the Firebase functions you need
import { getDatabase, ref, get, push, remove, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
        if (issue.status === 'UNSOLVED') {
            newRow.style.backgroundColor = '#FFA5BD';
            newRow.classList.add('highlight-row'); // Yellow background for Admin
        }
        else{
            newRow.style.backgroundColor='#A2E8ED';
            newRow.classList.add('highlight-row');
        } 
        
        newRow.innerHTML = `
            <td>${issue.name}</td>
            <td>${issue.description}</td>
            <td>${issue.username}</td>
            <td>${issue.status}</td>
            <td>${date}</td>
            <td><button class="edit-button" data-key="${issueSnapshot.key}">Solve</button></td>
            <td><button class="delete-button" data-key="${issueSnapshot.key}"  style="background-color: red; color: white;">Delete</button></td>
            
        `;
        tbody.appendChild(newRow);
    });
}
            // <td><button class="edit-button" data-key="${issueSnapshot.key}">Edit</button></td>

function deleteIssue(issueKey) {
    if (confirm("Are you sure you want to delete this issue?")) {
        // Remove the issue from the database
        remove(ref(database, `Issue/${issueKey}`)).then(() => {
            // Issue deleted successfully
            alert("Issue deleted successfully");
            refreshIssueData();
        }).catch((error) => {
            // Error occurred while deleting 
            console.error("Error deleting issue:", error);
        });
    }
}

// Function to populate the form fields with existing medication data for editing
function editIssue(issueKey) {
    // Get a reference to the medication node in the database
    const issueRef = ref(database, `Issue/${issueKey}`);

    // Fetch the medication data from the database
    get(issueRef).then((snapshot) => {
        // Get the medication data
        const issue = snapshot.val();
        console.log("Issue data:", issue);
        console.log("Snapshot:", snapshot.val());

        // Populate the form fields with existing medication data for editing
        document.getElementById('issueName').value = issue.name;
        document.getElementById('issueUsername').value = issue.username;
        document.getElementById('issueDescription').value = issue.description;
        document.getElementById('issueStatus').value = issue.status;
        document.getElementById('issueDay').value = issue.day;
        document.getElementById('issueMonth').value = issue.month;
        document.getElementById('issueYear').value = issue.year;

        // Store the medication key in a hidden input field
        document.getElementById('issueKey').value = issueKey;

        // Open the modal for editing
        openModal();
    }).catch((error) => {
        // Error occurred while fetching medication data
        console.error("Error fetching issue data:", error);
    });
}

function solveIssue(issueKey) {
    const issueRef = ref(database, `Issue/${issueKey}`);
    update(issueRef, { status: 'SOLVED' }).then(() => {
        // Status updated successfully
        alert("Issue status updated to SOLVED");
        // Refresh the table data
        refreshIssueData();
    }).catch((error) => {
        // Error occurred while updating
        console.error("Error updating issue:", error);
    });
}

function refreshIssueData() {
    // Retrieve data once and populate the table
    get(issueRef).then((snapshot) => {
        populateIssueData(snapshot);
    }).catch((error) => {
        console.error("Error getting data:", error);
    });
}

// Retrieve data once and populate the table
refreshIssueData();

// Retrieve data once and populate the table
get(issueRef).then((snapshot) => {
    populateIssueData(snapshot);
}).catch((error) => {
    console.error("Error getting data:", error);
});


// Attach an event listener to the "Add Medication" button// Wait for the DOM to fully load before adding the event listener
document.addEventListener('DOMContentLoaded', function () {
    // Function to open the modal
    function openModal() {
        const modal = document.getElementById('addIssueModal');
        modal.style.display = 'block';
    }

    // Attach an event listener to the "Add Medication" button
    document.querySelector('.btn').addEventListener('click', function () {
        openModal();
        // Adding a click event for the button within this function
        // Adding a click event for the "Add Medication" button within this function
        document.getElementById('addIssueForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting

            // Validate and handle the form submission here
            addNewMedication();
    });
});
});
// Dynamically attach click event listeners to edit buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        const issueKey = event.target.dataset.key;
        solveIssue(issueKey);
    }
});

// Dynamically attach click event listeners to delete buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const issueKey = event.target.dataset.key;
        deleteIssue(issueKey);
    }
});

document.getElementById('cancelButton').addEventListener('click', closeModal);

