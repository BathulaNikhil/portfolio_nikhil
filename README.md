# Nikhil Bathula — Portfolio Website

A premium, fully responsive **light-theme** portfolio website.  
Built with pure HTML5, CSS3, and vanilla JavaScript — **zero dependencies, zero build step needed**.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main page
├── assets/
│   ├── style.css       ← All styles (light theme, responsive)
│   ├── main.js         ← Animations, interactions, form logic
│   ├── profile.jpg     ← YOUR PHOTO (replace this!)
│   └── resume.pdf      ← YOUR RESUME (replace this!)
└── README.md           ← This file
```

---

## 🚀 Quick Start

**Option A — Open directly in browser:**
```
Just double-click index.html
```

**Option B — Local dev server (recommended):**
```bash
# Python
python3 -m http.server 3000

# Node.js
npx serve .

# VS Code: Install "Live Server" extension, right-click index.html → Open with Live Server
```
Then visit: http://localhost:3000

---

## 🖼️ Add Your Profile Photo

1. Replace `assets/profile.jpg` with your actual photo
2. Recommended: **square image, minimum 400×400px**
3. JPG or PNG format
4. If no photo is found, the avatar gracefully shows your initials "NB"

---

## 📄 Add Your Resume

Replace `assets/resume.pdf` with your actual resume PDF.  
The "Download Resume" button in the hero section will serve it.

---

## 📬 Wire Up the Contact Form

The form validates inputs client-side. To actually send emails, connect one of these backends:

### Option 1 — Formspree (Easiest, Free)

1. Sign up at https://formspree.io
2. Create a new form, copy your form ID (e.g., `xpzbkqoa`)
3. In `assets/main.js`, find the comment `// Option 1: Formspree` and replace the simulated section:

```javascript
const data = new FormData(form);
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  body: data,
  headers: { 'Accept': 'application/json' }
});
if (res.ok) {
  form.reset();
  successMsg.classList.add('show');
}
```

### Option 2 — EmailJS (No Backend Needed)

1. Sign up at https://emailjs.com
2. Create a service + template
3. Add to `index.html` before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>emailjs.init("YOUR_PUBLIC_KEY");</script>
```
4. In `main.js`, replace the simulated section with:
```javascript
await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
```

### Option 3 — Custom API

Point a `fetch` POST to your own backend endpoint (Node.js/FastAPI/Spring Boot).

---

## 🌐 Deploy to Production

### Netlify (Recommended — Free)
1. Drag-and-drop the `portfolio/` folder to https://app.netlify.com/drop
2. Your site is live in ~30 seconds ✅

### GitHub Pages
```bash
git init
git add .
git commit -m "Portfolio v1"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```
Then: GitHub repo → Settings → Pages → Source: `main` → `/root`

### Vercel
```bash
npm i -g vercel
vercel
```

### Your Hetzner Server (Nginx)
```nginx
server {
    listen 80;
    server_name nikhilbathula.com www.nikhilbathula.com;
    root /var/www/portfolio;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
```bash
sudo cp -r portfolio/ /var/www/portfolio
sudo nginx -t && sudo systemctl reload nginx
```
Then set up SSL with Certbot:
```bash
sudo certbot --nginx -d nikhilbathula.com
```

---

## 🎨 Customisation

### Change Accent Color
In `assets/style.css`, update `:root`:
```css
--accent:    #5b57ff;   /* Main purple — change to your brand color */
--accent-2:  #00aadd;   /* Cyan gradient end */
```

### Add / Remove Projects
In `index.html`, duplicate or remove a `.proj-card` block inside `.projects-grid`.

### Update Skills
Find the relevant `#panel-*` section and adjust `data-w` (0–100) on `.bar-fill` elements.

### Add Certifications
After the `#education` section, add a new section following the same `.edu-card` pattern.

---

## ✅ Features

- ✨ Premium light theme with aurora mesh backgrounds
- 🖱️ Custom cursor with smooth lag-ring effect
- 📊 Scroll progress indicator
- 🧭 Floating navbar with scroll-state detection
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎞️ Scroll-triggered fade-in animations
- 📊 Animated skill progress bars (tabbed by category)
- ⏱️ Counter animations on stats section
- 🌐 SEO meta tags
- ♿ Accessibility: ARIA labels, semantic HTML, keyboard navigable
- 📬 Client-side form validation
- 🖼️ Graceful avatar fallback (initials if no photo)
- 🔗 Direct links: LinkedIn, Email, Phone

---

## 📞 Contact

**Nikhil Bathula**  
📧 nikhil.b@nityainc.com  
📱 +91 93900 72128  
🔗 linkedin.com/in/nikhil-bathula-65b65a225  
📍 Hyderabad, India
