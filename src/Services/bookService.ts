import { isValidObjectId } from 'mongoose'
import { IBook } from '../interfaces/bookInterface'
import { bookModel } from '../models/bookModel'
import { authorModel } from '../models/authorModel'
import { categoryModel } from '../models/categoryModel'
import { bookDetailModel } from '../models/bookDetailModel'

import { ClientError } from '../utils/errors'

interface items {
  itemId: number;
  price: number;
  quantity: number;
}

export class BookService {
  static getBooks = async () => {
    const items = await bookModel.find().populate('bookDetail')
    if (Array.isArray(items) && items.length === 0) { throw new ClientError('No books found', 404) }
    return items
  }

  static getBook = async (serie: string) => {
    const item = await bookModel.find({ serie: Number(serie) })
    if (!item) { throw new ClientError('Book not found', 404) }
    return item
  }

  static postBook = async (book: IBook) => {
    if (!isValidObjectId(book.author) || !isValidObjectId(book.category)) {
      throw new ClientError('Author or Category not found or invalidate id', 404)
    }

    const existingAuthor = await authorModel.findOne({ _id: book.author })
    if (!existingAuthor) { throw new ClientError('Author not found', 404) }

    const existingCategory = await categoryModel.findOne({ _id: book.category })
    if (!existingCategory) { throw new ClientError('Category not found', 404) }

    const existingBookDetail = await bookDetailModel.findOne({ _id: book.bookDetail })
    if (!existingBookDetail) { throw new ClientError('bookDetail_id not created', 404) }

    const existingBook = await bookModel.findOne({ serie: book.serie })
    if (existingBook) { throw new ClientError('Book already', 404) }

    const newBook = await bookModel.create({
      ...book,
      author: existingAuthor._id,
      category: existingCategory._id,
      bookDetail: existingBookDetail._id
    })
    if (!newBook) { throw new ClientError('Book not created', 404) }
    return newBook
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
      /**
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
      */
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
      /**
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
      */
    }
    if (errors.length > 0) {
      return { valid: false, message: errors.join('\n') }
    }
    return { valid: true, message: 'stock updated successfully' }
  }
}
