// 047: keeps the app, Pyodide and the sprites seen so far, so the page opens without a network.
const VERSION = "82efcc71c9f1";
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
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(VERSION).then(async (c) => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    if (hit) return hit;
    const res = await fetch(e.request);
    const url = e.request.url;
    if ((res.ok || res.type === "opaque") && url.includes("/PokeAPI/sprites/")) c.put(e.request, res.clone());
    return res;
  }));
});
