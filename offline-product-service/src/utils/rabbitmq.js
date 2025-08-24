const amqp = require("amqplib")
let connection = null
let channel = null

const EXCHANGE_NAME = 'craete_product_event'

async function connectRabbitMQ(){
    try{
        connection = await amqp.connect(process.env.RABBITMQ_URL)
        channel = await connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME,"topic",{durable: false })
        console.log("channel .................");
        
        return channel
    }catch(error){
        return {
            status : "error",
            message : error.message
        }
    }
}

async function publishEvent(routingKey,message) {
    if(!channel){
        await connectRabbitMQ()

    }
    console.log("routingKey",routingKey);
    console.log("message",message);
    
    
    channel.publish(
        EXCHANGE_NAME,
        routingKey,
    Buffer.from(JSON.stringify(message)));
}



async function consumeEvent(routingKey,callback) {
    if(!channel){
        await connectRabbitMQ()
    }

    const q = await channel.assertQueue("",{exclusive:true})
    await channel.bindQueue(q.queue,EXCHANGE_NAME,routingKey)
    channel.consume(q.queue,(msg)=>{
        if(msg!==null){
            const content = JSON.parse(msg.content.toString());
            callback(content)
            //content.ack(msg)
        }
    })
}

module.exports = {connectRabbitMQ,publishEvent,consumeEvent}