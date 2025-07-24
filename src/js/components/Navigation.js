/**
 * Enhanced Navigation Component
 * Modern toolbar with advanced animations and interactions
 */
class Navigation {
  constructor() {
    this.elements = {
      menu: document.getElementById('nav-menu'),
      toggle: document.getElementById('nav-toggle'),
      close: document.getElementById('nav-close'),
      header: document.getElementById('header'),
      logo: document.querySelector('.nav__logo'),
      links: document.querySelectorAll('.nav__link'),
      backdrop: null // Will be created dynamically
    };
    
    this.state = {
      isMenuOpen: false,
      lastScrollY: 0,
      scrollDirection: 'up',
      isScrolling: false,
      scrollTimeout: null
    };

    this.config = {
      scrollThreshold: 50,
      hideThreshold: 100,
      throttleDelay: 16,
      animationDuration: 300
    };
    
    this.init();
  }

  init() {
    this.createBackdrop();
    this.bindEvents();
    this.updateActiveLink();
    this.preloadAnimations();
  }

  createBackdrop() {
    // Create mobile menu backdrop
    this.elements.backdrop = document.createElement('div');
    this.elements.backdrop.className = 'nav__backdrop';
    this.elements.backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      opacity: 0;
      visibility: hidden;
      z-index: 999;
      transition: all ${this.config.animationDuration}ms ease;
    `;
    document.body.appendChild(this.elements.backdrop);
    
    // Close menu when clicking backdrop
    this.elements.backdrop.addEventListener('click', () => this.toggleMenu(false));
  }

  preloadAnimations() {
    // Add CSS custom properties for dynamic animations
    document.documentElement.style.setProperty('--nav-transition-duration', `${this.config.animationDuration}ms`);
    
    // Preload hover states
    this.elements.links.forEach((link, index) => {
      link.style.setProperty('--link-index', index);
    });
  }

  bindEvents() {
    // Enhanced menu toggle events
    this.elements.toggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu(true);
    });
    
    this.elements.close?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu(false);
    });
    
    // Enhanced link interactions with staggered animation
    this.elements.links.forEach((link, index) => {
      // Smooth close animation
      link.addEventListener('click', () => {
        setTimeout(() => this.toggleMenu(false), 150);
      });
      
      // Enhanced hover effects
      link.addEventListener('mouseenter', () => this.handleLinkHover(link, true));
      link.addEventListener('mouseleave', () => this.handleLinkHover(link, false));
    });

    // Advanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });

    // Enhanced scroll effects with direction detection
    window.addEventListener('scroll', this.throttle(() => {
      this.handleAdvancedScroll();
      this.updateActiveLink();
    }, this.config.throttleDelay));

    // Handle resize for responsive behavior
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Touch gesture support for mobile
    this.addTouchSupport();
  }

  toggleMenu(show) {
    this.state.isMenuOpen = show;
    
    // Enhanced menu animation
    if (show) {
      // Open animation
      this.elements.menu?.classList.add('show-menu');
      this.elements.backdrop.style.opacity = '1';
      this.elements.backdrop.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
      
      // Staggered link animation
      this.elements.links.forEach((link, index) => {
        setTimeout(() => {
          link.style.transform = 'translateY(0)';
          link.style.opacity = '1';
        }, index * 50);
      });
      
    } else {
      // Close animation
      this.elements.links.forEach((link, index) => {
        setTimeout(() => {
          link.style.transform = 'translateY(-20px)';
          link.style.opacity = '0';
        }, index * 30);
      });
      
      setTimeout(() => {
        this.elements.menu?.classList.remove('show-menu');
        this.elements.backdrop.style.opacity = '0';
        this.elements.backdrop.style.visibility = 'hidden';
        document.body.style.overflow = '';
      }, this.config.animationDuration);
    }
  }

  handleAdvancedScroll() {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > this.state.lastScrollY ? 'down' : 'up';
    
    // Update scroll direction
    if (scrollDirection !== this.state.scrollDirection) {
      this.state.scrollDirection = scrollDirection;
    }
    
    // Enhanced header effects
    const header = this.elements.header;
    if (!header) return;
    
    // Base scroll effect
    header.classList.toggle('scroll-header', scrollY >= this.config.scrollThreshold);
    
    // Hide/show on scroll direction (advanced UX)
    if (scrollY > this.config.hideThreshold) {
      header.classList.toggle('header-hidden', scrollDirection === 'down');
      header.classList.toggle('header-visible', scrollDirection === 'up');
    }
    
    // Dynamic blur intensity
    const blurIntensity = Math.min(scrollY / 200, 1);
    header.style.setProperty('--blur-intensity', blurIntensity);
    
    // Logo scale effect
    const logoScale = Math.max(1 - (scrollY / 500), 0.8);
    this.elements.logo?.style.setProperty('transform', `scale(${logoScale})`);
    
    // Update scroll state
    this.state.lastScrollY = scrollY;
    this.state.isScrolling = true;
    
    // Clear scrolling state after delay
    clearTimeout(this.state.scrollTimeout);
    this.state.scrollTimeout = setTimeout(() => {
      this.state.isScrolling = false;
    }, 150);
  }

  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    let activeSection = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        activeSection = sectionId;
      }
    });

    // Enhanced active link animation
    this.elements.links.forEach(link => {
      const isActive = link.getAttribute('href')?.includes(activeSection);
      
      if (isActive && !link.classList.contains('active-link')) {
        // Add active state with animation
        link.classList.add('active-link');
        this.animateActiveIndicator(link, true);
      } else if (!isActive && link.classList.contains('active-link')) {
        // Remove active state with animation
        link.classList.remove('active-link');
        this.animateActiveIndicator(link, false);
      }
    });
  }

  animateActiveIndicator(link, isActive) {
    // Create or update active indicator
    let indicator = link.querySelector('.active-indicator');
    
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'active-indicator';
      indicator.style.cssText = `
        position: absolute;
        bottom: -2px;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--primary-color);
        border-radius: 1px;
        transform: translateX(-50%);
        transition: width ${this.config.animationDuration}ms ease;
      `;
      link.style.position = 'relative';
      link.appendChild(indicator);
    }
    
    // Animate indicator
    requestAnimationFrame(() => {
      indicator.style.width = isActive ? '100%' : '0';
    });
  }

  handleLinkHover(link, isHovering) {
    // Enhanced hover effects
    if (isHovering) {
      link.style.transform = 'translateY(-2px)';
      link.style.textShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
    } else {
      link.style.transform = 'translateY(0)';
      link.style.textShadow = 'none';
    }
  }

  handleKeyNavigation(e) {
    if (e.key === 'Escape' && this.state.isMenuOpen) {
      this.toggleMenu(false);
      return;
    }

    // Tab navigation within menu
    if (this.state.isMenuOpen && e.key === 'Tab') {
      this.handleTabNavigation(e);
    }
  }

  handleTabNavigation(e) {
    const focusableElements = [
      this.elements.close,
      ...this.elements.links,
      this.elements.toggle
    ].filter(Boolean);

    const currentIndex = focusableElements.indexOf(document.activeElement);
    
    if (e.shiftKey) {
      // Reverse tab
      const nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
      focusableElements[nextIndex]?.focus();
    } else {
      // Forward tab
      const nextIndex = currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1;
      focusableElements[nextIndex]?.focus();
    }
    
    e.preventDefault();
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && this.state.isMenuOpen) {
      this.toggleMenu(false);
    }
  }

  addTouchSupport() {
    let touchStartX = 0;
    let touchStartY = 0;

    // Swipe to close menu
    this.elements.menu?.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.elements.menu?.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Swipe right to close (mobile menu typically slides from left)
      if (deltaX > 100 && Math.abs(deltaY) < 50) {
        this.toggleMenu(false);
      }
    }, { passive: true });
  }

  // Utility functions
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Public API
  isMenuOpen() {
    return this.state.isMenuOpen;
  }

  closeMenu() {
    this.toggleMenu(false);
  }

  openMenu() {
    this.toggleMenu(true);
  }

  // Cleanup method
  destroy() {
    // Remove event listeners and cleanup
    this.elements.backdrop?.remove();
    document.body.style.overflow = '';
  }
}

export default Navigation;
