// consumer.ts
import amqp from 'amqplib'
import { BookService } from '../Services/bookService'
const RABBITMQ_URL = process.env.RABBITMQ_URL as string
const QUEUE = 'API-LIBRARY'
const ERROR_QUEUE = 'ERROR_QUEUE'
export const consumeMessages = async (): Promise<void> => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(QUEUE, { durable: true })
    console.log(`Connected to RabbitMQ! Waiting for messages in ${QUEUE}. To exit press CTRL+C`)
    channel.consume(QUEUE, async (msg) => {
      if (msg) {
        console.log(`Received message: ${msg.content.toString()}`)
        const data = JSON.parse(msg.content.toString())
        try {
          let response
          if ('act' in data[0]) {
            response = await BookService.updateStock(data[0].items)
          } else {
            response = await BookService.checkIfItemsExist(data)
          }

          if (msg.properties.replyTo) {
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ response, message: 'From api-books consumeMessages' })), {
              correlationId: msg.properties.correlationId
            })
          }
        } catch (error) {
          const errorMessage = { // Enviar mensaje de error a una cola de errores
            error,
            originalMessage: 'Error processing order',
            timestamp: new Date().toISOString()
          }
          channel.sendToQueue(ERROR_QUEUE, Buffer.from(JSON.stringify(errorMessage)), { persistent: true })
        }
        channel.ack(msg)// mensaje procesado
      }
    }, { noAck: false })
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error)
    throw error
  }
}
