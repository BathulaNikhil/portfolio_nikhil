/* =============================================
   NIKHIL BATHULA PORTFOLIO — main.js
   ============================================= */

(function () {
  'use strict';

  // ── Dark Mode Toggle ──────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  themeToggle.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    if (isDark) {
      htmlEl.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

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

  document.querySelectorAll('a, button, .proj-card, .clink, .interest-chip, .tl-card, .edu-card, .stat-card, .rv-btn, .resume-dl-btn, .resume-close-btn')
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
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
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
  const burger    = document.getElementById('navBurger');
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

  // ── Scroll Reveals (all directions + stagger) ──
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .stagger';
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay;
        if (delay) e.target.style.transitionDelay = delay;
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll(revealSelectors).forEach(el => revealObserver.observe(el));

  // ── Typing Effect (hero role) ──────────────
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    const phrases = [
      'Senior Software Engineer',
      'Java Full Stack Developer',
      'Python & FastAPI Developer',
      'AI & LLM Builder',
      'Flutter Mobile Developer',
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false, paused = false;
    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    roleEl.innerHTML = '';
    const textNode = document.createTextNode('');
    roleEl.appendChild(textNode);
    roleEl.appendChild(cursor);

    function typeStep() {
      const phrase = phrases[phraseIdx];
      if (paused) { paused = false; return setTimeout(typeStep, deleting ? 600 : 1400); }
      if (!deleting) {
        textNode.nodeValue = phrase.slice(0, ++charIdx);
        if (charIdx === phrase.length) { paused = true; deleting = true; }
        setTimeout(typeStep, 60 + Math.random() * 40);
      } else {
        textNode.nodeValue = phrase.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; paused = true; }
        setTimeout(typeStep, 32);
      }
    }
    setTimeout(typeStep, 1600);
  }

  // ── Magnetic Buttons ──────────────────────
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ── Parallax Hero Blobs ────────────────────
  const blobs = document.querySelectorAll('.mesh-blob');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    blobs.forEach((b, i) => {
      const speed = 0.06 + i * 0.02;
      b.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });

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

  // ── Card Tilt on Hover ─────────────────────
  document.querySelectorAll('.proj-card, .stat-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Contact Form ───────────────────────────
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg   = document.getElementById('formError');

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

      const validName    = validateField('fname',    'err-name',    v => v.length >= 2,  'Please enter your name.');
      const validEmail   = validateField('femail',   'err-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email.');
      const validSubject = validateField('fsubject', 'err-subject', v => v.length >= 3,  'Please enter a subject.');
      const validMessage = validateField('fmessage', 'err-message', v => v.length >= 10, 'Please write at least 10 characters.');

      if (!validName || !validEmail || !validSubject || !validMessage) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sending...';
      if (errorMsg) errorMsg.classList.remove('show');

      try {
        const payload = Object.fromEntries(new FormData(form));
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (result.success) {
          form.reset();
          submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
          successMsg.classList.add('show');
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
            successMsg.classList.remove('show');
          }, 5000);
        } else {
          throw new Error(result.message || 'Submission failed.');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
        if (errorMsg) errorMsg.classList.add('show');
      }
    });
  }

  // ── Resume Modal (PDF.js viewer) ──────────
  const resumeModal    = document.getElementById('resumeModal');
  const resumeModalBox = document.getElementById('resumeModalBox');
  const viewResumeBtn  = document.getElementById('viewResumeBtn');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');

  let pdfDoc = null, pdfScale = 1, pdfLoaded = false;
  const ZOOM_STEPS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  function rvSetBtnsEnabled(on) {
    ['rvPrev','rvNext','rvZoomIn','rvZoomOut','rvFitWidth'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = !on;
    });
  }

  function rvFitScale() {
    const container = document.getElementById('rvPages');
    const first = pdfDoc._pdfInfo ? null : null; // just use clientWidth
    if (!pdfDoc) return Promise.resolve(1);
    return pdfDoc.getPage(1).then(p => {
      const vp = p.getViewport({ scale: 1 });
      const w = container.clientWidth - 32;
      return Math.max(0.5, w / vp.width);
    });
  }

  async function rvRender(scale) {
    const container = document.getElementById('rvPages');
    container.innerHTML = '<div class="rv-loading"><div class="rv-spinner"></div><span>Rendering pages…</span></div>';

    // Build all page wrappers first so they appear immediately
    const jobs = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page    = await pdfDoc.getPage(i);
      const vp      = page.getViewport({ scale });
      const canvas  = document.createElement('canvas');
      canvas.width  = Math.round(vp.width);
      canvas.height = Math.round(vp.height);
      const wrap    = document.createElement('div');
      wrap.className  = 'rv-page-wrap';
      wrap.dataset.page = i;
      wrap.appendChild(canvas);
      jobs.push({ canvas, page, vp, wrap });
    }

    container.innerHTML = '';
    jobs.forEach(j => container.appendChild(j.wrap));

    // Render each page onto its canvas
    for (const { canvas, page, vp } of jobs) {
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
    }

    pdfScale = scale;
    document.getElementById('rvZoomVal').textContent = Math.round(scale * 100) + '%';
    rvSetBtnsEnabled(true);

    // Scroll-based page counter
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          document.getElementById('rvCurrentPage').textContent = e.target.dataset.page;
      });
    }, { root: container, threshold: 0.3 });
    jobs.forEach(j => obs.observe(j.wrap));
  }

  async function rvLoad() {
    if (pdfLoaded) return;
    pdfLoaded = true;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.js';
    try {
      pdfDoc = await pdfjsLib.getDocument('assets/NikhilResume.pdf').promise;
      document.getElementById('rvTotalPages').textContent  = pdfDoc.numPages;
      document.getElementById('rvCurrentPage').textContent = '1';
      const scale = await rvFitScale();
      await rvRender(scale);
    } catch (err) {
      console.error('PDF load error:', err);
      document.getElementById('rvPages').innerHTML =
        '<div class="rv-loading"><span style="color:#f87171">Failed to load PDF. Check console.</span></div>';
    }
  }

  function openResume() {
    resumeModal.classList.add('open');
    resumeModal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    resumeModalBox.focus();
    setTimeout(rvLoad, 60);
  }
  function closeResume() {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('rvZoomIn')?.addEventListener('click', async () => {
    const next = ZOOM_STEPS.find(s => s > pdfScale + 0.01);
    if (next) await rvRender(next);
  });
  document.getElementById('rvZoomOut')?.addEventListener('click', async () => {
    const prev = [...ZOOM_STEPS].reverse().find(s => s < pdfScale - 0.01);
    if (prev) await rvRender(prev);
  });
  document.getElementById('rvFitWidth')?.addEventListener('click', async () => {
    const scale = await rvFitScale();
    await rvRender(scale);
  });
  document.getElementById('rvPrev')?.addEventListener('click', () => {
    const cur = parseInt(document.getElementById('rvCurrentPage').textContent);
    if (cur > 1) rvScrollTo(cur - 1);
  });
  document.getElementById('rvNext')?.addEventListener('click', () => {
    const cur   = parseInt(document.getElementById('rvCurrentPage').textContent);
    const total = parseInt(document.getElementById('rvTotalPages').textContent);
    if (cur < total) rvScrollTo(cur + 1);
  });

  function rvScrollTo(n) {
    const pg = document.querySelector(`#rvPages [data-page="${n}"]`);
    if (pg) pg.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (viewResumeBtn)  viewResumeBtn.addEventListener('click', openResume);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', e => {
    if (e.target === resumeModal) closeResume();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) closeResume();
  });

  // ── Footer year ────────────────────────────
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ── Smooth scroll for anchor links ─────────
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
