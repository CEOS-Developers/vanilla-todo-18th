const inputTodo = document.querySelector("#inputTodo");
const todoItems = document.querySelector("#todoList");
const doneList = document.querySelector("#doneList");
const doneArray = document.querySelectorAll("#doneList .todoItem");
const addBtn = document.querySelector(".addBtn");
const todoTextArray = [];
const doneTextArray = [];

function createBtn(className, text) {
  var button = document.createElement("div");

  button.textContent = text;
  button.setAttribute("class", "listBtns");
  button.classList.add(className);
  return button;
}

function deleteItem() {
  var removeBtns = document.querySelectorAll(".deleteBtn");
  for (i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener("click", function () {
      if (this.parentNode)
        this.parentNode.parentNode.removeChild(this.parentNode);
    });
  }
}

function todoToDone() {
  var doneBtns = document.querySelectorAll(".doneBtn");

  for (var i = 0; i < doneBtns.length; i++) {
    doneBtns[i].addEventListener("click", function () {
      if (this.parentNode.parentNode)
        doneList.insertBefore(this.parentNode, doneList.childNodes[0]);
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
  inputTodo.value = "";
  //deleteBtn 누르면 삭제 구현
  deleteItem();

  //doneBtn 누르면 todo -> done으로
  todoToDone();
}

function init() {
  addBtn.addEventListener("click", newTodo);
}

init();
