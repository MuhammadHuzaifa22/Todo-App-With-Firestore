// ., Import Functions & Docs from Firestore
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, Timestamp, query, where, orderBy, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// ., Call Variables
const form = document.getElementById('todo-form');
const todo = document.getElementById('todo');
const ul = document.querySelector('ul');
let registeredWithEmailUserName = JSON.parse(localStorage.getItem('user-registered-name'));
let registeredWithEmailUserEmail = JSON.parse(localStorage.getItem('user-registered-email'));
const userWithGoogle = JSON.parse(localStorage.getItem('user-with-google'));
const signOutDetailAndbButton = document.querySelector('.sign-out-detail-and-button');
const signOutButton = document.getElementById('sign-out-button');
const filterButton = document.getElementById('filter-button');
const filterDiv = document.querySelector('.filter-div');
const filterdivH3 = document.getElementById('filter-div-h3');
const filterMouseOverDiv1 = document.querySelector('.filter-mouseover-div-1');
const filterdivH31 = document.getElementById('filter-div-h3-1');
const filterMouseOverDiv2 = document.querySelector('.filter-mouseover-div-2');
const selection1 = document.querySelector('.selection1');
const selection2 = document.querySelector('.selection2');
const selection3 = document.querySelector('.selection3');
const selection4 = document.querySelector('.selection4');
const selection5 = document.querySelector('.selection5');
const selectionDiv = document.querySelector('.selection-div');
const selectionDivH1 = document.getElementById('selection-div-h1');
const selectCity = document.querySelector('#select');
const city1 = document.getElementById('cty1');
const city2 = document.getElementById('cty2');
const city3 = document.getElementById('cty3');
const resetButton = document.getElementById('reset-button');

// ., Make empty array for render data
let arr = [];

// ., Sing Out Button Display
signOutDetailAndbButton.style.display = 'none';
signOutButton.addEventListener('click', () => {
  if (signOutDetailAndbButton.style.display === 'none') {
    signOutDetailAndbButton.style.display = 'block';
  } else {
    signOutDetailAndbButton.style.display = 'none';
  }
})


// ., On Auth State Change Function
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("🚀 ~ onAuthStateChanged ~ uid:", uid);

  } else {
    window.location = 'index.html';
  }
});

