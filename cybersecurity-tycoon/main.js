/* ════════════════════════════════════════════════════════════
   main.js — CyberSecurity Tycoon landing page
════════════════════════════════════════════════════════════ */

/* ── YOUTUBE FACADE (click-to-play) ─────────────────────── */
function loadYT() {
  const facade = document.getElementById('ytFacade');
  const iframe  = document.getElementById('ytIframe');
  if (!facade || !iframe) return;
  iframe.src = 'https://www.youtube.com/embed/aZBiqEP6pJU?autoplay=1&rel=0';
  iframe.style.display = 'block';
  facade.style.display = 'none';
}

/* ── ACCENT COLOR SYNC → Three.js ───────────────────────────
   Reads --accent-hex from CSS so Three.js uses the same color
   as the rest of the site. Change CSS var only, JS follows.   */
function getAccentHex() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-hex').trim();
  return parseInt(raw.replace('#', ''), 16);
}

/* ── CUSTOM CURSOR ──────────────────────────────────────── */
(function initCursor() {
  const cur  = document.getElementById('cur');
  const curR = document.getElementById('cur-r');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    curR.style.left = rx + 'px';
    curR.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
})();

/* ── THREE.JS BACKGROUND ────────────────────────────────── */
(function initThree() {
  const accentColor = getAccentHex();
  const scene = new THREE.Scene();
  const cam   = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, .1, 1000);
  const ren   = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true, antialias: false
  });
  ren.setSize(innerWidth, innerHeight);
  cam.position.z = 85;

  // Particles
  const N   = 1700;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  const vel = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random() - .5) * 220;
    pos[i*3+1] = (Math.random() - .5) * 220;
    pos[i*3+2] = (Math.random() - .5) * 180;
    vel[i*3]   = (Math.random() - .5) * .033;
    vel[i*3+1] = (Math.random() - .5) * .033;
    vel[i*3+2] = (Math.random() - .5) * .020;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({ color: accentColor, size: .28, transparent: true, opacity: .5 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  // Retro grid (matches logo style)
  const gm = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: .045 });
  for (let x = -120; x <= 120; x += 18) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, -120, 0), new THREE.Vector3(x, 120, 0)
    ]);
    scene.add(new THREE.Line(g, gm));
  }
  for (let y = -120; y <= 120; y += 18) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-120, y, 0), new THREE.Vector3(120, y, 0)
    ]);
    scene.add(new THREE.Line(g, gm));
  }

  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    ren.setSize(innerWidth, innerHeight);
  });

  let t = 0;
  (function loop() {
    requestAnimationFrame(loop);
    t += .0015;
    const p = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      p[i*3]   += vel[i*3];
      p[i*3+1] += vel[i*3+1];
      p[i*3+2] += vel[i*3+2];
      if (Math.abs(p[i*3])   > 110) vel[i*3]   *= -1;
      if (Math.abs(p[i*3+1]) > 110) vel[i*3+1] *= -1;
      if (Math.abs(p[i*3+2]) >  90) vel[i*3+2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;
    pts.rotation.y = t * .055;
    pts.rotation.x = t * .022;
    ren.render(scene, cam);
  })();
})();

/* ── SCREENSHOTS CAROUSEL ───────────────────────────────── */
(function initCarousel() {
  const track = document.getElementById('track');
  const screens = [
    { src: 'screen3.png',  label: 'LIVE OFFICE' },
    { src: 'screen2.png',  label: 'TEAM MANAGEMENT' },
    { src: 'screen1.png',  label: 'BLACK MARKET' },
    { src: 'screen4.png',  label: 'R&D SKILL TREE' },
    { src: 'screen5.png',  label: 'RECRUITMENT' },
    { src: 'screen6.png',  label: 'COMMERCIAL DASHBOARD' },
    { src: 'screen7.png',  label: 'CYBERCUP ARENA' },
    { src: 'screen8.png',  label: 'COMPETITION RANKING' },
    { src: 'screen9.png',  label: 'RIVALRY & NEWS' },
    { src: 'screen10.png', label: 'MARKET' },
    { src: 'screen11.png', label: 'ACTIVE CLIENTS' },
  ];

  // Build two identical sets for seamless infinite scroll
  [...screens, ...screens].forEach(s => {
    track.innerHTML += `
      <div class="screen-card">
        <img src="${s.src}" alt="${s.label}" loading="lazy"/>
        <div class="sc-label">${s.label}</div>
      </div>`;
  });
})();

/* ── SCROLL REVEAL ──────────────────────────────────────── */
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ── CYBER WAR TERMINAL LIVE FEED ───────────────────────── */
(function initTerminal() {
  const lines = [
    { d: 3200, h: '<div><span class="ok">✓</span> <span class="dim">Zero-day op success · NovaSec REP -420</span></div>' },
    { d: 4800, h: '<div><span class="w">⚠ </span><span class="dim">Counter-espionage triggered by GhostMatrix</span></div>' },
    { d: 6400, h: '<div><span class="p">$ </span><span class="c">counter --deploy A.Chen</span></div>' },
    { d: 7500, h: '<div><span class="ok">✓</span> <span class="dim">Threat neutralized · REP 6890 → 7240 ↑</span></div>' },
    { d: 9200, h: '<div><span class="p">$ </span><span class="c">rank --global<span class="cursor"></span></span></div>' },
  ];

  const terminal = document.getElementById('cwTerminal');
  lines.forEach(({ d, h }) => {
    setTimeout(() => {
      terminal.querySelectorAll('.cursor').forEach(c => c.remove());
      terminal.insertAdjacentHTML('beforeend', h);
      terminal.scrollTop = terminal.scrollHeight;
    }, d);
  });
})();
