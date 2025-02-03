import { Request, Response, NextFunction } from 'express'
import { IAuthor } from './authorInterface'
import { AuthorService } from './authorService'
import { authorValidateHandler } from './authorValidate'

export const getAuthors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await AuthorService.getAuthors()
    if (authors.status === 'error') {
      res.status(authors.statuscode).json({ message: authors.message })
    }
    res.status(authors.statuscode).json(authors.data)
  } catch (error) {
    next(error)
  }
}

export const getAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: 'Error author id is required' })
    }
    const author = await AuthorService.getAuthor(req.params.id)
    if (author.status === 'error') {
      res.status(author.statuscode).json({ message: author.message })
    }
    res.status(author.statuscode).json(author.data)
  } catch (error) {
    next(error)
  }
}

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newAuthor: IAuthor = req.body
    const validated = authorValidateHandler(newAuthor)
    if (!validated) {
      res.status(400).json({ error: 'Error validated author' })
    }

    const authors = await AuthorService.postAuthor(newAuthor)
    if (authors.status === 'error') {
      res.status(authors.statuscode).json({ message: authors.message })
    }
    res.status(authors.statuscode).json(authors.data)
  } catch (error) {
    next(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(300).json({ message: 'Not implemented' })
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(300).json({ message: 'Not implemented' })
}
