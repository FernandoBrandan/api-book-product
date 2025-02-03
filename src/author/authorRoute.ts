import { Router } from 'express'

import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from './authorController'
const router = Router()
router.get('/authors', getAuthors)
router.get('/authors/:id', getAuthor)
router.post('/authors', createAuthor)
router.put('/authors/:id', updateAuthor)
router.delete('/authors/:id', deleteAuthor)

export default router

/**
 * TODO: search endpoint ??
 */

/**
 * JSON Post
 * {
 *  "name": "John",
 * "birthDate" : "1990-01-01",
 * "nationality" : "USA"
 * }
 */
