// Sets the cache name
const CACHE_NAME = 'rbt-radio-v1.0';

// List of files to be cached
const urlsToCache = [
  '/',
  '/index.html',
  '/css/side2.css',
  '/js/new.js',
  'https://cdn.bintangtenggarafm.com/img/f69c7be1aa497aaa87f40d2306c4b3578.png',
  // Add other resources you want to cache here
];

// Install Service Worker and add cached files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepts requests and serves cached files if available
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - returns response from cache
        if (response) {
          return response;
        }
        // Not found in cache - network search
        return fetch(event.request);
      }
    )
  );
});

