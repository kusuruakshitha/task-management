let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ADD TASK */
function addTask() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const status = document.getElementById("status");

  if (!title.value.trim() || !description.value.trim()) {
    alert("Please enter title and description");
    return;
  }

  const task = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    status: status.value
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  title.value = "";
  description.value = "";

  loadTasks();
}

/* LOAD TASKS */
function loadTasks() {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks added yet</p>";
    return;
  }

  taskList.innerHTML = tasks.map(task => `
    <div class="task">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>

      <button class="btn btn-success btn-sm" onclick="updateStatus(${task.id})">Mark Completed</button>
      <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
    </div>
  `).join("");
}

/* UPDATE STATUS */
function updateStatus(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, status: "Completed" } : task
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

/* DELETE TASK */
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

/* INIT */
window.onload = loadTasks;
