(() => {
  const els = [...document.querySelectorAll('[data-reveal]')];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-visible')); return; }
  const n = new Map();
  els.forEach(e => { const p = e.parentElement, i = n.get(p) || 0; e.style.setProperty('--d', i * .08 + 's'); n.set(p, i + 1); });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: .01, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
  setTimeout(() => els.forEach(e => { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('is-visible'); }), 1500);
})();
{ const d = document.getElementById('day'), t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset()); d.min = t.toISOString().slice(0, 10); }
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, v = n => f.elements[n].value.trim();
  const day = v('day') ? new Date(v('day') + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'any day';
  const tech = v('tech') === 'No preference' ? '' : ' with ' + v('tech');
  const tue = v('day') && new Date(v('day') + 'T12:00').getDay() === 2 ? ' Heads up: Google lists Tuesdays as closed.' : '';
  const r = document.getElementById('form-result');
  r.textContent = `${v('service')}${tech}, ${day}, ${v('time').toLowerCase()}, for ${v('name')}. Preview only: nothing was sent. On the real site, the shop confirms by text or call.${tue}`;
  r.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
// logo goes back to the top (smooth unless reduced motion), without leaving #top in the address bar
document.querySelector('.brand').addEventListener('click', e => {
  e.preventDefault();
  scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
});
