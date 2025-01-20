import { Router } from "express";
const router = Router();

import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from "./authorController";
router.get("/authors", getAuthors); // http://localhost:3000/api/authors
router.get("/authors/:id", getAuthor); // http://localhost:3000/api/authors/1
router.post("/authors", createAuthor); // http://localhost:3000/api/authors
router.put("/authors/:id", updateAuthor); // http://localhost:3000/api/authors/1
router.delete("/authors/:id", deleteAuthor); // http://localhost:3000/api/authors/1

export default router;

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
