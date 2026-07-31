/* ══════════════════════════════════════════════════════════
   ZEESHAN AHMAD — PORTFOLIO SCRIPTS
══════════════════════════════════════════════════════════ */

// ─── HEADER SCROLL EFFECT ────────────────────────────────
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── MOBILE NAV TOGGLE ───────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ─── SCROLL REVEAL ───────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-card, .project-item, .about-card, .contact-link, .chatbot-wrapper'
);

// Add reveal class
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-delay-1');
  if (i % 4 === 2) el.classList.add('reveal-delay-2');
  if (i % 4 === 3) el.classList.add('reveal-delay-3');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ─── ACTIVE NAV HIGHLIGHT ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--text-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
