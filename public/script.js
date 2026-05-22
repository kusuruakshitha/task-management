let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* =========================
   ADD TASK
========================= */
function addTask() {

    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const status = document.getElementById("status");

    if (!title || !description || !status) {
        alert("HTML elements missing (check IDs)");
        return;
    }

    const titleValue = title.value.trim();
    const descValue = description.value.trim();
    const statusValue = status.value;

    if (!titleValue || !descValue) {
        alert("Please enter title and description");
        return;
    }

    const task = {
        id: Date.now(),
        title: titleValue,
        description: descValue,
        status: statusValue
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    title.value = "";
    description.value = "";

    loadTasks();
};

/* =========================
   LOAD TASKS
========================= */
function loadTasks() {

    const taskList = document.getElementById("taskList");

    if (!taskList) return;

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks added yet</p>";
        return;
    }

    let output = "";

    tasks.forEach(task => {
        output += `
            <div style="margin-bottom:10px;">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>

                <button onclick="updateStatus(${task.id})">
                    Mark Completed
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

                <hr>
            </div>
        `;
    });

    taskList.innerHTML = output;
}

/* =========================
   UPDATE STATUS
========================= */
window.updateStatus = function (id) {

    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, status: "Completed" }
            : task
    );

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
};

/* =========================
   DELETE TASK
========================= */
window.deleteTask = function (id) {

    tasks = tasks.filter(task => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
};

/* =========================
   INIT
========================= */
window.onload = function () {
    loadTasks();
};