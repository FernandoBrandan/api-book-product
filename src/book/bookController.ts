import { Request, Response, NextFunction } from 'express'
import { IBook } from './bookInterface'
import { BookService } from './bookService'
import { bookValidateHandler } from './bookValidate'

import { createBookDetail } from '../bookDetail/bookDetailController'
import { IBookDetail } from '../bookDetail/bookDetailInterface'

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookService.getBooks()
    if (books.status === 'error') {
      res.status(books.statuscode).json({ message: books.message })
    }
    res.status(books.statuscode).json(books.data)
  } catch (error) {
    next(error)
  }
}

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.serie) {
      res.status(400).json({ error: 'Error book serie is required' })
    }
    const book = await BookService.getBook(req.params.serie)
    if (book.status === 'error') {
      res.status(book.statuscode).json({ message: book.message })
    }
    res.status(book.statuscode).json(book.data)
  } catch (error) {
    next(error)
  }
}

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookDetail } = req.body
    console.log(bookDetail)
    const newBookDetail: IBookDetail = await createBookDetail(bookDetail)
    const newBook: IBook = req.body
    newBook.bookDetail = newBookDetail
    const validated = bookValidateHandler(newBook)
    if (validated.error) {
      res.status(400).json({ error: 'Error validated book', message: validated.error })
    }
    const book = await BookService.postBook(newBook)
    if (book.status === 'error') {
      res.status(book.statuscode).json({ error: 'Error create book', message: book.message })
    }
    res.status(book.statuscode).json(book.data)
  } catch (error) {
    next(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  res.status(300).json({ message: 'Not implemented' })
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  res.status(300).json({ message: 'Not implemented' })
}
