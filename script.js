// localStorage에서 todo elements 가져오기, 시간을 Date형식으로 변환하기 위해 map 함수를 사용
const TODOS = JSON.parse(window.localStorage.getItem('todos')).map((todo) => ({
  ...todo,
  date: new Date(todo.date),
}));

for (const todo of TODOS) {
  const ul = document.querySelector('.todoList');
  const newLi = document.createElement('li');
  const contentDiv = document.createElement('div');
  const dateDiv = document.createElement('div');
  const doneBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  contentDiv.innerHTML = todo.content;
  dateDiv.innerHTML = todo.date.toISOString();
  doneBtn.innerHTML = 'done';
  doneBtn.classList;
  deleteBtn.innerHTML = 'delete';

  newLi.appendChild(contentDiv);
  newLi.appendChild(dateDiv);
  newLi.appendChild(doneBtn);
  newLi.appendChild(deleteBtn);

  if (todo.priority === 3) newLi.classList.add = 'high';
  else if (todo.priority === 2) newLi.classList.add = 'mid';
  else newLi.classList.add = 'low';
  ul.appendChild(newLi);
}
