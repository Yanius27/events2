/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Task.js
/* eslint-disable prettier/prettier */
class Task {
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
;// CONCATENATED MODULE: ./src/js/Container.js
/* eslint-disable prettier/prettier */
/* eslint-disable getter-return */
class Container {
  constructor() {
    this._element;
    this._createContainer();
  }
  _createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    const title = document.createElement('span');
    title.classList.add('title');
    title.textContent = 'TOP Tasks';
    const input = document.createElement('input');
    input.classList.add('container_input');
    container.appendChild(title);
    container.appendChild(input);
    const pinnedTasks = document.createElement('div');
    pinnedTasks.classList.add('container_pinnedTasks');
    const pinnedTasksTitle = document.createElement('span');
    pinnedTasksTitle.classList.add('title');
    pinnedTasksTitle.textContent = 'Pinned:';
    const pinnedTasksList = document.createElement('div');
    pinnedTasksList.classList.add('pinnedTasksList');
    pinnedTasks.appendChild(pinnedTasksTitle);
    pinnedTasks.appendChild(pinnedTasksList);
    const allTasks = document.createElement('div');
    allTasks.classList.add('container_allTasks');
    const allTasksTitle = document.createElement('span');
    allTasksTitle.classList.add('title');
    allTasksTitle.textContent = 'All Tasks:';
    const allTasksList = document.createElement('div');
    allTasksList.classList.add('allTasksList');
    allTasks.appendChild(allTasksTitle);
    allTasks.appendChild(allTasksList);
    container.appendChild(pinnedTasks);
    container.appendChild(allTasks);
    this._element = container;
  }
  get element() {
    return this._element;
  }
}
;// CONCATENATED MODULE: ./src/js/App.js
/* eslint-disable prettier/prettier */


class App {
  constructor() {
    this.container = new Container();
    this.tasks = [];
    this.drawTasks();
  }
  drawContainer() {
    document.children[0].children[1].appendChild(this.container.element);
  }
  inputListeners() {
    this.container.element.addEventListener('click', event => {
      if (event.target.classList.contains('task_pin')) {
        const objTask = this.tasks.find(elem => elem.text === event.target.parentNode.textContent);
        objTask.isPinned = !objTask.isPinned;
        this.setStorage();
        this.drawTasks();
      } else if (event.target.classList.contains('task_delete')) {
        console.log(this.tasks, event.target.parentNode);
        this.tasks = this.tasks.filter(elem => elem.id !== event.target.parentNode.id);
        this.setStorage();
        event.target.parentNode.remove();
      }
    });
    const input = document.querySelector('.container_input');
    input.addEventListener('keyup', event => {
      if (event.code === 'Enter' && event.target.value !== '') {
        const task = new Task(event.target.value);
        task.setId();
        this.tasks.push({
          text: task.text,
          id: task.id,
          isPinned: task.isPinned
        });
        this.setStorage();
        this.drawTasks();
        event.target.value = '';
      } else if (event.code === 'Enter' && event.target.value === '') {
        this.showMessage();
      } else if (event.code.startsWith('Key') || event.code.startsWith('Digit') || event.code === 'Backspace' && event.target.value !== '') {
        const filterTasks = this.filter(event.target.value);
        Array.from(document.querySelectorAll('.notPinned')).forEach(el => el.parentNode.remove());
        if (filterTasks.length > 0) {
          filterTasks.forEach(el => {
            const task = new Task(el.text);
            task.id = el.id;
            task.isPinned = el.isPinned;
            task.element.children[1].classList.remove('pinned');
            task.element.children[1].classList.add('notPinned');
            task.element.setAttribute('id', task.id);
            this.container.element.querySelector('.allTasksList').appendChild(task.element);
          });
        } else {
          return;
        }
      } else if (event.code === 'Backspace' && event.target.value === '') {
        this.drawTasks();
      }
    });
  }
  setStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  getStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      this.tasks = tasks;
    }
  }
  drawTasks() {
    this.getStorage();
    if (this.tasks.length > 0) {
      Array.from(document.querySelectorAll('.task')).forEach(el => el.remove());
      this.tasks.forEach(el => {
        const task = new Task(el.text);
        task.id = el.id;
        task.isPinned = el.isPinned;
        task.element.setAttribute('id', task.id);
        if (task.isPinned) {
          this.container.element.querySelector('.pinnedTasksList').textContent = '';
          task.element.children[1].classList.remove('notPinned');
          task.element.children[1].classList.add('pinned');
          this.container.element.querySelector('.pinnedTasksList').appendChild(task.element);
        } else {
          task.element.children[1].classList.remove('pinned');
          task.element.children[1].classList.add('notPinned');
          this.container.element.querySelector('.allTasksList').appendChild(task.element);
        }
      });
      if (this.container.element.querySelector('.pinned') === null) {
        this.container.element.querySelector('.pinnedTasksList').textContent = 'No pinned tasks';
      }
      return;
    }
    this.container.element.querySelector('.pinnedTasksList').textContent = 'No pinned tasks';
    this.container.element.querySelector('.allTasksList').textContent = '';
  }
  showMessage() {
    const popUp = document.createElement('div');
    popUp.classList.add('error');
    popUp.textContent = 'Необходимо ввести значение!';
    this.container.element.appendChild(popUp);
    setTimeout(() => popUp.remove(), 2500);
  }
  filter(value) {
    const notPinnedTasks = this.tasks.filter(el => el.isPinned === false);
    return notPinnedTasks.filter(el => el.text.startsWith(value));
  }
}
;// CONCATENATED MODULE: ./src/index.js


const app = new App();
app.drawContainer();
app.inputListeners();
app.drawTasks();
/******/ })()
;