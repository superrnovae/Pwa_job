import React, { useState, useEffect } from "react";

function NotificationsButton() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Ecouter les messages de notification
    navigator.serviceWorker.addEventListener("message", (event) => {
      const newNotification = event.data;
      setNotifications((prev) => [newNotification, ...prev]);
    });
  }, []);

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => alert(notifications.map((notif) => notif.title).join("\n"))}
      >
        Notifications ({notifications.length})
      </button>
    </div>
  );
}

export default NotificationsButton;
