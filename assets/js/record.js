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

// // Add event listener to the button
// downloadReportBtn.addEventListener('click', () => {
//     // Get the table content
//     const table = document.querySelector('table');
//     const tableContent = table.outerHTML;

//     // Create a Blob with the table content
//     const blob = new Blob([tableContent], { type: 'text/html' });

//     // Create a link element
//     const downloadLink = document.createElement('a');
//     downloadLink.href = URL.createObjectURL(blob);

//     // Set the file name
//     downloadLink.download = 'report.html';

//     // Append the link to the body and trigger the download
//     document.body.appendChild(downloadLink);
//     downloadLink.click();

//     // Cleanup
//     document.body.removeChild(downloadLink);
// });



// Get a reference to the download button
const downloadReportBtn = document.getElementById('downloadReportBtn');

// Add event listener to the button
downloadReportBtn.addEventListener('click', () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Add the table content to the PDF
    doc.autoTable({ html: 'table' });

    // Save the PDF
    doc.save('report.pdf');
});




// Retrieve data once and populate the table
get(recordRef).then((snapshot) => {
    populateRecordData(snapshot);
}).catch((error) => {
    console.error("Error getting data:", error);
});

