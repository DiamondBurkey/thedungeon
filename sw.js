const CACHE='dungeon-crawler-v2';
const ASSETS=[
  '/thedungeon/',
  '/thedungeon/index.html',
  '/thedungeon/manifest.json',
  '/thedungeon/icon-192.png',
  '/thedungeon/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/thedungeon/index.html')))
  );
});
