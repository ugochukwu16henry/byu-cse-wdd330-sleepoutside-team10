// Alert.js
export default class Alert {
  constructor() {
    this.alertsFile = './alerts.json';
  }

  async loadAlerts() {
    try {
      const response = await fetch(this.alertsFile);
      if (!response.ok) {
        throw new Error('Failed to load alerts');
      }
      const alerts = await response.json();
      return alerts;
    } catch (error) {
      console.error('Error loading alerts:', error);
      return [];
    }
  }

  createAlertElement(alert) {
    const p = document.createElement('p');
    p.textContent = alert.message;
    p.style.backgroundColor = alert.background;
    p.style.color = alert.color;
    p.style.padding = '15px';
    p.style.margin = '10px 0';
    p.style.borderRadius = '4px';
    return p;
  }

  async render() {
    const alerts = await this.loadAlerts();

    if (alerts.length === 0) {
      return; // No alerts to display
    }

    // Create the section container
    const section = document.createElement('section');
    section.className = 'alert-list';

    // Loop through alerts and create elements
    alerts.forEach((alert) => {
      const alertElement = this.createAlertElement(alert);
      section.appendChild(alertElement);
    });

    // Prepend to main element
    const main = document.querySelector('main');
    if (main) {
      main.prepend(section);
    } else {
      console.warn('No main element found on the page');
    }
  }

  // Initialize the alert system
  async init() {
    await this.render();
  }
}
