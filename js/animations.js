// Advanced Animations and Effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTextAnimations();
        this.setupImageEffects();
        this.setupLoadingAnimations();
        this.setupSplineAnimations();
    }

    setupScrollAnimations() {
        // Enhanced scroll-triggered animations
        const scrollElements = document.querySelectorAll('.collection-card, .product-card, .value-card, .team-member');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(element => {
            scrollObserver.observe(element);
        });

        // Add CSS for scroll animations
        this.addScrollAnimationStyles();
    }

    setupHoverEffects() {
        // Enhanced hover effects for interactive elements
        this.setupCardHoverEffects();
        this.setupButtonHoverEffects();
        this.setupImageHoverEffects();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.collection-card, .product-card, .value-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateCardHover(e.target, true);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.animateCardHover(e.target, false);
            });
        });
    }

    animateCardHover(card, isEntering) {
        const image = card.querySelector('img');
        const overlay = card.querySelector('.collection-overlay, .product-overlay');
        
        if (isEntering) {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.backdropFilter = 'blur(5px)';
            }
        } else {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.backdropFilter = 'blur(0px)';
            }
        }
    }

    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn, .product-btn, .collection-cta');
        
        buttons.forEach(button => {
            // Create ripple effect container
            const rippleContainer = document.createElement('div');
            rippleContainer.className = 'ripple-container';
            button.appendChild(rippleContainer);
            
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
            
            // Enhanced hover animations
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        const rippleContainer = button.querySelector('.ripple-container');
        rippleContainer.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupImageHoverEffects() {
        const images = document.querySelectorAll('.hero-3d iframe, .experience-3d iframe, .story-3d iframe');
        
        images.forEach(iframe => {
            const container = iframe.parentElement;
            
            container.addEventListener('mouseenter', () => {
                iframe.style.transform = 'scale(1.02) rotateY(5deg)';
                container.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
            });
            
            container.addEventListener('mouseleave', () => {
                iframe.style.transform = 'scale(1) rotateY(0deg)';
                container.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            });
        });
    }

    setupTextAnimations() {
        // Typewriter effect for hero titles
        this.setupTypewriterEffect();
        
        // Text reveal animations
        this.setupTextRevealAnimations();
    }

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.hero-title .title-line');
        
        typewriterElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                this.typeWriter(element, text, 100);
            }, index * 800);
        });
    }

    typeWriter(element, text, speed) {
        let i = 0;
        element.style.opacity = '1';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    setupTextRevealAnimations() {
        const textElements = document.querySelectorAll('.section-title, .page-title');
        
        textElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateTextReveal(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        });
    }

    animateTextReveal(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.3s ease';
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    setupImageEffects() {
        // Parallax effect for background images
        this.setupParallaxImages();
        
        // Image lazy loading with fade in
        this.setupLazyLoading();
    }

    setupParallaxImages() {
        const parallaxElements = document.querySelectorAll('.hero-background, .experience-3d, .story-3d');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * -0.5;
                const yPos = rate / (index + 2);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupLoadingAnimations() {
        // Staggered loading animation for grid items
        const gridItems = document.querySelectorAll('.collections-grid > *, .products-grid > *, .values-grid > *');
        
        gridItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 500);
        });
    }

    setupSplineAnimations() {
        // Enhanced Spline-specific animations
        this.setupSplineParallax();
        this.setupSplineInteractionEffects();
        this.setupSplineTransitions();
    }

    setupSplineParallax() {
        const splineElements = document.querySelectorAll('.hero-3d, .experience-3d, .story-3d, .showcase-3d');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            splineElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const parallaxSpeed = 0.5 + (index * 0.1);
                    const yPos = scrolled * parallaxSpeed;
                    const rotateX = (scrolled - rect.top) * 0.01;
                    
                    element.style.transform = `translate3d(0, ${yPos}px, 0) rotateX(${rotateX}deg)`;
                    
                    // Add depth effect
                    const iframe = element.querySelector('iframe');
                    if (iframe) {
                        const scale = 1 + (Math.sin(scrolled * 0.001) * 0.02);
                        iframe.style.transform = `scale(${scale}) rotateY(${rotateX * 0.5}deg)`;
                    }
                }
            });
        });
    }

    setupSplineInteractionEffects() {
        const splineContainers = document.querySelectorAll('[class*="3d"]');
        
        splineContainers.forEach(container => {
            const iframe = container.querySelector('iframe');
            
            if (iframe) {
                // Mouse move parallax effect
                container.addEventListener('mousemove', (e) => {
                    const rect = container.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    
                    const rotateY = x * 10;
                    const rotateX = -y * 10;
                    
                    iframe.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
                });
                
                container.addEventListener('mouseleave', () => {
                    iframe.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                });
                
                // Click animation
                container.addEventListener('click', () => {
                    iframe.style.transform = 'perspective(1000px) scale(0.98)';
                    setTimeout(() => {
                        iframe.style.transform = 'perspective(1000px) scale(1.02)';
                        setTimeout(() => {
                            iframe.style.transform = 'perspective(1000px) scale(1)';
                        }, 200);
                    }, 100);
                });
            }
        });
    }

    setupSplineTransitions() {
        // Page transition effects for Spline elements
        const splineElements = document.querySelectorAll('iframe[id*="Spline"]');
        
        // Intersection Observer for entrance animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSplineEntrance(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        splineElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateSplineEntrance(iframe) {
        const container = iframe.parentElement;
        
        // Create entrance animation sequence
        const timeline = [
            { transform: 'scale(0.8) rotateY(-15deg)', opacity: '0', offset: 0 },
            { transform: 'scale(1.05) rotateY(5deg)', opacity: '0.8', offset: 0.6 },
            { transform: 'scale(1) rotateY(0deg)', opacity: '1', offset: 1 }
        ];
        
        iframe.animate(timeline, {
            duration: 1200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
        
        // Add container glow effect
        container.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.3)';
        setTimeout(() => {
            container.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }, 1200);
    }

    addScrollAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .ripple-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            }
            
            .animate-in {
                animation: slideInUp 0.8s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .fade-in {
                animation: fadeIn 0.6s ease forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .lazy {
                opacity: 0;
                transition: opacity 0.6s ease;
            }
            
            /* Enhanced hover states */
            .collection-card, .product-card, .value-card {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                perspective: 1000px;
            }
            
            .btn, .product-btn {
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* 3D iframe enhancements */
            .hero-3d iframe, .experience-3d iframe, .story-3d iframe {
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform-style: preserve-3d;
            }
            
            /* Spline loading animations */
            .spline-loading-content {
                text-align: center;
            }
            
            .spline-spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(212, 175, 55, 0.3);
                border-top: 3px solid var(--accent-gold);
                border-radius: 50%;
                animation: splineSpinner 1.5s linear infinite;
                margin: 0 auto 1rem;
            }
            
            @keyframes splineSpinner {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Enhanced 3D container styles */
            .hero-3d, .experience-3d, .story-3d, .showcase-3d, .contact-3d-visual {
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform-style: preserve-3d;
            }
            
            .hero-3d iframe, .experience-3d iframe, .story-3d iframe, 
            .showcase-3d iframe, .contact-3d-visual iframe {
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform-style: preserve-3d;
                filter: brightness(1) contrast(1);
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Advanced scroll effects
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollProgress();
        this.setupScrollMagnetism();
    }

    setupSmoothScrolling() {
        // Custom smooth scrolling implementation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    this.smoothScrollTo(target, 1000);
                }
            });
        });
    }

    smoothScrollTo(target, duration) {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    setupScrollProgress() {
        // Create scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #d4af37, #f4e7c1);
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = Math.min(scrolled, 100) + '%';
        });
    }

    setupScrollMagnetism() {
        // Magnetic scroll effect for sections
        const sections = document.querySelectorAll('section');
        let isScrolling = false;

        sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                if (!isScrolling) {
                    section.style.transform = 'translateZ(10px)';
                    section.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }
            });

            section.addEventListener('mouseleave', () => {
                section.style.transform = 'translateZ(0)';
                section.style.boxShadow = 'none';
            });
        });

        window.addEventListener('scroll', () => {
            isScrolling = true;
            clearTimeout(window.scrollTimeout);
            
            window.scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new ScrollEffects();
});

// Export for use in other modules
window.AnimationController = AnimationController;
window.ScrollEffects = ScrollEffects;