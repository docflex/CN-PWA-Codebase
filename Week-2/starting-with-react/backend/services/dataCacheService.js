const axios = require("axios");
let cache = null;
const CACHE_TIMEOUT = 60 * 1000; // Cache data for 1 minute
let lastFetchTime = 0;

async function fetchCachedData() {
    if (cache && Date.now() - lastFetchTime < CACHE_TIMEOUT) {
        console.log("Serving from cache...");
        return cache;
    }

    console.log("Fetching fresh data...");
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    cache = response.data;
    lastFetchTime = Date.now();

    return cache;
}

module.exports = { fetchCachedData };
