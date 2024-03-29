import './style.css';
import ToDoList from './modules/toDoList.js';
import showDate from './modules/dateTime.js';
import { editUi, updateUi } from './modules/edit_update.js';
import setStatus from './modules/statusUpdate.js';

const addItem = document.getElementById('enter-item');
const addItemBtn = document.getElementById('add-item');
const newToDoList = new ToDoList();
newToDoList.restoreList();

addItem.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (addItem.value) {
      newToDoList.addItem(addItem.value);
    }
    addItem.value = '';
  }
});

addItemBtn.addEventListener('click', (event) => {
  if (event.target.previousElementSibling.value) {
    newToDoList.addItem(event.target.previousElementSibling.value);
  }
  addItem.value = '';
});

const ulList = document.getElementById('list-items');

ulList.addEventListener('click', (event) => {
  if (event.target.id === 'label') {
    editUi(event);
  }
  if (event.target.id === 'delete') {
    const li = event.target.parentNode;
    const index = li.querySelector('.view').id;
    newToDoList.deleteItem(index);
  }
});

ulList.addEventListener('blur', (event) => {
  if (event.target.id === 'edit') {
    updateUi(event);
    newToDoList.updateItem(event.target.parentNode.id, event.target.value);
  }
}, true);

ulList.addEventListener('change', (event) => {
  if (event.target.id === 'checkbox') {
    const index = setStatus(event);
    newToDoList.markComplited(index, event.target.checked);
  }
});

const clearCompletedItem = document.getElementById('clear-completed');
clearCompletedItem.addEventListener('click', (e) => {
  e.preventDefault();
  newToDoList.clearCompleted();
});

showDate();

// ulList.addEventListener('change', (event) => {
//   if (event.target.id === 'checkbox') {
//     const index = setStatus(event);
//     newToDoList.markComplited(index, event.target.checked);
//   }
// });
