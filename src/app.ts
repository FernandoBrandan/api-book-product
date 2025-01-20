import express from "express";
const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.json());

import morgan from "morgan";
app.use(morgan("dev"));

import cors from "cors";
const allowedOrigins = ["http://localhost:3002"];
const corsOptions = {
  origin: (origin: any, callback: any) => {   
    // if (!origin) callback(new Error("origin undefined"));
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
app.use(cors());

// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// const helmet = require('helmet');
// app.use(helmet());

// Config cache
// Config cookies
// Config sesiones
// paginacion

import usersRouter from "./book/bookRoute";
app.use("/api", usersRouter);
import authorRouter from "./author/authorRoute";
app.use("/api", authorRouter);
import categoryRouter from "./category/categoryRoute";
app.use("/api", categoryRouter);

app.get("/api/testb",()=>{
  console.log("prueba");
  
})

import errorHandler from "./middleware/errorHandler";
app.use(errorHandler);

export default app;
