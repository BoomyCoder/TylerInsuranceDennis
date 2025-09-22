// ===== Mobile navigation toggle =====
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const header = document.querySelector('.site-header');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

// ===== Header shadow on scroll =====
window.addEventListener('scroll', () => {
  header?.setAttribute('data-scrolled', String(window.scrollY > 4));
});

// ===== Current year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Respect reduced motion =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}

// ===== UTM auto-fill for FormSubmit =====
(function () {
  const params = new URLSearchParams(window.location.search);
  const ids = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = params.get(id) || '';
  });
  // keep honeypot unfocusable
  const honey = document.getElementById('_honey');
  if (honey) honey.setAttribute('tabindex','-1');
})();

// IMPORTANT: No submit handler here.
// Let the browser POST the form to FormSubmit, which will handle _next redirect.
