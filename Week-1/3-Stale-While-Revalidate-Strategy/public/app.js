if ("serviceWorker" in navigator) {
    (async () => {
        try {
            await navigator.serviceWorker.register("/service-worker.js");
            console.log("Service Worker registered successfully");
        } catch (error) {
            console.error("Service Worker registration failed:", error);
        }
    })();
}

document.getElementById("fetch-weather-btn").addEventListener("click", async () => {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    await fetchWeather(city);
});

async function fetchWeather(city) {
    const cache = await caches.open("weather-cache-v1");
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    try {
        const networkResponse = await fetch(apiURL);
        if (networkResponse.status === 200) {
            await cache.put(apiURL, networkResponse.clone());
            const weatherData = await networkResponse.json();
            displayWeather(weatherData);
        } else {
            alert("City not found.");
        }
    } catch (error) {
        console.error("Failed to fetch data from network, fetching from cache.");
        const cachedResponse = await cache.match(apiURL);
        if (cachedResponse) {
            const weatherData = await cachedResponse.json();
            displayWeather(weatherData);
        } else {
            alert("No cached data available.");
        }
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = `
        <div class="weather-data"><strong>City:</strong> ${data.location.name}</div>
        <div class="weather-data"><strong>Temperature:</strong> ${data.current.temp_c}°C</div>
        <div class="weather-data"><strong>Condition:</strong> ${data.current.condition.text}</div>
    `;
}
