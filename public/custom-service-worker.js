'use strict';

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/', '/index.html', '/src/Offline.jsx', '/src/main.jsx', '/src/components/Jobboard.jsx',
    '/src/components/JobCard.jsx', '/src/components/Navbar.jsx',
    '/src/components/NotificationsButton.jsx', '/manifest.json', '/logo192.png', '/logo512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Gérer les notifications push
self.addEventListener('push', event => {
    const data = event.data.json();
    const title = data.title;
    const options = {
        body: data.body,
        icon: data.icon || '/logo192.png',
        data: data.data
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Gérer les clics sur la notification
self.addEventListener('notificationclick', event => {
    event.notification.close();
    const data = event.notification.data;

    // Redirige vers la page principale en cas de clic
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
            clientList.forEach(client => {
                client.postMessage({ type: 'NOTIFICATION_CLICKED', data: data })
            })
        })
    );
});
