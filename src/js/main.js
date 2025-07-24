/**
 * Main Application Entry Point
 * Initializes all components and manages global state
 */
import Navigation from './components/Navigation.js';
import EarningsCalculator from './components/EarningsCalculator.js';
import FormHandler from './components/FormHandler.js';
import AnimationController from './components/AnimationController.js';

class App {
  constructor() {
    this.components = {};
    this.config = {
      debug: true,
      analytics: {
        gtag: typeof gtag !== 'undefined',
        fbq: typeof fbq !== 'undefined'
      }
    };
  }

  async init() {
    try {
      await this.waitForDOM();
      this.initializeComponents();
      this.setupGlobalEventListeners();
      this.initializeAnalytics();
      
      if (this.config.debug) {
        console.log('🚗 FlotaPartner website loaded successfully!');
      }
    } catch (error) {
      console.error('App initialization failed:', error);
    }
  }

  waitForDOM() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  initializeComponents() {
    this.components = {
      navigation: new Navigation(),
      calculator: new EarningsCalculator(),
      formHandler: new FormHandler(),
      animations: new AnimationController()
    };
  }

  setupGlobalEventListeners() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
    });

    // Global error handling
    window.addEventListener('error', this.handleError.bind(this));

    // Performance monitoring
    window.addEventListener('load', this.trackPerformance.bind(this));
  }

  handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const targetPosition = targetSection.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  handleError(error) {
    console.error('Global error:', error);
    
    // Send to error tracking service
    if (this.config.analytics.gtag) {
      gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }

  trackPerformance() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      if (this.config.analytics.gtag) {
        gtag('event', 'timing_complete', {
          name: 'load',
          value: Math.round(loadTime)
        });
      }
    }
  }

  initializeAnalytics() {
    // Track CTA button clicks
    document.querySelectorAll('.btn--primary').forEach(button => {
      button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        const section = button.closest('section')?.id || 'unknown';
        
        if (this.config.analytics.gtag) {
          gtag('event', 'click', {
            event_category: 'CTA',
            event_label: buttonText,
            section: section
          });
        }
      });
    });
  }

  // Utility methods
  static utils = {
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

    throttle: (func, limit) => {
      let inThrottle;
      return function() {
        if (!inThrottle) {
          func.apply(this, arguments);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    formatCurrency: (amount, currency = 'TRY') => {
      return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency
      }).format(amount);
    },

    isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    isValidTurkishPhone: (phone) => /^(\+90\s?)?[1-9]\d{9}$/.test(phone.replace(/\s/g, ''))
  };
}

// Initialize application
const app = new App();
app.init();

// Export for global access
window.FlotaPartnerApp = app;
