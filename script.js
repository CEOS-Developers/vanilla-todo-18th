const addTodoInput = document.getElementById('addTodo'); //add todo input
const plusButton = document.getElementById('plusButton'); //plusbutton press
const clockTarget = document.getElementById("clock-js"); //clock

function addTodo(){
    const todoText = addTodoInput.value.trim();
    if(todoText==""){
        alert("TODO를 입력하세요.");
        return;
    }
    else if(todoText.length > 60){
        alert("60자 이하로 입력해주세요.");
        return;
    }
    //todo card 추가
    const todoCards= document.querySelector(".todoCards");
    const todoCard = document.createElement("div");
    todoCard.classList.add("todoCard");

    const todoElem = document.createElement("div");
    todoElem.classList.add("todoElem");
    todoElem.textContent = todoText;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const todoDelete = document.createElement("button");
    todoDelete.classList.add("todoDelete");
    todoDelete.textContent = "X";

    todoCard.appendChild(todoElem);
    todoCard.appendChild(checkbox);
    todoCard.appendChild(todoDelete);

    todoCards.appendChild(todoCard);
    saveTodos();
    addTodoInput.value="";
}
function saveTodos(){
    const todoCards = document.querySelectorAll(".todoCard");
    const todos = [];
    todoCards.forEach((todoCard)=>{
            const todoElem = todoCard.querySelector(".todoElem").textContent;
            const isChecked = todoCard.querySelector("input[type='checkbox']").checked;
            todos.push({text: todoElem , checked : isChecked});
        }
    )
    localStorage.setItem("data",JSON.stringify(todos));

}
function loadTodos(){
    const localTodos = localStorage.getItem("data");
    if(localTodos){
        const todos = JSON.parse(localTodos);
        todos.forEach((todo)=>{
            const todoCard = document.createElement("div");
            todoCard.classList.add("todoCard");
                
            const todoElem = document.createElement("div");
            todoElem.classList.add("todoElem");
            todoElem.textContent = todo.text;
                
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.checked;
                
            const todoDelete = document.createElement("button");
            todoDelete.classList.add("todoDelete");
            todoDelete.textContent = "X";
                
            todoCard.appendChild(todoElem);
            todoCard.appendChild(checkbox);
            todoCard.appendChild(todoDelete);
            if(todo.checked){
                const doneCards= document.querySelector(".doneCards");
                doneCards.appendChild(todoCard)
                todoCard.classList.add("checked");
                todoElem.style.textDecoration = "line-through";
            }    
            else{
                const todoCards= document.querySelector(".todoCards");
                todoCards.appendChild(todoCard)
                todoElem.style.textDecoration = "none";
            }
        })
    }
    else{//localStorage가 없는경우
        const localTodos = "[]";
        localStorage.setItem("data",localTodos);
    }
}
function handleClick(event){//click 핸들러
    const clickedElement = event.target; // click event element
    if(clickedElement.classList.contains("todoDelete")){
        deleteTodo(clickedElement);
    }
    else if(clickedElement.type==="checkbox"){
        handleCheckBoxClick(clickedElement);
    }
}
function deleteTodo(deleteButton){//Todo 지움
    const todoCard = deleteButton.parentElement;
    const Cards = todoCard.parentElement;
    if(todoCard.checked){//done에서 지우기
        // const doneCards = document.querySelector(".doneCards"); 오류 발생
        Cards.removeChild(todoCard);
    }
    else{
        // const todoCards = document.querySelector(".todoCards");
        Cards.removeChild(todoCard);
    }
    saveTodos();
}
function handleCheckBoxClick(checkedElement){
    const todoCard = checkedElement.parentElement;
    const todoElem = todoCard.querySelector(".todoElem");
    if(checkedElement.checked){//체크되면 done으로 옮기기
        const doneCards = document.querySelector(".doneCards");
        todoCards.removeChild(todoCard);
        doneCards.appendChild(todoCard);//doneCards로 붙이기
        todoCard.classList.add("checked");//checked로 바꾸기
        todoElem.style.textDecoration= "line-through"; //취소선 긋기
    }
    else{//체크 풀리면 todo 으로 옮기기
        const todoCards = document.querySelector(".todoCards");
        doneCards.removeChild(todoCard);
        todoCards.appendChild(todoCard);
        todoCard.classList.remove("checked");
        todoElem.style.textDecoration= "none";
    }
    saveTodos();
};
//plusButton과 add Todo enter 클릭 이벤트 핸들러
plusButton.addEventListener('click',addTodo);
addTodoInput.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        addTodo();
    }
})
//deleteButton,checkbox click 이벤트핸들러
const todoCards = document.querySelector(".todoCards");
const doneCards = document.querySelector(".doneCards");
todoCards.addEventListener("click",handleClick);
doneCards.addEventListener("click",handleClick);
// clock 출력
function clock(){
    const date = new Date();
    const month = date.getMonth();
    const clockDate = date.getDate();
    const day = date.getDay();
    const week = ['일','월','화','수','목','금','토'];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTarget.innerText=`${month+1}/${clockDate} ${week[day]}요일 ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ?  `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;//두자릿수 유지를 위한 삼항연산자
}

function init(){
    clock();
    setInterval(clock,1000);
    loadTodos();
}

init();