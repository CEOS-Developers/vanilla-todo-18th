//DOM요소 가져오기
const dateInfo = document.getElementById('date');
const input = document.querySelector('input');
const form = document.querySelector('form');

//할일 목록용 배열
const todoList = [];
const doneList = [];

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
  addTodo();
});

//할일을 입력받아 todoList에 추가 후 리렌더링
const addTodo = () => {
  //입력값 유효성 검사
  if (input.value.trim() === '') {
    return;
  }

  todoList.push(input.value); //배열추가
  localStorage.setItem('todos', JSON.stringify(todoList)); //로컬스토리지 배열 업데이트
  input.value = ''; //입력필드 초기화
};

clock();
