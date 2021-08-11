const form = document.querySelector("form");
const input = document.querySelector("input");
const tasksNumber = document.querySelector("h1 span");
const taskList = document.querySelector("ul");
const tasks = document.getElementsByClassName("task");

const removeTask = (e) => {
  e.target.parentNode.remove();
  tasksNumber.textContent = tasks.length;
};

const addTask = (e) => {
  e.preventDefault();
  const taskTitle = input.value;

  if (taskTitle === "") return;

  const task = document.createElement("li");
  task.className = "task";
  task.innerHTML = `${taskTitle} <button>x</button>`;
  taskList.appendChild(task);
  input.value = "";
  tasksNumber.textContent = tasks.length;
  task.querySelector("button").addEventListener("click", removeTask);
};

form.addEventListener("submit", addTask);
