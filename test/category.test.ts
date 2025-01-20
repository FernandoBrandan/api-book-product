import supertest from "supertest";
import app from "../src/app";
const api = supertest(app);

import { categoryModel } from "../src/category/categoryModel";
import mongoose from "mongoose";

describe("/api/category", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/library");
    await categoryModel.deleteMany();
    await categoryModel.insertMany([
      { category_id: 1001, name: "Novela" },
      { category_id: 1002, name: "Ciencia Ficción" },
      { category_id: 1003, name: "Horror" },
      { category_id: 1004, name: "Aventura" },
      { category_id: 1005, name: "Humor" },
    ]);
  });

  afterAll(async () => {
    //await categoryModel.deleteMany();
    await mongoose.disconnect();
  });

  test("Test registros de categorias", async () => {
    const response = await api
      .get("/api/category")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toBeInstanceOf(Array);
  });
});
