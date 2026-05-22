let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ADD TASK
window.addTask = function () {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;

    if (!title || !description) {
        alert("Please enter title and description");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        status
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadTasks();
};

// LOAD TASKS
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

            <button onclick="updateStatus(${task.id})">Mark Completed</button>
            <button onclick="deleteTask(${task.id})">Delete</button>

            <hr>
        </div>
        `;
    });

    taskList.innerHTML = output;
}

// UPDATE
window.updateStatus = function (id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, status: "Completed" } : task
    );

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
};

// DELETE
window.deleteTask = function (id) {
    tasks = tasks.filter(task => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
};

// INIT
window.onload = function () {
    loadTasks();
};