import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const auth = getAuth();

        login.addEventListener('click', (e)=>{

            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            alert('user loged in!');

                            window.location.href='index.html';

                            // set(ref(database, 'User/' + user.uid, {
                            //     username:username,
                            //     email:email
                            // }))
                            // ...
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;

                            alert(errorMessage);
                        });

        })
