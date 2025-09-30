// Contact Page Functionality
class ContactController {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormAnimations();
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupMapInteractions();
        this.setupLocationAnimations();
    }

    setupFormAnimations() {
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
        
        formInputs.forEach(input => {
            // Focus animations
            input.addEventListener('focus', (e) => {
                this.animateFormFocus(e.target, true);
            });
            
            input.addEventListener('blur', (e) => {
                this.animateFormFocus(e.target, false);
            });
            
            // Input animations
            input.addEventListener('input', (e) => {
                this.animateFormInput(e.target);
            });
            
            // Initial state check
            if (input.value) {
                this.animateFormInput(input);
            }
        });
    }

    animateFormFocus(input, isFocused) {
        const formGroup = input.closest('.form-group');
        const label = formGroup.querySelector('label');
        const formLine = formGroup.querySelector('.form-line');
        
        if (isFocused) {
            label.style.transform = 'translateY(-25px) scale(0.85)';
            label.style.color = 'var(--accent-gold)';
            formLine.style.width = '100%';
            
            // Add ripple effect
            this.createInputRipple(input);
        } else {
            if (!input.value) {
                label.style.transform = 'translateY(0) scale(1)';
                label.style.color = 'var(--primary-black)';
            }
            formLine.style.width = '0%';
        }
    }

    animateFormInput(input) {
        const formGroup = input.closest('.form-group');
        const label = formGroup.querySelector('label');
        
        if (input.value) {
            label.style.transform = 'translateY(-25px) scale(0.85)';
            label.style.color = 'var(--accent-gold)';
        }
        
        // Add typing effect
        input.style.transform = 'scale(1.02)';
        setTimeout(() => {
            input.style.transform = 'scale(1)';
        }, 150);
    }

    createInputRipple(input) {
        const ripple = document.createElement('div');
        ripple.className = 'input-ripple';
        
        ripple.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
            transform: translateX(-50%);
            animation: inputRipple 0.6s ease-out;
        `;
        
        const formGroup = input.closest('.form-group');
        formGroup.style.position = 'relative';
        formGroup.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupFormValidation() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.removeFieldError(formGroup);
        
        // Required validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        if (!isValid) {
            this.showFieldError(formGroup, errorMessage);
            field.classList.add('error');
        } else {
            field.classList.remove('error');
            this.showFieldSuccess(formGroup);
        }
        
        return isValid;
    }

    showFieldError(formGroup, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #f44336;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        formGroup.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 100);
        
        // Animate form group
        formGroup.style.transform = 'translateX(10px)';
        setTimeout(() => {
            formGroup.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                formGroup.style.transform = 'translateX(0)';
            }, 100);
        }, 100);
    }

    showFieldSuccess(formGroup) {
        const successIcon = document.createElement('div');
        successIcon.className = 'field-success';
        successIcon.innerHTML = '✓';
        successIcon.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #4CAF50;
            font-weight: bold;
            opacity: 0;
            animation: successPop 0.4s ease forwards;
        `;
        
        formGroup.style.position = 'relative';
        formGroup.appendChild(successIcon);
        
        setTimeout(() => {
            successIcon.remove();
        }, 2000);
    }

    removeFieldError(formGroup) {
        const existingError = formGroup.querySelector('.field-error');
        const existingSuccess = formGroup.querySelector('.field-success');
        
        if (existingError) {
            existingError.remove();
        }
        
        if (existingSuccess) {
            existingSuccess.remove();
        }
    }

    setupFormSubmission() {
        const form = document.getElementById('contactForm');
        const submitButton = form.querySelector('.form-submit');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form, submitButton);
        });
    }

    async handleFormSubmit(form, submitButton) {
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showFormError('Please correct the errors above');
            return;
        }
        
        // Animate submit button
        this.animateFormSubmit(submitButton, true);
        
        try {
            // Simulate form submission
            await this.simulateFormSubmission();
            
            // Show success
            this.showFormSuccess('Thank you! Your message has been sent successfully.');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                this.resetFormAnimations(form);
            }, 1000);
            
        } catch (error) {
            this.showFormError('Sorry, there was an error sending your message. Please try again.');
        } finally {
            this.animateFormSubmit(submitButton, false);
        }
    }

    animateFormSubmit(button, isSubmitting) {
        if (isSubmitting) {
            button.innerHTML = `
                <span class="button-spinner"></span>
                Sending...
            `;
            button.disabled = true;
            button.style.transform = 'scale(0.98)';
        } else {
            button.innerHTML = 'Send Message';
            button.disabled = false;
            button.style.transform = 'scale(1)';
        }
    }

    async simulateFormSubmission() {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showFormSuccess(message) {
        this.showFormNotification(message, 'success');
    }

    showFormError(message) {
        this.showFormNotification(message, 'error');
    }

    showFormNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `form-notification form-notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    resetFormAnimations(form) {
        const labels = form.querySelectorAll('label');
        const formLines = form.querySelectorAll('.form-line');
        
        labels.forEach(label => {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = 'var(--primary-black)';
        });
        
        formLines.forEach(line => {
            line.style.width = '0%';
        });
    }

    setupMapInteractions() {
        const mapContainer = document.querySelector('.map-container');
        
        if (mapContainer) {
            // Add loading animation
            this.addMapLoadingAnimation(mapContainer);
            
            // Map hover effects
            mapContainer.addEventListener('mouseenter', () => {
                mapContainer.style.transform = 'scale(1.02)';
                mapContainer.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
            });
            
            mapContainer.addEventListener('mouseleave', () => {
                mapContainer.style.transform = 'scale(1)';
                mapContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            });
        }
    }

    addMapLoadingAnimation(container) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'map-loading';
        loadingOverlay.innerHTML = `
            <div class="map-loading-content">
                <div class="map-loading-spinner"></div>
                <p>Loading map...</p>
            </div>
        `;
        
        loadingOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--light-gray);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            transition: opacity 0.5s ease;
        `;
        
        container.style.position = 'relative';
        container.appendChild(loadingOverlay);
        
        // Hide loading after iframe loads
        const iframe = container.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('load', () => {
                setTimeout(() => {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.remove();
                    }, 500);
                }, 1000);
            });
        }
    }

    setupLocationAnimations() {
        const locations = document.querySelectorAll('.contact-location');
        
        locations.forEach((location, index) => {
            // Staggered entrance animation
            location.style.opacity = '0';
            location.style.transform = 'translateY(30px)';
            location.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                location.style.opacity = '1';
                location.style.transform = 'translateY(0)';
            }, index * 200 + 500);
            
            // Hover effects
            location.addEventListener('mouseenter', () => {
                location.style.transform = 'translateY(-5px) scale(1.02)';
                location.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
            
            location.addEventListener('mouseleave', () => {
                location.style.transform = 'translateY(0) scale(1)';
                location.style.boxShadow = 'none';
            });
        });
    }
}

