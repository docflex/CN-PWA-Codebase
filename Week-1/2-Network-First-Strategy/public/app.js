if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
        console.log("Service Worker Registered");
    });
}

async function fetchNews() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        console.log("Response: ", response);
        const news = await response.json();
        displayNews(news);
    } catch (error) {
        console.error("Failed to fetch news:", error);
    }
}

function displayNews(news) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = "";
    news.forEach((article) => {
        const li = document.createElement("li");
        li.className = "news-item";
        li.textContent = article.title;
        newsList.appendChild(li);
    });
}

document.getElementById("reload-btn").addEventListener("click", fetchNews);

fetchNews();
