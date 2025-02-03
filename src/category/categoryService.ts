import { categoryModel } from './categoryModel'
import { ICategory } from './categoryInterface'

export class CategoryService {
  static getCategories = async () => {
    const items = await categoryModel.find()
    if (Array.isArray(items) && items.length === 0) return { status: 'error', statuscode: 404, message: 'No categories found' }
    return { status: 'success', statuscode: 200, data: items }
  }

  static getCategory = async (categoryId: string) => {
    const item = await categoryModel.find({ category_id: categoryId })
    if (Array.isArray(item) && item.length === 0) return { status: 'error', statuscode: 404, message: 'Category not found' }
    return { status: 'success', statuscode: 200, data: item }
  }

  static postCategory = async (category: ICategory) => {
    const existingCategory = await categoryModel.exists({ name: category.name })
    if (existingCategory) return { status: 'error', statuscode: 400, message: 'Category already exists' }
    const newCategory = await categoryModel.create(category)
    if (!newCategory) return { status: 'error', statuscode: 404, message: 'Category not created' }
    return { status: 'success', statuscode: 201, data: newCategory }
  }
}
