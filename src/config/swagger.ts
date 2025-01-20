import app from "../app";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Bookstore",
      version: "1.0.0",
      description: "API Bookstore",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/book/bookRoute.ts"],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

/**
 *
 * Blog ejemplo: https://ljcl79.medium.com/documentando-una-api-con-swagger-27c813e7bca1
 *
 * Ver http://localhost:3000/api-docs/ para ver la documentación de la API.
 *
 */
