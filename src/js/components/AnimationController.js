/**
 * Animation Controller
 * Handles scroll animations and page transitions
 */
class AnimationController {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupScrollAnimations();
      this.setupLazyLoading();
    }
  }

  setupScrollAnimations() {
    const animationObserver = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Elements to animate
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
      el.classList.add('animate-on-scroll');
      animationObserver.observe(el);
    });

    this.observers.set('animation', animationObserver);
  }

  setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else {
      // Fallback for older browsers
      const lazyObserver = new IntersectionObserver(
        this.handleLazyLoad.bind(this),
        { threshold: 0.1 }
      );

      document.querySelectorAll('img[data-src]').forEach(img => {
        lazyObserver.observe(img);
      });

      this.observers.set('lazy', lazyObserver);
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        this.observers.get('animation')?.unobserve(entry.target);
      }
    });
  }

  handleLazyLoad(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        this.observers.get('lazy')?.unobserve(img);
      }
    });
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

export default AnimationController;
