/* eslint-disable prettier/prettier */
export default class Task {
  constructor(text) {
    this._element;
    this._createTask(text);
    this.isPinned = false;
    this.text = text;
  }

  _createTask(text) {
    const task = document.createElement('div');
    task.classList.add('task');
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task_span');
    taskSpan.textContent = text;
    const taskPin = document.createElement('div');
    taskPin.classList.add('task_pin');
    const deleteTask = document.createElement('div');
    deleteTask.classList.add('task_delete');
    task.appendChild(taskSpan);
    task.appendChild(taskPin);
    task.appendChild(deleteTask);
    this._element = task;
  }

  static changeStatus(elem) {
    this.isPinned = !this.isPinned;
    elem.classList.toggle('pinned');
  }

  setId() {
    this.id = this._generateId();
  }

  _generateId() {
    return `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
  }

  get element() {
    return this._element;
  }
}