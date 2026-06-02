/* =============================================
   NIKHIL BATHULA PORTFOLIO — main.js
   ============================================= */

(function () {
  'use strict';

  // ── Custom Cursor ──────────────────────────
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .proj-card, .clink, .interest-chip, .tl-card, .edu-card, .stat-card')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

  // ── Scroll Progress Bar ────────────────────
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  // ── Navbar Scroll State ────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Active Nav Link ────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // ── Mobile Menu ────────────────────────────
  const burger   = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ── Reveal on Scroll ───────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Skills Tabs ────────────────────────────
  function animateBars(panel) {
    panel.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.transform = 'scaleX(0)';
      requestAnimationFrame(() => {
        setTimeout(() => {
          bar.style.transform = 'scaleX(' + (bar.dataset.w / 100) + ')';
        }, 60);
      });
    });
  }

  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.dataset.panel);
      panel.classList.add('active');
      animateBars(panel);
    });
  });

  // Animate bars when section visible
  const skillsSection = document.getElementById('skills');
  const skillsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateBars(document.getElementById('panel-backend'));
      skillsObserver.disconnect();
    }
  }, { threshold: 0.2 });
  if (skillsSection) skillsObserver.observe(skillsSection);

  // ── Counter Animation ──────────────────────
  function animateCounter(el, target, suffix) {
    const duration = 1800;
    let start = null;
    function tick(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(ease * target);
      el.textContent = (val >= 1000 ? val.toLocaleString() : val) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, +el.dataset.target, el.dataset.suffix || '');
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) statsObserver.observe(statsGrid);

  // ── Contact Form ───────────────────────────
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const successMsg  = document.getElementById('formSuccess');

  function validateField(id, errId, validator, message) {
    const input = document.getElementById(id);
    const err   = document.getElementById(errId);
    if (!validator(input.value.trim())) {
      input.classList.add('invalid');
      err.textContent = message;
      return false;
    }
    input.classList.remove('invalid');
    err.textContent = '';
    return true;
  }

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const validName    = validateField('fname',    'err-name',    v => v.length >= 2, 'Please enter your name.');
      const validEmail   = validateField('femail',   'err-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email.');
      const validSubject = validateField('fsubject', 'err-subject', v => v.length >= 3, 'Please enter a subject.');
      const validMessage = validateField('fmessage', 'err-message', v => v.length >= 10, 'Please write at least 10 characters.');

      if (!validName || !validEmail || !validSubject || !validMessage) return;

      // ── Connect your form backend here ──
      // Option 1: Formspree
      //   Change action to: https://formspree.io/f/YOUR_ID
      //   Uncomment below and remove the simulated response:
      //
      // const data = new FormData(form);
      // const res = await fetch('https://formspree.io/f/YOUR_ID', {
      //   method: 'POST', body: data, headers: { 'Accept': 'application/json' }
      // });
      // if (res.ok) { ... }
      //
      // Option 2: EmailJS — see README.md
      // Option 3: Custom API — see README.md

      // Simulated success (remove once backend is wired):
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sending...';
      await new Promise(r => setTimeout(r, 1200));
      form.reset();
      submitBtn.innerHTML = '✓ Message Sent!';
      successMsg.classList.add('show');
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
        successMsg.classList.remove('show');
      }, 5000);
    });
  }

  // ── Smooth scroll for all anchor links ────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
