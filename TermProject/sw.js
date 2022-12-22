const cacheName = 'cache-v1';
const precacheResources = ['/TermProject/','/TermProject/src/style.css', '/TermProject/images/logo.png'];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(precacheResources);
        })
    );
});

self.addEventListener("activate", e => {
    console.log('Service worker activate event!');
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            if(response){
                return response;
            }
            return fetch(e.request);
        }),
    );
});