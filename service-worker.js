const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    '/index.html',
    '/js/main.js',
    '/styles/main.css',
    '/manifest.json',
    '/images/favicon.svg',
    '/images/nuxt-icon.png',
    '/images/nuxt-pwa.svg'
];

self.addEventListener('install', (event) => {
    // Precaching needs to be done here
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => { cache.addAll(resourcesToPrecache); })
            .then(() => { self.skipWaiting(); })
    );
});

self.addEventListener('fetch', (event) => {
    // Intercepting http requests - decide to serve files from cache or fallback to server
    event.respondWith(
        caches.match(event.request) || fetch(event.request)
    );
});

self.addEventListener('activate', (event) => {
    // Update cache - post internet connection
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("SW cleared old cache");
                        return caches.delete(cache);
                    }
                }))
            })
    );
});