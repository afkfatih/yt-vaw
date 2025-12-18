const CACHE_NAME = 'yt-vaw-v2';
const PRECACHE_URLS = [
  './',
  './index.html',
  './favicon.svg',
  './icon-192x192.png',
  './icon-512x512.png',
  './manifest.json'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(PRECACHE_URLS);
      })
      .then(function() {
        return self.skipWaiting();
      })
      .catch(function() {
        // Ağ hatasında bile SW kurulsun; PWA cache opsiyonel.
        return self.skipWaiting();
      })
  );
});

// Allow page to force-activate updated SW immediately
self.addEventListener('message', function(event) {
  if (!event || !event.data) return;
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch event
self.addEventListener('fetch', function(event) {
  const request = event.request;

  // Sadece GET isteklerini ve sadece same-origin istekleri cache'le.
  // Harici API'lere yapılan fetch'ler (CORS vb.) SW tarafından ele alınmasın.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first (offline'da cache'e düş)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(function(response) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(request, copy);
          });
          return response;
        })
        .catch(function() {
          return caches.match(request).then(function(cached) {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Diğer same-origin GET'ler: cache-first + arkaplanda güncelle
  event.respondWith(
    caches.match(request).then(function(cached) {
      if (cached) return cached;

      return fetch(request)
        .then(function(response) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(request, copy);
          });
          return response;
        })
        .catch(function() {
          return cached;
        });
    })
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});