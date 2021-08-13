const formNewTask = document.querySelector(".wrapper-top__form");
const inpNewTask = document.querySelector(".form__input--new-task");
const inpSearchTask = document.querySelector(".form__input--search-task");
const btnAddTask = document.querySelector(".btn--add-task");
const btnClearTaskList = document.querySelector(".btn--clear-task-list");

const taskArray = [];
let taskList = document.querySelector(".list");

const addTask = (e) => {
  e.preventDefault();

  const newTask = renderTask();
  console.log(newTask);
  if (newTask !== undefined) {
    taskArray.push(newTask);
    renderTaskList();

    inpNewTask.value = "";
    newTask.querySelector(".btn--finish-task").addEventListener("click", finishTask);
  }
};

const renderTask = () => {
  const taskText = inpNewTask.value;
  console.log(taskText);
  if (taskText === "") {
    alert("Type a task content first.");
  } else {
    let taskNumber = taskArray.length + 1;
    const task = document.createElement("li");
    task.classList.add("task", "list__item");
    task.innerHTML = `<span class="task-number task__view">#${taskNumber}</span>
  <div class="task-content task__view">
  <p class="task-content__text">${taskText}</p>
  <div class="task-content__btn-container">
  <button class="btn task-content__btn btn--finish-task">Mark as finished</button>
  <button class="btn task-content__btn btn--delete-task">x</button>
  </div>
  </div>`;

    return task;
  }
};

const renderTaskList = () => {
  taskList.textContent = "";
  console.log(taskArray);
  taskArray.forEach((taskArrayEl, key) => {
    taskArrayEl.dataset.key = key;
    taskList.appendChild(taskArrayEl);
  });
};

const clearTaskList = (e) => {
  e.preventDefault();
  inpNewTask.value = "";
  taskList.textContent = "";
  taskArray.length = 0;
};

const finishTask = (e) => {
  switch (e.target.textContent) {
    case "Mark as finished":
      const taskViewFinished =
        e.target.parentNode.parentNode.parentNode.querySelectorAll(".task__view");
      taskViewFinished.forEach((view) => {
        view.classList.add("task__view--finished");
      });
      e.target.textContent = "Mark as unfinished";
      break;
    case "Mark as unfinished":
      const taskViewUnfinished =
        e.target.parentNode.parentNode.parentNode.querySelectorAll(".task__view");
      taskViewUnfinished.forEach((view) => {
        view.classList.remove("task__view--finished");
      });
      e.target.textContent = "Mark as finished";
      break;
  }
};

formNewTask.addEventListener("submit", addTask);
btnClearTaskList.addEventListener("click", clearTaskList);
