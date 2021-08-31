const get = (...args) => document.querySelector(...args);

const formNewTask = get(".wrapper-top__form");
const inpNewTask = get(".form__input--new-task");
const inpSearchTask = get(".form__input--search-task");
const btnAddTask = get(".btn--add-task");
const btnClearTaskList = get(".btn--clear-task-list");
const deleteBtns = document.getElementsByClassName("btn--delete-task");

const unfinishedTab = get(".wrapper-middle__tab--unfinished");
const finishedTab = get(".wrapper-middle__tab--finished");

const taskList = get(".list");

/* ********** ********** APP STATES ********** ********** */

const taskArray = {
  unfinished: [],
  finished: [],
};

/* ********** ********** FUNCTIONS - HELPERS ********** ********** */

const newElement = (tagName, classNames, text, children = []) => {
  const element = document.createElement(tagName);
  classNames.forEach((className) => element.classList.add(className));
  element.textContent = text;
  children.forEach((child) => element.appendChild(child));

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

const renderTaskList = (taskArrayType) => {
  taskList.textContent = "";

  taskArrayType.forEach((task, key) => {
    task.dataset.key = key;
    task.querySelector(".task-number").textContent = `#${key + 1}`;
    taskList.appendChild(task);
  });
};

const switchTab = (e, listToRender) => {
  const currentTab = e.target;
  const active = "wrapper-middle__tab--active";
  const isCurrentTabActive = currentTab.classList.contains(active);

  if (!isCurrentTabActive) {
    unfinishedTab.classList.toggle(active);
    finishedTab.classList.toggle(active);
    renderTaskList(listToRender);
  } else {
    return;
  }
};

/* ********** ********** FUNCTIONS - ACTIONS ********** ********** */

const addTask = (e) => {
  e.preventDefault();

  const newTask = renderTask();
  if (newTask !== undefined) {
    taskArray.unfinished.push(newTask);
    renderTaskList(taskArray.unfinished);

    inpNewTask.value = "";
    // Wynieść na zewnątrz do EVENT LISTENERS
    newTask.querySelector(".btn--finish-task").addEventListener("click", finishTask);
    newTask.querySelector(".btn--delete-task").addEventListener("click", deleteTask);
  }
};

const clearTaskList = (e) => {
  e.preventDefault();
  const activeTab = get(".wrapper-middle__tab--active");

  taskList.textContent = "";
  inpNewTask.value = "";
  activeTab.textContent.toLowerCase() === "unfinished" ? (taskArray.unfinished.length = 0) : (taskArray.finished.length = 0);
};

const finishTask = (e) => {
  const currentFinishBtn = e.target;

  const task = currentFinishBtn.parentElement.parentElement.parentElement;
  const taskView = task.querySelectorAll(".task__view");
  const taskIndex = task.dataset.key;

  const btnTextPrefix = "Mark as";
  const btnText = {
    finished: `${btnTextPrefix} finished`,
    unfinished: `${btnTextPrefix} unfinished`,
  };

  const activeTab = get(".wrapper-middle__tab--active");

  // ZAMIANA WIDOKU - Wynieść na zewnątrz do HELPERS
  const toggleView = () => {
    taskView.forEach((view) => {
      view.classList.toggle("task__view--finished");
    });
  };

  switch (currentFinishBtn.textContent) {
    case btnText.finished:
      currentFinishBtn.textContent = btnText.unfinished;
      toggleView();

      const cutUnfinishedTask = taskArray.unfinished.splice(taskIndex, 1);
      taskArray.finished.push(cutUnfinishedTask[0]);

      if (activeTab.textContent.toLowerCase() === "unfinished") {
        renderTaskList(taskArray.unfinished);
      }
      break;

    case btnText.unfinished:
      currentFinishBtn.textContent = btnText.finished;
      toggleView();

      const cutFinishedTask = taskArray.finished.splice(taskIndex, 1);
      taskArray.unfinished.push(cutFinishedTask[0]);

      if (activeTab.textContent.toLowerCase() === "finished") {
        renderTaskList(taskArray.finished);
      }
      break;
  }
};

const deleteTask = (e) => {
  const task = e.target.parentNode.parentNode.parentNode;
  const taskIndex = task.dataset.key;
  const activeTab = get(".wrapper-middle__tab--active");

  if (activeTab.textContent.toLowerCase() === "unfinished") {
    taskArray.unfinished.splice(taskIndex, 1);
    renderTaskList(taskArray.unfinished);
  } else if (activeTab.textContent.toLowerCase() === "finished") {
    taskArray.finished.splice(taskIndex, 1);
    renderTaskList(taskArray.finished);
  }
};

const searchTask = (e) => {
  // Jak zatrzymać działanie inputa, jeżeli wciskamy enter
  e.preventDefault();

  const searchText = e.target.value.toLowerCase();
  const activeTab = get(".wrapper-middle__tab--active");

  if (activeTab.textContent.toLowerCase() === "unfinished") {
    let searchedUnfinishedTaskArray = taskArray.unfinished.filter((li) => li.textContent.toLowerCase().includes(searchText));

    taskList.textContent = "";
    searchedUnfinishedTaskArray.forEach((li) => taskList.appendChild(li));
  } else if (activeTab.textContent.toLowerCase() === "finished") {
    let searchedFinishedTaskArray = taskArray.finished.filter((li) => li.textContent.toLowerCase().includes(searchText));

    taskList.textContent = "";
    searchedFinishedTaskArray.forEach((li) => taskList.appendChild(li));
  }
};

/* ********** ********** EVENT LISTENERS ********** ********** */

formNewTask.addEventListener("submit", addTask);
btnClearTaskList.addEventListener("click", clearTaskList);
inpSearchTask.addEventListener("input", searchTask);

unfinishedTab.addEventListener("click", (e) => {
  switchTab(e, taskArray.unfinished);
});

finishedTab.addEventListener("click", (e) => {
  switchTab(e, taskArray.finished);
});
