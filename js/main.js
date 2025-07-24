// ===== NAVIGATION MENU =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Hide menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// Remove menu mobile
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

// ===== SCROLL HEADER =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== SCROLL SECTIONS ACTIVE LINK =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionLink?.classList.add('active-link');
        } else {
            sectionLink?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== EARNINGS CALCULATOR =====
class EarningsCalculator {
    constructor() {
        this.hoursSlider = document.getElementById('hours');
        this.hoursDisplay = document.getElementById('hours-display');
        this.citySelect = document.getElementById('city');
        this.vehicleTypeSelect = document.getElementById('vehicle-type');
        
        this.weeklyEarningsDisplay = document.getElementById('weekly-earnings');
        this.grossEarningsDisplay = document.getElementById('gross-earnings');
        this.commissionDisplay = document.getElementById('commission');
        this.netEarningsDisplay = document.getElementById('net-earnings');
        this.monthlyEarningsDisplay = document.getElementById('monthly-earnings');

        // Earning rates per hour by city and vehicle type (Turkish cities)
        this.rates = {
            istanbul: { economy: 35, comfort: 45, premium: 60 },
            ankara: { economy: 30, comfort: 40, premium: 55 },
            izmir: { economy: 28, comfort: 38, premium: 50 },
            bursa: { economy: 25, comfort: 35, premium: 45 },
            antalya: { economy: 30, comfort: 40, premium: 55 },
            adana: { economy: 22, comfort: 32, premium: 42 }
        };

        this.commissionRate = 0.15; // 15% commission

        this.init();
    }

    init() {
        if (this.hoursSlider) {
            this.hoursSlider.addEventListener('input', () => this.updateCalculator());
        }
        if (this.citySelect) {
            this.citySelect.addEventListener('change', () => this.updateCalculator());
        }
        if (this.vehicleTypeSelect) {
            this.vehicleTypeSelect.addEventListener('change', () => this.updateCalculator());
        }

        // Initial calculation
        this.updateCalculator();
    }

    updateCalculator() {
        const hours = parseInt(this.hoursSlider?.value || 40);
        const city = this.citySelect?.value || 'istanbul';
        const vehicleType = this.vehicleTypeSelect?.value || 'economy';

        // Update hours display
        if (this.hoursDisplay) {
            this.hoursDisplay.textContent = hours;
        }

        // Calculate earnings
        const hourlyRate = this.rates[city][vehicleType];
        const grossWeekly = hours * hourlyRate;
        const commission = grossWeekly * this.commissionRate;
        const netWeekly = grossWeekly - commission;
        const monthlyNet = netWeekly * 4;

        // Update displays
        this.updateDisplay(this.weeklyEarningsDisplay, Math.round(netWeekly));
        this.updateDisplay(this.grossEarningsDisplay, `₺ ${Math.round(grossWeekly)}`, false);
        this.updateDisplay(this.commissionDisplay, `₺ ${Math.round(commission)}`, false);
        this.updateDisplay(this.netEarningsDisplay, `₺ ${Math.round(netWeekly)}`, false);
        this.updateDisplay(this.monthlyEarningsDisplay, `₺ ${Math.round(monthlyNet)}`, false);
    }

    updateDisplay(element, value, isMainValue = true) {
        if (element) {
            if (isMainValue) {
                // Animate number change
                this.animateValue(element, parseInt(element.textContent.replace(/[^\d]/g, '') || 0), value, 500);
            } else {
                element.textContent = value;
            }
        }
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = Math.abs(range / (duration / 16));
        let current = start;
        
        const timer = setInterval(() => {
            if (range > 0) {
                current += increment;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }
            } else {
                current -= increment;
                if (current <= end) {
                    current = end;
                    clearInterval(timer);
                }
            }
            element.textContent = Math.round(current).toLocaleString();
        }, 16);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EarningsCalculator();
});

