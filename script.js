const clock = document.querySelector("h1#clock");
const addButton = document.getElementById("add-button");
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
const savedToDos = localStorage.getItem(TODOS_KEY);
const doneList = document.getElementById("done-list");
const DONETODOS_KEY = "donetodos";
const savedDoneToDos = localStorage.getItem(DONETODOS_KEY);
let toDos = [];
let doneToDos = [];

addButton.addEventListener("click", handleAddButtonClick);
toDoForm.addEventListener("submit", handleToDoSubmit);

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  clock.innerText = `${hours}:${minutes}:${seconds} ${amPm}`;
}
getClock();
setInterval(getClock, 1000);

function handleAddButtonClick() {
  const newTodo = toDoInput.value;
  if (newTodo !== "") {
    toDoInput.value = "";
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
  }
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function deleteToDo(event) {
  event.stopPropagation();
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteToDo);
  li.addEventListener("click", moveToDone);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function moveToDone(event) {
  const li = event.target.parentElement;
  const text = li.querySelector("span").innerText;
  const id = parseInt(li.id);

  const doneTodoObj = {
    text,
    id,
  };

  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  doneToDos.push(doneTodoObj);
  paintDoneItem(doneTodoObj);
  saveDoneItems(doneTodoObj);
}

function paintDoneItem(doneTodo) {
  const li = document.createElement("li");
  li.id = doneTodo.id;
  const span = document.createElement("span");
  span.innerText = doneTodo.text;
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteDoneItem);

  li.appendChild(span);
  li.appendChild(button);
  doneList.appendChild(li);
}

function saveDoneItems() {
  localStorage.setItem("donetodos", JSON.stringify(doneToDos));
}

if (savedDoneToDos !== null) {
  const parsedDoneToDos = JSON.parse(savedDoneToDos);
  doneToDos = parsedDoneToDos;
  parsedDoneToDos.forEach(paintDoneItem);
}

function deleteDoneItem(event) {
  const li = event.target.parentElement;
  li.remove();
  doneToDos = doneToDos.filter((doneToDo) => doneToDo.id !== parseInt(li.id));
  saveDoneItems();
}
