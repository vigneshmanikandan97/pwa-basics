const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    '/index.html',
    '/main.js',
    '/main.css',
    '/manifest.json',
    '/images/favicon.svg',
    '/images/nuxt-icon.png',
    '/images/nuxt-pwa.svg'
];

self.addEventListener('install', (event) => {
    // Precaching needs to be done here
    event.waitUntil(caches.open(cacheName)
        .then((cache) => {
            cache.addAll(resourcesToPrecache);
    }));
});

self.addEventListener('fetch', (event) => {
    // Intercepting http requests - decide to serve files from cache or fallback to server
    event.respondWith(
        caches.match(event.request) || fetch(event.request)
    );
});

self.addEventListener('activate', (event) => {
    console.log(event);

    // Update cache - post internet connection
});