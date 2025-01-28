import { Types } from "mongoose"

interface IBookDetail {
    book: Types.ObjectId,
    stock: Number,
    price: Number,
    condition: String,
    isbn: String,        // International Standard Book Number 
    isAvailable: Boolean,
    images: String,
    edition:  String,
    publisher: Types.ObjectId,
    coverImageUrl: String,        // URL de la imagen de la portada
    keywords: String,        // Palabras clave para facilitar la búsqueda
}

export { IBookDetail }