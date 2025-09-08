const express = require('express');
const amqplib = require('amqplib');
const { EmailService } = require('./services');

async function connectQueue(){
    try{
        const connection = await amqplib.connect('amqps://mtmceyxh:ISPCD-YRQzKVwkoyrZzIC4Q_DItH0PAq@leopard.lmq.cloudamqp.com/mtmceyxh');
        const channel = await connection.createChannel();

        await  channel.assertQueue("noti-queue");
        channel.consume("noti-queue", async (data) => {
            const obj =JSON.parse(`${Buffer.from(data.content)}`);
            console.log("Message received from queue", obj);
;           await EmailService.sendEmail("airlinenotiservice3@gmail.com", obj.recepientEmail, obj.subject, obj.text)
            channel.ack(data);
        });
    }
    catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const mailsender = require('./config/email-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue();
    console.log('Queue connected');
});
