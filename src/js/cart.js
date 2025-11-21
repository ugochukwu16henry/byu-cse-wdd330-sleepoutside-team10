import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.cart-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
   <p class="cart-card__quantity">Quantity: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`

  return newItem;
}

renderCartContents();