// ===== LEAD FORM HANDLING =====
class LeadFormHandler {
    constructor() {
        this.form = document.getElementById('lead-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', this.formatPhoneNumber);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
        submitButton.disabled = true;

        try {
            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Add timestamp and source
            data.timestamp = new Date().toISOString();
            data.source = 'website_lead_form';
            data.page_url = window.location.href;

            // Here you would typically send to your backend
            // For now, we'll simulate the API call
            await this.simulateAPICall(data);

            // Show success message
            this.showMessage('Başvurunuz başarıyla alındı! 24 saat içinde sizi arayacağız.', 'success');
            
            // Reset form
            this.form.reset();

            // Track conversion (you can integrate with Google Analytics, Facebook Pixel, etc.)
            this.trackConversion(data);

        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Bir hata oluştu. Lütfen tekrar deneyin veya bizi telefonla arayın.', 'error');
        } finally {
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    async simulateAPICall(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log to console for development
        console.log('Lead data:', data);
        
        // In production, you would send this to your backend:
        /*
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
        */
    }

    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('90')) {
            value = value.substring(2);
        }
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.substring(0, 3) + ' ' + value.substring(3);
            } else {
                value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
            }
            e.target.value = '+90 ' + value;
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message--${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        messageDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            margin-bottom: 24px;
            border-radius: 8px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' 
                : 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'
            }
        `;

        // Insert message
        this.form.insertBefore(messageDiv, this.form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    trackConversion(data) {
        // Google Analytics 4 event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_lead', {
                event_category: 'Lead Generation',
                event_label: 'Driver Application',
                value: 1,
                custom_parameters: {
                    city: data.city,
                    experience: data.experience,
                    has_vehicle: data['vehicle-owned']
                }
            });
        }

        // Facebook Pixel event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_category: 'Driver Application',
                content_name: 'Lead Form Submission',
                value: 1,
                currency: 'TRY'
            });
        }

        // You can add other tracking services here
        console.log('Conversion tracked:', data);
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LeadFormHandler();
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
        }
    }

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .feature,
            .hero__content,
            .hero__visual,
            .calculator__form,
            .calculator__result,
            .contact__content,
            .contact__form,
            .section__header
        `);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    lazyImageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can send errors to your logging service here
});

// ===== UTILITY FUNCTIONS =====
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format currency
    formatCurrency: (amount, currency = 'TRY') => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Validate email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate Turkish phone number
    isValidTurkishPhone: (phone) => {
        const phoneRegex = /^(\+90\s?)?[1-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
};

// Export utils for use in other scripts
window.utils = utils;

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
            }
        }
    });

    // Improve focus management
    const focusableElements = document.querySelectorAll(`
        button,
        [href],
        input,
        select,
        textarea,
        [tabindex]:not([tabindex="-1"])
    `);

    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid var(--primary-color)';
            el.style.outlineOffset = '2px';
        });

        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
});

// ===== ANALYTICS HELPER =====
const analytics = {
    // Track button clicks
    trackButtonClick: (buttonText, section) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Button',
                event_label: buttonText,
                event_section: section
            });
        }
        console.log(`Button clicked: ${buttonText} in ${section}`);
    },

    // Track section views
    trackSectionView: (sectionName) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_section', {
                event_category: 'Engagement',
                event_label: sectionName
            });
        }
        console.log(`Section viewed: ${sectionName}`);
    },

    // Track calculator usage
    trackCalculatorUsage: (hours, city, vehicleType, earnings) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculator_use', {
                event_category: 'Tool Usage',
                event_label: 'Earnings Calculator',
                custom_parameters: {
                    hours: hours,
                    city: city,
                    vehicle_type: vehicleType,
                    estimated_earnings: earnings
                }
            });
        }
        console.log(`Calculator used: ${hours}h, ${city}, ${vehicleType}, ${earnings} PLN`);
    }
};

// Add click tracking to main CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn--primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            const section = button.closest('section')?.id || 'unknown';
            analytics.trackButtonClick(buttonText, section);
        });
    });
});

// ===== FAQ FUNCTIONALITY =====
class FAQHandler {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-item__question');
            if (question) {
                question.addEventListener('click', () => this.toggleFAQ(item));
            }
        });
    }

    toggleFAQ(item) {
        const isOpen = item.classList.contains('faq-item--open');
        
        // Close all items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('faq-item--open');
        });

        // Open clicked item if it wasn't open
        if (!isOpen) {
            item.classList.add('faq-item--open');
        }
    }
}

// Initialize FAQ handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQHandler();
});

console.log('🚗 FlotaPartner website loaded successfully!');
