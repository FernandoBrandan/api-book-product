import { Response } from 'express'

const response = <T>(res: Response, statusCode: number, data: T): void => {
  res.status(statusCode).json({
    error: false,
    data
  })
}

export default response
