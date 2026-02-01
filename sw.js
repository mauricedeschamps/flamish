const CACHE_NAME = 'flemish-verbs-v1.2.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/IMG_20251128_165909_(72_x_72_ピクセル).jpg',
  './icons/IMG_20251128_165842_(96_x_96_ピクセル).jpg',
  './icons/IMG_20251128_165817_(122_x_122_ピクセル).jpg',
  './icons/IMG_20251128_165752_(144_x_144_ピクセル).jpg',
  './icons/IMG_20251128_165731_(152_x_152_ピクセル).jpg',
  './icons/IMG_20251128_165704_(192_x_192_ピクセル).jpg',
  './icons/IMG_20251128_165631_(384_x_384_ピクセル).jpg',
  './icons/IMG_20251128_165608_(512_x_512_ピクセル).jpg'
];

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});