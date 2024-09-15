import mongoose from "mongoose";
import { Log } from "../types/log";

mongoose.Promise = global.Promise;

const logSchema = new mongoose.Schema<Log>(
  {
    spaceId: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
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

export default mongoose.model<Log>("Log", logSchema);
