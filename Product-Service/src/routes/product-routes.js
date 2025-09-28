const product_cntl=require("../controllers/product-controller")
const {authenticateRequest} = require("../middlewares/authMiddleware")
const express = require("express")
const routes = express.Router()
routes.post("/api/saveProduct",authenticateRequest,product_cntl.saveProduct)

module.exports=routes
