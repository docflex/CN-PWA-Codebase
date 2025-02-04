const CACHE_NAME = "pwa-cache-v1";
const CACHE_VERSION = "v2"; // Increment this version when there are changes to assets

// Files to cache during the install event
const staticAssets = [
    "/",
    "../pages/index.html",
    "../pages/about.html",
    "../pages/contact.html",
    "../assets/css/styles.css",
    "../assets/images/logo.png",
];

// Install event - Cache static assets
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching static assets...");
            return cache.addAll(staticAssets);
        })
    );
});

// Activate event - Handle cache versioning
self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
    const currentCache = CACHE_NAME + "-" + CACHE_VERSION;
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // If cache version doesn't match, delete old caches
                    if (cacheName !== currentCache) {
                        console.log("Deleting outdated cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - Cache strategies
self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/assets/")) {
        // Cache-first strategy for assets (CSS, JS, images)
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse; // Return cached response if available
                }

                // If not cached, fetch from network and cache it
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    } else if (event.request.url.includes(".html")) {
        // Stale-while-revalidate strategy for HTML files
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                    });
                    return networkResponse;
                });

                // Return cached HTML for fast load but update in background
                return cachedResponse || fetchPromise;
            })
        );
    } else {
        // Network-first strategy for other dynamic resources (APIs, etc.)
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    }
});
