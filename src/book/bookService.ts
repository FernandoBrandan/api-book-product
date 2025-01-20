import { isValidObjectId } from "mongoose";
import { IBook } from "./bookInterface";
import { bookModel } from "./bookModel";
import { authorModel } from "../author/authorModel";
import { categoryModel } from "../category/categoryModel"; 

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
      const item = await bookModel.find({ serie: serie });
      if (Array.isArray(item) && item.length === 0) return { status: "error", statuscode: 404, message: "Book not found" };
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
}
