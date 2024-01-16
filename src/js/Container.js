/* eslint-disable prettier/prettier */
/* eslint-disable getter-return */
export default class Container {
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