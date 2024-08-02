import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const form = document.getElementById('todo-form');
const todo = document.getElementById('todo');
const ul = document.querySelector('ul');
const arr = [];
let registeredWithEmailUserName = JSON.parse(localStorage.getItem('user-registered-name'));
let registeredWithEmailUserEmail = JSON.parse(localStorage.getItem('user-registered-email'));
console.log("🚀 ~ registeredWithEmail:", registeredWithEmailUserName)
const userWithGoogle = JSON.parse(localStorage.getItem('user-with-google'));
const signOutDetailAndbButton = document.querySelector('.sign-out-detail-and-button');
const signOutButton = document.getElementById('sign-out-button');
signOutDetailAndbButton.style.display = 'none';


signOutButton.addEventListener('click', () => {
  if (signOutDetailAndbButton.style.display === 'none') {
    signOutDetailAndbButton.style.display = 'block';
  } else {
    signOutDetailAndbButton.style.display = 'none';
  }
})

console.log("🚀 ~ userWithGoogle:", userWithGoogle);

// ., On Auth State Change Function
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("🚀 ~ onAuthStateChanged ~ uid:", uid);

  } else {
    window.location = 'index.html';
  }
});


function renderTodo() {

    let todoSplit = todo.value.split('');
    console.log("🚀 ~ todoSplit:", todoSplit)
    if (todoSplit.includes('<') || todoSplit.includes('>') || todoSplit.includes('@') || todoSplit.includes('!') || todoSplit.includes('#') || todoSplit.includes('$') || todoSplit.includes('%') || todoSplit.includes('^') || todoSplit.includes('&') || todoSplit.includes('*') || todoSplit.includes('(') || todoSplit.includes(')') || todoSplit.includes('.') || todoSplit.includes('/') || todoSplit.includes('?') || todoSplit.includes('"') || todoSplit.includes(';') || todoSplit.includes(':') || todoSplit.includes('{') || todoSplit.includes('}') || todoSplit.includes('|') || todoSplit.includes('=') || todoSplit.includes('`')) {
      alert('Input field should not contain *symbols* \n  Like < >  @ ! # $ % ^ & * ( ) - + . ` ?  / = " : ; { }');
    } else {


      let todoObj = {
        todo: `${todo.value}`
      }
      arr.push(todoObj);
      ul.innerHTML = '';
      arr.slice().reverse().map((item, index) => {
        ul.innerHTML += `<li class="todo-li">${item.todo}<div class="li-buttons"><button class="editli-button">Edit <i class="fa-solid fa-pen"></i></button><button class="deleteli-button">Delete <i class="fa-solid fa-trash"></i></button></div></li>`
        const editLiBtn = document.querySelector('.editli-button');
        editLiBtn.addEventListener('click', () => {
          alert(`This function is coming soon`);
        })
        const deleteLiBtn = document.querySelector('.deleteli-button');
        deleteLiBtn.addEventListener('click', () => {
          alert(`This function is coming soon`);
        })
      })
    }
  }

async function getData() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  renderTodo();
}
if(todo.value !== null){
  
  getData();
  
}

  
  form.addEventListener('submit', async (event) => {

  event.preventDefault();
  console.log(todo.value);
  renderTodo();
  
  try {
    if (todo.value !== '' && todo.value !== null) {
      let todoSplit = todo.value.split('');
      if (todoSplit[0] !== todoSplit[0].toLowerCase()) {
        const docRef = await addDoc(collection(db, "todos"), {
          todo: `${todo.value}`
        });
        todo.value = '';
        console.log("Document written with ID: ", docRef.id);
      }
    }

  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
})


// ., Sign Out With Email And Password
if (registeredWithEmailUserName) {
  signOutDetailAndbButton.innerHTML = `<p class="sign-out-details-section-text"><i class="fa-solid fa-signature"></i> ${registeredWithEmailUserName}</p>
  <p class="sign-out-details-section-text"><i class="fa-regular fa-envelope"></i> ${registeredWithEmailUserEmail}</p>
 <button id="sign-out-button-details-section">Sign Out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>`
  const signOutDetailsButton = document.getElementById('sign-out-button-details-section');
  signOutDetailsButton.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert(`Sign Out Successful`);
      localStorage.removeItem('user-registered-name');
      localStorage.removeItem('user-registered-email');
    }).catch((error) => {
      alert(error);
    });

  });
}




// ., Sign Out With Google
if (userWithGoogle) {
  signOutButton.src = `${userWithGoogle.photoURL}`;
  signOutDetailAndbButton.innerHTML = `<p class="sign-out-details-section-text"><i class="fa-solid fa-signature"></i> ${userWithGoogle.displayName}</p>
  <p class="sign-out-details-section-text"><i class="fa-regular fa-envelope"></i> ${userWithGoogle.email}</p>
 <button id="sign-out-button-details-section">Sign Out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>`
  const signOutDetailsButton = document.getElementById('sign-out-button-details-section');
  signOutDetailsButton.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert(`Sign Out Successful`);
      localStorage.removeItem('user-with-google');
    }).catch((error) => {
      alert(error);
    });

  });
}


