import supertest from "supertest";
import app from "../src/app";
const api = supertest(app);

import mongoose from "mongoose";
beforeAll(async () => await mongoose.connect("mongodb://127.0.0.1:27017/library"));
afterAll(async () => await mongoose.disconnect());

describe("/api/books", () => {
  // Test de GET /api/books
  test("GET /api/books", async () => {
    const response = await api
      .get("/api/books")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toBeInstanceOf(Array); // Verifica que sea una lista
  });

  // Test de GET /api/books/:id
  test("GET /api/books/:id", async () => {
    const getAuthorResponse = await api.get("/api/authors").expect(200);
    const authorId = getAuthorResponse.body[0]._id;
    const getCategoryResponse = await api.get("/api/category").expect(200);
    const categoryId = getCategoryResponse.body[0]._id;

    const newBook = {
      serie: Math.floor(Math.random() * (999999999 - 999 + 1)) + 999,
      title: "Title book " + Math.floor(Math.random() * 1000),
      author: authorId,
      category: categoryId,
      publicationDate: "12-7-2077",
      pagesNumber: 210,
      synopsis: "A lot of text",
    };

    const bookResponse = await api
      .post("/api/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const bookSerie = bookResponse.body.serie;
    const response = await api
      .get(`/api/books/${bookSerie}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body[0]).toHaveProperty("serie");
    expect(response.body[0]).toHaveProperty("title");
  });

  // Test de POST /api/books
  test("POST /api/books", async () => {
    const getAuthorResponse = await api.get("/api/authors").expect(200);
    const authorId = getAuthorResponse.body[0]._id;
    const getCategoryResponse = await api.get("/api/category").expect(200);
    const categoryId = getCategoryResponse.body[0]._id;

    const newBook = {
      serie: Math.floor(Math.random() * (999999999 - 999 + 1)) + 999,
      title: "Title book " + Math.floor(Math.random() * 1000),
      author: authorId,
      category: categoryId,
      publicationDate: "12-7-2077",
      pagesNumber: 210,
      synopsis: "A lot of text",
    };

    const bookResponse = await api
      .post("/api/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // Verifica que el libro ha sido creado correctamente
    expect(bookResponse.body).toHaveProperty("serie", newBook.serie);
    expect(bookResponse.body).toHaveProperty("title", newBook.title);
    expect(bookResponse.body).toHaveProperty("author", newBook.author);
  });

  // Test de PUT /api/books/:id
  test("PUT /api/books/:id", async () => {
    const getAuthorResponse = await api.get("/api/authors").expect(200);
    const authorId = getAuthorResponse.body[0]._id;
    const getCategoryResponse = await api.get("/api/category").expect(200);
    const categoryId = getCategoryResponse.body[0]._id;

    const newBook = {
      serie: Math.floor(Math.random() * 1000000),
      title: "Title book " + Math.floor(Math.random() * 1000),
      author: authorId,
      category: categoryId,
      publicationDate: "12-7-2077",
      pagesNumber: 210,
      synopsis: "A lot of text",
    };

    const bookResponse = await api.post("/api/books").send(newBook).expect(201);

    const bookId = bookResponse.body._id;
    const updatedBook = { ...bookResponse.body, title: "Updated Title" };

    const response = await api
      .put(`/api/books/${bookId}`)
      .send(updatedBook)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // Verifica que el título ha sido actualizado
    expect(response.body).toHaveProperty("title", "Updated Title");
  });

  // Test de DELETE /api/books/:id
  test("DELETE /api/books/:id", async () => {
    const bookResponse = await api
      .post("/api/books")
      .send({
        serie: 2341,
        title: "Title book",
        author: "Name or author_id",
        category: "Name",
        publicationDate: "12-7-2077",
        pagesNumber: 210,
        synopsis: "A lot of text",
      })
      .expect(201);

    const bookId = bookResponse.body._id;

    const deleteResponse = await api.delete(`/api/books/${bookId}`).expect(200);

    // Verifica que la respuesta del DELETE sea exitosa
    expect(deleteResponse.body).toHaveProperty("message", "Book deleted successfully");

    // Verifica que el libro ya no exista en la base de datos
    const getResponse = await api.get(`/api/books/${bookId}`).expect(404);
    expect(getResponse.body).toHaveProperty("message", "Book not found");
  });
});
