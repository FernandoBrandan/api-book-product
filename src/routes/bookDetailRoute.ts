import { Router } from 'express'
import { getBooksDetail, getBookDetail, updateBookDetail, deleteBookDetail } from '../controllers/bookDetailController'
const router = Router()

router.get('/booksDetail', getBooksDetail)
router.get('/booksDetail/:serie', getBookDetail)
router.put('/booksDetail/:serie', updateBookDetail)
router.delete('/booksDetail/:serie', deleteBookDetail)

export default router
