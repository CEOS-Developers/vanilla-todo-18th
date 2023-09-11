// localStorage에서 todo elements 가져오기, 시간을 Date형식으로 변환하기 위해 map 함수를 사용
const unparsedTODOS = localStorage.getItem('todos');
const TODOS = unparsedTODOS
  ? JSON.parse(unparsedTODOS).map((todo, idx) => ({
      ...todo,
      idx,
      date: new Date(todo.date),
    }))
  : [];

let nextIdx = TODOS.length;

const ul = document.querySelector('.todoList');

for (const todo of TODOS) {
  const newLi = document.createElement('li');
  const contentDiv = document.createElement('div');
  const dateDiv = document.createElement('div');
  const doneBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  contentDiv.innerHTML = todo.content;
  contentDiv.className = 'content';
  dateDiv.innerHTML = todo.date.toISOString();
  dateDiv.className = 'date';
  doneBtn.innerHTML = 'done';
  doneBtn.className = 'doneBtn';
  deleteBtn.innerHTML = 'delete';
  deleteBtn.className = 'deleteBtn';

  newLi.appendChild(contentDiv);
  newLi.appendChild(dateDiv);
  newLi.appendChild(doneBtn);
  newLi.appendChild(deleteBtn);

  newLi.id = todo.idx;
  if (todo.priority === 3) newLi.classList.add('high');
  else if (todo.priority === 2) newLi.classList.add('mid');
  else newLi.classList.add('low');

  if (todo.isDone) newLi.classList.add('done');
  ul.appendChild(newLi);
}

const doneBtns = document.querySelectorAll('.doneBtn');
doneBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const idx = e.currentTarget.parentNode.id;
    const clickedLi = document.getElementById(idx);
    if (clickedLi.classList.contains('done'))
      clickedLi.classList.remove('done');
    else clickedLi.classList.add('done');

    for (const todo of TODOS) {
      if (todo.idx == idx) todo.isDone = !todo.isDone;
    }
  });
});

const deleteBtns = document.querySelectorAll('.deleteBtn');
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const idx = e.currentTarget.parentNode.id;
    const clickedLi = document.getElementById(idx);
    ul.removeChild(clickedLi);

    let i;
    for (i = 0; i < TODOS.length; i++) {
      if (TODOS[i].idx == idx) break;
    }
    TODOS.splice(i, 1);
    localStorage.setItem('todos', JSON.stringify(TODOS));
  });
});
