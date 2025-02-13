import joi from 'joi'
import { IAuthor } from '../interfaces/authorInterface'

const authorValidateHandler = (data: IAuthor) => {
  if (!data) return { error: 'Missing data' }
  const authorSchema = joi.object({
    author_id: joi.number().required().min(999).max(999999),
    name: joi.string().required(),
    birthDate: joi.date(),
    nationality: joi.string().trim()
  })
  return authorSchema.validate(data)
}
export default authorValidateHandler
