const CACHE_NAME = "photo-gallery-cache-v2";
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
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
