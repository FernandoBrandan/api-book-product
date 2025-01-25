import { Schema, model } from "mongoose";
import { IBook } from "./bookInterface";
 
/**
 * 
 * Agregar

stock: {
  type: Number,
  required: true,
  min: 0,
  default: 0,
},
price: {
  type: Number,
  required: true,
  min: 0,
},
condition: {
  type: String,
  enum: ["new", "used", "damaged"],
  default: "new",
},
images: {
  type: [String],
  required: false,
},
isbn: { // International Standard Book Number 
type: String,
required: true,
unique: true,
},
edition: {
  type: String,
  default: "1st",
},
publisher: {
  type: Schema.Types.ObjectId,
  ref: "Publisher",
},
coverImageUrl: { // URL de la imagen de la portada
  type: String,
  trim: true,
},
keywords: { // Palabras clave para facilitar la búsqueda
  type: [String], 
  default: [],
},
isAvailable: {
  type: Boolean,
  default: true,
},
*/
 
const bookSchema = new Schema<IBook>(
  {
    serie: {
      type: Number,
      min: 999,
      max: 999999999,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    publicationDate: {
      type: Date,
    },
    pagesNumber: {
      type: Number,
    },
    synopsis: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const bookModel = model<IBook>("Book", bookSchema);
export { bookModel };
