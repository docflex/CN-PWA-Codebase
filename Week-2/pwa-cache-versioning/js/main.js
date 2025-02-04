if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("../js/service-worker.js")
        .then((registration) => {
            console.log("Service Worker registered successfully", registration);
        })
        .catch((error) => {
            console.error("Service Worker registration failed", error);
        });
}
