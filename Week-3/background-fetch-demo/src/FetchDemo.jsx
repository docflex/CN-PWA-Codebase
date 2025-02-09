import React, { useState, useEffect } from "react";

const FetchDemo = () => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                if (event.data && event.data.type === "BACKGROUND_FETCH_COMPLETE") {
                    setFetchedData(event.data.data);
                }
            });
        }
    }, []);

    const handleBackgroundFetch = async () => {
        if ("BackgroundFetchManager" in self) {
            const registration = await navigator.serviceWorker.ready;
            try {
                const bgFetch = await registration.backgroundFetch.fetch(
                    "bg-fetch-demo",
                    ["vite.svg"],
                    {
                        title: "Background Fetch Example",
                        icons: [{ sizes: "192x192", src: "vite.svg", type: "image/png" }],
                        totalDownloadSize: 1024 * 1024,
                    }
                );
                console.log("Background Fetch started:", bgFetch);
            } catch (error) {
                console.error("Background Fetch failed:", error);
            }
        } else {
            alert("Background Fetch API is not supported in your browser.");
        }
    };

    return (
        <div>
            <h1>Background Fetch API Demo</h1>
            <button onClick={handleBackgroundFetch}>Start Background Fetch</button>
            {fetchedData ? (
                <div>
                    <h2>Fetched Data:</h2>
                    <pre>{fetchedData}</pre>
                </div>
            ) : (
                <p>No data fetched yet. Please click the button above.</p>
            )}
        </div>
    );
};

export default FetchDemo;
