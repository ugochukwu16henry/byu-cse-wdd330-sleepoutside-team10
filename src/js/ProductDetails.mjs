import {
  setLocalStorage,
  getLocalStorage,
  discountPrice,
  alertMessage,
} from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        document.querySelector('.product-detail').innerHTML =
          '<h2>Product not found</h2>';
        return;
      }
      this.renderProductDetails();
      document
        .getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    } catch (error) {
      console.error('Failed to load product:', error);
      document.querySelector('.product-detail').innerHTML =
        '<h2>Failed to load product</h2>';
    }
  }

  addToCart() {
    let cart = getLocalStorage('so-cart');
  
    // Ensure cart is an array
    if (!cart || !Array.isArray(cart)) {
      cart = [];
    }
// Check if item already exists in cart
  const itemInCart = cart.find(item => item.Id === this.product.Id);

  // Optional: If you want to increase quantity instead of adding again
  if (itemInCart) {
   itemInCart.quantity = (itemInCart.quantity || 1) + 1;
    console.log(5+5);
  } //
  else {
    cart.push({ ...this.product, quantity: 1 });
   //cart.push(this.product);}
   }

  // Add the product to cart
 

  // Save cart
  setLocalStorage('so-cart', cart);

    // Optional: Show confirmation
    document.dispatchEvent(new CustomEvent('cartUpdated'));

    // NOW WORKS 100% — static import!
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);

    const button = document.getElementById('addToCart');
    button.textContent = 'Added!';
    button.style.backgroundColor = '#28a745';
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.style.backgroundColor = '';
    }, 1500);
  }

  renderProductDetails() {
    const discount = discountPrice(
      this.product.FinalPrice,
      this.product.SuggestedRetailPrice,
    );

    document.querySelector('.product-detail').innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider" src="${this.product.Images.PrimaryLarge || this.product.Images.PrimaryMedium}" alt="${this.product.NameWithoutBrand}" />
      <p class="product-card__price">
        $${this.product.FinalPrice}
        ${discount > 0 ? `<span class="product-discount">${discount}% OFF</span>` : ''}
      </p>
      <p class="product__color">${this.product.Colors?.[0]?.ColorName || 'Color not available'}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;

    document.title = `${this.product.NameWithoutBrand} | Sleep Outside`;
  }
}
