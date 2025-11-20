// ProductDetails.mjs

import { setLocalStorage, getLocalStorage,discountPrice } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Use the datasource to get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);
    //  console.log('Product found:', this.product);

    // Render the product details HTML
    this.renderProductDetails();

    // Add listener to the Add to Cart button
    // Notice the .bind(this) - necessary to maintain correct context
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    // Get existing cart or initialize empty array
    let cart = getLocalStorage('so-cart');

    // Ensure cart is an array
    if (!cart || !Array.isArray(cart)) {
      cart = [];
    }

    // Add the current product to the cart array
    cart.push(this.product);

    // Save the updated cart back to localStorage
    setLocalStorage('so-cart', cart);

    // Optional: Show confirmation
    console.log('Product added to cart!', this.product.Name);
    alert('Product added to cart!');
  }

  renderProductDetails() { 

    // Get the product detail section 
    console.log(this.product.Brand.Name)

    const productSection = document.querySelector('.product-detail'); 

     const discount = discountPrice(this.product.FinalPrice,this.product.SuggestedRetailPrice); 

 

    // Generate the HTML for product details 

    productSection.innerHTML = ` 

      

    `; 

  } 

} 

 
