// server.js

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// Temporary Task Storage
let tasks = [];


// CREATE TASK
app.post("/addTask", (req, res) => {

    const task = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    tasks.push(task);

    res.send("Task Added");
});


// READ TASKS
app.get("/tasks", (req, res) => {
    res.json(tasks);
});


// UPDATE TASK STATUS
app.put("/updateTask/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (task) {

        task.status = "Completed";

        res.json(task);

    } else {

        res.status(404).send("Task not found");
    }
});


// DELETE TASK
app.delete("/deleteTask/:id", (req, res) => {

    const id = parseInt(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.send("Task Deleted");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});