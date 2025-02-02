### **2. Network-First Strategy (Best for Dynamic Content)**

**Use Case:** Dynamic or real-time data such as news articles, stock prices, social media feeds, or API requests.

**Explanation:**

-   Always try to fetch the resource from the network first.
-   If the network request fails (offline or server issue), fallback to the cached version if available.

**Example:**  
Fetching user profiles or real-time data from an API in a social media app.

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) { // Apply to API requests only
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open('dynamic-api-cache').then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match(event.request)) // Fallback to cache if network fails
    );
  }
});
```

**Why It Works:**

-   Ensures that users always get the latest data while still having a fallback in case of connectivity issues.
