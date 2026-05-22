let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const API = "http://localhost:3000";

// ADD TASK
function addTask() {

    const task = {
        id: Date.now(),
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// LOAD TASKS
function loadTasks() {

    let output = "";

    tasks.forEach(task => {

        output += `
        <div>
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

    document.getElementById("taskList").innerHTML = output;
}

// UPDATE STATUS
function updateStatus(id) {

    tasks = tasks.map(task => {
        if (task.id === id) {
            task.status = "Completed";
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// DELETE TASK
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

loadTasks();