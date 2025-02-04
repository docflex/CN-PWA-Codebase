const CACHE_NAME = "react-pwa-v1";
const URLS_TO_CACHE = [
    "/",
    "../src/assets/react.svg",
    "../index.html",
    "../src/App.jsx",
    "../src/main.jsx",
    "../public/vite.svg",
    "",
];

// Install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Fetch event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            try {
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    console.log("cachedResponse: ", event.request.url);
                    return cachedResponse;
                }

                const fetchResponse = await fetch(event.request, { mode: "no-cors" });

                if (fetchResponse) {
                    console.log("fetchResponse: ", event.request.url);
                    await cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                }
            } catch (error) {
                console.log("Fetch failed: ", error);
                const cachedResponse = await cache.match("/index.html");
                return cachedResponse;
            }
        })()
    );
});

// Activate event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});
