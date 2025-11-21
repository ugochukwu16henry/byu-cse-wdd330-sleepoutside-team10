import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category =
  new URLSearchParams(window.location.search).get('category') || 'tents';
const dataSource = new ExternalServices(category);
const element = document.querySelector('.product-list');

const listing = new ProductList(category, dataSource, element);
listing.init();
