import mongoose from "mongoose";
import { DB_NAME, MONGO_URI } from "./env.js";

async function connectToDBMongoose() {
  try {
    await mongoose.connect(`${MONGO_URI}/${DB_NAME}`, { autoIndex: true });
    console.log("Connected to Mongodb database using Mongoose");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectToDBMongoose;
