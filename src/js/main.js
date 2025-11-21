import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import ProductDetails from './ProductDetails.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import { getLocalStorage } from './utils.mjs'; // ← MOVED TO TOP!

// ——————— LOAD HEADER & FOOTER ON EVERY PAGE ———————
loadHeaderFooter();

// ——————— PRODUCT LISTING PAGES ———————
const listElement = document.querySelector('.product-list');
if (listElement) {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'tents';
  const dataSource = new ExternalServices();
  const listing = new ProductList(category, dataSource, listElement);
  listing.init();
}

// ——————— PRODUCT DETAIL PAGE ———————
const productId = getParam('product');
if (productId) {
  const dataSource = new ExternalServices();
  const product = new ProductDetails(productId, dataSource);
  product.init();
}

// ——————— CART: SHOW TOTAL & CHECKOUT BUTTON ———————
function calculateCartTotal() {
  const cartItems = getLocalStorage('so-cart') || [];
  if (cartItems.length === 0) {
    document.querySelector('.cart-footer-hide')?.classList.remove('show');
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.FinalPrice || 0) * (item.Quantity || 1);
  }, 0);

  const totalElement = document.getElementById('cart-total');
  const footer = document.querySelector('.cart-footer-hide');

  if (totalElement && footer) {
    totalElement.textContent = total.toFixed(2);
    footer.classList.add('show');
  }
}

if (window.location.pathname.includes('cart')) {
  calculateCartTotal();
}
document.addEventListener('cartUpdated', calculateCartTotal);

// ——————— CHECKOUT PAGE: FULLY FUNCTIONAL WITH VALIDATION ———————
if (window.location.pathname.includes('checkout')) {
  const checkout = new CheckoutProcess('so-cart', '.checkout-summary');
  checkout.init();

  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        checkout.checkout(e);
      } else {
        form.reportValidity();
      }
    });
  }
}
