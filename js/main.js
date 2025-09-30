// Main JavaScript functionality
class LuxeThreads {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavbar();
        this.setupLoadingScreen();
        this.setupSmoothScroll();
        this.setupAOS();
        this.setup3DEffects();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.hideLoadingScreen();
        });

        // Window Events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', () => {
            this.hideLoadingScreen();
        });

        // Navigation Toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close menu when clicking on nav links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });
        }

        // Newsletter Form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }

        // Parallax Effects
        this.setupParallax();
        
        // Spline Integration
        this.setup3DInteractions();
    }

    setupNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        // Set active nav link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = navbar.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === '/' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            // Hide loading screen after a minimum time
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar scroll effect
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Parallax scroll effects
        this.updateParallax();
    }

    handleResize() {
        // Handle window resize events
        this.updateParallax();
    }

    setup3DInteractions() {
        // Setup 3D CSS interactions and animations
        this.setupHero3D();
        this.setupExperience3D();
        this.setupShowcase3D();
        this.setupStory3D();
        this.setupShowroom3D();
    }

    setupHero3D() {
        const hero3D = document.getElementById('hero3D');
        if (!hero3D) return;

        // Mouse movement parallax
        hero3D.addEventListener('mousemove', (e) => {
            const rect = hero3D.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const floatingItems = hero3D.querySelectorAll('.floating-item');
            floatingItems.forEach((item, index) => {
                const intensity = (index + 1) * 20;
                const rotateX = y * intensity;
                const rotateY = x * intensity;
                item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${intensity}px)`;
            });
        });
    }

    setupExperience3D() {
        const experience3D = document.getElementById('experience3D');
        if (!experience3D) return;

        // Fabric layer animations
        const fabricLayers = experience3D.querySelectorAll('.fabric-layer');
        fabricLayers.forEach((layer, index) => {
            layer.addEventListener('mouseenter', () => {
                layer.style.transform = `scale(1.1) rotateY(${index * 5}deg)`;
                layer.style.zIndex = 10;
            });

            layer.addEventListener('mouseleave', () => {
                layer.style.transform = 'scale(1) rotateY(0deg)';
                layer.style.zIndex = index + 1;
            });
        });
    }

    setupShowcase3D() {
        const showcase3D = document.getElementById('showcase3D');
        if (!showcase3D) return;

        const showcaseItems = showcase3D.querySelectorAll('.showcase-item');
        const controlBtns = showcase3D.querySelectorAll('.control-btn');
        let currentIndex = 0;

        const showItem = (index) => {
            showcaseItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            controlBtns.forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        };

        controlBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentIndex = index;
                showItem(currentIndex);
            });
        });

        // Auto-rotate showcase
        setInterval(() => {
            currentIndex = (currentIndex + 1) % showcaseItems.length;
            showItem(currentIndex);
        }, 4000);
    }

    setupStory3D() {
        const story3D = document.getElementById('story3D');
        if (!story3D) return;

        const sceneLayers = story3D.querySelectorAll('.scene-layer');
        
        story3D.addEventListener('mousemove', (e) => {
            const rect = story3D.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            sceneLayers.forEach((layer, index) => {
                const depth = (index + 1) * 10;
                const moveX = x * depth;
                const moveY = y * depth;
                layer.style.transform = `translateX(${moveX}px) translateY(${moveY}px) translateZ(${depth}px)`;
            });
        });
    }

    setupShowroom3D() {
        const showroom3D = document.getElementById('showroom3D');
        if (!showroom3D) return;

        const showroomViews = showroom3D.querySelectorAll('.showroom-view');
        const navBtns = showroom3D.querySelectorAll('.nav-btn');

        const showLocation = (location) => {
            showroomViews.forEach(view => {
                view.classList.toggle('active', view.dataset.location === location);
            });
            navBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.location === location);
            });
        };

        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                showLocation(btn.dataset.location);
            });
        });
    }

    setup3DEffects() {
        // Initialize 3D CSS effects
        this.initializeFloatingAnimations();
        this.initializeGeometricShapes();
    }

    initializeFloatingAnimations() {
        const floatingItems = document.querySelectorAll('.floating-item');
        floatingItems.forEach((item, index) => {
            const delay = index * 0.5;
            const duration = 3 + (index * 0.5);
            item.style.animationDelay = `${delay}s`;
            item.style.animationDuration = `${duration}s`;
        });
    }

    initializeGeometricShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const delay = index * 0.3;
            const duration = 4 + (index * 0.2);
            shape.style.animationDelay = `${delay}s`;
            shape.style.animationDuration = `${duration}s`;
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for anchor links
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupAOS() {
        // Simple AOS (Animate On Scroll) implementation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos attribute
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupParallax() {
        this.parallaxElements = document.querySelectorAll('.hero-3d, .experience-3d, .story-3d');
    }

    updateParallax() {
        if (!this.parallaxElements) return;

        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5;
            const yPos = -(rate / (index + 1));
            
            if (element.style) {
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            // Simulate form submission
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
        } else {
            this.showNotification('Please enter a valid email address.', 'error');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Utility methods
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(context, args);
        };
    }

    throttle(func, limit) {
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
}

// Initialize the application
new LuxeThreads();

// Export for use in other modules
window.LuxeThreads = LuxeThreads;