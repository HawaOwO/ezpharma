import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref, child, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

login.addEventListener('click', async (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch the user's role from the database
        const userDataRef = ref(database, `User/${user.uid}`);
        const userDataSnapshot = await get(userDataRef);
        const userData = userDataSnapshot.val();

        if (userData && userData.role === 'Admin') {
            // Only allow login if the user's role is 'Admin'
            alert('User logged in successfully!');
            window.location.href = 'index.html';
        } else {
            // If user's role is not 'Admin', sign them out and display an error message
            await signOut(auth);
            alert('Only users with Admin role can log in.');
        }
    } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
    }
});

        // login.addEventListener('click', (e) => {
        //     var email = document.getElementById('email').value;
        //     var password = document.getElementById('password').value;
        
        //     signInWithEmailAndPassword(auth, email, password)
        //         .then(async (userCredential) => {
        //             const user = userCredential.user;
        
        //             // Fetch the user's role from the database
        //             const userDataRef = ref(database, `User/${user.uid}`);
        //             const userDataSnapshot = await get(userDataRef);
        //             const userData = userDataSnapshot.val();
        
        //             if (userData && userData.role === 'Admin') {
        //                 // Only allow login if the user's role is 'Admin'
        //                 alert('User logged in successfully!');
        //                 window.location.href = 'index.html';
        //             } else {
        //                 // If user's role is not 'Admin', sign them out and display an error message
        //                 await signOut(auth);
        //                 alert('Only users with Admin role can log in.');
        //             }
        //         })
        //         .catch((error) => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //             alert(errorMessage);
        //         });
        // });
        
