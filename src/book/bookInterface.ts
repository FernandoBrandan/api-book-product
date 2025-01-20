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

/**
 
"serie" : "",
"title" : "",
"author" : "",
"category" : "",
"publicationDate" : "",
"pagesNumber" : "",
"synopsis" : ""


{
  "serie" : "123asd",
  "title" : "harry potter",
  "author" : "Escritora",
  "category" : "Terror",
  "publicationDate" : "12-12-1993",
  "pagesNumber" : "122",
 "synopsis" : "Mucho texto" 
 }

  */