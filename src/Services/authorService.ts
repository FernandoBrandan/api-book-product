import { authorModel } from '../models/authorModel'
import { IAuthor } from '../interfaces/authorInterface'

import { ClientError } from '../utils/errors'

export class AuthorService {
  static getAuthors = async () => {
    const items = await authorModel.find()
    if (Array.isArray(items) && items.length === 0) { throw new ClientError('No authors found', 404) }
    return items
  }

  static getAuthor = async (authorId: string) => {
    const item = await authorModel.find({ author_id: authorId })
    if (!item) { throw new ClientError('Author not found', 404) }
    return item
  }

  static postAuthor = async (author: IAuthor) => {
    const existingAuthor = await authorModel.exists({ name: author.name })
    if (existingAuthor) { throw new ClientError('Author already exists', 400) }
    const newAuthor = await authorModel.create(author)
    if (!newAuthor) { throw new ClientError('Author not created', 400) }
    return newAuthor
  }
}
