import { Router } from "express";
const router = Router();

import { getBooks, getBook, createBook, updateBook, deleteBook } from "./bookController";
 
router.get("/books", getBooks);
router.get("/books/:serie", getBook);
router.post("/books", createBook);
router.put("/books/:serie", updateBook);
router.delete("/books/:serie", deleteBook);
/**
/   Additional endpoints for relationships between models
GET /books/search?title={title} - Buscar libros por título
GET /books/filter?category={category_id} - Filtrar libros por categoría
GET /books/filter?author={author_id} - Filtrar libros por autor
*/

export default router;




/**
 *
 * 3. Agrupar Recursos Lógicamente
 E structura las rutas según las relaciones jerárquicas de los datos, como /articles/:id/co*mments.
 Evita niveles excesivos de anidamiento; considera devolver URLs relacionadas en su lugar.
 *
Endpoints adicionales para relaciones entre los modelos
GET /authors/{id}/books - Obtener todos los libros de un autor específico
GET /categories/{id}/books - Obtener todos los libros en una categoría específica
POST /books/{book_id}/authors/{author_id} - Asignar un autor a un libro (útil si un libro tiene múltiples autores)
DELETE /books/{book_id}/authors/{author_id} - Eliminar un autor de un libro
POST /books/{book_id}/categories/{category_id} - Asignar una categoría a un libro
DELETE /books/{book_id}/categories/{category_id} - Eliminar una categoría de un libro
 */
/**
Endpoints de estadísticas (Opcionales)
GET /books/count - Obtener el total de libros
GET /authors/count - Obtener el total de autores
GET /categories/count - Obtener el total de categorías
GET /books/popular - Obtener los libros más populares (si existe un campo de popularidad o calificación)
*/
