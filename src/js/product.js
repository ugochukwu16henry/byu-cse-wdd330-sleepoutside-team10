// product.js

import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Get the product ID from the URL
const productId = getParam('product');

// Create an instance of ProductData
const dataSource = new ProductData('tents');

// Create an instance of ProductDetails
const product = new ProductDetails(productId, dataSource);

// Initialize and render the product details
product.init();
