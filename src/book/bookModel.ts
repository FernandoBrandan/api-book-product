import { Schema, model } from 'mongoose'
import { IBook } from './bookInterface'

const bookSchema = new Schema<IBook>(
  {
    serie: {
      type: Number,
      min: 999,
      max: 999999999,
      required: true,
      unique: true
    },
    bookDetail: {
      type: Schema.Types.ObjectId,
      ref: 'BookDetail',
      required: false
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: false
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false
    },
    publicationDate: {
      type: Date
    },
    pagesNumber: {
      type: Number
    },
    synopsis: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const bookModel = model<IBook>('Book', bookSchema)
export { bookModel }
