const get = (...args) => document.querySelector(...args);

const formNewTask = get(".wrapper-top__form");
const inpNewTask = get(".form__input--new-task");
const inpSearchTask = get(".form__input--search-task");
const btnAddTask = get(".btn--add-task");
const btnClearTaskList = get(".btn--clear-task-list");

const taskList = get(".list");

const activeTasks = [];
const finishedTasks = [];
const deletedTasks = [];

const newElement = (tagName, classNames, text, children = []) => {
  const element = document.createElement(tagName);
  classNames.forEach((className) => element.classList.add(className));
  element.textContent = text;
  children.forEach((child) => element.appendChild(child));
  console.log(tagName, classNames, text, children);

  return element;
};

const renderTask = () => {
  const taskTextFromInput = inpNewTask.value;
  if (taskTextFromInput === "") return alert("Type a task content first.");

  const taskNumber = newElement("span", ["task-number", "task__view"]);
  const taskText = newElement("p", ["task-wrapper__text"], taskTextFromInput);
  const btnFinishTask = newElement("button", ["btn", "task-wrapper__btn", "btn--finish-task"], "Mark as finished");
  const btnDeleteTask = newElement("button", ["btn", "task-wrapper__btn", "btn--delete-task"], "x");
  const btnContainer = newElement("div", ["task-wrapper__btn-container"], "", [btnFinishTask, btnDeleteTask]);
  const taskWrapper = newElement("div", ["task-wrapper", "task__view"], "", [taskText, btnContainer]);
  const task = newElement("li", ["task", "list__item"], "", [taskNumber, taskWrapper]);

  return task;
};

const renderTaskList = () => {
  taskList.textContent = "";

  activeTasks.forEach((activeTasksEl, key) => {
    activeTasksEl.dataset.key = key;
    activeTasksEl.querySelector(".task-number").textContent = `#${key + 1}`;
    taskList.appendChild(activeTasksEl);
  });
};

const addTask = (e) => {
  e.preventDefault();

  const newTask = renderTask();
  if (newTask !== undefined) {
    activeTasks.push(newTask);
    renderTaskList();

    inpNewTask.value = "";
    newTask.querySelector(".btn--finish-task").addEventListener("click", finishTask);
    newTask.querySelector(".btn--delete-task").addEventListener("click", deleteTask);
  }
};

const clearTaskList = (e) => {
  e.preventDefault();
  inpNewTask.value = "";
  taskList.textContent = "";
  activeTasks.length = 0;
};

const finishTask = (e) => {
  const taskState = {
    finished: "Mark as unfinished",
    unfinished: "Mark as finished",
  };

  const taskView = e.target.parentNode.parentNode.parentNode.querySelectorAll(".task__view");

  switch (e.target.textContent) {
    case taskState.unfinished:
      taskView.forEach((view) => {
        view.classList.add("task__view--finished");
      });
      e.target.textContent = taskState.finished;
      break;

    case taskState.finished:
      taskView.forEach((view) => {
        view.classList.remove("task__view--finished");
      });
      e.target.textContent = taskState.unfinished;
      break;
  }
};

const deleteTask = (e) => {
  const taskIndex = e.target.parentNode.parentNode.parentNode.dataset.key;

  activeTasks.splice(taskIndex, 1);

  renderTaskList();
};

const searchTask = (e) => {
  const searchText = e.target.value.toLowerCase();
  let searchedTaskArray = activeTasks.filter((li) => li.textContent.toLowerCase().includes(searchText));
  taskList.textContent = "";
  searchedTaskArray.forEach((li) => taskList.appendChild(li));
};

formNewTask.addEventListener("submit", addTask);
btnClearTaskList.addEventListener("click", clearTaskList);
inpSearchTask.addEventListener("input", searchTask);
