// ! Service Registration

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("Service Worker Registered", reg))
        .catch((err) => console.log("Service Worker Not Registered", err));
}

// ! Request Notification Permission
document.getElementById("notify-btn").addEventListener("click", async () => {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
        return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        subscribeToPushNotification();
    } else {
        console.log("Permission Denied");
    }
});

// ! Subscribe to Push Notification
async function subscribeToPushNotification() {
    const reg = await navigator.serviceWorker.ready;
    const subscription = await await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
            "BCGVnaPsOPz3Q1XDOCfTUl_ytwhKgufTx6j9cHiZI9deu45GByhwvzAtRoft0yJmmiKdg3p4iXsgrFH1hPsxB6c",
        // * Your Public Key
    });

    console.log("Push Notification Subscription", JSON.stringify(subscription));

    // ! Send the Subscription to the Server
    await fetch("http://localhost:1234/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "Content-Type": "application/json" },
    });

    console.log("Push Notification Subscription Sent");
}

// ! WebSocket Connect for RT Updates
const socket = new WebSocket("ws://localhost:8080");
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket Message", data.message);
    document.getElementById("updates").innerHTML = data.message;

    showNotification(data.message);
};

function showNotification(message) {
    if ("Notification" in window) {
        new Notification("Live Update", {
            body: message,
            icon: "/icon-192.png",
            badge: "/icon-192.png",
        });
    } else {
        alert("New Update: " + message);
    }
}
