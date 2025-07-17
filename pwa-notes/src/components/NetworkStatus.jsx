import React, { useState, useEffect } from "react";

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
            localStorage.setItem("onlineStatus", JSON.stringify(navigator.onLine));
        };

        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    return (
        <div className={`network-status ${isOnline ? "online" : "offline"}`}>
            {isOnline ? "🟢 You are Online" : "🔴 You are Offline"}
        </div>
    );
};

export default NetworkStatus;
