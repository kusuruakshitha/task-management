let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.addTask = function () {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const status = document.getElementById("status");

    if (!title.value || !description.value) return alert("Fill all fields");

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
    taskList.innerHTML = "";

    tasks.forEach(t => {
        taskList.innerHTML += `
            <div>
                <h3>${t.title}</h3>
                <p>${t.description}</p>
                <p>${t.status}</p>
            </div>
        `;
    });
}

window.onload = loadTasks;