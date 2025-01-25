// Config cache
// Config cookies
// Config sesiones
// paginacion

import express from "express";
const app = express();
/****************************************************** */
// middleware 
/****************************************************** */
import morgan from "morgan";
process.env.NODE_ENV === "development" ? app?.use(morgan("dev")) : app?.use(morgan("combined"));
/****************************************************** */
import helmet from "helmet";
app.use(helmet(
  {
    dnsPrefetchControl: false,
    contentSecurityPolicy: false,
    hsts: false,
    frameguard: false,
    //frameguard: { action: "deny" },
    referrerPolicy: false,
  }
));
/****************************************************** */
// Rate Limit
import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
  statusCode: 429,
});
app.use(limiter);
/****************************************************** */  
import cors from "cors";
const corsOptions = {
  origin: process.env.NODE_ENV === "development"
    ? "*"
    : "https://your-production-domain.com",
  methods: ["GET", "POST"],  // Permite solo métodos HTTP específicos
  allowedHeaders: ["Content-Type", "Authorization"],  // Permite solo encabezados específicos  
  credentials: true  // Permite el envío de cookies o credenciales
};
if (process.env.NODE_ENV === "development") {
  console.log("cors !!!!!!!!!!!!!1");
  app.use(cors());
} else {
  app.use(cors(corsOptions));
}  
/****************************************************** */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
/****************************************************** */
import usersRouter from "./book/bookRoute";
app.use("/api", usersRouter);
import authorRouter from "./author/authorRoute";
app.use("/api", authorRouter);
import categoryRouter from "./category/categoryRoute";
app.use("/api", categoryRouter); 
/****************************************************** */
import errorHandler from "./middleware/errorHandler";
app.use(errorHandler);
/****************************************************** */

export default app;
