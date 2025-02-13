import supertest from 'supertest'
import app from '../src/app'

import mongoose from 'mongoose'
const api = supertest(app)

const DB_URI = 'mongodb://root:gateway@localhost:3100/library?authSource=admin'

beforeAll(async () => await mongoose.connect(DB_URI))
afterAll(async () => await mongoose.disconnect())

describe('/api/library/books', () => {
  test('POST /api/library/books', async () => {
    const bookDetailData = {
      stock: 10,
      price: 20,
      condition: 'new',
      isbn: `97s3-16-148410-0-${Math.floor(Math.random() * 9000)}`,
      isAvailable: true,
      images: ['image1.jpg', 'image2.jpg'],
      edition: '1st',
      coverImageUrl: 'http://example.com/cover.jpg',
      keywords: ['fiction', 'adventure']
    }

    const getAuthorResponse = await api.get('/api/library/authors').expect(200)
    const authorId = getAuthorResponse.body[0]._id
    const getCategoryResponse = await api.get('/api/library/categories').expect(200)
    const categoryId = getCategoryResponse.body[0]._id

    const bookData = {
      serie: Math.floor(Math.random() * (999999999 - 999 + 1)) + 999,
      bookDetail: bookDetailData,
      title: 'Title book ' + Math.floor(Math.random() * 1000),
      author: authorId, // Aquí debe ir un _id de autor válido
      category: categoryId, // Aquí debe ir un _id de categoría válido
      publicationDate: '2025-02-12',
      pagesNumber: 300,
      synopsis: 'An epic tale of adventure and discovery.'
    }

    const res = await api
      .post('/api/library/books')
      .send(bookData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveProperty('data')
    // expect(res.body.title).toBe(bookData.title)
    // expect(res.body.serie).toBe(bookData.serie)
    // expect(res.body.bookDetail).toBe(bookData.bookDetail)

    // expect(res.body.error).toBe('Error validated book')
    // expect(res.body.message).toBeDefined()

    // Verifica que el libro ha sido creado correctamente
    // expect(bookResponse.body).toHaveProperty('serie', newBook.serie)
    // expect(bookResponse.body).toHaveProperty('title', newBook.title)
    // expect(bookResponse.body).toHaveProperty('author', newBook.author)
  })
})
