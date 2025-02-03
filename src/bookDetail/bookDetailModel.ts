import { Schema, model } from 'mongoose'
import { IBookDetail } from './bookDetailInterface'

const bookDetailSchema = new Schema<IBookDetail>({
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  condition: {
    type: String,
    enum: ['new', 'used', 'damaged'],
    default: 'new'
  },
  isbn: { // International Standard Book Number
    type: String,
    unique: true,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  images: {
    type: [String]
  },
  edition: {
    type: String,
    default: '1st'
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'Publisher',
    required: false
  },
  coverImageUrl: { // URL de la imagen de la portada
    type: String,
    trim: true
  },
  keywords: { // Palabras clave para facilitar la búsqueda
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  versionKey: false
})

const bookDetailModel = model<IBookDetail>('BookDetail', bookDetailSchema)
export { bookDetailModel }
