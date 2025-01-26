import { Request, Response, NextFunction } from "express";
import { IBook } from "./bookInterface";
import { BookService } from "./bookService";
import { bookValidateHandler } from "./bookValidate";

export const getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const books = await BookService.getBooks();
    if (books.status == "error") {
      res.status(books.statuscode).json({ message: books.message });
    }
    res.status(books.statuscode).json(books.data);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.serie) {
      res.status(400).json({ error: "Error book serie is required" });
    }
    const book = await BookService.getBook(req.params.serie);
    if (book.status == "error") {
      res.status(book.statuscode).json({ message: book.message });
    }
    res.status(book.statuscode).json(book.data);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction)  => {
  try {
    const newBook: IBook = req.body;
    const validated = bookValidateHandler(newBook);
    if (validated.error) {
      res.status(400).json({ error: "Error validated book", message: validated.error });
    }
    const book = await BookService.postAuthor(newBook);
    if (book.status == "error") {
      res.status(book.statuscode).json({ message: book.message });
    }
    res.status(book.statuscode).json(book.data);
  } catch (error) {
    next(error);
  }
};

export const updateBook = (req: Request, res: Response, _next: NextFunction) => {
  res.status(300).json({ message: "Not implemented" });
};
export const deleteBook = (req: Request, res: Response, _next: NextFunction) => {
  res.status(300).json({ message: "Not implemented" });
};
