
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnuGgYwWuvXNHxQViKcqqpW30MGuD9LWc",
  authDomain: "todo-app-with-cloud-firestore.firebaseapp.com",
  projectId: "todo-app-with-cloud-firestore",
  storageBucket: "todo-app-with-cloud-firestore.appspot.com",
  messagingSenderId: "837239214634",
  appId: "1:837239214634:web:9d3e90c8ebf51a4b6c2953",
  measurementId: "G-KR2Y7Y9R9D"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
