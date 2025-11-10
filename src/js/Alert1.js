// Alert.js
import alerts from './alerts.json';

class Alert {
  constructor() {
    this.alerts = alerts;
    this.renderAlerts();
  }

  renderAlerts() {
    if (this.alerts.length > 0) {
      const alertSection = document.createElement('section');
      alertSection.classList.add('alert-list');

      this.alerts.forEach((alert) => {
        const alertMessage = document.createElement('p');
        alertMessage.textContent = alert.message;
        alertMessage.style.backgroundColor = alert.background;
        alertMessage.style.color = alert.color;
        alertSection.appendChild(alertMessage);
      });

      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.prepend(alertSection);
      }
    }
  }
}

export default Alert;
