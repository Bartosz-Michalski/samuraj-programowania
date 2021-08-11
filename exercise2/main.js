const input = document.querySelector("input");
const list = document.querySelector("ul");
const listItems = document.querySelectorAll("li");

const searchTask = (e) => {
  const searchText = e.target.value.toLowerCase();
  let tasks = [...listItems];
  tasks = tasks.filter((task) => task.textContent.toLowerCase().includes(searchText));
  list.textContent = "";
  tasks.forEach((task) => list.appendChild(task));
};

input.addEventListener("input", searchTask);
