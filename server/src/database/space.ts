import mongoose from "mongoose";
import { Space } from "../types/space";

mongoose.Promise = global.Promise;

const spaceSchema = new mongoose.Schema<Space>(
  {
    name: {
      type: String,
      required: true,
    },
    schema: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    strict: false,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export default mongoose.model<Space>("Space", spaceSchema);
