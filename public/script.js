let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// MUST be global for onclick to work on GitHub Pages
window.addTask = function () {

    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const status = document.getElementById("status");

    if (!title.value.trim() || !description.value.trim()) {
        alert("Please enter task details");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title.value,
        description: description.value,
        status: status.value
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    title.value = "";
    description.value = "";

    loadTasks();
};

function loadTasks() {
    const taskList = document.getElementById("taskList");

    if (!taskList) return;

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks added yet</p>";
        return;
    }

    taskList.innerHTML = tasks.map(t => `
        <div>
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <p>${t.status}</p>
        </div>
    `).join("");
}

window.onload = loadTasks;