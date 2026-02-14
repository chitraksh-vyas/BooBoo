const CACHE = "our-universe-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./assets/us.jpg",
  "./assets/wy1.jpg",
  "./assets/pws.jpg",
  "./assets/ma2.jpg",
  "./assets/eg1.jpg",
  "./assets/ambient.mp3",
  "./assets/rain.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
