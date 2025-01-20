import { Router } from "express";
const router = Router();

import { createCategory, deleteCategory, getCategory, getCategories, updateCategory } from "./categoryController";
router.get("/categories/", getCategories); // categories
router.get("/categories/:id", getCategory);
router.post("/categories/", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
export default router;

/**
 * 
 * Endpoints para Category (Categoría)
GET /categories - Listar todas las categorías
GET /categories/{id} - Obtener una categoría específica por su ID
POST /categories - Crear una nueva categoría
PUT /categories/{id} - Actualizar una categoría específica por su ID
DELETE /categories/{id} - Eliminar una categoría específica por su ID

 */
