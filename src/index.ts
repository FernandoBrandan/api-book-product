import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";
import "./config/swagger";
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`apiBooks - Server listen on port http://localhost:${port}`);
});

/**
 * ********************************************************************************************************************
 * Configuración de servidor con certificados
 * ********************************************************************************************************************
 */
// import fs from 'fs';
// import https from 'https';
// const options = {
//   key: fs.readFileSync('src/cert/microservice.key'), // Clave privada del microservicio
//   cert: fs.readFileSync('src/cert/microservice.crt'), // Certificado del microservicio
//   ca: fs.readFileSync('src/cert/ca.crt'), // Certificado de la CA
//   requestCert: true,
//   rejectUnauthorized: true,
// };
// https.createServer(options, app).listen(port, () => {
//   console.log(`Server listen on port https://localhost:${port}`);
// });
 