import supertest from "supertest";
import app from "../src/app";
const api = supertest(app);

import mongoose from "mongoose";

describe("/api/authors", () => {
  beforeAll(async () => await mongoose.connect("mongodb://127.0.0.1:27017/library"));

  afterAll(async () => await mongoose.disconnect());

  // get - http:localhost:30007api/authors
  test("GET /api/authors", async () => {
    const response = await api
      .get("/api/authors")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toBeInstanceOf(Array);
  });

  // get - http:localhost:30007api/authors/{id}
  test("GET /api/authors/:id", async () => {
    const authorResponse = await api
      .post("/api/authors")
      .send({
        author_id: Math.floor(Math.random() * 1000000),
        name: "Name" + Math.floor(Math.random() * 1000),
        lastName: "Last Name",
        nationality: "Nationality",
        birthDate: "12-7-2077",
      })
      .expect(201);

    const authorId = authorResponse.body.author_id;
    const response = await api
      .get(`/api/authors/${authorId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body[0]).toHaveProperty("author_id");
    expect(response.body[0]).toHaveProperty("name");
  });

  // post - http:localhost:30007api/authors
  test("POST /api/authors", async () => {
    const newAuthor = {
      author_id: Math.floor(Math.random() * 1000000),
      name: "Name" + Math.floor(Math.random() * 1000),
      lastName: "Last Name",
      nationality: "Nationality",
      birthDate: "12-7-2077",
    };
    const response = await api.post("/api/authors").send(newAuthor).expect(201);

    expect(response.body).toHaveProperty("author_id", newAuthor.author_id);
    expect(response.body).toHaveProperty("name", newAuthor.name);
  });

  // put - http:localhost:30007api/authors/{id}
  // delete - http:localhost:30007api/authors/{id}
});
