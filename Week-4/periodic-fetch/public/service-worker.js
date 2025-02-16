// Install Service Worker
self.addEventListener("install", (event) => {
    console.log("📢 Service Worker Installed!");
    self.skipWaiting(); // Activate immediately
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    console.log("🚀 Service Worker Activated!");
    event.waitUntil(self.clients.claim());
});

// Listen for periodic background sync event
self.addEventListener("periodicsync", async (event) => {
    console.log("🔄 Periodic Sync event fired!");
    if (event.tag === "fetch-latest-posts") {
        console.log("🔄 Periodic Sync Triggered: Fetching latest posts...");
        event.waitUntil(fetchLatestPosts());
    }
});

// Function to fetch fresh data from API and store it in Cache Storage
async function fetchLatestPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        
        console.log("📥 Fetched latest posts:", data);

        // Save data in Cache Storage
        const cache = await caches.open("pwa-cache");
        await cache.put("/latest-posts", new Response(JSON.stringify(data)));

    } catch (error) {
        console.error("❌ Error fetching latest posts:", error);
    }
}
