import { setLocalStorage, getLocalStorage, discountPrice } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    let cart = getLocalStorage('so-cart') || [];

    const existingItem = cart.find((item) => item.Id === this.product.Id);

    if (existingItem) {
      existingItem.Quantity += 1;
    } else {
      this.product.Quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage('so-cart', cart);
    document.dispatchEvent(new CustomEvent('cartUpdated'));

    // Import and call alertMessage ONLY here — inside the method!
    import('./utils.mjs').then((utils) => {
      utils.alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    });

    // Button animation
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
      <img class="divider" src="${this.product.Images.PrimaryLarge || this.product.Images.PrimaryMedium}" alt="${this.product.Name}" />
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
