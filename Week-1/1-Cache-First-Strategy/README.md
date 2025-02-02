### **1. Cache-First Strategy (Best for Static Assets)**

**Use Case:** Static assets like images, fonts, and CSS files that rarely change. Ideal for blog-style websites or e-commerce product images where speed is critical.

**Explanation:**

-   The browser will try to serve the resource from the cache first.
-   If the cache has the resource, it is returned immediately.
-   If the resource is not in the cache, it will fetch from the network and store it in the cache for future requests.

**Example:**  
Caching product images for an e-commerce website.

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') { // Apply to images only
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((networkResponse) => {
          return caches.open('images-cache').then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});
```
