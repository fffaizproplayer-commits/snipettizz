// Shared sidebar nav for the snip.izzcs.my.id site.
// Usage: <div id="nav-root"></div> ... <script src="/nav.js"></script> ... initNav('snippet')

function initNav(activePage) {
  const MAIN_SITE_URL = 'https://api.izzcs.my.id';
  const root = document.getElementById('nav-root');
  if (!root) return;

  const items = [
    { id: 'dashboard', href: `${MAIN_SITE_URL}/dashboard`, icon: 'home', label: 'Dashboard', external: true },
    { id: 'docs', href: `${MAIN_SITE_URL}/docs`, icon: 'book', label: 'Docs', external: true },
    { id: 'snippet', href: '/', icon: 'code', label: 'Snippet' },
    { id: 'donasi', href: `${MAIN_SITE_URL}/donasi`, icon: 'heart', label: 'Donasi', external: true }
  ];

  const navItemsHtml = items.map(it => `
    <a class="nav-item ${it.id === activePage ? 'active' : ''}" href="${it.href}"${it.external ? ' target="_blank" rel="noopener"' : ''}>
      <span class="ic"><svg class="icon"><use href="#icon-${it.icon}"></use></svg></span> ${it.label}
    </a>
  `).join('');

  root.innerHTML = `
    <svg style="display:none">
      <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></symbol>
      <symbol id="icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></symbol>
      <symbol id="icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></symbol>
      <symbol id="icon-folder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></symbol>
      <symbol id="icon-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"></line><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"></line></symbol>
      <symbol id="icon-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></symbol>
      <symbol id="icon-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></symbol>
      <symbol id="icon-database" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></symbol>
      <symbol id="icon-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></symbol>
      <symbol id="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></symbol>
      <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></symbol>
      <symbol id="icon-qr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><line x1="14" y1="14" x2="14" y2="21"></line><line x1="21" y1="14" x2="21" y2="21"></line><line x1="17" y1="17" x2="18" y2="17"></line></symbol>
      <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></symbol>
      <symbol id="icon-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></symbol>
      <symbol id="icon-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></symbol>
      <symbol id="icon-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></symbol>
      <symbol id="icon-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></symbol>
      <symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></symbol>
      <symbol id="icon-message" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></symbol>
      <symbol id="icon-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></symbol>
    </svg>

    <div class="topbar">
      <button class="hamburger" id="navToggle" type="button" aria-label="Menu"><span></span></button>
      <div class="topbar-brand"><span class="dot"></span>snip.izzcs</div>
      <span class="status-pill"><span class="blip"></span>online</span>
    </div>

    <div class="nav-overlay" id="navOverlay"></div>
    <div class="nav-panel" id="navPanel">
      <div class="nav-head">
        <div class="nav-head-brand">snip.izzcs <span class="pill">v1.0</span></div>
        <button class="nav-close" id="navClose" type="button"><svg class="icon icon-sm"><use href="#icon-close"></use></svg></button>
      </div>
      <div class="nav-body">
        <p class="nav-section-label">Main</p>
        ${navItemsHtml}
        <p class="nav-section-label">Links</p>
        <a class="nav-item" href="https://chat.whatsapp.com/KIyuIo4YSYBIhgW1oVUc6r?s=cl&p=a&mlu=4&ilr=4" target="_blank" rel="noopener">
          <span class="ic"><svg class="icon"><use href="#icon-message"></use></svg></span> Grup WhatsApp
        </a>
        <a class="nav-item" href="https://whatsapp.com/channel/0029VbCv97v9Bb5tC5cZFl0K" target="_blank" rel="noopener">
          <span class="ic"><svg class="icon"><use href="#icon-external"></use></svg></span> Channel
        </a>
      </div>
    </div>

    <div class="join-overlay" id="joinOverlay">
      <div class="join-card">
        <button class="nav-close" id="joinClose" type="button"><svg class="icon icon-sm"><use href="#icon-close"></use></svg></button>
        <div class="join-icon"><svg class="icon icon-lg"><use href="#icon-message"></use></svg></div>
        <p class="join-title">Gabung Komunitas izz_api</p>
        <p class="join-desc">Update endpoint baru, info downtime, sama diskusi bareng dev lain — mampir ke channel &amp; grup ya.</p>
        <a class="btn btn-mint join-btn" href="https://whatsapp.com/channel/0029VbCv97v9Bb5tC5cZFl0K" target="_blank" rel="noopener">
          <svg class="icon-sm"><use href="#icon-external"></use></svg> Join Channel
        </a>
        <a class="btn btn-yellow join-btn" href="https://chat.whatsapp.com/KIyuIo4YSYBIhgW1oVUc6r?s=cl&p=a&mlu=4&ilr=4" target="_blank" rel="noopener">
          <svg class="icon-sm"><use href="#icon-message"></use></svg> Join Grup
        </a>
        <button class="join-skip" id="joinSkip" type="button">Nanti aja</button>
      </div>
    </div>
  `;

  const panel = document.getElementById('navPanel');
  const overlay = document.getElementById('navOverlay');

  function openNav() { panel.classList.add('open'); overlay.classList.add('open'); }
  function closeNav() { panel.classList.remove('open'); overlay.classList.remove('open'); }

  document.getElementById('navToggle').addEventListener('click', openNav);
  document.getElementById('navClose').addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  const joinOverlay = document.getElementById('joinOverlay');
  const joinClose = document.getElementById('joinClose');
  const joinSkip = document.getElementById('joinSkip');

  function hideJoinPopup() { joinOverlay.classList.remove('open'); }

  joinClose.addEventListener('click', hideJoinPopup);
  joinSkip.addEventListener('click', hideJoinPopup);
  joinOverlay.addEventListener('click', (e) => { if (e.target === joinOverlay) hideJoinPopup(); });

  try {
    if (!sessionStorage.getItem('izzapi_join_shown')) {
      sessionStorage.setItem('izzapi_join_shown', '1');
      setTimeout(() => joinOverlay.classList.add('open'), 500);
    }
  } catch (e) { /* storage blocked, skip popup */ }
}
