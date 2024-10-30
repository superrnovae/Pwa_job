import React, { useState, useEffect } from "react";

function NotificationsButton() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(swReg => {
        swReg.pushManager.getSubscription().then(subscription => {
          if (subscription === null) {
            swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY
            }).then(newSubscription => {
              fetch('/subscribe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSubscription)
              });
            });
          }
        });
      });
    }
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
