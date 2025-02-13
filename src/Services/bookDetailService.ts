import { IBookDetail } from '../interfaces/bookDetailInterface'
import { bookDetailModel } from '../models/bookDetailModel'
import { bookModel } from '../models/bookModel'

import { ClientError } from '../utils/errors'

export class BookDetailService {
  static getBooksDetail = async () => {
    const items = await bookDetailModel.find()
    if (Array.isArray(items) && items.length === 0) { throw new ClientError('Empty list', 404) }
    return items
  }

  static getBookDetail = async (serie: string) => {
    const book = await bookModel.findOne({ serie: Number(serie) })
    if (!book) throw new ClientError('Book not found', 404)
    const item = await bookDetailModel.findOne({ book: book._id })
    if (!item) throw new ClientError('Detail book not found', 404)
    return item
  }

  static postBookDetail = async (bookDetail: IBookDetail) => {
    return await bookDetailModel.create(bookDetail)
  }

  static updateBookDetail = async () => { }
  static deleteBookDetail = async () => { }
}
