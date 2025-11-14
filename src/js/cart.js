import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  let cartItems = getLocalStorage('so-cart');

  if (!cartItems) {
    cartItems = [];
  } else if (!Array.isArray(cartItems)) {
    console.warn('Cart data was not an array, converting...', cartItems);
    cartItems = [cartItems];
  }

  if(cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total-amount').textContent = '$0.00';
    return;
  }

  const htmlItems = cartItems.map(item => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  // Calculate total with reduce
  const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

  // Display total formatted
  document.getElementById('cart-total-amount').textContent = `$${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
