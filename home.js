import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const form = document.getElementById('todo-form');
const todo = document.getElementById('todo');
const ul = document.querySelector('ul');
const arr = [];

// ., On Auth State Change Function
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("🚀 ~ onAuthStateChanged ~ uid:", uid);

  } else {
    alert(`You are not logged in.`);
    window.location = 'index.html';
  }
});


function renderTodo() {
  if (todo.value !== null && todo.value !== '') {
    let todoObj = {
      todo: `${todo.value}`
    }
    arr.push(todoObj);
    ul.innerHTML = '';
    arr.map(item => {
      ul.innerHTML += `<li id="todo-li">${item.todo}</li>`
    })
  } else {
    alert(`Please enter todo`);
  }
}

form.addEventListener('submit', async (event) => {

  event.preventDefault();
  console.log(todo.value);
  renderTodo();
  try {
    if(todo.value !== '' && todo.value !== null){

      const docRef = await addDoc(collection(db, "todos"), {
        todo: `${todo.value}`
      });
      console.log("Document written with ID: ", docRef.id);
    }
    todo.value = '';
  
  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
})