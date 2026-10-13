// Select Elements
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAllBtn = document.querySelector(".del-all");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// Delete All Tasks
if (deleteAllBtn) {
  deleteAllBtn.onclick = function () {
    tasksDiv.innerHTML = "";
    arrayOfTasks = [];
    window.localStorage.removeItem("tasks");
    addElementsToPageFrom(arrayOfTasks);
  };
}

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage & Array
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Re-render elements
    addElementsToPageFrom(arrayOfTasks);
  }

  // Toggle Task Status
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";

  if (arrayOfTasks.length === 0) {
    if (deleteAllBtn) deleteAllBtn.style.display = "none";
  } else {
    if (deleteAllBtn) deleteAllBtn.style.display = "inline-block";
  }

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    arrayOfTasks = JSON.parse(data);
    addElementsToPageFrom(arrayOfTasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
