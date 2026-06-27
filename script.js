'use strict';

// ── Data ──────────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  'img/panely1.png',
  'img/image1.png',
  'img/rozvodnavoltajka.png',
  'img/svetla.png',
];

const SERVICES = [
  {
    num: '01', title: 'Prerábky bytov',
    desc: 'Kompletné elektrické rozvody pri rekonštrukciách bytov a domov.',
    items: ['Nové elektrické rozvody', 'Zásuvky a vypínače', 'Elektrické rozvádzače', 'Slaboproudé siete'],
  },
  {
    num: '02', title: 'Fotovoltika',
    desc: 'Inštalácia solárnych panelov a hybridných systémov pre domácnosti.',
    items: ['Šikmé aj ploché strechy', 'Hybridné invertory', 'Batériové zálohovanie', 'Monitoring výkonu'],
  },
  {
    num: '03', title: 'Elektroinštalácie',
    desc: 'Nové elektrické inštalácie pre novostavby aj rekonštrukcie.',
    items: ['Revízie a správy', 'Hromozvodové sústavy', 'Smart home systémy', 'Priemyselné rozvody'],
  },
  {
    num: '04', title: 'Osvetlenie',
    desc: 'Montáž a nastavenie moderných svietidiel a svetelných scén.',
    items: ['Interiérové osvetlenie', 'LED technológie', 'Vonkajšie osvetlenie', 'Stmievače a scény'],
  },
];

const GALLERIES = [
  { id: 'g1', src: 'img/image1.png',           cat: 'prerabky',    title: 'Elektrické rozvody',            desc: 'Komplexné elektroinštalácie' },
  { id: 'g2', src: 'img/image.png',             cat: 'prerabky',    title: 'Prerábka bytu',                 desc: 'Nové elektrické rozvody' },
  { id: 'g3', src: 'img/svetla.png',            cat: 'montaze',     title: 'Montáž osvetlenia',             desc: 'Moderné dizajnové svietidlá' },
  { id: 'g4', src: 'img/panely1.png',           cat: 'fotovoltika', title: 'Solárne panely – šikmá strecha', desc: 'Rodinný dom, inštalácia FV systému' },
  { id: 'g5', src: 'img/panely2.png',           cat: 'fotovoltika', title: 'Fotovoltika – plochá strecha',  desc: 'Komerčná inštalácia' },
  { id: 'g6', src: 'img/rozvodnavoltajka.png',  cat: 'montaze',     title: 'Rozvádzač + Invertor',          desc: 'Solárny systém, kompletná inštalácia' },
];

const FILTER_BTNS = [
  { label: 'Všetky',      val: 'all'         },
  { label: 'Prerábky',    val: 'prerabky'    },
  { label: 'Fotovoltika', val: 'fotovoltika' },
  { label: 'Montáže',     val: 'montaze'     },
];

// ── Progress bar ──────────────────────────────────────────────────────────────
function updateProgress() {
  const bar = document.getElementById('prog-bar');
  if (!bar) return;
  const pct = (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + '%';
}

// ── Hero image cycling ─────────────────────────────────────────────────────────
function initHero() {
  const el = document.getElementById('hero-bg');
  if (!el) return;
  let idx = 0;

  function apply(i) {
    el.style.backgroundImage =
      `linear-gradient(125deg,rgba(7,7,15,.82) 0%,rgba(7,7,15,.5) 60%,rgba(7,7,15,.32) 100%),url('${HERO_IMAGES[i]}')`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
  }
  apply(0);

  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % HERO_IMAGES.length;
      apply(idx);
      el.style.opacity = '1';
    }, 700);
  }, 6500);
}

// ── Header scroll ─────────────────────────────────────────────────────────────
function updateHeader() {
  const h = document.getElementById('header');
  if (h) h.classList.toggle('scrolled', window.scrollY > 50);
}

