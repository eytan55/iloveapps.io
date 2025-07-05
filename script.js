// I Love Apps - Modern JavaScript (2025)
// Clean, efficient, perfectly optimized

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize all components
    initSmoothScroll();
    initProgressBar();
    initAppCards();
    initScrollEffects();
    initHeroAnimations();
    initFloatingElements();
    initAnalytics();

    console.log('❤️ I Love Apps - Ready to make your life easier!');
});

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Progress bar animation when visible
function initProgressBar() {
    const progressBar = document.querySelector('.progress-fill');
    
    if (progressBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 300);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(progressBar);
    }
}

// Enhanced app cards interactions
function initAppCards() {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            const glow = this.querySelector('.app-background-glow');
            if (glow) glow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const glow = this.querySelector('.app-background-glow');
            if (glow) glow.style.opacity = '0';
        });
        
        // Feature tags hover effects
        const features = card.querySelectorAll('.feature');
        features.forEach(feature => {
            feature.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            feature.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Enhanced button click tracking with animations
        const buttons = card.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const appName = card.querySelector('.app-name').textContent;
                const buttonType = this.classList.contains('btn-primary') ? 'primary' : 'secondary';
                
                // Enhanced click animation
                this.style.transform = 'scale(0.95) translateY(-3px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                trackEvent('app_interaction', {
                    app: appName,
                    button: buttonType,
                    url: this.href
                });
            });
        });
    });
}

// Hero floating app cards interactions (simplified without text info)
function initHeroAnimations() {
    const heroAppCards = document.querySelectorAll('.hero-app-card');
    
    heroAppCards.forEach(card => {
        // Enhanced hover effects for glass cards
        card.addEventListener('mouseenter', function() {
            // Pause floating animation
            this.style.animationPlayState = 'paused';
            
            // Add enhanced hover glow
            const glow = this.querySelector('.app-glow');
            if (glow) glow.style.opacity = '0.1';
            
            // Scale icon with smoother animation
            const icon = this.querySelector('.hero-app-icon');
            if (icon) icon.style.transform = 'scale(1.15) rotate(5deg)';
            
            // Add glass effect enhancement
            this.style.background = 'rgba(255, 255, 255, 0.9)';
            this.style.backdropFilter = 'blur(25px)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Resume floating animation
            this.style.animationPlayState = 'running';
            
            // Remove hover effects
            const glow = this.querySelector('.app-glow');
            if (glow) glow.style.opacity = '0';
            
            const icon = this.querySelector('.hero-app-icon');
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
            
            // Reset glass effect
            this.style.background = '';
            this.style.backdropFilter = '';
        });
        
        // Click tracking for hero apps with better feedback
        card.addEventListener('click', function(e) {
            const appName = this.classList.contains('hero-app-textlater') ? 'TextLater' : 'MyRecipeAlbum';
            
            // Enhanced click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            trackEvent('hero_app_click', {
                app: appName,
                url: this.href
            });
        });
    });
}

// Enhanced floating elements animation control
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random starting position variation
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        
        element.style.transform += ` translateX(${randomX}px) translateY(${randomY}px)`;
        
        // Enhanced mouse interaction with ripple effect
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.opacity = '0.2';
            this.style.background = 'var(--gradient-secondary)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.opacity = '0.1';
            this.style.background = 'var(--gradient-primary)';
        });
        
        // Add random movement variation
        setInterval(() => {
            if (!element.matches(':hover')) {
                const randomMove = Math.random() * 4 - 2;
                element.style.transform += ` translateX(${randomMove}px)`;
            }
        }, 3000 + index * 500);
    });
}

// Enhanced scroll effects with glass morphism
function initScrollEffects() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Enhanced navigation effects with better glass morphism
        if (currentScrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
            nav.style.backdropFilter = 'blur(25px)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            nav.style.borderBottom = '1px solid rgba(239, 68, 68, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.7)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
        }
        
        // Smooth hide/show navigation
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 16));
    
    // Enhanced intersection observer with staggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
                
                // Add subtle scale animation
                entry.target.style.transform += ' scale(1)';
            }
        });
    }, observerOptions);
    
    // Observe elements with enhanced timing
    const animatedElements = document.querySelectorAll('.apps-header, .cta, .app-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(el);
    });
}

