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
// function populateLowStockMedications() {
//     // Get the div where the medication names will be displayed
//     const outOfStockDiv = document.querySelector('.out.of.stock');

//     // Clear existing content
//     outOfStockDiv.innerHTML = '';

//     // Fetch data from the database and update the cards accordingly
//     get(medicationRef).then((snapshot) => {
//         // Loop through each medication to count low stock items
//         snapshot.forEach((medSnapshot) => {
//             const medication = medSnapshot.val();
//             if (medication.quantity < 20) {
//                 // Create a div element for each medication name
//                 const medicationNameDiv = document.createElement('div');
//                 medicationNameDiv.textContent = medication.name;
//                 // Append the medication name div to the outOfStockDiv
//                 outOfStockDiv.appendChild(medicationNameDiv);
//             }
//         });
//     }).catch((error) => {
//         console.error("Error getting medication data:", error);
//     });
// }

// Function to populate the third card with medication names
function populateLowStockMedications() {
    // Get the tbody element of the table for low stock medications
    const tbody = document.querySelector('.lowStockMedications');

    // Clear existing table rows
    tbody.innerHTML = '';

    // Fetch data from the database and update the table accordingly
    get(medicationRef).then((snapshot) => {
        // Loop through each medication to check for low stock items
        snapshot.forEach((medSnapshot) => {
            const medication = medSnapshot.val();
            if (medication.quantity < 20) {
                // Create a new table row for each medication
                const newRow = document.createElement('tr');
                // Populate the table row with medication data
                newRow.innerHTML = `
                    <td>${medication.name}</td>
                    <td>${medication.quantity}</td>
                    <td>${medication.type}</td>
                `;
                // Append the new row to the table body
                tbody.appendChild(newRow);
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

    get(medicationRef).then((snapshot) => {
        let medOutOfStock=0;
        // Loop through each medication to count low stock items
        snapshot.forEach((medSnapshot) => {
            const medication = medSnapshot.val();
            if (medication.quantity < 20) {
                medOutOfStock++;
            }
        });
        document.querySelector('.numbers.out-of-stock').innerText = medOutOfStock;
    }).catch((error) => {
        console.error("Error getting medication data:", error);
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
// const downloadReportBtn = document.getElementById('downloadReportBtn');

// // Add event listener to the button
// downloadReportBtn.addEventListener('click', () => {
//     // Initialize jsPDF
//     const doc = new jsPDF();

//     // Add the table content to the PDF
//     doc.autoTable({ html: 'table' });

//     // Save the PDF
//     doc.save('report.pdf');
// });
document.addEventListener('DOMContentLoaded', function () {
    const downloadButton = document.getElementById('downloadReportBtn');
    
    downloadButton.addEventListener('click', function () {
        // const element = document.body; // Choose the element you want to save as PDF, in this case, the entire body
        
        // html2pdf()
        //     .from(element)
        //     .save();
        window.print();
      /* This code snippet is setting up functionality to generate a PDF report from the content of the
      entire HTML body. Here's a breakdown of what it does: */
        // const element = document.body; // Choose the element you want to save as PDF, in this case, the entire body
        
        // const currentDate = new Date();
        // const fileName = `Report_${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}_${currentDate.getHours().toString().padStart(2, '0')}-${currentDate.getMinutes().toString().padStart(2, '0')}-${currentDate.getSeconds().toString().padStart(2, '0')}.pdf`;

        // html2pdf()
        //     .from(element)
        //     .set({
        //         filename: fileName
        //     })
        //     .save();
    });
});


// Retrieve data once and populate the table
get(recordRef).then((snapshot) => {
    populateRecordData(snapshot);
}).catch((error) => {
    console.error("Error getting data:", error);
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize flatpickr for start date input
    flatpickr("#startDate", {
        dateFormat: "Y-m-d", // Format the date as yyyy-mm-dd
    });

    // Initialize flatpickr for end date input
    flatpickr("#endDate", {
        dateFormat: "Y-m-d", // Format the date as yyyy-mm-dd
    });

    const outputResult = document.getElementById('outputResultMostUsed');

    // Function to handle logic and display output
    function handleDateSelection() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        // Example logic: Display selected dates
         outputResult.textContent = `Start Date: ${startDate}, End Date: ${endDate}`;

        // Retrieve data from Firebase between selected dates
        get(recordRef).then((snapshot) => {
            // Initialize an object to store medicine quantities
            const medicineQuantities = {};

            // Loop through each record
            snapshot.forEach((childSnapshot) => {
                const record = childSnapshot.val();
                // Parse the record date to get the date
                const recordDate = new Date(record.date);
                const recordDateStr = recordDate.toISOString().split('T')[0]; // Get the date in yyyy-mm-dd format

                // Check if the record date is within the selected range
                if (recordDateStr >= startDate && recordDateStr <= endDate) {
                    // Increment the quantity for the corresponding medicine
                    if (record.name in medicineQuantities) {
                        medicineQuantities[record.name] += record.quantityR;
                    } else {
                        medicineQuantities[record.name] = record.quantityR;
                    }
                }
            });

            // Find the medicine with the highest quantity
            let mostPopularMedicine = '';
            let maxQuantity = 0;
            for (const medicine in medicineQuantities) {
                if (medicineQuantities[medicine] > maxQuantity) {
                    mostPopularMedicine = medicine;
                    maxQuantity = medicineQuantities[medicine];
                }
            }

            // Display the most popular medicine
            if (mostPopularMedicine !== '') {
                outputResult.innerHTML += `<br>Most Popular Medicine: ${mostPopularMedicine}`;
            } else {
                outputResult.innerHTML += `<br>No records found between selected dates`;
            }
        }).catch((error) => {
            console.error("Error getting data:", error);
        });
    }

    // Event listener for start date input
    document.getElementById('startDate').addEventListener('change', handleDateSelection);

    // Event listener for end date input
    document.getElementById('endDate').addEventListener('change', handleDateSelection);

});
document.addEventListener('DOMContentLoaded', function () {
    // Initialize flatpickr for start date input
    flatpickr("#forecastStartDate", {
        dateFormat: "Y-m-d", // Format the date as yyyy-mm-dd
    });

    // Initialize flatpickr for end date input
    flatpickr("#forecastEndDate", {
        dateFormat: "Y-m-d", // Format the date as yyyy-mm-dd
    });

    const outputForecast = document.getElementById('outputResultForecast');
    // Function to handle logic and display forecast output
    function handleForecast() {
        const startDate = document.getElementById('forecastStartDate').value;
        const endDate = document.getElementById('forecastEndDate').value;
        const startMonth = new Date(startDate).getMonth() + 1; // +1 because getMonth() returns zero-based month in
        const endMonth = new Date(endDate).getMonth() + 1; 
        outputForecast.innerHTML = ''; // Clear existing content
    
        // Define the list of illnesses for each month
        const illnessesByMonth = {
            1: ['flu season', 'influenza', 'Avian influenza', 'Chikungunya', 'Dengue fever', 'meningococcal disease'],
            2: ['flu season', 'influenza', 'Chikungunya', 'Cutaneous leishmaniasis', 'lassa fever', 'legionellosis'],
            3: ['varicella', 'Chagas disease', 'Chickenpox', 'lassa fever', 'legionellosis', 'meningococcal disease', 'measles'],
            4: ['varicella', 'Chagas disease', 'Chickenpox', 'lassa fever', 'leptospirosis', 'meningococcal disease'],
            5: ['gonorrhea', 'influenza', 'Chagas disease', 'Chickenpox', 'lassa fever', 'leptospirosis', 'measles'],
            6: ['gonorrhea', 'influenza', 'Chagas disease', 'Chikungunya', 'lassa fever', 'leptospirosis', 'lyme disease', 'lymphatic filariasis', 'hepatitis c'],
            7: ['gonorrhea', 'RSV', 'influenza', 'Chagas disease', 'legionellosis', 'lyme disease', 'lymphatic filariasis', 'hepatitis c', 'measles'],
            8: ['polio', 'Chagas disease', 'legionellosis', 'lyme disease', 'pertussis'],
            9: ['polio'],
            10: ['flu vaccination', 'RSV', 'Japanese encephalitis (JE)', 'Cryptosporidium', 'Cutaneous leishmaniasis', 'meningococcal disease', 'measles'],
            11: ['flu vaccination', 'RSV', 'influenza', 'Japanese encephalitis (JE)', 'Chikungunya', 'Cryptosporidium', 'Cutaneous leishmaniasis', 'Dengue fever', 'lymphatic filariasis'],
            12: ['flu', 'RSV', 'influenza', 'Japanese encephalitis (JE)', 'Avian influenza', 'Chikungunya', 'Cutaneous leishmaniasis', 'Dengue fever', 'lymphatic filariasis', 'measles']
        };
    
        // Set to keep track of displayed illnesses
        const displayedIllnesses = new Set();
         // Check if there are any months between startMonth and endMonth
       // Check if there are any months between startMonth and endMonth
       for (let month = startMonth; month <= endMonth; month++) {
        if (illnessesByMonth[month]) {
            illnessesByMonth[month].forEach(illness => {
                // Check if the illness has not been displayed yet
                if (!displayedIllnesses.has(illness)) {
                    const illnessElement = document.createElement('div');
                    illnessElement.innerHTML = `<h3>${illness}</h3>`;
                    outputForecast.appendChild(illnessElement);
                    // Add the illness to the set of displayed illnesses
                    displayedIllnesses.add(illness);
                }
            });
        }
    }
        // If no illnesses found, display a message
        if (outputForecast.innerHTML === '') {
            outputForecast.textContent = 'No illnesses found for the selected period.';
        }
    }
        
    // Event listener for start date input
    document.getElementById('forecastStartDate').addEventListener('change', handleForecast);
    
    // Event listener for end date input
    document.getElementById('forecastEndDate').addEventListener('change', handleForecast);
    

});
