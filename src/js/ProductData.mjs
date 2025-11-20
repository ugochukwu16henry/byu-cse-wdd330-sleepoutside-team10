export default class ProductData {
  constructor(category) {
    this.category = category; // store category in the instance
  }



async getData(category = this.category) {
  try {
    cif (!category) {
  console.error("Category is missing in URL");
} else {
  const response = await fetch(`json/${category}.json`);
  const products = await response.json();
  console.log("Products loaded:", products);
}


    // If data has Result (API returns object), use it; else use data itself
    return data.Result ? data.Result : data;

  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}


  // find a product by its ID
  async findProductById(id) {
    const products = await this.getData(); // fetch products for this.category
    return products.find(item => item.Id == id); // return a single product object
  }
}
