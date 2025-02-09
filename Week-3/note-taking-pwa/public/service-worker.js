const CACHE_NAME = "note-app-cache-v1";
const API_URL = "/api/notes";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(["/", "/manifest.json", "/index.html"]);
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
    if (event.tag === "sync-notes") {
        event.waitUntil(syncNotes());
    }
});

async function syncNotes() {
    const notes = await getNotesFromDB();
    for (const note of notes) {
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(note),
            });
            console.log("Note synced successfully:", note);
        } catch (error) {
            console.error("Note sync failed:", error);
        }
    }
}

// Periodic Background Sync Registration
self.addEventListener("periodicsync", (event) => {
    if (event.tag === "periodic-notes-sync") {
        event.waitUntil(syncNotes());
    }
});
