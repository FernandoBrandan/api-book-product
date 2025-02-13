import supertest from 'supertest'
import app from '../src/app'

import { categoryModel } from '../src/models/categoryModel'
import mongoose from 'mongoose'
const api = supertest(app)

const DB_URI = 'mongodb://root:gateway@localhost:3100/library?authSource=admin'

beforeAll(async () => {
  await mongoose.connect(DB_URI)
  await categoryModel.deleteMany()
  await categoryModel.insertMany([
    { category_id: 1001, name: 'Novela' },
    { category_id: 1002, name: 'Ciencia Ficción' },
    { category_id: 1003, name: 'Horror' },
    { category_id: 1004, name: 'Aventura' },
    { category_id: 1005, name: 'Humor' }
  ])
})

afterAll(async () => {
  // await categoryModel.deleteMany();
  await mongoose.disconnect()
})

describe.skip('/api/library/categories', () => {
  test('Test registros de categorias', async () => {
    const response = await api
      .get('/api/library/categories')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toBeInstanceOf(Array)
  })
})
