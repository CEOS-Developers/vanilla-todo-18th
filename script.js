const todoGenerator = document.querySelector(".todo");
const todoList = document.querySelector(".todo-list");
const makeToDo = (event) => {
  event.preventDefault();
  const todoText = event.target.children[0].value;
  setText(todoText);
};
const setText = (text) => {
  const li = document.createElement("li");
  li.innerHTML = text;
  todoList.appendChild(li);
};
todoGenerator.addEventListener("submit", makeToDo);
