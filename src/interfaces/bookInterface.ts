import { Types } from 'mongoose'

export interface IBook {
  serie: number;
  bookDetail: Types.ObjectId;
  title: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  publicationDate?: Date;
  pagesNumber?: number;
  synopsis?: string;
}
