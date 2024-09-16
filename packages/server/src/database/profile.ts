import mongoose from "mongoose";
import { Profile } from "../types/profile";

mongoose.Promise = global.Promise;

const profileSchema = new mongoose.Schema<Profile>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    authCode: {
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

export default mongoose.model<Profile>("Profile", profileSchema);
