import { NextFunction, Request, Response } from 'express'

interface CustomError extends Error {
  statusCode?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const error = { ...err }
  error.message = err.message
  res.status(error.statusCode || 500).json({
    error: error.message || 'Server Error'
  })
}
export default errorHandler

// https://dev.to/srishtikprasad/error-handling-with-express-40pk
// https://dev.to/divine_nnanna2/error-handling-and-logging-in-nodejs-applications-1k2a
// https://medium.com/@adarshahelvar/error-handling-in-node-js-7a474a8e6ba7
// https://javascript.plainenglish.io/global-error-handling-in-node-js-with-middleware-a-complete-guide-%EF%B8%8F-b037023e3866
