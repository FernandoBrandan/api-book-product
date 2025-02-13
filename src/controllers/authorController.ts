import { Request, Response } from 'express'
import { IAuthor } from '../interfaces/authorInterface'
import { AuthorService } from '../Services/authorService'

import catchedAsync from '../utils/catchedAsync'
import success from '../utils/success'
import { MissingParamError } from '../utils/errors'

export const getAuthors = catchedAsync(async (req: Request, res: Response) => {
  const authors = await AuthorService.getAuthors()
  success(res, 200, authors)
})

export const getAuthor = catchedAsync(async (req: Request, res: Response) => {
  if (!req.params.id) { throw new MissingParamError('author_id') }
  const author = await AuthorService.getAuthor(req.params.id)
  success(res, 200, author)
})

export const createAuthor = catchedAsync(async (req: Request, res: Response) => {
  const newAuthor: IAuthor = req.body
  const author = await AuthorService.postAuthor(newAuthor)
  success(res, 201, author)
})

export const updateAuthor = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}

export const deleteAuthor = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}
