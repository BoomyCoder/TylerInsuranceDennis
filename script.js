// Current year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// UTM capture (safe no-ops if fields not present)
try {
  const params = new URLSearchParams(location.search);
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>{
    const el = document.getElementById(k);
    if (el) el.value = params.get(k) || '';
  });
} catch { /* ignore */ }

// Lightweight validation + submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  if (!form) return;

  const btn = document.getElementById('submitBtn');

  const setErr = (id, msg='') => {
    const slot = document.getElementById('err-' + id);
    if (slot) slot.textContent = msg;
  };

  form.addEventListener('submit', (e) => {
    // Prevent default only long enough to validate
    e.preventDefault();

    // clear old errors
    ['firstName','lastName','email','phone','address','coverage','dob','gender','consent']
      .forEach(id => setErr(id, ''));

    let ok = true;

    const first = document.getElementById('firstName')?.value.trim();
    if (!first) { setErr('firstName', 'Required'); ok = false; }

    const last = document.getElementById('lastName')?.value.trim();
    if (!last) { setErr('lastName', 'Required'); ok = false; }

    const email = document.getElementById('email')?.value.trim();
    if (!email) { setErr('email', 'Required'); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('email','Invalid'); ok = false; }

    const phone = document.getElementById('phone')?.value || '';
    const digits = (phone.match(/\d/g) || []).length;
    if (digits < 10) { setErr('phone', '10-digit number'); ok = false; }

    if (!document.getElementById('address')?.value.trim()) { setErr('address','Required'); ok=false; }
    if (!document.getElementById('coverage')?.value) { setErr('coverage','Select an amount'); ok=false; }
    if (!document.getElementById('dob')?.value) { setErr('dob','Required'); ok=false; }
    if (!document.getElementById('gender')?.value) { setErr('gender','Required'); ok=false; }
    if (!document.getElementById('consent')?.checked) { setErr('consent','Required'); ok=false; }

    if (!ok) return; // keep user on page to fix errors

    // guard: disable button to prevent double submit
    if (btn) {
      btn.disabled = true;
      btn.setAttribute('aria-busy','true');
      btn.textContent = 'Sending…';
    }

    // finally allow the native submit to go through
    form.submit();
  });
});
