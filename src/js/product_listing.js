import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// loadHeaderFooter();

const category = getParam('category');   // gets tents/backpacks/etc.
console.log(category);
  const element = document.querySelector('.product-list'); // container for products

// const dataSource = new ProductData(category);

// import ProductData from "./ProductData.mjs";

const dataSource = new ProductData(category);

// // WRONG: this just logs the class instance
// console.log(dataSource);


// CORRECT: fetch the data from JSON
const products = await dataSource.getData();
console.log(products); // -> this logs the actual array of products from tents.json


// console.log(dataSource);

const productList = new ProductList(category, dataSource, element);

// // Initialize and render products
 productList.init();
