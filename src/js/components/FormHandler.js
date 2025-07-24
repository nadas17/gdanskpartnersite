/**
 * Form Handler Component
 * Handles lead form submission with validation and analytics
 */
class FormHandler {
  constructor(formSelector = '#lead-form') {
    this.form = document.querySelector(formSelector);
    this.config = {
      apiEndpoint: '/api/leads',
      phoneFormat: /^(\+48\s?)?[1-9]\d{8}$/,
      emailFormat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };
    
    if (this.form) this.init();
  }

  init() {
    this.bindEvents();
    this.setupPhoneFormatting();
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  setupPhoneFormatting() {
    const phoneInput = this.form.querySelector('#phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', this.formatPhoneNumber.bind(this));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
      // Show loading state
      this.setLoadingState(submitBtn, true);
      
      // Validate and collect data
      const formData = this.collectFormData();
      if (!this.validateData(formData)) return;
      
      // Submit data
      await this.submitData(formData);
      
      // Show success and reset
      this.showMessage('Başvurunuz başarıyla alındı! 24 saat içinde sizi arayacağız.', 'success');
      this.form.reset();
      this.trackConversion(formData);
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    } finally {
      this.setLoadingState(submitBtn, false, originalText);
    }
  }

  collectFormData() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    return {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'website_lead_form',
      page_url: window.location.href
    };
  }

  validateData(data) {
    const errors = [];
    
    if (!data.email || !this.config.emailFormat.test(data.email)) {
      errors.push('Geçerli bir e-posta adresi girin');
    }
    
    if (!data.phone || !this.config.phoneFormat.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Geçerli bir telefon numarası girin');
    }
    
    if (errors.length > 0) {
      this.showMessage(errors.join(', '), 'error');
      return false;
    }
    
    return true;
  }

  async submitData(data) {
    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Lead data:', data);
    
    // Production implementation:
    // const response = await fetch(this.config.apiEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return response.json();
  }

  formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('48')) value = value.substring(2);
    
    if (value.length > 0) {
      const formatted = value.length <= 3 ? value :
        value.length <= 6 ? `${value.slice(0, 3)} ${value.slice(3)}` :
        `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 9)}`;
      
      e.target.value = `+48 ${formatted}`;
    }
  }

  setLoadingState(button, loading, originalText = '') {
    if (loading) {
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
      button.disabled = true;
    } else {
      button.innerHTML = originalText;
      button.disabled = false;
    }
  }

  showMessage(message, type) {
    // Remove existing messages
    this.form.querySelectorAll('.form-message').forEach(msg => msg.remove());

    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
      <span>${message}</span>
    `;

    this.form.insertBefore(messageEl, this.form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => messageEl.remove(), 5000);
    
    // Scroll to message
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  trackConversion(data) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        event_category: 'Lead Generation',
        event_label: 'Driver Application'
      });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }
  }
}

export default FormHandler;
