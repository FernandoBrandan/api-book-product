import { Schema, model } from 'mongoose'
import { ICategory } from '../interfaces/categoryInterface'

const categorySchema = new Schema<ICategory>({
  category_id: { type: Number, min: 999, max: 999999, required: true, unique: true },
  name: { type: String, required: true, trim: true, unique: true, enum: ['Novela', 'Ciencia Ficción', 'Horror', 'Aventura', 'Humor'] }
}, {
  timestamps: true,
  versionKey: false
})

const categoryModel = model<ICategory>('Category', categorySchema)
export { categoryModel }
