if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then(async (registration) => {
            console.log("✅ Service Worker Registered!");

            // Check if Periodic Background Sync is supported
            if ("periodicSync" in registration) {
                try {
                    // Request permission for periodic background sync
                    const status = await navigator.permissions.query({
                        name: "periodic-background-sync",
                    });

                    console.log("🔄 Periodic Background Sync Status:", status.state);

                    if (status.state === "granted") {
                        // Force periodic sync every 100ms (not likely to work in production)
                        await registration.periodicSync.register("fetch-latest-posts", {
                            minInterval: 100, // 100 milliseconds
                        });

                        console.log(
                            "🔄 Periodic Background Sync registered successfully!"
                        );
                    } else {
                        console.warn("⚠️ Periodic Background Sync permission denied.");
                    }
                } catch (err) {
                    console.error("❌ Error registering Periodic Background Sync:", err);
                }
            } else {
                console.warn(
                    "⚠️ Periodic Background Sync is not supported in this browser."
                );
            }
        })
        .catch((err) => {
            console.error("❌ Service Worker Registration Failed:", err);
        });
}

document.getElementById("load-posts").addEventListener("click", async () => {
    if ("caches" in window) {
        try {
            const cache = await caches.open("pwa-cache");
            const response = await cache.match("/latest-posts");

            if (response) {
                const posts = await response.json();
                displayPosts(posts);
            } else {
                console.warn("⚠️ No cached posts found.");
            }
        } catch (error) {
            console.error("❌ Error loading cached posts:", error);
        }
    }
});

function displayPosts(posts) {
    const postList = document.getElementById("post-list");
    postList.innerHTML = ""; // Clear previous posts

    posts.slice(0, 5).forEach((post) => {
        const li = document.createElement("li");
        li.textContent = `📰 ${post.title}`;
        postList.appendChild(li);
    });
}
