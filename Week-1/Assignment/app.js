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

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    // Show custom install button
    const installButton = document.getElementById("install-button");
    installButton.style.display = "block";

    installButton.addEventListener("click", async () => {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
            console.log("User accepted the PWA installation");
        } else {
            console.log("User dismissed the PWA installation");
        }
        deferredPrompt = null;
        installButton.style.display = "none";
    });
});

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    // Request Notification Permission
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notifications enabled");
            }
        });
    }
});

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
    listItem.classList.add("task-item");
    listItem.addEventListener("click", toggleTaskCompletion);
    taskList.appendChild(listItem);

    // Animation when adding tasks
    setTimeout(() => listItem.classList.add("task-appear"), 10);
}

function toggleTaskCompletion(event) {
    const listItem = event.target;
    listItem.classList.toggle("completed");
    listItem.classList.add("task-toggle");

    setTimeout(() => listItem.classList.remove("task-toggle"), 300);

    updateTaskCompletion(listItem.textContent, listItem.classList.contains("completed"));

    // Show a notification when a task is completed
    if (listItem.classList.contains("completed")) {
        console.log("Show Notif")
        showTaskCompletionNotification(listItem.textContent);
    }
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

// Show browser notifications when tasks are completed
function showTaskCompletionNotification(task) {
    if (Notification.permission === "granted") {
        new Notification("Task Completed!", {
            body: `Good job! You've completed "${task}".`,
            icon: "/icons/icon-192x192.png",
        });
    }
}
