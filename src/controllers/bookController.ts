import { Request, Response } from 'express'
import { IBook } from '../interfaces/bookInterface'
import { BookService } from '../Services/bookService'

import { createBookDetail } from '../controllers/bookDetailController'
import { IBookDetail } from '../interfaces/bookDetailInterface'

import catchedAsync from '../utils/catchedAsync'
import success from '../utils/success'
import { MissingParamError } from '../utils/errors'

export const getBooks = catchedAsync(async (req: Request, res: Response) => {
  const books = await BookService.getBooks()
  success(res, 200, books)
})

export const getBook = catchedAsync(async (req: Request, res: Response) => {
  if (!req.params.serie) { throw new MissingParamError('serie') }
  const book = await BookService.getBook(req.params.serie)
  success(res, 200, book)
})

export const createBook = catchedAsync(async (req: Request, res: Response) => {
  const bookDetail: IBookDetail = req.body.bookDetail
  const newBookDetail: IBookDetail = await createBookDetail(bookDetail)
  const newBook: IBook = {
    ...req.body,
    bookDetail: newBookDetail._id
  }
  const book = await BookService.postBook(newBook)
  success(res, 201, book)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateBook = (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteBook = (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}
