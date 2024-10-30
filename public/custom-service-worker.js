'use strict';

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/main.jsx',
    '/src/components/Jobboard.jsx',
    '/src/components/JobCard.jsx',
    '/src/components/Navbar.jsx',
    '/src/components/NotificationsButton.jsx',
    // Ajoutez ici les autres fichiers à mettre en cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    const data = event.data.json();
    const title = data.title;
    const options = {
        body: data.body,
        icon: '/logo192.png',
        data: data.data
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
