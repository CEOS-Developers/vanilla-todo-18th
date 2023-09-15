const inputTodo = document.querySelector("#inputTodo");
const todoItems = document.querySelector("#todoList");
const doneList = document.querySelector("#doneList");
const addBtn = document.querySelector(".addBtn");
const lenTodo = document.getElementById("todoCount");
const lenDone = document.getElementById("doneCount");
let todoArr = [];
let doneArr = [];
const TODODATA = "todoData";
const DONEDATA = "doneData";

function todayDate() {
  var todayDate = document.getElementById("date");
  const dayWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = dayWeek[today.getDay()];

  todayDate.textContent = year + "년 " + month + "월 " + date + "일 " + day;
}

//LocalStorage에 저장하는 함수
function saveDATA() {
  localStorage.setItem(TODODATA, JSON.stringify(todoArr));
  localStorage.setItem(DONEDATA, JSON.stringify(doneArr));
}

//Item 개수 저장하는 함수
function setLength() {
  lenTodo.innerText = todoArr.length;
  lenDone.innerText = doneArr.length;
}

//버튼 생성하는 함수
function createBtn(className, text) {
  var button = document.createElement("div");
  button.textContent = text;
  button.classList.add(className);
  return button;
}

//array 삭제 후 저장하는 함수
function deleteData(arr, value) {
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

//deleteBtn을 눌렀을때
function deleteItem() {
  var removeBtns = document.querySelectorAll(".deleteBtn");
  for (i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener("click", function () {
      if (this.parentNode) {
        this.parentNode.parentNode.removeChild(this.parentNode);
        var del = this.parentNode.firstChild.textContent;

        if (todoArr.includes(del))
          deleteData(todoArr, this.parentNode.firstChild.textContent);
        else deleteData(doneArr, this.parentNode.firstChild.textContent);
        setLength();
        saveDATA();
      }
    });
  }
}

//doneBtn을 눌렀을때
function todoToDone() {
  var doneBtns = document.querySelectorAll(".doneBtn");

  for (var i = 0; i < doneBtns.length; i++) {
    doneBtns[i].addEventListener("click", function () {
      if (this.parentNode.parentNode === todoItems) {
        doneList.insertBefore(this.parentNode, doneList.childNodes[0]);
        deleteData(todoArr, this.parentNode.firstChild.textContent);
        doneArr.push(this.parentNode.firstChild.textContent);
        setLength();
        saveDATA();
      }
    });
  }
}

function newTodo() {
  var newDiv = document.createElement("div");
  var newText = document.createTextNode(inputTodo.value); // input 태그에 쓴 text 값
  newDiv.appendChild(newText);
  var doneBtn = createBtn("doneBtn", "✅");
  var deleteBtn = createBtn("deleteBtn", "❌");
  newDiv.appendChild(doneBtn);
  newDiv.appendChild(deleteBtn);
  newDiv.setAttribute("class", "todoItem");
  todoItems.insertBefore(newDiv, todoItems.childNodes[0]);
  todoArr.push(inputTodo.value); // todoArr 에 값 저장해줌
  inputTodo.value = "";

  //deleteBtn 누르면 삭제 구현
  deleteItem();

  //doneBtn 누르면 todo -> done으로
  todoToDone();
  setLength();
  saveDATA();
}

function init() {
  addBtn.addEventListener("click", newTodo);
  todayDate();
}

init();
