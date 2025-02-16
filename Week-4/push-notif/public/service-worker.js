self.addEventListener("install", (event) => {
    console.log("📢 Service Worker Installed!");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("🚀 Service Worker Activated!");
    event.waitUntil(self.clients.claim());
});

// Listen for Push Notifications
self.addEventListener("push", (event) => {
    const data = event.data
        ? event.data.json()
        : { title: "New Alert", body: "Check updates" };

    const options = {
        body: data.body,
        icon: "/icon-192.png",
        badge: "/icons/badge.png",
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});
