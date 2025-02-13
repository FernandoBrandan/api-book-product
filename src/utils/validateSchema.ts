import { Request, Response, NextFunction } from 'express'

import bookValidateHandler from '../Validators/bookValidate'
import catchedAsync from '../utils/catchedAsync'

const validateBook = catchedAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validate = await bookValidateHandler(req.body)

  if (validate.error && (validate.error as any).details) {
    const errorMessage = (validate.error as any).details[0]?.message
    return res.status(400).json({
      error: true,
      message: errorMessage || ''
    })
  }

  next()
})

export default validateBook
