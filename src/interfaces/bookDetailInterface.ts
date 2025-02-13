export interface IBookDetail {
  _id?: string;
  stock: number,
  price: number,
  condition: string,
  isbn: string, // International Standard Book Number
  isAvailable: boolean,
  images: string[],
  edition: string,
  publisher: string,
  coverImageUrl: string, // URL de la imagen de la portada
  keywords: string[], // Palabras clave para facilitar la búsqueda
}
