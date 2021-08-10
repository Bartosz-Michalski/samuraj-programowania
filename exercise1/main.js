const removeTask = (e) => {
  e.target.parentNode.remove();

  //   const index = e.target.dataset.key;
  //   document.querySelector(`li[data-key="${index}"]`).remove()
};

document
  .querySelectorAll(".delete")
  .forEach((item) => item.addEventListener("click", removeTask));

//   document
//     .querySelectorAll("button[data-key]")
//     .forEach((item) => item.addEventListener("click", removeTask));

const lineThroughTask = (e) => {
  e.target.parentNode.style.textDecoration = "line-through";
};

document
  .querySelectorAll(".done")
  .forEach((item) => item.addEventListener("click", lineThroughTask));
