require("dotenv").config()
const express = require("express")
const { connectRabbitMQ, consumeEvent } = require("./utils/rabbitmq")
const handleCreateproduct = require("./eventHandlers/product-event-handling")
const app = express()
app.use(express.json())


const mongoose = require("mongoose")
const port = process.env.SERVER_PORT


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongodb"))
  .catch((e) => console.log("Mongo connection error", e));

const createProduct = require("./services/product-crud")

createProduct()


async function startServer(){
  console.log("✅ Database synced");
  await connectRabbitMQ()
  await consumeEvent("post.created", handleCreateproduct) 
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}


startServer()

