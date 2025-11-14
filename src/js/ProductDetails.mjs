// Update the image references to use the new structure
function productDetailsTemplate(product) {
  return `
    ${product.Brand.Name}
    ${product.NameWithoutBrand}
    
    $${product.FinalPrice}
    ${product.Colors[0].ColorName}
    ${product.DescriptionHtmlSimple}
    
      Add to Cart
    
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails('main');

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  // ... rest of the class
}
