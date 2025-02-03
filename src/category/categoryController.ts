import { Request, Response, NextFunction } from 'express'
import { ICategory } from './categoryInterface'
import { CategoryService } from './categoryService'
import { categoryValidateHandler } from './categoryValidate'

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await CategoryService.getCategories()
    if (categories.status === 'error') {
      res.status(categories.statuscode).json({ message: categories.message })
    }
    res.status(categories.statuscode).json(categories.data)
  } catch (error) {
    next(error)
  }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: 'Error category id is required' })
    }
    const newCategory = await CategoryService.getCategory(req.params.id)
    if (newCategory.status === 'error') {
      res.status(newCategory.statuscode).json({ message: newCategory.message })
    }
    res.status(newCategory.statuscode).json(newCategory.data)
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newCategory: ICategory = req.body
    const validated = categoryValidateHandler(newCategory)
    if (!validated) {
      res.status(400).json({ error: 'Error validated category' })
    }
    const categories = await CategoryService.postCategory(newCategory)
    if (categories.status === 'error') {
      res.status(categories.statuscode).json({ message: categories.message })
    }
    res.status(categories.statuscode).json(categories.data)
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}

export const deleteCategory = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}
