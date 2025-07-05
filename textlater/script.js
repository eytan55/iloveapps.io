// ========================================
// TEXTLATER LANDING PAGE - JAVASCRIPT
// Modern Interactions & Animations 2025
// ========================================

// === DOM ELEMENTS ===
const floatingElements = document.querySelectorAll('.float-element');
const ctaButtons = document.querySelectorAll('.btn-primary');
const sections = document.querySelectorAll('section');
const stats = document.querySelectorAll('.stat-number');
const demoSteps = document.querySelectorAll('.demo-step');
const featureCards = document.querySelectorAll('.feature-card');

// === PERFORMANCE OPTIMIZATIONS ===
let ticking = false;
let lastScrollY = 0;

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === FLOATING ELEMENTS ANIMATION ===
function updateFloatingElements() {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    const scrollY = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    
    floatingElements.forEach((element, index) => {
        const speed = parseFloat(element.dataset.speed) || 1;
        const yPos = (scrollY * speed * 0.1) % viewportHeight;
        const rotation = (scrollY * speed * 0.05) % 360;
        
        element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        element.style.opacity = Math.max(0.1, 0.5 - scrollY / viewportHeight);
    });
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Special handling for stats counter
                if (entry.target.classList.contains('stat') && !entry.target.classList.contains('stat-no-animation')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with AOS attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-init');
        observer.observe(el);
    });
    
    // Observe stats
    document.querySelectorAll('.stat').forEach(el => {
        observer.observe(el);
    });
}

// === COUNTER ANIMATION ===
function animateCounter(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';
    
    const target = parseInt(element.textContent.replace(/\D/g, '')) || 0;
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number based on original content
        if (element.textContent.includes('#')) {
            element.textContent = `#${Math.floor(current)}`;
        } else if (element.textContent.includes('+')) {
            element.textContent = `${Math.floor(current)}+`;
        } else if (element.textContent.includes('%')) {
            element.textContent = `${Math.floor(current)}%`;
        } else if (target === 43) {
            // Special case for 4.3 rating
            element.textContent = `${(current / 10).toFixed(1)}/5`;
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// === BUTTON INTERACTIONS ===
function initButtonEffects() {
    ctaButtons.forEach(button => {
        // Click ripple effect
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showAppStoreModal();
            }
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Hover magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// === APP STORE MODAL ===
function showAppStoreModal() {
    const modal = document.createElement('div');
    modal.className = 'app-store-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <h3>🚀 Ready to Download TextLater?</h3>
                    <p>TextLater is available on the iOS App Store for $2.99</p>
                    <div class="modal-buttons">
                        <a href="https://apps.apple.com/app/textlater/id1449705569" target="_blank" class="btn-primary">
                            📱 Open App Store
                        </a>
                        <button class="btn-secondary modal-close-btn">Maybe Later</button>
                    </div>
                    <div class="modal-features">
                        <div class="modal-feature">✅ One-time purchase</div>
                        <div class="modal-feature">✅ No subscriptions</div>
                        <div class="modal-feature">✅ Privacy first</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .app-store-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease-out;
        }
        
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .modal-content {
            background: white;
            border-radius: 1.5rem;
            padding: 2rem;
            max-width: 400px;
            width: 100%;
            position: relative;
            animation: modalSlideUp 0.3s ease-out;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        .modal-close:hover {
            opacity: 1;
        }
        
        .modal-body {
            text-align: center;
        }
        
        .modal-body h3 {
            margin-bottom: 1rem;
            color: #1a1a1a;
        }
        
        .modal-body p {
            margin-bottom: 2rem;
            color: #6b7280;
        }
        
        .modal-buttons {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-direction: column;
        }
        
        .modal-features {
            display: flex;
            justify-content: space-around;
            font-size: 0.875rem;
            color: #6b7280;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'modalFadeIn 0.3s reverse';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            document.body.style.overflow = '';
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// === PARALLAX SCROLL EFFECTS ===
function initParallaxEffects() {
    // Parallax désactivé pour garder le téléphone en place
    // Le téléphone garde juste son animation CSS 3D
    console.log('📱 Parallax disabled - phone keeps its 3D animation only');
}

// === LOADING ANIMATIONS ===
function initLoadingAnimations() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Trigger hero animations
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.animation = 'fadeInUp 1s ease-out';
            }
        }, 100);
    });
}

// === SCROLL PROGRESS INDICATOR ===
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(102, 126, 234, 0.1);
            z-index: 9999;
            pointer-events: none;
        }
        
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBarFill.style.width = `${Math.min(progress, 100)}%`;
    }, 16));
}

// === FORM VALIDATIONS & ANALYTICS ===
function initAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'TextLater Landing Page',
            page_location: window.location.href
        });
    }
    
    // Track CTA clicks
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    button_position: index + 1,
                    button_text: button.textContent.trim()
                });
            }
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    
    window.addEventListener('scroll', throttle(() => {
        const scrollPercentage = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercentage > maxScroll) {
            maxScroll = scrollPercentage;
            
            milestones.forEach(milestone => {
                if (scrollPercentage >= milestone && !window[`tracked_${milestone}`]) {
                    window[`tracked_${milestone}`] = true;
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            percentage: milestone
                        });
                    }
                }
            });
        }
    }, 1000));
}

