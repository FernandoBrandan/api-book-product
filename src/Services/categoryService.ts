import { categoryModel } from '../models/categoryModel'
import { ICategory } from '../interfaces/categoryInterface'

import { ClientError } from '../utils/errors'

export class CategoryService {
  static getCategories = async () => {
    const items = await categoryModel.find()
    if (Array.isArray(items) && items.length === 0) { throw new ClientError('No categories found', 404) }
    return items
  }

  static getCategory = async (categoryId: string) => {
    const item = await categoryModel.find({ category_id: categoryId })
    if (!item) { throw new ClientError('Category not found', 404) }
    return item
  }

  static postCategory = async (category: ICategory) => {
    const existingCategory = await categoryModel.exists({ name: category.name })
    if (existingCategory) { throw new ClientError('Category already exists', 400) }
    const newCategory = await categoryModel.create(category)
    if (!newCategory) { throw new ClientError('Category not created', 400) }
    return newCategory
  }
}
