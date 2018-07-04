let cacheName = 'restaurant-app-cache';

self.addEventListener('install', function(event) {
    
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll([
          '/',
          'css/styles.css',
          'js/main.js',
          '/index.html',
        ]);
      })
    );
  });

  
  
  self.addEventListener('fetch', function(event) {  
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    
  )
  });

  self.addEventListener('fetch', function(event) {  
    if (event.request.url.indexOf('https://maps.googleapis.com/maps/api/js') == 0) {
      event.waitUntil(
      caches.open(cacheName).then(function(cache) {
          cache.add(event.request);
      })
      )
    }
  })