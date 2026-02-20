/* ============================================================
   AartSense Music Studio — Main JavaScript
   ============================================================ */

/* ======================== NAVIGATION ======================== */
const navbar    = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ======================== CURSOR GLOW ======================== */
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

/* ======================== SCROLL REVEAL ======================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ======================== COUNTER ANIMATION ======================== */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = target / 70;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el     = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ======================== WAVE CANVAS ======================== */
const canvas = document.getElementById('waveCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let time = 0;
  const waves = [
    { amp: 45,  freq: 0.007,  speed: 0.018, color: 'rgba(212,160,23,0.14)',  yOff:  0   },
    { amp: 32,  freq: 0.011,  speed: 0.024, color: 'rgba(123,47,190,0.11)',   yOff:  0.08},
    { amp: 55,  freq: 0.005,  speed: 0.013, color: 'rgba(212,160,23,0.07)',   yOff: -0.08},
    { amp: 22,  freq: 0.015,  speed: 0.03,  color: 'rgba(155,79,222,0.08)',   yOff:  0.15},
  ];

  function drawWave(w) {
    const cy = canvas.height * (0.5 + w.yOff);
    ctx.beginPath();
    ctx.moveTo(0, cy);
    for (let x = 0; x <= canvas.width; x++) {
      ctx.lineTo(x, cy + Math.sin(x * w.freq + time * w.speed) * w.amp);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = w.color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, cy);
    for (let x = 0; x <= canvas.width; x++) {
      ctx.lineTo(x, cy + Math.sin(x * w.freq + time * w.speed) * w.amp);
    }
    ctx.strokeStyle = w.color.replace(/[\d.]+\)$/, '0.35)');
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waves.forEach(drawWave);
    time++;
    requestAnimationFrame(animate);
  })();
}

/* ======================== PORTFOLIO FILTER ======================== */
const filterBtns    = document.querySelectorAll('.filter-btn');
const portfolioItems= document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      if (show) {
        item.style.display  = '';
        setTimeout(() => { item.style.opacity = '1'; item.style.transform = ''; }, 10);
      } else {
        item.style.opacity  = '0';
        item.style.transform= 'scale(0.95)';
        setTimeout(() => { item.style.display = 'none'; }, 360);
      }
    });
  });
});

/* ======================== EQUALIZER BARS (random animation) ======================== */
const eqHeights = [18,34,52,28,46,60,24,42,56,32,48,30,44,20,54,36,50,26,40,58];
document.querySelectorAll('.eq-bar').forEach((bar, i) => {
  bar.style.height          = eqHeights[i % eqHeights.length] + 'px';
  bar.style.animationDelay  = (i * 0.09) + 's';
  bar.style.animationDuration = (0.7 + Math.random() * 0.9) + 's';
});

const visHeights = [28,48,70,44,62,82,38,66,54,34,72,50,42,66,28,56,40,76,32,60];
document.querySelectorAll('.vis-bar').forEach((bar, i) => {
  bar.style.height          = visHeights[i % visHeights.length] + 'px';
  bar.style.animationDelay  = (i * 0.07) + 's';
  bar.style.animationDuration = (0.55 + Math.random() * 0.65) + 's';
});

/* ======================== VINYL GROOVES ======================== */
const vinylGrooves = document.querySelector('.vinyl-grooves');
if (vinylGrooves) {
  for (let i = 0; i < 22; i++) {
    const groove = document.createElement('div');
    groove.className = 'vinyl-groove';
    groove.style.setProperty('--scale', (0.28 + i * 0.033));
    vinylGrooves.appendChild(groove);
  }
}

/* ======================== CONTACT FORM ======================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled    = true;
    setTimeout(() => {
      btn.textContent   = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#2d8a4e,#1a6b35)';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent  = orig;
        btn.disabled     = false;
        btn.style.background = '';
      }, 3200);
    }, 1600);
  });
}

/* ======================== SMOOTH SCROLL FOR ANCHOR LINKS ======================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

/* ======================== PARALLAX (subtle) ======================== */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroVis  = document.querySelector('.hero-visual');
  if (heroVis) heroVis.style.transform = `translateY(${scrolled * 0.08}px)`;
});
