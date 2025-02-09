self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installed");
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activated");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetch event for", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("backgroundfetchsuccess", (event) => {
    console.log("[Service Worker] Background Fetch Success:", event.registration);
    event.waitUntil(
        (async () => {
            const records = await event.registration.matchAll();
            let fetchedData = "";

            for (const record of records) {
                const response = await record.responseReady;
                const data = await response.json();
                fetchedData += JSON.stringify(data, null, 2);
            }

            // Post the data back to the main page
            self.clients.matchAll().then((clients) => {
                clients.forEach((client) =>
                    client.postMessage({
                        type: "BACKGROUND_FETCH_COMPLETE",
                        data: fetchedData,
                    })
                );
            });
        })()
    );
});

self.addEventListener("backgroundfetchfail", (event) => {
    console.error("[Service Worker] Background Fetch Failed:", event.registration);
});

self.addEventListener("backgroundfetchabort", (event) => {
    console.warn("[Service Worker] Background Fetch Aborted:", event.registration);
});
