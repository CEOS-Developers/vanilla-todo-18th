const todoInput = document.querySelector("#todoBoardInput");
const addTodo = document.querySelector("#todoAdd");
const todoList = document.querySelector("#todoList");
const totalTodoCount = document.querySelector("#totalTodo");
const nowTodo = document.querySelector("#nowTodo");
const doneTodo = document.querySelector("#doneTodo");

const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(storedTodos));
}

function updateTotalTodoCount() {
  totalTodoCount.textContent = "할 일: " + storedTodos.length;
}

function updateCheckedTodoCount() {
  const checkboxes = document.querySelectorAll(".todoCheckbox");
  const checkedCount = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  ).length;

  nowTodo.textContent = "진행중: " + (storedTodos.length - checkedCount);
  doneTodo.textContent = "완료: " + checkedCount;
}

function addTodoItem(todo) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todoWrapper");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todoCheckbox");
  checkbox.checked = todo.checked || false;
  checkbox.addEventListener("change", () => {
    todo.checked = checkbox.checked;
    saveTodos();
    todoText.style.textDecoration = checkbox.checked ? "line-through" : "none";
    updateCheckedTodoCount();
  });

  const todoText = document.createElement("div");
  todoText.textContent = todo.text;
  todoText.classList.add("todoText");
  todoText.style.textDecoration = todo.checked ? "line-through" : "none";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteBtn");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => {
    const index = storedTodos.indexOf(todo);
    storedTodos.splice(index, 1);
    saveTodos();
    todoList.removeChild(todoItem);
    updateTotalTodoCount();
    updateCheckedTodoCount();
  });

  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(deleteButton);

  todoList.appendChild(todoItem);
  updateTotalTodoCount();
  updateCheckedTodoCount();
}

storedTodos.forEach((todo) => {
  addTodoItem(todo);
});

addTodo.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text) {
    const newTodo = { text, checked: false };
    storedTodos.push(newTodo);
    saveTodos();
    addTodoItem(newTodo);
    todoInput.value = "";
  }
});

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const text = todoInput.value.trim();
    if (text) {
      const newTodo = { text, checked: false };
      storedTodos.push(newTodo);
      saveTodos();
      addTodoItem(newTodo);
      todoInput.value = "";
    }
  }
});

updateTotalTodoCount();
