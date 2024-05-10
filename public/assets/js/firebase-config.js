// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
