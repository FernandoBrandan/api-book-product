import joi from 'joi'
import { IBookDetail } from './bookDetailInterface'

export const bookValidateHandler = (data: IBookDetail) => {
  if (!data) return { error: 'Missing data' }
  const bookSchema = joi.object({

  })
  return bookSchema.validate(data)
}
