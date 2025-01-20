import { Schema, model } from "mongoose";
import { IAuthor } from "./authorInterface";

const authorSchema = new Schema<IAuthor>({
  author_id: {
    type: Number,
    min: 999,
    max: 999999,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
  },
  nationality: {
    type: String,
    trim: true,
  },
});

const authorModel = model<IAuthor>("Author", authorSchema);
export { authorModel };
