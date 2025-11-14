import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert1.js';
import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
  new Alert(); // This should create and display the alerts
});

const dataSource = new ProductData('tents');

const element = document.querySelector('.product-list');

const productList = new ProductList('Tents', dataSource, element);

productList.init();
