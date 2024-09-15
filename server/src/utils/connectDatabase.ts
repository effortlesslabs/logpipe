import mongoose from "mongoose";

let connection: typeof mongoose | null = null;

export const connectDatabase = async (uri: string) => {
  if (connection == null) {
    connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
  }
  return connection;
};
