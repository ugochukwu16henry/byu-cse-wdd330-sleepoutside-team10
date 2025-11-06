import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  // Get existing cart or initialize empty array
  let cart = getLocalStorage('so-cart');

  // Ensure cart is an array
  if (!cart || !Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product to the cart array
  cart.push(product);

  // Save the updated cart back to localStorage
  setLocalStorage('so-cart', cart);

  // Optional: Show confirmation
  console.log('Product added to cart!', product.Name);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
const addbottonText = document.getElementById('addToCart');

document.getElementById('addToCart').addEventListener('click', addToCartHandler)
