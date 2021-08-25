const get = (...args) => document.querySelector(...args);

let taskList = document.querySelector(".list");
const taskArray = [];

const addTask = (e) => {
  e.preventDefault();

  const newTask = renderTask();

  if (newTask !== undefined) {
    taskArray.push(newTask);
    renderTaskList();

    inpNewTask.value = "";
    newTask.querySelector(".btn--finish-task").addEventListener("click", finishTask);
    newTask.querySelector(".btn--delete-task").addEventListener("click", deleteTask);
  }
};

const renderTask = () => {
  const taskText = inpNewTask.value;
  console.log(taskText);
  if (taskText === "") {
    alert("Type a task content first.");
  } else {
    const task = document.createElement("li");
    task.classList.add("task", "list__item");
    task.innerHTML = `<span class="task-number task__view"></span>
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

  taskArray.forEach((taskArrayEl, key) => {
    taskArrayEl.dataset.key = key;
    taskArrayEl.querySelector(".task-number").textContent = `#${key + 1}`;
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

const deleteTask = (e) => {
  const taskIndex = e.target.parentNode.parentNode.parentNode.dataset.key;

  taskArray.splice(taskIndex, 1);

  renderTaskList();
};

const searchTask = (e) => {
  const searchText = e.target.value.toLowerCase();
  let searchedTaskArray = taskArray.filter((li) =>
    li.textContent.toLowerCase().includes(searchText)
  );
  taskList.textContent = "";
  searchedTaskArray.forEach((li) => taskList.appendChild(li));
};

formNewTask.addEventListener("submit", addTask);
btnClearTaskList.addEventListener("click", clearTaskList);
inpSearchTask.addEventListener("input", searchTask);
