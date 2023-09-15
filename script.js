let currentTasks = [];
let completedTasks = [];
const maxCompletedTasksToShow = 5;

const taskForm = document.querySelector(".todo");
const taskList = document.querySelector(".todo-list");
const completedList = document.querySelector(".solved-list");
const submitButton = document.querySelector("button");

const resetInputText = () => {
  const taskInput = document.querySelector(".todo > input");
  taskInput.value = "";
};

const addTaskToList = (text) => {
  if (!currentTasks.includes(text)) {
    const listItem = document.createElement("li");
    listItem.innerHTML = text;
    currentTasks.push(text);
    taskList.appendChild(listItem);
  }
};

const addCompletedTaskToList = (text) => {
  if (!completedTasks.includes(text)) {
    const listItem = document.createElement("li");
    const textElement = document.createElement("p");
    textElement.innerHTML = text;
    const deleteImg = document.createElement("img");
    deleteImg.src = "./images/delete.png";
    const restoreImg = document.createElement("img");
    restoreImg.src = "./images/restore.png";
    listItem.appendChild(deleteImg);
    listItem.appendChild(restoreImg);
    listItem.appendChild(textElement);
    completedTasks.push(text);
    completedList.appendChild(listItem);
    const filteredTasks = currentTasks.filter((task) => task !== text);
    currentTasks = filteredTasks; 
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks)); 
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
     if (completedList.children.length > maxCompletedTasksToShow) {
      completedList.lastChild.remove();
    }
  }
};

const loadTasks = (item) => {
  const storedTasks = localStorage.getItem(item);
  const parsedTasks = JSON.parse(storedTasks);
  parsedTasks.forEach((task) => {
    addTaskToList(task);
  });
};

const loadCompletedTasks = (item) => {
  const storedCompletedTasks = localStorage.getItem(item);
  const parsedCompletedTasks = JSON.parse(storedCompletedTasks);
  parsedCompletedTasks.forEach((completedTask) => {
    addCompletedTaskToList(completedTask);
  });
};

const updateTaskCount = () => {
  const taskCount = document.querySelector(".todo-number");
  taskCount.innerHTML = currentTasks.length;
};

const submitHandler = (event) => {
  event.preventDefault();
  const taskText = event.target.children[0].value;
  if (taskText.length < 3) {
    alert("3글자 이상 입력하세요.");
    return;
  } else if (taskText.length > 25) {
    alert("25글자 이하로 요약해서 입력해주세요.");
    return;
  }
  addTaskToList(taskText);
  localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
  updateTaskCount();
  resetInputText();
};

const taskClickHandler = (event) => {
  const filteredTasks = currentTasks.filter(
    (task) => task !== event.target.innerHTML
  );
  addCompletedTaskToList(event.target.innerHTML);
  currentTasks.length = 0;
  currentTasks.push(...filteredTasks);
  localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
  completedTasks.push(event.target.innerHTML);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  event.target.remove();
  updateTaskCount();
};

const completedTaskClickHandler = (event) => {
  if (
    event.target.tagName === "IMG" &&
    event.target.src.includes("delete.png")
  ) {
    const deletedTask =
      event.target.nextElementSibling.nextElementSibling.innerHTML;
    const filteredCompletedTasks = completedTasks.filter(
      (task) => task !== deletedTask
    );
    completedTasks = filteredCompletedTasks;
    console.log(completedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    event.target.parentElement.remove();
  } else if (
    event.target.tagName == "IMG" &&
    event.target.src.includes("restore.png")
  ) {
    const restoredTask = event.target.nextElementSibling.innerHTML;
    const filteredCompletedTasks = completedTasks.filter(
      (task) => task !== restoredTask
    );
    completedTasks = filteredCompletedTasks;
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    addTaskToList(restoredTask);
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
    event.target.parentElement.remove();
    updateTaskCount();
  }
};

taskForm.addEventListener("submit", submitHandler);
taskList.addEventListener("click", taskClickHandler);
completedList.addEventListener("click", completedTaskClickHandler);

(() => {
  loadTasks("currentTasks");
  loadCompletedTasks("completedTasks");
  updateTaskCount();
})();
