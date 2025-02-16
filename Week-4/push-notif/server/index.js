const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// WebSocket Server for Real-Time Updates
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("✅ WebSocket Client Connected");
    setInterval(() => {
        ws.send(
            JSON.stringify({ message: `Live Update: ${new Date().toLocaleTimeString()}` })
        );
    }, 5000);
});

// VAPID Keys (Replace with your generated keys)
const vapidKeys = {
    publicKey:
        "BCGVnaPsOPz3Q1XDOCfTUl_ytwhKgufTx6j9cHiZI9deu45GByhwvzAtRoft0yJmmiKdg3p4iXsgrFH1hPsxB6c",
    privateKey: "zgrUnjYVzNbPesNdSZhhhzLwCIIUyFcIr7nvzTcqy9k",
};

webpush.setVapidDetails(
    "mailto:rehbermoin.io@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

let pushSubscription;

// Store Push Subscription
app.post("/subscribe", (req, res) => {
    pushSubscription = req.body;
    res.status(201).json({});
});

// Send Push Notification
app.post("/send-notification", (req, res) => {
    if (!pushSubscription) {
        return res.status(400).json({ error: "No Subscription" });
    }

    const payload = JSON.stringify({ title: "New Alert", body: "Check updates now!" });

    webpush
        .sendNotification(pushSubscription, payload)
        .then(() => res.sendStatus(200))
        .catch((err) => console.error("Push Error:", err));
});

// Start Express Server
app.listen(1234, () => console.log("🚀 Server Running on Port 1234"));
