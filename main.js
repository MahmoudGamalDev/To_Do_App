const task = document.querySelector(".input");
const add = document.querySelector(".add");
const tasksHolder = document.querySelector(".tasks-holder");

add.onclick = () => {
  if (task.value !== "") {
    createTask(task.value);
  }
};

let createTask = (taskText) => {
  let MainDiv = document.createElement("div");
  MainDiv.className = "task";

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

  tasksHolder.appendChild(MainDiv);

  task.value = ""
};
