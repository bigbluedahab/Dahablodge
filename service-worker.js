
const CACHE_NAME = 'dahab-lodge-cache-v1'; // Updated cache name
const urlsToCache = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants.tsx', // Added constants.tsx for pre-caching
  './hooks/useLocalStorage.ts',
  './components/Navbar.tsx',
  './components/RoomCard.tsx',
  './components/BookingModal.tsx',
  './components/EditRoomModal.tsx',
  './components/CurrentBookingsTable.tsx',
  './components/RevenueSummary.tsx',
  './components/BookingTimeline.tsx',
  './icon-192x192.png',
  './icon-512x512.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Opened cache ' + CACHE_NAME);
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Service Worker: Failed to cache resources during install:', error, urlsToCache);
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  // Standard cache-first, then network strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Cache hit
        }

        return fetch(event.request).then(
          (networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Check if this request URL corresponds to one of the assets in urlsToCache
            // to decide if it should be dynamically cached.
            let shouldCacheThisRequest = false;
            const requestUrlStr = event.request.url;
             try {
                for (const relativePathInList of urlsToCache) {
                    // Construct full URL for comparison, robustly
                    if (new URL(relativePathInList, self.registration.scope).href === requestUrlStr) {
                        shouldCacheThisRequest = true;
                        break;
                    }
                }
            } catch(e) {
                console.error("Service Worker: Error constructing URL for caching check:", e);
            }


            if (shouldCacheThisRequest) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Service Worker: Fetch error for', event.request.url, error);
          // Consider returning a custom offline page or response here
          throw error;
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Ensure new SW takes control immediately
  );
});