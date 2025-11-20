import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const productId = getParam('product');
console.log(productId);
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
product.init();
