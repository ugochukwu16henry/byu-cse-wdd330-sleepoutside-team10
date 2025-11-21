// src/js/CheckoutProcess.mjs
import { getLocalStorage } from './utils.mjs';

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
    id: item.id,
    name: item.name,
    price: item.finalPrice || item.price,
    quantity: item.quantity || 1,
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
    this.calculateOrderTotal(); // ← ADD THIS LINE
  }

  calculateItemSummary() {
    // FIXED: Use correct property names + parseFloat + handle Quantity
    this.itemTotal = this.list.reduce((sum, item) => {
      const price = parseFloat(item.FinalPrice || item.finalPrice || 0);
      const qty = item.Quantity || item.quantity || 1;
      return sum + price * qty;
    }, 0);

    // Count total items (with quantity, not just length)
    const numItems = this.list.reduce(
      (sum, item) => sum + (item.Quantity || item.quantity || 1),
      0,
    );

    document.querySelector(`${this.outputSelector} #subtotal`).textContent =
      `$${this.itemTotal.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #num-items`).textContent =
      numItems;
  }

  calculateOrderTotal() {
    // Recalculate tax and shipping based on updated itemTotal
    this.tax = this.itemTotal * 0.06;
    const numItems = this.list.reduce(
      (sum, item) => sum + (item.Quantity || item.quantity || 1),
      0,
    );
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Now shows correct values
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

    // Build the order object
    const json = formDataToJSON(form);

    // Add required fields
    json.orderDate = new Date().toISOString();
    json.items = packageItems(this.list);
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.orderTotal = this.orderTotal;

    try {
      const services = new ExternalServices();
      const result = await services.checkout(json);
      console.log('Order submitted successfully!', result);

      // Clear cart and redirect
      localStorage.removeItem(this.key);
      location.assign('/checkout/success.html');
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('There was an error processing your order. Please try again.');
    }
  }
}
