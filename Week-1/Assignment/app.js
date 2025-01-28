// Register the service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((err) => console.error("Service Worker Registration Failed:", err));
}

const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToList(task.text, task.completed));
}

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToList(taskText);
        saveTask(taskText, false);
        taskInput.value = "";
    }
});

function addTaskToList(text, completed = false) {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    listItem.className = completed ? "completed" : "";
    listItem.addEventListener("click", toggleTaskCompletion);
    taskList.appendChild(listItem);
}

function toggleTaskCompletion(event) {
    const listItem = event.target;
    listItem.classList.toggle("completed");
    updateTaskCompletion(listItem.textContent, listItem.classList.contains("completed"));
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCompletion(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.text === text);
    if (task) {
        task.completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
