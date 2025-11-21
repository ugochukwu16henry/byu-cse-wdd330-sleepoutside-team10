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
