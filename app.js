import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import { auth } from "./config.js";
const googleButton = document.querySelector('.googleButton');
const provider = new GoogleAuthProvider();
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');


form.addEventListener('submit', function (event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user:", user);
            alert(`Login Successfull`);
            window.location = 'home.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
})


googleButton.addEventListener('click',()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("🚀 ~ .then ~ user:", user);
      window.location = 'home.html';
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(credential);
    });
})