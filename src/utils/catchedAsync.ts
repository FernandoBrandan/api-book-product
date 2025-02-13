import { Request, Response, NextFunction } from 'express'

const catchedAsync = <T = any>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(err))
  }
}

export default catchedAsync
