# PWA Course: Week 2 - Cache Versioning, Frontend Setup Using Vite with React, and Backend Integration

## Overview

This repository contains the codebase for the **Progressive Web Apps (PWA)** course, Week 2. In this session, you'll implement cache versioning strategies, set up a frontend PWA with Vite and React, and integrate a Node.js backend with dynamic API data caching. By the end of the session, you will deploy a fully functioning PWA with backend integration.

## Course Goals

By the end of this class, you should be able to:

-   Implement cache versioning strategies for service workers.
-   Set up a PWA using Vite and React.
-   Integrate a Node.js backend with API data caching.
-   Test and deploy a complete PWA solution with backend integration.

---

## Table of Contents

1. [Installation Instructions](#installation-instructions)
2. [Frontend Setup: Vite + React](#frontend-setup-vite--react)
3. [Backend Setup: Node.js API](#backend-setup-nodejs-api)
4. [Service Worker and Cache Versioning](#service-worker-and-cache-versioning)
5. [Testing and Debugging](#testing-and-debugging)
6. [Hands-On Activity](#hands-on-activity)
7. [Submission Instructions](#submission-instructions)
8. [Resources](#resources)

---

## Installation Instructions

To get started with the code, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (which includes npm)
-   [Vite CLI](https://vitejs.dev/): Install via `npm create vite@latest` or `npm install -g create-vite`
-   A code editor like [VS Code](https://code.visualstudio.com/)
-   [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for API testing
-   [Chrome DevTools](https://developer.chrome.com/docs/devtools/) for PWA debugging

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/pwa-week-2.git
cd pwa-week-2
```

### Install Dependencies

In the root directory of the repository, run the following commands to install the necessary dependencies:

#### Frontend (React with Vite)

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

#### Backend (Node.js API)

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Run the Project

1. **Frontend**: Start the React application:
    ```bash
    cd frontend
    npm run dev
    ```
2. **Backend**: Start the Node.js server:
    ```bash
    cd backend
    node server.js
    ```

The frontend should be available at `http://localhost:3000` and the backend API at `http://localhost:3001/api/data`.

---

## Frontend Setup: Vite + React

In this section, you'll learn how to set up the PWA frontend using [Vite](https://vitejs.dev/) and [React](https://reactjs.org/).

### Steps:

1. **Create a Vite React Project**: Use Vite to quickly scaffold a React project:

    ```bash
    npm create vite@latest my-pwa-app --template react
    cd my-pwa-app
    npm install
    ```

2. **Install the PWA Plugin**: Install `vite-plugin-pwa` for PWA support:

    ```bash
    npm install vite-plugin-pwa --save-dev
    ```

3. **Configure Vite for PWA**: Modify `vite.config.js` to include PWA setup with the manifest and service worker.

4. **Register Service Worker**: In `main.jsx`, register the service worker to make the app function offline.

5. **Test the PWA**: Use Chrome DevTools to test the PWA's caching behavior and installation.

---

## Backend Setup: Node.js API

In this section, you'll learn how to set up a basic Node.js backend that serves API data, which will be dynamically cached in the service worker.

### Steps:

1. **Initialize the Backend Project**: Set up a Node.js project:

    ```bash
    mkdir pwa-backend
    cd pwa-backend
    npm init -y
    npm install express cors
    ```

2. **Create API Endpoints**: In `server.js`, create a simple API that returns data.

3. **Dynamic Caching**: Update the service worker to cache responses from the backend API.

4. **Test the Backend**: Verify the API works by making requests to `http://localhost:3001/api/data`.

---

## Service Worker and Cache Versioning

Learn how to implement cache versioning in your service worker to manage cache updates efficiently.

### Key Concepts:

-   **Cache Versioning**: Use unique cache names and always clean up old caches during activation.
-   **Dynamic Caching**: Cache API responses to allow offline functionality.

### Code Example for Cache Versioning:

```js
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'pwa-cache-v2') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

---

## Testing and Debugging

-   Use [Chrome DevTools](https://developer.chrome.com/docs/devtools/) to test and debug your PWA.
-   Ensure that the service worker is registered properly and caches the app assets and API data.
-   Test your app in offline mode to confirm caching works as expected.

---

## Hands-On Activity

### Task:

-   Set up the frontend PWA using React and Vite.
-   Set up a simple Node.js backend with an API endpoint.
-   Integrate the backend API into the PWA with dynamic caching in the service worker.
-   Test the PWA for offline support and API data caching.

## Resources

-   **Service Workers**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
-   **Progressive Web Apps**: [Google Web Fundamentals](https://developers.google.com/web/progressive-web-apps)
-   **Vite Documentation**: [Vite](https://vitejs.dev/)
-   **Express.js Documentation**: [Express](https://expressjs.com/)

---

Good luck, and enjoy building your Progressive Web App! 🚀
