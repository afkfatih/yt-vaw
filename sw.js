const CACHE_NAME = 'yt-dlp-cmd-v3';

const BOOTSTRAP_CSS =
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';

const PRECACHE_URLS = [
  './',
  './index.html',
  './404.html',
  './favicon.svg',
  './icon-192x192.png',
  './icon-512x512.png',
  './manifest.json',
  // Bootstrap CDN'den geliyor. Precache edilmezse "offline çalışır" iddiası
  // yalan olur: sayfa açılır ama tamamen stilsiz görünür.
  BOOTSTRAP_CSS
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        // Tek tek eklenir: addAll bir URL'de başarısız olursa tüm precache'i
        // iptal eder, bu yüzden CDN'in erişilemez olması her şeyi çökertirdi.
        return Promise.all(
          PRECACHE_URLS.map(function (url) {
            return cache.add(url).catch(function () {});
          })
        );
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', function (event) {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isPrecachedCdn = request.url === BOOTSTRAP_CSS;

  // Diğer harici istekler (küçük resim vb.) SW'ye uğramadan geçsin.
  if (!isSameOrigin && !isPrecachedCdn) return;

  // Gezinmeler: network-first, çevrimdışında cache'e düş.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
          return response;
        })
        .catch(function () {
          return caches.match(request).then(function (cached) {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Varlıklar: stale-while-revalidate. Eski davranış saf cache-first'tü;
  // bir kez cache'lenen dosya asla tazelenmiyordu.
  event.respondWith(
    caches.match(request).then(function (cached) {
      const network = fetch(request)
        .then(function (response) {
          if (response && (response.ok || response.type === 'opaque')) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, copy);
            });
          }
          return response;
        })
        .catch(function () {
          return cached;
        });

      return cached || network;
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});