// ., Render Function
function renderTodo() {
  ul.innerHTML = '';
  let todoSplit = todo.value.split('');
  console.log("🚀 ~ todoSplit:", todoSplit)
  if (todoSplit.includes('<') || todoSplit.includes('>') || todoSplit.includes('@') || todoSplit.includes('!') || todoSplit.includes('#') || todoSplit.includes('$') || todoSplit.includes('%') || todoSplit.includes('^') || todoSplit.includes('&') || todoSplit.includes('*') || todoSplit.includes('(') || todoSplit.includes(')') || todoSplit.includes('.') || todoSplit.includes('/') || todoSplit.includes('?') || todoSplit.includes('"') || todoSplit.includes(';') || todoSplit.includes(':') || todoSplit.includes('{') || todoSplit.includes('}') || todoSplit.includes('|') || todoSplit.includes('=') || todoSplit.includes('`')) {
    alert('Input field should not contain *symbols* \n  Like < >  @ ! # $ % ^ & * ( ) - + . ` ?  / = " : ; { }');
  } else {
    arr.forEach(item => {
      if (item.time) {
        console.log(item.time.toDate())
        let newTime = item.time.toDate().toString();
        newTime = newTime.split('');
        console.log(newTime.length);
        if (newTime.length > 57 && newTime.length < 59) {
          newTime = newTime.slice(0, 24).join('');
          let newTimeSplit = newTime.split('').join('')
          let newTimeSplitSlice = newTimeSplit.slice(16,24);
          let newTimeSplitSileSplit = newTimeSplitSlice.split('');
          let newTimeSplitSileSplitSlice = newTimeSplitSileSplit.slice(0,2);
          console.log("🚀 ~ newTimeSplitSileSplitSlice:", newTimeSplitSileSplitSlice);
          if(newTimeSplitSileSplitSlice.join('') > 12){
            console.log("🚀 ~ newTimeSplitSileSplitSlice:", newTimeSplitSileSplitSlice.join(''))
            console.log(newTime);
            console.log('up to 12');
            newTimeSplitSileSplitSlice = newTimeSplitSileSplitSlice.join('') - 12;
            console.log("🚀 ~ newTimeSplitSileSplitSlice:", newTimeSplitSileSplitSlice);
            newTimeSplitSlice = newTimeSplitSlice.slice(2,8);
            console.log("🚀 ~ newTimeSplitSlice:",  newTimeSplitSileSplitSlice +  newTimeSplitSlice);
            let again = newTimeSplitSileSplitSlice + newTimeSplitSlice
            console.log("🚀 ~ again:", again)
            newTime = newTime.slice(0, 16) + again
      console.log(newTime) 

            console.log("🚀 ~ newTime:", newTime)
          }else{
            console.log(newTime);
            console.log('under 12')
          }
          
          
        }

        ul.innerHTML += `
        <li class="todo-li"><div class="centent-div"><div>${item.todo}</div> <div><p class="select-value-div-text"><i class="fa-solid fa-city"></i> ${item.city}</p></div></div><div class="buttons-section-ul"><div class="li-buttons"><button class="editli-button">Edit <i class="fa-solid fa-pen"></i></button><button class="deleteli-button">Delete <i class="fa-solid fa-trash"></i></button></div> <p class="time-section"><img src="./Assets/Images/sending-time-icon.png" alt="sending-time-icon" style="width: 30px;">${newTime}</p></div></li>
        `;
      }
      else {
        console.log(arr);
        ul.innerHTML += `
        <li class="todo-li"><div class="centent-div"><div>${item.todo}</div> <div><p class="select-value-div-text"><i class="fa-solid fa-city"></i> ${item.city}</p></div></div><div class="buttons-section-ul"><div class="li-buttons"><button class="editli-button">Edit <i class="fa-solid fa-pen"></i></button><button class="deleteli-button">Delete <i class="fa-solid fa-trash"></i></button></div> <p class="time-section"><img src="./Assets/Images/sending-time-icon.png" alt="sending-time-icon" style="width: 30px;">No Time</p></div></li>
        `;
      }
    });



    // ., Edit Button Function
    filterButton.style.display = 'none'
    const editLiBtn = document.querySelectorAll('.editli-button');
    editLiBtn.forEach((item, index) => {
      item.addEventListener('click', async () => {
        const newEditValue = prompt(`Enter new todo`);
        if (newEditValue !== '' && newEditValue !== null) {

          const todoUpdate = doc(db, "todos", arr[index].id);
          await updateDoc(todoUpdate, {
            todo: newEditValue,
          });
          arr[index].todo = newEditValue;
          renderTodo();
        } else {
          alert(`Please re enter new value`)
        }
      })
    })

    // ., Delete Button Function
    const deleteLiBtn = document.querySelectorAll('.deleteli-button');
    deleteLiBtn.forEach((item, index) => {
      item.addEventListener('click', async () => {
        console.log(arr[index]);
        await deleteDoc(doc(db, "todos", arr[index].id));
        arr.splice(index, 1);
        console.log(arr)
        renderTodo();
      })
    })

  }
  filteredButton(arr);
}


// ., Filter Button Dislay && Filter Status Div Display
selectionDivH1.innerHTML = 'Newest';
filterButton.style.display = 'none';
function filteredButton(arr) {
  if (arr.length > 0) {
    if (selectionDivH1.innerHTML !== '') {
      selectionDiv.style.display = 'block';
      selectionDivH1.style.boxShadow = '1px 1px 3px gray';
    }
    filterButton.style.display = 'block'
    selectionDivH1.style.display = 'block';
  } else {
    selectionDivH1.style.display = 'none';
    filterButton.style.display = 'none'
  }
}