// === FEATURE CARD INTERACTIONS ===
function initFeatureCardEffects() {
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'cardFloat 0.6s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Add CSS for card animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardFloat {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.02); }
            100% { transform: translateY(-10px) scale(1.02); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* AOS animations */
        .aos-init {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos="fade-up"] {
            transform: translateY(50px);
        }
        
        [data-aos="fade-right"] {
            transform: translateX(-50px);
        }
        
        [data-aos="fade-left"] {
            transform: translateX(50px);
        }
        
        [data-aos="zoom-in"] {
            transform: scale(0.8);
        }
        
        [data-aos="flip-left"] {
            transform: perspective(1000px) rotateY(-45deg);
        }
        
        [data-aos="count-up"] {
            transform: scale(0.8);
        }
        
        /* Loading states */
        .loading .hero-content {
            opacity: 0;
            transform: translateY(50px);
        }
        
        .loaded .hero-content {
            opacity: 1;
            transform: translateY(0);
            transition: all 1s ease-out;
        }
    `;
    
    document.head.appendChild(style);
}

// === PERFORMANCE MONITORING ===
function initPerformanceMonitoring() {
    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'LCP', {
                    value: Math.round(lastEntry.startTime),
                    custom_parameter: 'performance'
                });
            }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Monitor cumulative layout shift
    let clsValue = 0;
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Report CLS on page unload
        addEventListener('beforeunload', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'CLS', {
                    value: Math.round(clsValue * 1000),
                    custom_parameter: 'performance'
                });
            }
        });
    }
}

// === MOBILE OPTIMIZATIONS ===
function initMobileOptimizations() {
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch-specific styles
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .feature-card:hover,
            .touch-device .use-case:hover,
            .touch-device .pain-point:hover {
                transform: none;
            }
            
            .touch-device .btn-primary:hover,
            .touch-device .btn-secondary:hover {
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Optimize scrolling performance on iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
}

// === SCREENSHOT CAROUSEL ===
function initScreenshotCarousel() {
    const screenshots = document.querySelectorAll('.screenshot');
    const fallback = document.querySelector('.phone-screen.fallback');
    const carousel = document.querySelector('.screenshot-carousel');
    
    let validScreenshots = 0;
    let currentIndex = 0;
    
    // Check each screenshot
    screenshots.forEach((screenshot, index) => {
        const img = screenshot.querySelector('img');
        if (img && img.src) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
            
            preloadImg.onload = () => {
                validScreenshots++;
                if (validScreenshots === 1) {
                    // First valid screenshot loaded, hide fallback
                    if (fallback) fallback.style.display = 'none';
                    if (carousel) carousel.style.display = 'block';
                }
            };
            
            preloadImg.onerror = () => {
                screenshot.style.display = 'none';
                checkFallback();
            };
        } else {
            screenshot.style.display = 'none';
            checkFallback();
        }
    });
    
    function checkFallback() {
        if (validScreenshots === 0) {
            if (fallback) fallback.style.display = 'block';
            if (carousel) carousel.style.display = 'none';
        }
    }
    
    function showNextScreenshot() {
        if (validScreenshots === 0) return;
        
        screenshots[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % screenshots.length;
        
        // Skip hidden screenshots
        while (screenshots[currentIndex].style.display === 'none') {
            currentIndex = (currentIndex + 1) % screenshots.length;
        }
        
        screenshots[currentIndex].classList.add('active');
    }
    
    // Auto-rotate screenshots every 3 seconds
    if (validScreenshots > 1) {
        setInterval(showNextScreenshot, 3000);
    }
    
    // Initial fallback check
    setTimeout(checkFallback, 100);
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initSmoothScroll();
    initScrollAnimations();
    initButtonEffects();
    initParallaxEffects();
    initLoadingAnimations();
    initScrollProgress();
    initAnalytics();
    initFeatureCardEffects();
    initPerformanceMonitoring();
    initMobileOptimizations();
    initScreenshotCarousel();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Start floating elements animation
    window.addEventListener('scroll', throttle(updateFloatingElements, 16));
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        // Recalculate positions on resize
        updateFloatingElements();
    }, 250));
    
    console.log('🚀 TextLater Landing Page initialized successfully!');
});

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('Landing page error:', e.error);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// === ACCESSIBILITY IMPROVEMENTS ===
document.addEventListener('keydown', (e) => {
    // Skip to main content with keyboard
    if (e.key === 'Tab' && e.target === document.body) {
        const skipLink = document.createElement('a');
        skipLink.href = '#hero';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
});

// === PRELOAD CRITICAL RESOURCES ===
function preloadCriticalResources() {
    // Preload hero image if it exists
    const heroImage = document.querySelector('.hero-visual img');
    if (heroImage && heroImage.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroImage.src;
        document.head.appendChild(link);
    }
    
    // Preload App Store link
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'https://apps.apple.com/app/textlater/id1449705569';
    document.head.appendChild(link);
}

// Initialize preloading
preloadCriticalResources(); 