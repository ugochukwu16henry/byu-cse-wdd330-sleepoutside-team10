import { loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('Tents', dataSource, element);

productList.init();