// ── Mobile menu ───────────────────────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('nav-mobile');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Active nav on scroll ───────────────────────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-d a[href^="#"]');

  function update() {
    const pos = window.scrollY + 100;
    sections.forEach(s => {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`);
        });
      }
    });
  }
  window.addEventListener('scroll', update, { passive: true });
}

// ── Back to top ───────────────────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('btt');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 420), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Services grid ─────────────────────────────────────────────────────────────
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <div class="svc-card">
      <div class="svc-num">${s.num}</div>
      <h3 class="svc-title">${s.title}</h3>
      <p class="svc-desc">${s.desc}</p>
      <ul class="svc-items">
        ${s.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
      <div class="svc-bar"></div>
    </div>
  `).join('');
}

// ── Gallery ───────────────────────────────────────────────────────────────────
let currentFilter = 'all';

function renderFilters() {
  const wrap = document.getElementById('gallery-filters');
  if (!wrap) return;
  wrap.innerHTML = FILTER_BTNS.map(b => `
    <button class="filter-btn${b.val === currentFilter ? ' active' : ''}" data-val="${b.val}">${b.label}</button>
  `).join('');
  wrap.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.val;
      renderFilters();
      renderGallery();
    });
  });
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const items = currentFilter === 'all' ? GALLERIES : GALLERIES.filter(g => g.cat === currentFilter);
  grid.innerHTML = items.map(g => `
    <div class="gal-item" data-id="${g.id}">
      <img src="${g.src}" alt="${g.title}" loading="lazy">
      <div class="gal-overlay">
        <span class="gal-overlay-title">${g.title}</span>
        <span class="gal-overlay-desc">${g.desc}</span>
        <span class="gal-overlay-cta">ZOBRAZIŤ</span>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.gal-item').forEach((el, i) => {
    el.addEventListener('click', () => openLightbox(items[i]));
  });
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function openLightbox(item) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-img').alt = item.title;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-desc').textContent = item.desc;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function initLightbox() {
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ── Contact form ──────────────────────────────────────────────────────────────
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Odosiela sa…';
    btn.disabled = true;

    const params = {
      from_name:  form.querySelector('#f-name').value,
      from_email: form.querySelector('#f-email').value,
      phone:      form.querySelector('#f-phone').value,
      service:    form.querySelector('#f-service').value,
      message:    form.querySelector('#f-message').value || 'Bez správy',
      to_email:   'ondrej.el3@gmail.com',
    };

    document.getElementById('form-success').classList.remove('visible');

    function onSuccess() {
      try {
        const msgs = JSON.parse(localStorage.getItem('ae_messages')) || [];
        msgs.push({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: params.from_name,
          phone: params.phone,
          email: params.from_email,
          service: params.service,
          status: 'new',
          date: new Date().toISOString(),
        });
        localStorage.setItem('ae_messages', JSON.stringify(msgs));
      } catch (e) { /* localStorage unavailable */ }

      document.getElementById('form-success').classList.add('visible');
      form.reset();
      btn.textContent = 'Odoslať dopyt';
      btn.disabled = false;
    }

    function onError() {
      alert('Chyba pri odosielaní. Zavolajte: 0908 775 426');
      btn.textContent = 'Odoslať dopyt';
      btn.disabled = false;
    }

    if (window.emailjs) {
      emailjs.send('service_nfwjqup', 'template_ovj4rgx', params)
        .then(onSuccess)
        .catch(onError);
    } else {
      onError();
    }
  });
}

// ── Phone formatting ──────────────────────────────────────────────────────────
function initPhoneFormat() {
  const input = document.getElementById('f-phone');
  if (!input) return;
  input.addEventListener('input', e => {
    let v = e.target.value.replace(/\s/g, '');
    if (v.length > 7)      v = v.slice(0,4) + ' ' + v.slice(4,7) + ' ' + v.slice(7,10);
    else if (v.length > 4) v = v.slice(0,4) + ' ' + v.slice(4);
    e.target.value = v;
  });
}

// ── EmailJS init ──────────────────────────────────────────────────────────────
function initEmailJS() {
  if (window.emailjs) emailjs.init('mGjh_53NjFYvMOPCI');
}

// ── Boot ──────────────────────────────────────────────────────────────────────
function boot() {
  initEmailJS();
  initHero();
  initMobileMenu();
  initActiveNav();
  initBackToTop();
  renderServices();
  renderFilters();
  renderGallery();
  initLightbox();
  initForm();
  initPhoneFormat();

  window.addEventListener('scroll', () => {
    updateProgress();
    updateHeader();
  }, { passive: true });

  updateProgress();
  updateHeader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
