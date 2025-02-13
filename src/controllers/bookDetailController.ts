import { Request, Response } from 'express'
import { BookDetailService } from '../Services/bookDetailService'
import { IBookDetail } from '../interfaces/bookDetailInterface'

import catchedAsync from '../utils/catchedAsync'
import success from '../utils/success'
import { MissingParamError } from '../utils/errors'

export const getBooksDetail = catchedAsync(async (req: Request, res: Response) => {
  const info = await BookDetailService.getBooksDetail()
  success(res, 200, info)
})

export const getBookDetail = catchedAsync(async (req: Request, res: Response) => {
  if (!req.params.id) { throw new MissingParamError('bookDetail_id') }
  const info = await BookDetailService.getBookDetail(req.params.id)
  success(res, 200, info)
})

export const createBookDetail = catchedAsync(async (bookDetail: IBookDetail) => {
  // validar joi
  // validar isbn unico o  capturar error
  // manejar errores
  const newBookDetail = await BookDetailService.postBookDetail(bookDetail)
  return newBookDetail
})

export const updateBookDetail = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}

export const deleteBookDetail = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}
