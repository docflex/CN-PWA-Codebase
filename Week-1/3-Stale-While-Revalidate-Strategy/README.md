### **3. Stale-While-Revalidate Strategy (Best for Frequently Updated Content)**

**Use Case:** Blog posts, weather updates, or product prices where you want to serve a cached version while fetching a fresh copy in the background.

**Explanation:**

-   Serve a cached response immediately if available.
-   Simultaneously fetch a fresh version from the network and update the cache.

**Example:**  
Caching homepage articles for a news website.

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('news-cache').then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

**Why It Works:**

-   Users get immediate responses, and the cache stays up-to-date in the background.
