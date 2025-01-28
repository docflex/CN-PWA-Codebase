# **PWA Course - Week 1 (Introduction & Service Workers)**  

Welcome to the first week of the Progressive Web Apps (PWA) course! This week, we will cover the fundamentals of PWAs, set up our development environment, and build the foundation for creating a high-quality PWA.  

---

## **📅 Class Schedule for Week 1**  
- **Class 1:** Fundamentals of PWAs & Development Environment Setup  
- **Class 2:** Service Workers & Basic Caching  

---

## **🔑 Learning Objectives**  

### **Class 1: Fundamentals of PWAs**  
- Understand what makes a PWA different from a traditional web app.  
- Learn about key PWA components: Service Workers, Web App Manifest, and HTTPS.  
- Set up a modern development environment (Node.js, npm, and VSCode).  
- Build a simple responsive webpage to act as the base for your PWA project.  

### **Class 2: Service Workers & Basic Caching**  
- Understand the lifecycle of Service Workers: registration, installation, activation, and fetch events.  
- Implement static asset caching using the Cache API.  
- Test Service Worker functionality and debug common issues.  

---

## **🛠 Setup Instructions**  

### **1. Install Development Tools**  
Ensure the following tools are installed on your system:  
- [Node.js](https://nodejs.org/) (v14 or higher)  
- [VSCode](https://code.visualstudio.com/)  
- [Google Chrome](https://www.google.com/chrome/)  

### **2. Clone Starter Repository**  
```bash
git clone https://github.com/docflex/CN-PWA-Codebase/tree/Week-1/Init
cd pwa-course-starter
npm install
```

### **3. Run the Development Server**  
```bash
npm start
```
Visit `http://localhost:3000` to view the app in the browser.  

---

## **💻 Hands-On Activities**  

### **Class 1 Activity:** Build a Responsive Webpage  
- Create a simple HTML5 webpage using semantic elements.  
- Add responsive CSS using media queries.  
- Include JavaScript for dynamic interactions.  

**Deliverables:** A responsive webpage with a basic interactive component.  

---

### **Class 2 Activity:** Implement a Basic Service Worker  
- Register a Service Worker in your project.  
- Cache essential assets (CSS, JS, and images) using the Cache API.  
- Test offline functionality by disconnecting the network and refreshing the page.  

**Deliverables:** A webpage that works offline by serving cached assets.  

---

## **📚 Key Resources**  
- [Google Developers: PWA Overview](https://developers.google.com/web/progressive-web-apps)  
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)  
- [Chrome DevTools for PWA Debugging](https://developer.chrome.com/docs/devtools/)  

---

## **📝 Assignments**  

### **Assignment 1: Responsive Webpage (Due Sunday)**  
**Instructions:**  
- Create or convert an existing webpage to be fully responsive.  
- Ensure it meets accessibility guidelines.  

---

### **Assignment 2: Service Worker Integration (Due Sunday)**  
**Instructions:**  
- Add a Service Worker to your responsive webpage.  
- Implement caching for essential assets.  
- Document your caching strategy in a `README.md` file.  

**Submission:**  
- Push your code to GitHub and include a link to your deployed version (using tools like Netlify or Vercel).  

---

## **🚀 Bonus Challenge**  
- Implement a fallback strategy for network errors (serve a custom "offline.html" page).  

---

## **✅ Checklist for Week 1**  
- [ ] Completed responsive webpage.  
- [ ] Service Worker registered and caching static assets.  
- [ ] Assignments submitted via GitHub.  
- [ ] Bonus challenge (optional).  

---