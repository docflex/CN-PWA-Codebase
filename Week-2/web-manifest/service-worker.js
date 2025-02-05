const CACHE_NAME = "Sample-Cache-v1";
const ASSETS = [
    "./assets/favicon-192x192.png",
    "./assets/favicon-512x512.png",
    "./index.html",
    "./styles.css",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files...");
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
            .catch(() => caches.match("./index.html"))
    );
});
