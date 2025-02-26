self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("pwa-notes-v1").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/icons/icon-192x192.png",
                "/icons/icon-512x512.png",
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (!event.request.url.startsWith("http")) return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    return caches.open("pwa-notes-v1").then((cache) => {
                        if (event.request.method === "GET") {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                })
                .catch(() => {
                    if (event.request.destination === "document") {
                        return caches.match("/index.html");
                    }
                });
        })
    );
});

self.addEventListener("sync", (event) => {
    if (event.tag === "sync-notes") {
        event.waitUntil(syncNotesWithServer());
    }
});

async function syncNotesWithServer() {
    const db = await openDB("pwa-notes-db", 1);
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    const unsyncedNotes = await store.getAll();

    for (const note of unsyncedNotes) {
        await fetch("/api/notes", {
            method: "POST",
            body: JSON.stringify(note),
            headers: { "Content-Type": "application/json" },
        });

        await store.delete(note.id);
    }
}
