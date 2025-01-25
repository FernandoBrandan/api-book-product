
// 3. apiBooks - Escuchar y procesar mensajes de RabbitMQ
// El servicio apiBooks escuchará la cola product_validation_queue, 
// procesará los productIds y devolverá si los productos existen o no a través de la cola product_validation_response_queue.

// Ejemplo: apiBooksService.ts - Consumir y procesar mensajes RabbitMQ

import amqp from 'amqplib';
import { BookService } from './bookService';  // Servicio de productos que consulta la base de datos

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = 'book_validation_queue';  // Cola de entrada para validación
const RESPONSE_QUEUE_NAME = 'book_validation_response_queue';  // Cola para respuesta

export const apiBooksService = {
  async startListening() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Asegurarse de que la cola existe
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });

    console.log('Esperando mensajes en la cola', QUEUE_NAME);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg) {
        const { productIds } = JSON.parse(msg.content.toString());

        // Validar los productos en la base de datos
        const productsExist = await BookService.checkIfProductsExist(productIds);

        // Enviar la respuesta a la cola de respuesta
        const response = { valid: productsExist };
        channel.sendToQueue(RESPONSE_QUEUE_NAME, Buffer.from(JSON.stringify(response)), { persistent: true });

        // Confirmar que el mensaje ha sido procesado
        channel.ack(msg);
      }
    });
  }
};