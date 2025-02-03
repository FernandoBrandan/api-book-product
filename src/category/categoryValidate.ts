import joi from 'joi'
import { ICategory } from './categoryInterface'

export const categoryValidateHandler = (data: ICategory) => {
  if (!data) return { error: 'Missing data' }
  const categorySchema = joi.object({
    category_id: joi.number().min(999).max(999999).required(),
    name: joi.string().required()
  })
  return categorySchema.validate(data)
}