// Enhanced analytics tracking
function initAnalytics() {
    // Track page view with enhanced data
    trackEvent('page_view', {
        page: 'homepage',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer
    });
    
    // Track external links with enhanced data
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('external_link', {
                url: this.href,
                text: this.textContent.trim(),
                position: Array.from(externalLinks).indexOf(this)
            });
        });
    });
    
    // Track CTA interactions
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            trackEvent('cta_click', {
                type: 'twitter_follow',
                location: 'main_cta'
            });
        });
    }
    
    // Track hero button clicks with enhanced data
    const heroButtons = document.querySelectorAll('.hero-button');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonType = this.classList.contains('hero-button-primary') ? 'primary' : 'secondary';
            trackEvent('hero_button_click', {
                button: buttonType,
                text: this.textContent.trim(),
                timeOnPage: Math.round((Date.now() - startTime) / 1000)
            });
        });
    });
    
    // Track stats interaction (if users click on stats)
    const statsItems = document.querySelectorAll('.stat-item');
    statsItems.forEach((stat, index) => {
        stat.addEventListener('click', function() {
            trackEvent('stats_interaction', {
                stat: this.querySelector('.stat-label').textContent,
                value: this.querySelector('.stat-number').textContent,
                index: index
            });
        });
    });
    
    // Enhanced time tracking
    let timeOnPage = 0;
    const startTime = Date.now();
    let isActive = true;
    
    // Track user activity
    document.addEventListener('mousemove', () => { isActive = true; });
    document.addEventListener('keypress', () => { isActive = true; });
    document.addEventListener('scroll', () => { isActive = true; });
    
    setInterval(() => {
        if (document.hasFocus() && isActive) {
            timeOnPage += 1;
            isActive = false;
        }
    }, 1000);
    
    // Track page exit with comprehensive data
    window.addEventListener('beforeunload', () => {
        trackEvent('page_exit', {
            timeOnPage: Math.round((Date.now() - startTime) / 1000),
            activeTime: timeOnPage,
            scrollDepth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
        });
    });
}

// Enhanced event tracking function
function trackEvent(eventName, properties = {}) {
    // Enhanced logging for development
    console.log(`📊 ${eventName}:`, properties);
    
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            ...properties,
            custom_parameter_1: properties.app || 'none',
            custom_parameter_2: properties.button || 'none',
            custom_parameter_3: properties.location || 'none'
        });
    }
    
    // Alternative analytics services
    if (typeof analytics !== 'undefined') {
        analytics.track(eventName, properties);
    }
    
    // Custom analytics endpoint (if available)
    if (typeof fetch !== 'undefined') {
        fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: eventName, properties })
        }).catch(() => {}); // Silent fail for analytics
    }
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Enhanced escape key handling
    if (e.key === 'Escape') {
        document.activeElement.blur();
        // Reset any hover states
        document.querySelectorAll('.floating-element').forEach(el => {
            el.style.transform = 'scale(1) rotate(0deg)';
            el.style.opacity = '0.1';
        });
    }
    
    // Add keyboard shortcuts for better accessibility
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('#apps')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                e.preventDefault();
                document.querySelector('.cta')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Enhanced resize handler
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        adjustForScreenSize();
        recalculateAnimations();
        updateGlassEffects();
    }, 250);
});

function adjustForScreenSize() {
    const heroHeading = document.querySelector('.hero-heading');
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;
    
    if (heroHeading) {
        if (isSmallMobile) {
            heroHeading.style.fontSize = 'clamp(28px, 8vw, 32px)';
        } else if (isMobile) {
            heroHeading.style.fontSize = 'clamp(32px, 6vw, 38px)';
        } else {
            heroHeading.style.fontSize = '52px';
        }
    }
    
    // Adjust floating elements for mobile
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(el => {
        el.style.display = isMobile ? 'none' : 'block';
    });
    
    // Adjust glass effects based on screen size
    if (isMobile) {
        document.documentElement.style.setProperty('--glass-backdrop', 'blur(15px)');
    } else {
        document.documentElement.style.setProperty('--glass-backdrop', 'blur(20px)');
    }
}

function recalculateAnimations() {
    // Enhanced animation recalculation
    const heroAppCards = document.querySelectorAll('.hero-app-card');
    heroAppCards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `floatApp 6s ease-in-out infinite`;
            card.style.animationDelay = `${index * 3}s`;
        }, 50);
    });
}

function updateGlassEffects() {
    // Update glass effects based on performance
    const supportsBackdrop = CSS.supports('backdrop-filter', 'blur(20px)');
    if (!supportsBackdrop) {
        document.body.classList.add('no-backdrop-support');
    }
}

// Utility functions
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

// Enhanced performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const paintEntries = performance.getEntriesByType('paint');
            
            trackEvent('performance', {
                loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                firstPaint: Math.round(paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0),
                firstContentfulPaint: Math.round(paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0)
            });
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error?.stack
    });
});

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    adjustForScreenSize();
    updateGlassEffects();
    
    // Add loading complete class with delay for smooth entrance
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        const heroElements = document.querySelectorAll('.hero-badge, .hero-heading, .hero-description');
        heroElements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s both`;
        });
    }, 100);
});
