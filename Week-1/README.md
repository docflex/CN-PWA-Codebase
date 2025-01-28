# **PWA Course - Week 1 (Introduction & Service Workers)**

Welcome to the first week of the Progressive Web Apps (PWA) course! This week, we will cover the fundamentals of PWAs, set up our development environment, and build the foundation for creating a high-quality PWA.

---

## **📅 Class Schedule for Week 1**

-   **Class 1:** Fundamentals of PWAs & Development Environment Setup
-   **Class 2:** Service Workers & Basic Caching

---

## **🔑 Learning Objectives**

### **Class 1: Fundamentals of PWAs**

-   Understand what makes a PWA different from a traditional web app.
-   Learn about key PWA components: Service Workers, Web App Manifest, and HTTPS.
-   Set up a modern development environment (Node.js, npm, and VSCode).
-   Build a simple responsive webpage to act as the base for your PWA project.

### **Class 2: Service Workers & Basic Caching**

-   Understand the lifecycle of Service Workers: registration, installation, activation, and fetch events.
-   Implement static asset caching using the Cache API.
-   Test Service Worker functionality and debug common issues.

---

## **🛠 Setup Instructions**

### **1. Install Development Tools**

Ensure the following tools are installed on your system:

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [VSCode](https://code.visualstudio.com/)
-   [Google Chrome](https://www.google.com/chrome/)

### **2. Clone Starter Repository**

```bash
git clone https://github.com/docflex/CN-PWA-Codebase/tree/Week-1/Init
```

### **3. Run the Development Server**

```bash
See Below Instructions
```

---

## **💻 Hands-On Activities**

### **Class 1 Activity:** Build a Responsive Webpage

-   Create a simple HTML5 webpage using semantic elements.
-   Add responsive CSS using media queries.
-   Include JavaScript for dynamic interactions.

**Deliverables:** A responsive webpage with a basic interactive component.

---

### **Class 2 Activity:** Implement a Basic Service Worker

-   Register a Service Worker in your project.
-   Cache essential assets (CSS, JS, and images) using the Cache API.
-   Test offline functionality by disconnecting the network and refreshing the page.

**Deliverables:** A webpage that works offline by serving cached assets.

---

## **📚 Key Resources**

-   [Google Developers: PWA Overview](https://developers.google.com/web/progressive-web-apps)
-   [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
-   [Chrome DevTools for PWA Debugging](https://developer.chrome.com/docs/devtools/)

---

## **📝 Assignments**

### **Assignment 1: Responsive Webpage (Due Sunday)**

**Instructions:**

-   Create or convert an existing webpage to be fully responsive.
-   Ensure it meets accessibility guidelines.

---

### **Assignment 2: Service Worker Integration (Due Sunday)**

**Instructions:**

-   Add a Service Worker to your responsive webpage.
-   Implement caching for essential assets.
-   Document your caching strategy in a `README.md` file.

**Submission:**

-   Push your code to GitHub and include a link to your deployed version (using tools like Netlify or Vercel).

---

## **🚀 Bonus Challenge**

-   Implement a fallback strategy for network errors (serve a custom "offline.html" page).

---

## **✅ Checklist for Week 1**

-   [ ] Completed responsive webpage.
-   [ ] Service Worker registered and caching static assets.
-   [ ] Assignments submitted via GitHub.
-   [ ] Bonus challenge (optional).

---

Below is a comprehensive boilerplate for a simple, fully functional Progressive Web App (PWA) that adheres to the latest best practices:

---

### **1. Project Structure**

```
my-basic-pwa
├── index.html
├── manifest.json
├── service-worker.js
├── app.js
└── styles.css
```

---

### **2. `index.html`**

A basic HTML page with PWA-specific meta tags and links.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic PWA</title>

  <!-- Web App Manifest -->
  <link rel="manifest" href="manifest.json">

  <!-- Favicon -->
  <link rel="icon" href="icons/favicon-192x192.png">

  <!-- Theme and Mobile Meta Tags -->
  <meta name="theme-color" content="#ffffff">

  <!-- Styles -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello, PWA World!</h1>
  <p>This is a basic Progressive Web App boilerplate.</p>
  <button id="install-button" style="display: none;">Install App</button>

  <script src="app.js"></script>
</body>
</html>
```

---

### **3. `manifest.json`**

A minimal web app manifest file to define the app's metadata.

```json
{
  "name": "Basic PWA App",
  "short_name": "BasicPWA",
  "description": "A simple progressive web application",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0078d7",
  "icons": [
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

### **4. `service-worker.js`**

A simple service worker to enable offline support by caching essential assets.

```javascript
const CACHE_NAME = 'pwa-basic-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install Event: Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serve Cached Content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
```

---

### **5. `app.js`**

JavaScript to register the Service Worker and handle the installation prompt.

```javascript
// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.error('Service Worker Registration Failed:', err));
}

// Handle App Install Prompt
let installButton = document.getElementById('install-button');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});
```

---

### **6. `styles.css`**

Simple styles for the app.

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
  background-color: #f9f9f9;
  color: #333;
}

button {
  padding: 10px 20px;
  background-color: #0078d7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
```

---

### **7. Icons Folder**

Add icons with the recommended sizes:

-   **192x192 PNG:** `icons/icon-192x192.png`
-   **512x512 PNG:** `icons/icon-512x512.png`

---

### **How to Run the Project Locally**

#### **Using a Simple Local Server**

1. Install a simple server globally:

    ```bash
    npm install -g http-server
    ```

2. Run the server:

    ```bash
    http-server -p 8080
    ```

3. Open the app in your browser:
    ```
    http://localhost:8080
    ```

---

### **Test PWA in Chrome**

1. Open the app in Chrome.
2. Right-click > Inspect > Lighthouse.
3. Generate a Lighthouse report to verify PWA compliance.

This boilerplate provides a foundation for your students to begin building their PWAs. Let me know if you'd like additional advanced features or enhancements!
