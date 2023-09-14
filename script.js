let nowToDo = [];
let completeToDo = [];

const todoGenerator = document.querySelector(".todo");
const todoList = document.querySelector(".todo-list");
const completeList = document.querySelector(".solved-list");
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
const setText2 = (text) => {
  const li = document.createElement("li");
  const textEl = document.createElement("p");
  textEl.innerHTML = text;
  const deleteImg = document.createElement("img");
  deleteImg.src = "./images/delete.png";
  const resetImg = document.createElement("img");
  resetImg.src = "./images/restore.png";
  li.appendChild(deleteImg);
  li.appendChild(resetImg);
  li.appendChild(textEl);
  completeToDo.push(text);
  completeList.appendChild(li);
};

const loadToDo = (item) => {
  const loadToDos = localStorage.getItem(item);
  const parsedToDos = JSON.parse(loadToDos);
  parsedToDos.forEach((toDo) => {
    setText(toDo);
  });
};

const loadCompleteTodo = (item) => {
  const loadCompleteToDos = localStorage.getItem(item);
  const parsedCompleteToDos = JSON.parse(loadCompleteToDos);
  parsedCompleteToDos.forEach((completeToDo) => {
    setText2(completeToDo);
  });
};

const setNumber = () => {
  const toDoNum = document.querySelector(".todo-number");
  toDoNum.innerHTML = nowToDo.length;
};
const submitHandler = (event) => {
  event.preventDefault();
  const todoText = event.target.children[0].value;
  if (todoText.length < 3) {
    alert("3글자 이상 입력하세요.");
    return;
  } else if (todoText.length > 25) {
    alert("25글자 이하로 요약해서 입력해주세요.");
    return;
  }
  setText(todoText);
  localStorage.setItem("nowToDo", JSON.stringify(nowToDo));
  setNumber();
  resetInputText();
};

const listClickHandler = (event) => {
  const filterArr = nowToDo.filter((data) => data !== event.target.innerHTML);
  nowToDo.length = 0;
  nowToDo.push(...filterArr);
  localStorage.setItem("nowToDo", JSON.stringify(nowToDo));
  completeToDo.push(event.target.innerHTML);
  localStorage.setItem("completeToDo", JSON.stringify(completeToDo));
  event.target.remove();
  setNumber();
  setText2(event.target.innerHTML);
};

const compleListClickHandler = (event) => {
  if (
    event.target.tagName === "IMG" &&
    event.target.src.includes("delete.png")
  ) {
    const deletedTask =
      event.target.nextElementSibling.nextElementSibling.innerHTML;
    const filterArr = completeToDo.filter((data) => data !== deletedTask);
    completeToDo = filterArr;
    console.log(completeToDo);
    localStorage.setItem("completeToDo", JSON.stringify(completeToDo));
    event.target.parentElement.remove();
  } else if (
    event.target.tagName == "IMG" &&
    event.target.src.includes("restore.png")
  ) {
    const restoredTask = event.target.nextElementSibling.innerHTML;
    const filterArr = completeToDo.filter((data) => data !== restoredTask);
    completeToDo = filterArr;
    localStorage.setItem("completeToDo", JSON.stringify(completeToDo));
    setText(restoredTask);
    localStorage.setItem("nowToDo", JSON.stringify(nowToDo));
    event.target.parentElement.remove();
    setNumber();
  }
};
todoGenerator.addEventListener("submit", submitHandler);
todoList.addEventListener("click", listClickHandler);
completeList.addEventListener("click", compleListClickHandler);
(() => {
  loadToDo("nowToDo");
  loadCompleteTodo("completeToDo");
  setNumber();
})();
