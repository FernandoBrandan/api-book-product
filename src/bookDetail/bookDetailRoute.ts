import { Router } from 'express'

import { getBooksDetail, getBookDetail, updateBookDetail, deleteBookDetail } from './bookDetailController'
const router = Router()

router.get('/booksDetail', getBooksDetail)
router.get('/booksDetail/:serie', getBookDetail)
router.put('/booksDetail/:serie', updateBookDetail)
router.delete('/booksDetail/:serie', deleteBookDetail)
/**
/   Additional endpoints for relationships between models
GET /books/search?title={title} - Buscar libros por título
GET /books/filter?category={category_id} - Filtrar libros por categoría
GET /books/filter?author={author_id} - Filtrar libros por autor
*/

export default router
