const mongoose = require("mongoose")
const { Schema } = mongoose;


console.log("executed product mongo");

const product_schema = new Schema({
    name:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    price:{
        type: String,
        required: false
    }
})

const product = mongoose.model("products", product_schema); 

module.exports = product