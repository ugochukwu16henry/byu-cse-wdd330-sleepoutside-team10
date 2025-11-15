import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    
      
      ${product.Brand.Name}
      ${product.NameWithoutBrand}
      $${product.FinalPrice}
    
  `;
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

    // Update page title
    document.querySelector('.category-name').textContent =
      this.category.charAt(0).toUpperCase() +
      this.category.slice(1).replace('-', ' ');
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
