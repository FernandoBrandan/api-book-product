import { Types } from "mongoose";

interface IBook {
  _id?: string;
  serie: number;
  title: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  publicationDate?: Date;
  pagesNumber?: number;
  synopsis?: string;
}

export { IBook };