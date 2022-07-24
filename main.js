const task = document.querySelector(".input");
const add = document.querySelector(".add");
const tasksHolder = document.querySelector(".tasks-holder");
let tasksArray = [];

let createTask = (taskText, id, completed) => {
  // Adding the task to page
  let MainDiv = document.createElement("div");
  MainDiv.className = "task";
  MainDiv.id = id;

  let taskContent = document.createElement("div");
  taskContent.className = "task-content";
  taskContent.appendChild(document.createTextNode(taskText));

  let buttons = document.createElement("div");
  buttons.className = "buttons";
  let btn1 = document.createElement("button");
  btn1.className = "done";
  btn1.appendChild(document.createTextNode("Done"));
  let btn2 = document.createElement("button");
  btn2.className = "delete";
  btn2.appendChild(document.createTextNode("delete"));
  buttons.appendChild(btn1);
  buttons.appendChild(btn2);

  MainDiv.appendChild(taskContent);
  MainDiv.appendChild(buttons);

  if (completed == true) {
    MainDiv.classList.add("completed");
  }

  tasksHolder.appendChild(MainDiv);
};

if (window.localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(window.localStorage.getItem("tasks"));

  for (let i = 0; i < tasksArray.length; i++) {
    createTask(
      tasksArray[i].taskName,
      tasksArray[i].id,
      tasksArray[i].completed
    );
  }
}

add.onclick = () => {
  if (task.value !== "") {
    addTaskToArray(task.value);
    // Clear field
    task.value = "";
  }
};

tasksHolder.onclick = function (e) {
  if (e.target.classList.contains("delete")) {
    // Delete from page
    e.target.parentElement.parentElement.remove();
    // Delete from array
    tasksArray = tasksArray.filter((ele) => {
      return ele.id != e.target.parentElement.parentElement.id;
    });
    // Updating localStorage
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  if (e.target.classList.contains("done")) {
    e.target.parentElement.parentElement.classList.toggle("completed");

    if (e.target.parentElement.parentElement.classList.contains("completed")) {
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id == e.target.parentElement.parentElement.id) {
          tasksArray[i].completed = true;
        }
      }
    } else {
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id == e.target.parentElement.parentElement.id) {
          tasksArray[i].completed = false;
        }
      }
    }
  }

  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

let addTaskToArray = (taskText) => {
  let newTask = {
    id: Date.now(),
    taskName: taskText,
    completed: false,
  };

  createTask(newTask.taskName, newTask.id, newTask.completed);
  tasksArray.push(newTask);
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
};