// Main JavaScript functionality for lol.consulting website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initContactForm();
    initNavigation();
    initAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"], .hero__actions a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
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

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add background opacity when scrolled
        if (currentScrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Highlight active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav__link--active');
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            projectType: formData.get('projectType'),
            budget: formData.get('budget'),
            description: formData.get('description')
        };
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Submit form
        submitForm(data);
    });
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.description || data.description.trim().length < 10) {
        errors.push('Project description must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form errors
function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-error';
    errorContainer.style.cssText = `
        background: rgba(var(--color-error-rgb), 0.1);
        border: 1px solid var(--color-error);
        color: var(--color-error);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        margin-bottom: var(--space-16);
        font-size: var(--font-size-sm);
    `;
    
    const errorList = document.createElement('ul');
    errorList.style.cssText = 'margin: 0; padding-left: var(--space-16);';
    
    errors.forEach(error => {
        const errorItem = document.createElement('li');
        errorItem.textContent = error;
        errorList.appendChild(errorItem);
    });
    
    errorContainer.appendChild(errorList);
    
    const form = document.getElementById('contactForm');
    form.insertBefore(errorContainer, form.firstChild);
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Submit form (simulate submission since we don't have a backend)
function submitForm(data) {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    form.classList.add('form-submitting');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        form.classList.remove('form-submitting');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Show success message
        showFormSuccess();
        
        // Reset form
        form.reset();
        
        // In a real application, you would send this data to your backend
        console.log('Form submitted with data:', data);
        
        // Create mailto link as fallback
        createMailtoLink(data);
        
    }, 2000);
}

// Show form success message
function showFormSuccess() {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-error, .form-success');
    existingMessages.forEach(msg => msg.remove());
    
    const successContainer = document.createElement('div');
    successContainer.className = 'form-success';
    successContainer.innerHTML = `
        <strong>Message Sent Successfully!</strong><br>
        We'll get back to you within 24 hours. Check your email for a confirmation.
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(successContainer, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successContainer.remove();
    }, 5000);
}

// Create mailto link as fallback
function createMailtoLink(data) {
    const subject = encodeURIComponent(`New Project Inquiry - ${data.projectType || 'General'}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}

Project Description:
${data.description}

---
This message was sent from the lol.consulting website contact form.
    `.trim());
    
    const mailtoLink = `mailto:hello@lol.consulting?subject=${subject}&body=${body}`;
    
    // Open mailto link in a new window/tab
    setTimeout(() => {
        window.open(mailtoLink);
    }, 500);
}

// Initialize animations and interactive elements
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const animatedElements = document.querySelectorAll('section, .product-card, .service-card, .process-step, .pricing-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
    
    // Add CSS for animations
    addAnimationStyles();
    
    // Card hover effects
    initCardHoverEffects();
    
    // Pricing card special effects
    initPricingEffects();
}

// Add animation styles dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav--scrolled {
            background: rgba(var(--color-surface-rgb, 255, 255, 255), 0.95);
            backdrop-filter: blur(10px);
        }
        
        .nav__link--active {
            color: var(--color-primary) !important;
            font-weight: var(--font-weight-semibold);
        }
        
        .card-hover-effect {
            transition: all 0.3s ease;
        }
        
        .card-hover-effect:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
    `;
    document.head.appendChild(style);
}

// Initialize card hover effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.product-card, .service-card, .pricing-card');
    cards.forEach(card => {
        card.classList.add('card-hover-effect');
    });
}

// Initialize pricing card effects
function initPricingEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Slightly scale down other cards
            pricingCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.transform = 'scale(0.98)';
                    otherCard.style.opacity = '0.8';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            pricingCards.forEach(otherCard => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
            });
        });
    });
}

// Utility function to debounce scroll events
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

// Mobile menu toggle (if needed for smaller screens)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav__links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('nav__links--open');
            this.classList.toggle('mobile-menu-button--open');
        });
        
        // Close mobile menu when clicking on a link
        const navLinkElements = document.querySelectorAll('.nav__link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('nav__links--open');
                mobileMenuButton.classList.remove('mobile-menu-button--open');
            });
        });
    }
}

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images if any are added in the future
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Analytics and tracking (placeholder for future implementation)
function initAnalytics() {
    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonLocation = this.closest('section')?.id || 'unknown';
            
            // In a real application, you would send this to your analytics service
            console.log('Button clicked:', {
                text: buttonText,
                location: buttonLocation,
                href: this.href || null
            });
        });
    });
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // In a real application, you would send this to your analytics service
                console.log('Section viewed:', entry.target.id);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In a real application, you would report this to your error tracking service
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPerformanceOptimizations();
    initAnalytics();
    initMobileMenu();
});