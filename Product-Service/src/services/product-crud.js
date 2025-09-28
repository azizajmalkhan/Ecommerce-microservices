const Product = require("../models/product")
const logger = require("../utils/logger")
const createProduct = async (req) => {
  logger.debug("Create product endpoint hit");

  try {
    const { name, price, description, status } = req;

    console.log("log -- service --- 1");
    
    // Validation
    if (!name || !price) {
      logger.warn("Validation error: missing name or price", { request: req });
      //return { error: "Name and Price are required" };

      let error = new Error("Missing name or price")
      error.status = 400
      throw error
    }

    // Create product
    const product = await Product.create({ name, price, description, status });
    console.log("log -- service ---  2 ");

    logger.info("Product created successfully: %s", product.name);
    logger.debug("Full product data: %j", product);

    console.log("log -- service --- 3 ");


    return product;
  } catch (error) {
    logger.error("Error creating product", { error });

    console.log(error);
    
    throw error  }
};

module.exports = { createProduct };
