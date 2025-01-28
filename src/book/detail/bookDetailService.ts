
import { IBookDetail } from "./bookDetailInterface";
import { bookDetailModel } from "./bookDetailModel";
import { bookModel } from "../bookModel";

export class BookDetailService {
    static getBooksDetail = async () => {
        try {
            const items = await bookDetailModel.find().populate('book');
            if (Array.isArray(items) && items.length === 0) return { status: "error", statuscode: 404, message: "Empty list" };
            return { status: "success", statuscode: 200, data: items };
        } catch (error) {
            throw error;
        }
    }
    static getBookDetail = async (serie: string) => {
        try {
            const book = await bookModel.findOne({ serie: Number(serie) });
            if (!book) return { status: "error", statuscode: 404, message: "Book not found" };
            const item = await bookDetailModel.findOne({ book: book._id })
            if (!item) return { status: "error", statuscode: 404, message: "Detail book not found" };
            return { status: "success", statuscode: 200, data: item };
        } catch (error) {
            throw error;
        }
    }
    static postBookDetail = async () => {
        try {

        } catch (error) {

        }
    }
    static updateBookDetail = async () => {
        try {

        } catch (error) {

        }
    }
    static deleteBookDetail = async () => {
        try {

        } catch (error) {

        }
    }
}