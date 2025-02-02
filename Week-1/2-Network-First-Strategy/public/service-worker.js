const CACHE_NAME = "news-aggregator-cache-v2";
const urlsToCache = ["/", "/index.html", "/styles.css", "/app.js"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("jsonplaceholder.typicode.com")) {
        event.respondWith(handleFetchAndCache(event.request));
    }
});

async function handleFetchAndCache(request) {
    try {
        const networkResponse = await fetch(request);

        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());

        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        return (
            cachedResponse ||
            new Response("Network and cache both failed", { status: 500 })
        );
    }
}
