import { IBookDetail } from './bookDetailInterface'
import { bookDetailModel } from './bookDetailModel'
import { bookModel } from '../book/bookModel'

export class BookDetailService {
  static getBooksDetail = async () => {
    const items = await bookDetailModel.find()
    if (Array.isArray(items) && items.length === 0) return { status: 'error', statuscode: 404, message: 'Empty list' }
    return { status: 'success', statuscode: 200, data: items }
  }

  static getBookDetail = async (serie: string) => {
    const book = await bookModel.findOne({ serie: Number(serie) })
    if (!book) return { status: 'error', statuscode: 404, message: 'Book not found' }
    const item = await bookDetailModel.findOne({ book: book._id })
    if (!item) return { status: 'error', statuscode: 404, message: 'Detail book not found' }
    return { status: 'success', statuscode: 200, data: item }
  }

  static postBookDetail = async (bookDetail: IBookDetail) => {
    console.log('\n \n \n ver', bookDetail)
    const res = await bookDetailModel.create(bookDetail)
    console.log('res', res)
    return res
  }

  static updateBookDetail = async () => {

  }

  static deleteBookDetail = async () => {

  }
}
