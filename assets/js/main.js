import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, get, push, child, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const auth = getAuth();
const database = getDatabase();
// add hovered class to selected list item

let list = document.querySelectorAll(".navigation li");

// Get references to the database nodes
const recordRef = ref(database, 'Record');
const staffRef = ref(database, 'User');
const issueRef = ref(database, 'Issue');
const medicationRef = ref(database, 'Medication');

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
  // Sign out the user
  auth.signOut().then(() => {
      // Redirect the user to the login page
      window.location.href = 'login.html';
  }).catch((error) => {
      // Handle any errors that occur during sign out
      console.error('Error signing out:', error);
  });
});

// Function to update the numbers in the cards
function updateCardNumbers() {
  // Fetch data from the database and update the cards accordingly
  get(recordRef).then((snapshot) => {
    let dailyUseCount = 0;
    // Loop through each child and count them
    snapshot.forEach((childSnapshot) => {
        dailyUseCount++;
    });
    // Update the number of daily uses
    document.querySelector('.numbers.daily-use').innerText = dailyUseCount;
});

  // Fetch data from the database and update the cards accordingly
  get(medicationRef).then((snapshot) => {
      let lowStockCount = 0;
      // Loop through each medication to count low stock items
      snapshot.forEach((medSnapshot) => {
          const medication = medSnapshot.val();
          if (medication.quantity < 20) {
              lowStockCount++;
          }
      });
      // Update the number of low stock items
      document.querySelector('.numbers.low-stock').innerText = lowStockCount;
  });

  //for number of staff

  get(staffRef).then((snapshot) => {
    let staffCount = 0;
    // Loop through each child and count them
    snapshot.forEach((childSnapshot) => {
        staffCount++;
    });
    // Update the number of daily uses
    document.querySelector('.numbers.staff').innerText = staffCount;
});

//for issue

get(issueRef).then((snapshot) => {
  let issueCount = 0;
  // Loop through each child and count them
  snapshot.forEach((childSnapshot) => {
      issueCount++;
  });
  // Update the number of daily uses
  document.querySelector('.numbers.issue').innerText = issueCount;
});
  // Fetch data from the database and update the cards accordingly

}

// Call the function to update card numbers when the page loads
document.addEventListener('DOMContentLoaded', updateCardNumbers);

