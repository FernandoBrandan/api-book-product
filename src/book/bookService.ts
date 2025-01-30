import { isValidObjectId } from "mongoose";
import { IBook } from "./bookInterface";
import { bookModel } from "./bookModel";
import { authorModel } from "../author/authorModel";
import { categoryModel } from "../category/categoryModel";

import { bookDetailModel } from "./detail/bookDetailModel";
import { equal, number } from "joi";


interface items {
  itemId: Number;
  price: Number;
  quantity: Number;
} 

export class BookService {
  static getBooks = async () => {
    try {
      const items = await bookModel.find();
      if (Array.isArray(items) && items.length === 0) return { status: "error", statuscode: 404, message: "No books found" };
      return { status: "success", statuscode: 200, data: items };
    } catch (error) {
      throw error;
    }
  };

  static getBook = async (serie: string) => {
    try {
      const item = await bookModel.find({ serie: Number(serie) });
      if (!item) return { status: "error", statuscode: 404, message: "Book not found" };
      return { status: "success", statuscode: 200, data: item };
    } catch (error) {
      throw error;
    }
  };

  static postAuthor = async (book: IBook) => {
    try {
      if (!isValidObjectId(book.author) || !isValidObjectId(book.category)) {
        return { status: "error", statuscode: 400, message: "Author or Category not found or invalidate id" };
      }

      const existingAuthor = await authorModel.findOne({ _id: book.author });
      if (!existingAuthor) return { status: "error", statuscode: 400, message: "Author not found" };
      const existingCategory = await categoryModel.findOne({ _id: book.category });
      if (!existingCategory) return { status: "error", statuscode: 400, message: "Category not found" };

      // validar por varios campos
      const existingBook = await bookModel.findOne({ serie: book.serie });
      if (existingBook) return { status: "error", statuscode: 400, message: "Book already" };

      const newBook = await bookModel.create({
        ...book,
        author: existingAuthor._id,
        category: existingCategory._id,
      });

      if (!newBook) return { status: "error", statuscode: 404, message: "Book not created" };
      return { status: "success", statuscode: 201, data: newBook };
    } catch (error) {
      throw error;
    }
  };
  
  /**     
  db.bookDetail.updateOne(    { _id: ObjectId("679afc20552c555880e9496b") },    { $set: { stock: 0, isAvailable: false } }  )  
  */
  
   /**
   * Metods message queue
   */ 
   static async checkIfProductsExist(items: items[]): Promise<{ valid: boolean; message: string }> {
    const errors: string[] = [];
    
    for (const item of items) {
      const book = await bookModel.findOne({ 'serie': item.itemId });
      if (!book) {
        errors.push(`El producto con ID ${item.itemId} no existe`);
        continue;
      }  
      // Buscar detalles del libro (stock, precio, etc.)
      const bookDetail = await bookDetailModel.findOne({ book: book._id });
      if (!bookDetail) {
        errors.push(`No se encontró información de stock para el producto con ID ${item.itemId}`);
        continue;
      } 
      const stock: Number = Number(bookDetail.stock);      
      if (stock === 0) {
        errors.push(`No hay stock para el producto con ID ${item.itemId}. Se solicitaron ${item.quantity} unidades.`);
        continue;
      }
      if (stock < item.quantity) {
        errors.push(`No hay suficiente stock para el producto con ID ${item.itemId}. Se solicitaron ${item.quantity} unidades, pero solo hay ${stock} disponibles.`);
        continue;
      }
    }
    if (errors.length > 0) {
      return { valid: false, message: errors.join('\n') };
    }
    return { valid: true, message: 'Todos los productos existen y tienen stock suficiente' };
  }
    

  static updateProductStock = async (updates: { productId: string, quantity: number }[]): Promise<boolean> => {
    console.log("updateProductStock", updates);

    try {
      for (const update of updates) {
        const product = await bookModel.findById(update.productId);

        // if (!product || product.stock < update.quantity) {
        //   throw new Error(`Stock insuficiente para el producto ${update.productId}`);
        // }

        // Restar el stock
        // product.stock -= update.quantity;
        // await product.save();
      }
      return true;
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
      return false;
    }
  }


}
