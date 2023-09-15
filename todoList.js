/* Local Storage */
// Local Storage에 할 일 목록 저장
const saveTodoListToLocalStorage = () => {
  const todoListItems = document.querySelectorAll(".todo-item-text");
  const doneListItems = document.querySelectorAll(".done-item-text");

  const todoItems = Array.from(todoListItems).map((item) => item.innerText);
  const doneItems = Array.from(doneListItems).map((item) => item.innerText);

  localStorage.setItem("todoList", JSON.stringify(todoItems));
  localStorage.setItem("doneList", JSON.stringify(doneItems));
};

// Local Storage에서 할 일 목록 불러오기
const loadTodoListFromLocalStorage = () => {
  const todoList = localStorage.getItem("todoList");
  if (todoList) {
    const todoItems = JSON.parse(todoList);
    todoItems.forEach((item) => printTodoItem(item));
  }

  const doneList = localStorage.getItem("doneList");
  if (doneList) {
    const doneItems = JSON.parse(doneList);
    doneItems.forEach((item) => printDoneItem(item));
  }
};

/* todo 추가 + 삭제 기능 */

// 할 일 추가 함수
const addTodoItem = () => {
  event.preventDefault();
  // input에 입력한 value를 선택하여 todoContent에 대입
  const todoContent = document.querySelector(".todo-input").value;
  if (todoContent) {
    printTodoItem(todoContent);
    saveTodoListToLocalStorage();
  } else {
    alert("할 일을 입력하세요!");
  }
};

// 입력 받은 할 일 출력
const printTodoItem = (text) => {
  const todoItem = document.createElement("li");
  const todoText = document.createElement("span");
  const todoDel = document.createElement("button");

  todoItem.className = "list-item";
  todoText.className = "todo-item-text";

  todoText.innerText = text;
  todoText.addEventListener("click", toggleTodoToDone);

  // todo 삭제
  todoDel.className = "delete-button";
  todoDel.addEventListener("click", deleteTodoItem);

  // li에 item 추가
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoDel);
  document.querySelector(".todo-list").appendChild(todoItem);

  // input 창 초기화
  document.querySelector(".todo-input").value = "";
};

// 할 일 삭제
const deleteTodoItem = (e) => {
  const target = e.target.parentNode; //해당 todo item 다 삭제해야 하므로 이동
  document.querySelector(".todo-list").removeChild(target);
  saveTodoListToLocalStorage();
  updateItemCount();
};

/* todo -> done 이동 + done 표시 */

// todo -> done 이동
const toggleTodoToDone = (e) => {
  deleteTodoItem(e);
  printDoneItem(e.target.innerText);
  saveTodoListToLocalStorage();
  updateItemCount();
};

// 끝낸 일 출력
const printDoneItem = (text) => {
  const doneItem = document.createElement("li");
  const doneText = document.createElement("span");
  const doneDel = document.createElement("button");

  doneText.innerText = text;
  doneText.className = "done-item-text";
  doneText.addEventListener("click", toggleDoneToDo);

  doneDel.className = "delete-button";
  doneDel.addEventListener("click", deleteDoneItem);

  doneItem.className = "list-item";
  doneItem.appendChild(doneText);
  doneItem.appendChild(doneDel);

  document.querySelector(".done-list").appendChild(doneItem);
};

// 끝낸 일 삭제
const deleteDoneItem = (e) => {
  const target = e.target.parentNode;
  document.querySelector(".done-list").removeChild(target);
  saveTodoListToLocalStorage();
  updateItemCount();
};

// done -> todo 이동
const toggleDoneToDo = (e) => {
  deleteDoneItem(e);
  printTodoItem(e.target.innerText);
  saveTodoListToLocalStorage();
  updateItemCount();
};

/* 오늘 날짜 */
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}.`;
};

/* 입력창 팝업 토글 */
const btn = document.querySelector(".popup-button");
const form = document.querySelector(".todo-form");
const progressContainer = document.querySelector(".progress-container");
const progressDiv = document.querySelector(".progress-div");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

const displayForm = () => {
  if (form.style.display === "none") {
    form.style.display = "flex";
    progressContainer.style.display = "none";
  } else {
    form.style.display = "none";
    progressContainer.style.display = "flex";
    updateItemCount();
  }
};

/* 할 일 및 완료된 일 개수 업데이트 */
const updateItemCount = () => {
  const todoCount = document.querySelectorAll(".todo-item-text").length;
  const doneCount = document.querySelectorAll(".done-item-text").length;
  const totalCount = todoCount + doneCount;
  const countText = `${doneCount} / ${totalCount}`;
  progress.innerText = countText;

  let ratio = 0;
  if (totalCount !== 0) {
    ratio = doneCount / totalCount;
  }
  progressBar.style.width = `${ratio * 100}%`;
};

const init = () => {
  form.addEventListener("submit", addTodoItem);
  btn.addEventListener("click", displayForm);

  const dateSpan = document.querySelector(".date");
  dateSpan.innerText = getTodayDate();

  loadTodoListFromLocalStorage();
  updateItemCount();
};

// 시작 함수
init();
