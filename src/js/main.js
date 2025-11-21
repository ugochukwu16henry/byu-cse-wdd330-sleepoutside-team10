import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import ProductDetails from './ProductDetails.mjs';

// Load header + footer + cart badge on EVERY page
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


// ——————— CART TOTAL + SHOW CHECKOUT BUTTON ———————
import { getLocalStorage } from "./utils.mjs";

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".cart-footer-hide")?.classList.remove("show");
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice * (item.Quantity || 1);
  }, 0);

  const totalElement = document.getElementById("cart-total");
  const footer = document.querySelector(".cart-footer-hide");

  if (totalElement && footer) {
    totalElement.textContent = total.toFixed(2);
    footer.classList.add("show");
  }
}

// Run this on the cart page (and anytime the cart changes)
if (window.location.pathname.includes("/cart/") || window.location.pathname.endsWith("cart")) {
  calculateCartTotal();
}

// Also run it every time something is added to the cart (from ProductDetails)
document.addEventListener("cartUpdated", calculateCartTotal);

// ——————— CHECKOUT PAGE: SHOW ORDER SUMMARY ———————
import CheckoutProcess from "./CheckoutProcess.mjs";

if (window.location.pathname.includes("/checkout/") || window.location.pathname.includes("checkout")) {
  const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
  checkout.init();

  // Handle form submit
  document.getElementById("checkoutForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    checkout.checkout(e);
  });
}
