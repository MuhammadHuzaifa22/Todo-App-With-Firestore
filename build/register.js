import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";

const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      let userRegisteredName = userName.value;
      localStorage.setItem('user-registered-name', JSON.stringify(userRegisteredName));
      let userRegiteredEmail = email.value;
      localStorage.setItem('user-registered-email', JSON.stringify(userRegiteredEmail));
      window.location = 'index.html';
      alert('You are registered');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });

})

