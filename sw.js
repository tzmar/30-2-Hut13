
const CACHE_NAME = 'hustle-tracker-v3-offline';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants.ts',
  './utils.ts',
  './manifest.json',
  // External dependencies are now explicitly pre-cached
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  // Bundled libraries for robust offline support
  'https://esm.sh/react@19.2.3',
  'https://esm.sh/react-dom@19.2.3/client',
  'https://esm.sh/lucide-react@0.562.0?bundle',
  'https://esm.sh/recharts@3.6.0?bundle'
];

// Install Event - Caching all critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching app shell and dependencies');
      return Promise.all(
        ASSETS_TO_CACHE.map(asset => {
          return cache.add(asset).catch(err => {
              console.warn(`Failed to cache ${asset}:`, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate Event - Cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Serve from cache first, then network (Cache-First Strategy)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return from cache if found
      if (cachedResponse) {
        return cachedResponse;
      }
      // If not in cache, fetch from network and cache it
      return fetch(event.request).then((networkResponse) => {
        // Don't cache opaque responses (e.g. from some CDNs without CORS)
        if (networkResponse.type === 'opaque') {
            return networkResponse;
        }

        return caches.open(CACHE_NAME).then((cache) => {
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    }).catch(() => {
      // If both cache and network fail (offline and not cached), provide a fallback for navigation.
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
