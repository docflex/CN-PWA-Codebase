if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);

        // Handle button click for sync registration
        document.getElementById("syncButton").addEventListener("click", () => {
            if ("SyncManager" in window) {
                registration.sync
                    .register("sync-request")
                    .then(() => {
                        document.getElementById("status").innerText =
                            "Sync registered. Will sync when back online.";
                    })
                    .catch((err) => {
                        console.error("Background sync registration failed:", err);
                    });
            } else {
                console.warn("Background Sync not supported");
            }
        });

        // Listen for messages from the service worker
        navigator.serviceWorker.addEventListener("message", (event) => {
            if (event.data === "sync-success") {
                document.getElementById("status").innerText =
                    "Sync completed successfully!";
            }
        });
    });
}
