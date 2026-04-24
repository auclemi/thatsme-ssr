(function () {
  if (window.__STATS_SCRIPT_LOADED__) return;
  window.__STATS_SCRIPT_LOADED__ = true;

  if (typeof window === 'undefined') return;

  const isDev =
    location.hostname === 'localhost' &&
    (location.port === '4200' || location.port === '4201');

  const endpoint = isDev
    ? 'http://localhost:3100/api/stats'
    : '/api/stats';

  let uid = localStorage.getItem('visitor_id');
  if (!uid) {
    uid = Math.random().toString(36).substring(2);
    localStorage.setItem('visitor_id', uid);
  }

  let lastPath = null;

  function sendStats() {
    const path = window.location.pathname;

    // Sécurité : si path est vide → on ne fait rien
    if (!path) return;

    if (path === lastPath) return;
    lastPath = path;

    const payload = {
      uid,
      path,
      ts: Date.now()
    };

    console.log("STATS →", payload);

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  // Envoi initial après un petit délai (Angular doit avoir chargé la route)
  setTimeout(sendStats, 50);

  // Watcher d’URL
  setInterval(sendStats, 100);
})();
