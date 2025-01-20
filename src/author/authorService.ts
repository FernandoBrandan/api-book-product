import { authorModel } from "./authorModel";
import { IAuthor } from "./authorInterface";

export class AuthorService {
  static getAuthors = async () => {
    try {
      const items = await authorModel.find();
      if (!items || items.length === 0) return { status: "error", statuscode: 404, message: "No authors found" };
      return { status: "success", statuscode: 200, data: items };
    } catch (error) {
      throw error;
    }
  };

  static getAuthor = async (authorId: string) => {
    try {
      const item = await authorModel.find({ author_id: authorId });
      if (!item) return { status: "error", statuscode: 404, message: "Author not found" };
      return { status: "success", statuscode: 200, data: item };
    } catch (error) {
      throw error;
    }
  };

  static postAuthor = async (author: IAuthor) => {
    try {
      const existingAuthor = await authorModel.exists({ name: author.name });
      if (existingAuthor) return { status: "error", statuscode: 400, message: "Author already exists" };
      const newAuthor = await authorModel.create(author);
      if (!newAuthor) return { status: "error", statuscode: 404, message: "Author not created" };
      return { status: "success", statuscode: 201, data: newAuthor };
    } catch (error) {
      throw error;
    }
  };
}
