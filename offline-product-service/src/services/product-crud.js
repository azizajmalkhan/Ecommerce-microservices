const Product = require("../models/product-md");

async function createProduct() {
  const newProduct = new Product({
    name: "Test Product",
    description: "Some description",
    price: "100"
  });

  await newProduct.save(); // <-- At this point, MongoDB creates the "products" collection
  console.log("✅ Product saved:", newProduct);
}

module.exports = createProduct
