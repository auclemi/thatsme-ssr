
(function () {
 if (window.__STATS_SCRIPT_LOADED__) {
  console.log('STATS déjà chargé → on ignore');
  return;
}
window.__STATS_SCRIPT_LOADED__ = true;
    // Ne pas exécuter côté serveur (SSR)
  if (typeof window === 'undefined') return;

  const endpoint =
    location.hostname === 'localhost'
      ? 'http://localhost:3000/api/stats'
      : '/api/stats';

  let uid = localStorage.getItem('visitor_id');
  if (!uid) {
    uid = Math.random().toString(36).substring(2);
    localStorage.setItem('visitor_id', uid);
  }

  let lastPath = null;

  function sendStats() {
    const path = window.location.pathname;

    if (path === lastPath) return;
    lastPath = path;

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid,
        path,
        ts: Date.now()
      })
    }).catch(() => {});
  }

  // Envoi initial
  sendStats();

  // Watcher d’URL
  setInterval(sendStats, 100);
})();
