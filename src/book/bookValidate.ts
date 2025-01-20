import joi from "joi";
import { IBook } from "./bookInterface";

export const bookValidateHandler = (data: IBook) => {
  if (!data) return { error: "Missing data" };
  const bookSchema = joi.object({
    serie: joi.number().required(),
    title: joi.string().required(),
    author: joi.string().required(),
    category: joi.string().required(),
    publicationDate: joi.string(),
    pagesNumber: joi.number(),
    synopsis: joi.string(),
  });
  return bookSchema.validate(data);
};