// ., Filter Div Section
filterDiv.style.display = 'none';
filterButton.addEventListener('click', () => {
  if (filterDiv.style.display === 'none') {
    filterDiv.style.display = 'block';
    console.log(filterButton.innerHTML);
    filterButton.innerHTML = '<i class="fa-solid fa-filter-circle-xmark"></i>'
    filterDiv.addEventListener('mouseover', () => {
      filterDiv.style.height = '170px';
      filterButton.innerHTML = '<i class="fa-solid fa-filter-circle-xmark"></i>'
    })
  } else {
    filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>'
    filterDiv.style.display = 'none';
  }
  filterDiv.addEventListener('mouseout', () => {
    filterDiv.style.height = '100px';
  })
})



// ., Filter Mouseover Div 1 Display
filterDiv.style.height = '100px'
filterMouseOverDiv1.style.display = 'none'
filterdivH3.addEventListener('mouseover', () => {
  if (filterMouseOverDiv1.style.display === 'none') {
    filterMouseOverDiv1.style.display = 'block';
    filterDiv.style.height = '170px';
  } else {
    filterDiv.style.height = '100px';
  }
})

filterMouseOverDiv1.addEventListener('mouseover', () => {
  filterMouseOverDiv1.style.display = 'block';
  filterDiv.style.height = '160px'

})
filterMouseOverDiv1.addEventListener('mouseout', () => {
  filterMouseOverDiv1.style.display = 'none';
  filterDiv.style.height = '100px';
})

filterdivH3.addEventListener('mouseout', () => {
  if (filterMouseOverDiv1.style.display === 'block') {
    filterMouseOverDiv1.style.display = 'none';
  }
})


// ., Filter Mouseover Div 2 Display
filterMouseOverDiv2.style.display = 'none'
filterdivH31.addEventListener('mouseover', () => {
  if (filterMouseOverDiv2.style.display === 'none') {
    filterMouseOverDiv2.style.display = 'block';
  }
})

filterMouseOverDiv2.addEventListener('mouseover', () => {
  filterMouseOverDiv2.style.display = 'block';
})
filterMouseOverDiv2.addEventListener('mouseout', () => {
  filterMouseOverDiv2.style.display = 'none';
})

filterdivH31.addEventListener('mouseout', () => {
  if (filterMouseOverDiv2.style.display === 'block') {
    filterMouseOverDiv2.style.display = 'none';
  }
})


