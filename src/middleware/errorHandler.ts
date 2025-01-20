import { Request, Response, NextFunction } from "express";

const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;

// https://dev.to/srishtikprasad/error-handling-with-express-40pk
// https://dev.to/divine_nnanna2/error-handling-and-logging-in-nodejs-applications-1k2a
// https://medium.com/@adarshahelvar/error-handling-in-node-js-7a474a8e6ba7
// https://javascript.plainenglish.io/global-error-handling-in-node-js-with-middleware-a-complete-guide-%EF%B8%8F-b037023e3866
