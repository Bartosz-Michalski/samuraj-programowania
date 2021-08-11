const toDoList = [];

const form = document.querySelector("form");
const input = document.querySelector("input");

const tasks = document.getElementsByClassName("task");
const taskList = document.querySelector("ul");
const tasksNumber = document.querySelector("h1 span");

const removeTask = (e) => {
  const index = e.target.parentNode.dataset.key;
  toDoList.splice(index, 1);

  renderToDoList();

  tasksNumber.textContent = tasks.length;
};

const addTask = (e) => {
  e.preventDefault();
  const taskTitle = input.value;

  if (taskTitle === "") return;

  const task = document.createElement("li");
  task.className = "task";
  task.innerHTML = `${taskTitle} <button>x</button>`;
  toDoList.push(task);

  renderToDoList();

  input.value = "";
  tasksNumber.textContent = tasks.length;
  task.querySelector("button").addEventListener("click", removeTask);

  console.log(toDoList);
};

const renderToDoList = () => {
  taskList.textContent = "";
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    taskList.appendChild(toDoElement);
  });
};

form.addEventListener("submit", addTask);
