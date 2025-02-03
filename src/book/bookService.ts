import { isValidObjectId } from 'mongoose'
import { IBook } from './bookInterface'
import { bookModel } from './bookModel'
import { authorModel } from '../author/authorModel'
import { categoryModel } from '../category/categoryModel'
import { bookDetailModel } from '../bookDetail/bookDetailModel'

interface items {
  itemId: number;
  price: number;
  quantity: number;
}

export class BookService {
  static getBooks = async () => {
    const items = await bookModel.find().populate('bookDetail')
    if (Array.isArray(items) && items.length === 0) return { status: 'error', statuscode: 404, message: 'No books found' }
    return { status: 'success', statuscode: 200, data: items }
  }

  static getBook = async (serie: string) => {
    const item = await bookModel.find({ serie: Number(serie) })
    if (!item) return { status: 'error', statuscode: 404, message: 'Book not found' }
    return { status: 'success', statuscode: 200, data: item }
  }

  static postBook = async (book: IBook) => {
    if (!isValidObjectId(book.author) || !isValidObjectId(book.category)) {
      return { status: 'error', statuscode: 400, message: 'Author or Category not found or invalidate id' }
    }
    const existingAuthor = await authorModel.findOne({ _id: book.author })
    if (!existingAuthor) return { status: 'error', statuscode: 400, message: 'Author not found' }
    const existingCategory = await categoryModel.findOne({ _id: book.category })
    if (!existingCategory) return { status: 'error', statuscode: 400, message: 'Category not found' }
    const existingBookDetail = await bookDetailModel.findOne({ _id: book.bookDetail })
    if (!existingBookDetail) return { status: 'error', statuscode: 400, message: 'bookDetail_id not found' }
    const existingBook = await bookModel.findOne({ serie: book.serie })
    if (existingBook) return { status: 'error', statuscode: 400, message: 'Book already' }
    const newBook = await bookModel.create({
      ...book,
      author: existingAuthor._id,
      category: existingCategory._id,
      bookDetail: existingBookDetail._id
    })
    if (!newBook) return { status: 'error', statuscode: 404, message: 'Book not created' }
    return { status: 'success', statuscode: 201, data: newBook }
  }

  /**
  * Metods message queue
  */
  static checkIfItemsExist = async (items: items[]): Promise<{ valid: boolean; message: string }> => {
    const errors: string[] = []
    for (const item of items) {
      const book = await bookModel.findOne({ serie: item.itemId }).populate('bookDetail')
      if (!book) {
        errors.push(`El producto con ID ${item.itemId} no existe`)
        continue
      }
      if (!book.bookDetail) {
        errors.push(`No se encontró información de stock para el producto con ID ${item.itemId}`)
        continue
      }
      if (book.bookDetail.stock === 0) {
        errors.push(`No hay stock para el producto con ID ${item.itemId}. Se solicitaron ${item.quantity} unidades.`)
        continue
      }
      if (Number(book.bookDetail.stock) < item.quantity) {
        errors.push(`No hay suficiente stock para el producto con ID ${item.itemId}. Se solicitaron ${item.quantity} unidades, pero solo hay ${book.bookDetail.stock} disponibles.`)
        continue
      }
    }
    if (errors.length > 0) {
      return { valid: false, message: errors.join('\n') }
    }
    return { valid: true, message: 'Todos los productos existen y tienen stock suficiente' }
  }

  static updateStock = async (items: items[]): Promise<{ valid: boolean; message: string }> => {
    const errors: string[] = []
    for (const item of items) {
      const book = await bookModel.findOne({ serie: item.itemId }).populate('bookDetail')
      if (!book) {
        errors.push(`Libro no encontrado. ${item.itemId}.`)
        continue
      }
      const result = await bookDetailModel.findOneAndUpdate({ _id: book?.bookDetail._id },
        { $inc: { stock: -item.quantity } },
        { new: true, runValidators: true }
      )
      if (!result) {
        errors.push(`Detalle no encontrado. ${item.itemId}.`)
        continue
      }
      const updatedStock = result.stock
      if (Number(updatedStock) < 0) {
        errors.push('No hay suficiente stock.')
        continue
      }
    }
    if (errors.length > 0) {
      return { valid: false, message: errors.join('\n') }
    }
    return { valid: true, message: 'stock updated successfully' }
  }
}
