import supertest from 'supertest'
import app from '../src/app'

import mongoose from 'mongoose'
const api = supertest(app)

const DB_URI = 'mongodb://root:gateway@localhost:3100/library?authSource=admin'
beforeAll(async () => await mongoose.connect(DB_URI))
afterAll(async () => await mongoose.disconnect())

describe.skip('/api/library/authors', () => {
  // post - http:localhost:30007api/authors
  test('POST /api/library/authors', async () => {
    const newAuthor = {
      author_id: Math.floor(Math.random() * 1000000),
      name: 'Name' + Math.floor(Math.random() * 1000),
      lastName: 'Last Name',
      nationality: 'Nationality',
      birthDate: '12-7-2077'
    }
    const response = await api.post('/api/library/authors').send(newAuthor).expect(201)

    expect(response.body).toHaveProperty('author_id', newAuthor.author_id)
    expect(response.body).toHaveProperty('name', newAuthor.name)
  })

  // get - http:localhost:30007api/authors/{id}
  test('GET /api/library/authors/:id', async () => {
    const authorResponse = await api
      .post('/api/library/authors')
      .send({
        author_id: Math.floor(Math.random() * 1000000),
        name: 'Name' + Math.floor(Math.random() * 1000),
        lastName: 'Last Name',
        nationality: 'Nationality',
        birthDate: '12-7-2077'
      })
      .expect(201)

    const authorId = authorResponse.body.author_id
    const response = await api
      .get(`/api/library/authors/${authorId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0]).toHaveProperty('author_id')
    expect(response.body[0]).toHaveProperty('name')
  })

  // get - http:localhost:30007api/authors
  test('GET /api/library/authors', async () => {
    const response = await api
      .get('/api/library/authors')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toBeInstanceOf(Array)
  })

  // put - http:localhost:30007api/authors/{id}
  // delete - http:localhost:30007api/authors/{id}
})
