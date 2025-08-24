const createProduct = require("../services/product-crud")
const { publishEvent } = require("../utils/rabbitmq")

const saveProduct = async (req, res) => {

    try {
        if (!req || !req.body) {
            return res.status(400).json({
                status: "error",
                message: "bad requst"
            })
        }
        let results = await createProduct(req.body)
        await publishEvent("post.created",
            {
                record_id: results.id,
                product_name: results.name
            }
        )
        
        return res.status(200).json(results)


        console.log(req.body);

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error : " + error.message
        })
    }
}


module.exports = { saveProduct }