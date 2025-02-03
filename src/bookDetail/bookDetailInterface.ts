import { Types } from 'mongoose'

export interface IBookDetail {
    _id?: string;
    stock: number,
    price: number,
    condition: string,
    isbn: string, // International Standard Book Number
    isAvailable: boolean,
    images: string[],
    edition: string,
    publisher: Types.ObjectId,
    coverImageUrl: string, // URL de la imagen de la portada
    keywords: string[], // Palabras clave para facilitar la búsqueda
}
