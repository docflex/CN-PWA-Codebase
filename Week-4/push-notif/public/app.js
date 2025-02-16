// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("✅ Service Worker Registered"))
        .catch((err) => console.error("❌ SW Registration Failed", err));
}

// Request Notification Permission
document.getElementById("notify-btn").addEventListener("click", async () => {
    if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            subscribeToPush();
        } else {
            console.warn("⚠️ Notification permission denied.");
        }
    }
});

// Subscribe to Push Notifications
async function subscribeToPush() {
    const reg = await navigator.serviceWorker.ready;
    const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
            "BCGVnaPsOPz3Q1XDOCfTUl_ytwhKgufTx6j9cHiZI9deu45GByhwvzAtRoft0yJmmiKdg3p4iXsgrFH1hPsxB6c",
    });

    console.log("📩 Push Subscription:", JSON.stringify(subscription));

    // Send subscription to the server
    await fetch("http://localhost:1234/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "Content-Type": "application/json" },
    });

    console.log("📤 Subscription sent to server!");
}

// WebSocket Connection for Real-Time Updates
const socket = new WebSocket("ws://localhost:8080");
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("🔄 WebSocket Update:", data.message);
    document.getElementById("updates").innerText = data.message;
};
