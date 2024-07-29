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
    let todoSplit = todo.value.split('');
    console.log("🚀 ~ todoSplit:", todoSplit)
    if (todoSplit[0] === todoSplit[0].toUpperCase()) {

      let todoObj = {
        todo: `${todo.value}`
      }
      arr.push(todoObj);
      ul.innerHTML = '';
      
      arr.reverse().map(item => {
        ul.innerHTML += `<li class="todo-li">${item.todo}<div class="li-buttons"><button class="editli-button">Edit <i class="fa-solid fa-pen"></i></button><button class="deleteli-button">Delete <i class="fa-solid fa-trash"></i></button></div></li>`
      })
    } else {
      alert(`First letter should be capital form`);
    }
  } else {
    alert(`Please enter todo`);
  }
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