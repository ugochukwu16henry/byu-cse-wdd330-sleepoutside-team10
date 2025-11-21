// src/js/CheckoutProcess.mjs
import { getLocalStorage, alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs'; // ← CRITICAL: Import the class!

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const converted = {};
  formData.forEach((value, key) => {
    converted[key] = value.trim();
  });
  return converted;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.NameWithoutBrand || item.Name,
    price: parseFloat(item.FinalPrice),
    quantity: item.Quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce((sum, item) => {
      const price = parseFloat(item.FinalPrice || 0);
      const qty = item.Quantity || 1;
      return sum + price * qty;
    }, 0);

    const numItems = this.list.reduce(
      (sum, item) => sum + (item.Quantity || 1),
      0,
    );

    document.querySelector(`${this.outputSelector} #subtotal`).textContent =
      `$${this.itemTotal.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #num-items`).textContent =
      numItems;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    const numItems = this.list.reduce(
      (sum, item) => sum + (item.Quantity || 1),
      0,
    );
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).textContent =
      `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #shipping`).textContent =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #orderTotal`).textContent =
      `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(event) {
    event.preventDefault();
    const form = event.target;
    const json = formDataToJSON(form);

    json.orderDate = new Date().toISOString();
    json.items = packageItems(this.list);
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.orderTotal = this.orderTotal;

    try {
      const services = new ExternalServices(); // ← NOW WORKS!
      const result = await services.checkout(json);

      console.log('Order placed successfully!', result);

      // Clear cart and go to success page
      localStorage.removeItem(this.key);
      location.assign('/checkout/success.html');
    } catch (err) {
      // Clear any old alerts
      document.querySelectorAll('.alert').forEach((a) => a.remove());

      // Show real server errors beautifully
      if (err.name === 'servicesError' && err.message?.errors) {
        for (const field in err.message.errors) {
          alertMessage(`${field}: ${err.message.errors[field]}`);
        }
      } else if (err.message) {
        alertMessage(`Error: ${err.message}`);
      } else {
        alertMessage(
          'Order failed. Please check your information and try again.',
        );
      }

      console.error('Checkout failed:', err);
    }
  }
}
