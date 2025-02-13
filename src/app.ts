import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import { consumeMessages } from './messageQueue/bookServiceMessage'
import bookoRouter from './routes/bookRoute'
import bookDetailRouter from './routes/bookDetailRoute'
import authorRouter from './routes/authorRoute'
import categoryRouter from './routes/categoryRoute'
import errorHandler from './middleware/errorHandler'
/** **************************************************** */
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}
app.use(helmet(
  {
    dnsPrefetchControl: false,
    contentSecurityPolicy: false,
    hsts: false,
    frameguard: false,
    // frameguard: { action: "deny" },
    referrerPolicy: false
  }
))
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 50,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
  statusCode: 429
})
app.use(limiter)
const corsOptions = {
  origin: process.env.NODE_ENV === 'development'
    ? '*'
    : 'https://your-production-domain.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}
if (process.env.NODE_ENV === 'development') {
  app.use(cors())
} else {
  app.use(cors(corsOptions))
}
/** **************************************************** */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
consumeMessages()
app.use('/api/library', bookoRouter)
app.use('/api/library', bookDetailRouter)
app.use('/api/library', authorRouter)
app.use('/api/library', categoryRouter)
app.use(errorHandler)
/** **************************************************** */
export default app
