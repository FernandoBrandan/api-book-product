import { Request, Response } from 'express'
import { ICategory } from '../interfaces/categoryInterface'
import { CategoryService } from '../Services/categoryService'

import catchedAsync from '../utils/catchedAsync'
import success from '../utils/success'
import { MissingParamError } from '../utils/errors'

export const getCategories = catchedAsync(async (req: Request, res: Response) => {
  const categories = await CategoryService.getCategories()
  success(res, 200, categories)
})

export const getCategory = catchedAsync(async (req: Request, res: Response) => {
  if (!req.params.id) { throw new MissingParamError('category_id') }
  const category = await CategoryService.getCategory(req.params.id)
  success(res, 200, category)
})

export const createCategory = catchedAsync(async (req: Request, res: Response) => {
  const newCategory: ICategory = req.body
  const category = await CategoryService.postCategory(newCategory)
  success(res, 200, category)
})

export const updateCategory = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}

export const deleteCategory = async (req: Request, res: Response) => {
  res.status(300).json({ message: 'Not implemented' })
}
