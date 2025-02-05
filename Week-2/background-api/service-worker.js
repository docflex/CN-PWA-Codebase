const CACHE_NAME = "background-sync-cache-v1";
const ASSETS = ["./index.html", "./styles.css", "./assets/favicon-192x192.png"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching app shell...");
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("sync", (event) => {
    if (event.tag === "sync-request") {
        event.waitUntil(
            sendRequest().then(() => {
                self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => client.postMessage("sync-success"));
                });
            })
        );
    }
});

async function sendRequest() {
    console.log("Performing background sync...");
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const result = await response.json();
        console.log("Sync request completed successfully:", result);
    } catch (error) {
        console.error("Sync request failed:", error);
    }
}
