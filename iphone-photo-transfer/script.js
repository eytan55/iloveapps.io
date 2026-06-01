/* ========================================
   IPHONE PHOTO TRANSFER — LANDING PAGE
   Vanilla JS — Interactions & Animations
   ======================================== */

// === MICROSOFT STORE CONFIGURATION ===
// Even if the build is in validation, the Product ID is already generated in the Microsoft Partner Center.
// To find it:
// 1. Log in to Partner Center (https://partner.microsoft.com/)
// 2. Select the "iPhone Photo Transfer" app
// 3. Go to "Product Management" > "Product Identity"
// 4. Copy the 12-character Product ID (e.g., "9NBLGGH4N158" or similar) and paste it below.
const STORE_PRODUCT_ID = '9MXHDC3WDQSX';

document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // 0. UPDATE MICROSOFT STORE DOWNLOAD LINKS
  // ==============================
  if (STORE_PRODUCT_ID) {
    const storeUrl = `https://apps.microsoft.com/detail/${STORE_PRODUCT_ID}`;
    const downloadLinkIds = ['nav-cta', 'hero-cta', 'cta-free', 'cta-premium', 'cta-bottom'];
    downloadLinkIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.href = storeUrl;
      }
    });
  }

  // ==============================
  // 1. LUCIDE ICONS INIT
  // ==============================
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==============================
  // 2. NAV — SCROLL STATE
  // ==============================
  const nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ==============================
  // 3. SMOOTH SCROLL FOR ANCHORS
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==============================
  // 4. SCROLL REVEAL (data-reveal)
  // ==============================
  const revealElements = document.querySelectorAll('[data-reveal]');
  let revealIndex = 0;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings of the same parent
        const parent = entry.target.parentElement;
        const siblings = parent.querySelectorAll('[data-reveal]:not(.revealed)');
        let delay = 0;

        siblings.forEach(sib => {
          if (sib === entry.target || isInViewport(sib)) {
            setTimeout(() => sib.classList.add('revealed'), delay);
            delay += 80;
          }
        });

        if (!entry.target.classList.contains('revealed')) {
          entry.target.classList.add('revealed');
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // ==============================
  // 5. TRANSFER PARTICLES (Hero)
  // ==============================
  const transferParticles = document.getElementById('transfer-particles');

  if (transferParticles) {
    for (let i = 0; i < 4; i++) {
      const dot = document.createElement('div');
      dot.classList.add('t-particle');
      transferParticles.appendChild(dot);
    }
  }

  // ==============================
  // 6. ANIMATED COUNTERS (Proof bar)
  // ==============================
  const proofNumbers = document.querySelectorAll('.proof-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  proofNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  // ==============================
  // 7. SPEED BAR ANIMATION
  // ==============================
  const speedFill = document.getElementById('speed-fill');

  if (speedFill) {
    const speedObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => speedFill.classList.add('animated'), 300);
          speedObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    speedObserver.observe(speedFill.closest('.bento-card'));
  }

  // ==============================
  // 8. FAQ ACCORDION
  // ==============================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(other => other.classList.remove('active'));

      // Toggle
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==============================
  // 9. SCREENSHOT 3D TILT (Hero)
  // ==============================
  const screenshotWrap = document.getElementById('hero-screenshot-wrap');

  if (screenshotWrap && window.matchMedia('(min-width: 900px)').matches) {
    const windowEl = screenshotWrap.querySelector('.screenshot-window');

    screenshotWrap.addEventListener('mousemove', e => {
      const rect = screenshotWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      windowEl.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
      windowEl.style.transition = 'transform 0.1s ease-out';
    });

    screenshotWrap.addEventListener('mouseleave', () => {
      windowEl.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0)';
      windowEl.style.transition = 'transform 0.5s ease-out';
    });
  }

  // ==============================
  // 10. PRICING TABLE ROW HOVER
  // ==============================
  const pricingRows = document.querySelectorAll('.pricing-table tbody tr');

  pricingRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.background = 'rgba(59,130,246,0.02)';
    });
    row.addEventListener('mouseleave', () => {
      // Preserve accent row background
      if (row.classList.contains('pt-row-accent')) {
        row.style.background = '';
      } else {
        row.style.background = '';
      }
    });
  });

  // ==============================
  // 11. DEVICE HOVER GLOW (Hero)
  // ==============================
  const devices = document.querySelectorAll('.device');

  devices.forEach(device => {
    device.addEventListener('mouseenter', () => {
      const screen = device.querySelector('.device-screen');
      const icon = device.querySelector('.device-icon');
      if (icon) icon.style.color = 'rgba(255,255,255,0.9)';
    });

    device.addEventListener('mouseleave', () => {
      const icon = device.querySelector('.device-icon');
      if (icon) icon.style.color = '';
    });
  });

  // ==============================
  // 12. BENTO CARD BORDER GLOW
  // ==============================
  if (window.matchMedia('(min-width: 900px)').matches) {
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
        card.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(59,130,246,0.04), var(--bg-card) 70%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--bg-card)';
      });
    });
  }

  // ==============================
  // 13. KEYBOARD ACCESSIBILITY
  // ==============================
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // ==============================
  // Done
  // ==============================
  console.log('🚀 iPhone Photo Transfer landing page ready.');
});
