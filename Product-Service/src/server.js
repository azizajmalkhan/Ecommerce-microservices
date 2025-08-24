require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
const sequelize = require("./config/db")
const routes = require("./routes/product-routes")
const { connectRabbitMQ } = require("./utils/rabbitmq")
app.use("/",routes)
const port = process.env.SERVER_PORT
// sync DB (create tables if not exist)

async function startServer(){
  await sequelize.sync({ alter: true })
  console.log("✅ Database synced");
  await connectRabbitMQ()
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}


startServer()