// ., Filter Selection
resetButton.style.display = 'none';
selection1.addEventListener('click', async (event) => {
  resetButton.style.display = 'block';
  arr = [];
  console.log(event.target.textContent);
  const todosRef = collection(db, "todos");
  const q = query(
    todosRef,
    orderBy("time", "asc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  console.log(arr);
  renderTodo();
  filterDiv.style.display = 'none';
  console.log(selection1.textContent);
  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>'
  selectionDivH1.innerHTML = selection1.innerHTML
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';
  selectionDivH1.style.marginTop = '-30px';
  selectionDivH1.style.background = 'gainsboro'
})


selection2.addEventListener('click', async (event) => {
  resetButton.style.display = 'block';
  arr = [];
  console.log(event.target.textContent);
  const todosRef = collection(db, "todos");
  const q = query(
    todosRef,
    orderBy("time", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  console.log(arr);
  renderTodo();
  filterDiv.style.display = 'none';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>'
  console.log(selection2.textContent);
  selectionDivH1.style.display = 'block';
  selectionDivH1.innerHTML = selection2.innerHTML
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';
})


selection3.addEventListener('click', async (event) => {
  resetButton.style.display = 'block';
  filterDiv.style.display = 'none';
  console.log("Selected City:", selection3.textContent);


  arr = [];

  var todosRef = collection(db, "todos");


  const q = query(
    todosRef,
    where("city", "==", event.target.innerHTML),
    orderBy("time", "desc")
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot === '' || querySnapshot === null) {
    console.log("No matching documents found for city:", event.target.innerHTML);

  } else {

    querySnapshot.forEach((doc) => {
      console.log("Document Data:", doc.data());
      arr.push({ ...doc.data(), id: doc.id, city: event.target.innerHTML });
    });
    console.log("Filtered Todos Array:", arr);
  }

  renderTodo();


  if (!renderTodo()) {
    filterButton.style.display = 'block';

  };

  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>';
  selectionDivH1.innerHTML = event.target.innerHTML;
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';

  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>';
  selectionDivH1.innerHTML = event.target.innerHTML;
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';
});



selection4.addEventListener('click', async (event) => {
  resetButton.style.display = 'block';
  filterDiv.style.display = 'none';
  console.log(selection4.textContent);
  arr = [];

  var todosRef = collection(db, "todos");


  const q = query(
    todosRef,
    where("city", "==", event.target.innerHTML),
    orderBy("time", "desc")
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot === '' || querySnapshot === null) {
    console.log("No matching documents found for city:", event.target.innerHTML);

  } else {

    querySnapshot.forEach((doc) => {
      console.log("Document Data:", doc.data());
      arr.push({ ...doc.data(), id: doc.id, city: event.target.innerHTML });
    });
    console.log("Filtered Todos Array:", arr);
  }


  renderTodo();


  if (!renderTodo()) {

    filterButton.style.display = 'block';

  };

  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>';
  selectionDivH1.innerHTML = event.target.innerHTML;
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';

  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>';
  selectionDivH1.innerHTML = event.target.innerHTML;
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';
})

selection5.addEventListener('click', async (event) => {
  resetButton.style.display = 'block';
  filterDiv.style.display = 'none';
  console.log(selection5.textContent);
  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>'
  arr = [];

  var todosRef = collection(db, "todos");


  const q = query(
    todosRef,
    where("city", "==", event.target.innerHTML),
    orderBy("time", "desc")
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot === '' || querySnapshot === null) {
    console.log("No matching documents found for city:", event.target.innerHTML);

  } else {

    querySnapshot.forEach((doc) => {
      console.log("Document Data:", doc.data());
      arr.push({ ...doc.data(), id: doc.id, city: event.target.innerHTML });
    });
    console.log("Filtered Todos Array:", arr);
  }


  renderTodo();


  if (!renderTodo()) {

    filterButton.style.display = 'block';

  };

  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>';
  selectionDivH1.innerHTML = event.target.innerHTML;
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';

  selectionDivH1.style.display = 'block';
  filterButton.innerHTML = '<i class="fa-solid fa-filter"></i>';
  selectionDivH1.innerHTML = event.target.innerHTML;
  selectionDivH1.style.boxShadow = '1px 1px 3px gray';
  selectionDivH1.style.borderRadius = '20px';
  selectionDivH1.style.padding = '5px';
})



// ., Reset Button Function
resetButton.addEventListener('click', () => {
  getData();
  renderTodo();
  selectionDivH1.innerHTML = 'Default'
  resetButton.style.display = 'none'
})



// ., Form Button Function
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (todo.value === '' && (selectCity.value === '' || selectCity.value === null)) {
    alert(`Please fill input fields`);
  } else if (todo.value === '' && (selectCity.value !== '' || selectCity.value !== null)) {
    alert(`Please enter todo`);
  } else if (todo.value !== '' && (selectCity.value === '' || selectCity.value === null)) {
    alert(`Please select city`);
  }
  else {
    alert(`Todo added`)
    console.log(todo.value);
    console.log(selectCity.value)
    // ., Save Data to Firestore
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo.value,
        time: Timestamp.fromDate(new Date()),
        city: selectCity.value
      });
      console.log("Document written with ID: ", docRef.id);
      arr.push({
        todo: todo.value,
        id: docRef.id,
        city: selectCity.value
      });

      renderTodo();
      console.log(arr);
      todo.value = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

// .,Get data form Firestore
selectionDivH1.innerHTML = ''
async function getData() {
  arr = [];
  const q = query(collection(db, "todos"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  console.log(arr);
  renderTodo();
}

getData();
