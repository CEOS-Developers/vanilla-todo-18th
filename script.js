//DOM요소 가져오기
const dateInfo = document.getElementById('date');
const input = document.querySelector('input');
const form = document.querySelector('form');
const todoContent = document.querySelector('.todoContent');
const doneContent = document.querySelector('.doneContent');
const todoNum = document.getElementById('todoNum');
const doneNum = document.getElementById('doneNum');

//할일 목록용 배열 초기화
let todoList = [];
let doneList = [];

//날짜 띄우는 함수
const clock = () => {
  let current = new Date(); //현재 날짜 와 시간
  let year = current.getFullYear(); //연도
  let month = current.getMonth(); //월
  let date = current.getDate(); //일
  let day = current.getDay(); //요일
  var hours = current.getHours(); // 시간
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  dateInfo.innerText = `${year}.${month}.${date} ${dayList[day]} ${hours}시`;

  //낮or밤에 따라 배경 전환
};

//submit이벤트 핸들러
form.addEventListener('submit', function (event) {
  // 기본 제출 동작을 막고 할일 추가함수 실행
  event.preventDefault();
  inputTodo();
});

//할일을 입력받아 todoList에 추가 후 리렌더링
const inputTodo = () => {
  //입력값 유효성 검사
  if (input.value.trim() === '') {
    return;
  }

  todoList.push(input.value); //배열추가
  localStorage.setItem('todos', JSON.stringify(todoList)); //로컬스토리지 배열 업데이트
  input.value = ''; //입력필드 초기화

  renderTodo(); //투두리스트 리렌더링
};

//로컬스토리지 내 todo 목록 띄우기
const renderTodo = () => {
  todoList = JSON.parse(localStorage.getItem('todos'));
  todoNum.innerText = todoList.length;
  todoContent.innerHTML = ''; //html 초기화
  todoList.forEach((todo, index) => {
    //요소 생성 후 띄우기
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      addDone(todo);
      removeTodo(index);
    });

    const span = document.createElement('span');
    span.innerText = todo;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', () => removeTodo(index));

    // li 요소에 체크박스, 제목, 삭제 버튼을 추가한다
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // todoContent (ul 요소)에 li 요소를 추가한다
    todoContent.appendChild(li);
  });
};

//로컬스토리지 내 done 목록 띄우기
const renderDone = () => {
  doneList = JSON.parse(localStorage.getItem('dones'));
  doneNum.innerText = doneList.length;
  doneContent.innerHTML = ''; //html 초기화
  doneList.forEach((done, index) => {
    //요소 생성 후 띄우기
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      addTodo(done);
      removeDone(index);
    });

    const span = document.createElement('span');
    span.innerText = done;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', () => removeDone(index));

    // li 요소에 체크박스, 제목, 삭제 버튼을 추가한다
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // todoContent (ul 요소)에 li 요소를 추가한다
    doneContent.appendChild(li);
  });
};

//todoList삭제함수
const removeTodo = (index) => {
  //filter메소드로 삭제한 배열로 업데이트
  todoList = todoList.filter((data) => {
    return data !== todoList[index];
  });
  //localStorage다시 저장
  localStorage.setItem('todos', JSON.stringify(todoList));
  renderTodo(); //todoList 리렌더링
};

//doneList삭제함수
const removeDone = (index) => {
  //filter메소드로 삭제한 배열로 업데이트
  doneList = doneList.filter((data) => {
    return data !== doneList[index];
  });
  //localStorage다시 저장
  localStorage.setItem('dones', JSON.stringify(doneList));
  renderDone(); //doneList 리렌더링
};

const addDone = (elem) => {
  doneList.push(elem); //done 배열에 추가

  localStorage.setItem('dones', JSON.stringify(doneList)); //로컬스토리지 배열 업데이트
  renderDone(); //doneList 리렌더링
};

const addTodo = (elem) => {
  todoList.push(elem); //done 배열에 추가

  localStorage.setItem('todos', JSON.stringify(todoList)); //로컬스토리지 배열 업데이트
  renderTodo(); //doneList 리렌더링
};
