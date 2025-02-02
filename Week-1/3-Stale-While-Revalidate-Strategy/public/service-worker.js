const CACHE_NAME = "weather-app-cache-v1";
const WEATHER_API = "https://api.weatherapi.com/v1/current.json";

self.addEventListener("install", async (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/styles.css",
                "/app.js",
                "/favicon.ico",
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
    event.waitUntil(
        caches.keys().then(async (cacheNames) => {
            return Promise.all(
                cacheNames.map(async (cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        await caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // Only apply SWR for specific requests (e.g., weather API)
    if (event.request.url.includes(WEATHER_API)) {
        event.respondWith(
            // Check if there's a cached response
            caches.match(event.request).then((cachedResponse) => {
                // If we have cached data, return it immediately
                if (cachedResponse) {
                    // Fetch the fresh data in the background
                    fetch(event.request).then((networkResponse) => {
                        caches.open(CACHE_NAME).then((cache) => {
                            // Update the cache with the new data
                            cache.put(event.request, networkResponse.clone());
                        });
                    });
                    return cachedResponse; // Serve stale data from cache
                } else {
                    // If no cache exists, fetch from the network and cache it for future use
                    return fetch(event.request).then((networkResponse) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone()); // Cache fresh data
                            return networkResponse;
                        });
                    });
                }
            })
        );
    }
});
