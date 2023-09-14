let nowToDo = []; // 지금 당장 해결
let historyToDo = []; // 해결한 내역
const todoGenerator = document.querySelector(".todo");
const todoList = document.querySelector(".todo-list");
const submitButton = document.querySelector("button");

const resetInputText = () => {
  const todo_input = document.querySelector(".todo > input");
  console.log("d");
  todo_input.value = "";
};
const setText = (text) => {
  const li = document.createElement("li");
  li.innerHTML = text;
  nowToDo.push(text);
  todoList.appendChild(li);
};
const loadToDo = () => {
  const loadToDos = localStorage.getItem("nowTodo");
  const parsedToDos = JSON.parse(loadToDos);
  parsedToDos.forEach((toDo) => {
    setText(toDo);
    console.log(toDo);
  });
};
const saveToDo = () => {
  localStorage.setItem("nowTodo", JSON.stringify(nowToDo));
};
const submitHandler = (event) => {
  event.preventDefault();
  const todoText = event.target.children[0].value;
  setText(todoText);
  saveToDo();
  resetInputText();
};

todoGenerator.addEventListener("submit", submitHandler);

(() => {
  loadToDo();
})();
