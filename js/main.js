/* main.js — mobile nav, form validation, scroll reveal */
/* Keep this small and dependency-free. Replace demo send with real backend / Netlify forms later. */

(function () {
  'use strict';

  // Helpers
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => document.querySelectorAll(s);

  // Set current year in footer(s)
  const yearEls = qsa('#year, #year-footer, #year-footer-2, #year-footer-3');
  const y = new Date().getFullYear();
  yearEls.forEach(el => { if (el) el.textContent = y; });

  // Mobile nav toggle
  qsa('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (nav) {
        nav.style.display = expanded ? '' : 'block';
        // small animation
        if (!expanded) {
          nav.style.opacity = 0;
          requestAnimationFrame(() => { nav.style.transition = 'opacity .18s'; nav.style.opacity = 1; });
        }
      }
    });
  });

  // Contact form validation + demo send
  const form = qs('#contact-form');
  if (form) {
    const status = qs('#form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = qs('#name').value.trim();
      const email = qs('#email').value.trim();
      const message = qs('#message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill all fields before sending.';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = 'Enter a valid email address.';
        return;
      }

      // Demo send — replace with real endpoint or Netlify Forms / Formspree
      status.textContent = 'Sending message...';
      setTimeout(() => {
        status.textContent = 'Message sent — thank you! (Demo send)';
        form.reset();
      }, 900);
    });
  }

  // Scroll reveal using IntersectionObserver
  const revealEls = qsa('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.classList.add('revealed');
          obs.unobserve(ent.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    // fallback
    revealEls.forEach(el => el.classList.add('revealed'));
  }

})();
