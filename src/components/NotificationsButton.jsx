import React, { useEffect, useState } from "react";

function NotificationsButton() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    requestPermissionToShowNotifications()

    // Écouter les notifications reçues depuis le service worker
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log(event)
        const newNotification = event.data;
        setNotifications((prev) => [newNotification, ...prev]);
      });
    }
  }, []);

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
  }

  function subscribeToPushNotifications()
  {
    navigator.serviceWorker.getRegistration().then(registration => {
        
        fetch("http://localhost:5000/vapidPublicKey")
        .then(response => response.json())
        .then(data => {
          const publicVapidKey = data.publicVapidKey;

          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
          })
          .then(newSubscription => {
            fetch("http://localhost:5000/subscribe", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newSubscription)
            });
          })
        })
      })
  }

  function requestPermissionToShowNotifications()
  {
    if(window.Notification) 
      {
        if(Notification.permission === "granted")
        {
            console.log("Permission to show notifications had already been granted.");
            subscribeToPushNotifications()
        }
        else if(Notification.permission === "denied")
        {
            console.log("Permission to show notifications was denied.");
        }
        else {
          Notification.requestPermission().then(permission => {
  
            if(permission === "granted")
            {
              console.log("Notification permission granted.")
              subscribeToPushNotifications()
            }
            else if(permission === "denied")
            {
              console.log("Notification permission denied.")
            }
            else {
              console.log("Notification permission dismissed");
            }
          })
          .catch(error => {
            console.log('Error requesting notification permission:', error)
          })
        }
  
      }
  }

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
