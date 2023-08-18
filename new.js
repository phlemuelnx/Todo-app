const inputBox = document.querySelector("#input-box");
const addBtn = document.querySelector("#submit-btn");
const listContainer = document.querySelector("#list-container");
const clearBtn = document.querySelector("#clear-btn");
const todoList = document.querySelector(".todo-list");
const form = document.querySelector(".row");

let isAlertDisplayed = false;

function showAlert(message, className) {
  if (isAlertDisplayed) return;

  isAlertDisplayed = true;
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", className);
  alertDiv.textContent = message;

  todoList.insertBefore(alertDiv, form);

  setTimeout(() => {
    isAlertDisplayed = false;
    alertDiv.remove();
  }, 2000);
}

///////////////////////
function toggleClearButton() {
  const listItems = listContainer.querySelectorAll(".list-item");
  clearBtn.style.display = listItems.length > 0 ? "block" : "none";
}

toggleClearButton();

function createListItem() {
  const li = document.createElement("li");
  li.className = "list-item";
  listContainer.appendChild(li);

  const task = document.createElement("p");
  task.className = "tasks";
  task.innerHTML = inputBox.value;
  li.appendChild(task);
  showAlert("Task added!", "success");

  const link = document.createElement("a");
  link.className = "delete-icon";
  link.innerHTML = "\u00d7";
  li.appendChild(link);

  toggleClearButton();
}

addBtn.addEventListener("click", function () {
  if (inputBox.value === "") {
    showAlert('"Add your task" cannot be empty', "error");
  } else {
    createListItem();
    inputBox.value = "";
  }
});

todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-icon")) {
    const listItem = e.target.parentElement;
    listItem.remove();
    showAlert("Task Deleted", "error");
    toggleClearButton();
  }
});

// Clear button to delete all list-items
clearBtn.addEventListener("click", function () {
  const listItems = listContainer.getElementsByClassName("list-item");
  while (listItems.length > 0) {
    listItems[0].remove();
  }
  toggleClearButton();
});
