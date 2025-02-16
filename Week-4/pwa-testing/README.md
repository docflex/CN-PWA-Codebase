## **📌 Step 1: Initialize the Project**

First, set up a new project. Run the following in your terminal:

```sh
mkdir pwa-testing-demo
cd pwa-testing-demo
npm init -y
```

This creates a basic **Node.js project**.

---

## **📌 Step 2: Install Necessary Dependencies**

We will install:  
🔹 **Jest** for unit testing  
🔹 **Cypress** for end-to-end testing  
🔹 **Lighthouse** for performance testing

Run the following command:

```sh
npm install --save-dev jest cypress lighthouse
```

---

## **📌 Step 3: Create Boilerplate PWA**

Inside `pwa-testing-demo`, create the following file structure:

```
pwa-testing-demo
│── public
│   ├── index.html
│   ├── app.js
│   ├── service-worker.js
│── tests
│   ├── unit.test.js
│── cypress
│   ├── integration
│   │   ├── pwa-test.spec.js
│── package.json
```

---

## **📌 Step 4: Build a Simple PWA**

### **📜 `public/index.html`**

Create a simple HTML file that works as a PWA:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA Testing Demo</title>
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <h1>Welcome to PWA Testing</h1>
    <button id="test-button">Click Me</button>
    <script src="app.js"></script>
</body>
</html>
```

---

### **📜 `public/app.js`**

A simple JavaScript file that registers the **Service Worker**:

```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log("Service Worker registered!", reg))
    .catch(err => console.log("Service Worker registration failed:", err));
}

// Function to test
function addNumbers(a, b) {
    return a + b;
}

export { addNumbers };
```

---

### **📜 `public/service-worker.js`**

A basic Service Worker to enable caching:

```javascript
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('pwa-cache-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/app.js'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
```

---

## **📌 Step 5: Unit Testing with Jest**

Inside `tests/unit.test.js`, create a test for the `addNumbers` function.

### **📜 `tests/unit.test.js`**

```javascript
import { addNumbers } from '../public/app.js';

test('adds 2 + 3 to equal 5', () => {
    expect(addNumbers(2, 3)).toBe(5);
});
```

### **Run Jest Tests**

Add this script to `package.json`:

```json
"scripts": {
    "test": "jest"
}
```

Run tests with:

```sh
npm test
```

---

## **📌 Step 6: End-to-End Testing with Cypress**

Create an integration test for Cypress.

### **📜 `cypress/integration/pwa-test.spec.js`**

```javascript
describe('PWA Test', () => {
    it('Visits the PWA and checks for text', () => {
        cy.visit('http://localhost:5000');
        cy.contains('Welcome to PWA Testing');
    });

    it('Clicks a button and checks the event', () => {
        cy.get('#test-button').click();
    });
});
```

### **Run Cypress Tests**

Add this script to `package.json`:

```json
"scripts": {
    "cypress:open": "cypress open"
}
```

Run tests with:

```sh
npm run cypress:open
```

---

## **📌 Step 7: Performance Testing with Lighthouse**

Run a **Lighthouse audit** to check performance.

```sh
npx lighthouse http://localhost:5000 --view
```

---

## **📌 Step 8: Run a Local Server**

To test the PWA properly, install a simple HTTP server:

```sh
npm install -g serve
serve -s public
```

Now, visit `http://localhost:5000` and test the PWA.

---

## **🚀 Conclusion**

This **boilerplate PWA** includes:  
✅ **A basic PWA setup** with a **Service Worker**  
✅ **Unit testing with Jest**  
✅ **End-to-End testing with Cypress**  
✅ **Performance testing with Lighthouse**
