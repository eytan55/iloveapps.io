/**
 * Voxa Calendar Landing Page
 * Script for animations and interactions
 */

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card, .timeline-item, .demo-step, .theme-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Floating elements parallax
    const floatElements = document.querySelectorAll('.float-element');
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                floatElements.forEach(el => {
                    const speed = el.dataset.speed || 1;
                    const yPos = -(scrolled * speed * 0.1);
                    el.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Hide scroll indicator on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Voice waves animation variety
    const voiceWaves = document.querySelectorAll('.voice-waves span, .speech-waves span');
    voiceWaves.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Theme card hover effects
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.theme-preview').style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.theme-preview').style.transform = 'scale(1)';
        });
    });
    
    // CTA button click tracking (placeholder for analytics)
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            console.log('[Voxa Landing] CTA clicked:', btnText);
            // TODO: Add analytics tracking here
        });
    });
    
    // Typing effect for voice text (optional enhancement)
    const voiceTextEl = document.querySelector('.voice-text');
    if (voiceTextEl) {
        const originalText = voiceTextEl.textContent;
        const typeText = () => {
            voiceTextEl.textContent = '';
            let i = 0;
            const typing = setInterval(() => {
                if (i < originalText.length) {
                    voiceTextEl.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(typeText, 3000);
                }
            }, 50);
        };
        setTimeout(typeText, 2000);
    }
});

// Smooth reveal for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('section-visible');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
