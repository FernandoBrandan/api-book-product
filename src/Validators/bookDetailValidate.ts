import joi from 'joi'
import { IBookDetail } from '../interfaces/bookDetailInterface'

const bookDetailValidateHandler = (data: IBookDetail) => {
  if (!data) return { error: 'Missing data' }
  const bookDetailSchema = joi.object({
    stock: joi.number().required(),
    price: joi.number().required(),
    condition: joi.string().required(),
    isbn: joi.string().required(),
    isAvailable: joi.boolean().required(),
    images: joi.array().items(joi.string()).required(),
    edition: joi.string().required(),
    publisher: joi.required(),
    coverImageUrl: joi.string().required(),
    keywords: joi.array().items(joi.string()).required()
  })
  return bookDetailSchema.validate(data)
}
export default bookDetailValidateHandler
