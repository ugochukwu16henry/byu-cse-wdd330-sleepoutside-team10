import { renderListWithTemplate, discountPrice } from './utils.mjs';

function productCardTemplate(product) {
  const discount = discountPrice(
    product.FinalPrice,
    product.SuggestedRetailPrice,
  );

  const imageUrl =
    product.Images?.PrimaryLarge ||
    product.Images?.PrimaryMedium ||
    product.Image ||
    '/images/no-image.png';

  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${imageUrl}"
        alt="Image of ${product.NameWithoutBrand}"
        loading="lazy"
      />
      <h3 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">
        $${product.FinalPrice}
        ${discount > 0 ? `<span class="product-discount">${discount}% OFF</span>` : ''}
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);

    document.title = `Sleep Outside | ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
