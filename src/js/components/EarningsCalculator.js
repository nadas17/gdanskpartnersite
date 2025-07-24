/**
 * Earnings Calculator Component
 * Interactive calculator for driver earnings estimation
 */
class EarningsCalculator {
  constructor() {
    this.config = {
      rates: {
        istanbul: { economy: 35, comfort: 45, premium: 60 },
        ankara: { economy: 30, comfort: 40, premium: 55 },
        izmir: { economy: 28, comfort: 38, premium: 50 },
        bursa: { economy: 25, comfort: 35, premium: 45 },
        antalya: { economy: 30, comfort: 40, premium: 55 },
        adana: { economy: 22, comfort: 32, premium: 42 }
      },
      commissionRate: 0.15
    };

    this.elements = {
      hoursSlider: document.getElementById('hours'),
      hoursDisplay: document.getElementById('hours-display'),
      citySelect: document.getElementById('city'),
      vehicleTypeSelect: document.getElementById('vehicle-type'),
      weeklyEarnings: document.getElementById('weekly-earnings'),
      grossEarnings: document.getElementById('gross-earnings'),
      commission: document.getElementById('commission'),
      netEarnings: document.getElementById('net-earnings'),
      monthlyEarnings: document.getElementById('monthly-earnings')
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    ['input', 'change'].forEach(event => {
      [this.elements.hoursSlider, this.elements.citySelect, this.elements.vehicleTypeSelect]
        .filter(Boolean)
        .forEach(element => element.addEventListener(event, () => this.calculate()));
    });
  }

  calculate() {
    const hours = parseInt(this.elements.hoursSlider?.value || 40);
    const city = this.elements.citySelect?.value || 'istanbul';
    const vehicleType = this.elements.vehicleTypeSelect?.value || 'economy';

    // Update hours display
    if (this.elements.hoursDisplay) {
      this.elements.hoursDisplay.textContent = hours;
    }

    // Calculate earnings
    const hourlyRate = this.config.rates[city]?.[vehicleType] || 25;
    const grossWeekly = hours * hourlyRate;
    const commission = grossWeekly * this.config.commissionRate;
    const netWeekly = grossWeekly - commission;
    const monthlyNet = netWeekly * 4;

    // Update displays with animation
    this.updateDisplay(this.elements.weeklyEarnings, netWeekly);
    this.updateDisplay(this.elements.grossEarnings, grossWeekly, '₺');
    this.updateDisplay(this.elements.commission, commission, '₺');
    this.updateDisplay(this.elements.netEarnings, netWeekly, '₺');
    this.updateDisplay(this.elements.monthlyEarnings, monthlyNet, '₺');

    // Track usage
    this.trackUsage(hours, city, vehicleType, netWeekly);
  }

  updateDisplay(element, value, prefix = '') {
    if (!element) return;

    const displayValue = prefix ? `${prefix} ${Math.round(value)}` : Math.round(value).toLocaleString();
    
    if (prefix) {
      element.textContent = displayValue;
    } else {
      this.animateValue(element, parseInt(element.textContent.replace(/[^\d]/g, '') || 0), value);
    }
  }

  animateValue(element, start, end, duration = 500) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const animate = () => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        element.textContent = Math.round(end).toLocaleString();
        return;
      }
      element.textContent = Math.round(current).toLocaleString();
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }

  trackUsage(hours, city, vehicleType, earnings) {
    // Analytics integration
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_use', {
        event_category: 'Tool Usage',
        hours, city, vehicle_type: vehicleType, estimated_earnings: earnings
      });
    }
  }
}

export default EarningsCalculator;
