// frontend/public/service-worker.js
// Basic service worker - enhance if full PWA offline capabilities are needed

const CACHE_NAME = 'deepfake-detector-cache-v1';
// Add essential assets expected to be available offline
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add main icons if needed offline immediately
  '/icon-192.png',
  '/icon-512.png',
  '/vite.svg'
  // JS/CSS bundles are usually added dynamically or via build tool integration
];

self.addEventListener('install', event => {
  console.log('[SW] Install event');
  // Pre-cache core assets during install
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Activate immediately
      .catch(error => console.error('[SW] Caching failed during install:', error))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate event');
  // Remove old caches during activation
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of open clients
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests for simplicity
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignore API calls or other non-cacheable assets
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    // console.log('[SW] Ignoring API fetch:', event.request.url);
    return;
  }

  // Cache-First Strategy for core assets (defined in CORE_ASSETS)
  if (CORE_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // console.log('[SW] Serving from cache:', event.request.url);
            return cachedResponse;
          }
          // console.log('[SW] Core asset not in cache, fetching:', event.request.url);
          return fetch(event.request); // Fetch if not in cache
        })
    );
    return; // Don't continue further
  }

  // Network-First Strategy for other assets (like JS/CSS chunks, images)
  // Try network, fallback to cache, optionally cache successful network responses
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse; // Return error response as is
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            // console.log('[SW] Caching new resource:', event.request.url);
            cache.put(event.request, responseToCache);
          });

        return networkResponse;
      })
      .catch(error => {
        // Network request failed, try serving from cache
        // console.log('[SW] Network failed, trying cache for:', event.request.url);
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Optional: Return an offline fallback page if nothing is cached
            // console.log('[SW] Not in cache either, request failed:', event.request.url);
            // return caches.match('/offline.html'); // Make sure '/offline.html' is cached
            return new Response("Network error and resource not cached.", {
              status: 408, // Request Timeout
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});