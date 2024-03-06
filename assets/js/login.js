import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function submitForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();

    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('Login successful!', user);
            // Redirect or perform actions after successful login
            alert('Login successful!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorMessage);
            alert('Login failed. Please check your credentials.');
        });
}
