import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart') || [];

  // console.log(cartItems);

  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
const addbottonText = document.getElementById('addToCart');

document.getElementById('addToCart').addEventListener('click', () => {
  addToCartHandler;
  // I modefily  the text content of the add item button to change to item add so it can be notice that the item have been added
  addbottonText.textContent = 'Item added ✅';
  // I updated the and  return the button  text content back to "Add to cart" in 2s
  setTimeout(() => {
    addbottonText.textContent = 'Add to cart';
  }, 2000);
});
