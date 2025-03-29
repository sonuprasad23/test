// Basic service worker for PWA features (caching)
const CACHE_NAME = 'deepfake-detector-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add paths to your main JS/CSS bundles if known, or cache dynamically
  // '/assets/index-*.js',
  // '/assets/index-*.css',
  '/vite.svg', // Add static assets
  '/icon-192.png',
  '/icon-512.png'
];

// Install event: Cache core assets
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // Activate worker immediately
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of clients immediately
  );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests like those for Google Fonts or APIs
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

   // Use Cache-First strategy for app shell assets
   if (URLS_TO_CACHE.includes(new URL(event.request.url).pathname)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
    return; // Important: Stop processing here for cache-first assets
  }


  // Use Network-First strategy for other requests (e.g., API calls if they were same-origin)
  // Or simply let them pass through (fetch) if they are API calls etc.
  event.respondWith(
    fetch(event.request).catch(() => {
      // Optional: Return a fallback offline page if fetch fails
      // return caches.match('/offline.html');
    })
  );
});