import { Router } from "express";
const router = Router();

import { getBooksDetail, getBookDetail, createBookDetail, updateBookDetail, deleteBookDetail } from "./bookDetailController";
 
router.get("/booksDetail", getBooksDetail);
router.get("/booksDetail/:serie", getBookDetail);
router.post("/booksDetail", createBookDetail);
router.put("/booksDetail/:serie", updateBookDetail);
router.delete("/booksDetail/:serie", deleteBookDetail);
/**
/   Additional endpoints for relationships between models
GET /books/search?title={title} - Buscar libros por título
GET /books/filter?category={category_id} - Filtrar libros por categoría
GET /books/filter?author={author_id} - Filtrar libros por autor
*/

export default router;