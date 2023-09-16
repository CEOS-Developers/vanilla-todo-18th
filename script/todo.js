const todoInput = document.querySelector("#todoBoardInput");
const addTodo = document.querySelector("#todoAdd");
const todoList = document.querySelector("#todoList");
const totalTodoCount = document.querySelector("#totalTodo");
const nowTodo = document.querySelector("#nowTodo");
const doneTodo = document.querySelector("#doneTodo");

//접속 시 localStorage에 todo가 저장되어 있다면 parse 하여 불러오고, 없다면 빈 배열 저장
const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

//localStorage에 현재 todo 상태 저장하는 함수
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(storedTodos));
}

//현재 todo의 총 개수를 계산하는 함수
function updateTotalTodoCount() {
  totalTodoCount.textContent = "할 일: " + storedTodos.length;
}

//현재 체크된 todo를 계산하여 진행중인 todo와 완료된 todo를 구분하는 함수
function updateCheckedTodoCount() {
  const checkboxes = document.querySelectorAll(".todoCheckbox");
  const checkedCount = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  ).length; //만들어진 체크박스들을 배열로 불러온 뒤, 각각의 체크 상태를 판단하여 체크된 개수를 저장

  nowTodo.textContent = "진행중: " + (storedTodos.length - checkedCount);
  doneTodo.textContent = "완료: " + checkedCount;
}

//todo 추가 시 및 화면 재접속 시 각각의 todo 상태를 전달받아 화면에 띄워주는 함수
function addTodoItem(todo) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todoWrapper");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todoCheckbox");
  checkbox.checked = todo.checked || false; //전달받은 todo의 check 상태가 true면 true, 아니면 false로 선언
  checkbox.addEventListener("change", () => {
    todo.checked = checkbox.checked; //해당 todo의 체크박스 상태가 변하면 그 상태를 저장해 준 후
    saveTodos(); //localStorage의 체크박스 상태 변화 저장
    todoText.style.textDecoration = checkbox.checked ? "line-through" : "none"; //체크박스가 check 되어있다면 해당 todo에 줄 그어줌
    updateCheckedTodoCount(); //해당 todo의 체크 상태가 변했으므로 진행중인 todo와 완료된 todo개수 update
  });

  const todoText = document.createElement("div");
  todoText.textContent = todo.text; //불러온 todo의 text 값을 생성한 요소에 저장
  todoText.classList.add("todoText");
  todoText.style.textDecoration = todo.checked ? "line-through" : "none"; //불러온 todo의 체크 상태에 따라 줄을 그을지 말지 판단

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteBtn");
  deleteButton.textContent = "X";
  //각 todo의 X 버튼을 누르면 trigger
  deleteButton.addEventListener("click", () => {
    const index = storedTodos.indexOf(todo); //전체 todo 상태가 저장되어 있는 배열에서 해당 todo의 index 값 불러옴
    storedTodos.splice(index, 1); //해당 index부터 1개의 요소 삭제(즉, 해당 todo만 삭제)
    saveTodos(); //삭제된 상태를 localStorage 에 update
    todoList.removeChild(todoItem); //해당 todo를 화면에서 지워줌
    updateTotalTodoCount(); //전체 todo 개수 update
    updateCheckedTodoCount(); //진행중 및 완료 todo 개수 update
  });

  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(deleteButton);

  todoList.appendChild(todoItem); // checkbox와 text, 삭제 버튼이 append된 todo 요소를 todo를 저장하는 list요소에 append
  updateTotalTodoCount(); //전체 todo 개수 update
  updateCheckedTodoCount(); //진행중 및 완료 todo 개수 update
}

//화면 초기 접속 시 localStorage에 접근하여 불러온 배열의 각각 요소들을 선언한 addTodoItem에 전달
storedTodos.forEach((todo) => {
  addTodoItem(todo);
});

//입력버튼을 클릭 시 해당 함수가 trigger 되게 addEventListener 등록
addTodo.addEventListener("click", () => {
  const text = todoInput.value.trim(); //입력한 todo의 불필요한 공백 제거
  if (text) {
    const newTodo = { text, checked: false }; //입력된 text와, 초기에 check은 false이므로 해당 상태를 변수로 선언
    storedTodos.push(newTodo); //현재 todo를 저장하는 배열 변수에 push
    saveTodos(); //push된 배열 변수의 상태를 localStorage에 update
    addTodoItem(newTodo); //현재 입력한 todo의 상태를 화면에 보여주도록 선언한 addTodoItem에 전달
    todoInput.value = ""; //입력을 완료하면 현재 input 값 빈 string으로 선언
  }
});

//PC에서의 편리한 사용을 고려하여 엔터를 눌러도 해당 함수가 trigger 되게 addEventListener 등록
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
