import { authorModel } from './authorModel'
import { IAuthor } from './authorInterface'

export class AuthorService {
  static getAuthors = async () => {
    const items = await authorModel.find()
    if (Array.isArray(items) && items.length === 0) return { status: 'error', statuscode: 404, message: 'No authors found' }
    return { status: 'success', statuscode: 200, data: items }
  }

  static getAuthor = async (authorId: string) => {
    const item = await authorModel.find({ author_id: authorId })
    if (!item) return { status: 'error', statuscode: 404, message: 'Author not found' }
    return { status: 'success', statuscode: 200, data: item }
  }

  static postAuthor = async (author: IAuthor) => {
    const existingAuthor = await authorModel.exists({ name: author.name })
    if (existingAuthor) return { status: 'error', statuscode: 400, message: 'Author already exists' }
    const newAuthor = await authorModel.create(author)
    if (!newAuthor) return { status: 'error', statuscode: 404, message: 'Author not created' }
    return { status: 'success', statuscode: 201, data: newAuthor }
  }
}
