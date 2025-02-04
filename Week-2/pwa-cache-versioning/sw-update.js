if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        alert("A new version of the app is available. Please refresh the page!");
    });
}
