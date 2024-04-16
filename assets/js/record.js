// Import the Firebase functions you need
import { getDatabase, ref, get, push, } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Get a reference to the database
const database = getDatabase();

// Reference to the "User" node in your database
const recordRef = ref(database, 'Record');
const medicationRef = ref(database, 'Medication');


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

// Function to populate the third card with medication names
function populateLowStockMedications() {
    // Get the div where the medication names will be displayed
    const outOfStockDiv = document.querySelector('.out.of.stock');

    // Clear existing content
    outOfStockDiv.innerHTML = '';

    // Fetch data from the database and update the cards accordingly
    get(medicationRef).then((snapshot) => {
        // Loop through each medication to count low stock items
        snapshot.forEach((medSnapshot) => {
            const medication = medSnapshot.val();
            if (medication.quantity < 20) {
                // Create a div element for each medication name
                const medicationNameDiv = document.createElement('div');
                medicationNameDiv.textContent = medication.name;
                // Append the medication name div to the outOfStockDiv
                outOfStockDiv.appendChild(medicationNameDiv);
            }
        });
    }).catch((error) => {
        console.error("Error getting medication data:", error);
    });
}


// Call the function to populate the third card when the page loads
document.addEventListener('DOMContentLoaded', populateLowStockMedications);

function updateCardNumbers() {
    // Get today's date
    const today = new Date().toLocaleDateString();

    // Fetch data from the database and update the cards accordingly
    get(recordRef).then((snapshot) => {
        let dailyUseCount = 0;
        let medTodayQuantity = 0;

        // Loop through each record
        snapshot.forEach((childSnapshot) => {
            const record = childSnapshot.val();
            // Check if the record date matches today's date
            if (record.date === today) {
                dailyUseCount++; // Increment daily use count if the date matches today
                medTodayQuantity += record.quantityR; // Add quantityR to medTodayQuantity for records with today's date
            }
        });

        // Update the number of daily uses
        document.querySelector('.numbers.record-today').innerText = dailyUseCount;
        // Update the number of medications used today
        document.querySelector('.numbers.med-today').innerText = medTodayQuantity;
    }).catch((error) => {
        console.error("Error updating card numbers:", error);
    });
}

// Call the function to update card numbers when the page loads
document.addEventListener('DOMContentLoaded', updateCardNumbers);


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

