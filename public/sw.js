const CACHE='klassenklar-shell-v39';
const CORE=['/','/styles.css?v=4','/equipment.js?v=4','/curriculum.js?v=23','/app.js?v=18','/manifest.webmanifest','/icon.svg','/autofom-diagram.svg','/zp-diagram.svg','/optigrade-diagram.svg','/autofom-lengths.svg','/checks-learning.svg','/optigrade-checks.svg','/slaughter-learning.svg','/weighing-learning.svg','/anatomy-cuts-clean.png','/anatomy-directions-clean.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||u.pathname.startsWith('/api/'))return;
  e.respondWith(caches.match(e.request).then(cached=>{
    const networkFetch=fetch(e.request).then(r=>{
      if(r&&r.status===200){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}
      return r;
    }).catch(()=>cached||(e.request.mode==='navigate'?caches.match('/'):null));
    return cached||networkFetch;
  }));
});




















