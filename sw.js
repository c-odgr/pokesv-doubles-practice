// 047: keeps the app, Pyodide and the sprites seen so far, so the page opens without a network.
const VERSION = "9eeb3d381454";
const PYODIDE = new URL("pyodide/", self.location).href;  // (served with the site)
const CORE = ["./", "index.html", "worker.js", "pokesv_sim.zip", "manifest.webmanifest", "icon.svg",
  ...["pyodide.js", "pyodide.asm.js", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"].map((f) => "pyodide/" + f)];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// The app's own files: the network first (an update shows at the next reload), the cache when
// offline. Pyodide (pinned, large) and sprites: the cache first.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = e.request.url;
  const sprite = url.includes("/PokeAPI/sprites/");
  const own = url.startsWith(self.registration.scope) && !url.startsWith(PYODIDE);
  e.respondWith(caches.open(VERSION).then(async (c) => {
    if (own) {
      try {
        const res = await fetch(e.request, { cache: "no-cache" });
        if (res.ok) c.put(e.request, res.clone());
        return res;
      } catch (err) {
        const hit = await c.match(e.request, { ignoreSearch: true });
        if (hit) return hit;
        throw err;
      }
    }
    const hit = await c.match(e.request, { ignoreSearch: true });
    if (hit) return hit;
    const res = await fetch(e.request);
    if ((res.ok || res.type === "opaque") && sprite) c.put(e.request, res.clone());
    return res;
  }));
});
