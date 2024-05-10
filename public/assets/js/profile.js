// Import the Firebase functions you need
// Import the Firebase functions you need
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
        apiKey: "AIzaSyCrAH8oV-uyEdlWH3uNRgWhRh8Pjler4fk",
        authDomain: "dentalpro-2a34a.firebaseapp.com",
        databaseURL: "https://dentalpro-2a34a-default-rtdb.firebaseio.com",
        projectId: "dentalpro-2a34a",
        storageBucket: "dentalpro-2a34a.appspot.com",
        messagingSenderId: "365392282595",
        appId: "1:365392282595:web:9af6ec80ca1545a61616d6",
        measurementId: "G-TVTLCXW8WE"
      
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Get the currently logged-in user's UID
/* This block of code is checking if there is a currently signed-in user. */
const user = auth.currentUser;
if (user) {
    const uid = user.uid;
    // Call the function to display the user profile information
    displayUserProfile(uid);
} else {
    console.log("No user is signed in.");
}

// Function to display user profile information
function displayUserProfile(uid) {
    const userRef = ref(database, `User/${uid}`);

    // Retrieve user data from the database
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const user = snapshot.val();
            // Display user profile information
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
            // Additional fields can be added as needed
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error("Error getting user data:", error);
    });
}


