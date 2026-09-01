'use strict';

var CACHE_NAME = 'qibla-compass-v1';
var APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-any-192.png',
  './icons/icon-any-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){ return cache.addAll(APP_SHELL); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(key){ return key !== CACHE_NAME; }).map(function(key){ return caches.delete(key); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

// Stale-while-revalidate: serve from cache instantly when available (so the
// compass still opens offline — useful when travelling without data), while
// refreshing the cache in the background whenever the network is up.
self.addEventListener('fetch', function(event){
  if(event.request.method !== 'GET'){ return; }

  event.respondWith(
    caches.match(event.request).then(function(cached){
      var refresh = fetch(event.request).then(function(response){
        if(response && (response.ok || response.type === 'opaque')){
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, copy); });
        }
        return response;
      }).catch(function(){ return cached; });

      return cached || refresh;
    })
  );
});