// Add CSS for contact animations
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    @keyframes inputRipple {
        0% {
            width: 0;
            opacity: 1;
        }
        100% {
            width: 100%;
            opacity: 0;
        }
    }
    
    @keyframes successPop {
        0% {
            opacity: 0;
            transform: translateY(-50%) scale(0.5);
        }
        50% {
            transform: translateY(-50%) scale(1.2);
        }
        100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
        }
    }
    
    .button-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid var(--primary-black);
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 0.5rem;
    }
    
    .contact-form input,
    .contact-form select,
    .contact-form textarea {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .contact-form input:focus,
    .contact-form select:focus,
    .contact-form textarea:focus {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
    }
    
    .contact-form input.error,
    .contact-form select.error,
    .contact-form textarea.error {
        border-bottom-color: #f44336;
        animation: inputShake 0.5s ease-in-out;
    }
    
    @keyframes inputShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .form-group label {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform-origin: left top;
        pointer-events: none;
        position: absolute;
        top: 1rem;
        left: 0;
    }
    
    .form-line {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .map-loading-content {
        text-align: center;
        color: var(--medium-gray);
    }
    
    .map-loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--light-gray);
        border-top: 3px solid var(--accent-gold);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    .map-container {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .contact-location {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        padding: 1rem;
        border-radius: 10px;
    }
    
    @media (max-width: 768px) {
        .form-notification {
            right: 10px !important;
            left: 10px;
            max-width: none !important;
        }
        
        .contact-location {
            margin-bottom: 2rem;
        }
    }
`;

document.head.appendChild(contactStyles);

// Initialize contact functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.contact-form')) {
        new ContactController();
    }
});

// Export for use in other modules
window.ContactController = ContactController;