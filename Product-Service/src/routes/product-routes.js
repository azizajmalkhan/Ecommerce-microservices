const product_cntl=require("../controllers/product-controller")

const express = require("express")
const routes = express.Router()
routes.post("/api/saveProduct",product_cntl.saveProduct)

module.exports=routes
