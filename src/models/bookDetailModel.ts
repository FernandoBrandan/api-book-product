import { Schema, model } from 'mongoose'
import { IBookDetail } from '../interfaces/bookDetailInterface'

const bookDetailSchema = new Schema<IBookDetail>({
  stock: { type: Number, required: true, min: 0, default: 0 },
  price: { type: Number, required: true, min: 0 },
  condition: { type: String, enum: ['new', 'used', 'damaged'], default: 'new' },
  isAvailable: { type: Boolean, default: true },
  isbn: { type: String, unique: true, required: true },
  images: { type: [String] },
  edition: { type: String, default: '1st' },
  publisher: { type: String },
  coverImageUrl: { type: String, trim: true },
  keywords: { type: [String], default: [] }
}, {
  timestamps: true,
  versionKey: false
})

const bookDetailModel = model<IBookDetail>('BookDetail', bookDetailSchema)
export { bookDetailModel }
