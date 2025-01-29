// consumer.ts
import amqp from 'amqplib';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';
const QUEUE = 'library';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const consumeMessages = async (retries = 5, delayMs = 5000): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}: Connecting to RabbitMQ...`);
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(QUEUE, { durable: true });
      console.log(`Connected! Waiting for messages in ${QUEUE}. To exit press CTRL+C`);
      channel.consume(QUEUE, (msg) => {
        if (msg) {
          console.log(`Received message: ${msg.content.toString()}`);
          channel.ack(msg);
        }
      }, { noAck: false });
      return; 
    } catch (error) {
      console.error(`Failed to connect to RabbitMQ (attempt ${attempt}/${retries}):`, error);
      if (attempt < retries) {
        console.log(`Retrying in ${delayMs / 1000} seconds...`);
        await delay(delayMs);
      } else {
        console.error('Max retries reached. Could not connect to RabbitMQ.');
        process.exit(1); 
      }
    }
  }
};
