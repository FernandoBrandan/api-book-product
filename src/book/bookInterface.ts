import { Types } from 'mongoose'
import { IBookDetail } from '../bookDetail/bookDetailInterface'

export interface IBook {
  serie: number;
  bookDetail: IBookDetail;
  title: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  publicationDate?: Date;
  pagesNumber?: number;
  synopsis?: string;
}
