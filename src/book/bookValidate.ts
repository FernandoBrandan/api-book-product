// import joi from "joi";
// import { IBook } from "./bookInterface";
//
// export const bookValidateHandler = (data: IBook) => {
//  if (!data) return { error: "Missing data" };
//  const bookSchema = joi.object({
//    serie: joi.number().required(),
//    title: joi.string().required(),
//    author: joi.string().required(),
//    category: joi.string().required(),
//    publicationDate: joi.string(),
//    pagesNumber: joi.number(),
//    synopsis: joi.string(),
//  });
//  return bookSchema.validate(data);
// };

import joi from 'joi'
import { IBook } from './bookInterface'

// Función para limpiar datos antes de validarlos
const cleanData = (data: any) => {
  // Elimina propiedades internas no deseadas
  if (data && Array.isArray(data.bookDetail)) {
    data.bookDetail.forEach((bookDetail: any) => {
      delete bookDetail.$__
    })
  }
  return data
}

export const bookValidateHandler = (data: IBook) => {
  if (!data) return { error: 'Missing data' }

  // Limpiar los datos antes de validarlos
  const cleanedData = cleanData(data)

  const bookSchema = joi.object({
    serie: joi.number().required(),
    bookDetail: joi.array().items(
      joi.object({
        stock: joi.number().required(),
        price: joi.number().required(),
        condition: joi.string().required(),
        isbn: joi.string().required(),
        isAvailable: joi.boolean().required(),
        images: joi.array().items(joi.string()).required(),
        edition: joi.string().required(),
        coverImageUrl: joi.string().required(),
        keywords: joi.array().items(joi.string()).required()
      })
    ).optional(), // Si `bookDetail` es opcional, puedes dejarlo como opcional.
    title: joi.string().required(),
    author: joi.string().required(),
    category: joi.string().required(),
    publicationDate: joi.string(),
    pagesNumber: joi.number(),
    synopsis: joi.string()
  })

  return bookSchema.validate(cleanedData)
}
