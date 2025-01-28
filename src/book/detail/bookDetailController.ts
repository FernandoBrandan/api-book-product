import { Request, Response, NextFunction } from "express";
import { BookDetailService } from "./bookDetailService"

export const getBooksDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const info = await BookDetailService.getBooksDetail();
        res.status(200).json({ message: "getBooksDetail", data: info })
    } catch (error) {
        next(error)
    }
}

export const getBookDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const info = await BookDetailService.getBookDetail(req.params.id)
        res.status(200).json({ message: "getBookDetail", data: info })
    } catch (error) {
        next(error)
    }
}

export const createBookDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "createBookDetail" })
    } catch (error) {
        next(error)
    }
}

export const updateBookDetail = async (req: Request, res: Response, next: NextFunction) => {
    res.status(300).json({ message: "Not implemented" });
}
export const deleteBookDetail = async (req: Request, res: Response, next: NextFunction) => {
    res.status(300).json({ message: "Not implemented" });
}









