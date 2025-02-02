const imagePaths = ["/images/photo1.jpg", "/images/photo2.jpg", "/images/photo3.jpg"];
const gallery = document.getElementById("gallery");

function displayImages() {
    gallery.innerHTML = "";
    imagePaths.forEach((imagePath) => {
        const img = document.createElement("img");
        img.src = imagePath;
        gallery.appendChild(img);
    });
}

document.getElementById("refresh-btn").addEventListener("click", displayImages);

displayImages();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
        console.log("Service Worker Registered");
    });
}
